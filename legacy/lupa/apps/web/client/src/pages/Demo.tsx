import { useState } from "react";
import { ArrowLeft, Settings } from "lucide-react";
import { Link } from "wouter";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";
import ThemeToggle from "@/components/ThemeToggle";
import { conceptMap } from "@/lib/conceptMap";
import { getConceptMultilang } from "@/lib/conceptMapMultilang";

type Platform = "python" | "powershell" | "html" | "javascript";
type Difficulty = "beginner" | "intermediate" | "advanced";

interface CodeBlock {
  id: string;
  code: string;
  language: string;
  conceptIds: string[];
}

const codeBlocks: Record<Platform, CodeBlock[]> = {
  python: [
    {
      id: "py-1",
      code: 'nombre = input("¿Cuál es tu nombre? ")',
      language: "python",
      conceptIds: ["variable", "string", "function"],
    },
    {
      id: "py-2",
      code: 'edad = int(input("¿Cuántos años tienes? "))',
      language: "python",
      conceptIds: ["variable", "integer", "function"],
    },
    {
      id: "py-3",
      code: 'print(f"Hola {nombre}, tienes {edad} años")',
      language: "python",
      conceptIds: ["function", "string"],
    },
    {
      id: "py-4",
      code: "for i in range(5):\n    print(i)",
      language: "python",
      conceptIds: ["loop", "function"],
    },
    {
      id: "py-5",
      code: 'def saludar(nombre):\n    return f"Hola, {nombre}"',
      language: "python",
      conceptIds: ["function", "parameter", "return"],
    },
  ],
  powershell: [
    {
      id: "ps-1",
      code: "dir",
      language: "powershell",
      conceptIds: ["command", "directory"],
    },
    {
      id: "ps-2",
      code: "cd Desktop",
      language: "powershell",
      conceptIds: ["command", "directory", "path"],
    },
    {
      id: "ps-3",
      code: "mkdir proyecto_nuevo",
      language: "powershell",
      conceptIds: ["command", "directory"],
    },
    {
      id: "ps-4",
      code: "python script.py",
      language: "powershell",
      conceptIds: ["command", "file"],
    },
  ],
  html: [
    {
      id: "html-1",
      code: "<h1>Mi Primer Sitio Web</h1>",
      language: "html",
      conceptIds: ["html", "tag"],
    },
    {
      id: "html-2",
      code: "<p>Este es un párrafo de texto.</p>",
      language: "html",
      conceptIds: ["html", "tag"],
    },
    {
      id: "html-3",
      code: '<img src="foto.jpg" alt="Mi foto">',
      language: "html",
      conceptIds: ["html", "tag", "file"],
    },
    {
      id: "html-4",
      code: '<a href="https://google.com">Ir a Google</a>',
      language: "html",
      conceptIds: ["html", "tag"],
    },
  ],
  javascript: [
    {
      id: "js-1",
      code: 'const nombre = "Juan";',
      language: "javascript",
      conceptIds: ["variable", "string"],
    },
    {
      id: "js-2",
      code: 'function saludar(nombre) {\n  return "Hola, " + nombre;\n}',
      language: "javascript",
      conceptIds: ["function", "parameter", "return"],
    },
    {
      id: "js-3",
      code: 'button.addEventListener("click", () => {\n  alert("¡Botón presionado!");\n});',
      language: "javascript",
      conceptIds: ["function", "event"],
    },
  ],
};

