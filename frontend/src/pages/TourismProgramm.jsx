import React from "react";
import { useTranslation } from "react-i18next";
import { PageHero, Eyebrow, CTA, SectionTitle } from "@/components/Common";

export default function TourismProgramm() {
  const { t } = useTranslation();
  const services = t("tourism.services", { returnObjects: true });
  return (
    <>
      <PageHero
        eyebrow={t("tourism.hero_eyebrow")}
        title={t("tourism.hero_title")}
        kicker={t("tourism.hero_kicker")}
      />
      <section className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16 grid lg:grid-cols-2 gap-6">
        {services.map((s, i) => (
          <div key={i} className="mpk-card p-8">
            <Eyebrow>{t("tourism.offer_label")} 0{i+1}</Eyebrow>
            <h3 className="font-serif text-2xl mt-3 text-[#2F0808] uppercase tracking-tight">{s.t}</h3>
            <p className="mt-3 text-[#4A4A4A] font-light">{s.d}</p>
          </div>
        ))}
      </section>
      <section className="bg-[#FAFAFA] border-y border-[#580505]/10">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16 text-center">
          <SectionTitle title={t("tourism.cta_title")} center />
          <div className="flex justify-center gap-4 flex-wrap">
            <CTA to="/contact" label={t("tourism.cta_discover")} testid="tourism-cta-discover"/>
            <CTA to="/contact" label={t("tourism.cta_book")} variant="ghost" testid="tourism-cta-book"/>
          </div>
        </div>
      </section>
    </>
  );
}
