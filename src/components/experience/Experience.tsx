"use client";

import { useTranslation } from "@/lib/i18n/useTranslation";
import { experience } from "@/data/experience";
import { ExperienceItem } from "./ExperienceItem";

export function Experience() {
  const { t } = useTranslation();
  const last = experience.length - 1;

  return (
    <section
      id="experiencia"
      data-tlscope
      className="border-t border-line px-11 py-[120px] [scroll-margin-top:80px]"
    >
      <div
        data-reveal
        className="mb-[18px] font-mono text-[12px] uppercase tracking-[0.12em] text-accent"
      >
        {t("experience.kicker")}
      </div>
      <h2
        data-reveal
        className="m-0 mb-[72px] text-[clamp(36px,5vw,72px)] font-medium leading-none tracking-[-0.03em]"
      >
        {t("experience.heading")}
      </h2>

      <div className="relative pl-10">
        {/* línea base */}
        <div className="absolute bottom-1.5 left-0 top-1.5 w-px bg-line" />
        {/* línea de progreso */}
        <div
          data-tlprogress
          className="absolute bottom-1.5 left-0 top-1.5 w-px origin-top scale-y-0 bg-accent"
        />

        {experience.map((entry, i) => (
          <ExperienceItem
            key={`${entry.company}-${entry.start}`}
            entry={entry}
            last={i === last}
          />
        ))}
      </div>
    </section>
  );
}
