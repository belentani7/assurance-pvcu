# Registro de validación

**Fecha de ejecución:** 2026-08-22

## Resultado de controles automatizados

| Área        | Comando                                      | Resultado                                                                |
| ----------- | -------------------------------------------- | ------------------------------------------------------------------------ |
| Formato web | `pnpm format:check`                          | Correcto                                                                 |
| Tipos web   | `pnpm check`                                 | Correcto                                                                 |
| Pruebas web | `pnpm test:coverage`                         | 3 archivos, 10 pruebas, 100 % en los módulos cubiertos                   |
| Build web   | `pnpm build`                                 | Correcto; advertencia no bloqueante por bundle JavaScript mayor a 500 kB |
| Android     | `./gradlew --no-daemon lint assembleRelease` | Correcto                                                                 |
| Scripts     | `bash -n` y `python3 -m py_compile`          | Correcto                                                                 |
| Backup      | `unzip -t`                                   | Correcto                                                                 |

La ejecución completa se puede repetir con:

```bash
JAVA_HOME=/ruta/al/jdk-21 ./scripts/verify.sh
```

Antes de ejecutar el comando, crea `apps/android/local.properties` con `sdk.dir=/ruta/al/android-sdk`.

## Artefactos comprobados

| Artefacto                 | Resultado                                                          |
| ------------------------- | ------------------------------------------------------------------ |
| APK                       | `apps/android/app/build/outputs/apk/release/app-release.apk`       |
| Identificador Android     | `com.lupa.widget`                                                  |
| Android mínimo / objetivo | 26 / 35                                                            |
| Firma APK                 | Esquema v2 válido; clave de prueba actual                          |
| SHA-256 del APK           | `550748a953bf585a0fe2c06cbf8fb8a69e0ac110c07f8f98cc11bcf9ba470d6f` |
| Backup                    | `backups/Proyecto_LUPA_Backup_2026-08-22.zip`                      |
| Tamaño del backup         | 136 KB                                                             |
| SHA-256 del backup        | `9f8cbd454288b18d74106022ccf45c8e6799a56857a69b98e51c2b0b3614460c` |

## Límites pendientes de validación manual

El sandbox no dispone de un teléfono ni de un emulador Android operativo. Por ello, falta comprobar en un dispositivo real el permiso de superposición, el arrastre de la burbuja sobre otras aplicaciones, la persistencia frente a la optimización de batería de cada fabricante y la instalación desde el APK.

El APK usa una clave de prueba para que pueda compilarse de manera reproducible. Antes de una distribución pública, el responsable debe crear y custodiar una clave de firma de lanzamiento propia, configurar la firma fuera del repositorio y volver a verificar el artefacto resultante.
