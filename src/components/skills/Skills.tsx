"use client";

import { useTranslation } from "@/lib/i18n/useTranslation";
import { skills } from "@/data/skills";
import { SkillIcon } from "./SkillIcon";

export function Skills() {
  const { t } = useTranslation();

  return (
    <section
      id="habilidades"
      className="border-t border-line [scroll-margin-top:80px]"
    >
      <div data-pin-section className="h-screen overflow-hidden px-6 py-10 sm:px-11 lg:px-11 lg:py-0">
        <div
          data-reveal
          className="mb-[18px] font-mono text-[12px] uppercase tracking-[0.12em] text-accent lg:pt-[60px]"
        >
          {t("skills.kicker")}
        </div>
        <h2
          data-reveal
          className="m-0 mb-12 max-w-[900px] text-[clamp(36px,5vw,72px)] font-medium leading-none tracking-[-0.03em] lg:mb-16"
        >
          {t("skills.heading")}
        </h2>

        {/* ===== Mobile/tablet (<lg): categorías en fila arriba, panel a
            ancho completo abajo ===== */}
        <div className="lg:hidden">
          <div className="relative mb-10 flex gap-5 border-b border-line pb-4">
            {skills.map((group) => (
              <div
                key={group.key}
                data-list-item-mobile
                className="skill-list-item font-mono text-[12px] uppercase tracking-[0.08em] text-faint transition-colors duration-300 sm:text-[14px]"
              >
                {t(`skills.groups.${group.key}`)}
              </div>
            ))}
            <div className="absolute -bottom-px left-0 h-px w-full bg-line">
              <div
                data-fill-mobile
                className="h-full origin-left scale-x-0 bg-accent"
              />
            </div>
          </div>

          <div className="relative min-h-[260px] sm:min-h-[220px]">
            {skills.map((group) => (
              <div
                key={group.key}
                data-panel-mobile
                className="skill-panel-mobile absolute inset-0 grid grid-cols-1 content-start gap-y-6 sm:grid-cols-2 sm:content-center sm:gap-x-12 sm:gap-y-8"
              >
                {group.items.map((item) => (
                  <div key={item.name} className="flex items-center gap-4">
                    <SkillIcon
                      name={item.icon}
                      className="h-8 w-8 shrink-0 text-fg sm:h-9 sm:w-9"
                    />
                    <span className="text-[19px] text-fg sm:text-[21px]">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ===== Desktop (lg+): lista lateral + panel cruzado ===== */}
        <div className="hidden lg:grid lg:grid-cols-[280px_1fr] lg:items-start lg:gap-20">
          {/* Lista lateral con barra de relleno (lateral pin indicator) */}
          <div className="relative flex gap-6 pl-6">
            <div className="absolute left-0 top-0 h-full w-px bg-line">
              <div
                data-fill
                className="w-full origin-top scale-y-0 bg-accent"
                style={{ height: "100%" }}
              />
            </div>

            <ul className="m-0 flex list-none flex-col gap-10 p-0">
              {skills.map((group) => (
                <li
                  key={group.key}
                  data-list-item
                  className="skill-list-item shrink-0 font-mono text-[16px] uppercase tracking-[0.08em] text-faint transition-colors duration-300"
                >
                  {t(`skills.groups.${group.key}`)}
                </li>
              ))}
            </ul>
          </div>

          {/* Paneles de iconos por categoría */}
          <div className="relative min-h-[300px]">
            {skills.map((group) => (
              <div
                key={group.key}
                data-panel
                className="skill-panel absolute inset-0 grid grid-cols-2 content-center gap-x-20 gap-y-14"
              >
                {group.items.map((item) => (
                  <div key={item.name} className="flex items-center gap-5">
                    <SkillIcon
                      name={item.icon}
                      className="h-14 w-14 shrink-0 text-fg"
                    />
                    <span className="text-[32px] text-fg">{item.name}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}