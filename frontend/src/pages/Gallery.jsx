import React, { useState, useMemo } from "react";
import { PageHero } from "@/components/Common";
import { GALLERY } from "@/lib/data";
import { X } from "lucide-react";

const CAMPUS_FILTERS = ["Tous", "GODOMEY PK 14", "AKPAKPA", "PORTO-NOVO", "LOKOSSA", "DJOUGOU", "PARAKOU", "EN LIGNE"];
const TYPE_FILTERS = ["Tous", "Vie de campus", "Événements", "Remises de certificats"];

export default function Gallery() {
  const [campus, setCampus] = useState("Tous");
  const [type, setType] = useState("Tous");
  const [lightbox, setLightbox] = useState(null);
  const items = useMemo(() => GALLERY.filter((g) => (campus === "Tous" || g.campus === campus) && (type === "Tous" || g.type === type)), [campus, type]);
  return (
    <>
      <PageHero eyebrow="Galerie" title="Photos & vidéos." kicker="Vie de campus, événements, remises de certificats — un aperçu visuel du réseau MULTIPLIKATOR." />
      <section className="max-w-[1400px] mx-auto px-5 lg:px-10 py-10">
        <div className="space-y-3 mb-8">
          <div className="flex flex-wrap gap-2">{CAMPUS_FILTERS.map(c => <button key={c} data-testid={`gallery-campus-${c}`} onClick={() => setCampus(c)} className={`px-3 py-1.5 text-xs border ${campus === c ? 'bg-[#580505] text-white border-[#580505]' : 'border-[#580505]/30 text-[#580505]'}`}>{c}</button>)}</div>
          <div className="flex flex-wrap gap-2">{TYPE_FILTERS.map(t => <button key={t} data-testid={`gallery-type-${t}`} onClick={() => setType(t)} className={`px-3 py-1.5 text-xs border ${type === t ? 'bg-[#450000] text-white border-[#450000]' : 'border-[#580505]/20 text-[#4A4A4A]'}`}>{t}</button>)}</div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((g) => (
            <button key={g.id} onClick={() => setLightbox(g)} className="group relative aspect-[4/3] overflow-hidden bg-[#2F0808]">
              <img src={g.img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2F0808]/85 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-white text-left"><div className="text-[10px] tracking-[0.2em] uppercase opacity-80">{g.type}</div><div className="font-serif text-lg">{g.campus}</div></div>
            </button>
          ))}
          {items.length === 0 && <div className="col-span-full text-center text-[#4A4A4A] py-12">Aucun média avec ce filtre.</div>}
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
