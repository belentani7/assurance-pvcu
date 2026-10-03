# Failure Atlas

Base de datos de como se rompen las cosas. Genera grafo: "Si haces X en contexto Y, termina pasando Z".

## Uso

```python
from failure_atlas import FailureAtlas

atlas = FailureAtlas()

# Agregar fallo
atlas.add({
    "title": "Race condition en stock",
    "root_cause": "Dos requests concurrentes leen mismo valor",
    "context": "E-commerce con PostgreSQL",
    "trigger": "Dos usuarios compran ultimo item",
    "consequence": "Stock negativo, overselling",
    "prevention": "SELECT FOR UPDATE, optimistic locking",
    "severity": "critical",
    "category": "database",
    "tags": ["race-condition", "database"]
})

# Buscar
results = atlas.search("security")

# Grafo de patrones
graph = atlas.get_graph()
```

## Licencia

MIT — Pedro Belentani 2026
