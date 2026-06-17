import React from "react";
import { useTranslation } from "react-i18next";
import { PageHero, Eyebrow, CTA, SectionTitle } from "@/components/Common";

export default function OnlineCourses() {
  const { t } = useTranslation();
  const advantages = t("online_courses.advantages", { returnObjects: true });
  return (
    <>
      <PageHero
        eyebrow={t("online_courses.hero_eyebrow")}
        title={t("online_courses.hero_title")}
        kicker={t("online_courses.hero_kicker")}
      />
      <section className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16 grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6">
          <h2 className="font-serif text-3xl text-[#2F0808]">{t("online_courses.programs_title")}</h2>
          <ul className="mt-6 space-y-3 text-[#4A4A4A] font-light">
            <li className="border-b border-[#580505]/10 pb-3"><strong className="text-[#580505]">{t("online_courses.p1_t")}</strong> — {t("online_courses.p1_d")}</li>
            <li className="border-b border-[#580505]/10 pb-3"><strong className="text-[#580505]">{t("online_courses.p2_t")}</strong> — {t("online_courses.p2_d")}</li>
            <li className="border-b border-[#580505]/10 pb-3"><strong className="text-[#580505]">{t("online_courses.p3_t")}</strong> — {t("online_courses.p3_d")}</li>
          </ul>
        </div>
        <div className="lg:col-span-6 grid sm:grid-cols-2 gap-4">
          {advantages.map((c, i) => (
            <div key={i} className="mpk-card p-6">
              <Eyebrow>0{i+1}</Eyebrow>
              <h3 className="font-serif text-xl mt-2 text-[#2F0808]">{c.t}</h3>
              <p className="text-sm mt-2 text-[#4A4A4A]">{c.d}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-[#450000] text-white">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16 text-center">
          <SectionTitle light title={t("online_courses.cta_title")} center kicker={<span className="text-white/80">{t("online_courses.cta_kicker")}</span>}/>
          <div className="flex justify-center gap-4 flex-wrap">
            <CTA to="/contact" label={t("online_courses.cta_register")} testid="online-cta-register"/>
          </div>
        </div>
      </section>
    </>
  );
}
