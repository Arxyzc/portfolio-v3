"use client";

import { useTranslation } from "@/lib/i18n/useTranslation";
import { Terminal } from "./Terminal";

export function Hero() {
  const { t } = useTranslation();

  return (
    <header
      id="top"
      className="flex min-h-screen flex-col justify-between px-11 pb-12 pt-[140px]"
    >
      <div />

      <div className="grid grid-cols-1 items-center gap-12 xl:grid-cols-[auto_500px] xl:justify-start xl:gap-75">
        <div className="min-w-0 max-w-[1100px]">
          <div data-hero className="mb-7 font-mono text-[13px] tracking-[0.1em] text-accent">
            {t("hero.kicker")}
          </div>
          <h1
            data-hero
            className="m-0 text-[clamp(52px,8vw,128px)] font-medium leading-[0.9] tracking-[-0.04em]"
          >
            {t("hero.titleTop")}
            <br />
            <span className="text-faint">{t("hero.titleBottom")}</span>
          </h1>
        </div>

        <div className="hidden xl:block">
          <Terminal />
        </div>
      </div>

      <div
        data-hero
        className="flex flex-wrap items-end justify-between gap-10 font-mono text-[12px] tracking-[0.05em] text-muted"
      >
        <div className="max-w-[360px] leading-[1.65] text-fg">{t("hero.intro")}</div>
        <div className="flex flex-wrap gap-x-[52px] gap-y-6 uppercase">
          <div>
            <div className="mb-[7px] text-faint">{t("hero.baseLabel")}</div>
            {t("hero.baseValue")}
          </div>
          <div>
            <div className="mb-[7px] text-faint">{t("hero.stackLabel")}</div>
            {t("hero.stackValue")}
          </div>
          <div className="flex items-end gap-2">
            <span className="mb-[3px] inline-block h-[7px] w-[7px] rounded-full bg-available" />
            {t("hero.scroll")}
          </div>
        </div>
      </div>
    </header>
  );
}