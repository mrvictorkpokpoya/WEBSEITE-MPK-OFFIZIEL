import React from "react";
import { Link } from "react-router-dom";
import { TrendingUp, Target, Briefcase, Handshake, Mail, Phone, ArrowRight, Building2, Users, GraduationCap } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { PageHero, Eyebrow } from "@/components/Common";
import { CONTACT_INFO } from "@/lib/data";

const PROJECTS = [
  {
    Icon: Building2,
    title: "Nouveaux campus régionaux",
    budget: "85 M FCFA",
    desc: "Implantation de 3 campus supplémentaires (Bohicon, Abomey-Calavi, Natitingou) pour rapprocher la formation linguistique de la jeunesse de l'intérieur du pays.",
    impact: "1 500 nouveaux apprenants/an dès la 2e année",
  },
  {
    Icon: GraduationCap,
    title: "Académie résidentielle MPK",
    budget: "210 M FCFA",
    desc: "Construction d'un campus résidentiel premium à Godomey avec hébergement, restauration et programme immersif intensif — formule unique en Afrique de l'Ouest.",
    impact: "200 apprenants en immersion totale par cohorte",
  },
  {
    Icon: Users,
    title: "Plateforme e-learning MPK Online",
    budget: "45 M FCFA",
    desc: "Développement d'une plateforme d'apprentissage propriétaire avec contenus vidéo HD, exercices interactifs, et IA conversationnelle pour la pratique orale.",
    impact: "Diaspora béninoise + 15 pays africains ciblés",
  },
  {
    Icon: Target,
    title: "MPK Tourism — Académie de guides",
    budget: "32 M FCFA",
    desc: "Centre de formation dédié aux guides touristiques multilingues, en partenariat avec les autorités béninoises du tourisme.",
    impact: "120 guides certifiés par promotion annuelle",
  },
];

const ADVANTAGES = [
  { title: "Croissance vérifiée", desc: "+340% d'apprenants entre 2022 et 2026, taux de réussite Goethe > 90%, présence multi-campus stabilisée." },
  { title: "Marché en expansion", desc: "La mobilité Bénin → Allemagne explose : besoins en formateurs, traducteurs, accompagnateurs visa. MPK est positionné comme acteur de référence." },
  { title: "Modèle multi-revenus", desc: "Formations, traductions, consulting visa, boutique en ligne, tourisme, location d'espaces — diversification mature." },
  { title: "Équipe expérimentée", desc: "Direction exécutive et académique aguerries, équipe technique digitale en place, anciens collègues en Allemagne comme ambassadeurs naturels." },
];

