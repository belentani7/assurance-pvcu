import { describe, expect, it } from "vitest";
import { translations, getTranslation } from "./translations";

const supportedLanguages = ["es", "ca", "pt", "en"] as const;

const requiredKeys = [
  "nav.demo",
  "demo.title",
  "demo.platform",
  "demo.explanation",
  "demo.difficulty.beginner",
  "demo.difficulty.intermediate",
  "demo.difficulty.advanced",
  "demo.example",
  "demo.related",
] as const;

describe("translation catalog", () => {
  it("includes every required Demo label in each supported language", () => {
    for (const language of supportedLanguages) {
      for (const key of requiredKeys) {
        expect(translations[language][key]).toBeTruthy();
        expect(translations[language][key]).not.toBe(key);
      }
    }
  });

  it("returns a translation for known keys", () => {
    expect(getTranslation("es", "demo.title")).toBe("LUPA - Demo Interactiva");
    expect(getTranslation("ca", "demo.explanation")).toBe("Explicació");
    expect(getTranslation("pt", "demo.platform")).toBe("Plataforma");
    expect(getTranslation("en", "demo.back")).toBe("Back");
  });

  it("returns the key for an unknown translation instead of an empty string", () => {
    expect(getTranslation("es", "missing.key")).toBe("missing.key");
  });
});
