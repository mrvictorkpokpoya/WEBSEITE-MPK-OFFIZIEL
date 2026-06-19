import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import axios from "axios";
import { toast } from "sonner";
import { ArrowLeft, GraduationCap, Sparkles, Baby, ShoppingCart, Loader2, Star, Award, Package, ArrowRight } from "lucide-react";
import { PageHero, Eyebrow, CTA, SectionTitle } from "@/components/Common";
import {
  ENGLISH_COURSES,
  ENGLISH_FULL,
  ENGLISH_VIP_SUBLEVELS,
  ENGLISH_VIP_FULL,
  ENGLISH_BUNDLES,
} from "@/lib/data";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

function PricingTable({ headers, rows }) {
  return (
    <div className="scroll-x">
      <table className="mpk-table min-w-[640px]">
        <thead><tr>{headers.map((h) => <th key={h}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

function startCheckout(packageId, setLoading, t) {
  setLoading(true);
  axios.post(`${API}/payments/checkout/session`, { package_id: packageId, origin_url: window.location.origin })
    .then((r) => { if (r.data?.url) window.location.href = r.data.url; else { toast.error(t("training_plus.errors.no_url")); setLoading(false); } })
    .catch((err) => { const d = err.response?.data?.detail; toast.error(typeof d === "string" ? d : t("training_plus.errors.checkout")); setLoading(false); });
}

function CourseCard({ course }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const isQuote = course.priceFcfa === "sur devis";
  return (
    <div className="bg-white rounded-sm p-5 sm:p-6 border border-[#580505]/25 shadow-[0_14px_30px_-12px_rgba(88,5,5,0.35)] hover:shadow-[0_22px_44px_-12px_rgba(88,5,5,0.45)] hover:border-[#580505]/50 transition-all duration-300 flex flex-col h-full" data-testid={`course-card-${course.id}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="inline-flex items-center justify-center min-w-[56px] h-10 px-3 font-serif text-lg font-semibold bg-[#C4D2ED] text-[#580505] border border-[#580505]">{course.level}</div>
      </div>
      <h3 className="font-serif text-lg text-[#2F0808] mt-4 leading-snug">{course.title}</h3>
      <div className="mt-3 mb-3 h-px bg-[#580505]/20 w-full" />
      <p className="text-sm text-[#4A4A4A] font-light leading-relaxed flex-grow">{course.desc}</p>
      <div className="text-xs text-[#580505] mt-3 tracking-wider uppercase font-medium">{course.duration}</div>
      <div className="mt-4">
        <div className="text-[10px] tracking-[0.18em] uppercase text-[#580505]/70">{t("training_plus.card_price_label")}</div>
        <div className="font-serif text-2xl text-[#580505] mt-0.5">{isQuote ? t("training_plus.card_price_quote") : `${course.priceFcfa} F`}</div>
      </div>
      {isQuote ? (
        <Link to="/contact" data-testid={`course-buy-${course.id}`} className="mt-5 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-[#580505] border-[1.5px] border-[#580505] text-sm font-semibold hover:bg-[#FAFAFA] transition">
          <ShoppingCart size={14} /> {t("training_plus.card_buy_quote")}
        </Link>
      ) : (
        <button onClick={() => startCheckout(course.id, setLoading, t)} disabled={loading} data-testid={`course-buy-${course.id}`} className="mt-5 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#580505] text-[#C4D2ED] border-[1.5px] border-[#580505] text-sm font-semibold hover:bg-[#2F0808] transition disabled:opacity-60">
          {loading ? <Loader2 size={14} className="animate-spin" /> : <ShoppingCart size={14} />}
          {loading ? t("common.redirecting") : t("training_plus.card_buy_course")}
        </button>
      )}
    </div>
  );
}

function VipSublevelCard({ vip }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const isQuote = vip.fcfa === "sur demande";
  return (
    <div className="bg-white rounded-sm p-5 sm:p-6 border border-[#580505]/25 shadow-[0_14px_30px_-12px_rgba(88,5,5,0.35)] hover:shadow-[0_22px_44px_-12px_rgba(88,5,5,0.45)] hover:border-[#580505]/50 transition-all duration-300 flex flex-col h-full" data-testid={`vip-card-${vip.id}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="inline-flex items-center justify-center min-w-[56px] h-10 px-3 font-serif text-lg font-semibold bg-[#580505] text-white border border-[#580505]">{vip.level}</div>
        <span className="text-[10px] tracking-[0.18em] uppercase text-[#580505]/80 font-medium">VIP · FAST-TRACK</span>
      </div>
      <div className="mt-4 text-xs text-[#580505] tracking-wider uppercase font-medium">{t("training_plus.vip_weeks_short", { n: vip.weeks })} · {t("training_plus.vip_ue_short", { n: vip.ue })}</div>
      <div className="mt-3 mb-3 h-px bg-[#580505]/20 w-full" />
      <p className="text-sm text-[#4A4A4A] font-light leading-relaxed flex-grow">Anglais Premium VIP · Lundi-jeudi 08:00 – 14:30 · démarrage à partir de 2 candidat.e.s.</p>
      <div className="mt-4">
        <div className="text-[10px] tracking-[0.18em] uppercase text-[#580505]/70">{t("training_plus.card_price_label")}</div>
        <div className="font-serif text-2xl text-[#580505] mt-0.5">{isQuote ? t("training_plus.card_price_quote") : `${vip.fcfa} F`}</div>
      </div>
      {isQuote ? (
        <Link to="/contact" data-testid={`vip-buy-${vip.id}`} className="mt-5 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-[#580505] border-[1.5px] border-[#580505] text-sm font-semibold hover:bg-[#FAFAFA] transition">
          <ShoppingCart size={14} /> {t("training_plus.card_buy_quote")}
        </Link>
      ) : (
        <button onClick={() => startCheckout(vip.id, setLoading, t)} disabled={loading} data-testid={`vip-buy-${vip.id}`} className="mt-5 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#580505] text-[#C4D2ED] border-[1.5px] border-[#580505] text-sm font-semibold hover:bg-[#2F0808] transition disabled:opacity-60">
          {loading ? <Loader2 size={14} className="animate-spin" /> : <ShoppingCart size={14} />}
          {loading ? t("common.redirecting") : t("training_plus.card_buy_course")}
        </button>
      )}
    </div>
  );
}

function BundleCard({ b }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const tone = b.tone || "#580505";
  return (
    <div className={`relative bg-white rounded-sm overflow-hidden border-[1.5px] shadow-[0_18px_36px_-14px_rgba(88,5,5,0.40)] hover:shadow-[0_28px_52px_-14px_rgba(88,5,5,0.50)] transition-all duration-300 flex flex-col h-full ${b.featured ? 'scale-[1.015]' : ''}`} style={{ borderColor: tone }} data-testid={`bundle-card-${b.id}`}>
      <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${tone}, #580505)` }} />
      {b.featured && <div className="absolute top-2 right-2 bg-[#580505] text-white text-[10px] tracking-[0.2em] uppercase px-3 py-1 z-10">{t("training_plus.bundles_best")}</div>}
      <div className="p-6 flex flex-col h-full">
        <div className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase font-semibold" style={{ color: tone }}>
          <Package size={11} /> PACK · {b.weeks}
        </div>
        <h3 className="font-serif text-2xl text-[#2F0808] mt-2 leading-tight">{b.title}</h3>
        <div className="text-sm text-[#580505] mt-1 font-medium">{b.levels}</div>
        <div className="mt-4 mb-4 h-px" style={{ background: `${tone}33` }} />
        <div className="flex items-baseline gap-3">
          <span className="text-[#4A4A4A] line-through text-sm">{b.normal} F</span>
          <span className="font-serif text-2xl" style={{ color: tone }}>{b.discounted} F</span>
        </div>
        <div className="text-xs mt-1 font-medium" style={{ color: tone }}>{t("training_plus.bundles_save", { save: b.save })}</div>
        <div className="flex-grow" />
        <button onClick={() => startCheckout(b.id, setLoading, t)} disabled={loading} data-testid={`bundle-buy-${b.id}`} className="mt-6 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-[#C4D2ED] border-[1.5px] text-sm font-semibold transition disabled:opacity-60" style={{ background: tone, borderColor: tone }}>
          {loading ? <Loader2 size={14} className="animate-spin" /> : <ShoppingCart size={14} />}
          {loading ? t("common.redirecting") : t("training_plus.bundles_choose")}
        </button>
      </div>
    </div>
  );
}

export default function LanguageEnglish() {
  const { t } = useTranslation();
  return (
    <>
      <PageHero
        eyebrow={t("languages.english_section_eyebrow")}
        title={t("languages.english_title")}
        kicker="Programme structuré du A1.1 au C2.2 — méthode communicative et orientée résultats (IELTS / TOEFL / Cambridge). Format Semi-Intensif 3×3h/semaine, à -20% par rapport à l'allemand."
      />

      <section className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-6">
        <Link to="/departements/training-plus" className="inline-flex items-center gap-2 text-sm text-[#580505] hover:underline" data-testid="link-back-training">
          <ArrowLeft size={14}/> {t("languages.back_to_training")}
        </Link>
      </section>

      {/* MPK Kids English Training */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-8">
        <Eyebrow>{t("languages.kids_tagline")}</Eyebrow>
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#2F0808] mt-3 uppercase tracking-tight">{t("languages.kids_title")}</h2>
        <div className="mt-8 mpk-card p-6 sm:p-8 grid sm:grid-cols-12 gap-6 items-center bg-[#FAFAFA]" data-testid="kids-english-card">
          <div className="sm:col-span-2 flex justify-center">
            <div className="w-20 h-20 rounded-full bg-[#580505] grid place-items-center text-white">
              <Baby size={32} strokeWidth={1.5} />
            </div>
          </div>
          <div className="sm:col-span-7">
            <h3 className="font-serif text-xl sm:text-2xl text-[#2F0808] leading-snug">{t("languages.kids_title")}</h3>
            <p className="mt-2 text-sm text-[#4A4A4A] font-light leading-relaxed">{t("languages.kids_desc")}</p>
            <div className="mt-3 flex flex-wrap gap-4 text-xs">
              <span className="inline-flex items-center gap-1.5 text-[#580505] font-medium tracking-wide uppercase">{t("languages.kids_duration")}</span>
              <span className="inline-flex items-center gap-1.5 text-[#580505] font-medium tracking-wide uppercase">{t("languages.kids_reg")}</span>
            </div>
          </div>
          <div className="sm:col-span-3 text-center sm:text-right">
            <div className="text-[10px] tracking-[0.18em] uppercase text-[#580505]/70 font-medium">{t("training_plus.card_price_label")}</div>
            <div className="font-serif text-3xl text-[#580505] mt-1">{t("languages.kids_price")}</div>
            <button onClick={() => startCheckout("kids_english", () => {}, t)} data-testid="kids-buy" className="mt-4 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#580505] text-[#C4D2ED] border-[1.5px] border-[#580505] text-sm font-semibold hover:bg-[#2F0808] transition">
              <ShoppingCart size={14} /> {t("languages.kids_cta")}
            </button>
          </div>
        </div>
      </section>

      {/* Cours d'anglais Semi-Intensif */}
      <section className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16">
        <div className="flex items-center gap-3 mb-3">
          <GraduationCap className="text-[#580505]" size={28} strokeWidth={1.5} />
          <Eyebrow>01 · Anglais · Semi-Intensif</Eyebrow>
        </div>
        <h2 className="font-serif text-3xl lg:text-4xl text-[#2F0808] uppercase tracking-tight leading-tight">
          Cours d'anglais · Semi-Intensif
        </h2>
        <p className="mt-4 text-[#4A4A4A] max-w-3xl font-light leading-relaxed">
          Achetez votre cours d'anglais selon votre niveau ici. Chaque sous-niveau (A1.1, A1.2 … jusqu'à C2.2) est un produit indépendant. Format : <strong>3 séances de 3 heures par semaine</strong>, soit 9 heures hebdomadaires. Tarification à -20% par rapport à l'allemand.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          {ENGLISH_COURSES.map((c) => <CourseCard key={c.id} course={c} />)}
        </div>

        <p className="mt-8 text-xs text-[#4A4A4A]">
          NB · Frais d'inscription unique : 5.000 FCFA · Frais de documentation par niveau : 10.000 FCFA · Réduction 15% en paiement comptant.
        </p>
      </section>

      {/* Niveau complet Anglais */}
      <section className="bg-[#FAFAFA] border-y border-[#580505]/15">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16">
          <Eyebrow>Niveau complet · Anglais Semi-Intensif</Eyebrow>
          <h2 className="font-serif text-3xl text-[#2F0808] mt-3 uppercase tracking-tight">Choisir un niveau complet (option recommandée)</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-4 mt-8">
            {ENGLISH_FULL.map((r) => (
              <div key={r.level} className={`mpk-card p-6 ${r.level === "B1" ? "border-[#580505] bg-white" : ""}`}>
                {r.level === "B1" && (
                  <div className="text-[10px] tracking-[0.2em] uppercase text-[#580505] font-semibold mb-2 flex items-center gap-1">
                    <Star size={10} fill="#580505" stroke="#580505" /> Recommandé
                  </div>
                )}
                <div className="font-serif text-3xl text-[#2F0808]">{r.level}</div>
                <div className="text-xs text-[#550000] mt-1">Parcours complet (.1 + .2)</div>
                <div className="mt-4 font-serif text-2xl text-[#580505]">{r.fcfa === "sur devis" ? "Sur devis" : `${r.fcfa} F`}</div>
                <div className="text-xs text-[#4A4A4A] mt-1">{r.eur === "sur devis" ? "" : `${r.eur} EUR (Diaspora)`}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Anglais Premium VIP */}
      <section className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16">
        <div className="flex items-center gap-3 mb-3">
          <Sparkles className="text-[#580505]" size={26} strokeWidth={1.5} />
          <Eyebrow>Anglais Premium VIP Accéléré</Eyebrow>
        </div>
        <h2 className="font-serif text-3xl lg:text-4xl text-[#2F0808] uppercase tracking-tight">
          Premium VIP Accéléré · Anglais
        </h2>
        <p className="mt-4 text-[#4A4A4A] max-w-3xl font-light leading-relaxed">
          Même progression A1.1 → C2.2 — durée /2 (formule accélérée intensive). Lundi-jeudi 08:00 – 14:30. À partir de 2 candidat.e.s. Tarification à -20% par rapport à l'allemand Premium.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          {ENGLISH_VIP_SUBLEVELS.map((vip) => <VipSublevelCard key={vip.id} vip={vip} />)}
        </div>

        <div className="mt-12">
          <h3 className="font-serif text-2xl text-[#580505] mb-4">Niveau complet · Anglais VIP</h3>
          <PricingTable
            headers={["Niveau", "Durée", "Tarif"]}
            rows={ENGLISH_VIP_FULL.map((r) => [
              r.level,
              t("training_plus.vip_weeks_short", { n: r.weeks }),
              r.fcfa === "sur demande" ? "Sur demande" : `${r.fcfa} F`,
            ])}
          />
        </div>
      </section>

      {/* Bundles Anglais */}
      <section className="bg-[#FAFAFA] border-y border-[#580505]/15">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16">
          <div className="flex items-center gap-3 mb-3">
            <Package className="text-[#580505]" size={26} strokeWidth={1.5} />
            <Eyebrow>Bundles Anglais · Parcours de progression</Eyebrow>
          </div>
          <h2 className="font-serif text-3xl text-[#2F0808] uppercase tracking-tight">Packs multi-niveaux — économisez en vous projetant.</h2>
          <p className="mt-3 text-[#4A4A4A] max-w-2xl font-light">Réduction de 10% sur les packs de 2 niveaux et 15% sur les packs de 3+ niveaux, en paiement comptant en une seule tranche.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {ENGLISH_BUNDLES.map((b) => <BundleCard key={b.id} b={b} />)}
          </div>
        </div>
      </section>

      {/* MPK Exam Prep callout */}
      <section className="bg-[#2F0808] text-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-12 lg:py-16">
          <div className="flex items-center gap-3 mb-3">
            <Award className="text-[#C4D2ED]" size={26} strokeWidth={1.5} />
            <div className="text-[11px] tracking-[0.22em] uppercase font-semibold text-[#C4D2ED]">Préparation aux certifications</div>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight">IELTS · TOEFL · Cambridge — voir MPK Exam Prep.</h2>
          <p className="mt-3 text-white/75 max-w-3xl font-light text-sm sm:text-base">
            Les préparations IELTS, TOEFL iBT, Cambridge (PET, FCE, CAE, CPE) sont gérées par notre département dédié <strong>MPK Exam Prep</strong>.
          </p>
          <div className="mt-6">
            <Link to="/departements/exam-prep" className="inline-flex items-center gap-2 px-5 py-3 bg-[#580505] text-[#C4D2ED] border-[1.5px] border-[#C4D2ED] text-sm font-semibold hover:bg-[#2F0808] transition">
              Voir les cours préparatoires → <ArrowRight size={14}/>
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-5 lg:px-10 py-20 text-center">
        <SectionTitle eyebrow="Prêt à commencer ?" title="Un conseiller MPK vous guide vers le bon parcours." center caps />
        <div className="flex justify-center gap-4 flex-wrap">
          <CTA to="/contact" label="Demander un devis" testid="english-cta-quote" />
          <CTA to="/boutique" label="Voir bundles & cartes" variant="ghost" testid="english-cta-shop" />
        </div>
      </section>
    </>
  );
}