export default function Investment() {
  return (
    <>
      <PageHero
        eyebrow="Appel à investissement"
        title="Investir dans la suite de l'aventure MULTIPLIKATOR."
        kicker="Vous croyez à l'éducation linguistique premium en Afrique de l'Ouest ? Rejoignez-nous comme investisseur, partenaire institutionnel ou mécène pour accélérer notre déploiement régional."
      />

      {/* Pitch chiffré */}
      <section className="bg-[#2F0808] text-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-12 lg:py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4 text-center">
            <div>
              <div className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[#C4D2ED]/80 mb-2">Levée recherchée</div>
              <div className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white">370 M</div>
              <div className="text-xs sm:text-sm text-white/70 mt-2">FCFA · Phase 2026-2028</div>
            </div>
            <div>
              <div className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[#C4D2ED]/80 mb-2">Croissance</div>
              <div className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white">+340%</div>
              <div className="text-xs sm:text-sm text-white/70 mt-2">d'apprenants 2022 → 2026</div>
            </div>
            <div>
              <div className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[#C4D2ED]/80 mb-2">Réussite</div>
              <div className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white">90%+</div>
              <div className="text-xs sm:text-sm text-white/70 mt-2">Goethe-Zertifikat A1 → B2</div>
            </div>
            <div>
              <div className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[#C4D2ED]/80 mb-2">ROI projeté</div>
              <div className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white">4-6 ans</div>
              <div className="text-xs sm:text-sm text-white/70 mt-2">selon le projet financé</div>
            </div>
          </div>
        </div>
      </section>

      {/* Projets */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-12 lg:py-20">
        <Eyebrow>Projets ouverts au financement</Eyebrow>
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl mt-3 text-[#2F0808] uppercase tracking-tight">4 chantiers stratégiques 2026 — 2028</h2>
        <p className="mt-3 sm:mt-4 text-[#4A4A4A] max-w-3xl font-light leading-relaxed">Chaque projet est documenté (business plan, projections financières, impact social) et ouvert à différentes formes de participation : equity, prêt convertible, partenariat institutionnel, mécénat d'entreprise.</p>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 mt-8 lg:mt-10">
          {PROJECTS.map((p) => (
            <div key={p.title} className="mpk-card p-5 sm:p-6 lg:p-7">
              <div className="flex items-start justify-between gap-3">
                <p.Icon className="text-[#580505] flex-shrink-0" size={28} strokeWidth={1.5} />
                <div className="text-right">
                  <div className="text-[10px] tracking-[0.18em] uppercase text-[#580505]/70 font-medium">Budget</div>
                  <div className="font-serif text-xl sm:text-2xl text-[#580505] mt-0.5">{p.budget}</div>
                </div>
              </div>
              <h3 className="font-serif text-lg sm:text-xl text-[#2F0808] mt-4 sm:mt-5 leading-snug">{p.title}</h3>
              <p className="mt-2 sm:mt-3 text-sm text-[#4A4A4A] font-light leading-relaxed">{p.desc}</p>
              <div className="mt-4 sm:mt-5 pt-4 border-t border-[#580505]/10">
                <div className="text-[10px] tracking-[0.18em] uppercase text-[#580505]/70 font-medium">Impact projeté</div>
                <div className="text-sm text-[#2F0808] mt-1">{p.impact}</div>
              </div>
            </div>
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
              <div key={a.title} className="bg-white p-5 sm:p-6 border border-[#580505]/10">
                <div className="font-serif text-3xl text-[#580505]">0{i + 1}</div>
                <h3 className="font-serif text-base sm:text-lg text-[#2F0808] mt-3">{a.title}</h3>
                <p className="mt-2 text-sm text-[#4A4A4A] font-light leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formes de partenariat */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-12 lg:py-20">
        <Eyebrow>Formes de partenariat</Eyebrow>
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl mt-3 text-[#2F0808] uppercase tracking-tight">Choisissez votre engagement.</h2>
        <div className="grid sm:grid-cols-3 gap-4 sm:gap-5 mt-8 lg:mt-10">
          {[
            { Icon: TrendingUp, title: "Investisseur Equity", desc: "Prise de participation au capital avec ROI projeté et droit de regard sur la gouvernance." },
            { Icon: Briefcase, title: "Prêt convertible", desc: "Financement remboursable à 24-48 mois, convertible en parts sociales selon les performances." },
            { Icon: Handshake, title: "Mécène / Partenaire", desc: "Soutien philanthropique, sponsoring de promotions ou parrainage de campus avec visibilité dédiée." },
          ].map((f) => (
            <div key={f.title} className="mpk-card p-5 sm:p-6 lg:p-7 text-center">
              <f.Icon className="text-[#580505] mx-auto" size={32} strokeWidth={1.5} />
              <h3 className="font-serif text-lg sm:text-xl text-[#2F0808] mt-4">{f.title}</h3>
              <p className="mt-3 text-sm text-[#4A4A4A] font-light leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact investisseur */}
      <section className="bg-[#2F0808] text-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-12 lg:py-20 text-center">
          <Eyebrow><span className="text-[#C4D2ED]">Démarrer la discussion</span></Eyebrow>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-5xl mt-3 uppercase tracking-tight">Recevez le dossier d'investissement complet.</h2>
          <p className="mt-4 sm:mt-6 max-w-2xl mx-auto text-white/80 font-light text-sm sm:text-base lg:text-lg">Sur simple demande, nous vous envoyons le business plan détaillé, les projections financières, le pitch deck investisseur et planifions un échange confidentiel avec la Direction Exécutive.</p>

          <div className="mt-8 lg:mt-10 flex flex-wrap justify-center gap-3 sm:gap-4">
            <Link to="/contact" className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 bg-[#C4D2ED] text-[#580505] border-[1.5px] border-[#C4D2ED] font-semibold tracking-wide hover:bg-white transition text-sm sm:text-base">
              <Mail size={16} /> Demander le dossier
            </Link>
            <a href={`mailto:${CONTACT_INFO.email}?subject=Demande d'information investisseur — MULTIPLIKATOR`} className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 bg-transparent text-white border-[1.5px] border-white font-semibold tracking-wide hover:bg-white/10 transition text-sm sm:text-base">
              <Mail size={16} /> Email direct
            </a>
            <a href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=Bonjour,%20je%20souhaite%20discuter%20d'un%20investissement%20MULTIPLIKATOR`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 bg-transparent text-white border-[1.5px] border-white font-semibold tracking-wide hover:bg-white/10 transition text-sm sm:text-base">
              <FaWhatsapp size={16} /> WhatsApp
            </a>
          </div>

          <div className="mt-8 sm:mt-10 text-xs sm:text-sm text-white/60 flex flex-wrap justify-center gap-x-6 gap-y-2">
            <span className="inline-flex items-center gap-2"><Phone size={12} /> {CONTACT_INFO.phones[0]}</span>
            <span className="inline-flex items-center gap-2"><Mail size={12} /> {CONTACT_INFO.email}</span>
          </div>
        </div>
      </section>
    </>
  );
}
