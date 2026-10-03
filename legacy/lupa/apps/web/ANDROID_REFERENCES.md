# Referencias técnicas usadas para el overlay Android

## [1] `SYSTEM_ALERT_WINDOW`

Fuente: [Android Manifest.permission reference](https://developer.android.com/reference/android/Manifest.permission)

La documentación oficial identifica `SYSTEM_ALERT_WINDOW` como el permiso que permite crear ventanas de tipo `TYPE_APPLICATION_OVERLAY`. LUPA lo declara en el manifest y solicita al usuario que lo active desde la pantalla de ajustes correspondiente.

## [2] Servicios en primer plano en Android 14+

Fuente: [Foreground service types are required](https://developer.android.com/about/versions/14/changes/fgs-types-required)

Cuando una aplicación dirigida a Android 14 o superior usa un foreground service, debe declarar un tipo de servicio adecuado y el permiso asociado. Para un helper persistente que no captura cámara ni micrófono en esta versión, LUPA usa el tipo `specialUse`, declara `FOREGROUND_SERVICE_SPECIAL_USE` y añade la propiedad `PROPERTY_SPECIAL_USE_FGS_SUBTYPE` con una descripción del caso de uso.

## [3] Requisitos y límites de los foreground services

Fuente: [Foreground service types](https://developer.android.com/develop/background-work/services/fgs/service-types)

Android muestra una notificación visible para los foreground services y comprueba que el tipo declarado coincida con el uso. Por eso LUPA crea un canal de notificación de baja importancia, mantiene una notificación persistente y no afirma que el overlay realice captura de pantalla u OCR: esas funciones requerirían permisos y APIs adicionales, incluida la autorización de MediaProjection para capturar la pantalla.

## Nota de verificación

El APK se ha compilado y firmado con la clave debug del entorno para pruebas de instalación. No hay un dispositivo Android o emulador conectado en el entorno actual, por lo que la prueba física de arranque, permiso de overlay y comportamiento entre aplicaciones queda pendiente de ejecutarse en un teléfono real.
