import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, GraduationCap, Sparkles } from "lucide-react";
import { PageHero, Eyebrow, CTA } from "@/components/Common";
import { CHINESE_COURSES } from "@/lib/data";

function PlaceholderCard({ c }) {
  const { t } = useTranslation();
  return (
    <div className="bg-white rounded-sm p-5 sm:p-6 border border-dashed border-[#580505]/40 shadow-[0_10px_24px_-14px_rgba(88,5,5,0.25)] flex flex-col h-full opacity-75">
      <div className="inline-flex items-center justify-center min-w-[56px] h-10 px-3 font-serif text-lg font-semibold bg-[#FAEDED] text-[#580505] border border-dashed border-[#580505]/50 w-fit">{c.level}</div>
      <h3 className="font-serif text-lg text-[#2F0808] mt-4 leading-snug">{c.title}</h3>
      <div className="mt-3 mb-3 h-px bg-[#580505]/15 w-full" />
      <div className="text-[10px] tracking-[0.18em] uppercase text-[#580505]/60 font-medium">{t("languages.in_progress")}</div>
    </div>
  );
}

export default function LanguageChinese() {
  const { t } = useTranslation();
  return (
    <>
      <PageHero
        eyebrow={t("languages.chinese_section_eyebrow")}
        title={t("languages.chinese_title")}
        kicker={t("languages.chinese_kicker")}
      />

      <section className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-6">
        <Link to="/departements/training-plus" className="inline-flex items-center gap-2 text-sm text-[#580505] hover:underline">
          <ArrowLeft size={14}/> {t("languages.back_to_training")}
        </Link>
      </section>

      <section className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-12">
        <div className="flex items-center gap-3 mb-3">
          <GraduationCap className="text-[#580505]" size={26} strokeWidth={1.5} />
          <Eyebrow>{t("languages.sublevels_title")} · A1.1 → C2.2 (HSK 1-6)</Eyebrow>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl text-[#2F0808] uppercase tracking-tight">{t("languages.chinese_title")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-8">
          {CHINESE_COURSES.map((c) => <PlaceholderCard key={c.level} c={c} />)}
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-16 text-center">
        <Sparkles className="mx-auto text-[#580505]" size={26} />
        <h2 className="font-serif text-2xl text-[#2F0808] mt-4">{t("languages.in_progress")}</h2>
        <p className="mt-3 text-[#4A4A4A] font-light max-w-2xl mx-auto">{t("languages.design_text")}</p>
        <div className="mt-6"><CTA to="/contact" label={t("training_plus.coming_notify")} testid="chinese-notify-cta"/></div>
      </section>
    </>
  );
}
