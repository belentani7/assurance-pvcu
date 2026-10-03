# Política de seguridad de LUPA

## Principios

LUPA está diseñado para explicar tecnología sin recoger secretos ni capturar la pantalla de una persona de forma oculta. La versión web no solicita claves privadas. La aplicación Android solo puede mostrar su burbuja flotante después de que el usuario conceda el permiso de superposición de Android.

## Secretos y configuración

Nunca se deben incluir claves, contraseñas, archivos `.env`, archivos de firma Android ni tokens de terceros en el repositorio. Se parte de `.env.example`, se crea un `.env` local y se conserva fuera del control de versiones. Las variables que comienzan con `VITE_` llegan al navegador; por tanto, no pueden contener secretos.

## Informe responsable de vulnerabilidades

No publiques un detalle de seguridad sensible en un issue público. En su lugar, crea un canal privado con la persona responsable del repositorio y aporta una descripción mínima para reproducir el problema, el alcance y una recomendación de corrección. Hasta que exista un canal privado, no adjuntes datos personales, capturas de pantalla reales ni tokens.

## Límites actuales

La versión Android no implementa OCR ni captura automática de pantalla. Cualquier futuro uso de captura deberá pedir permiso visible de Android en cada flujo aplicable y explicar qué contenido se procesa, dónde se procesa y cómo se elimina.
