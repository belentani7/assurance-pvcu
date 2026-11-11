FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PVC_U_DATA_DIR=/app/data

WORKDIR /app

COPY product/api/requirements.txt product/api/requirements.txt
COPY legacy/pvc-u-core/ legacy/pvc-u-core/
RUN pip install --no-cache-dir -r product/api/requirements.txt \
    && pip install --no-cache-dir ./legacy/pvc-u-core

COPY product/api/ product/api/
COPY plataforma/precios.json plataforma/precios.json

EXPOSE 8000
CMD ["uvicorn", "product.api.main:app", "--host", "0.0.0.0", "--port", "8000"]
