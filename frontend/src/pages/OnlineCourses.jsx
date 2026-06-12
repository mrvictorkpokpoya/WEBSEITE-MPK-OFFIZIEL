import React from "react";
import { PageHero, Eyebrow, CTA, SectionTitle } from "@/components/Common";

export default function OnlineCourses() {
  return (
    <>
      <PageHero eyebrow="Cours en ligne" title="Toute la qualité MPK, accessible depuis n'importe où." kicker="Pour la diaspora, les villes sans campus MPK, et tous les profils nécessitant flexibilité — sans aucun compromis sur l'encadrement." />
      <section className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16 grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6">
          <h2 className="font-serif text-3xl text-[#2F0808]">Programmes disponibles en ligne</h2>
          <ul className="mt-6 space-y-3 text-[#4A4A4A] font-light">
            <li className="border-b border-[#580505]/10 pb-3"><strong className="text-[#580505]">Allemand Semi-Intensif</strong> — Tous niveaux A1 à C1, structure identique au présentiel.</li>
            <li className="border-b border-[#580505]/10 pb-3"><strong className="text-[#580505]">Préparation aux examens</strong> — Goethe, ÖSD, IELTS, TestDaF, DSH, DELF.</li>
            <li className="border-b border-[#580505]/10 pb-3"><strong className="text-[#580505]">Programme Premium VIP</strong> — sur demande, avec créneaux personnalisés.</li>
          </ul>
        </div>
        <div className="lg:col-span-6 grid sm:grid-cols-2 gap-4">
          {[
            { t: "Même encadrement", d: "Formateurs MPK certifiés, méthode identique au présentiel." },
            { t: "Suivi personnalisé", d: "Évaluation continue, retours individuels réguliers." },
            { t: "Créneaux flexibles", d: "Adaptables au fuseau horaire de chaque apprenant.e." },
            { t: "Accès mondial", d: "Diaspora, étudiants en mobilité, professionnels expatriés." },
          ].map((c, i) => (
            <div key={i} className="mpk-card p-6"><Eyebrow>0{i+1}</Eyebrow><h3 className="font-serif text-xl mt-2 text-[#2F0808]">{c.t}</h3><p className="text-sm mt-2 text-[#4A4A4A]">{c.d}</p></div>
          ))}
        </div>
      </section>
      <section className="bg-[#450000] text-white"><div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16 text-center"><SectionTitle light title="S'inscrire aux cours en ligne." center kicker={<span className="text-white/80">Un conseiller vous recontacte pour caler le créneau adapté.</span>}/><div className="flex justify-center gap-4 flex-wrap"><CTA to="/contact" label="S'inscrire en ligne" testid="online-cta-register"/></div></div></section>
    </>
  );
}
