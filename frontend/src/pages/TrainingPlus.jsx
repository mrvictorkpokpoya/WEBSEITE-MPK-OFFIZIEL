import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import axios from "axios";
import { toast } from "sonner";
import { PageHero, Eyebrow, CTA, SectionTitle } from "@/components/Common";
import {
  SEMI_FULL,
  VIP_SUBLEVELS,
  VIP_FULL,
  BUNDLES,
  LANGUAGE_COURSES,
} from "@/lib/data";
import { Star, ShoppingCart, GraduationCap, Award, Loader2, ArrowRight, Sparkles, Package } from "lucide-react";

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

// ---- Card factory ---- thicker shadow + bordeaux border, white inner
function CourseProductCard({ course }) {
  const { t } = useTranslation();
  const isQuote = course.priceFcfa === "sur devis";
  const [loading, setLoading] = useState(false);

  const onBuy = async (packageId) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API}/payments/checkout/session`, { package_id: packageId, origin_url: window.location.origin });
      if (res.data?.url) window.location.href = res.data.url;
      else toast.error(t("training_plus.errors.no_url"));
    } catch (err) {
      const d = err.response?.data?.detail;
      toast.error(typeof d === "string" ? d : t("training_plus.errors.checkout"));
    }
    setLoading(false);
  };

  const courseTitle = t(`courses.${course.id}.title`, { defaultValue: course.title });
  const courseDesc = t(`courses.${course.id}.desc`, { defaultValue: course.desc });

  return (
    <div className="bg-white rounded-sm p-5 sm:p-6 border border-[#580505]/25 shadow-[0_14px_30px_-12px_rgba(88,5,5,0.35)] hover:shadow-[0_22px_44px_-12px_rgba(88,5,5,0.45)] hover:border-[#580505]/50 transition-all duration-300 flex flex-col h-full" data-testid={`course-card-${course.id}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="inline-flex items-center justify-center min-w-[56px] h-10 px-3 font-serif text-lg font-semibold bg-[#C4D2ED] text-[#580505] border border-[#580505]">{course.level}</div>
      </div>
      <h3 className="font-serif text-lg text-[#2F0808] mt-4 leading-snug">{courseTitle}</h3>
      <div className="mt-3 mb-3 h-px bg-[#580505]/20 w-full" />
      <p className="text-sm text-[#4A4A4A] font-light leading-relaxed flex-grow">{courseDesc}</p>
      <div className="text-xs text-[#580505] mt-3 tracking-wider uppercase font-medium">{t("courses.duration_4w")}</div>

      <div className="mt-4">
        <div className="text-[10px] tracking-[0.18em] uppercase text-[#580505]/70">{t("training_plus.card_price_label")}</div>
        <div className="font-serif text-2xl text-[#580505] mt-0.5">{isQuote ? t("training_plus.card_price_quote") : `${course.priceFcfa} F`}</div>
      </div>
      {isQuote ? (
        <Link to="/contact" data-testid={`course-buy-${course.id}`} className="mt-5 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-[#580505] border-[1.5px] border-[#580505] text-sm font-semibold hover:bg-[#FAFAFA] transition">
          <ShoppingCart size={14} /> {t("training_plus.card_buy_quote")}
        </Link>
      ) : (
        <button onClick={() => onBuy(course.id)} disabled={loading} data-testid={`course-buy-${course.id}`} className="mt-5 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#580505] text-[#C4D2ED] border-[1.5px] border-[#580505] text-sm font-semibold hover:bg-[#2F0808] transition disabled:opacity-60">
          {loading ? <Loader2 size={14} className="animate-spin" /> : <ShoppingCart size={14} />}
          {loading ? t("common.redirecting") : t("training_plus.card_buy_course")}
        </button>
      )}
    </div>
  );
}

