import React from "react";
import { PageHero, Eyebrow, CTA, SectionTitle } from "@/components/Common";

const PROGRAMS = [
  { t: "Études à l'étranger", d: "Orientation, dossier d'admission, visa étudiant." },
  { t: "Formation professionnelle", d: "Programmes de formation en Allemagne et en Europe." },
  { t: "Volontariat", d: "FSJ, BFD, programmes de volontariat international." },
  { t: "Au Pair", d: "Accompagnement dossier, mise en relation, préparation." },
  { t: "Regroupement familial / conjugal", d: "Conseil, procédures, documents requis." },
  { t: "Visite touristique", d: "Préparation de séjour, demande de visa touriste." },
  { t: "Autres mobilités", d: "Sur demande — tout type de projet international." },
];

export default function ConsultingPro() {
  return (
    <>
      <PageHero eyebrow="MPK Consulting Pro" title="Consultance en mobilité internationale." kicker="MPK Consulting Pro accompagne toute personne souhaitant se déplacer, s'installer ou évoluer à l'international, quel que soit le motif du projet." />
      <section className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16">
        <div className="grid lg:grid-cols-12 gap-5">
          {PROGRAMS.map((p, i) => (
            <div key={i} className={`mpk-card p-7 ${i === 0 ? 'lg:col-span-6' : i === 1 ? 'lg:col-span-6' : 'lg:col-span-4'}`}>
              <Eyebrow>Programme</Eyebrow><h3 className="font-serif text-2xl mt-2 text-[#2F0808]">{p.t}</h3><p className="mt-3 text-[#4A4A4A] font-light">{p.d}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-[#FAFAFA] border-y border-[#580505]/10"><div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16 text-center"><SectionTitle title="Prenez rendez-vous avec un conseiller." center /><div className="flex justify-center gap-4 flex-wrap"><CTA to="/contact" label="Prendre rendez-vous" testid="consulting-cta-rdv"/><CTA to="/contact" label="Nous contacter" variant="ghost" testid="consulting-cta-contact"/></div></div></section>
    </>
  );
}
