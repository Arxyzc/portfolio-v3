"use client";

import { useTranslation } from "@/lib/i18n/useTranslation";

const ITEM_COUNT = 8;

export function BentoGallery() {
  const { t } = useTranslation();

  return (
    <section id="galeria" className="border-t border-line">
      <div className="bento-gallery-wrap" data-bento-wrap>
        <div className="bento-gallery bento-gallery--bento" data-bento-gallery>
          {Array.from({ length: ITEM_COUNT }, (_, i) => (
            <div className="bento-gallery__item" key={i}>
              <div className="bento-gallery__item-fill" aria-hidden="true" />
            </div>
          ))}
        </div>
        <span className="sr-only">{t("gallery.label")}</span>
      </div>
    </section>
  );
}
