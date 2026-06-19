import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Trophy, Gift, Sparkles, Timer, Tag, ArrowRight } from "lucide-react";
import { PageHero, Eyebrow, CTA } from "@/components/Common";
import { FlyerLanguageCourses, FlyerPrepCourses } from "@/components/MpkFlyers";

const CONTEST_KEYS = ["c1", "c2", "c3"];
const PROMO_KEYS = ["p1", "p2", "p3", "p4"];

export default function ConcoursPromotions() {
  const { t } = useTranslation();

  return (
    <>
      <PageHero
        eyebrow={t("concours.hero_eyebrow")}
        title={t("concours.hero_title")}
        kicker={t("concours.hero_kicker")}
      />

      {/* SECTION 1 — OFFRES EN COURS (visuels dépliants) */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-12 lg:py-16">
        <div className="mb-8">
          <Eyebrow>{t("concours.offers_eyebrow")}</Eyebrow>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#2F0808] mt-2 leading-tight">{t("concours.offers_title")}</h2>
          <p className="mt-3 text-sm sm:text-base text-[#4A4A4A] max-w-2xl font-light leading-relaxed">{t("concours.offers_kicker")}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <FlyerLanguageCourses />
          <FlyerPrepCourses />
        </div>
      </section>

      {/* SECTION 2 — CONCOURS */}
      <section className="bg-[#FAFAFA] border-y border-[#580505]/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-12 lg:py-16">
          <div className="mb-8">
            <Eyebrow>{t("concours.contests_eyebrow")}</Eyebrow>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#2F0808] mt-2 leading-tight">{t("concours.contests_title")}</h2>
            <p className="mt-3 text-sm sm:text-base text-[#4A4A4A] max-w-2xl font-light leading-relaxed">{t("concours.contests_kicker")}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {CONTEST_KEYS.map((k, i) => (
              <article key={k} data-testid={`concours-contest-${k}`} className="bg-white border border-[#580505]/15 p-6 hover:shadow-[0_14px_36px_-12px_rgba(88,5,5,0.28)] transition-shadow flex flex-col">
                <div className="w-12 h-12 rounded-full bg-[#580505] text-[#FFD93D] grid place-items-center mb-4">
                  <Trophy size={20} strokeWidth={1.5} />
                </div>
                <div className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.18em] uppercase text-[#580505] font-semibold">
                  <Tag size={10} /> {t(`concours.contests.${k}.tag`)}
                </div>
                <h3 className="font-serif text-lg text-[#2F0808] mt-2 leading-snug uppercase">{t(`concours.contests.${k}.title`)}</h3>
                <div className="mt-3 mb-3 h-px bg-[#580505]/15 w-full" />
                <p className="text-sm text-[#4A4A4A] font-light leading-relaxed flex-grow">{t(`concours.contests.${k}.desc`)}</p>
                <div className="mt-4 flex items-center justify-between text-[11px] text-[#580505] font-semibold">
                  <span className="inline-flex items-center gap-1"><Timer size={11} /> {t(`concours.contests.${k}.deadline`)}</span>
                  <span className="inline-flex items-center gap-1"><Sparkles size={11} /> {t(`concours.contests.${k}.prize`)}</span>
                </div>
                <Link to="/contact" data-testid={`concours-contest-${k}-cta`} className="mt-5 inline-flex items-center gap-1.5 text-sm text-[#580505] border-b border-[#580505] self-start">
                  {t("concours.contests.cta")} <ArrowRight size={13} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — PROMOTIONS */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-12 lg:py-16">
        <div className="mb-8">
          <Eyebrow>{t("concours.promos_eyebrow")}</Eyebrow>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#2F0808] mt-2 leading-tight">{t("concours.promos_title")}</h2>
          <p className="mt-3 text-sm sm:text-base text-[#4A4A4A] max-w-2xl font-light leading-relaxed">{t("concours.promos_kicker")}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {PROMO_KEYS.map((k, i) => (
            <article key={k} data-testid={`concours-promo-${k}`} className="relative bg-gradient-to-br from-[#580505] to-[#2F0808] text-white p-5 sm:p-6 overflow-hidden">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#FFD93D]/15 rounded-full" />
              <div className="relative">
                <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] font-bold bg-[#FFD93D] text-[#2F0808] px-2 py-1">
                  <Gift size={11} /> {t(`concours.promos.${k}.badge`)}
                </div>
                <div className="mt-4 font-serif text-3xl sm:text-4xl font-extrabold text-[#FFD93D] leading-none tracking-tight">{t(`concours.promos.${k}.amount`)}</div>
                <h3 className="font-serif text-base sm:text-lg mt-2 leading-snug uppercase">{t(`concours.promos.${k}.title`)}</h3>
                <p className="mt-2 text-xs sm:text-sm text-white/80 font-light leading-relaxed">{t(`concours.promos.${k}.desc`)}</p>
                <p className="mt-3 text-[10px] uppercase tracking-wider text-[#C4D2ED]">{t(`concours.promos.${k}.until`)}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SECTION 4 — CTA */}
      <section className="bg-[#450000] text-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-14 grid lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8">
            <Eyebrow><span className="text-white/70">{t("concours.cta_eyebrow")}</span></Eyebrow>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl mt-3">{t("concours.cta_title")}</h2>
            <p className="mt-3 text-white/80 font-light">{t("concours.cta_kicker")}</p>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <CTA to="/boutique" label={t("concours.cta_btn")} testid="concours-cta-shop"/>
          </div>
        </div>
      </section>
    </>
  );
}
