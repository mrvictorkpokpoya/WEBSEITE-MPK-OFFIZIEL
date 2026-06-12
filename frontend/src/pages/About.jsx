import React from "react";
import { PageHero, Stat, Eyebrow, CTA } from "@/components/Common";

export default function About() {
  return (
    <>
      <PageHero eyebrow="L'Institut" title="Une institution pensée pour la mobilité internationale." kicker="Depuis 2021, MULTIPLIKATOR construit un réseau pédagogique structuré, centré sur la qualité des formations et l'accompagnement complet de chaque candidat.e." />
      <section className="max-w-[1400px] mx-auto px-5 lg:px-10 py-20 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5"><Eyebrow>Notre histoire</Eyebrow><h2 className="font-serif text-3xl text-[#2F0808] mt-3">De 2021 à aujourd'hui — un réseau qui se déploie.</h2></div>
        <div className="lg:col-span-7 space-y-4 text-[#4A4A4A] font-light leading-relaxed">
          <p>MULTIPLIKATOR est né d'une conviction : la maîtrise d'une langue étrangère ouvre des perspectives universitaires, professionnelles et humaines déterminantes. Pour porter cette ambition à grande échelle, nous avons fait le choix d'un modèle multi-campus, déployé étape par étape sur le territoire béninois.</p>
          <p>Quatre années après notre création, ce sont 6 campus actifs et plus de 850 candidat.e.s formé.e.s qui composent notre communauté.</p>
        </div>
      </section>
      <section className="bg-[#FAFAFA] border-y border-[#580505]/10"><div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16 grid sm:grid-cols-3 gap-10">
        <div><h3 className="font-serif text-2xl text-[#580505]">Mission</h3><p className="mt-3 text-[#4A4A4A] font-light leading-relaxed">Former des locuteurs et locutrices solides, capables de réussir leur projet d'études, de travail ou d'installation à l'international.</p></div>
        <div><h3 className="font-serif text-2xl text-[#580505]">Vision</h3><p className="mt-3 text-[#4A4A4A] font-light leading-relaxed">Devenir le réseau d'instituts de langues de référence en Afrique de l'Ouest, conjuguant exigence académique et accessibilité.</p></div>
        <div><h3 className="font-serif text-2xl text-[#580505]">Valeurs</h3><p className="mt-3 text-[#4A4A4A] font-light leading-relaxed">Rigueur, accompagnement humain, transparence tarifaire, respect des objectifs individuels.</p></div>
      </div></section>
      <section className="max-w-[1400px] mx-auto px-5 lg:px-10 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"><Stat value="6" label="Campus"/><Stat value="850+" label="Candidat.e.s"/><Stat value="4" label="Années"/><Stat value="98%" label="Réussite Goethe B1"/></div>
        <Eyebrow>Approche pédagogique</Eyebrow>
        <h2 className="font-serif text-3xl text-[#2F0808] mt-3 max-w-3xl">Une progression structurée par niveaux et sous-niveaux, adossée à l'évaluation continue.</h2>
        <p className="mt-5 max-w-3xl text-[#4A4A4A] font-light leading-relaxed">Le découpage en sous-niveaux (A1.1, A1.2, …) permet d'offrir un point d'entrée accessible, tout en gardant la cohérence d'un parcours complet. Petits effectifs, formateurs dédiés, évaluation régulière : la pédagogie est calibrée pour mener à la certification.</p>
        <div className="mt-10"><CTA to="/contact" label="Échanger avec un conseiller" testid="about-cta-contact"/></div>
      </section>
    </>
  );
}
