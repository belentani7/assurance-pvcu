# Copia de seguridad y Google Drive

## Archivo ZIP local

Ejecuta el script desde la raíz del repositorio:

```bash
./scripts/create-backup.sh
```

El resultado se guarda en `backups/Proyecto_LUPA_Backup_AAAA-MM-DD.zip`. Dentro encontrarás esta organización:

```text
Proyecto_LUPA_Backup_AAAA-MM-DD/
├── src/      # Código web y Android
├── docs/     # Documentación y operaciones
├── tests/    # Plan de pruebas y archivos de prueba
└── assets/   # Referencias de activos versionados
```

## Subida manual a Google Drive

1. Abre Google Drive y crea una carpeta llamada `LUPA Backups`.
2. Dentro, crea una carpeta con la fecha de la copia, por ejemplo `2026-08-22`.
3. Sube el archivo ZIP generado a esa carpeta.
4. Si quieres navegar el contenido sin descargar el ZIP, extrae el archivo localmente y sube sus cuatro carpetas: `src`, `docs`, `tests` y `assets`.
5. Verifica que el tamaño y el hash SHA-256 local coinciden con la copia antes de borrar cualquier respaldo anterior.

## Subida programática opcional

El archivo `scripts/upload_to_google_drive.py` crea un árbol de carpetas en Drive y sube el ZIP y los directorios de backup. Para utilizarlo, el responsable debe crear sus propias credenciales OAuth de tipo **Aplicación de escritorio** en Google Cloud y ejecutar el script en su propio equipo:

```bash
python3 -m pip install google-api-python-client google-auth-oauthlib google-auth-httplib2
python3 scripts/upload_to_google_drive.py \
  --credentials /ruta/a/client_secret.json \
  --backup backups/Proyecto_LUPA_Backup_AAAA-MM-DD.zip
```

El script abre el flujo OAuth solo cuando la persona lo ejecuta. Este repositorio no incluye credenciales, tokens ni autenticación preconfigurada.
