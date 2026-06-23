"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { Terminal } from "./Terminal";

gsap.registerPlugin(Flip);

export function Hero() {
  const { t } = useTranslation();
  // Por defecto asumimos la intro (terminal centrada sobre fondo oscuro):
  // mismo valor en servidor y en el primer render de cliente, así no hay
  // parpadeo de hidratación. Si el caso no aplica (mobile / reduce motion)
  // lo desactivamos de forma síncrona en useLayoutEffect, antes del primer
  // pintado del navegador.
  const [introActive, setIntroActive] = useState(true);
  const [showBackdrop, setShowBackdrop] = useState(true);
  // El fondo oscuro se desvanece en cuanto la terminal empieza a "programar"
  // el hero (primer paso del boot), para que el resto del contenido se vea
  // aparecer detrás mientras la terminal sigue flotando centrada.
  const [backdropVisible, setBackdropVisible] = useState(true);
  // Caja real de la terminal (su tamaño visual), no el overlay de pantalla
  // completa que la centra durante la intro. Flip debe medir y animar esta
  // caja: si midiera el overlay, partiría desde un tamaño del viewport
  // completo y se vería un salto/agrandamiento brusco al final.
  const terminalBoxRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  useLayoutEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isWide = window.matchMedia("(min-width: 1280px)").matches;

    if (reduceMotion || !isWide) {
      setIntroActive(false);
      setShowBackdrop(false);
      setBackdropVisible(false);
      gsap.set("[data-hero]", { opacity: 1, y: 0 });
      return;
    }

    gsap.set("[data-hero]", { opacity: 0, y: 64 });
  }, []);

  function handleBootStep(step: number) {
    if (step === 0) setBackdropVisible(false);
    gsap.to(`[data-hero-step="${step}"]`, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.08,
    });
  }

  function handleBootComplete() {
    const box = terminalBoxRef.current;

    // Por si algún paso no llegó a animarse (p. ej. boot interrumpido).
    gsap.set("[data-hero]", { opacity: 1, y: 0 });

    if (!box) {
      setIntroActive(false);
      setShowBackdrop(false);
      return;
    }

    const state = Flip.getState(box);
    flushSync(() => setIntroActive(false));

    Flip.from(state, {
      duration: 1.1,
      ease: "power3.inOut",
      scale: true,
      absolute: true,
    });

    window.setTimeout(() => setShowBackdrop(false), 750);
  }

  return (
    <header
      id="top"
      className="relative flex min-h-screen flex-col justify-between px-11 pb-12 pt-[140px]"
    >
      <noscript>
        <style>{`[data-intro-overlay],[data-intro-terminal]{display:none!important}`}</style>
      </noscript>

      {showBackdrop && (
        <div
          data-intro-overlay
          aria-hidden
          className={`absolute inset-0 z-40 bg-bg transition-opacity duration-700 ${
            backdropVisible ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        />
      )}

      <div />

      <div className="grid grid-cols-1 items-center gap-12 xl:grid-cols-[auto_500px] xl:justify-start xl:gap-75">
        <div className="min-w-0 max-w-[1100px]">
          <div
            data-hero
            data-hero-step="0"
            className="mb-7 font-mono text-[13px] tracking-[0.1em] text-accent"
          >
            {t("hero.kicker")}
          </div>
          <h1
            data-hero
            data-hero-step="1"
            className="m-0 text-[clamp(52px,8vw,128px)] font-medium leading-[0.9] tracking-[-0.04em]"
          >
            {t("hero.titleTop")}
            <br />
            <span className="text-faint">{t("hero.titleBottom")}</span>
          </h1>
        </div>

        <div className="hidden xl:block">
          <div
            data-intro-terminal={introActive ? "true" : undefined}
            className={
              introActive
                ? "absolute inset-0 z-50 flex items-center justify-center p-6"
                : ""
            }
          >
            <div
              ref={terminalBoxRef}
              className={introActive ? "w-full max-w-[640px]" : "w-full"}
            >
              <Terminal
                autoBoot={introActive}
                onBootStep={handleBootStep}
                onBootComplete={handleBootComplete}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        data-hero
        data-hero-step="2"
        className="flex flex-wrap items-end justify-between gap-10 font-mono text-[12px] tracking-[0.05em] text-muted"
      >
        <div className="max-w-[360px] leading-[1.65] text-fg">{t("hero.intro")}</div>
        <div className="flex flex-wrap gap-x-[52px] gap-y-6 uppercase">
          <div>
            <div className="mb-[7px] text-faint">{t("hero.baseLabel")}</div>
            {t("hero.baseValue")}
          </div>
          <div>
            <div className="mb-[7px] text-faint">{t("hero.stackLabel")}</div>
            {t("hero.stackValue")}
          </div>
          <div className="flex items-end gap-2">
            <span className="mb-[3px] inline-block h-[7px] w-[7px] rounded-full bg-available" />
            {t("hero.scroll")}
          </div>
        </div>
      </div>
    </header>
  );
}
