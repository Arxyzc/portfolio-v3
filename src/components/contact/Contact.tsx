"use client";

import { useTranslation } from "@/lib/i18n/useTranslation";
import { Footer } from "@/components/layout/Footer";
import { socials } from "@/data/socials";

export function Contact() {
  const { t } = useTranslation();

  return (
    <section
      id="contacto"
      className="border-t border-line px-11 pb-14 pt-[130px] [scroll-margin-top:80px]"
    >
      <div
        data-reveal
        className="mb-10 font-mono text-[12px] uppercase tracking-[0.12em] text-accent"
      >
        {t("contact.kicker")}
      </div>
      <h2
        data-reveal
        className="m-0 mb-14 text-[clamp(48px,9vw,128px)] font-medium leading-[0.92] tracking-[-0.04em]"
      >
        {t("contact.headingTop")}
        <br />
        {t("contact.headingBottom")}
      </h2>

      <a
        data-reveal
        href={`mailto:${t("contact.email")}`}
        className="scta inline-block border-b border-line pb-2 text-[clamp(22px,3vw,38px)] tracking-[-0.01em] text-fg no-underline"
      >
        {t("contact.email")}
      </a>

      <div
        data-reveal
        className="mt-16 flex flex-wrap gap-9 font-mono text-[13px] uppercase tracking-[0.06em]"
      >
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            className="scta rounded-[40px] border border-line px-6 py-3 text-muted no-underline"
          >
            {s.label}
          </a>
        ))}
      </div>

      <Footer />
    </section>
  );
}
