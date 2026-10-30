#!/usr/bin/env python3
"""Export del inventario del monorepo assurance-pvcu (Protocolo 11 Belentani).

Genera, en JSON por stdout, el registro de los bloques ``legacy/``: para cada
bloque original indica cuántos archivos conserva, qué lenguajes contiene y qué
artefactos de protocolo tiene (README, LICENSE, CI, tests, lockfile...).

Uso:
    python scripts/export.py            # JSON por stdout
    python scripts/export.py -o out.json

Solo lectura: no escribe dentro de legacy/ y no requiere dependencias.
"""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LEGACY = ROOT / "legacy"

REPOS_ORIGEN = {
    "pvc-u-core": "belentani7/pvc-u-core",
    "lupa": "belentani7/lupa",
    "metricool-pvcu-dashboard-audited": "belentani7/metricool-pvcu-dashboard-audited",
    "proofmesh": "belentani7/proofmesh",
    "evidence-ledger": "belentani7/evidence-ledger",
    "oss-compass": "belentani7/oss-compass",
    "sentinel-gates": "belentani7/sentinel-gates",
    "pvc-u-frontend": "belentani7/pvc-u-frontend",
    "qbp-core": "belentani7/qbp-core",
    "failure-atlas": "belentani7/failure-atlas",
}

EXT_LANGUAJES = {
    ".py": "python",
    ".ts": "typescript",
    ".tsx": "typescript",
    ".js": "javascript",
    ".mjs": "javascript",
    ".jsx": "javascript",
    ".java": "java",
    ".kt": "kotlin",
    ".html": "html",
    ".css": "css",
    ".sql": "sql",
    ".sh": "shell",
    ".bat": "batch",
    ".gradle": "groovy",
    ".xml": "xml",
}

IGNORAR_DIRS = {"node_modules", "__pycache__", ".venv", "venv", "dist", "build", ".next", "out"}


def _lenguajes(bloque: Path) -> list[str]:
    langs: set[str] = set()
    for ruta in bloque.rglob("*"):
        if not ruta.is_file():
            continue
        if any(part in IGNORAR_DIRS for part in ruta.parts):
            continue
        lang = EXT_LANGUAJES.get(ruta.suffix.lower(), "")
        if lang:
            langs.add(lang)
    return sorted(langs)


def _tiene_workflow(bloque: Path) -> bool:
    workflows = bloque / ".github" / "workflows"
    return workflows.is_dir() and any(workflows.glob("*.yml"))


def _tiene_tests(bloque: Path) -> bool:
    candidatos = [
        bloque / "tests",
        bloque / "test",
        bloque / "apps" / "web" / "client" / "src",
    ]
    if any(c.is_dir() for c in candidatos):
        if any(c.rglob("test_*.py") for c in candidatos if c.is_dir()):
            return True
        if any(c.rglob("*.test.*") for c in candidatos if c.is_dir()):
            return True
    return any(bloque.rglob("test_*.py")) or any(bloque.rglob("*.test.ts"))


def _lockfile(bloque: Path) -> str | None:
    for nombre in ("package-lock.json", "pnpm-lock.yaml", "yarn.lock"):
        if (bloque / nombre).is_file():
            return nombre
    return None


def exportar() -> dict:
    bloques = []
    for nombre in sorted(REPOS_ORIGEN):
        bloque = LEGACY / nombre
        if not bloque.is_dir():
            continue
        archivos = [
            r for r in bloque.rglob("*")
            if r.is_file() and not any(p in IGNORAR_DIRS for p in r.parts)
        ]
        bloques.append({
            "carpeta": nombre,
            "repo_original": REPOS_ORIGEN[nombre],
            "archivos": len(archivos),
            "lenguajes": _lenguajes(bloque),
            "tiene_readme": (bloque / "README.md").is_file(),
            "tiene_license": (bloque / "LICENSE").is_file(),
            "tiene_ci": _tiene_workflow(bloque),
            "tiene_tests": _tiene_tests(bloque),
            "lockfile": _lockfile(bloque),
        })
    return {
        "repo": "belentani7/assurance-pvcu",
        "descripcion": "Inventario del monorepo unificado: bloques legacy congelados y artefactos de protocolo por bloque",
        "total_bloques": len(bloques),
        "blocks": bloques,
    }


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("-o", "--out", type=Path, default=None, help="Escribir el JSON a un archivo además de stdout")
    args = parser.parse_args()

    data = exportar()
    texto = json.dumps(data, ensure_ascii=False, indent=2)
    print(texto)
    if args.out:
        args.out.write_text(texto + "\n", encoding="utf-8")
    return 0


if __name__ == "__main__":
    sys.exit(main())
