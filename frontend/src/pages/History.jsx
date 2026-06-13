import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Award, Globe, Users, BookOpen } from "lucide-react";
import { PageHero, Eyebrow } from "@/components/Common";

const TIMELINE = [
  { year: "2021", title: "La genèse à Godomey PK 14", desc: "Fondation de MULTIPLIKATOR Institut de Langues à Godomey, dans la banlieue nord de Cotonou. Une vision : offrir un enseignement linguistique premium accessible, ancré au Bénin mais tourné vers le monde." },
  { year: "2022", title: "Premiers succès Goethe", desc: "Les premières cohortes décrochent le Goethe-Zertifikat A1, A2 et B1 avec un taux de réussite supérieur à 90%. Ouverture du second campus à Akpakpa pour répondre à la demande grandissante." },
  { year: "2023", title: "Expansion régionale", desc: "Ouverture des campus de Porto-Novo et Lokossa. MULTIPLIKATOR couvre désormais le Sud du Bénin et inaugure son département MPK Translation Pro pour répondre aux besoins administratifs des candidats à la mobilité." },
  { year: "2024", title: "Le réseau prend forme", desc: "Naissance des campus de Djougou et Parakou pour servir le Nord du pays. Lancement du programme Premium VIP Accéléré et structuration des 6 départements de service." },
  { year: "2025", title: "MPK Tourism Programm", desc: "Lancement de l'Académie de guides touristiques et du département Tourisme. Plus de 600 candidat.e.s déjà accompagné.e.s vers la mobilité internationale, principalement en Allemagne et en Autriche." },
  { year: "2026", title: "Cap sur l'international", desc: "850+ apprenants formés. Ouverture des cours 100% en ligne pour la diaspora, lancement de la boutique en ligne et de la plateforme d'inscription numérique. Vision : devenir LE référent linguistique d'Afrique de l'Ouest." },
];

const VALUES = [
  { Icon: Award, title: "Excellence académique", desc: "Méthode pédagogique structurée, formateurs spécialisés et suivi individuel pour mener chaque apprenant au succès." },
  { Icon: Users, title: "Communauté multiplicatrice", desc: "Chaque apprenant devient un ambassadeur — un multiplicateur de cultures, d'opportunités et de réussite." },
  { Icon: Globe, title: "Ouverture sur le monde", desc: "Du Bénin vers l'Allemagne, l'Autriche, la francophonie internationale — nous bâtissons des passerelles." },
  { Icon: BookOpen, title: "Transmission rigoureuse", desc: "Nos cours suivent les standards du CECRL et préparent aux certifications officielles reconnues mondialement." },
];

export default function History() {
  return (
    <>
      <PageHero
        eyebrow="Notre histoire"
        title="De Godomey vers le monde — l'aventure MULTIPLIKATOR."
        kicker="Cinq ans d'engagement linguistique, six campus actifs, des centaines de réussites — l'histoire d'un réseau béninois qui a fait le pari de l'excellence."
      />

      {/* Origine */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-12 lg:py-20 grid lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-5">
          <Eyebrow>L'origine</Eyebrow>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl mt-3 text-[#2F0808] leading-tight uppercase tracking-tight">Le mot « Multiplikator »</h2>
        </div>
        <div className="lg:col-span-7 space-y-4 text-[#4A4A4A] font-light leading-relaxed">
          <p>« Multiplikator » est un mot allemand qui signifie « multiplicateur » — celui qui transmet, qui amplifie, qui démultiplie. Ce nom traduit notre conviction profonde : <strong className="text-[#580505]">chaque apprenant que nous formons devient à son tour un transmetteur</strong>, un pont entre le Bénin et le monde germanophone, francophone, anglophone.</p>
          <p>Fondé en 2021 à Godomey PK 14, l'institut est né d'un constat simple : la jeunesse béninoise ambitieuse mérite un accès à un enseignement linguistique exigeant, structuré et certifiant — sans avoir à quitter son pays pour atteindre l'excellence.</p>
        </div>
      </section>

      {/* Chronologie */}
      <section className="bg-[#FAFAFA] border-y border-[#580505]/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-12 lg:py-20">
          <Eyebrow>Chronologie</Eyebrow>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl mt-3 text-[#2F0808] uppercase tracking-tight">Cinq années, six campus, mille histoires.</h2>

          <div className="mt-10 lg:mt-14 relative">
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-[#580505]/20" />
            {TIMELINE.map((t, i) => (
              <div key={t.year} className={`relative grid lg:grid-cols-2 gap-6 lg:gap-12 mb-10 lg:mb-16 ${i % 2 === 0 ? "" : "lg:[&>*:first-child]:order-2"}`}>
                <div className={`${i % 2 === 0 ? "lg:text-right lg:pr-12" : "lg:pl-12"}`}>
                  <div className="font-serif text-4xl sm:text-5xl text-[#580505] leading-none">{t.year}</div>
                </div>
                <div className={`${i % 2 === 0 ? "lg:pl-12" : "lg:text-right lg:pr-12"} mpk-card p-5 sm:p-6 bg-white`}>
                  <h3 className="font-serif text-lg sm:text-xl text-[#2F0808] leading-snug">{t.title}</h3>
                  <p className="mt-2 sm:mt-3 text-sm text-[#4A4A4A] font-light leading-relaxed">{t.desc}</p>
                </div>
                <div className="hidden lg:block absolute left-1/2 top-3 w-3 h-3 -ml-1.5 bg-[#580505] rounded-full ring-4 ring-[#FAFAFA]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-12 lg:py-20">
        <Eyebrow>Ce qui nous porte</Eyebrow>
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl mt-3 text-[#2F0808] uppercase tracking-tight">Nos valeurs fondatrices.</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-8 lg:mt-10">
          {VALUES.map((v) => (
            <div key={v.title} className="mpk-card p-5 sm:p-6">
              <v.Icon className="text-[#580505]" size={26} strokeWidth={1.5} />
              <h3 className="font-serif text-base sm:text-lg text-[#2F0808] mt-4">{v.title}</h3>
              <p className="mt-2 text-sm text-[#4A4A4A] font-light leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-16 lg:py-24 text-center">
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#2F0808] uppercase tracking-tight">Faites partie de la suite.</h2>
        <p className="mt-5 sm:mt-6 max-w-2xl mx-auto text-[#4A4A4A] font-light text-base sm:text-lg">L'histoire de MULTIPLIKATOR continue à s'écrire — et votre niveau pourrait être le prochain chapitre.</p>
        <div className="mt-8 lg:mt-10 flex flex-wrap justify-center gap-4">
          <Link to="/departements/training-plus" className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 bg-[#C4D2ED] text-[#580505] border-[1.5px] border-[#580505] font-semibold tracking-wide hover:bg-[#DCE5F2] transition">Découvrir nos formations <ArrowRight size={16} /></Link>
          <Link to="/appel-a-investissement" className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 bg-white text-[#580505] border-[1.5px] border-[#580505] font-semibold tracking-wide hover:bg-[#FAFAFA] transition">Soutenir notre développement <ArrowRight size={16} /></Link>
        </div>
      </section>
    </>
  );
}
