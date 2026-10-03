import { describe, expect, it } from "vitest";
import { selectAIProvider } from "../shared/aiRouter";

describe("AI Router", () => {
  it("prefers a configured provider", () => {
    expect(selectAIProvider([{ name: "local-llama", kind: "local", configured: false }, { name: "user-api", kind: "user-api", configured: true }]).provider.name).toBe("user-api");
  });

  it("uses local mode before manual mode", () => {
    expect(selectAIProvider([{ name: "local-llama", kind: "local", configured: false }]).reason).toBe("local-fallback");
  });

  it("stays usable without any API key", () => {
    const selection = selectAIProvider([]);
    expect(selection.mode).toBe("manual");
    expect(selection.reason).toBe("no-provider-configured");
  });
});
