# SRS: assurance-pvcu

## Requisitos funcionales

1. El producto debe publicar una página de inicio con explicación del producto, flujo de uso, límites, instalación y planes/precios.
2. El usuario debe poder seleccionar un dominio, ingresar prompt y respuesta y enviar la petición al API PVC-U `POST /v1/validate`.
3. La interfaz debe mostrar estado de carga, error de conexión, resultado, score, errores, avisos y esferas ejecutadas que devuelve el API.
4. El usuario debe poder consultar resumen e historial obtenidos de `GET /v1/report` o `GET /v1/stats`; no se deben inventar métricas.
5. El API debe conservar la persistencia y validación provistas por PVC-U.
6. La instalación debe poder ejecutarse localmente y por Docker Compose con healthcheck.
7. La oferta y los precios deben mantener como fuente `plataforma/precios.json`; ninguna función de validación se oculta tras un plan.

## Requisitos no funcionales

- HTML semántico, navegación por teclado, foco visible, contraste AA, controles de al menos 44 px y soporte de movimiento reducido.
- Sin telemetría ni envío de payloads a servicios externos por defecto.
- Los payloads no deben incluirse en logs de aplicación.
- El producto debe tolerar API no disponible y respuestas incompletas sin mostrar datos ficticios.
- La documentación debe distinguir validación técnica de certificación o cumplimiento legal.

## Criterios de aceptación GWT

- Dado un API disponible, cuando se envía un payload válido, entonces la pantalla representa exactamente el resultado recibido.
- Dado un API no disponible, cuando se envía una validación, entonces aparece un error recuperable y se conservan los campos.
- Dado un texto vacío, cuando se intenta validar, entonces no se envía la petición.
- Dada una instalación limpia con Docker, cuando se inicia Compose, entonces el frontend y `/health` de la API responden.
- Dado un historial vacío, cuando se abre el panel, entonces se explica que aún no hay validaciones.
- Dado el catálogo de precios, cuando se muestran planes, entonces los importes coinciden con el JSON.
