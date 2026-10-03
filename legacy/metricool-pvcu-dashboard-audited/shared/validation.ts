import { z } from "zod";

export const validationStatusSchema = z.enum(["PASSED", "FAILED", "SKIPPED"]);
export const validationEnvelopeSchema = z.object({
  validationId: z.string().min(1),
  traceId: z.string().min(1),
  spanId: z.string().min(1),
  protocol: z.literal("PVC-U"),
  version: z.string().min(1),
  layer: z.string().min(1),
  validationStatus: validationStatusSchema,
  errorCode: z.string().regex(/^PVC-/).optional(),
  timestamp: z.string().datetime(),
  metadata: z.record(z.string(), z.string()).default({}),
});
export type ValidationEnvelope = z.infer<typeof validationEnvelopeSchema>;

export function createValidationEnvelope(input: Partial<ValidationEnvelope> & Pick<ValidationEnvelope, "layer" | "validationStatus">): ValidationEnvelope {
  const now = new Date().toISOString();
  return validationEnvelopeSchema.parse({
    validationId: input.validationId ?? crypto.randomUUID(),
    traceId: input.traceId ?? crypto.randomUUID(),
    spanId: input.spanId ?? crypto.randomUUID(),
    protocol: "PVC-U",
    version: input.version ?? "Ω-Max-1.0",
    layer: input.layer,
    validationStatus: input.validationStatus,
    errorCode: input.errorCode,
    timestamp: input.timestamp ?? now,
    metadata: input.metadata ?? {},
  });
}

export function sanitizeSocialText(value: string) {
  return value.replace(/[<>]/g, "").replace(/javascript:/gi, "").trim();
}
