

<!-- repo-forge:docs-arquitectura:inicio -->
# Arquitectura

## Tipo

herramienta de línea de comandos en Python

## Piezas observadas

| Pieza | Evidencia |
|---|---|
| Lenguajes | TypeScript 35.1%, YAML 29.8%, JSON 9.5%, HTML 9.0%, Python 6.8%, Markdown 5.6% |
| Puntos de entrada | legacy/oss-compass/src/oss_compass/cli.py, legacy/pvc-u-core/src/pvc_u/cli.py |
| Páginas HTML | 32 |
| Tests | 25 archivos |
| Dependencias de paquete | 0 |

## Capas propuestas

```text
contenido/      datos y textos versionados
plataforma/     ficha, diseño y contrato del producto
brand/          tokens, marca y activos
scripts/        verificación y operación
tests/          pruebas ejecutables
```

La propuesta no mueve archivos existentes: describe dónde debe vivir lo nuevo para que
el repositorio siga siendo legible.

## Deuda declarada

- 6 lenguajes: coste de contexto alto.

<!-- repo-forge:arquitectura -->
<!-- repo-forge:docs-arquitectura:fin -->
