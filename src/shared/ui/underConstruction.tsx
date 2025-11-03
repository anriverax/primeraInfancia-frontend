"use client";

import { useEffect, useState } from "react";
import { Code2, Hammer, Sparkles } from "lucide-react";

export function UnderConstruction(): React.JSX.Element {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="space-y-8">
      <div className="relative z-10 flex flex-col items-center justify-center px-4">
        <div
          className={`flex flex-col items-center space-y-8 text-center transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {/* Icon group */}
          <div className="flex items-center gap-4">
            <div className="rounded-2xl border border-border bg-card p-4 animate-float">
              <Code2 className="h-8 w-8 text-accent" />
            </div>
            <div
              className="rounded-2xl border border-border bg-card p-4 animate-float"
              style={{ animationDelay: "1s" }}
            >
              <Hammer className="h-8 w-8 text-accent" />
            </div>
            <div
              className="rounded-2xl border border-border bg-card p-4 animate-float"
              style={{ animationDelay: "2s" }}
            >
              <Sparkles className="h-8 w-8 text-accent" />
            </div>
          </div>

          {/* Main heading */}
          <div className="space-y-4">
            <h1 className="text-6xl font-bold tracking-tight text-foreground sm:text-7xl md:text-8xl text-balance">
              En Construcción
            </h1>
            <div className="flex items-center justify-center gap-2">
              <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              <p className="text-xl text-muted-foreground font-mono sm:text-2xl">
                Estamos trabajando en algo increíble
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="max-w-2xl text-lg text-muted-foreground leading-relaxed sm:text-xl text-pretty">
            Nuestro equipo está desarrollando una experiencia única. Pronto revelaremos algo que vale la
            pena esperar.
          </p>

          {/* Status indicator */}
          <div className="flex items-center gap-3 rounded-full border border-border bg-card px-6 py-3">
            <span className="relative flex size-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex size-3 rounded-full bg-sky-500"></span>
            </span>
            <span className="text-sm font-medium text-card-foreground">En desarrollo activo</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UnderConstruction;
