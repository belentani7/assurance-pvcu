# assurance-pvcu

Repositorio unificado (propuesta v2, local, sin publicar). Reúne **10** repos de `belentani7`: 6 públicos y 4 privados.

**Nivel de visibilidad recomendado: PRIVADO.** Contiene repos privados o de terceros: no debe publicarse como repo público.

Cada carpeta de `legacy/` conserva el contenido del repo original sin reescribirlo. El historial git no se conserva (decisión de aplanado, 2026-10-02).

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

## Comprobación local de integridad (sin modificar `legacy/`)

Este repositorio es una **instantánea aplanada**, no un monorepo compilable ni una copia restaurable de los 10 historiales originales. No ejecutar los workflows, instaladores o servicios anidados sin una revisión separada. La tabla anterior documenta el estado histórico de origen, **no** verifica que sus sitios sigan activos.

En un checkout limpio de este repositorio, con Python 3.9+:

```sh
python3 tools/verify_legacy.py --json
python3 -m unittest discover -s tests -v
```

`config/legacy-tree-lock.json` fija los SHA de árbol Git de los diez directorios originales observados en el commit `64882515c410bda999eb77a3eede0014f844a709`. El verificador calcula de nuevo los SHA desde el sistema de archivos **sin seguir symlinks**; sale con código distinto de cero ante archivos añadidos, perdidos, cambiados o un error de lectura. No usa red, no escribe en `legacy/` y no transmite contenido privado. Ejecútalo en un checkout limpio: artefactos de compilación no versionados dentro de `legacy/` producen una discrepancia intencional.

**Límites:** el resultado `VERIFIED` significa únicamente que los diez árboles locales coinciden con esos SHA de referencia. No demuestra que exista copia de Git LFS, issues/PR, releases, metadatos, datos de producción, cifrado offsite en Drive, restauración, análisis de secretos, derechos de terceros ni autorización de publicación. La CI se considerará pendiente hasta comprobar que un runner ejecutó realmente sus pasos. La visibilidad debe permanecer privada.
