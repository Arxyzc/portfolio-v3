"use client";

import { useTranslation } from "@/lib/i18n/useTranslation";
import { locales } from "@/lib/i18n/config";

/** Selector ES/EN: dos botones tipo segmented control. */
export function LangToggle() {
  const { locale, setLocale, t } = useTranslation();

  return (
    <div
      role="group"
      aria-label={t("nav.langAria")}
      className="flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.08em]"
    >
      {locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          aria-pressed={locale === l}
          className={`rounded-md px-1.5 py-1 transition-colors ${
            locale === l ? "text-fg" : "text-faint hover:text-muted"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
