"use client";

import { useTranslation } from "@/lib/i18n/useTranslation";
import type { ExperienceEntry } from "@/data/experience";

export function ExperienceItem({
  entry,
  last,
}: {
  entry: ExperienceEntry;
  last: boolean;
}) {
  const { t, locale } = useTranslation();
  const range = `${entry.start} — ${entry.end ?? t("experience.present")}`;

  return (
    <div data-reveal className={`relative ${last ? "" : "pb-16"}`}>
      <span
        className={`absolute -left-11 top-1.5 h-[9px] w-[9px] rounded-full ${
          entry.current ? "bg-accent" : "bg-faint"
        }`}
      />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-[200px_1fr] md:items-baseline md:gap-10">
        <div className="font-mono text-[13px] tracking-[0.05em] text-muted">
          {range}
        </div>
        <div>
          <h3 className="m-0 mb-1 text-[28px] font-medium tracking-[-0.01em]">
            {entry.role}
          </h3>
          <div className="mb-3.5 font-mono text-[13px] text-accent">
            {entry.company}
          </div>
          <p className="m-0 max-w-[620px] text-[16px] leading-[1.65] text-muted">
            {entry.description[locale]}
          </p>
        </div>
      </div>
    </div>
  );
}
