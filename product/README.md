# Assurance PVC-U

Aplicación autoalojada para validar intercambios de agentes de IA con PVC-U y consultar el ledger de la instalación. La validación principal es gratuita; los planes de soporte son opcionales y se leen de `plataforma/precios.json`.

## Inicio rápido con Docker

Requiere Docker Engine y Docker Compose. Desde la raíz del repositorio:

```powershell
docker compose up --build
```

Abre <http://localhost:8080>. El API queda disponible a través del proxy web bajo `/api/`; el healthcheck espera a que responda antes de iniciar el frontend. El ledger SQLite se guarda en `data/pvc_u_ledger.db`, dentro del volumen local `./data`.

Para detener los servicios, ejecuta `docker compose down`. Los datos del ledger permanecen en `data/`.

## Ejecución sin Docker

Requiere Python 3.12 o posterior. Desde la raíz del repositorio, instala el adaptador y el núcleo local:

```powershell
python -m pip install -r product/api/requirements.txt
python -m pip install -e legacy/pvc-u-core
python -m uvicorn product.api.main:app --reload
```

En otra terminal, sirve `product/web` con un servidor estático y configura el proxy `/api/` hacia `http://127.0.0.1:8000/`, como en `product/web/nginx.conf`. La interfaz requiere mismo origen para sus llamadas al API.

## API

El API documenta su esquema interactivo en `/docs` cuando se ejecuta en `http://127.0.0.1:8000`.

- `GET /health`: estado de preparación.
- `POST /v1/validate`: valida `{ "domain", "prompt", "response", "profile" }` y devuelve veredicto, score, errores, avisos y esferas ejecutadas.
- `GET /v1/report`: resumen agregado del ledger.
- `GET /v1/events`: hasta 30 eventos recientes, sin prompt ni respuesta.
- `GET /v1/stats`: resumen bajo `ledger_stats`.
- `GET /product/prices`: oferta tomada de `plataforma/precios.json`.

## Privacidad y operación

La instalación no activa telemetría ni requiere un proveedor externo. El valor predeterminado del backend es el router local configurado por PVC-U; configurar un proveedor remoto puede transferirle contenido de las validaciones. Revisa esa configuración antes de usar datos sensibles.

Los prompts y las respuestas se redactan antes de persistir en el ledger, y el API no los devuelve en eventos. Protege `data/` y haz copias de seguridad regulares. Antes de exponer la instalación a una red pública, configura TLS, autenticación perimetral, retención y copias.

Los resultados son señales técnicas para revisión humana. No son certificaciones regulatorias ni demuestran por sí solos cumplimiento legal o veracidad.

## Oferta comercial

El núcleo permanece disponible sin pago. Soporte, operación gestionada e integración son servicios opcionales; los importes se leen desde `plataforma/precios.json`. No hay checkout ni cobro automático en esta instalación. La contratación se consulta en <https://github.com/belentani7/assurance-pvcu/issues/new/choose>.
