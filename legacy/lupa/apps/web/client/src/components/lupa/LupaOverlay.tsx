import { X, Copy, Check } from "lucide-react";
import { useState } from "react";

interface LupaOverlayProps {
  title: string;
  description: string;
  example?: string;
  language?: string;
  relatedConcepts?: string[];
  onClose: () => void;
  position?: "top" | "bottom" | "left" | "right";
}

export default function LupaOverlay({
  title,
  description,
  example,
  language = "text",
  relatedConcepts = [],
  onClose,
  position = "top",
}: LupaOverlayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (example) {
      navigator.clipboard.writeText(example);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const positionClasses = {
    top: "bottom-full mb-4 left-0",
    bottom: "top-full mt-4 left-0",
    left: "right-full mr-4 top-0",
    right: "left-full ml-4 top-0",
  };

  return (
    <div
      className={`fixed z-50 bg-white/80 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-4 ${positionClasses[position]} max-w-sm`}
    >
      {/* Encabezado */}
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-bold text-foreground">{title}</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-muted rounded-lg transition-colors flex-shrink-0"
          aria-label="Cerrar"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Descripción */}
      <p className="text-sm text-foreground/80 mb-4 leading-relaxed">
        {description}
      </p>

      {/* Ejemplo de código */}
      {example && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase">
              Ejemplo
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-2 py-1 text-xs rounded hover:bg-muted transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-accent" />
                  <span className="text-accent">Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 text-muted-foreground" />
                  <span className="text-muted-foreground">Copiar</span>
                </>
              )}
            </button>
          </div>
          <pre className="bg-muted/50 p-3 rounded-lg overflow-x-auto">
            <code className="text-xs font-mono text-foreground">{example}</code>
          </pre>
        </div>
      )}

      {/* Conceptos relacionados */}
      {relatedConcepts.length > 0 && (
        <div className="mb-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">
            Conceptos relacionados
          </p>
          <div className="flex flex-wrap gap-2">
            {relatedConcepts.map(concept => (
              <span
                key={concept}
                className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary font-medium"
              >
                {concept}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Botón de acción */}
      <button
        onClick={onClose}
        className="w-full mt-4 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:shadow-lg transition-all duration-150 active:scale-95"
      >
        Entendido
      </button>
    </div>
  );
}
