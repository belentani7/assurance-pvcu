# Diseño: assurance-pvcu como producto autoalojado

## Propósito

Proporcionar a equipos de ingeniería una forma reproducible de ejecutar el núcleo PVC-U, probar la API desde una interfaz clara y consultar evidencia real. El producto será útil sin cuenta ni compra; los ingresos provienen de soporte, alojamiento gestionado y consultoría, conforme a la oferta existente.

## Objetivos y límites

El producto cubre una instalación local, el recorrido de validación, lectura del resumen/historial, documentación de API y presentación comercial. No implementa checkout, facturación automática, cuentas de usuario, multi-tenancy ni despliegue de infraestructura gestionada. No promete certificación HIPAA, PCI-DSS o GDPR.

## Enfoques considerados

1. **Landing de marketing solamente.** Menor esfuerzo, pero no ofrece el producto funcional que pide el repositorio y la validación actual del dashboard es simulada.
2. **Producto autoalojado conectado a PVC-U (seleccionado).** Reutiliza el API y ledger existentes, cambia de una UI demostrativa a un flujo real y preserva el uso abierto. Requiere documentar despliegue y enlazar la capa nueva con el paquete congelado.
3. **SaaS multiusuario con pagos.** Aporta cobro automatizado, pero contradice la política open-core escrita y necesita decisiones e infraestructura externa de identidad, aislamiento, protección de datos y pagos.

## Diseño

- Añadir una aplicación de producto nueva en la raíz, manteniendo `legacy/` como snapshot.
- La interfaz web consume el API PVC-U mediante rutas de mismo origen `/api/...`; el proxy de desarrollo/producción evita CORS abierto.
- El backend empaquetado usa `legacy/pvc-u-core` como dependencia, expone health, validación, reportes y métricas actuales.
- La UI recibe errores de forma explícita, no inventa datos y explica que los resultados son señales técnicas sujetas a revisión humana.
- La oferta lee los planes desde `plataforma/precios.json`. El CTA de compra lleva a las instrucciones de contratación documentadas; no se simula pago.
- Docker Compose inicia API y web; la instalación Python y la ejecución de desarrollo quedan documentadas.

## Seguridad y privacidad

El modo local evita transferencia externa. No se registra contenido de prompt/respuesta en logs nuevos. Los despliegues públicos deben configurar TLS, autenticación perimetral, copias del ledger y política de retención antes de exponerlos a datos sensibles; la instalación de referencia no se anuncia como certificada.

## Verificación

Cubrir en pruebas GWT el contrato de visualización, vacío/error y catálogo de precios; ejecutar la suite raíz y un build de la interfaz. Verificar los endpoints y el arranque Compose cuando el entorno disponga de Docker y dependencias.
