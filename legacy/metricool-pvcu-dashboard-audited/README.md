

## PVC-U Ω-Max

Northstar Social Ops incorpora una capa de validación versionada basada en un **Validation Envelope** compartido en `shared/validation.ts`. Cada envelope incluye `validationId`, `traceId`, `spanId`, protocolo, versión, capa, estado, código de error PVC opcional, timestamp y metadata minimizada. Los formularios principales reutilizan esquemas Zod en `client/src/lib/omegaValidation.ts`, mientras que el contenido social se sanitiza antes de persistirse.

La arquitectura mantiene separación por responsabilidades: `client/src/pages` compone la experiencia, `client/src/lib` contiene validación y contratos de aplicación, `server/routers.ts` expone procedimientos tRPC, `server/db.ts` encapsula persistencia y `shared/` contiene contratos que deben permanecer independientes del transporte. El módulo `PrivacyConsent` controla el consentimiento visible para analítica minimizada.

Los códigos de validación de negocio deben conservar el prefijo `PVC-`, y los estados de pipeline se mantienen exactamente como `OK`, `ERR` y `SKIP`. La integración externa real con Metricool requiere configurar un runtime de automatización persistente y sus credenciales desde la pantalla de configuración; la consola no expone la contraseña cifrada al navegador.

## Auditoría extrema 10/10

La versión publicada en `metricool-pvcu-dashboard-audited` corresponde al estado auditado de Northstar Social Ops. La evaluación obtuvo **8,37/10** y no alcanzó el umbral 10/10 solicitado. El principal bloqueador es la ausencia de una integración real con Metricool y de un worker persistente con cancelación efectiva y logs en vivo. El detalle completo, la rúbrica y las condiciones de aprobación se encuentran en [`audits/audit-10x.md`](audits/audit-10x.md).

Esta publicación no reemplaza el proyecto WebDev original. El repositorio es privado y sirve como snapshot auditable para continuar el desarrollo con una base explícita de riesgos y pendientes.

## Duck Studio universal core

La plataforma está evolucionando desde una consola centrada en Metricool hacia **Duck Studio**: un core universal de contenido, proyectos, adaptadores sociales y validación PVC-U. Metricool queda tratado como una dependencia externa detrás de un adaptador; cuando no existe proveedor configurado, el AI Router conserva un modo manual determinista.

La arquitectura, seguridad, privacidad, modelo de amenazas, plugin security, PVC-U y pruebas están documentados en [`ARCHITECTURE.md`](ARCHITECTURE.md), [`SECURITY.md`](SECURITY.md), [`THREAT_MODEL.md`](THREAT_MODEL.md), [`PRIVACY.md`](PRIVACY.md), [`PLUGIN_SECURITY.md`](PLUGIN_SECURITY.md), [`PVC-U.md`](PVC-U.md), [`TEST_REPORT.md`](TEST_REPORT.md) e [`IMPLEMENTATION_STATUS.md`](IMPLEMENTATION_STATUS.md). Las capacidades parciales se etiquetan explícitamente y no se presentan como terminadas.
