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

<!-- repo-forge:biblia:inicio -->
# BIBLIA.md — assurance-pvcu

Doctrina del producto del repositorio `assurance-pvcu` del ecosistema belentani7.

## Visión

monorepo de referencia con contratos, estados y trazabilidad de los 10 proyectos

## Misión

Una herramienta que se puede auditar: dice qué hace, lo hace, y deja rastro de lo que hizo.

## Público

equipo interno y auditores

## Stack

herramienta de línea de comandos en Python · TypeScript, YAML, JSON, HTML, Python, Markdown

## Módulos que la promesa exige

- Contratos
- Estado por proyecto
- Trazabilidad

## Reglas de desarrollo

- Protocolo spec-first: PRD → SRS → Design Doc → ADR → Plan → Tests.
- Un cambio, un resultado verificable.
- Nada se afirma sin ejecución; lo no probado se declara como no probado.
- Escritura solo con confirmación; nada destructivo.
- Idioma del producto: español, salvo el público del repositorio.
- Secreto fuera de disco, logs y manifiestos.

## Lo que este repositorio no va a hacer

afirmar estado no verificado

## Convenciones

`type(scope): resumen` — feat, fix, docs, chore, refactor, test, perf.

<!-- repo-forge:biblia -->
<!-- repo-forge:biblia:fin -->
