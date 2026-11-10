"""assurance-pvcu — banco de datos canónico.

Generado por repo-forge desde el árbol real. Es la única fuente de verdad del
repositorio: si un dato no está aquí, no se afirma en ningún otro sitio.
"""
from __future__ import annotations

REPO = {
    "nombre": "assurance-pvcu",
    "remoto": "https://github.com/belentani7/assurance-pvcu",
    "tipo": "python-tool",
    "modelo": 'repositorio unificado de 10 proyectos (paraguas)',
    "publico": 'equipo interno y auditores',
    "licencia": "MIT",
    "medido": {
        "archivos": 633,
        "lineas": 96936,
        "bytes": 3524662,
        "html": 32,
        "tests": 25,
    },
    "modulos": ['Contratos', 'Estado por proyecto', 'Trazabilidad'],
    "paleta": {
        "bg": "#0f1419",
        "ink": "#e8eef6",
        "accent": "#3ec3fe",
    },
}


def resumen() -> str:
    """Una línea legible con el estado medido."""
    m = REPO["medido"]
    return f"{REPO['nombre']}: {m['archivos']} archivos, {m['lineas']} líneas, {m['html']} páginas HTML"


if __name__ == "__main__":
    print(resumen())
