import React from "react";
import { useTranslation } from "react-i18next";
import { PageHero, Eyebrow, CTA, SectionTitle } from "@/components/Common";

export default function TranslationPro() {
  const { t } = useTranslation();
  const services = t("translation_pro.services", { returnObjects: true });
  return (
    <>
      <PageHero
        eyebrow={t("translation_pro.hero_eyebrow")}
        title={t("translation_pro.hero_title")}
        kicker={t("translation_pro.hero_kicker")}
      />
      <section className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16 grid md:grid-cols-2 gap-6">
        {services.map((s, i) => (
          <div key={i} className="mpk-card p-8">
            <Eyebrow>{t("translation_pro.service_label")} 0{i+1}</Eyebrow>
            <h3 className="font-serif text-2xl mt-3 text-[#2F0808]">{s.t}</h3>
            <p className="mt-3 text-[#4A4A4A] font-light leading-relaxed">{s.d}</p>
          </div>
        ))}
      </section>
      <section className="bg-[#FAFAFA] border-y border-[#580505]/10">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16 text-center">
          <SectionTitle eyebrow={t("translation_pro.quote_eyebrow")} title={t("translation_pro.quote_title")} center />
          <div className="flex justify-center"><CTA to="/contact" label={t("translation_pro.quote_cta")} testid="translation-cta-quote"/></div>
        </div>
      </section>
    </>
  );
}
