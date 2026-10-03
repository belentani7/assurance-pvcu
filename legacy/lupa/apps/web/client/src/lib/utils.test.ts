import { describe, expect, it } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("joins conditional classes", () => {
    expect(cn("panel", true && "visible", false && "hidden")).toBe(
      "panel visible"
    );
  });

  it("resolves conflicting Tailwind utilities deterministically", () => {
    expect(cn("p-2", "p-4", "text-sm", "text-lg")).toBe("p-4 text-lg");
  });
});
