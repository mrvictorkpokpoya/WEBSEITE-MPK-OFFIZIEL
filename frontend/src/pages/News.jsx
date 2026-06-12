import React from "react";
import { PageHero, Eyebrow, CTA } from "@/components/Common";
import { NEWS } from "@/lib/data";
import { Calendar } from "lucide-react";

export default function News() {
  return (
    <>
      <PageHero eyebrow="Actualités & Concours" title="Le pouls du réseau MULTIPLIKATOR." kicker="Rentrées, ouvertures de campus, concours, résultats — toutes les informations institutionnelles." />
      <section className="max-w-[1400px] mx-auto px-5 lg:px-10 py-12 grid lg:grid-cols-2 gap-6">
        {NEWS.map((n) => (
          <article key={n.id} className="mpk-card p-7">
            <div className="flex items-center justify-between text-xs"><Eyebrow>{n.tag}</Eyebrow><span className="text-[#4A4A4A] flex items-center gap-1.5"><Calendar size={12}/> {n.date}</span></div>
            <h2 className="font-serif text-2xl text-[#2F0808] mt-3">{n.title}</h2>
            <p className="mt-3 text-[#4A4A4A] font-light leading-relaxed">{n.excerpt}</p>
            <a href="#" className="inline-flex items-center gap-1 mt-5 text-[#580505] border-b border-[#580505] text-sm">Lire la suite</a>
          </article>
        ))}
      </section>

      <section className="bg-[#450000] text-white"><div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16 grid lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-8">
          <Eyebrow><span className="text-white/70">Concours en cours</span></Eyebrow>
          <h2 className="font-serif text-3xl lg:text-4xl mt-3">Bourse MULTIPLIKATOR 2026 — 5 formations A1 offertes.</h2>
          <p className="mt-3 text-white/80 font-light">Participez avant le 28 février. Tirage au sort le 1er mars sur le campus de Godomey PK14.</p>
        </div>
        <div className="lg:col-span-4 lg:text-right"><CTA to="/contact" label="Participer au concours" testid="news-cta-concours"/></div>
      </div></section>
    </>
  );
}
