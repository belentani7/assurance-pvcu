from __future__ import annotations

import json
from typing import Any


def redact_payload(payload: dict[str, Any]) -> dict[str, Any]:
    """Return ledger-safe metadata while removing user prompt and model response."""
    safe = dict(payload)
    for field in ("prompt", "response"):
        if field in safe:
            safe[field] = "[REDACTED]"
    return safe


def ledger_record_values(ledger: Any, envelope: Any) -> dict[str, Any]:
    """Build a PVC-U ledger row while ensuring user content is never persisted."""
    domain = envelope.domain.value if hasattr(envelope.domain, "value") else str(envelope.domain)
    check_data = {
        "envelope_id": envelope.id,
        "timestamp": str(envelope.timestamp),
        "domain": domain,
        "is_valid": bool(envelope.is_valid),
    }
    safe_preview = str(redact_payload(envelope.payload))[:1000]
    return {
        "id": envelope.id,
        "envelope_id": envelope.id,
        "timestamp": envelope.timestamp,
        "domain": domain,
        "payload_preview": safe_preview,
        "profile": envelope.profile,
        "is_valid": int(envelope.is_valid),
        "error_count": len(envelope.errors),
        "warning_count": len(envelope.warnings),
        "meta_score": envelope.meta_validation_score,
        "risk_assessment": envelope.risk_assessment,
        "checksum": ledger.compute_checksum(check_data),
        "spheres_executed": json.dumps([
            str(getattr(sphere, "value", sphere)) for sphere in envelope.spheres_executed
        ]),
        "entry_hash": ledger.compute_entry_hash(check_data),
    }
