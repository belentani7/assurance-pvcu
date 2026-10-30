"""Tests básicos del monorepo assurance-pvcu.

Verifican (protocolo 5 Belentani):
- los artefactos de protocolo en la raíz (README, LICENSE, .gitignore);
- la integridad de los 10 bloques legacy (README y LICENSE por bloque);
- que ``scripts/export.py`` produce JSON válido con los 10 bloques;
- funciones puras reales de ``legacy/failure-atlas/failure_atlas.py``
  (search, by_severity, get_graph, stats) sin tocar archivos del bloque.

Corren con ``python -m unittest discover -s tests`` y también con pytest.
"""
from __future__ import annotations

import importlib.util
import json
import subprocess
import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LEGACY = ROOT / "legacy"
BLOQUES_ESPERADOS = {
    "pvc-u-core", "lupa", "metricool-pvcu-dashboard-audited", "proofmesh",
    "evidence-ledger", "oss-compass", "sentinel-gates", "pvc-u-frontend",
    "qbp-core", "failure-atlas",
}

SECCIONES_README = [
    "# assurance-pvcu", "## Qué hace", "## Stack", "## Instalación",
    "## Uso", "## Estructura", "## Scripts", "## Licencia", "## Utilidad",
]


def _cargar_failure_atlas():
    ruta = LEGACY / "failure-atlas" / "failure_atlas.py"
    spec = importlib.util.spec_from_file_location("failure_atlas", ruta)
    modulo = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(modulo)
    return modulo


class TestProtocolosRaiz(unittest.TestCase):
    def test_archivos_de_protocolo_presentes(self):
        for nombre in ("README.md", "LICENSE", ".gitignore"):
            self.assertTrue((ROOT / nombre).is_file(), f"falta {nombre} en la raíz")

    def test_license_mit_belentani_2026(self):
        texto = (ROOT / "LICENSE").read_text(encoding="utf-8")
        self.assertIn("MIT License", texto)
        self.assertIn("Copyright (c) 2026 Belentani", texto)

    def test_readme_con_secciones_obligatorias(self):
        texto = (ROOT / "README.md").read_text(encoding="utf-8")
        for seccion in SECCIONES_README:
            self.assertIn(seccion, texto, f"README sin la sección {seccion!r}")

    def test_gitignore_cubre_node_modules_y_pycache(self):
        texto = (ROOT / ".gitignore").read_text(encoding="utf-8")
        self.assertIn("node_modules", texto)
        self.assertIn("__pycache__", texto)
        self.assertIn(".env", texto)


class TestBloquesLegacy(unittest.TestCase):
    def test_diez_bloques_presentes(self):
        presentes = {p.name for p in LEGACY.iterdir() if p.is_dir()}
        self.assertEqual(presentes, BLOQUES_ESPERADOS)

    def test_cada_bloque_conserva_readme_y_license(self):
        for nombre in sorted(BLOQUES_ESPERADOS):
            bloque = LEGACY / nombre
            self.assertTrue((bloque / "README.md").is_file(), f"{nombre} sin README.md")
            self.assertTrue((bloque / "LICENSE").is_file(), f"{nombre} sin LICENSE")


class TestExport(unittest.TestCase):
    def test_export_produce_json_valido_con_10_bloques(self):
        resultado = subprocess.run(
            [sys.executable, str(ROOT / "scripts" / "export.py")],
            capture_output=True, text=True, timeout=120,
        )
        self.assertEqual(resultado.returncode, 0, resultado.stderr)
        data = json.loads(resultado.stdout)
        self.assertEqual(data["repo"], "belentani7/assurance-pvcu")
        self.assertEqual(data["total_bloques"], 10)
        self.assertEqual(len(data["blocks"]), 10)
        carpetas = {b["carpeta"] for b in data["blocks"]}
        self.assertEqual(carpetas, BLOQUES_ESPERADOS)

    def test_todos_los_bloques_reportan_readme_y_license(self):
        resultado = subprocess.run(
            [sys.executable, str(ROOT / "scripts" / "export.py")],
            capture_output=True, text=True, timeout=120,
        )
        data = json.loads(resultado.stdout)
        for bloque in data["blocks"]:
            self.assertTrue(bloque["tiene_readme"], f"{bloque['carpeta']} sin README")
            self.assertTrue(bloque["tiene_license"], f"{bloque['carpeta']} sin LICENSE")
            self.assertTrue(bloque["archivos"] > 0, f"{bloque['carpeta']} vacío")


class TestFailureAtlasFuncionesPuras(unittest.TestCase):
    """Funciones puras reales del bloque legacy/failure-atlas (solo lectura)."""

    @classmethod
    def setUpClass(cls):
        cls.fa = _cargar_failure_atlas()
        # Se inyectan datos reales del propio módulo (SAMPLE_FAILURES) en memoria;
        # nunca se llama a add()/_save(), así que no se escribe en legacy/.
        cls.atlas = cls.fa.FailureAtlas()
        cls.atlas.failures = list(cls.fa.SAMPLE_FAILURES)

    def test_search_matchea_campos_buscados(self):
        # search() solo mira title/root_cause/trigger/consequence/prevention
        # (no tags ni categoría): "stock" aparece en el título y en la
        # consecuencia del primer fallo de muestra.
        resultados = self.atlas.search("stock")
        self.assertEqual(len(resultados), 1)
        self.assertEqual(resultados[0]["title"], "Race condition en actualizacion de stock")
        # "usuarios" matchea el trigger de dos fallos distintos.
        self.assertEqual(len(self.atlas.search("usuarios")), 2)

    def test_by_severity_filtra(self):
        criticos = self.atlas.by_severity("critical")
        self.assertEqual(len(criticos), 3)
        self.assertTrue(all(f["severity"] == "critical" for f in criticos))

    def test_get_graph_mapea_trigger_a_consecuencia(self):
        grafo = self.atlas.get_graph()
        self.assertIn("Dos usuarios compran el ultimo item al mismo tiempo", grafo)
        self.assertEqual(
            grafo["Dos usuarios compran el ultimo item al mismo tiempo"],
            ["Stock negativo, overselling, clientes enojados"],
        )

    def test_stats_conteos(self):
        stats = self.atlas.stats()
        self.assertEqual(stats["total_failures"], len(self.fa.SAMPLE_FAILURES))
        self.assertEqual(stats["by_severity"]["critical"], 3)
        self.assertEqual(stats["by_category"]["security"], 1)


if __name__ == "__main__":
    unittest.main()
