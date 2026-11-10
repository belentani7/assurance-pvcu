import unittest
from datetime import datetime
from types import SimpleNamespace

from product.api.main import serialize_events, serialize_report, serialize_validation


class TestProductApiSerialization(unittest.TestCase):
    def test_validation_response_matches_frontend_contract(self):
        result = SimpleNamespace(
            is_valid=False,
            errors=["injection"],
            warnings=["review"],
            meta_validation_score=0.62,
            risk_assessment=0.38,
            spheres_executed=[SimpleNamespace(value="sphere-3a-injection")],
        )
        self.assertEqual(serialize_validation(result), {
            "valid": False,
            "errors": ["injection"],
            "warnings": ["review"],
            "score": 0.62,
            "risk_percent": 38,
            "spheres_executed": ["sphere-3a-injection"],
        })

    def test_empty_ledger_report_is_zeroed(self):
        self.assertEqual(serialize_report(0, 0, None, []), {
            "total_entries": 0,
            "validation_rate": 0,
            "avg_score": 0,
            "by_domain": [],
        })

    def test_events_expose_evidence_metadata_but_not_payload_preview(self):
        event = SimpleNamespace(
            id="a1",
            timestamp=datetime(2026, 11, 10, 12, 0),
            domain="general",
            is_valid=1,
            error_count=0,
            warning_count=1,
            meta_score=0.8,
            checksum="aabb",
            payload_preview="private prompt text",
        )
        serialized = serialize_events([event])
        self.assertEqual(serialized[0]["id"], "a1")
        self.assertNotIn("payload_preview", serialized[0])
        self.assertNotIn("private prompt text", str(serialized))


if __name__ == "__main__":
    unittest.main()
