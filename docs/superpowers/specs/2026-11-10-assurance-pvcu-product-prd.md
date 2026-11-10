# PRD: assurance-pvcu

## Intención

Convertir el repositorio de assurance en un producto autoalojado que permita a un equipo enviar prompt y respuesta de un agente, ejecutar PVC-U, revisar evidencias y decidir si la respuesta se publica.

## Usuarios

- Equipos que integran agentes de IA y necesitan validación local auditable.
- Equipos que contratan opcionalmente soporte, despliegue gestionado o consultoría.

## Resultado

Una instalación local reproducible con interfaz web, API de validación y registro de resultados. La capacidad principal permanece abierta y no depende de una cuenta de pago ni de un servicio SaaS.

## Objetivos

- Dar una primera validación desde el navegador sin datos demo falsos.
- Mostrar las validaciones realizadas y sus resultados verificables.
- Ofrecer instalación local y despliegue Docker documentados.
- Explicar precio y alcance de los servicios opcionales según `plataforma/precios.json`.
- Mantener `legacy/` inalterado como snapshots de origen.

## No objetivos

- Cobro con tarjeta, gestión de suscripciones, autenticación multiusuario o SaaS alojado.
- Afirmaciones de certificación regulatoria o garantías de que una validación demuestra cumplimiento normativo.
- Cambios o refactorizaciones en los proyectos congelados de `legacy/`.

## Restricciones

- Reutilizar el paquete PVC-U existente en `legacy/pvc-u-core`.
- Mantener el modelo de código abierto y servicios opcionales ya documentado.
- No incorporar claves, secretos, servicios externos obligatorios ni dependencias frontend pesadas.
- Todo dato del panel debe venir de la API o expresarse como estado vacío.

## Enfoque

Crear una capa de producto de raíz, autoalojada, que conecte una interfaz ligera con el API PVC-U existente. Una landing con enlaces solamente no da una experiencia funcional; convertir el monorepo en un SaaS cerrado contradice el modelo abierto documentado y añade cobros, cuentas e infraestructura no especificados. La capa local conserva la apertura y entrega un flujo ejecutable sin congelar el trabajo existente.

## Decisiones pendientes al implementador

Usar los contratos actuales de la API PVC-U; diseñar manejo honesto de errores y falta de historial; hacer que los precios se lean de la fuente JSON existente; documentar límites de validación.
