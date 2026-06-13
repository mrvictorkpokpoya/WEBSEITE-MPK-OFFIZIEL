import React from "react";
import { Link } from "react-router-dom";
import { TrendingUp, Briefcase, Handshake, Mail, Building2, Users, GraduationCap, Target } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { PageHero, Eyebrow, CleanCard } from "@/components/Common";
import { CONTACT_INFO } from "@/lib/data";

const PROJECTS = [
  {
    Icon: Building2,
    title: "Nouveaux campus régionaux",
    desc: "Implantation de campus supplémentaires pour rapprocher la formation linguistique de la jeunesse de l'intérieur du pays.",
  },
  {
    Icon: GraduationCap,
    title: "Académie résidentielle MPK",
    desc: "Construction d'un campus résidentiel premium avec hébergement, restauration et programme immersif intensif — formule unique en Afrique de l'Ouest.",
  },
  {
    Icon: Users,
    title: "Plateforme e-learning MPK Online",
    desc: "Développement d'une plateforme d'apprentissage propriétaire avec contenus vidéo HD, exercices interactifs et accompagnement à distance pour la diaspora.",
  },
  {
    Icon: Target,
    title: "MPK Tourism — Académie de guides",
    desc: "Centre de formation dédié aux guides touristiques multilingues, en partenariat avec les autorités béninoises du tourisme.",
  },
];

const ADVANTAGES = [
  { title: "Croissance vérifiée", desc: "Forte progression continue depuis 2022, taux de réussite Goethe supérieur à 90%, présence multi-campus stabilisée." },
  { title: "Marché en expansion", desc: "La mobilité Bénin → Allemagne progresse rapidement : besoins croissants en formateurs, traducteurs et accompagnateurs visa." },
  { title: "Modèle multi-revenus", desc: "Formations, traductions, consulting visa, boutique en ligne, tourisme, location d'espaces — diversification mature et résiliente." },
  { title: "Équipe expérimentée", desc: "Direction exécutive et académique aguerries, équipe technique digitale en place, réseau d'anciens étendu en Allemagne." },
];

const PARTNERSHIPS = [
  { Icon: TrendingUp, title: "Investisseur Equity", desc: "Prise de participation au capital avec droit de regard sur la gouvernance et accompagnement stratégique." },
  { Icon: Briefcase, title: "Prêt convertible", desc: "Financement remboursable, convertible en parts sociales selon les performances et les objectifs convenus." },
  { Icon: Handshake, title: "Mécène & Partenaire", desc: "Soutien philanthropique, sponsoring de promotions ou parrainage de campus avec visibilité dédiée." },
];

export default function Investment() {
  return (
    <>
      <PageHero
        eyebrow="Appel à investissement"
        title="Investir dans la suite de l'aventure MULTIPLIKATOR."
        kicker="Vous croyez à l'éducation linguistique premium en Afrique de l'Ouest ? Rejoignez-nous comme investisseur, partenaire institutionnel ou mécène pour accélérer notre déploiement régional."
      />

      {/* Projets — en cours de conception */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-12 lg:py-20">
        <Eyebrow>Projets en cours de conception</Eyebrow>
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl mt-3 text-[#2F0808] uppercase tracking-tight">Nos chantiers stratégiques.</h2>
        <p className="mt-3 sm:mt-4 text-[#4A4A4A] max-w-3xl font-light leading-relaxed">
          Nous travaillons actuellement à la finalisation des plans détaillés de plusieurs projets structurants. Les modalités d'investissement, montants et formes de partenariat seront discutés au cas par cas avec chaque partenaire potentiel.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-8 lg:mt-10">
          {PROJECTS.map((p) => (
            <CleanCard key={p.title} icon={p.Icon} title={p.title}>
              <p>{p.desc}</p>
              <div className="mt-4 inline-flex items-center gap-1.5 text-[10px] tracking-[0.18em] uppercase text-[#580505] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#580505] animate-pulse" /> En cours de conception
              </div>
            </CleanCard>
          ))}
        </div>
      </section>

      {/* Pourquoi investir */}
      <section className="bg-[#FAFAFA] border-y border-[#580505]/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-12 lg:py-20">
          <Eyebrow>Pourquoi MULTIPLIKATOR ?</Eyebrow>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl mt-3 text-[#2F0808] uppercase tracking-tight">4 raisons d'investir avec nous.</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-8 lg:mt-10">
            {ADVANTAGES.map((a, i) => (
              <CleanCard key={a.title} title={a.title}>
                <div className="font-serif text-3xl text-[#580505] mb-3 -mt-2">0{i + 1}</div>
                <p>{a.desc}</p>
              </CleanCard>
            ))}
          </div>
        </div>
      </section>

      {/* Formes de partenariat */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-12 lg:py-20">
        <Eyebrow>Formes de partenariat</Eyebrow>
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl mt-3 text-[#2F0808] uppercase tracking-tight">Choisissez votre engagement.</h2>
        <p className="mt-3 text-[#4A4A4A] max-w-2xl font-light leading-relaxed">Les modalités exactes (durée, retour, gouvernance) sont définies conjointement lors d'un échange privé avec la Direction Exécutive.</p>
        <div className="grid sm:grid-cols-3 gap-4 sm:gap-5 mt-8 lg:mt-10">
          {PARTNERSHIPS.map((f) => (
            <CleanCard key={f.title} icon={f.Icon} title={f.title}>
              <p>{f.desc}</p>
            </CleanCard>
          ))}
        </div>
      </section>

      {/* Contact investisseur */}
      <section className="bg-[#2F0808] text-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-12 lg:py-20 text-center">
          <Eyebrow><span className="text-[#C4D2ED]">Démarrer la discussion</span></Eyebrow>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-5xl mt-3 uppercase tracking-tight">Contactez-nous pour discuter des modalités.</h2>
          <p className="mt-4 sm:mt-6 max-w-2xl mx-auto text-white/80 font-light text-sm sm:text-base lg:text-lg">
            Si vous souhaitez investir dans MULTIPLIKATOR, écrivez-nous pour planifier un échange confidentiel. Nous vous présenterons les projets en détail, leurs budgets et les modalités de partenariat adaptées à votre profil.
          </p>

          <div className="mt-8 lg:mt-10 flex flex-wrap justify-center gap-3 sm:gap-4">
            <Link to="/contact" className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 bg-[#C4D2ED] text-[#580505] border-[1.5px] border-[#C4D2ED] font-semibold tracking-wide hover:bg-white transition text-sm sm:text-base">
              <Mail size={16} /> Nous contacter
            </Link>
            <a href={`mailto:${CONTACT_INFO.email}?subject=Discussion%20investissement%20%E2%80%94%20MULTIPLIKATOR`} className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 bg-transparent text-white border-[1.5px] border-white font-semibold tracking-wide hover:bg-white/10 transition text-sm sm:text-base">
              <Mail size={16} /> Email direct
            </a>
            <a href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=Bonjour,%20je%20souhaite%20discuter%20d'un%20investissement%20MULTIPLIKATOR`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 bg-transparent text-white border-[1.5px] border-white font-semibold tracking-wide hover:bg-white/10 transition text-sm sm:text-base">
              <FaWhatsapp size={16} /> WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
