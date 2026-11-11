from __future__ import annotations

import json
import os
import sys
from contextlib import asynccontextmanager
from pathlib import Path
from typing import Any

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from sqlalchemy import func, make_url
from sqlalchemy.orm import sessionmaker

ROOT = Path(__file__).resolve().parents[2]
CORE_SOURCE = ROOT / "legacy" / "pvc-u-core" / "src"
if str(CORE_SOURCE) not in sys.path:
    sys.path.insert(0, str(CORE_SOURCE))

from pvc_u.ledger import LedgerEntry  # noqa: E402
from pvc_u import orchestrator as pvc_u_orchestrator  # noqa: E402
from pvc_u.orchestrator import PVCUOrchestrator  # noqa: E402

from .privacy import ledger_record_values  # noqa: E402

DATA_DIR = Path(os.getenv("PVC_U_DATA_DIR", str(ROOT / "data")))
PRICE_FILE = ROOT / "plataforma" / "precios.json"
orchestrator: PVCUOrchestrator | None = None


def create_orchestrator(db_url: str) -> PVCUOrchestrator:
    """Adapt the legacy sphere-0 constructor, which expects a SQLite path."""
    if not db_url.startswith("sqlite"):
        return PVCUOrchestrator(
            db_url=db_url,
            llm_base_url=os.getenv("PVC_U_LLAM_BASE_URL", "http://localhost:4000/v1"),
            llm_api_key=os.getenv("PVC_U_LL_API_KEY", "not-needed"),
            auto_correction=False,
        )

    sphere_class = pvc_u_orchestrator.Sphere0_MetaValidator
    sqlite_path = make_url(db_url).database
    if sqlite_path and sqlite_path != ":memory:":
        Path(sqlite_path).parent.mkdir(parents=True, exist_ok=True)

    class ProductSphere0(sphere_class):
        def __init__(self, _: str):
            super().__init__(sqlite_path)

    pvc_u_orchestrator.Sphere0_MetaValidator = ProductSphere0
    try:
        return PVCUOrchestrator(
            db_url=db_url,
            llm_base_url=os.getenv("PVC_U_LLAM_BASE_URL", "http://localhost:4000/v1"),
            llm_api_key=os.getenv("PVC_U_LL_API_KEY", "not-needed"),
            auto_correction=False,
        )
    finally:
        pvc_u_orchestrator.Sphere0_MetaValidator = sphere_class


class ValidationRequest(BaseModel):
    domain: str = Field(default="general", max_length=40)
    prompt: str = Field(min_length=1, max_length=30000)
    response: str = Field(min_length=1, max_length=30000)
    profile: str = Field(default="default", max_length=40)


def serialize_validation(result: Any) -> dict[str, Any]:
    return {
        "valid": result.is_valid,
        "errors": result.errors,
        "warnings": result.warnings,
        "score": result.meta_validation_score if result.meta_validation_score is not None else 0.5,
        "risk_percent": result.risk_assessment * 100,
        "spheres_executed": [str(getattr(sphere, "value", sphere)) for sphere in result.spheres_executed],
    }


def serialize_report(total: int, valid: int, average: float | None, domains: list[Any]) -> dict[str, Any]:
    return {
        "total_entries": total,
        "validation_rate": round(valid / max(total, 1) * 100, 1),
        "avg_score": round(float(average or 0), 3),
        "by_domain": [{"domain": row.domain, "total": row.total, "valid": row.valid or 0} for row in domains],
    }


def serialize_events(rows: list[Any]) -> list[dict[str, Any]]:
    return [
        {
            "id": row.id,
            "timestamp": row.timestamp.isoformat(),
            "domain": row.domain,
            "valid": bool(row.is_valid),
            "error_count": row.error_count,
            "warning_count": row.warning_count,
            "score": row.meta_score,
            "checksum": row.checksum,
        }
        for row in rows
    ]


@asynccontextmanager
async def lifespan(_: FastAPI):
    global orchestrator
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    db_url = os.getenv("PVC_U_DB_URL", f"sqlite+pysqlite:///{(DATA_DIR / 'pvc_u_ledger.db').as_posix()}")
    engine = create_orchestrator(db_url)
    def privacy_preserving_log(envelope: Any) -> None:
        values = ledger_record_values(engine.ledger, envelope)
        session = sessionmaker(bind=engine.ledger._get_engine())()
        try:
            session.add(LedgerEntry(**values))
            session.commit()
        finally:
            session.close()

    engine.ledger.log = privacy_preserving_log

    orchestrator = engine
    yield
    orchestrator = None
    engine.ledger._get_engine().dispose()


app = FastAPI(
    title="Assurance PVC-U",
    description="API local para validación técnica de respuestas de agentes de IA.",
    version="1.0.0",
    lifespan=lifespan,
)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "healthy", "product": "assurance-pvcu", "version": "1.0.0"}


@app.post("/v1/validate")
async def validate(request: ValidationRequest) -> dict[str, Any]:
    if orchestrator is None:
        raise HTTPException(status_code=503, detail="El motor PVC-U aún no está listo.")
    try:
        result = await orchestrator.validate(
            domain=request.domain,
            payload={"prompt": request.prompt, "response": request.response},
            profile=request.profile,
        )
        return serialize_validation(result)
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail="No se pudo completar la validación. Revisa la configuración del servicio.",
        ) from exc


def _ledger_session():
    if orchestrator is None:
        raise HTTPException(status_code=503, detail="El motor PVC-U aún no está listo.")
    return sessionmaker(bind=orchestrator.ledger._get_engine())()


@app.get("/v1/report")
def report() -> dict[str, Any]:
    session = _ledger_session()
    try:
        total = session.query(func.count(LedgerEntry.id)).scalar() or 0
        valid = session.query(func.count(LedgerEntry.id)).filter(LedgerEntry.is_valid == 1).scalar() or 0
        average = session.query(func.avg(LedgerEntry.meta_score)).scalar()
        domains = session.query(
            LedgerEntry.domain,
            func.count(LedgerEntry.id).label("total"),
            func.sum(LedgerEntry.is_valid).label("valid"),
        ).group_by(LedgerEntry.domain).all()
        return serialize_report(total, valid, average, domains)
    finally:
        session.close()


@app.get("/v1/events")
def events() -> dict[str, Any]:
    session = _ledger_session()
    try:
        rows = session.query(LedgerEntry).order_by(LedgerEntry.timestamp.desc()).limit(30).all()
        return {"events": serialize_events(rows)}
    finally:
        session.close()


@app.get("/v1/stats")
def stats() -> dict[str, Any]:
    return {"ledger_stats": report()}


@app.get("/product/prices")
def prices() -> dict[str, Any]:
    try:
        return json.loads(PRICE_FILE.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        raise HTTPException(status_code=503, detail="El catálogo de precios no está disponible.") from exc
