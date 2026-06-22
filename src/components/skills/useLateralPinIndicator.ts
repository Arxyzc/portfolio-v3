"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Patrón "Lateral Pin Indicator" de GSAP/ScrollTrigger
 * (https://codepen.io/GreenSock/pen/pomvabo), adaptado a las 3 categorías
 * de Habilidades: pinea la sección, hace crecer una barra de relleno lateral
 * junto a la lista de categorías y cruza (fade) los paneles de la derecha
 * conforme avanza el scroll.
 *
 * El índice activo se deriva directamente del progreso del ScrollTrigger
 * (en vez de usar timeline .call()), para que funcione de forma robusta
 * tanto al hacer scroll hacia adelante como hacia atrás con scrub.
 */
export function useLateralPinIndicator(
  scope: RefObject<HTMLElement | null>,
  itemCount: number
) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root || itemCount === 0) return;

      const pinSection = root.querySelector<HTMLElement>("[data-pin-section]");
      const fill = root.querySelector<HTMLElement>("[data-fill]");
      const listItems = gsap.utils.toArray<HTMLElement>(
        "[data-list-item]",
        root
      );
      const panels = gsap.utils.toArray<HTMLElement>("[data-panel]", root);

      if (!pinSection || !fill || listItems.length === 0) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          isReduced:
            "(prefers-reduced-motion: reduce), (max-width: 1023px)",
        },
        (ctx) => {
          const { isReduced } = ctx.conditions as { isReduced: boolean };

          // Pantallas pequeñas o reduce-motion: todo visible, sin pin ni scrub.
          if (isReduced) {
            gsap.set(fill, { scaleY: 1, transformOrigin: "top left" });
            listItems.forEach((item) => item.classList.add("is-active"));
            panels.forEach((panel) => gsap.set(panel, { autoAlpha: 1 }));
            return;
          }

          const count = listItems.length;
          let activeIndex = 0;

          gsap.set(fill, {
            scaleY: 1 / count,
            transformOrigin: "top left",
          });
          gsap.set(panels, { autoAlpha: 0 });
          gsap.set(panels[0], { autoAlpha: 1 });
          listItems[0]?.classList.add("is-active");

          const setActive = (index: number) => {
            if (index === activeIndex) return;
            listItems[activeIndex]?.classList.remove("is-active");
            if (panels[activeIndex]) {
              gsap.to(panels[activeIndex], { autoAlpha: 0, duration: 0.25 });
            }
            listItems[index]?.classList.add("is-active");
            if (panels[index]) {
              gsap.to(panels[index], { autoAlpha: 1, duration: 0.25 });
            }
            activeIndex = index;
          };

          ScrollTrigger.create({
            trigger: pinSection,
            start: "top top",
            end: "+=" + count * 60 + "%",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              gsap.set(fill, {
                scaleY: gsap.utils.clamp(
                  1 / count,
                  1,
                  (Math.floor(self.progress * count) + 1) / count
                ),
              });
              const index = Math.min(
                count - 1,
                Math.floor(self.progress * count)
              );
              setActive(index);
            },
          });

          return () => {
            listItems.forEach((item) => item.classList.remove("is-active"));
          };
        }
      );

      return () => mm.revert();
    },
    { scope, dependencies: [itemCount] }
  );
}