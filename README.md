# assurance-pvcu

Repositorio unificado (propuesta v2) que reúne **10** repos de `belentani7`: 6 públicos y 4 privados. Publicado en `github.com/belentani7/assurance-pvcu`.

**Nivel de visibilidad recomendado: PRIVADO.** Contiene repos privados o de terceros: no debe publicarse como repo público.

Cada carpeta de `legacy/` conserva el contenido del repo original sin reescribirlo. El historial git no se conserva (decisión de aplanado, 2026-10-02).

## Qué hace

Este monorepo funciona como **depósito de assurance del ecosistema Belentani**: concentra el código de gobernanza y validación continua (PVC-U, ProofMesh, QBP, Sentinel Gates), herramientas de evidencia (Evidence Ledger, OSS Compass, Failure Atlas) y aplicaciones asociadas (Lupa, dashboards), preservando cada bloque legacy congelado como snapshot de solo lectura. La raíz aporta los protocolos comunes (README, LICENSE, CI, tests, export) y un inventario verificable de los bloques.

## Origen de cada bloque

| Carpeta | Repo original | KB | Vis. | Sitio vivo | Descripción (de GitHub) |
|---|---|--:|:--:|---|---|
| `legacy/pvc-u-core` | [`pvc-u-core`](https://github.com/belentani7/pvc-u-core) | 325 | pub | — | Protocolo de Validación Continua Universal — Kernel de gobernanza para Empresas de IA Autó |
| `legacy/lupa` | [`lupa`](https://github.com/belentani7/lupa) | 284 | priv | — | Lupa - herramienta de analisis y observacion (proyecto experimental). |
| `legacy/metricool-pvcu-dashboard-audited` | [`metricool-pvcu-dashboard-audited`](https://github.com/belentani7/metricool-pvcu-dashboard-audited) | 282 | priv | — | Northstar Social Ops incorpora una capa de validación versionada basada en un Validation E |
| `legacy/proofmesh` | [`proofmesh`](https://github.com/belentani7/proofmesh) | 254 | pub | pages | Evidence-first change intelligence with strict 6-criteria, 3-node, 3-level gates |
| `legacy/evidence-ledger` | [`evidence-ledger`](https://github.com/belentani7/evidence-ledger) | 139 | pub | pages | Local-first evidence receipts for AI and Trust & Safety decisions |
| `legacy/oss-compass` | [`oss-compass`](https://github.com/belentani7/oss-compass) | 101 | pub | pages+vercel | Universal validation envelopes with auditable 2-of-3 node confirmation |
| `legacy/sentinel-gates` | [`sentinel-gates`](https://github.com/belentani7/sentinel-gates) | 68 | priv | — | Plantilla SEDA/CSG para quality gates, seguridad y gobernanza de proyectos TypeScript. |
| `legacy/pvc-u-frontend` | [`pvc-u-frontend`](https://github.com/belentani7/pvc-u-frontend) | 64 | pub | pages | PVC-U Dashboard — Liquid Glass/Neon Aesthetic con React 19 + Vite 7 |
| `legacy/qbp-core` | [`qbp-core`](https://github.com/belentani7/qbp-core) | 46 | pub | pages+vercel | Core SDK for the Quadrachy Binding Protocol - structured format for defining and validatin |
| `legacy/failure-atlas` | [`failure-atlas`](https://github.com/belentani7/failure-atlas) | 5 | priv | — | Base de datos de como se rompen las cosas. Genera grafo: "Si haces X en contexto Y, termin |

## Stack

- **Python 3.12** — `legacy/pvc-u-core`, `legacy/oss-compass`, `legacy/qbp-core` (cada uno con `pyproject.toml`) y `legacy/failure-atlas` (script único, stdlib).
- **TypeScript / React + Vite** — `legacy/evidence-ledger`, `legacy/lupa/apps/web`, `legacy/metricool-pvcu-dashboard-audited`, `legacy/proofmesh`, `legacy/pvc-u-frontend` (lockfiles pnpm; `pvc-u-frontend` usa npm).
- **Android / Java** — `legacy/lupa/apps/android` (Gradle).
- **HTML/CSS/JS estático** — páginas `docs/` y `ecosistema.html` de varios bloques.
- **CI** — GitHub Actions en la raíz (`quality`, `codeql`) + workflows heredados dentro de cada bloque.

## Instalación

No hay instalación a nivel de raíz: este repo es un snapshot de assurance, no una aplicación única. Cada bloque conserva su propio `README.md` con sus instrucciones:

- Bloques Python: dependencias declaradas en su `pyproject.toml` (p. ej. `pip install -e legacy/oss-compass`).
- Bloques TS/React: dependencias en su `package.json` con lockfile (`pnpm install` / `npm ci` dentro de la carpeta del bloque).

Los tests de la raíz no requieren dependencias externas (unittest de la stdlib).

## Uso

```bash
# Verificar los protocolos y funciones puras del repo (desde la raíz)
python -m unittest discover -s tests -v
# o con pytest
pytest -q tests

# Generar el inventario JSON de los bloques legacy
python scripts/export.py
python scripts/export.py -o inventario.json
```

Para ejecutar un bloque concreto, entra en `legacy/<nombre>/` y sigue su README.

## Estructura

```
assurance-pvcu/
├── .github/            # CI raíz: quality.yml, codeql.yml, dependabot.yml, CODEOWNERS
├── scripts/
│   └── export.py       # Inventario JSON de los bloques legacy (protocolo 11)
├── tests/
│   └── test_basic.py   # Protocolos, integridad de bloques, export y funciones puras
└── legacy/             # 10 repos originales, contenido congelado
    ├── pvc-u-core/       # Python — kernel de gobernanza PVC-U
    ├── lupa/             # Android + web React — herramienta de análisis y observación
    ├── metricool-pvcu-dashboard-audited/  # TS/Vite — dashboard con validación versionada
    ├── proofmesh/        # TS/Vite — change intelligence con gates estrictos
    ├── evidence-ledger/  # TS/Vite — recibos de evidencia local-first
    ├── oss-compass/      # Python — envelopes de validación universal
    ├── sentinel-gates/   # Plantilla SEDA/CSG de quality gates
    ├── pvc-u-frontend/   # React 19 + Vite 7 — dashboard PVC-U
    ├── qbp-core/         # Python — Quadrachy Binding Protocol SDK
    └── failure-atlas/    # Python — base de datos de cómo se rompen las cosas
```

## Scripts

| Script | Qué hace |
|---|---|
| `scripts/export.py` | Recorre `legacy/` y emite por stdout un JSON con cada bloque: repo original, nº de archivos, lenguajes, y presencia de README/LICENSE/CI/tests/lockfile. Acepta `-o <archivo>` para guardar la salida. |

## Utilidad

- **Utilidad social:** preserva en un único punto auditable el patrimonio de herramientas de validación continua y evidencia del ecosistema, de modo que las decisiones, los quality gates y las lecciones registradas (p. ej. Failure Atlas) no se pierdan y puedan consultarse o verificarse por cualquier miembro.
- **Utilidad comercial:** sirve como base de gobernanza reutilizable (PVC-U, ProofMesh, QBP, Sentinel Gates) para ofrecer assurance y auditoría de agentes/sistemas de IA como servicio, con un inventario exportable (`scripts/export.py`) que sostiene esa capa de servicio.

## Licencia

MIT — Copyright (c) 2026 Belentani (ver [`LICENSE`](LICENSE)). Cada bloque de `legacy/` conserva además su propia licencia original.
