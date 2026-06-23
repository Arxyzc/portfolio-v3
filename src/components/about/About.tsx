"use client";

import Image from "next/image";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { projects } from "@/data/projects";

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
          className="group relative mx-auto w-fit max-w-full p-3"
        >
          <span className="pointer-events-none absolute left-0 top-0 h-5 w-5 border-l border-t border-accent transition-all duration-500 group-hover:h-6 group-hover:w-6" />
          <span className="pointer-events-none absolute right-0 top-0 h-5 w-5 border-r border-t border-accent transition-all duration-500 group-hover:h-6 group-hover:w-6" />
          <span className="pointer-events-none absolute bottom-0 left-0 h-5 w-5 border-b border-l border-accent transition-all duration-500 group-hover:h-6 group-hover:w-6" />
          <span className="pointer-events-none absolute bottom-0 right-0 h-5 w-5 border-b border-r border-accent transition-all duration-500 group-hover:h-6 group-hover:w-6" />

          <div className="overflow-hidden rounded-[2px] border border-line transition-colors duration-500 group-hover:border-accent/60">
            <Image
              src="/profile.jpeg"
              alt={t("about.portrait")}
              width={720}
              height={1133}
              className="block h-auto max-h-[560px] w-auto max-w-full grayscale-[55%] contrast-[1.05] transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:grayscale-0"
              sizes="420px"
            />
          </div>
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
            value={`${projects.length}+`}
            label={t("about.stats.projectsLabel")}
          />
          <Stat
            value={t("about.stats.availabilityValue")}
            label={t("about.stats.availabilityLabel")}
          />
        </div>
      </div>
    </section>
  );
}
