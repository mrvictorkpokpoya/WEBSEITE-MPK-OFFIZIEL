import React from "react";
import { useTranslation } from "react-i18next";
import { PageHero, Eyebrow, CTA, SectionTitle } from "@/components/Common";

export default function ConsultingPro() {
  const { t } = useTranslation();
  const programs = t("consulting_pro.programs", { returnObjects: true });
  return (
    <>
      <PageHero
        eyebrow={t("consulting_pro.hero_eyebrow")}
        title={t("consulting_pro.hero_title")}
        kicker={t("consulting_pro.hero_kicker")}
      />
      <section className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16">
        <div className="grid lg:grid-cols-12 gap-5">
          {programs.map((p, i) => (
            <div key={i} className={`mpk-card p-7 ${i === 0 ? 'lg:col-span-6' : i === 1 ? 'lg:col-span-6' : 'lg:col-span-4'}`}>
              <Eyebrow>{t("consulting_pro.program_label")}</Eyebrow>
              <h3 className="font-serif text-2xl mt-2 text-[#2F0808] uppercase tracking-tight">{p.t}</h3>
              <p className="mt-3 text-[#4A4A4A] font-light">{p.d}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-[#FAFAFA] border-y border-[#580505]/10">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16 text-center">
          <SectionTitle title={t("consulting_pro.cta_title")} center />
          <div className="flex justify-center gap-4 flex-wrap">
            <CTA to="/contact" label={t("consulting_pro.cta_rdv")} testid="consulting-cta-rdv"/>
            <CTA to="/contact" label={t("consulting_pro.cta_contact")} variant="ghost" testid="consulting-cta-contact"/>
          </div>
        </div>
      </section>
    </>
  );
}
