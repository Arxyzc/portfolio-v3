"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Porta la lógica de `initGSAP()` del prototipo:
 * entrada del hero, reveals por scroll, parallax, scroll horizontal con pin
 * y línea de progreso de la experiencia. Todo se limpia automáticamente vía
 * `useGSAP` (gsap.context con scope) en desmontaje / HMR.
 */
export function useSiteAnimations(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      // Movimiento decorativo: solo si el usuario no pidió "reduce motion".
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Reveals por sección
        root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            y: 44,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 86%" },
          });
        });

        // Parallax
        root.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
          const s = parseFloat(el.dataset.parallax ?? "0.15") || 0.15;
          gsap.to(el, {
            yPercent: -s * 100,
            ease: "none",
            scrollTrigger: {
              trigger: el.closest("[data-parallax-scope]") ?? el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        });
      });

      // Normaliza el scroll en touch devices: evita que el pin se
      // "descuadre" cuando la barra de direcciones del navegador mobile
      // aparece/desaparece a medio scroll y cambia la altura del viewport.
      ScrollTrigger.normalizeScroll(true);

      // Scroll horizontal con pin (se mantiene siempre para conservar el layout).
      const pin = root.querySelector<HTMLElement>("[data-projwrap]");
      const track = root.querySelector<HTMLElement>("[data-track]");
      if (pin && track) {
        const dist = () => track.scrollWidth - window.innerWidth;
        gsap.to(track, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: () => "+=" + dist(),
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
      }

      // Línea de progreso de la experiencia
      const tl = root.querySelector<HTMLElement>("[data-tlprogress]");
      const tlscope = root.querySelector<HTMLElement>("[data-tlscope]");
      if (tl && tlscope) {
        gsap.to(tl, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: tlscope,
            start: "top 55%",
            end: "bottom 85%",
            scrub: true,
          },
        });
      }

      // Habilidades: lateral pin indicator (port 1:1 del demo de GSAP/
      // ScrollTrigger https://codepen.io/GreenSock/pen/pomvabo). Pinea la
      // sección, hace crecer una barra de relleno y cruza (fade) los
      // paneles de cada categoría conforme avanza el scroll. Misma lógica
      // para el layout de escritorio (lista lateral, barra vertical) y el
      // de mobile (categorías en fila, barra horizontal).
      const skillsPin = root.querySelector<HTMLElement>("[data-pin-section]");

      const setupSkillsIndicator = (config: {
        fillSelector: string;
        itemSelector: string;
        panelSelector: string;
        axis: "x" | "y";
      }) => {
        const fill = root.querySelector<HTMLElement>(config.fillSelector);
        const items = gsap.utils.toArray<HTMLElement>(
          config.itemSelector,
          root
        );
        const panels = gsap.utils.toArray<HTMLElement>(
          config.panelSelector,
          root
        );

        if (!skillsPin || items.length === 0) return;

        const count = items.length;
        let activeIndex = 0;
        const scaleProp = config.axis === "x" ? "scaleX" : "scaleY";
        const origin = config.axis === "x" ? "left center" : "top left";

        if (fill) {
          gsap.set(fill, { [scaleProp]: 1 / count, transformOrigin: origin });
        }
        gsap.set(panels, { autoAlpha: 0 });
        gsap.set(panels[0], { autoAlpha: 1 });
        items[0]?.classList.add("is-active");

        const setActiveSkill = (index: number) => {
          if (index === activeIndex) return;
          items[activeIndex]?.classList.remove("is-active");
          if (panels[activeIndex]) {
            gsap.to(panels[activeIndex], { autoAlpha: 0, duration: 0.2 });
          }
          items[index]?.classList.add("is-active");
          if (panels[index]) {
            gsap.to(panels[index], { autoAlpha: 1, duration: 0.2 });
          }
          activeIndex = index;
        };

        return ScrollTrigger.create({
          trigger: skillsPin,
          start: "top top",
          end: "+=" + count * 50 + "%",
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const step = Math.min(
              count - 1,
              Math.floor(self.progress * count)
            );
            if (fill) {
              gsap.set(fill, { [scaleProp]: (step + 1) / count });
            }
            setActiveSkill(step);
          },
        });
      };

      const mm2 = gsap.matchMedia();
      if (skillsPin) {
        mm2.add("(min-width: 1024px)", () =>
          setupSkillsIndicator({
            fillSelector: "[data-fill]",
            itemSelector: "[data-list-item]",
            panelSelector: "[data-panel]",
            axis: "y",
          })
        );
        mm2.add("(max-width: 1023px)", () =>
          setupSkillsIndicator({
            fillSelector: "[data-fill-mobile]",
            itemSelector: "[data-list-item-mobile]",
            panelSelector: "[data-panel-mobile]",
            axis: "x",
          })
        );
      }

      // Recalcular medidas tras cargar fuentes/imágenes.
      const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 350);
      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", onLoad);

      return () => {
        window.clearTimeout(refreshTimer);
        window.removeEventListener("load", onLoad);
        mm.revert();
        mm2.revert();
      };
    },
    { scope }
  );
}