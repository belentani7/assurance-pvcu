# Instalación y operación local

## Web

Instala Node.js 22 y pnpm 10.4.1. Después entra en `apps/web`, instala las dependencias bloqueadas y arranca el servidor.

```bash
cd apps/web
npm install -g pnpm@10.4.1
pnpm install --frozen-lockfile
pnpm dev
```

El uso local no necesita una clave de API. Si se añaden servicios externos, parte de `env.sample`, guarda los valores reales fuera del repositorio y no pongas secretos en variables `VITE_`.

## Android

Instala JDK 21 y Android SDK API 35. Define la ubicación del SDK en `apps/android/local.properties`, que está excluido por Git.

```bash
cd apps/android
echo "sdk.dir=/ruta/al/android-sdk" > local.properties
export JAVA_HOME=/ruta/al/jdk-21
./gradlew --no-daemon lint assembleRelease
```

El resultado se encuentra en `app/build/outputs/apk/release/`. Copia el APK a un teléfono Android 8.0 o superior, permite instalaciones desde esa fuente si Android lo solicita e instala el archivo.

Al abrir LUPA, pulsa el botón para permitir que aparezca sobre otras aplicaciones. Android abre sus propios ajustes; concede el permiso, vuelve a LUPA y activa la burbuja. La aplicación muestra una notificación mientras el servicio está activo. Para desactivarla, vuelve a LUPA y pulsa **Desactivar LUPA flotante**.

> Cada fabricante puede gestionar las baterías y los servicios en segundo plano de forma distinta. Si la burbuja se cierra, revisa la optimización de batería de LUPA en los ajustes del dispositivo.

## Contenedor web

El contenedor se construye desde la raíz del repositorio:

```bash
docker compose up --build
```

La configuración usa un usuario sin privilegios, sistema de archivos de solo lectura y un chequeo simple de disponibilidad HTTP. La parte Android no se compila en este contenedor.
