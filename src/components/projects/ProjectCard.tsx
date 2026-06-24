"use client";

import { useRef } from "react";
import Image from "next/image";
import { useTranslation } from "@/lib/i18n/useTranslation";
import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const title = t(`projects.items.${project.key}.title`);
  const description = t(`projects.items.${project.key}.description`);

  function handleMouseEnter() {
    videoRef.current?.play().catch(() => {});
  }

  function handleMouseLeave() {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  }

  return (
    <article
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="pcard flex w-[42vw] min-w-[480px] flex-none flex-col border-r border-line p-11"
    >
      <div className="flex justify-between font-mono text-[12px] tracking-[0.08em] text-faint">
        <span>{project.num}</span>
        <span>{project.year}</span>
      </div>

      {/* Proporción fija (16:9, igual que el video) para que el recorte de
          imágenes/video sea predecible en cualquier viewport. */}
      <div className="flex flex-1 flex-col justify-center">
        {project.image || project.video ? (
          <div className="relative mb-7 aspect-video w-full overflow-hidden rounded-[2px] border border-line">
            {project.image && (
              <Image
                src={project.image}
                alt={title}
                fill
                sizes="42vw"
                className={`object-cover ${project.video ? "md:hidden" : ""}`}
              />
            )}
            {project.video && (
              <video
                ref={videoRef}
                src={project.video}
                poster={project.image}
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 hidden h-full w-full object-cover md:block"
              />
            )}
          </div>
        ) : (
          <div
            className="mb-7 flex aspect-video w-full items-end rounded-[2px] border border-line p-[18px] font-mono text-[11px] tracking-[0.08em] text-faint"
            style={{
              background:
                "repeating-linear-gradient(135deg, var(--surface), var(--surface) 11px, var(--bg) 11px, var(--bg) 22px)",
            }}
          >
            [ {t("projects.mockupPrefix")} {title} ]
          </div>
        )}

        <div>
          <h3 className="m-0 mb-2.5 text-[34px] font-medium tracking-[-0.02em]">{title}</h3>
          <p className="m-0 mb-[18px] max-w-[380px] text-[15px] leading-[1.6] text-muted">
            {description}
          </p>
          <div className="flex items-center justify-between border-t border-line pt-4 font-mono text-[11px] uppercase tracking-[0.06em] text-faint">
            <span>{project.stack}</span>
            <span className="parrow text-accent transition-transform duration-300">→</span>
          </div>
        </div>
      </div>
    </article>
  );
}
