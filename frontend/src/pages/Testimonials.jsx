import React from "react";
import { Star } from "lucide-react";
import { PageHero, CTA, SectionTitle } from "@/components/Common";
import { TESTIMONIALS } from "@/lib/data";

export default function Testimonials() {
  return (
    <>
      <PageHero eyebrow="Témoignages" title="Ils ont fait confiance à MULTIPLIKATOR." kicker="Des parcours réels, sur tous les campus et en ligne — la preuve concrète d'une méthode qui fonctionne." />
      <section className="max-w-[1400px] mx-auto px-5 lg:px-10 py-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {TESTIMONIALS.map((t, i) => (
          <div key={i} className="mpk-card p-7">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#580505] text-white grid place-items-center font-serif text-lg">{t.name.split(' ').map(n => n[0]).join('')}</div>
              <div><div className="font-medium text-[#2F0808]">{t.name}</div><div className="text-xs text-[#550000]">{t.campus}</div></div>
            </div>
            <div className="flex gap-0.5 mt-4 text-[#580505]">{Array.from({length: t.rating}).map((_,k) => <Star key={k} size={14} fill="#580505" stroke="#580505"/>)}</div>
            <p className="mt-3 text-[#2F0808] font-serif text-lg leading-snug">"{t.text}"</p>
            <div className="text-xs text-[#4A4A4A] mt-4 pt-4 border-t border-[#580505]/10">{t.program}</div>
          </div>
        ))}
      </section>
      <section className="bg-[#FAFAFA] border-y border-[#580505]/10"><div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16 text-center"><SectionTitle title="Vous aussi, rejoignez nos apprenant.e.s." center /><div className="flex justify-center"><CTA to="/contact" label="S'inscrire" testid="testi-cta-register"/></div></div></section>
    </>
  );
}
