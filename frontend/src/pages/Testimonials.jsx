import React from "react";
import { useTranslation } from "react-i18next";
import { Star } from "lucide-react";
import { PageHero, CTA, SectionTitle } from "@/components/Common";
import { TESTIMONIALS } from "@/lib/data";

export default function Testimonials() {
  const { t } = useTranslation();
  return (
    <>
      <PageHero
        eyebrow={t("testimonials.hero_eyebrow")}
        title={t("testimonials.hero_title")}
        kicker={t("testimonials.hero_kicker")}
      />
      <section className="max-w-[1400px] mx-auto px-5 lg:px-10 py-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {TESTIMONIALS.map((tt, i) => {
          const text = t(`testimonials_data.${i}.text`, { defaultValue: tt.text });
          return (
            <div key={i} className="mpk-card p-7">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#580505] text-white grid place-items-center font-serif text-lg">{tt.name.split(' ').map(n => n[0]).join('')}</div>
                <div><div className="font-medium text-[#2F0808]">{tt.name}</div><div className="text-xs text-[#550000]">{tt.campus}</div></div>
              </div>
              <div className="flex gap-0.5 mt-4 text-[#580505]">{Array.from({length: tt.rating}).map((_,k) => <Star key={k} size={14} fill="#580505" stroke="#580505"/>)}</div>
              <p className="mt-3 text-[#2F0808] font-serif text-lg leading-snug">"{text}"</p>
              <div className="text-xs text-[#4A4A4A] mt-4 pt-4 border-t border-[#580505]/10">{tt.program}</div>
            </div>
          );
        })}
      </section>
      <section className="bg-[#FAFAFA] border-y border-[#580505]/10">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16 text-center">
          <SectionTitle title={t("testimonials.cta_title")} center />
          <div className="flex justify-center"><CTA to="/contact" label={t("testimonials.cta_register")} testid="testi-cta-register"/></div>
        </div>
      </section>
    </>
  );
}
