import { describe, expect, it } from "vitest";
import { canProjectAction, isClientRole } from "../shared/accessControl";

describe("Project access control", () => {
  it("allows producers to publish but viewers only to read", () => {
    expect(canProjectAction("producer", "publish")).toBe(true);
    expect(canProjectAction("viewer", "publish")).toBe(false);
    expect(canProjectAction("viewer", "read")).toBe(true);
  });

  it("identifies client-facing roles", () => {
    expect(isClientRole("approver")).toBe(true);
    expect(isClientRole("owner")).toBe(false);
  });
});
