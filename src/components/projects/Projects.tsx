"use client";

import { useTranslation } from "@/lib/i18n/useTranslation";
import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

export function Projects() {
  const { t } = useTranslation();

  return (
    <section id="proyectos" className="border-t border-line">
      <div data-projwrap className="relative h-screen overflow-hidden">
        <div data-track className="flex h-full items-stretch">
          {/* Panel intro */}
          <div className="flex w-[46vw] min-w-[420px] flex-none flex-col justify-between border-r border-line p-11">
            <div className="font-mono text-[12px] uppercase tracking-[0.12em] text-accent">
              {t("projects.kicker")}
            </div>
            <div>
              <h2 className="m-0 mb-7 text-[clamp(44px,5vw,76px)] font-medium leading-[0.96] tracking-[-0.03em]">
                {t("projects.titleTop")}
                <br />
                {t("projects.titleBottom")}
              </h2>
              <p className="m-0 max-w-[380px] text-[16px] leading-[1.65] text-muted">
                {t("projects.intro")}
              </p>
            </div>
            <div className="font-mono text-[12px] tracking-[0.08em] text-faint">
              {t("projects.indexNote")}
            </div>
          </div>

          {/* Tarjetas de proyecto */}
          {projects.map((project) => (
            <ProjectCard key={project.num} project={project} />
          ))}

          {/* Panel de cierre */}
          <div className="flex w-[34vw] min-w-[340px] flex-none flex-col justify-center gap-6 p-11">
            <h3 className="m-0 text-[clamp(34px,3.4vw,52px)] font-medium leading-none tracking-[-0.03em]">
              {t("projects.closingHeadingTop")}
              <br />
              {t("projects.closingHeadingBottom")}
            </h3>
            <a
              href="#contacto"
              className="scta self-start rounded-[40px] border border-line px-[26px] py-[14px] font-mono text-[13px] tracking-[0.06em] text-fg no-underline"
            >
              {t("projects.closingCta")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
