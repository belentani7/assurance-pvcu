#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WEB_DIR="$ROOT_DIR/apps/web"
ANDROID_DIR="$ROOT_DIR/apps/android"

echo "==> Verificando web"
pushd "$WEB_DIR" >/dev/null
if ! command -v pnpm >/dev/null 2>&1; then
  echo "pnpm no está disponible. Instálalo con: npm install -g pnpm@10.4.1" >&2
  exit 1
fi
if [[ "$(pnpm --version)" != "10.4.1" ]]; then
  echo "Se recomienda pnpm 10.4.1; versión encontrada: $(pnpm --version)" >&2
fi
pnpm install --frozen-lockfile
pnpm format:check
pnpm check
pnpm test:coverage
pnpm build
popd >/dev/null

echo "==> Verificando Android"
if [[ -z "${JAVA_HOME:-}" ]]; then
  echo "JAVA_HOME no está definido. Configúralo con un JDK 21 para validar Android." >&2
  exit 1
fi

if [[ ! -f "$ANDROID_DIR/local.properties" ]]; then
  echo "Falta apps/android/local.properties. Define sdk.dir antes de validar Android." >&2
  exit 1
fi

pushd "$ANDROID_DIR" >/dev/null
./gradlew --no-daemon lint assembleRelease
popd >/dev/null

echo "==> Verificación completada"