export default function Demo() {
  const t = useTranslation();
  const { language } = useLanguage();
  const [platform, setPlatform] = useState<Platform>("python");
  const [difficulty, setDifficulty] = useState<Difficulty>("beginner");
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  const blocks = codeBlocks[platform];
  const concept = selectedConcept
    ? getConceptMultilang(selectedConcept, language)
    : null;

  const filteredBlocks = blocks.filter(block => {
    if (difficulty === "beginner") return true;
    const concepts = block.conceptIds.map(id => conceptMap[id]);
    return concepts.every(c => c && c.difficulty === difficulty);
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border border-border rounded-2xl shadow-xl">
        <div className="container flex items-center justify-between h-16">
          <Link href="/">
            <a className="flex items-center gap-2 hover:opacity-70 transition-opacity">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">{t("demo.back")}</span>
            </a>
          </Link>
          <h1 className="text-xl font-bold text-foreground">
            {t("demo.title")}
          </h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <LanguageSelector />
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Panel de Configuración */}
      {showSettings && (
        <div className="bg-background/80 backdrop-blur-lg border border-border rounded-2xl shadow-xl border-b p-6">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Plataforma */}
              <div>
                <h3 className="font-semibold text-foreground mb-4">
                  {t("demo.platform")}
                </h3>
                <div className="space-y-2">
                  {(
                    ["python", "powershell", "html", "javascript"] as Platform[]
                  ).map(p => {
                    const platformNames: Record<Platform, string> = {
                      python: "Python",
                      powershell: "PowerShell",
                      html: "HTML",
                      javascript: "JavaScript",
                    };
                    return (
                      <label
                        key={p}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="platform"
                          value={p}
                          checked={platform === p}
                          onChange={e =>
                            setPlatform(e.target.value as Platform)
                          }
                          className="w-4 h-4"
                        />
                        <span className="text-foreground/80">
                          {platformNames[p]}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Dificultad */}
              <div>
                <h3 className="font-semibold text-foreground mb-4">
                  {t("demo.difficulty")}
                </h3>
                <div className="space-y-2">
                  {(
                    ["beginner", "intermediate", "advanced"] as Difficulty[]
                  ).map(d => {
                    const difficultyNames: Record<Difficulty, string> = {
                      beginner: t("demo.difficulty.beginner"),
                      intermediate: t("demo.difficulty.intermediate"),
                      advanced: t("demo.difficulty.advanced"),
                    };
                    return (
                      <label
                        key={d}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="difficulty"
                          value={d}
                          checked={difficulty === d}
                          onChange={e =>
                            setDifficulty(e.target.value as Difficulty)
                          }
                          className="w-4 h-4"
                        />
                        <span className="text-foreground/80">
                          {difficultyNames[d]}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contenido Principal */}
      <div className="container py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Bloques de Código */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {t("demo.code")} {platform.toUpperCase()}
            </h2>
            <div className="space-y-4">
              {filteredBlocks.map(block => (
                <div
                  key={block.id}
                  className="bg-background/80 backdrop-blur-lg border border-border rounded-2xl shadow-xl p-6 hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-xs font-semibold text-muted-foreground uppercase">
                      {block.language}
                    </span>
                  </div>
                  <pre className="bg-muted/50 p-4 rounded-lg mb-4 overflow-x-auto">
                    <code className="text-sm font-mono text-foreground">
                      {block.code}
                    </code>
                  </pre>
                  <div className="flex flex-wrap gap-2">
                    {block.conceptIds.map(conceptId => {
                      const conceptName =
                        getConceptMultilang(conceptId, language)?.name ||
                        conceptMap[conceptId]?.name;
                      return (
                        <button
                          key={conceptId}
                          onClick={() => setSelectedConcept(conceptId)}
                          className={`px-3 py-1 text-xs rounded-full font-medium transition-all duration-150 ${
                            selectedConcept === conceptId
                              ? "bg-primary text-primary-foreground"
                              : "bg-primary/10 text-primary hover:bg-primary/20"
                          }`}
                        >
                          {conceptName}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Panel Lateral - Concepto Seleccionado */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {t("demo.explanation")}
            </h2>
            {concept ? (
              <div className="bg-background/80 backdrop-blur-lg border border-border rounded-2xl shadow-xl p-6 sticky top-24">
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {concept.name}
                </h3>
                <p className="text-sm text-foreground/80 mb-4 leading-relaxed">
                  {concept.description}
                </p>

                {concept.example && (
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                      {t("demo.example")}
                    </p>
                    <pre className="bg-muted/50 p-3 rounded-lg overflow-x-auto">
                      <code className="text-xs font-mono text-foreground">
                        {concept.example}
                      </code>
                    </pre>
                  </div>
                )}

                <div className="mb-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                    {t("demo.difficulty.label")}
                  </p>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-accent/20 text-accent">
                    {t(
                      `demo.difficulty.${selectedConcept && conceptMap[selectedConcept]?.difficulty ? conceptMap[selectedConcept].difficulty : "beginner"}`
                    )}
                  </span>
                </div>
              </div>
            ) : (
              <div className="bg-background/80 backdrop-blur-lg border border-border rounded-2xl shadow-xl p-6 text-center">
                <p className="text-foreground/70">{t("demo.click")}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
