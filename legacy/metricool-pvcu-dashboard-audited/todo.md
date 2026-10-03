
# Project TODO

- [ ] Configuración segura de credenciales de Metricool y parámetros del pipeline
- [x] Panel de ejecución para los pipelines login, planner y analytics
- [x] Estados exactos OK, ERR y SKIP visibles en toda la aplicación
- [x] Logs estructurados en tiempo real dentro de la UI
- [x] Historial detallado de ejecuciones con duración, pasos y errores
- [x] Gestor CRUD de publicaciones programadas
- [x] Selección de texto, hashtags, redes sociales y fecha/hora de publicación
- [x] Visualización de analíticas por red social y fecha de captura
- [x] Gráficos y snapshots históricos de KPIs
- [x] Exportación de publicaciones, analíticas e historial en CSV y JSON
- [ ] Gestión de perfiles de validación PVC-U
- [x] Configuración de esferas activas y políticas
- [x] Validation Ledger con códigos de error PVC
- [x] Dashboard resumen con último run, posts pendientes, KPIs y alertas
- [x] Estética premium: tipografía refinada, jerarquía, espaciado y componentes pulidos
- [x] Pruebas Vitest para procedimientos y lógica principal
- [x] Verificación visual responsive y corrección de errores

- [x] Reorientar la navegación y el dashboard al ciclo completo de automatización de contenido social
- [x] Añadir calendario editorial y vista de planificación multired
- [x] Añadir flujo de creación, edición, revisión y programación de contenido
- [x] Añadir estados del contenido: borrador, en revisión, programado, publicado y error
- [x] Añadir biblioteca de ideas y reutilización de contenido
- [x] Añadir configuración de redes sociales y destinos de publicación
- [ ] Mantener Metricool como integración/orquestador de los pipelines de automatización

## Correcciones de verificación pendientes

- [x] Conectar la UI real por tRPC para registrar publicaciones y ejecuciones principales
- [x] Proteger las credenciales de Metricool antes de persistirlas y añadir formulario funcional
- [x] Construir ejecución de pipelines con inicio, detención, logs estructurados e historial real
- [x] Completar CRUD de publicaciones con hashtags, redes, estados y calendario multired
- [x] Implementar exportaciones reales CSV/JSON y analíticas basadas en snapshots persistidos
- [x] Añadir gestión completa de perfiles PVC-U y escritura real en Validation Ledger
- [x] Añadir prueba Vitest del contrato de estados y verificar responsive en móvil

- [x] Eliminar el fallback hardcodeado del secreto de cifrado y exigir una clave segura del entorno
- [x] Añadir estados de carga, error, éxito y validación visible al formulario de configuración
- [x] Precargar settings.get en la pantalla de configuración para editar sin perder valores

## Brechas reales pendientes de integración profunda

- [ ] Implementar ejecución/orquestación real de los pipelines login, planner y analytics con parada efectiva y logs en vivo
- [ ] Crear vistas reales de analytics, dashboard y calendar conectadas a datos persistidos, eliminando fallbacks mock
- [ ] Completar CRUD de publicaciones con edición total, calendario multired y formularios persistidos
- [x] Generar exportaciones CSV/JSON desde datasets reales de publicaciones, analytics y runs
- [ ] Completar gestión de perfiles PVC-U y Validation Ledger con políticas editables, listados y acciones de mantenimiento
- [ ] Implementar biblioteca de ideas y configuración persistida de redes sociales
- [ ] Definir integración externa real con Metricool y su runtime de automatización

## Integración PVC-U Ω-Max

- [x] Añadir Validation Envelope versionado con validationId, traceId, spanId, layer y códigos PVC
- [x] Añadir validación estructural de formularios con esquemas Zod y errores accesibles
- [x] Añadir reglas semánticas y transiciones de estado para publicaciones y pipelines
- [x] Añadir headers de versión y propagación de traceId en la capa de cliente
- [x] Añadir sanitización de contenido social y controles de seguridad frontend
- [x] Añadir consentimiento GDPR/CCPA y minimización de datos de analítica
- [x] Añadir panel de observabilidad con trazas y métricas de validación
- [x] Añadir pruebas de validación, integración y flujos críticos
- [x] Documentar el árbol de capas y el contrato Ω-Max en README

## Auditoría extrema 10/10 y nuevo repositorio

- [x] Definir rúbrica 10/10 para backend, frontend, utilidad, relevancia, potencial e identidad
- [x] Auditar arquitectura, seguridad, persistencia, tRPC, validaciones, errores y pruebas
- [x] Auditar UI, accesibilidad, responsive, navegación, estados vacíos y consistencia visual
- [x] Auditar utilidad, relevancia, diferenciación, potencial de producto e identidad de marca
- [x] Documentar puntuación, evidencias, riesgos y criterio de aprobación/rechazo
- [ ] Aplicar únicamente mejoras aprobadas por la rúbrica 10/10
- [ ] Ejecutar build, TypeScript, Vitest y verificación visual final
- [ ] Crear repositorio GitHub nuevo y privado sin sobrescribir el proyecto actual
- [ ] Verificar el repositorio nuevo y entregar su URL y checkpoint

## Publicación GitHub solicitada

- [x] Preparar README y metadatos de publicación con el dictamen 8,37/10
- [x] Crear repositorio GitHub nuevo y privado
- [x] Publicar el estado actual auditado sin sobrescribir el proyecto existente
- [x] Verificar el repositorio remoto y entregar su URL

## Integración Duck Studio / Universal Core

- [x] Crear matriz de estado IMPLEMENTED/PARTIAL/MOCK/EXTERNAL_DEPENDENCY/NOT_IMPLEMENTED
- [x] Documentar ARCHITECTURE.md con Core, Project Engine, Content, AI, Media, Automation, Adapters y PVC-U
- [x] Documentar SECURITY.md, THREAT_MODEL.md, PRIVACY.md, PLUGIN_SECURITY.md, PVC-U.md y TEST_REPORT.md
- [x] Añadir modelo universal de contenido independiente de Metricool
- [ ] Añadir Project Engine con proyectos, clientes y aislamiento por tenant
- [ ] Añadir RBAC/ABAC para Duck, clientes, colaboradores y agentes
- [x] Añadir Validation Ledger enriquecido con actor, provider, model, policy, permissions, risk y validation results
- [x] Crear interfaz de adaptadores sociales con Metricool como adaptador y no como núcleo
- [x] Añadir AI Router agnóstico con modo determinista/manual cuando no haya API key
- [ ] Añadir modo local-first/offline-first y documentar límites del modo web actual
- [ ] Añadir Content Command Center con ciclo IDEA → DRAFT → REVIEW → APPROVED → SCHEDULED → PUBLISHED → ANALYZED
- [ ] Añadir centro de privacidad con eliminación/exportación de datos y minimización verificable
- [ ] Añadir controles de plugins: SBOM, escaneo de dependencias, licencia, sandbox y paquete firmado
- [ ] Añadir pruebas de aislamiento, permisos, eliminación, resiliencia sin API y seguridad
- [ ] Añadir UX de progreso en segundo plano sin declarar workers inexistentes
- [ ] Adaptar identidad visual a Duck Studio/PT-BR/neon green sin perder legibilidad
- [ ] Ejecutar auditoría final y publicar solo el estado realmente verificable
