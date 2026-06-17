import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Plane, MapPin, GraduationCap, Quote } from "lucide-react";
import { PageHero } from "@/components/Common";
import { ALUMNIS } from "@/lib/data";

export default function Alumni() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState("all");

  const DESTINATIONS = [
    { id: "all", label: t("alumni.filters.all") },
    { id: "germany", label: t("alumni.filters.germany"), match: "Allemagne" },
    { id: "austria", label: t("alumni.filters.austria"), match: "Autriche" },
  ];

  const list = filter === "all" ? ALUMNIS : ALUMNIS.filter((a) => {
    const target = DESTINATIONS.find((d) => d.id === filter)?.match;
    return target && a.destination.includes(target);
  });

  return (
    <>
      <PageHero
        eyebrow={t("alumni.hero_eyebrow")}
        title={t("alumni.hero_title")}
        kicker={t("alumni.hero_kicker")}
      />

      {/* Stats résumé */}
      <section className="bg-[#FAFAFA] border-b border-[#580505]/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-10 lg:py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-4 text-center">
            <div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-[#550000]/80 mb-2 font-medium">{t("alumni.stats.total_eyebrow")}</div>
              <div className="font-serif text-3xl sm:text-4xl text-[#580505]">150+</div>
              <div className="text-xs uppercase tracking-wider text-[#550000] mt-1">{t("alumni.stats.total_label")}</div>
            </div>
            <div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-[#550000]/80 mb-2 font-medium">{t("alumni.stats.destination_eyebrow")}</div>
              <div className="font-serif text-3xl sm:text-4xl text-[#580505]">🇩🇪</div>
              <div className="text-xs uppercase tracking-wider text-[#550000] mt-1">{t("alumni.stats.destination_label")}</div>
            </div>
            <div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-[#550000]/80 mb-2 font-medium">{t("alumni.stats.visas_eyebrow")}</div>
              <div className="font-serif text-3xl sm:text-4xl text-[#580505]">92%</div>
              <div className="text-xs uppercase tracking-wider text-[#550000] mt-1">{t("alumni.stats.visas_label")}</div>
            </div>
            <div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-[#550000]/80 mb-2 font-medium">{t("alumni.stats.opening_eyebrow")}</div>
              <div className="font-serif text-3xl sm:text-4xl text-[#580505]">2021</div>
              <div className="text-xs uppercase tracking-wider text-[#550000] mt-1">{t("alumni.stats.opening_label")}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filtres */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-10 lg:py-12">
        <div className="flex flex-wrap gap-2 mb-8 lg:mb-10">
          {DESTINATIONS.map((d) => (
            <button
              key={d.id}
              data-testid={`alumni-filter-${d.id}`}
              onClick={() => setFilter(d.id)}
              className={`px-4 py-2 text-sm border ${filter === d.id ? "bg-[#580505] text-white border-[#580505]" : "border-[#580505]/30 text-[#580505] hover:bg-[#FAFAFA]"}`}
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* Cartes alumnis */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {list.map((a) => {
            const quote = t(`alumnis.${a.id}.quote`, { defaultValue: a.quote });
            return (
              <article
                key={a.id}
                data-testid={`alumni-card-${a.id}`}
                className="bg-white rounded-sm p-5 sm:p-6 shadow-[0_8px_24px_-12px_rgba(88,5,5,0.18)] hover:shadow-[0_14px_36px_-12px_rgba(88,5,5,0.28)] transition-shadow duration-300 flex flex-col"
              >
                <div className="w-14 h-14 rounded-full bg-[#F4F0F0] grid place-items-center mb-5">
                  <Plane className="text-[#580505]" size={22} strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-lg text-[#2F0808] leading-snug">{a.name}</h3>
                <div className="mt-3 mb-4 h-px bg-[#580505]/15 w-full" />
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2 text-[#580505]">
                    <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                    <span className="font-medium">{a.destination}</span>
                  </div>
                  <div className="flex items-start gap-2 text-[#4A4A4A]">
                    <GraduationCap size={14} className="mt-0.5 flex-shrink-0 text-[#580505]" />
                    <span>{a.path}</span>
                  </div>
                  <div className="text-xs text-[#4A4A4A] mt-1">
                    {t("alumni.card_program")} <span className="text-[#2F0808] font-medium">{a.program}</span>
                  </div>
                  <div className="text-xs text-[#4A4A4A]">{t("alumni.card_arrived")} {a.arrived}</div>
                </div>
                <div className="mt-4 pt-4 border-t border-[#580505]/10 flex-grow">
                  <Quote size={14} className="text-[#580505]/40 mb-1" />
                  <p className="text-xs text-[#4A4A4A] font-light italic leading-relaxed">"{quote}"</p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12 text-center max-w-2xl mx-auto">
          <p className="text-[#4A4A4A] font-light">
            {t("alumni.share_invite")}{" "}
            <a href="mailto:contact@multiplikator-world.com?subject=MPK%20World%20Alumnis%20%E2%80%94%20Mon%20parcours" className="text-[#580505] border-b border-[#580505]">
              {t("alumni.share_link")}
            </a>{" "}
            {t("alumni.share_suffix")}
          </p>
        </div>
      </section>
    </>
  );
}
