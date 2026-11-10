import unittest

from product.api.privacy import ledger_record_values, redact_payload


class TestPayloadRedaction(unittest.TestCase):
    def test_redacts_prompt_and_response_before_ledger_storage(self):
        redacted = redact_payload({
            "prompt": "datos privados de la persona",
            "response": "resultado con datos privados",
            "domain": "general",
        })
        self.assertEqual(redacted, {
            "prompt": "[REDACTED]",
            "response": "[REDACTED]",
            "domain": "general",
        })

    def test_keeps_non_sensitive_metadata(self):
        self.assertEqual(redact_payload({"prompt": "x", "response": "y", "ticket": "A-12"}), {
            "prompt": "[REDACTED]",
            "response": "[REDACTED]",
            "ticket": "A-12",
        })

    def test_ledger_record_contains_only_redacted_payload_and_real_validation_metadata(self):
        ledger = type("Ledger", (), {
            "compute_checksum": staticmethod(lambda value: "checksum"),
            "compute_entry_hash": staticmethod(lambda value: "entry-hash"),
        })()
        envelope = type("Envelope", (), {
            "id": "evt-1",
            "timestamp": "2026-11-10T12:00:00",
            "domain": type("Domain", (), {"value": "general"})(),
            "payload": {"prompt": "private prompt", "response": "private response"},
            "profile": "default",
            "is_valid": True,
            "errors": [],
            "warnings": [],
            "meta_validation_score": 0.9,
            "risk_assessment": 0.2,
            "spheres_executed": [type("Sphere", (), {"value": "sphere-3a"})()],
        })()
        record = ledger_record_values(ledger, envelope)
        self.assertNotIn("private prompt", record["payload_preview"])
        self.assertNotIn("private response", record["payload_preview"])
        self.assertEqual(record["payload_preview"], "{'prompt': '[REDACTED]', 'response': '[REDACTED]'}")
        self.assertEqual(record["entry_hash"], "entry-hash")


if __name__ == "__main__":
    unittest.main()
