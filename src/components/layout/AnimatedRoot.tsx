"use client";

import { useRef, type ReactNode } from "react";
import { useSiteAnimations } from "@/lib/gsap/useSiteAnimations";

/** Contenedor raíz con scope para GSAP. Envuelve todas las secciones. */
export function AnimatedRoot({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  useSiteAnimations(rootRef);

  return (
    <div ref={rootRef} className="min-h-screen overflow-x-hidden">
      {children}
    </div>
  );
}
