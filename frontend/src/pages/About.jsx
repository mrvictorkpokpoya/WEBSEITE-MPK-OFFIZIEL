import React from "react";
import { useTranslation } from "react-i18next";
import { PageHero, Stat, Eyebrow, CTA } from "@/components/Common";

export default function About() {
  const { t } = useTranslation();
  return (
    <>
      <PageHero
        eyebrow={t("about.hero_eyebrow")}
        title={t("about.hero_title")}
        kicker={t("about.hero_kicker")}
      />
      <section className="max-w-[1400px] mx-auto px-5 lg:px-10 py-20 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5"><Eyebrow>{t("about.history_eyebrow")}</Eyebrow><h2 className="font-serif text-3xl text-[#2F0808] mt-3">{t("about.history_title")}</h2></div>
        <div className="lg:col-span-7 space-y-4 text-[#4A4A4A] font-light leading-relaxed">
          <p>{t("about.history_p1")}</p>
          <p>{t("about.history_p2")}</p>
        </div>
      </section>
      <section className="bg-[#FAFAFA] border-y border-[#580505]/10"><div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16 grid sm:grid-cols-3 gap-10">
        <div><h3 className="font-serif text-2xl text-[#580505]">{t("about.mvv.mission_t")}</h3><p className="mt-3 text-[#4A4A4A] font-light leading-relaxed">{t("about.mvv.mission_d")}</p></div>
        <div><h3 className="font-serif text-2xl text-[#580505]">{t("about.mvv.vision_t")}</h3><p className="mt-3 text-[#4A4A4A] font-light leading-relaxed">{t("about.mvv.vision_d")}</p></div>
        <div><h3 className="font-serif text-2xl text-[#580505]">{t("about.mvv.values_t")}</h3><p className="mt-3 text-[#4A4A4A] font-light leading-relaxed">{t("about.mvv.values_d")}</p></div>
      </div></section>
      <section className="max-w-[1400px] mx-auto px-5 lg:px-10 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <Stat value="6" label={t("about.stats_campus")}/>
          <Stat value="850+" label={t("about.stats_candidates")}/>
          <Stat value="4" label={t("about.stats_years")}/>
          <Stat value="98%" label={t("about.stats_goethe")}/>
        </div>
        <Eyebrow>{t("about.approach_eyebrow")}</Eyebrow>
        <h2 className="font-serif text-3xl text-[#2F0808] mt-3 max-w-3xl">{t("about.approach_title")}</h2>
        <p className="mt-5 max-w-3xl text-[#4A4A4A] font-light leading-relaxed">{t("about.approach_p")}</p>
        <div className="mt-10"><CTA to="/contact" label={t("about.cta")} testid="about-cta-contact"/></div>
      </section>
    </>
  );
}
