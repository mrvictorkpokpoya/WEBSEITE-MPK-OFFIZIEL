import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PageHero, Eyebrow, CTA, SectionTitle } from "@/components/Common";
import { Trophy, Users, Languages, MessageSquare } from "lucide-react";
import { FaFutbol, FaBasketballBall, FaVolleyballBall } from "react-icons/fa";

// Sport clubs
const SPORT_CLUBS = [
  {
    id: "mfc",
    abbr: "MFC",
    name: "MPK Football Club",
    Icon: FaFutbol,
    desc: "Le club de football officiel du réseau MULTIPLIKATOR. Entraînements hebdomadaires, tournois inter-campus et matchs amicaux avec d'autres institutions du Bénin.",
    accent: "#1B7A37",
  },
  {
    id: "mbc",
    abbr: "MBC",
    name: "MPK Basketball Club",
    Icon: FaBasketballBall,
    desc: "Pratique régulière du basketball pour apprenant.e.s et alumni. Esprit d'équipe, dépassement de soi et participation aux championnats locaux.",
    accent: "#D96A00",
  },
  {
    id: "mvc",
    abbr: "MVC",
    name: "MPK Volleyball Club",
    Icon: FaVolleyballBall,
    desc: "Volleyball mixte et compétition, ouvert à tous les niveaux. Sorties festives, tournois et célébration de la cohésion communautaire MPK.",
    accent: "#1564B5",
  },
];

// Language clubs
const LANGUAGE_CLUBS = [
  {
    id: "mec",
    abbr: "MEC",
    name: "MPK English Club",
    Icon: MessageSquare,
    desc: "Conversation immersive en anglais — discussions thématiques, débats, ateliers culturels et soirées cinéma en VO. Animé par des natifs et des formateurs certifiés.",
    accent: "#580505",
  },
  {
    id: "mdk",
    abbr: "MDK",
    name: "MPK Deutschklub",
    Icon: Languages,
    desc: "Le club allemand : Stammtisch, ateliers d'écriture créative, échanges culturels avec la communauté germanophone du Bénin et nos alumni en Allemagne.",
    accent: "#2F0808",
  },
];

function ClubCard({ club }) {
  const { Icon, accent } = club;
  return (
    <article
      data-testid={`club-card-${club.id}`}
      className="bg-white rounded-sm p-6 sm:p-7 border-[1.5px] shadow-[0_14px_30px_-12px_rgba(88,5,5,0.30)] hover:shadow-[0_22px_44px_-12px_rgba(88,5,5,0.42)] transition-all duration-300 flex flex-col h-full"
      style={{ borderColor: `${accent}55` }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="w-14 h-14 rounded-full grid place-items-center" style={{ background: `${accent}1A` }}>
          <Icon size={26} style={{ color: accent }} />
        </div>
        <div className="inline-flex items-center justify-center px-2.5 py-1 text-[11px] tracking-[0.18em] font-bold uppercase border" style={{ color: accent, borderColor: `${accent}55` }}>
          {club.abbr}
        </div>
      </div>
      <h3 className="font-serif text-xl text-[#2F0808] mt-5 leading-snug">{club.name}</h3>
      <div className="mt-3 mb-3 h-px" style={{ background: `${accent}22` }} />
      <p className="text-sm text-[#4A4A4A] font-light leading-relaxed flex-grow">{club.desc}</p>
      <Link
        to="/contact"
        data-testid={`club-join-${club.id}`}
        className="mt-6 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-white border-[1.5px] text-sm font-semibold transition"
        style={{ background: accent, borderColor: accent }}
      >
        Rejoindre le club
      </Link>
    </article>
  );
}

export default function MpkClubs() {
  const { t } = useTranslation();
  return (
    <>
      <PageHero
        eyebrow="MPK Community"
        title="Clubs sportifs & linguistiques."
        kicker="Au-delà des cours, MULTIPLIKATOR cultive une vraie vie communautaire : sport, échanges culturels et pratique linguistique en immersion. Cinq clubs ouverts à tous les apprenants et alumni."
      />

      {/* Sport Clubs */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-12 lg:py-16">
        <div className="flex items-center gap-3 mb-3">
          <Trophy className="text-[#580505]" size={28} strokeWidth={1.5} />
          <Eyebrow>01 · Sport</Eyebrow>
        </div>
        <h2 className="font-serif text-3xl lg:text-4xl text-[#2F0808] uppercase tracking-tight">MPK Sport Clubs</h2>
        <p className="mt-3 text-[#4A4A4A] max-w-3xl font-light leading-relaxed">
          La pratique sportive régulière fait partie intégrante de l'expérience MULTIPLIKATOR. Discipline, esprit d'équipe et cohésion — nos trois clubs accueillent tous les niveaux.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {SPORT_CLUBS.map((c) => <ClubCard key={c.id} club={c} />)}
        </div>
      </section>

      {/* Language Clubs */}
      <section className="bg-[#FAFAFA] border-y border-[#580505]/15">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-12 lg:py-16">
          <div className="flex items-center gap-3 mb-3">
            <Users className="text-[#580505]" size={28} strokeWidth={1.5} />
            <Eyebrow>02 · Pratique linguistique</Eyebrow>
          </div>
          <h2 className="font-serif text-3xl lg:text-4xl text-[#2F0808] uppercase tracking-tight">MPK Language Clubs</h2>
          <p className="mt-3 text-[#4A4A4A] max-w-3xl font-light leading-relaxed">
            La langue se vit autant qu'elle s'apprend. Nos clubs de conversation immersive vous permettent de pratiquer dans un cadre détendu, après ou en dehors des cours.
          </p>
          <div className="grid sm:grid-cols-2 gap-5 mt-10">
            {LANGUAGE_CLUBS.map((c) => <ClubCard key={c.id} club={c} />)}
          </div>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-5 lg:px-10 py-20 text-center">
        <SectionTitle eyebrow="Rejoignez la communauté" title="Sport, culture et langues vivantes — tout commence ici." center caps />
        <div className="flex justify-center gap-4 flex-wrap">
          <CTA to="/contact" label="Rejoindre un club" testid="clubs-cta-join" />
          <CTA to="/reseaux-sociaux" label="Suivre nos réseaux" variant="ghost" testid="clubs-cta-social" />
        </div>
      </section>
    </>
  );
}
