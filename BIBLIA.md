# BIBLIA.md — assurance-pvcu

Doctrina del producto del ecosistema belentani7. Repositorio clonado de GitHub (belentani7/assurance-pvcu).

## Visión
Contenedor de gobernanza y aseguramiento PVC-U (aseguramiento) del ecosistema Belentani, que agrupa proyectos legacy de evidencia, ledger, dashboard, brújula, brújula web, proofmesh, núcleo PVC-U, frontend PVC-U, QBP core y Sentinel Gates.

## Misión
Proveer una capa de aseguramiento, trazabilidad y validación para módulos legacy del ecosistema, con pruebas básicas y gobernanza belentani7.

## Stack tecnológico
- Contenedor raíz: Python (tests/test_basic.py, scripts/export.py), sin package.json raíz.
- Subproyectos legacy (cada uno con su propio stack): evidence-ledger (Vite+React+TS+Drizzle), lupa (Android + web), metricool-pvcu-dashboard-audited, oss-compass (Python + typst), proofmesh, pvc-u-core (Python), pvc-u-frontend (React+TS+Vite), qbp-core (Python), sentinel-gates.
- Documentación y magia: magic/ (immersive, sfx, shader) en varios subproyectos.

## Reglas de desarrollo
- Protocolo spec-first: PRD → SRS → Design Doc → ADR → Plan → Tests GWT.
- Python: pytest, type hints, docstrings, no bare except.
- No secretos en código. Gitleaks antes de cada push. CODEOWNERS @belentani7.
- Convenciones de commit: `type(scope): summary`.

## Impeccable (diseño frontend)
- Registro product/brand. Pre-ship checklist obligatoria en subproyectos con HTML.
- focus-visible, contraste >= 4.5:1, touch targets >= 44px, HTML semántico, alt en imágenes.
- Hero heading <= 6rem. Tokens CANON: negro vacío #05030a, rojo neón #ff073a, dorado Zion #d4af37, cyan señal #4de8e0.

## Arquitectura
- Raíz: scripts/, tests/, legacy/ (subproyectos).
- legacy/: evidence-ledger, failure-atlas, lupa, metricool-pvcu-dashboard-audited, oss-compass, proofmesh, pvc-u-core, pvc-u-frontend, qbp-core, sentinel-gates.

## Convenciones de commit
`type(scope): summary` — feat, fix, docs, chore, refactor, test, perf, style.

## Seguridad
- gitleaks (.gitleaks.toml) reglas belentani.
- CODEOWNERS: @belentani7.
