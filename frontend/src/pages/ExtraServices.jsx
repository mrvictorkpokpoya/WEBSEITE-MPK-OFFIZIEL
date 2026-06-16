import React from "react";
import { FileText, Mail, MessageCircle, Briefcase, GraduationCap, Plane, Sparkles } from "lucide-react";
import { PageHero, Eyebrow, CTA, SectionTitle, CleanCard } from "@/components/Common";

const SERVICES = [
  {
    Icon: FileText,
    title: "Montage de CV",
    desc: "Rédaction et mise en page professionnelle de votre Curriculum Vitae (FR / DE / EN). Adaptation aux standards européens, américains ou africains selon votre projet.",
  },
  {
    Icon: Mail,
    title: "Montage de lettre de motivation",
    desc: "Cover letter sur-mesure, adaptée au pays, au domaine et au poste ciblé. Travail collaboratif sur le storytelling et l'argumentaire.",
  },
  {
    Icon: MessageCircle,
    title: "Coaching spontané",
    desc: "Séances ponctuelles à la demande pour préparer un entretien, une présentation, un appel téléphonique important ou un échange avec une administration étrangère.",
  },
  {
    Icon: Sparkles,
    title: "Assistance multiples",
    desc: "Petites tâches administratives, traduction express, prise de rendez-vous, accompagnement téléphonique, démarches en ligne — tout ce dont vous avez besoin au quotidien.",
  },
  {
    Icon: GraduationCap,
    title: "University Admission",
    desc: "Accompagnement complet pour les procédures d'admission universitaire : choix d'établissements, dossiers, plateformes (Uni-Assist, Campus France, etc.), suivi.",
  },
  {
    Icon: Plane,
    title: "Conseil mobilité & voyage",
    desc: "Tout besoin lié à un déplacement ou une mobilité internationale — visa, logement, ouverture de compte, assurance, premiers pas dans le pays d'arrivée.",
  },
  {
    Icon: Briefcase,
    title: "Autres services à la carte",
    desc: "Sur demande — formations express, accompagnement entrepreneurial, conseil professionnel. Nous consulter pour un besoin spécifique.",
  },
];

export default function ExtraServices() {
  return (
    <>
      <PageHero
        eyebrow="MPK Extra Services"
        title="Services complémentaires à la carte."
        kicker="Tout ce qui complète une formation ou un projet international — pris en charge par nos équipes expertes."
      />

      <section className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-12 lg:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {SERVICES.map((s) => (
            <CleanCard key={s.title} icon={s.Icon} title={s.title}>
              <p>{s.desc}</p>
            </CleanCard>
          ))}
        </div>
      </section>

      <section className="bg-[#FAFAFA] border-y border-[#580505]/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-12 lg:py-16 text-center">
          <SectionTitle title="Besoin d'un service à la carte ?" center caps />
          <div className="flex justify-center gap-3 sm:gap-4 flex-wrap">
            <CTA to="/contact" label="Demander un service" testid="extra-cta-request" />
            <CTA to="/contact" label="Devis personnalisé" variant="ghost" testid="extra-cta-quote" />
          </div>
        </div>
      </section>
    </>
  );
}