// ---- VIP Sublevel Card ----
function VipSublevelCard({ vip }) {
  const { t } = useTranslation();
  const isQuote = vip.fcfa === "sur demande" || vip.fcfa === "sur devis";
  const [loading, setLoading] = useState(false);
  const onBuy = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API}/payments/checkout/session`, { package_id: vip.id, origin_url: window.location.origin });
      if (res.data?.url) window.location.href = res.data.url;
      else toast.error(t("training_plus.errors.no_url"));
    } catch (err) {
      const d = err.response?.data?.detail;
      toast.error(typeof d === "string" ? d : t("training_plus.errors.checkout"));
    }
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-sm p-5 sm:p-6 border border-[#580505]/25 shadow-[0_14px_30px_-12px_rgba(88,5,5,0.35)] hover:shadow-[0_22px_44px_-12px_rgba(88,5,5,0.45)] hover:border-[#580505]/50 transition-all duration-300 flex flex-col h-full" data-testid={`vip-card-${vip.id}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="inline-flex items-center justify-center min-w-[56px] h-10 px-3 font-serif text-lg font-semibold bg-[#580505] text-white border border-[#580505]">{vip.level}</div>
        <span className="text-[10px] tracking-[0.18em] uppercase text-[#580505]/80 font-medium">VIP · ACCÉLÉRÉ</span>
      </div>
      <div className="mt-4 text-xs text-[#580505] tracking-wider uppercase font-medium">{t("training_plus.vip_weeks_short", { n: vip.weeks })} · {t("training_plus.vip_ue_short", { n: vip.ue })}</div>
      <div className="mt-3 mb-3 h-px bg-[#580505]/20 w-full" />
      <p className="text-sm text-[#4A4A4A] font-light leading-relaxed flex-grow">Format Premium VIP Accéléré · Lundi-jeudi 08:00 – 14:30 · démarrage à partir de 2 candidat.e.s.</p>
      <div className="mt-4">
        <div className="text-[10px] tracking-[0.18em] uppercase text-[#580505]/70">{t("training_plus.card_price_label")}</div>
        <div className="font-serif text-2xl text-[#580505] mt-0.5">{isQuote ? t("training_plus.card_price_quote") : `${vip.fcfa} F`}</div>
      </div>
      {isQuote ? (
        <Link to="/contact" data-testid={`vip-buy-${vip.id}`} className="mt-5 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-[#580505] border-[1.5px] border-[#580505] text-sm font-semibold hover:bg-[#FAFAFA] transition">
          <ShoppingCart size={14} /> {t("training_plus.card_buy_quote")}
        </Link>
      ) : (
        <button onClick={onBuy} disabled={loading} data-testid={`vip-buy-${vip.id}`} className="mt-5 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#580505] text-[#C4D2ED] border-[1.5px] border-[#580505] text-sm font-semibold hover:bg-[#2F0808] transition disabled:opacity-60">
          {loading ? <Loader2 size={14} className="animate-spin" /> : <ShoppingCart size={14} />}
          {loading ? t("common.redirecting") : t("training_plus.card_buy_course")}
        </button>
      )}
    </div>
  );
}

// ---- Bundle Card with subtle tone variation ----
function BundleCard({ b }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const tone = b.tone || "#580505";
  const onBuy = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API}/payments/checkout/session`, { package_id: b.id, origin_url: window.location.origin });
      if (res.data?.url) window.location.href = res.data.url;
      else toast.error(t("training_plus.errors.no_url"));
    } catch (err) {
      const d = err.response?.data?.detail;
      toast.error(typeof d === "string" ? d : t("training_plus.errors.checkout"));
    }
    setLoading(false);
  };

  return (
    <div className={`relative bg-white rounded-sm overflow-hidden border-[1.5px] shadow-[0_18px_36px_-14px_rgba(88,5,5,0.40)] hover:shadow-[0_28px_52px_-14px_rgba(88,5,5,0.50)] transition-all duration-300 flex flex-col h-full ${b.featured ? 'scale-[1.015]' : ''}`} style={{ borderColor: tone }} data-testid={`bundle-card-${b.id}`}>
      {/* Color ribbon */}
      <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${tone}, #580505)` }} />
      {b.featured && (
        <div className="absolute top-2 right-2 bg-[#580505] text-white text-[10px] tracking-[0.2em] uppercase px-3 py-1 z-10">
          {t("training_plus.bundles_best")}
        </div>
      )}
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
        <button onClick={onBuy} disabled={loading} data-testid={`bundle-buy-${b.id}`} className="mt-6 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-[#C4D2ED] border-[1.5px] text-sm font-semibold transition disabled:opacity-60" style={{ background: tone, borderColor: tone }}>
          {loading ? <Loader2 size={14} className="animate-spin" /> : <ShoppingCart size={14} />}
          {loading ? t("common.redirecting") : t("training_plus.bundles_choose")}
        </button>
      </div>
    </div>
  );
}

