import React from "react";
import { PageHero, Eyebrow, CTA, SectionTitle } from "@/components/Common";

export default function ExtraServices() {
  const services = [
    { t: "Curriculum Vitae", d: "Rédaction et mise en page professionnelle (FR / DE / EN)." },
    { t: "Lettre de motivation", d: "Cover letter adaptée au pays et au domaine ciblé." },
    { t: "University Admission", d: "Accompagnement complet pour les procédures d'admission universitaire." },
    { t: "Conseil mobilité & voyage", d: "Tout besoin lié à un déplacement ou une mobilité internationale." },
    { t: "Autres services", d: "Sur demande — nous consulter pour un besoin spécifique." },
  ];
  return (
    <>
      <PageHero eyebrow="MPK Extra Services" title="Services complémentaires à la carte." kicker="Tout ce qui complète une formation ou un projet international — pris en charge par nos équipes expertes." />
      <section className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16">
        <div className="scroll-x"><table className="mpk-table min-w-[640px]">
          <thead><tr><th>Service</th><th>Description</th></tr></thead>
          <tbody>{services.map((s, i) => <tr key={i}><td className="font-medium text-[#2F0808] w-1/3">{s.t}</td><td>{s.d}</td></tr>)}</tbody>
        </table></div>
      </section>
      <section className="bg-[#FAFAFA] border-y border-[#580505]/10"><div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16 text-center"><SectionTitle title="Demandez un service." center /><div className="flex justify-center"><CTA to="/contact" label="Demander un service" testid="extra-cta-request"/></div></div></section>
    </>
  );
}
