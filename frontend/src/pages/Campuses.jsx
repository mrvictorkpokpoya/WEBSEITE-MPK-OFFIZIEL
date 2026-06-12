import React from "react";
import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import { PageHero, Eyebrow } from "@/components/Common";
import { CAMPUSES } from "@/lib/data";

export default function Campuses() {
  return (
    <>
      <PageHero eyebrow="Nos Campus" title="6 implantations physiques au Bénin." kicker="Cotonou (Godomey PK14, Akpakpa), Porto Novo, Lokossa, Djougou, Parakou — et des cours en ligne pour toutes les autres villes." />
      <section className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16 space-y-12">
        {CAMPUSES.map((c, i) => (
          <article id={c.id} key={c.id} className={`grid lg:grid-cols-12 gap-8 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
            <div className={`lg:col-span-7 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
              <div className="aspect-[16/10] overflow-hidden"><img src={c.img} alt={c.name} className="w-full h-full object-cover" /></div>
            </div>
            <div className="lg:col-span-5">
              <Eyebrow>{c.city}{c.flagship ? ' · Campus principal' : ''}</Eyebrow>
              <h2 className="font-serif text-3xl lg:text-4xl text-[#2F0808] mt-3 leading-tight">{c.name}</h2>
              <div className="mt-3 inline-flex items-center gap-2 text-[#580505]"><MapPin size={16}/> {c.area}, {c.city}</div>
              <p className="mt-4 text-[#4A4A4A] font-light leading-relaxed">Tous les programmes MPK Training Plus et MPK Exam Prep — cours présentiels, créneaux flexibles, encadrement personnalisé. Cours en ligne également disponibles depuis ce campus.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/contact" data-testid={`campus-register-${c.id}`} className="btn-primary text-sm">S'inscrire sur ce campus <ArrowRight size={14}/></Link>
                <Link to="/contact" data-testid={`campus-contact-${c.id}`} className="btn-ghost text-sm">Contacter ce campus</Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
