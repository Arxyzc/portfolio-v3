"use client";

import { useTranslation } from "@/lib/i18n/useTranslation";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "#sobre", key: "nav.about" },
  { href: "#proyectos", key: "nav.projects" },
  { href: "#habilidades", key: "nav.skills" },
  { href: "#experiencia", key: "nav.experience" },
  { href: "#contacto", key: "nav.contact" },
] as const;

export function Nav() {
  const { t } = useTranslation();

  return (
    <nav
      className="fixed inset-x-0 top-0 z-[100] flex items-center justify-between border-b border-line px-11 py-[22px] backdrop-blur-[14px]"
      style={{ background: "color-mix(in srgb, var(--bg) 72%, transparent)" }}
    >
      <a href="#top" className="font-mono text-[13px] tracking-[0.16em] text-fg no-underline">
        LUIS ANDRE
        <span className="text-accent">{t("nav.logoSuffix")}</span>
      </a>

      <div className="flex items-center gap-[30px]">
        <div className="hidden items-center gap-[30px] font-mono text-[12px] uppercase tracking-[0.08em] text-muted md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="navlink text-inherit no-underline">
              {t(l.key)}
            </a>
          ))}
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
}