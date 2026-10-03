# Estrategia de pruebas

## Web

Las pruebas unitarias viven junto a la lógica que protegen dentro de `apps/web/client/src/lib`. Cubren el catálogo de traducciones, el mapa de conceptos multilingüe, el catálogo español de respaldo y la utilidad de composición de clases.

```bash
cd apps/web
pnpm test
pnpm test:coverage
```

La cobertura se calcula sobre la lógica de `client/src/lib`, que es la parte determinista y crítica de la experiencia de explicaciones. La comprobación de TypeScript, el formateo y el build son pasos independientes para detectar problemas de integración.

## Android

Android se valida con Gradle:

```bash
cd apps/android
./gradlew --no-daemon lint assembleRelease
```

El lint revisa recursos, manifest y código. El build release verifica la generación y la firma de prueba. La prueba de superposición sobre otras aplicaciones exige un dispositivo físico o emulador, por lo que sigue siendo una validación manual obligatoria antes de una publicación pública.

## Lista manual de aceptación

| Flujo           | Resultado esperado                                                   |
| --------------- | -------------------------------------------------------------------- |
| Tema web        | El botón cambia entre claro y oscuro sin perder contraste            |
| Idioma web      | Los cuatro idiomas actualizan navegación, Demo y explicaciones       |
| Demo            | Los chips muestran explicaciones sencillas del concepto seleccionado |
| Permiso Android | La app abre el ajuste de superposición cuando falta permiso          |
| Burbuja Android | Se puede arrastrar, abrir, cerrar y detener desde la app             |
