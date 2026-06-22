"use client";

import { useTranslation } from "@/lib/i18n/useTranslation";
import { useTheme } from "@/lib/theme/useTheme";

/** Pill 46×24 con knob deslizante (2px oscuro → 24px claro). */
export function ThemeToggle() {
  const { t } = useTranslation();
  const { theme, toggle, mounted } = useTheme();
  const knobLeft = theme === "light" ? 24 : 2;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t("nav.themeAria")}
      aria-pressed={mounted ? theme === "light" : undefined}
      className="relative ml-1.5 h-6 w-[46px] cursor-pointer rounded-[13px] border border-line bg-transparent p-0"
    >
      <span
        className="absolute top-0.5 h-[18px] w-[18px] rounded-full bg-accent transition-[left] duration-[350ms] [transition-timing-function:cubic-bezier(.7,0,.2,1)]"
        style={{ left: knobLeft }}
      />
    </button>
  );
}
