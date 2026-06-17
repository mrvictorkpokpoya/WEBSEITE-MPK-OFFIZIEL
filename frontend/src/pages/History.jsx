import React from "react";
import { Link } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import { ArrowRight, Award, Globe, Users, BookOpen } from "lucide-react";
import { PageHero, Eyebrow } from "@/components/Common";

const VALUE_ICONS = [Award, Users, Globe, BookOpen];

export default function History() {
  const { t } = useTranslation();
  const timeline = t("history.timeline", { returnObjects: true });
  const values = t("history.values", { returnObjects: true });

  return (
    <>
      <PageHero
        eyebrow={t("history.hero_eyebrow")}
        title={t("history.hero_title")}
        kicker={t("history.hero_kicker")}
      />

      {/* Origine */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-12 lg:py-20 grid lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-5">
          <Eyebrow>{t("history.origin_eyebrow")}</Eyebrow>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl mt-3 text-[#2F0808] leading-tight uppercase tracking-tight">{t("history.origin_title")}</h2>
        </div>
        <div className="lg:col-span-7 space-y-4 text-[#4A4A4A] font-light leading-relaxed">
          <p><Trans i18nKey="history.origin_p1" components={{ strong: <strong className="text-[#580505]" /> }} /></p>
          <p><Trans i18nKey="history.origin_p2" components={{ strong: <strong className="text-[#580505]" /> }} /></p>
        </div>
      </section>

      {/* Chronologie */}
      <section className="bg-[#FAFAFA] border-y border-[#580505]/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-12 lg:py-20">
          <Eyebrow>{t("history.timeline_eyebrow")}</Eyebrow>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl mt-3 text-[#2F0808] uppercase tracking-tight">{t("history.timeline_title")}</h2>

          <div className="mt-10 lg:mt-14 relative">
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-[#580505]/20" />
            {timeline.map((tl, i) => (
              <div key={tl.y} className={`relative grid lg:grid-cols-2 gap-6 lg:gap-12 mb-10 lg:mb-16 ${i % 2 === 0 ? "" : "lg:[&>*:first-child]:order-2"}`}>
                <div className={`${i % 2 === 0 ? "lg:text-right lg:pr-12" : "lg:pl-12"}`}>
                  <div className="font-serif text-4xl sm:text-5xl text-[#580505] leading-none">{tl.y}</div>
                </div>
                <div className={`${i % 2 === 0 ? "lg:pl-12" : "lg:text-right lg:pr-12"} mpk-card p-5 sm:p-6 bg-white`}>
                  <h3 className="font-serif text-lg sm:text-xl text-[#2F0808] leading-snug">{tl.t}</h3>
                  <p className="mt-2 sm:mt-3 text-sm text-[#4A4A4A] font-light leading-relaxed">{tl.d}</p>
                </div>
                <div className="hidden lg:block absolute left-1/2 top-3 w-3 h-3 -ml-1.5 bg-[#580505] rounded-full ring-4 ring-[#FAFAFA]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-12 lg:py-20">
        <Eyebrow>{t("history.values_eyebrow")}</Eyebrow>
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl mt-3 text-[#2F0808] uppercase tracking-tight">{t("history.values_title")}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-8 lg:mt-10">
          {values.map((v, i) => {
            const Icon = VALUE_ICONS[i];
            return (
              <div key={v.t} className="mpk-card p-5 sm:p-6">
                <Icon className="text-[#580505]" size={26} strokeWidth={1.5} />
                <h3 className="font-serif text-base sm:text-lg text-[#2F0808] mt-4">{v.t}</h3>
                <p className="mt-2 text-sm text-[#4A4A4A] font-light leading-relaxed">{v.d}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-16 lg:py-24 text-center">
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#2F0808] uppercase tracking-tight">{t("history.cta_title")}</h2>
        <p className="mt-5 sm:mt-6 max-w-2xl mx-auto text-[#4A4A4A] font-light text-base sm:text-lg">{t("history.cta_kicker")}</p>
        <div className="mt-8 lg:mt-10 flex flex-wrap justify-center gap-4">
          <Link to="/departements/training-plus" className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 bg-[#580505] text-[#C4D2ED] border-[1.5px] border-[#580505] font-semibold tracking-wide hover:bg-[#2F0808] transition">{t("history.cta_formations")} <ArrowRight size={16} /></Link>
          <Link to="/appel-a-investissement" className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 bg-white text-[#580505] border-[1.5px] border-[#580505] font-semibold tracking-wide hover:bg-[#FAFAFA] transition">{t("history.cta_support")} <ArrowRight size={16} /></Link>
        </div>
      </section>
    </>
  );
}
