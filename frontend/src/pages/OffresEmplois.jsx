import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Briefcase, MapPin, Clock, ArrowRight, CheckCircle2, TrendingUp, Heart, Globe } from "lucide-react";
import { PageHero, Eyebrow, CTA } from "@/components/Common";

const ROLE_KEYS = ["e1", "e2", "e3", "e4", "e5", "e6"];

export default function OffresEmplois() {
  const { t } = useTranslation();
  const values = t("careers.job.values", { returnObjects: true, defaultValue: [] });

  return (
    <>
      <PageHero
        eyebrow={t("careers.job.hero_eyebrow")}
        title={t("careers.job.hero_title")}
        kicker={t("careers.job.hero_kicker")}
      />

      {/* VALUES */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-12 lg:py-16">
        <div className="mb-10">
          <Eyebrow>{t("careers.job.values_eyebrow")}</Eyebrow>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#2F0808] mt-2 leading-tight">{t("careers.job.values_title")}</h2>
          <p className="mt-3 text-sm sm:text-base text-[#4A4A4A] max-w-2xl font-light leading-relaxed">{t("careers.job.values_kicker")}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {values.map((v, i) => (
            <div key={i} data-testid={`job-value-${i}`} className="bg-white border border-[#580505]/15 p-5 hover:shadow-[0_14px_36px_-12px_rgba(88,5,5,0.25)] transition-shadow">
              <div className="w-10 h-10 rounded-full bg-[#580505] text-[#C4D2ED] grid place-items-center mb-3">
                {i === 0 ? <TrendingUp size={16} /> : i === 1 ? <Heart size={16} /> : i === 2 ? <Globe size={16} /> : <CheckCircle2 size={16} />}
              </div>
              <h3 className="font-serif text-base text-[#2F0808] leading-snug">{v.title}</h3>
              <p className="mt-2 text-xs sm:text-sm text-[#4A4A4A] font-light leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* OPEN ROLES */}
      <section className="bg-[#FAFAFA] border-y border-[#580505]/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-12 lg:py-16">
          <div className="mb-8">
            <Eyebrow>{t("careers.job.roles_eyebrow")}</Eyebrow>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#2F0808] mt-2 leading-tight">{t("careers.job.roles_title")}</h2>
            <p className="mt-3 text-sm sm:text-base text-[#4A4A4A] max-w-2xl font-light leading-relaxed">{t("careers.job.roles_kicker")}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {ROLE_KEYS.map((k) => (
              <article key={k} data-testid={`job-role-${k}`} className="bg-white border border-[#580505]/15 p-5 sm:p-6 hover:shadow-[0_14px_36px_-12px_rgba(88,5,5,0.25)] transition-shadow flex flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#F4F0F0] text-[#580505] grid place-items-center shrink-0">
                    <Briefcase size={16} strokeWidth={1.5} />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.18em] font-bold text-[#580505] bg-[#C4D2ED]/40 px-2 py-1">{t(`careers.job.roles.${k}.type`)}</span>
                </div>
                <h3 className="font-serif text-lg text-[#2F0808] mt-4 leading-snug uppercase">{t(`careers.job.roles.${k}.title`)}</h3>
                <p className="mt-2 text-sm text-[#4A4A4A] font-light leading-relaxed flex-grow">{t(`careers.job.roles.${k}.desc`)}</p>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-[11px] text-[#580505] font-semibold">
                  <span className="inline-flex items-center gap-1"><MapPin size={11} /> {t(`careers.job.roles.${k}.location`)}</span>
                  <span className="inline-flex items-center gap-1"><Clock size={11} /> {t(`careers.job.roles.${k}.deadline`)}</span>
                </div>
                <Link to="/contact" state={{ subject: t(`careers.job.roles.${k}.title`) }} data-testid={`job-role-${k}-apply`} className="mt-5 inline-flex items-center gap-1.5 text-sm text-[#580505] border-b border-[#580505] self-start">
                  {t("careers.apply")} <ArrowRight size={13} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#580505] text-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-14 grid lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8">
            <Eyebrow><span className="text-white/70">{t("careers.job.cta_eyebrow")}</span></Eyebrow>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl mt-3">{t("careers.job.cta_title")}</h2>
            <p className="mt-3 text-white/80 font-light">{t("careers.job.cta_kicker")}</p>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <CTA to="/contact" label={t("careers.cta_btn")} testid="job-cta-contact"/>
          </div>
        </div>
      </section>
    </>
  );
}
