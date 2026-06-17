import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { PageHero } from "@/components/Common";
import { GALLERY } from "@/lib/data";
import { X } from "lucide-react";

// Canonical campus IDs (data side) — used to match GALLERY.campus values
const CAMPUS_IDS = ["all", "GODOMEY PK 14", "AKPAKPA", "PORTO-NOVO", "LOKOSSA", "DJOUGOU", "PARAKOU", "EN LIGNE"];
const TYPE_IDS = ["all", "Vie de campus", "Événements", "Remises de certificats"];

export default function Gallery() {
  const { t } = useTranslation();
  const campusLabels = t("gallery.campus_filters", { returnObjects: true });
  const typeLabels = t("gallery.type_filters", { returnObjects: true });

  const [campusIdx, setCampusIdx] = useState(0);
  const [typeIdx, setTypeIdx] = useState(0);
  const [lightbox, setLightbox] = useState(null);

  const items = useMemo(() => {
    const campusFilter = CAMPUS_IDS[campusIdx];
    const typeFilter = TYPE_IDS[typeIdx];
    return GALLERY.filter((g) => (campusFilter === "all" || g.campus === campusFilter) && (typeFilter === "all" || g.type === typeFilter));
  }, [campusIdx, typeIdx]);

  return (
    <>
      <PageHero eyebrow={t("gallery.hero_eyebrow")} title={t("gallery.hero_title")} kicker={t("gallery.hero_kicker")} />
      <section className="max-w-[1400px] mx-auto px-5 lg:px-10 py-10">
        <div className="space-y-3 mb-8">
          <div className="flex flex-wrap gap-2">
            {campusLabels.map((label, idx) => (
              <button key={idx} data-testid={`gallery-campus-${idx}`} onClick={() => setCampusIdx(idx)}
                className={`px-3 py-1.5 text-xs border ${campusIdx === idx ? 'bg-[#580505] text-white border-[#580505]' : 'border-[#580505]/30 text-[#580505]'}`}>
                {label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {typeLabels.map((label, idx) => (
              <button key={idx} data-testid={`gallery-type-${idx}`} onClick={() => setTypeIdx(idx)}
                className={`px-3 py-1.5 text-xs border ${typeIdx === idx ? 'bg-[#450000] text-white border-[#450000]' : 'border-[#580505]/20 text-[#4A4A4A]'}`}>
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((g) => (
            <button key={g.id} onClick={() => setLightbox(g)} className="group relative aspect-[4/3] overflow-hidden bg-[#2F0808]">
              <img src={g.img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2F0808]/85 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-white text-left">
                <div className="text-[10px] tracking-[0.2em] uppercase opacity-80">{g.type}</div>
                <div className="font-serif text-lg">{g.campus}</div>
              </div>
            </button>
          ))}
          {items.length === 0 && <div className="col-span-full text-center text-[#4A4A4A] py-12">{t("gallery.empty")}</div>}
        </div>
      </section>
      {lightbox && (
        <div className="fixed inset-0 z-[60] bg-black/85 grid place-items-center p-5" onClick={() => setLightbox(null)}>
          <button onClick={() => setLightbox(null)} className="absolute top-5 right-5 text-white"><X /></button>
          <img src={lightbox.img} alt="" className="max-h-[85vh] max-w-full" />
        </div>
      )}
    </>
  );
}
