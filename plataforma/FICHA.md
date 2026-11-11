

<!-- repo-forge:plataforma-ficha:inicio -->
# Ficha — Assurance PVCU (`assurance-pvcu`)

> Generada por repo-forge el 2026-11-10 desde el árbol real. Cada cifra tiene su fuente en
> [`docs/FUENTES.md`](../docs/FUENTES.md).

## 1. Identidad

| Campo | Valor |
|---|---|
| Repositorio | `belentani7/assurance-pvcu` |
| Tipo de plataforma | herramienta de línea de comandos en Python |
| Modelo de producto | repositorio unificado de 10 proyectos (paraguas) |
| Público | equipo interno y auditores |
| Stack medido | TypeScript 35.1%, YAML 29.8%, JSON 9.5%, HTML 9.0%, Python 6.8%, Markdown 5.6% |
| Tamaño | 633 archivos · 96936 líneas · 3.4 MB |

## 2. Máximo potencial

monorepo de referencia con contratos, estados y trazabilidad de los 10 proyectos

Ese es el techo, no el estado. Lo que hoy existe es lo del apartado 3.

## 3. Lo que hay hoy

- Páginas HTML: 32
- Tests: 25
- CI: sí
- Licencia: sí
- README: sí (103 líneas)
- Cumplimiento de reglas: **32/34** (94.1%)

## 4. Diseño de plataforma que la promesa exige

| Módulo | Por qué | Estado |
|---|---|---|
| Contratos | La promesa lo exige | pendiente |
| Estado por proyecto | La promesa lo exige | pendiente |
| Trazabilidad | La promesa lo exige | pendiente |

Datos: metadatos, informes.
Integraciones: git.

## 5. Brechas

Reglas en rojo: `WEB-05`, `SEO-01`.

Cada una tiene su corrección en `CAMBIOS.md` o queda declarada como pendiente.

## 6. Esfuerzo para llegar al techo

| Fase | Contenido | Días-persona |
|---|---|---|
| 1 | Cerrar reglas en rojo y dejar el gate en verde | 1 |
| 2 | Módulos 1–2 del diseño, con prueba | 9 |
| 3 | Módulos restantes y contenido real | 15 |
| 4 | Pulido, accesibilidad auditada y publicación | 6 |

Supuestos: una persona con contexto del stack, sin bloqueos externos, y sin contar
dependencias de terceros que hoy no estén instaladas.

## 7. Lo que este repositorio no va a hacer

afirmar estado no verificado

<!-- repo-forge:ficha -->
<!-- repo-forge:plataforma-ficha:fin -->
