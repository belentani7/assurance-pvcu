import { describe, expect, it } from "vitest";
import { createValidationEnvelope, sanitizeSocialText, validationEnvelopeSchema } from "../shared/validation";
import { settingsFormSchema, publicationFormSchema, validationProfileSchema } from "../client/src/lib/omegaValidation";
import { canTransitionPublication, isPipelineStatus } from "../shared/domainRules";

describe("PVC-U Ω-Max validation envelope", () => {
  it("creates a traceable versioned envelope", () => {
    const envelope = createValidationEnvelope({ layer: "presentation", validationStatus: "PASSED" });
    expect(validationEnvelopeSchema.parse(envelope).protocol).toBe("PVC-U");
    expect(envelope.version).toBe("Ω-Max-1.0");
    expect(envelope.validationId).toBeTruthy();
  });

  it("validates the critical social operation forms", () => {
    expect(settingsFormSchema.safeParse({ metricoolEmail: "bad", timeoutMs: 10, retries: -1 }).success).toBe(false);
    expect(publicationFormSchema.safeParse({ title: "", body: "", hashtags: [], networks: [] }).success).toBe(false);
    expect(validationProfileSchema.safeParse({ name: "baseline", activeSpheres: ["4-A"] }).success).toBe(true);
  });

  it("enforces semantic state transitions and pipeline statuses", () => {
    expect(canTransitionPublication("draft", "review")).toBe(true);
    expect(canTransitionPublication("published", "draft")).toBe(false);
    expect(isPipelineStatus("OK")).toBe(true);
    expect(isPipelineStatus("RUNNING")).toBe(false);
  });

  it("rejects malformed PVC codes and sanitizes social text", () => {
    expect(() => validationEnvelopeSchema.parse({ validationId: "x", traceId: "t", spanId: "s", protocol: "PVC-U", version: "1", layer: "ui", validationStatus: "FAILED", errorCode: "INVALID", timestamp: new Date().toISOString(), metadata: {} })).toThrow();
    expect(sanitizeSocialText("<script>alert(1)</script> javascript:bad hello")).toBe("scriptalert(1)/script bad hello");
  });
});
