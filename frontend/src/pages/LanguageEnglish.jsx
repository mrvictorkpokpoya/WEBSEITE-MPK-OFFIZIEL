import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, GraduationCap, Sparkles, Baby, ShoppingCart } from "lucide-react";
import { PageHero, Eyebrow, CTA } from "@/components/Common";
import { ENGLISH_COURSES, KIDS_ENGLISH } from "@/lib/data";

function SublevelCard({ c }) {
  const { t } = useTranslation();
  return (
    <div className="bg-white rounded-sm p-5 sm:p-6 border border-[#580505]/25 shadow-[0_14px_30px_-12px_rgba(88,5,5,0.35)] hover:shadow-[0_22px_44px_-12px_rgba(88,5,5,0.42)] hover:border-[#580505]/40 transition-all duration-300 flex flex-col h-full opacity-95">
      <div className="flex items-start justify-between gap-3">
        <div className="inline-flex items-center justify-center min-w-[56px] h-10 px-3 font-serif text-lg font-semibold bg-[#C4D2ED] text-[#580505] border border-[#580505]">{c.level}</div>
        <span className="text-[10px] tracking-[0.18em] uppercase text-[#580505]/70 font-medium">{t("languages.coming_soon")}</span>
      </div>
      <h3 className="font-serif text-lg text-[#2F0808] mt-4 leading-snug">{c.title}</h3>
      <div className="mt-3 mb-3 h-px bg-[#580505]/20 w-full" />
      <p className="text-sm text-[#4A4A4A] font-light leading-relaxed flex-grow">{t("languages.english_kicker")}</p>
      <div className="mt-4 text-[10px] tracking-[0.18em] uppercase text-[#580505]/70 font-medium">{t("training_plus.card_price_label")}</div>
      <div className="font-serif text-xl text-[#580505] mt-0.5">{t("training_plus.card_price_quote")}</div>
      <Link to="/contact" className="mt-5 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-[#580505] border-[1.5px] border-[#580505] text-sm font-semibold hover:bg-[#FAFAFA] transition">
        <ShoppingCart size={14} /> {t("training_plus.card_buy_quote")}
      </Link>
    </div>
  );
}

export default function LanguageEnglish() {
  const { t } = useTranslation();
  return (
    <>
      <PageHero
        eyebrow={t("languages.english_section_eyebrow")}
        title={t("languages.english_title")}
        kicker={t("languages.english_kicker")}
      />

      <section className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-6">
        <Link to="/departements/training-plus" className="inline-flex items-center gap-2 text-sm text-[#580505] hover:underline" data-testid="link-back-training">
          <ArrowLeft size={14}/> {t("languages.back_to_training")}
        </Link>
      </section>

      {/* MPK Kids English Training */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-8">
        <Eyebrow>{t("languages.kids_tagline")}</Eyebrow>
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#2F0808] mt-3 uppercase tracking-tight">{t("languages.kids_title")}</h2>
        <div className="mt-8 mpk-card p-6 sm:p-8 grid sm:grid-cols-12 gap-6 items-center bg-[#FAFAFA]" data-testid="kids-english-card">
          <div className="sm:col-span-2 flex justify-center">
            <div className="w-20 h-20 rounded-full bg-[#580505] grid place-items-center text-white">
              <Baby size={32} strokeWidth={1.5} />
            </div>
          </div>
          <div className="sm:col-span-7">
            <h3 className="font-serif text-xl sm:text-2xl text-[#2F0808] leading-snug">{t("languages.kids_title")}</h3>
            <p className="mt-2 text-sm text-[#4A4A4A] font-light leading-relaxed">{t("languages.kids_desc")}</p>
            <div className="mt-3 flex flex-wrap gap-4 text-xs">
              <span className="inline-flex items-center gap-1.5 text-[#580505] font-medium tracking-wide uppercase">{t("languages.kids_duration")}</span>
              <span className="inline-flex items-center gap-1.5 text-[#580505] font-medium tracking-wide uppercase">{t("languages.kids_reg")}</span>
            </div>
          </div>
          <div className="sm:col-span-3 text-center sm:text-right">
            <div className="text-[10px] tracking-[0.18em] uppercase text-[#580505]/70 font-medium">{t("training_plus.card_price_label")}</div>
            <div className="font-serif text-3xl text-[#580505] mt-1">{t("languages.kids_price")}</div>
            <Link to="/contact" data-testid="kids-cta" className="mt-4 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#580505] text-[#C4D2ED] border-[1.5px] border-[#580505] text-sm font-semibold hover:bg-[#2F0808] transition">
              <ShoppingCart size={14} /> {t("languages.kids_cta")}
            </Link>
          </div>
        </div>
      </section>

      {/* Sublevels A1.1 → C2.2 (coming soon) */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-12">
        <div className="flex items-center gap-3 mb-3">
          <GraduationCap className="text-[#580505]" size={26} strokeWidth={1.5} />
          <Eyebrow>{t("languages.sublevels_title")}</Eyebrow>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl text-[#2F0808] uppercase tracking-tight">{t("languages.english_title")} A1.1 → C2.2</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-8">
          {ENGLISH_COURSES.map((c) => <SublevelCard key={c.level} c={c} />)}
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-16 text-center">
        <Sparkles className="mx-auto text-[#580505]" size={26} />
        <h2 className="font-serif text-2xl text-[#2F0808] mt-4">{t("languages.coming_soon")}</h2>
        <p className="mt-3 text-[#4A4A4A] font-light max-w-2xl mx-auto">{t("languages.design_text")}</p>
        <div className="mt-6"><CTA to="/contact" label={t("training_plus.coming_notify")} testid="english-notify-cta"/></div>
      </section>
    </>
  );
}
