import React from "react";
import { PageHero, Eyebrow, CTA, SectionTitle } from "@/components/Common";

export default function TranslationPro() {
  const services = [
    { t: "Traduction officielle", d: "Documents administratifs, académiques, juridiques. Conformité avec les exigences des autorités." },
    { t: "Traduction certifiée", d: "Pour ambassades et dossiers officiels. Tampon et signature du traducteur agréé." },
    { t: "Correspondances professionnelles", d: "Lettres, e-mails, contrats — traduits dans le ton et le registre attendus." },
    { t: "Interprétation", d: "Consécutive ou de liaison pour réunions, négociations et événements." },
  ];
  return (
    <>
      <PageHero eyebrow="MPK Translation Pro" title="Traduction et interprétation professionnelle." kicker="Allemand · Français · Anglais — autres langues sur demande. Confidentialité, précision terminologique et respect des délais." />
      <section className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16 grid md:grid-cols-2 gap-6">
        {services.map((s, i) => (
          <div key={i} className="mpk-card p-8"><Eyebrow>Service 0{i+1}</Eyebrow><h3 className="font-serif text-2xl mt-3 text-[#2F0808]">{s.t}</h3><p className="mt-3 text-[#4A4A4A] font-light leading-relaxed">{s.d}</p></div>
        ))}
      </section>
      <section className="bg-[#FAFAFA] border-y border-[#580505]/10"><div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16 text-center"><SectionTitle eyebrow="Demande de devis" title="Envoyez vos documents en toute confidentialité." center /><div className="flex justify-center"><CTA to="/contact" label="Demander un devis" testid="translation-cta-quote"/></div></div></section>
    </>
  );
}
