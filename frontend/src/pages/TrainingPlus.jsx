import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { PageHero, Eyebrow, CTA, SectionTitle } from "@/components/Common";
import {
  SEMI_FULL,
  VIP_SUBLEVELS,
  VIP_FULL,
  VIP_INTENSIVE,
  BUNDLES,
  LANGUAGE_COURSES,
} from "@/lib/data";
import { Star, Lock, ShoppingCart, GraduationCap, Award, Loader2 } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

async function startCheckout(packageId) {
  const origin = window.location.origin;
  try {
    const res = await axios.post(`${API}/payments/checkout/session`, {
      package_id: packageId,
      origin_url: origin,
    });
    if (res.data?.url) {
      window.location.href = res.data.url;
    } else {
      toast.error("Erreur : URL de paiement introuvable");
    }
  } catch (err) {
    const d = err.response?.data?.detail;
    toast.error(typeof d === "string" ? d : "Erreur lors de la création du paiement");
  }
}

function PricingTable({ headers, rows }) {
  return (
    <div className="scroll-x">
      <table className="mpk-table min-w-[640px]">
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ComingSoon({ title }) {
  return (
    <div className="mpk-card p-10 text-center">
      <Lock className="mx-auto text-[#580505]" size={28} />
      <h3 className="font-serif text-2xl text-[#2F0808] mt-4">{title}</h3>
      <p className="mt-3 text-[#4A4A4A] font-light max-w-xl mx-auto">
        Offre en cours de mise à jour — détails disponibles prochainement. Contactez-nous pour être informé.e dès l'ouverture.
      </p>
      <div className="mt-6">
        <Link to="/contact" className="btn-primary text-sm">Me notifier</Link>
      </div>
    </div>
  );
}

function CourseProductCard({ course }) {
  const isQuote = course.priceFcfa === "sur devis";
  const [loading, setLoading] = useState(false);

  const onBuy = async (packageId) => {
    setLoading(true);
    await startCheckout(packageId);
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-sm p-5 sm:p-6 shadow-[0_8px_24px_-12px_rgba(88,5,5,0.18)] hover:shadow-[0_14px_36px_-12px_rgba(88,5,5,0.28)] transition-shadow duration-300 flex flex-col h-full" data-testid={`course-card-${course.id}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="inline-flex items-center justify-center min-w-[56px] h-10 px-3 font-serif text-lg font-semibold bg-[#C4D2ED] text-[#580505] border border-[#580505]">
          {course.level}
        </div>
      </div>
      <h3 className="font-serif text-lg text-[#2F0808] mt-4 leading-snug">{course.title}</h3>
      <div className="mt-3 mb-3 h-px bg-[#580505]/15 w-full" />
      <p className="text-sm text-[#4A4A4A] font-light leading-relaxed flex-grow">{course.desc}</p>
      <div className="text-xs text-[#580505] mt-3 tracking-wider uppercase font-medium">{course.duration}</div>

      <div className="mt-4">
        <div className="text-[10px] tracking-[0.18em] uppercase text-[#580505]/70">Tarif Bénin</div>
        <div className="font-serif text-2xl text-[#580505] mt-0.5">
          {isQuote ? "Sur devis" : `${course.priceFcfa} F`}
        </div>
      </div>
      {isQuote ? (
        <Link
          to="/contact"
          data-testid={`course-buy-${course.id}`}
          className="mt-5 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-[#580505] border-[1.5px] border-[#580505] text-sm font-semibold hover:bg-[#FAFAFA] transition"
        >
          <ShoppingCart size={14} /> Demander un devis
        </Link>
      ) : (
        <button
          onClick={() => onBuy(course.id)}
          disabled={loading}
          data-testid={`course-buy-${course.id}`}
          className="mt-5 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#580505] text-[#C4D2ED] border-[1.5px] border-[#580505] text-sm font-semibold hover:bg-[#2F0808] transition disabled:opacity-60"
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : <ShoppingCart size={14} />}
          {loading ? "Redirection..." : "Acheter ce cours"}
        </button>
      )}
    </div>
  );
}

export default function TrainingPlus() {
  return (
    <>
      <PageHero
        eyebrow="MPK Training Plus"
        title="Formation linguistique — le département principal."
        kicker="Allemand, anglais, FLE, chinois. Du semi-intensif accessible au Premium VIP accéléré, structuré par sous-niveaux pour vous laisser entrer à votre rythme."
      />

      {/* COURS DE LANGUES — Produits individuels par sous-niveau */}
      <section className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16">
        <div className="flex items-center gap-3 mb-3">
          <GraduationCap className="text-[#580505]" size={28} strokeWidth={1.5} />
          <Eyebrow>Cours de langues · Allemand · Semi-Intensif</Eyebrow>
        </div>
        <h2 className="font-serif text-3xl lg:text-4xl text-[#2F0808] uppercase tracking-tight">
          Achetez votre niveau, sous-niveau par sous-niveau
        </h2>
        <p className="mt-3 text-[#4A4A4A] max-w-3xl font-light">
          Chaque sous-niveau (A1.1, A1.2, A2.1, A2.2, etc.) est un produit indépendant. Vous pouvez démarrer où vous voulez après évaluation, ou enchaîner les niveaux complets pour profiter des bundles avantageux.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          {LANGUAGE_COURSES.map((c) => (
            <CourseProductCard key={c.id} course={c} />
          ))}
        </div>

        <p className="mt-8 text-xs text-[#4A4A4A]">
          NB · Frais d'inscription unique : 5.000 FCFA · Frais de documentation par niveau : 10.000 FCFA · Réduction 15% en paiement comptant.
        </p>
      </section>

      {/* COURS PRÉPARATOIRES — redirection vers MPK Exam Prep */}
      <section className="bg-[#2F0808] text-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-12 lg:py-16">
          <div className="flex items-center gap-3 mb-3">
            <Award className="text-[#C4D2ED]" size={26} strokeWidth={1.5} />
            <div className="text-[11px] tracking-[0.22em] uppercase font-semibold text-[#C4D2ED]">Préparation aux certifications</div>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight">Goethe-Zertifikat &amp; ÖSD — voir MPK Exam Prep.</h2>
          <p className="mt-3 text-white/75 max-w-3xl font-light text-sm sm:text-base">
            Les cours préparatoires (Goethe A1 → B2 et ÖSD A1 → B2) sont gérés par notre département dédié <strong>MPK Exam Prep</strong>, avec tarifs apprenants internes/externes et durée de 03 semaines par niveau.
          </p>
          <div className="mt-6">
            <Link to="/departements/exam-prep" data-testid="link-to-examprep" className="inline-flex items-center gap-2 px-5 py-3 bg-[#580505] text-[#C4D2ED] border-[1.5px] border-[#C4D2ED] text-sm font-semibold hover:bg-[#2F0808] transition">
              Voir les cours préparatoires →
            </Link>
          </div>
        </div>
      </section>

      {/* NIVEAU COMPLET (option groupée) */}
      <section className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16">
        <Eyebrow>Niveau complet · Allemand Semi-Intensif</Eyebrow>
        <h2 className="font-serif text-3xl text-[#2F0808] mt-3 uppercase tracking-tight">Choisir un niveau complet (option recommandée)</h2>
        <p className="mt-3 text-[#4A4A4A] max-w-3xl font-light">Si vous prévoyez de suivre les deux sous-niveaux d'affilée, le niveau complet est plus avantageux.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-8">
          {SEMI_FULL.map((r) => (
            <div key={r.level} className={`mpk-card p-6 ${r.level === "B1" ? "border-[#580505] bg-[#FAFAFA]" : ""}`}>
              {r.level === "B1" && (
                <div className="text-[10px] tracking-[0.2em] uppercase text-[#580505] font-semibold mb-2 flex items-center gap-1">
                  <Star size={10} fill="#580505" stroke="#580505" /> Recommandé
                </div>
              )}
              <div className="font-serif text-3xl text-[#2F0808]">{r.level}</div>
              <div className="text-xs text-[#550000] mt-1">Parcours complet (.1 + .2)</div>
              <div className="mt-4 font-serif text-2xl text-[#580505]">
                {r.fcfa === "sur devis" ? "Sur devis" : `${r.fcfa} F`}
              </div>
              <div className="text-xs text-[#4A4A4A] mt-1">{r.eur === "sur devis" ? "" : `${r.eur} EUR (Diaspora)`}</div>
              <Link to="/boutique" className="mt-5 inline-flex items-center gap-2 text-sm text-[#580505] border-b border-[#580505]">S'inscrire</Link>
            </div>
          ))}
        </div>
      </section>

      {/* BUNDLES */}
      <section className="bg-[#FAFAFA] border-y border-[#580505]/10">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16">
          <Eyebrow>Bundles Allemand · Parcours de progression</Eyebrow>
          <h2 className="font-serif text-3xl text-[#2F0808] mt-3 uppercase tracking-tight">Packs multi-niveaux — économisez en vous projetant.</h2>
          <p className="mt-3 text-[#4A4A4A] max-w-2xl font-light">Réduction de 10% sur les packs de 2 niveaux et 15% sur les packs de 3 niveaux, en paiement comptant en une seule tranche.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
            {BUNDLES.map((b) => (
              <div key={b.id} className={`mpk-card p-7 relative ${b.featured ? "border-[#580505]" : ""}`}>
                {b.featured && <div className="absolute top-0 right-0 bg-[#580505] text-white text-[10px] tracking-[0.2em] uppercase px-3 py-1">Best value</div>}
                <Eyebrow>{b.weeks}</Eyebrow>
                <h3 className="font-serif text-2xl text-[#2F0808] mt-2">{b.title}</h3>
                <div className="text-sm text-[#550000] mt-1">{b.levels}</div>
                <div className="flex items-baseline gap-3 mt-5">
                  <span className="text-[#4A4A4A] line-through text-sm">{b.normal} F</span>
                  <span className="text-[#580505] font-serif text-2xl">{b.discounted} F</span>
                </div>
                <div className="text-xs text-[#580505] mt-1">Économie de {b.save}</div>
                <Link to="/boutique" data-testid={`bundle-${b.id}`} className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 bg-[#580505] text-[#C4D2ED] border-[1.5px] border-[#580505] text-sm font-semibold hover:bg-[#2F0808] transition">
                  Choisir ce bundle
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PREMIUM VIP */}
      <section className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16">
        <Eyebrow>Allemand Premium VIP Accéléré A1 → B1</Eyebrow>
        <h2 className="font-serif text-3xl text-[#2F0808] mt-3 uppercase tracking-tight">4 semaines par niveau · 56 UE par sous-niveau</h2>
        <p className="mt-3 text-[#4A4A4A] max-w-3xl font-light">Lundi au jeudi, 08:00 – 14:30 (2 pauses de 20 min). Démarrage possible à partir de 2 candidat.e.s. Frais d'inscription unique : 10.000 FCFA. Réduction 15% en paiement comptant.</p>
        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          <div>
            <h3 className="font-serif text-xl text-[#580505] mb-4">Sous-niveaux</h3>
            <PricingTable headers={["Sous-niveau", "Durée", "UE", "Tarif"]} rows={VIP_SUBLEVELS.map((r) => [r.level, `${r.weeks} sem.`, `${r.ue} UE`, `${r.fcfa} F`])} />
          </div>
          <div>
            <h3 className="font-serif text-xl text-[#580505] mb-4">Niveau complet</h3>
            <PricingTable headers={["Niveau", "Tarif"]} rows={[...VIP_FULL.map((r) => [r.level, `${r.fcfa} F`]), ["C1", "Sur demande"]]} />
          </div>
        </div>
      </section>

      <section className="bg-[#FAFAFA] border-y border-[#580505]/10">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16">
          <Eyebrow>Premium VIP Intensif Accéléré B2 → C1</Eyebrow>
          <h2 className="font-serif text-3xl text-[#2F0808] mt-3 uppercase tracking-tight">214 UE · 8 semaines · 7 UE par séance</h2>
          <p className="mt-3 text-[#4A4A4A] max-w-3xl font-light">Lundi au jeudi 08:00 – 14:30. Frais d'inscription : 10.000 FCFA. Paiement possible en 2 tranches.</p>
          <div className="mt-6 max-w-2xl">
            <PricingTable headers={["Niveau", "UE", "Durée", "Tarif"]} rows={VIP_INTENSIVE.map((r) => [r.level, `${r.ue} UE`, `${r.weeks} sem.`, `${r.fcfa} F`])} />
          </div>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16 grid lg:grid-cols-3 gap-5">
        <ComingSoon title="Cours d'Anglais" />
        <ComingSoon title="Cours de Français Langue Étrangère" />
        <ComingSoon title="Cours de Chinois" />
      </section>

      <section className="max-w-[1400px] mx-auto px-5 lg:px-10 py-20 text-center">
        <SectionTitle eyebrow="Prêt à commencer ?" title="Un conseiller MPK vous guide vers le bon parcours." center caps />
        <div className="flex justify-center gap-4 flex-wrap">
          <CTA to="/contact" label="Demander un devis" testid="training-cta-quote" />
          <CTA to="/boutique" label="Voir bundles & cartes" variant="ghost" testid="training-cta-shop" />
        </div>
      </section>
    </>
  );
}
