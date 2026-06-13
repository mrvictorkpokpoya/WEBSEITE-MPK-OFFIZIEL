import React, { useState } from "react";
import { Plane, MapPin, GraduationCap, Quote } from "lucide-react";
import { PageHero, Eyebrow } from "@/components/Common";
import { ALUMNIS } from "@/lib/data";

const DESTINATIONS = ["Tous", "Allemagne", "Autriche"];

export default function Alumni() {
  const [filter, setFilter] = useState("Tous");
  const list = filter === "Tous" ? ALUMNIS : ALUMNIS.filter((a) => a.destination.includes(filter));

  return (
    <>
      <PageHero
        eyebrow="MPK World Alumnis"
        title="Ils ont rejoint l'Europe avec MULTIPLIKATOR."
        kicker="Études, Ausbildung, Au Pair, regroupement familial, contrat CDI — découvrez le parcours de nos anciens apprenants désormais établis en Allemagne et en Autriche."
      />

      {/* Stats résumé */}
      <section className="bg-[#FAFAFA] border-b border-[#580505]/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-10 lg:py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-4 text-center">
            <div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-[#550000]/80 mb-2 font-medium">Total</div>
              <div className="font-serif text-3xl sm:text-4xl text-[#580505]">150+</div>
              <div className="text-xs uppercase tracking-wider text-[#550000] mt-1">Alumnis partis en Europe</div>
            </div>
            <div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-[#550000]/80 mb-2 font-medium">Première destination</div>
              <div className="font-serif text-3xl sm:text-4xl text-[#580505]">🇩🇪</div>
              <div className="text-xs uppercase tracking-wider text-[#550000] mt-1">Allemagne</div>
            </div>
            <div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-[#550000]/80 mb-2 font-medium">Visas obtenus</div>
              <div className="font-serif text-3xl sm:text-4xl text-[#580505]">92%</div>
              <div className="text-xs uppercase tracking-wider text-[#550000] mt-1">Taux de succès</div>
            </div>
            <div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-[#550000]/80 mb-2 font-medium">Ouverture</div>
              <div className="font-serif text-3xl sm:text-4xl text-[#580505]">2021</div>
              <div className="text-xs uppercase tracking-wider text-[#550000] mt-1">Première promotion</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filtres */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-10 lg:py-12">
        <div className="flex flex-wrap gap-2 mb-8 lg:mb-10">
          {DESTINATIONS.map((d) => (
            <button
              key={d}
              data-testid={`alumni-filter-${d}`}
              onClick={() => setFilter(d)}
              className={`px-4 py-2 text-sm border ${filter === d ? "bg-[#580505] text-white border-[#580505]" : "border-[#580505]/30 text-[#580505] hover:bg-[#FAFAFA]"}`}
            >
              {d}
            </button>
          ))}
        </div>

        {/* Cartes alumnis — style image 3 (white shadowed cards) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {list.map((a) => (
            <article
              key={a.id}
              data-testid={`alumni-card-${a.id}`}
              className="bg-white rounded-sm p-5 sm:p-6 shadow-[0_8px_24px_-12px_rgba(88,5,5,0.18)] hover:shadow-[0_14px_36px_-12px_rgba(88,5,5,0.28)] transition-shadow duration-300 flex flex-col"
            >
              <div className="w-14 h-14 rounded-full bg-[#F4F0F0] grid place-items-center mb-5">
                <Plane className="text-[#580505]" size={22} strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-lg text-[#2F0808] leading-snug">{a.name}</h3>
              <div className="mt-3 mb-4 h-px bg-[#580505]/15 w-full" />
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2 text-[#580505]">
                  <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                  <span className="font-medium">{a.destination}</span>
                </div>
                <div className="flex items-start gap-2 text-[#4A4A4A]">
                  <GraduationCap size={14} className="mt-0.5 flex-shrink-0 text-[#580505]" />
                  <span>{a.path}</span>
                </div>
                <div className="text-xs text-[#4A4A4A] mt-1">
                  Programme : <span className="text-[#2F0808] font-medium">{a.program}</span>
                </div>
                <div className="text-xs text-[#4A4A4A]">Arrivée : {a.arrived}</div>
              </div>
              <div className="mt-4 pt-4 border-t border-[#580505]/10 flex-grow">
                <Quote size={14} className="text-[#580505]/40 mb-1" />
                <p className="text-xs text-[#4A4A4A] font-light italic leading-relaxed">"{a.quote}"</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center max-w-2xl mx-auto">
          <p className="text-[#4A4A4A] font-light">
            Vous êtes un.e ancien.ne apprenant.e parti.e en Europe ?{" "}
            <a href="mailto:contact@multiplikator-world.com?subject=MPK%20World%20Alumnis%20%E2%80%94%20Mon%20parcours" className="text-[#580505] border-b border-[#580505]">
              Partagez votre parcours avec nous
            </a>{" "}
            — nous l'ajouterons à cette page.
          </p>
        </div>
      </section>
    </>
  );
}
