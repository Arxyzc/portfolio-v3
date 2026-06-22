"use client";

import { useTranslation } from "@/lib/i18n/useTranslation";

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-[42px] tracking-[-0.02em] text-fg">{value}</div>
      <div className="mt-1.5 font-mono text-[12px] uppercase tracking-[0.08em] text-faint">
        {label}
      </div>
    </div>
  );
}

export function About() {
  const { t } = useTranslation();

  return (
    <section
      id="sobre"
      data-parallax-scope
      className="grid grid-cols-1 gap-20 border-t border-line px-11 py-[120px] [scroll-margin-top:80px] md:grid-cols-[0.9fr_1.1fr] md:items-start"
    >
      <div>
        <div
          data-reveal
          className="mb-10 font-mono text-[12px] uppercase tracking-[0.12em] text-accent"
        >
          {t("about.kicker")}
        </div>
        <div
          data-reveal
          data-parallax="0.12"
          className="flex h-[420px] items-end rounded-[2px] border border-line p-[22px] font-mono text-[11px] tracking-[0.1em] text-faint"
          style={{
            background:
              "repeating-linear-gradient(45deg, var(--surface), var(--surface) 11px, var(--bg) 11px, var(--bg) 22px)",
          }}
        >
          {t("about.portrait")}
        </div>
      </div>

      <div>
        <h2
          data-reveal
          className="m-0 mb-11 text-[clamp(30px,3.6vw,50px)] font-normal leading-[1.18] tracking-[-0.02em] text-pretty"
        >
          {t("about.heading")}
        </h2>
        <p
          data-reveal
          className="m-0 mb-6 max-w-[520px] text-[17px] leading-[1.7] text-muted"
        >
          {t("about.p1")}
        </p>
        <p
          data-reveal
          className="m-0 mb-12 max-w-[520px] text-[17px] leading-[1.7] text-muted"
        >
          {t("about.p2")}
        </p>
        <div data-reveal className="flex flex-wrap gap-16 font-mono">
          <Stat
            value={t("about.stats.yearsValue")}
            label={t("about.stats.yearsLabel")}
          />
          <Stat
            value={t("about.stats.projectsValue")}
            label={t("about.stats.projectsLabel")}
          />
          <Stat
            value={t("about.stats.clientsValue")}
            label={t("about.stats.clientsLabel")}
          />
        </div>
      </div>
    </section>
  );
}
