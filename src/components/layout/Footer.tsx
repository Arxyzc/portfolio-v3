"use client";

import { useTranslation } from "@/lib/i18n/useTranslation";

export function Footer() {
  const { t } = useTranslation();

  return (
    <div className="mt-[110px] flex flex-wrap items-center justify-between gap-4 border-t border-line pt-7 font-mono text-[12px] tracking-[0.06em] text-faint">
      <span>{t("contact.footer.copy")}</span>
    </div>
  );
}
