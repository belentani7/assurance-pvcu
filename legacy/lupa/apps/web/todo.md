# Checklist de estabilización de LUPA

## Auditoría y web

- [x] Ejecutar comprobación TypeScript y build de producción de la web.
- [x] Revisar errores del navegador y rutas principales.
- [x] Verificar selector de idiomas y modo oscuro en Home y Demo.
- [x] Confirmar que no se han roto enlaces, botones ni navegación.
- [x] Corregir advertencias o errores que afecten a la experiencia.

## Android

- [x] Auditar la estructura Expo y sus dependencias reales.
- [x] Separar claramente el APK normal de la función de overlay persistente.
- [x] Implementar el servicio Android nativo necesario para mostrar una burbuja sobre otras apps.
- [x] Implementar solicitud y comprobación del permiso de superposición.
- [x] Evitar afirmar que captura de pantalla u OCR funcionan antes de integrarlos y probarlos.
- [x] Configurar compilación reproducible y firma de prueba.
- [x] Añadir recursos Android para Español, Català, Português e English.
- [x] Ejecutar comprobaciones de TypeScript y Gradle si el entorno lo permite.
- [x] Ejecutar lint Android y corregir el error de traducción detectado.

## Entrega

- [x] Generar el APK o documentar el bloqueo concreto si falta un entorno Android real.
- [x] Comprobar la disponibilidad de dispositivo/emulador; no hay ninguno conectado en el sandbox, por lo que la instalación física queda pendiente del teléfono del usuario.
- [x] Actualizar la documentación con capacidades reales, límites y pasos de instalación.
- [x] Guardar checkpoint de la versión estable.
- [x] Entregar un informe final honesto, sin afirmar una garantía absoluta no verificable.

## Criterio de salida

- [x] No quedan errores conocidos de compilación.
- [x] Las funciones declaradas coinciden con las funciones implementadas.
- [x] La web sigue funcionando después de los cambios Android.
- [x] El usuario recibe instrucciones concretas para la prueba final en Android.

## Repositorio listo para producción

- [ ] Documentar el alcance, los módulos y el árbol de archivos del repositorio.
- [ ] Añadir pruebas unitarias para la lógica de traducciones y conceptos.
- [ ] Añadir scripts de calidad, formato y cobertura al proyecto web.
- [ ] Crear configuración segura de entorno y exclusiones de secretos.
- [ ] Crear Dockerfile y docker-compose para la versión web de producción.
- [ ] Crear flujo de integración continua en GitHub Actions.
- [ ] Reescribir el README como documentación profesional de LUPA.
- [ ] Crear scripts de inicialización de GitHub y de copia de seguridad para Drive.
- [ ] Ejecutar pruebas, build, inspección del contenedor y validaciones finales.
- [ ] Guardar checkpoint de la versión preparada para producción.

## Registro

- Estado actual web: TypeScript y build pasan; Home, Demo, idioma y modo oscuro comprobados en preview. Se eliminó un 404 de `/demo` y se corrigió el contraste oscuro.
- Estado Android: overlay nativo compilado, firmado y localizado en cuatro idiomas; lint limpio. La prueba física en un dispositivo sigue pendiente porque no hay emulador ni teléfono conectado.
- Nota: un overlay persistente real en Android requiere componentes nativos y permisos del sistema; una pantalla React dentro de un APK no basta por sí sola.
- Nota: la validación 10/10 en un dispositivo físico no puede sustituirse por una compilación en sandbox.
