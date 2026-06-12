import React from "react";
import { PageHero, Eyebrow, CTA, SectionTitle } from "@/components/Common";

export default function TourismProgramm() {
  return (
    <>
      <PageHero eyebrow="MPK Tourism Programm" title="Académie de guides touristiques & programmes d'excursions." kicker="À la fois école de formation pour guides professionnels et organisateur de sorties au Bénin et dans la sous-région." />
      <section className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16 grid lg:grid-cols-2 gap-6">
        {[
          { t: "Formation de guides touristiques", d: "Programme professionnalisant pour devenir guide certifié au Bénin et dans la sous-région." },
          { t: "Sorties & excursions", d: "Excursions organisées sur les sites majeurs (Abomey, Ouidah, Pendjari, Ganvié…)." },
          { t: "Conseil planification voyage", d: "Itinéraires, logistique, recommandations selon profil voyageur." },
          { t: "Programmes sur mesure", d: "Groupes scolaires, entreprises, touristes individuels." },
        ].map((s, i) => (
          <div key={i} className="mpk-card p-8"><Eyebrow>Offre 0{i+1}</Eyebrow><h3 className="font-serif text-2xl mt-3 text-[#2F0808]">{s.t}</h3><p className="mt-3 text-[#4A4A4A] font-light">{s.d}</p></div>
        ))}
      </section>
      <section className="bg-[#FAFAFA] border-y border-[#580505]/10"><div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16 text-center"><SectionTitle title="Réservez votre excursion ou intégrez l'académie." center /><div className="flex justify-center gap-4 flex-wrap"><CTA to="/contact" label="Découvrir le programme" testid="tourism-cta-discover"/><CTA to="/contact" label="Réserver une excursion" variant="ghost" testid="tourism-cta-book"/></div></div></section>
    </>
  );
}
