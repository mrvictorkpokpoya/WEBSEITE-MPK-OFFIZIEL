import React, { useState } from "react";
import { PageHero, Eyebrow } from "@/components/Common";
import { TEAM } from "@/lib/data";

const CATS = ["Tous", "Direction", "Formateurs", "Coordinateurs", "Administration"];

export default function Team() {
  const [cat, setCat] = useState("Tous");
  const list = cat === "Tous" ? TEAM : TEAM.filter((m) => m.category === cat);
  return (
    <>
      <PageHero eyebrow="La Team MPK" title="L'humain derrière le réseau." kicker="Directeurs, formateurs spécialisés, coordinateurs de campus et équipe administrative — tous engagés dans la réussite de nos candidat.e.s." />
      <section className="max-w-[1400px] mx-auto px-5 lg:px-10 py-12">
        <div className="flex flex-wrap gap-2 mb-10">
          {CATS.map((c) => (
            <button key={c} data-testid={`team-filter-${c}`} onClick={() => setCat(c)} className={`px-4 py-2 text-sm border ${cat === c ? 'bg-[#580505] text-white border-[#580505]' : 'border-[#580505]/30 text-[#580505] hover:bg-[#FAFAFA]'}`}>{c}</button>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {list.map((m, i) => (
            <div key={i} className="mpk-card overflow-hidden">
              <div className="aspect-[4/5] bg-gradient-to-b from-[#580505] to-[#2F0808] grid place-items-center text-white font-serif text-5xl">{m.name.split(' ').map(n => n[0]).join('')}</div>
              <div className="p-5">
                <Eyebrow>{m.category}</Eyebrow>
                <h3 className="font-serif text-xl text-[#2F0808] mt-1">{m.name}</h3>
                <div className="text-sm text-[#580505] mt-1">{m.role}</div>
                <div className="text-xs text-[#4A4A4A] mt-2">{m.campus} · {m.spec}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
