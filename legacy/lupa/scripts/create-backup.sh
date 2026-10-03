#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DATE_TAG="$(date +%F)"
BACKUP_NAME="Proyecto_LUPA_Backup_${DATE_TAG}"
BACKUP_DIR="$ROOT_DIR/backups"
OUTPUT_FILE="$BACKUP_DIR/${BACKUP_NAME}.zip"
STAGING_DIR="$(mktemp -d)"
PAYLOAD_DIR="$STAGING_DIR/$BACKUP_NAME"

cleanup() {
  rm -rf "$STAGING_DIR"
}
trap cleanup EXIT

mkdir -p "$BACKUP_DIR" "$PAYLOAD_DIR/src" "$PAYLOAD_DIR/docs" "$PAYLOAD_DIR/tests" "$PAYLOAD_DIR/assets"

# Structured source export: application code only, no installed dependencies,
# local builds, signing keys or environment files.
cp -R "$ROOT_DIR/apps/web/client/src" "$PAYLOAD_DIR/src/web"
cp -R "$ROOT_DIR/apps/android/app/src" "$PAYLOAD_DIR/src/android"
cp -R "$ROOT_DIR/docs/." "$PAYLOAD_DIR/docs/"
cp -R "$ROOT_DIR/tests/." "$PAYLOAD_DIR/tests/"
cp -R "$ROOT_DIR/assets/." "$PAYLOAD_DIR/assets/"

cp "$ROOT_DIR/README.md" "$ROOT_DIR/LICENSE" "$ROOT_DIR/Dockerfile" "$ROOT_DIR/docker-compose.yml" "$PAYLOAD_DIR/docs/"
cp "$ROOT_DIR/.github/workflows/main.yml" "$PAYLOAD_DIR/docs/github-actions-main.yml"

rm -f "$OUTPUT_FILE"
pushd "$STAGING_DIR" >/dev/null
zip -qr "$OUTPUT_FILE" "$BACKUP_NAME"
popd >/dev/null

echo "Backup creado: $OUTPUT_FILE"
echo "SHA-256: $(sha256sum "$OUTPUT_FILE" | awk '{print $1}')"
