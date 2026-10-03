# LUPA

> **LUPA traduce la complejidad técnica a explicaciones claras, a tu ritmo y en tu idioma.**

LUPA es una experiencia educativa para personas que empiezan con código y sistemas digitales. La versión web permite explorar ejemplos de Python, PowerShell, HTML y JavaScript; la versión Android añade una burbuja flotante nativa que puede mostrarse sobre otras aplicaciones cuando el usuario concede el permiso correspondiente.

## Características incluidas

| Área          | Capacidades incluidas                                                                            |
| ------------- | ------------------------------------------------------------------------------------------------ |
| Web           | Landing pública, Demo interactiva, modo claro/oscuro, rutas Home y Demo                          |
| Idiomas       | Español, Català, Português e English                                                             |
| Explicaciones | Conceptos cotidianos y ejemplos para Python, PowerShell, HTML y JavaScript                       |
| Calidad       | TypeScript, Vitest, cobertura de la lógica crítica y formateo con Prettier                       |
| Android       | Aplicación Java nativa, permiso de superposición, servicio en primer plano y burbuja arrastrable |
| Operaciones   | Docker para la web, Docker Compose, GitHub Actions, scripts de validación y backup               |

> La versión 1.0 **no** incluye OCR, captura automática de pantalla, análisis de código en vivo, cuentas de usuario ni sincronización entre dispositivos. Esas funciones requieren una fase posterior con consentimiento explícito y pruebas específicas.

## Estructura

```text
apps/web/       Aplicación React/Vite
apps/android/   Aplicación Android nativa y overlay
docs/           Arquitectura, instalación, seguridad y backup
tests/          Plan y documentación de pruebas
assets/         Referencias de activos no binarios
scripts/        Validación, GitHub y Google Drive
```

El detalle de módulos, decisiones y árbol de archivos está en [docs/PRODUCTION_PLAN.md](docs/PRODUCTION_PLAN.md).

## Requisitos

| Componente     | Requisito                                                             |
| -------------- | --------------------------------------------------------------------- |
| Web            | Node.js 22 y pnpm 10.4.1                                              |
| Android        | JDK 21, Android SDK API 35 y Gradle Wrapper                           |
| Contenedor web | Docker Engine y Docker Compose v2                                     |
| Backup         | Bash, `zip` y Python 3 si se utilizará la subida programática a Drive |

## Inicio rápido de la web

```bash
cd apps/web
npm install -g pnpm@10.4.1
pnpm install --frozen-lockfile
pnpm dev
```

El servidor se abre normalmente en `http://localhost:3000`.

### Calidad de la web

```bash
cd apps/web
pnpm format:check
pnpm check
pnpm test:coverage
pnpm build
```

## Ejecutar la web con Docker

```bash
docker compose up --build
```

Después, abre `http://localhost:3000`. Para detenerla:

```bash
docker compose down
```

## Compilar Android

```bash
cd apps/android
export JAVA_HOME=/ruta/al/jdk-21
echo "sdk.dir=/ruta/al/android-sdk" > local.properties
./gradlew --no-daemon lint assembleRelease
```

El APK queda en `apps/android/app/build/outputs/apk/release/`. Antes de usar la burbuja, Android pedirá al usuario habilitar **Mostrar sobre otras aplicaciones**. Consulta [docs/INSTALLATION.md](docs/INSTALLATION.md) para los pasos completos.

## Configuración y secretos

No hay credenciales obligatorias para ejecutar la versión actual. Existe una plantilla segura en `apps/web/env.sample`. Por la política de seguridad del entorno, la plantilla se llama así en vez de `.env.example`; crea la configuración local manualmente y no la subas al repositorio.

Las variables con prefijo `VITE_` llegan al navegador, por lo que **no pueden contener secretos**. Lee [apps/web/SECURITY.md](apps/web/SECURITY.md) antes de integrar servicios externos.

## Publicar en GitHub

1. Crea un repositorio vacío llamado `lupa` desde la interfaz de GitHub, sin README ni `.gitignore` inicial.
2. Desde la carpeta raíz de este repositorio, ejecuta los comandos siguientes, sustituyendo `TU_USUARIO`:

```bash
git init
git branch -M main
git add .
git commit -m "chore: initial production-ready LUPA repository"
git remote add origin https://github.com/TU_USUARIO/lupa.git
git push -u origin main
```

También puedes usar `scripts/init-github.sh` para imprimir o, con `APPLY=1`, ejecutar estos comandos de forma guiada. El script no crea cuentas ni inicia sesión por ti.

## Copia de seguridad y Google Drive

```bash
./scripts/create-backup.sh
```

El script genera `backups/Proyecto_LUPA_Backup_FECHA.zip` y dentro organiza una carpeta con `src`, `docs`, `tests` y `assets`. Para subirlo mediante la interfaz o la API de Google Drive, consulta [docs/BACKUP_AND_DRIVE.md](docs/BACKUP_AND_DRIVE.md). La automatización de Drive se entrega como código, pero no realiza autenticación ni subidas por sí sola.

## Automatización

El flujo [`.github/workflows/main.yml`](.github/workflows/main.yml) ejecuta en cada pull request y push a `main`:

1. Formateo, TypeScript, pruebas, cobertura y build de la web.
2. Lint y build release de la app Android.

## Licencia

Este proyecto usa la licencia [MIT](LICENSE).
