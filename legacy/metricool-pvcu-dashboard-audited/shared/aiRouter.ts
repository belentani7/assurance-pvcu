import { z } from "zod";

export const aiProviderSchema = z.object({
  name: z.string().min(1),
  kind: z.enum(["local", "cloud", "user-api", "manual"]),
  configured: z.boolean().default(false),
});

export type AIProvider = z.infer<typeof aiProviderSchema>;

export type AISelection = { provider: AIProvider; mode: "provider" | "manual"; reason: string };

export function selectAIProvider(providers: AIProvider[]): AISelection {
  const configured = providers.find(provider => provider.configured && provider.kind !== "manual");
  if (configured) return { provider: configured, mode: "provider", reason: "configured-provider" };
  const local = providers.find(provider => provider.kind === "local");
  if (local) return { provider: local, mode: "provider", reason: "local-fallback" };
  return { provider: { name: "manual", kind: "manual", configured: true }, mode: "manual", reason: "no-provider-configured" };
}

export function describeAIAvailability(providers: AIProvider[]) {
  const selection = selectAIProvider(providers);
  return { ...selection, message: selection.mode === "manual" ? "No AI provider is configured. Continue with deterministic/manual review." : `Using ${selection.provider.name} through the configured adapter.` };
}
