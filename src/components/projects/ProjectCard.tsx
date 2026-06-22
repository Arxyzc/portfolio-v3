"use client";

import { useTranslation } from "@/lib/i18n/useTranslation";
import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  const { t, locale } = useTranslation();

  return (
    <article className="pcard flex w-[42vw] min-w-[480px] flex-none flex-col justify-between border-r border-line p-11">
      <div className="flex justify-between font-mono text-[12px] tracking-[0.08em] text-faint">
        <span>{project.num}</span>
        <span>{project.year}</span>
      </div>

      <div
        className="my-7 flex flex-1 items-end rounded-[2px] border border-line p-[18px] font-mono text-[11px] tracking-[0.08em] text-faint"
        style={{
          background:
            "repeating-linear-gradient(135deg, var(--surface), var(--surface) 11px, var(--bg) 11px, var(--bg) 22px)",
        }}
      >
        [ {t("projects.mockupPrefix")} {project.name} ]
      </div>

      <div>
        <h3 className="m-0 mb-2.5 text-[34px] font-medium tracking-[-0.02em]">
          {project.name}
        </h3>
        <p className="m-0 mb-[18px] max-w-[380px] text-[15px] leading-[1.6] text-muted">
          {project.description[locale]}
        </p>
        <div className="flex items-center justify-between border-t border-line pt-4 font-mono text-[11px] uppercase tracking-[0.06em] text-faint">
          <span>{project.stack}</span>
          <span className="parrow text-accent transition-transform duration-300">
            →
          </span>
        </div>
      </div>
    </article>
  );
}
