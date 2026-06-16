import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, GraduationCap, Award, Languages, Globe, Map, FileText, Star, MapPin } from "lucide-react";
import { CAMPUSES, DEPARTMENTS, TESTIMONIALS } from "@/lib/data";
import { SectionTitle, Eyebrow, Stat, CTA } from "@/components/Common";

const ICONS = { GraduationCap, Award, Languages, Globe, Map, FileText };

export default function Home() {
  const { t } = useTranslation();
  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#2F0808] overflow-hidden">
        <div className="absolute inset-0 opacity-60">
          <img src="https://customer-assets.emergentagent.com/job_langues-benin/artifacts/au40q6vj_WhatsApp%20Image%202026-06-13%20at%2001.24.36.jpeg" alt="L'équipe MULTIPLIKATOR célèbre la réussite" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0" style={{background: "linear-gradient(180deg, rgba(47,8,8,0.65) 0%, rgba(88,5,5,0.55) 100%)"}} />
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-16 sm:py-20 lg:py-36 text-white">
          <div className="max-w-4xl fade-up">
            <Eyebrow><span className="text-white/70">{t("hero.eyebrow")}</span></Eyebrow>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-7xl mt-3 sm:mt-4 leading-[1.05] font-medium">
              {t("hero.title_line1")}<br/>
              <span className="text-white/85">{t("hero.title_line2")}</span>
            </h1>
            <p className="mt-5 sm:mt-8 text-base sm:text-lg lg:text-xl text-white/85 max-w-2xl font-light leading-relaxed">
              {t("hero.subtitle")}
            </p>
            <div className="mt-6 sm:mt-10 flex flex-wrap gap-3 sm:gap-4">
              <Link to="/departements/training-plus" data-testid="hero-cta-formations" className="inline-flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-3.5 bg-[#580505] text-[#C4D2ED] border-[1.5px] border-[#580505] text-sm sm:text-base font-semibold tracking-wide hover:bg-[#2F0808] transition shadow-lg">{t("hero.cta_formations")} <ArrowRight size={16} /></Link>
              <Link to="/contact" data-testid="hero-cta-contact" className="inline-flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-3.5 bg-transparent text-[#C4D2ED] border-[1.5px] border-[#C4D2ED] text-sm sm:text-base font-semibold tracking-wide hover:bg-[#C4D2ED]/10 transition">{t("hero.cta_contact")} <ArrowRight size={16} /></Link>
            </div>
          </div>
        </div>
        {/* Stats overlap */}
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 -mb-16 sm:-mb-20">
          <div className="bg-white border border-[#580505]/10 grid grid-cols-2 md:grid-cols-4 gap-y-6 sm:gap-y-8 gap-x-3 sm:gap-x-4 p-5 sm:p-8 lg:p-12 shadow-[0_30px_60px_-30px_rgba(88,5,5,0.4)]">
            <Stat note={t("stats.implantations")} value="6" label={t("stats.implantations_label")} />
            <Stat note={t("stats.community")} value="850+" label={t("stats.community_label")} />
            <Stat note={t("stats.since")} value="2021" label={t("stats.since_label")} />
            <Stat note={t("stats.coverage")} value="100%" label={t("stats.coverage_label")} />
          </div>
        </div>
      </section>

      <div className="h-20 sm:h-32" />

      {/* About */}
      <section className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <Eyebrow>Qui sommes-nous</Eyebrow>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl mt-3 text-[#2F0808] leading-tight uppercase tracking-tight">Un réseau institutionnel pensé pour la réussite linguistique.</h2>
        </div>
        <div className="lg:col-span-7 space-y-5 text-[#4A4A4A] leading-relaxed font-light">
          <p>Fondé en 2021, MULTIPLIKATOR est devenu en quelques années un réseau d'instituts de langues de référence au Bénin. Six campus actifs, un programme pédagogique structuré et une équipe de formateurs spécialisés accompagnent nos candidat.e.s vers les certifications internationales et la mobilité.</p>
          <p>Notre approche combine rigueur académique, suivi personnalisé et flexibilité — chaque parcours est conçu pour mener à un résultat concret : intégrer une université, obtenir un visa, réussir un examen officiel ou se professionnaliser à l'international.</p>
          <Link to="/a-propos" className="inline-flex items-center gap-2 text-[#580505] mt-4 border-b border-[#580505] pb-0.5">En savoir plus sur l'institut <ArrowRight size={14} /></Link>
        </div>
      </section>

      {/* Strengths */}
      <section className="bg-[#FAFAFA] border-y border-[#580505]/10">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-20">
          <SectionTitle eyebrow="Nos points forts" title="Une exigence académique au service de votre mobilité." caps />
          <div className="grid lg:grid-cols-12 gap-6">
            {[
              { t: "Encadrement personnalisé", d: "Suivi pédagogique individuel sur tout le parcours. Petits effectifs, attention soutenue.", span: "lg:col-span-7" },
              { t: "6 campus actifs", d: "GODOMEY PK 14, AKPAKPA, PORTO-NOVO, LOKOSSA, DJOUGOU, PARAKOU — proximité géographique réelle.", span: "lg:col-span-5" },
              { t: "Certifications officielles", d: "Goethe, ÖSD, TestDaF, IELTS, TOEFL, DELF/DALF.", span: "lg:col-span-5" },
              { t: "Présentiel & 100% en ligne", d: "Une qualité identique, peu importe où vous êtes — diaspora incluse.", span: "lg:col-span-7" },
              { t: "Mobilité internationale", d: "Études, FSJ/BFD, Au Pair, regroupement familial, visa touriste.", span: "lg:col-span-6" },
              { t: "Tarification claire", d: "Niveaux complets, sous-niveaux accessibles, bundles avantageux.", span: "lg:col-span-6" },
            ].map((s, i) => (
              <div key={i} className={`mpk-card p-8 ${s.span}`}>
                <div className="text-3xl font-serif text-[#580505]">0{i+1}</div>
                <h3 className="font-serif text-2xl mt-4 text-[#2F0808]">{s.t}</h3>
                <p className="mt-3 text-[#4A4A4A] leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="max-w-[1400px] mx-auto px-5 lg:px-10 py-20">
        <SectionTitle eyebrow="Nos départements" title="Six pôles d'expertise pour répondre à chaque projet." caps />
        <div className="grid lg:grid-cols-12 gap-5">
          {DEPARTMENTS.map((d, i) => {
            const Icon = ICONS[d.icon];
            const span = i === 0 ? "lg:col-span-6 lg:row-span-2" : i === 3 ? "lg:col-span-6" : "lg:col-span-3";
            return (
              <Link key={d.id} to={d.slug} data-testid={`dept-card-${d.id}`} className={`mpk-card p-7 ${span} group block`}>
                <Icon className="text-[#580505]" size={28} strokeWidth={1.5} />
                <Eyebrow><span className="mt-4 block">{d.tagline}</span></Eyebrow>
                <h3 className="font-serif text-2xl text-[#2F0808] mt-1">{d.title}</h3>
                <p className="mt-3 text-[#4A4A4A] text-sm leading-relaxed">{d.desc}</p>
                <span className="inline-flex items-center gap-1 mt-5 text-sm text-[#580505] border-b border-[#580505] pb-0.5">Découvrir <ArrowRight size={14} /></span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Online courses banner */}
      <section className="bg-[#450000] text-white">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16 grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <Eyebrow><span className="text-white/60">Cours en ligne</span></Eyebrow>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl mt-3 leading-tight uppercase tracking-tight">Suivre MULTIPLIKATOR depuis n'importe où dans le monde.</h2>
            <p className="mt-5 text-white/80 font-light leading-relaxed max-w-2xl">Même encadrement qu'en présentiel, créneaux flexibles adaptables au fuseau horaire, conçu pour la diaspora et les villes sans campus MPK.</p>
          </div>
          <div className="lg:col-span-5 flex lg:justify-end">
            <Link to="/cours-en-ligne" data-testid="home-online-cta" className="btn-primary bg-white text-[#580505] hover:bg-white/90">Découvrir les cours en ligne <ArrowRight size={16}/></Link>
          </div>
        </div>
      </section>

      {/* Testimonials preview */}
      <section className="max-w-[1400px] mx-auto px-5 lg:px-10 py-20">
        <SectionTitle eyebrow="Ils ont fait confiance à MULTIPLIKATOR" title="Témoignages." caps />
        <div className="grid md:grid-cols-3 gap-5">
          {TESTIMONIALS.slice(0,3).map((t, i) => (
            <div key={i} className="mpk-card p-7">
              <div className="flex items-center gap-1 text-[#580505]">{Array.from({length: t.rating}).map((_,k) => <Star key={k} size={14} fill="#580505" stroke="#580505"/>)}</div>
              <p className="mt-4 text-[#2F0808] font-serif text-lg leading-snug">"{t.text}"</p>
              <div className="mt-5 text-sm text-[#550000]"><strong>{t.name}</strong> — {t.program}</div>
              <div className="text-xs text-[#4A4A4A] mt-1">{t.campus}</div>
            </div>
          ))}
        </div>
        <div className="mt-10"><Link to="/temoignages" className="inline-flex items-center gap-2 text-[#580505] border-b border-[#580505] pb-0.5">Voir tous les témoignages <ArrowRight size={14}/></Link></div>
      </section>

      {/* Campuses */}
      <section className="bg-[#FAFAFA] border-y border-[#580505]/10">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-20">
          <SectionTitle eyebrow="Nos campus" title="6 implantations au Bénin." caps />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CAMPUSES.map((c) => (
              <Link key={c.id} to="/campus" className="mpk-card overflow-hidden group">
                <div className="aspect-[4/3] overflow-hidden bg-[#2F0808]"><img src={c.img} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" /></div>
                <div className="p-6">
                  <Eyebrow>{c.city}</Eyebrow>
                  <h3 className="font-serif text-xl mt-2 text-[#2F0808]">{c.name}</h3>
                  <div className="mt-3 text-sm text-[#4A4A4A] flex items-center gap-1.5"><MapPin size={14} /> {c.area}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-[1400px] mx-auto px-5 lg:px-10 py-24 text-center">
        <Eyebrow>Rejoignez le réseau</Eyebrow>
        <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#2F0808] mt-4 leading-[1.05] uppercase tracking-tight">Votre prochain niveau commence ici.</h2>
        <p className="mt-6 max-w-2xl mx-auto text-[#4A4A4A] font-light text-lg">Inscrivez-vous sur le campus de votre choix ou en ligne. Notre équipe vous accompagne dans la définition du parcours adapté.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <CTA to="/contact" label="S'inscrire" testid="final-cta-register" />
          <CTA to="/boutique" label="Voir les bundles & cartes cadeaux" variant="ghost" testid="final-cta-shop" />
        </div>
      </section>
    </>
  );
}
