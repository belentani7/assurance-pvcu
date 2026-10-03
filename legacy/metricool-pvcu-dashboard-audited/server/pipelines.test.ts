import { describe, expect, it } from "vitest";
import { z } from "zod";

describe("pipeline status contract", () => {
  it("accepts only the required OK, ERR and SKIP states", () => {
    const schema = z.enum(["OK", "ERR", "SKIP"]);
    expect(schema.parse("OK")).toBe("OK");
    expect(schema.parse("ERR")).toBe("ERR");
    expect(schema.parse("SKIP")).toBe("SKIP");
    expect(() => schema.parse("RUNNING")).toThrow();
  });
});
