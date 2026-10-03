import { describe, expect, it } from "vitest";
import { canTransitionContent, chooseAdapter, universalContentSchema } from "../shared/universalContent";

describe("Universal Content Model", () => {
  it("allows the governed content lifecycle and rejects invalid jumps", () => {
    expect(canTransitionContent("IDEA", "DRAFT")).toBe(true);
    expect(canTransitionContent("DRAFT", "APPROVED")).toBe(false);
    expect(canTransitionContent("APPROVED", "SCHEDULED")).toBe(true);
  });

  it("falls back to manual mode when a provider adapter is unavailable", () => {
    expect(chooseAdapter(["instagram", "youtube", "metricool"], ["youtube"])).toEqual(["manual", "youtube", "manual"]);
  });

  it("validates a provider-neutral content envelope", () => {
    const parsed = universalContentSchema.parse({
      contentId: "content_123",
      title: "Launch post",
      body: "A useful post",
      destinations: ["instagram"],
      lifecycle: "DRAFT",
    });
    expect(parsed.lifecycle).toBe("DRAFT");
    expect(parsed.media).toEqual([]);
  });
});
