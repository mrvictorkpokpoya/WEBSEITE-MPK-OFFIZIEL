import React from "react";
import { Link } from "react-router-dom";
import { Newspaper, Calendar, ArrowRight, Tag } from "lucide-react";
import { PageHero, Eyebrow } from "@/components/Common";

// Articles à venir — la rédaction publiera les vrais contenus prochainement
const POSTS = [
  {
    id: "blog-01",
    category: "Mobilité",
    title: "Étudier en Allemagne : les étapes-clés du visa étudiant 2026",
    excerpt: "Guide pratique pour préparer sereinement votre dossier de visa étudiant : pièces à fournir, délais réalistes, erreurs à éviter et astuces de nos consultants visa.",
    date: "À venir",
    readMin: 8,
  },
  {
    id: "blog-02",
    category: "Pédagogie",
    title: "Comprendre les sous-niveaux A1.1, A1.2 — pourquoi cette structure ?",
    excerpt: "MULTIPLIKATOR a choisi de découper les niveaux CECRL en sous-niveaux. Voici les raisons pédagogiques derrière ce choix et l'avantage pour l'apprenant.",
    date: "À venir",
    readMin: 5,
  },
  {
    id: "blog-03",
    category: "Examens",
    title: "Goethe vs ÖSD : quelle certification choisir pour votre projet ?",
    excerpt: "Deux organismes, deux philosophies. Notre comparatif détaillé pour vous aider à choisir l'examen qui correspond à votre destination et votre profil.",
    date: "À venir",
    readMin: 7,
  },
  {
    id: "blog-04",
    category: "Témoignages",
    title: "Du Bénin à Munich : 6 mois après son arrivée, Yves K. raconte.",
    excerpt: "Notre ancien apprenant Yves K. partage son quotidien en Bavière, ses défis culturels et son adaptation au monde germanophone.",
    date: "À venir",
    readMin: 10,
  },
  {
    id: "blog-05",
    category: "Conseils",
    title: "10 erreurs à éviter dans votre lettre de motivation pour l'Allemagne",
    excerpt: "Les universités allemandes ont leurs propres codes. Voici les erreurs récurrentes que nos consultants identifient dans 80% des dossiers.",
    date: "À venir",
    readMin: 6,
  },
  {
    id: "blog-06",
    category: "Tourisme",
    title: "Ganvié et Grand Popo : aperçu du programme MPK Tourism Discovery",
    excerpt: "Découvrez les coulisses des sorties pilotes du département MPK Tourism — destinations emblématiques du patrimoine béninois.",
    date: "À venir",
    readMin: 5,
  },
];

const CATEGORIES = ["Tous", "Mobilité", "Pédagogie", "Examens", "Témoignages", "Conseils", "Tourisme"];

export default function Blog() {
  return (
    <>
      <PageHero
        eyebrow="Blog & Infos"
        title="Conseils, analyses et actualités MULTIPLIKATOR."
        kicker="Notre rédaction décrypte la mobilité internationale, les examens linguistiques et les coulisses de la pédagogie MPK — pour vous aider à mieux préparer votre projet."
      />

      <section className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-10 lg:py-14">
        {/* Catégories */}
        <div className="flex flex-wrap gap-2 mb-8 lg:mb-10">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              data-testid={`blog-cat-${c}`}
              className={`px-4 py-2 text-sm border ${c === "Tous" ? "bg-[#580505] text-[#C4D2ED] border-[#580505]" : "border-[#580505]/30 text-[#580505] hover:bg-[#FAFAFA]"}`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Articles */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {POSTS.map((p) => (
            <article
              key={p.id}
              data-testid={`blog-card-${p.id}`}
              className="bg-white rounded-sm p-5 sm:p-6 shadow-[0_8px_24px_-12px_rgba(88,5,5,0.18)] hover:shadow-[0_14px_36px_-12px_rgba(88,5,5,0.28)] transition-shadow duration-300 flex flex-col h-full"
            >
              <div className="w-12 h-12 rounded-full bg-[#F4F0F0] grid place-items-center mb-4">
                <Newspaper className="text-[#580505]" size={18} strokeWidth={1.5} />
              </div>
              <div className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.18em] uppercase text-[#580505] font-semibold">
                <Tag size={10} /> {p.category}
              </div>
              <h3 className="font-serif text-lg text-[#2F0808] mt-2 leading-snug">{p.title}</h3>
              <div className="mt-3 mb-3 h-px bg-[#580505]/15 w-full" />
              <p className="text-sm text-[#4A4A4A] font-light leading-relaxed flex-grow">{p.excerpt}</p>
              <div className="mt-4 flex items-center justify-between text-[10px] uppercase tracking-wider">
                <span className="inline-flex items-center gap-1 text-[#580505]/60"><Calendar size={11} /> {p.date}</span>
                <span className="text-[#4A4A4A]/70">{p.readMin} min de lecture</span>
              </div>
              <div className="mt-4 inline-flex items-center gap-1.5 text-sm text-[#580505] border-b border-[#580505] self-start opacity-60 cursor-not-allowed">
                Bientôt en ligne <ArrowRight size={13} />
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center max-w-2xl mx-auto">
          <p className="text-sm sm:text-base text-[#4A4A4A] font-light">
            Vous souhaitez proposer un sujet, partager une expérience ou collaborer avec notre rédaction ?{" "}
            <Link to="/contact" className="text-[#580505] border-b border-[#580505]">Écrivez-nous</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
