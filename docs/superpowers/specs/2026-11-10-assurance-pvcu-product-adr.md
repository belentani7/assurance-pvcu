# ADR: capa de producto raíz para assurance-pvcu

## Estado

Aceptado para esta implementación local.

## Contexto

El repositorio declara `legacy/` congelado y contiene allí el núcleo PVC-U y un dashboard React. El dashboard inspeccionado muestra métricas y respuestas estáticas; no está conectado al API. Los documentos de monetización preservan el núcleo gratuito y cobran solo por servicios opcionales.

## Decisión

Crear una capa de producto independiente en la raíz, usando PVC-U como backend y una interfaz web en mismo origen. Mantener intactos los snapshots legacy y no introducir checkout, autenticación de terceros ni SaaS.

## Consecuencias

- Se puede mejorar y desplegar la experiencia sin reescribir los proyectos de origen.
- La instalación local queda como camino funcional por defecto.
- El despliegue público sigue requiriendo controles operativos del cliente (TLS, autenticación, retención y copias).
- Los servicios comerciales se solicitan según la oferta existente; no se inventa disponibilidad de pagos automáticos.
