"use client";

import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { ThemeToggle } from "./ThemeToggle";
import { LangToggle } from "./LangToggle";

const links = [
  { href: "#sobre", key: "nav.about" },
  { href: "#proyectos", key: "nav.projects" },
  { href: "#habilidades", key: "nav.skills" },
  { href: "#experiencia", key: "nav.experience" },
  { href: "#contacto", key: "nav.contact" },
] as const;

export function Nav() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className="fixed inset-x-0 top-0 z-[100] border-b border-line backdrop-blur-[14px]"
      style={{ background: "color-mix(in srgb, var(--bg) 72%, transparent)" }}
    >
      <div className="flex items-center justify-between px-11 py-[22px]">
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

          <div className="flex items-center gap-3">
            <LangToggle />
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={t("nav.menuAria")}
              aria-expanded={menuOpen}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-line text-fg md:hidden"
            >
              {menuOpen ? <FiX size={16} /> : <FiMenu size={16} />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div
          className="border-t border-line px-11 py-6 md:hidden"
          style={{ background: "color-mix(in srgb, var(--bg) 96%, transparent)" }}
        >
          <div className="flex flex-col gap-5 font-mono text-[13px] uppercase tracking-[0.08em] text-muted">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="navlink text-inherit no-underline"
              >
                {t(l.key)}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