// ---- Language navigation card (Anglais / Français / Chinois) ----
function LangNavCard({ to, title, kicker, status, testid }) {
  const { t } = useTranslation();
  const labelMap = {
    available: "Disponible — A1.1 → C2.2",
    design: t("languages.in_progress"),
    coming: t("languages.coming_soon"),
  };
  return (
    <Link to={to} data-testid={testid} className="block bg-white rounded-sm p-6 border border-[#580505]/25 shadow-[0_14px_30px_-12px_rgba(88,5,5,0.30)] hover:shadow-[0_22px_44px_-12px_rgba(88,5,5,0.40)] hover:border-[#580505]/50 transition-all duration-300 group">
      <div className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#580505]">{labelMap[status] || labelMap.coming}</div>
      <h3 className="font-serif text-2xl text-[#2F0808] mt-2 group-hover:text-[#580505] transition">{title}</h3>
      <p className="text-sm text-[#4A4A4A] mt-2 font-light leading-relaxed">{kicker}</p>
      <span className="inline-flex items-center gap-1.5 mt-5 text-sm text-[#580505] border-b border-[#580505] pb-0.5">
        {t("languages.discover")} <ArrowRight size={13} />
      </span>
    </Link>
  );
}

export default function TrainingPlus() {
  const { t } = useTranslation();

  return (
    <>
      <PageHero
        eyebrow={t("training_plus.hero_eyebrow")}
        title={t("training_plus.hero_title")}
        kicker={t("training_plus.hero_kicker")}
      />

      {/* ============ SECTION 01 · ALLEMAND — Semi-Intensif ============ */}
      <section className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16">
        <div className="flex items-center gap-3 mb-3">
          <GraduationCap className="text-[#580505]" size={28} strokeWidth={1.5} />
          <Eyebrow>{t("training_plus.section_german_eyebrow")}</Eyebrow>
        </div>
        <h2 className="font-serif text-3xl lg:text-4xl text-[#2F0808] uppercase tracking-tight leading-tight">
          {t("training_plus.section_german_title")}
        </h2>
        <p className="mt-4 text-[#4A4A4A] max-w-3xl font-light leading-relaxed">
          {t("training_plus.section_german_kicker")}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          {LANGUAGE_COURSES.map((c) => <CourseProductCard key={c.id} course={c} />)}
        </div>

        <p className="mt-8 text-xs text-[#4A4A4A]">
          {t("training_plus.courses_note")}
        </p>
      </section>

      {/* Niveau complet — Option recommandée */}
      <section className="bg-[#FAFAFA] border-y border-[#580505]/15">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16">
          <Eyebrow>{t("training_plus.full_eyebrow")}</Eyebrow>
          <h2 className="font-serif text-3xl text-[#2F0808] mt-3 uppercase tracking-tight">{t("training_plus.full_title")}</h2>
          <p className="mt-3 text-[#4A4A4A] max-w-3xl font-light">{t("training_plus.full_intro")}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-4 mt-8">
            {SEMI_FULL.map((r) => (
              <div key={r.level} className={`mpk-card p-6 ${r.level === "B1" ? "border-[#580505] bg-white" : ""}`}>
                {r.level === "B1" && (
                  <div className="text-[10px] tracking-[0.2em] uppercase text-[#580505] font-semibold mb-2 flex items-center gap-1">
                    <Star size={10} fill="#580505" stroke="#580505" /> {t("training_plus.full_recommended")}
                  </div>
                )}
                <div className="font-serif text-3xl text-[#2F0808]">{r.level}</div>
                <div className="text-xs text-[#550000] mt-1">{t("training_plus.full_path")}</div>
                <div className="mt-4 font-serif text-2xl text-[#580505]">
                  {r.fcfa === "sur devis" ? t("training_plus.card_price_quote") : `${r.fcfa} F`}
                </div>
                <div className="text-xs text-[#4A4A4A] mt-1">{r.eur === "sur devis" ? "" : t("training_plus.full_diaspora", { eur: r.eur })}</div>
                <Link to="/boutique" className="mt-5 inline-flex items-center gap-2 text-sm text-[#580505] border-b border-[#580505]">{t("training_plus.full_register")}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Allemand Premium VIP Accéléré — sublevel cards */}
      <section className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16">
        <div className="flex items-center gap-3 mb-3">
          <Sparkles className="text-[#580505]" size={26} strokeWidth={1.5} />
          <Eyebrow>{t("training_plus.vip_eyebrow")}</Eyebrow>
        </div>
        <h2 className="font-serif text-3xl lg:text-4xl text-[#2F0808] uppercase tracking-tight">
          {t("languages.premium_vip_title")} · {t("languages.german")}
        </h2>
        <p className="mt-4 text-[#4A4A4A] max-w-3xl font-light leading-relaxed">
          {t("languages.premium_vip_kicker")} {t("training_plus.vip_intro")}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          {VIP_SUBLEVELS.map((vip) => <VipSublevelCard key={vip.id} vip={vip} />)}
        </div>

        {/* Niveau complet VIP table */}
        <div className="mt-12">
          <h3 className="font-serif text-2xl text-[#580505] mb-4">{t("languages.full_levels_title")} · {t("training_plus.vip_eyebrow")}</h3>
          <PricingTable
            headers={[t("training_plus.vip_table_h_level"), t("training_plus.vip_table_h_duration"), t("training_plus.vip_table_h_price")]}
            rows={VIP_FULL.map((r) => [
              r.level,
              t("training_plus.vip_weeks_short", { n: r.weeks }),
              r.fcfa === "sur demande" ? t("training_plus.vip_c1_on_request") : `${r.fcfa} F`
            ])}
          />
        </div>
      </section>

      {/* ============ Bundles enrichis (variations subtiles) ============ */}
      <section className="bg-[#FAFAFA] border-y border-[#580505]/15">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16">
          <div className="flex items-center gap-3 mb-3">
            <Package className="text-[#580505]" size={26} strokeWidth={1.5} />
            <Eyebrow>{t("training_plus.bundles_eyebrow")}</Eyebrow>
          </div>
          <h2 className="font-serif text-3xl text-[#2F0808] uppercase tracking-tight">{t("training_plus.bundles_title")}</h2>
          <p className="mt-3 text-[#4A4A4A] max-w-2xl font-light">{t("training_plus.bundles_intro")}</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {BUNDLES.map((b) => <BundleCard key={b.id} b={b} />)}
          </div>
        </div>
      </section>

      {/* ============ SECTION 02 · ANGLAIS — Découvrir ============ */}
      <section className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16 grid lg:grid-cols-2 gap-6">
        <LangNavCard
          to="/langues/anglais"
          testid="lang-card-english"
          title={t("languages.english_title")}
          kicker={t("languages.english_kicker")}
          status="available"
        />
        <LangNavCard
          to="/langues/francais"
          testid="lang-card-french"
          title={t("languages.french_title")}
          kicker={t("languages.french_kicker")}
          status="design"
        />
        <LangNavCard
          to="/langues/chinois"
          testid="lang-card-chinese"
          title={t("languages.chinese_title")}
          kicker={t("languages.chinese_kicker")}
          status="design"
        />
        <div className="mpk-card p-6 bg-[#2F0808] text-white">
          <div className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#C4D2ED]">{t("languages.german_section_eyebrow")}</div>
          <h3 className="font-serif text-2xl mt-2 text-white">{t("languages.german")} · {t("training_plus.section_german_title")}</h3>
          <p className="text-sm text-white/75 mt-2 font-light leading-relaxed">Vous êtes déjà sur la page des cours d'allemand. Toutes les rubriques sont disponibles plus haut.</p>
          <a href="#top" className="inline-flex items-center gap-1.5 mt-5 text-sm text-[#C4D2ED] border-b border-[#C4D2ED] pb-0.5">↑ Retour en haut</a>
        </div>
      </section>

      {/* ============ MPK Exam Prep (déplacé APRÈS les cours de langues) ============ */}
      <section className="bg-[#2F0808] text-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-12 lg:py-16">
          <div className="flex items-center gap-3 mb-3">
            <Award className="text-[#C4D2ED]" size={26} strokeWidth={1.5} />
            <div className="text-[11px] tracking-[0.22em] uppercase font-semibold text-[#C4D2ED]">{t("training_plus.exam_eyebrow")}</div>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight">{t("training_plus.exam_title")}</h2>
          <p className="mt-3 text-white/75 max-w-3xl font-light text-sm sm:text-base">
            <Trans i18nKey="training_plus.exam_desc" components={{ strong: <strong /> }} />
          </p>
          <div className="mt-6">
            <Link to="/departements/exam-prep" data-testid="link-to-examprep" className="inline-flex items-center gap-2 px-5 py-3 bg-[#580505] text-[#C4D2ED] border-[1.5px] border-[#C4D2ED] text-sm font-semibold hover:bg-[#2F0808] transition">
              {t("training_plus.exam_cta")}
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-5 lg:px-10 py-20 text-center">
        <SectionTitle eyebrow={t("training_plus.cta_eyebrow")} title={t("training_plus.cta_title")} center caps />
        <div className="flex justify-center gap-4 flex-wrap">
          <CTA to="/contact" label={t("training_plus.cta_quote")} testid="training-cta-quote" />
          <CTA to="/boutique" label={t("training_plus.cta_shop")} variant="ghost" testid="training-cta-shop" />
        </div>
      </section>
    </>
  );
}
