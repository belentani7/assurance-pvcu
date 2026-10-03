import { describe, expect, it } from "vitest";
import {
  conceptMapMultilang,
  getAllConceptsMultilang,
  getConceptMultilang,
} from "./conceptMapMultilang";
import {
  getAllCategories,
  getConceptById,
  getConceptsByCategory,
  getConceptsByDifficulty,
} from "./conceptMap";

const supportedLanguages = ["es", "ca", "pt", "en"] as const;

const demoConcepts = [
  "variable",
  "string",
  "integer",
  "function",
  "parameter",
  "return",
  "loop",
  "conditional",
  "html",
  "tag",
  "terminal",
  "command",
  "directory",
  "path",
  "file",
  "event",
] as const;

describe("multilingual concept map", () => {
  it("covers every concept used by the interactive examples", () => {
    for (const conceptId of demoConcepts) {
      expect(conceptMapMultilang[conceptId]).toBeDefined();
    }
  });

  it("provides a readable name and explanation in every supported language", () => {
    for (const conceptId of demoConcepts) {
      for (const language of supportedLanguages) {
        const concept = getConceptMultilang(conceptId, language);
        expect(concept?.name.trim()).toBeTruthy();
        expect(concept?.description.trim()).toBeTruthy();
      }
    }
  });

  it("returns a complete localized list without dropping concepts", () => {
    const concepts = getAllConceptsMultilang("en");
    expect(concepts).toHaveLength(Object.keys(conceptMapMultilang).length);
    expect(concepts.find(concept => concept.id === "event")?.name).toBe(
      "Event"
    );
  });

  it("returns null for a concept that does not exist", () => {
    expect(getConceptMultilang("not-a-real-concept", "es")).toBeNull();
  });

  it("keeps the Spanish base catalog available for fallback and browsing", () => {
    expect(getConceptById("variable")?.name).toBe("Variable");
    expect(getConceptById("not-a-real-concept")).toBeUndefined();
    expect(getConceptsByCategory("Fundamentos").length).toBeGreaterThan(0);
    expect(getConceptsByDifficulty("beginner").length).toBeGreaterThan(0);
    expect(getAllCategories()).toContain("Fundamentos");
  });
});
