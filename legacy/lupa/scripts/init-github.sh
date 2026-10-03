#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REMOTE_URL="${1:-}"

if [[ -z "$REMOTE_URL" ]]; then
  cat <<'USAGE'
Uso:
  ./scripts/init-github.sh https://github.com/TU_USUARIO/lupa.git

Por seguridad, el script solo imprime los comandos de Git por defecto.
Para ejecutarlos en este equipo, añade APPLY=1 antes del comando.
USAGE
  exit 1
fi

cat <<COMMANDS
Comandos que se ejecutarán desde:
  $ROOT_DIR

git init
git branch -M main
git add .
git commit -m "chore: initial production-ready LUPA repository"
git remote add origin "$REMOTE_URL"
git push -u origin main
COMMANDS

if [[ "${APPLY:-0}" != "1" ]]; then
  echo
  echo "Simulación terminada. Para aplicar estos comandos: APPLY=1 $0 $REMOTE_URL"
  exit 0
fi

cd "$ROOT_DIR"
git init
git branch -M main
git add .
git commit -m "chore: initial production-ready LUPA repository"
git remote add origin "$REMOTE_URL"
git push -u origin main
