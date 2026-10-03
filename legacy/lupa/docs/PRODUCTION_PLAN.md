# LUPA — Plan de producción

## Objetivo

LUPA es una herramienta educativa que convierte partes del código y de los sistemas digitales en explicaciones claras para personas que empiezan. El producto se compone de una experiencia web interactiva y una aplicación Android con burbuja flotante nativa. El repositorio de producción conserva ambas piezas sin prometer funciones que aún no existen, como OCR o lectura automática de pantalla.

## Alcance de la versión 1.0

| Módulo                         | Responsabilidad                                                                               | Estado de la entrega               |
| ------------------------------ | --------------------------------------------------------------------------------------------- | ---------------------------------- |
| Web pública                    | Presentar LUPA, sus idiomas y su propuesta educativa                                          | Incluido                           |
| Demo interactiva               | Mostrar ejemplos de Python, PowerShell, HTML y JavaScript con explicaciones seleccionables    | Incluido                           |
| Motor de conceptos             | Resolver nombres, explicaciones y ejemplos en Español, Català, Português e English            | Incluido                           |
| Preferencias de interfaz       | Cambiar tema claro/oscuro e idioma                                                            | Incluido                           |
| Android flotante               | Pedir permiso, activar un servicio visible y mostrar una burbuja arrastrable sobre otras apps | Incluido                           |
| OCR y lectura de pantalla      | Analizar texto real de otras aplicaciones tras permiso explícito                              | Fuera de alcance de la versión 1.0 |
| Cuenta y progreso sincronizado | Guardar el aprendizaje entre dispositivos                                                     | Fuera de alcance de la versión 1.0 |

## Decisiones de arquitectura

La web usa **React 19**, **TypeScript**, **Vite**, **Tailwind CSS 4** y componentes de Radix/Shadcn. El estado de idioma y tema se mantiene en contextos pequeños de React y los conceptos se almacenan como datos tipados. El resultado es una aplicación estática rápida y sencilla de desplegar.

La burbuja Android usa una implementación nativa con **Java**, **Gradle** y Android SDK 35. La app abre una actividad de control y un servicio en primer plano. El servicio solicita y utiliza el permiso de superposición de Android para crear una ventana flotante; su texto se extrae de recursos localizados.

Para facilitar el trabajo local, el repositorio añade contenedores Docker solo para la web. La aplicación Android se compila con Gradle, fuera del contenedor web. La integración continua revisa TypeScript, pruebas unitarias, build web, build Android y lint Android.

## Árbol de directorios objetivo

```text
lupa-repository/
├── apps/
│   ├── web/                         # Aplicación React/Vite
│   │   ├── client/src/
│   │   │   ├── components/
│   │   │   ├── contexts/
│   │   │   ├── hooks/
│   │   │   ├── lib/
│   │   │   └── pages/
│   │   ├── server/
│   │   ├── package.json
│   │   └── vite.config.ts
│   └── android/                     # App Android nativa y overlay
│       ├── app/src/main/java/
│       ├── app/src/main/res/
│       ├── build.gradle
│       └── settings.gradle
├── docs/                            # Arquitectura, seguridad, instalación y operaciones
├── tests/                           # Pruebas de la lógica compartida
├── assets/                          # Referencias de activos; los binarios pesados no se versionan
├── scripts/                         # Automatización de validación, backup y publicación guiada
├── .github/workflows/               # Integración continua
├── Dockerfile
├── docker-compose.yml
├── .env.example
├── .gitignore
├── README.md
└── LICENSE
```

## Criterios de aceptación

La entrega se considera preparada para producción cuando la web supera TypeScript, pruebas unitarias y build; Android supera Gradle y lint; los secretos permanecen fuera del repositorio; el contenedor de la web se puede construir; existe automatización reproducible; y la documentación describe tanto las funciones activas como los límites pendientes.
