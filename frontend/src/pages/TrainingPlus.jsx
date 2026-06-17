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
  VIP_INTENSIVE,
  BUNDLES,
  LANGUAGE_COURSES,
} from "@/lib/data";
import { Star, Lock, ShoppingCart, GraduationCap, Award, Loader2 } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

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
  const { t } = useTranslation();
  return (
    <div className="mpk-card p-10 text-center">
      <Lock className="mx-auto text-[#580505]" size={28} />
      <h3 className="font-serif text-2xl text-[#2F0808] mt-4">{title}</h3>
      <p className="mt-3 text-[#4A4A4A] font-light max-w-xl mx-auto">
        {t("training_plus.coming_desc")}
      </p>
      <div className="mt-6">
        <Link to="/contact" className="btn-primary text-sm">{t("training_plus.coming_notify")}</Link>
      </div>
    </div>
  );
}

function CourseProductCard({ course }) {
  const { t } = useTranslation();
  const isQuote = course.priceFcfa === "sur devis";
  const [loading, setLoading] = useState(false);

  const onBuy = async (packageId) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API}/payments/checkout/session`, {
        package_id: packageId,
        origin_url: window.location.origin,
      });
      if (res.data?.url) {
        window.location.href = res.data.url;
      } else {
        toast.error(t("training_plus.errors.no_url"));
      }
    } catch (err) {
      const d = err.response?.data?.detail;
      toast.error(typeof d === "string" ? d : t("training_plus.errors.checkout"));
    }
    setLoading(false);
  };

  const courseTitle = t(`courses.${course.id}.title`, { defaultValue: course.title });
  const courseDesc = t(`courses.${course.id}.desc`, { defaultValue: course.desc });
  const courseDuration = t("courses.duration_4w");

  return (
    <div className="bg-white rounded-sm p-5 sm:p-6 shadow-[0_8px_24px_-12px_rgba(88,5,5,0.18)] hover:shadow-[0_14px_36px_-12px_rgba(88,5,5,0.28)] transition-shadow duration-300 flex flex-col h-full" data-testid={`course-card-${course.id}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="inline-flex items-center justify-center min-w-[56px] h-10 px-3 font-serif text-lg font-semibold bg-[#C4D2ED] text-[#580505] border border-[#580505]">
          {course.level}
        </div>
      </div>
      <h3 className="font-serif text-lg text-[#2F0808] mt-4 leading-snug">{courseTitle}</h3>
      <div className="mt-3 mb-3 h-px bg-[#580505]/15 w-full" />
      <p className="text-sm text-[#4A4A4A] font-light leading-relaxed flex-grow">{courseDesc}</p>
      <div className="text-xs text-[#580505] mt-3 tracking-wider uppercase font-medium">{courseDuration}</div>

      <div className="mt-4">
        <div className="text-[10px] tracking-[0.18em] uppercase text-[#580505]/70">{t("training_plus.card_price_label")}</div>
        <div className="font-serif text-2xl text-[#580505] mt-0.5">
          {isQuote ? t("training_plus.card_price_quote") : `${course.priceFcfa} F`}
        </div>
      </div>
      {isQuote ? (
        <Link
          to="/contact"
          data-testid={`course-buy-${course.id}`}
          className="mt-5 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-[#580505] border-[1.5px] border-[#580505] text-sm font-semibold hover:bg-[#FAFAFA] transition"
        >
          <ShoppingCart size={14} /> {t("training_plus.card_buy_quote")}
        </Link>
      ) : (
        <button
          onClick={() => onBuy(course.id)}
          disabled={loading}
          data-testid={`course-buy-${course.id}`}
          className="mt-5 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#580505] text-[#C4D2ED] border-[1.5px] border-[#580505] text-sm font-semibold hover:bg-[#2F0808] transition disabled:opacity-60"
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : <ShoppingCart size={14} />}
          {loading ? t("common.redirecting") : t("training_plus.card_buy_course")}
        </button>
      )}
    </div>
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

      {/* COURS DE LANGUES — Produits individuels par sous-niveau */}
      <section className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16">
        <div className="flex items-center gap-3 mb-3">
          <GraduationCap className="text-[#580505]" size={28} strokeWidth={1.5} />
          <Eyebrow>{t("training_plus.courses_eyebrow")}</Eyebrow>
        </div>
        <h2 className="font-serif text-3xl lg:text-4xl text-[#2F0808] uppercase tracking-tight">
          {t("training_plus.courses_title")}
        </h2>
        <p className="mt-3 text-[#4A4A4A] max-w-3xl font-light">
          {t("training_plus.courses_intro")}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          {LANGUAGE_COURSES.map((c) => (
            <CourseProductCard key={c.id} course={c} />
          ))}
        </div>

        <p className="mt-8 text-xs text-[#4A4A4A]">
          {t("training_plus.courses_note")}
        </p>
      </section>

      {/* COURS PRÉPARATOIRES — redirection vers MPK Exam Prep */}
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

      {/* NIVEAU COMPLET (option groupée) */}
      <section className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16">
        <Eyebrow>{t("training_plus.full_eyebrow")}</Eyebrow>
        <h2 className="font-serif text-3xl text-[#2F0808] mt-3 uppercase tracking-tight">{t("training_plus.full_title")}</h2>
        <p className="mt-3 text-[#4A4A4A] max-w-3xl font-light">{t("training_plus.full_intro")}</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-8">
          {SEMI_FULL.map((r) => (
            <div key={r.level} className={`mpk-card p-6 ${r.level === "B1" ? "border-[#580505] bg-[#FAFAFA]" : ""}`}>
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
      </section>

      {/* BUNDLES */}
      <section className="bg-[#FAFAFA] border-y border-[#580505]/10">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16">
          <Eyebrow>{t("training_plus.bundles_eyebrow")}</Eyebrow>
          <h2 className="font-serif text-3xl text-[#2F0808] mt-3 uppercase tracking-tight">{t("training_plus.bundles_title")}</h2>
          <p className="mt-3 text-[#4A4A4A] max-w-2xl font-light">{t("training_plus.bundles_intro")}</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
            {BUNDLES.map((b) => (
              <div key={b.id} className={`mpk-card p-7 relative ${b.featured ? "border-[#580505]" : ""}`}>
                {b.featured && <div className="absolute top-0 right-0 bg-[#580505] text-white text-[10px] tracking-[0.2em] uppercase px-3 py-1">{t("training_plus.bundles_best")}</div>}
                <Eyebrow>{b.weeks}</Eyebrow>
                <h3 className="font-serif text-2xl text-[#2F0808] mt-2">{b.title}</h3>
                <div className="text-sm text-[#550000] mt-1">{b.levels}</div>
                <div className="flex items-baseline gap-3 mt-5">
                  <span className="text-[#4A4A4A] line-through text-sm">{b.normal} F</span>
                  <span className="text-[#580505] font-serif text-2xl">{b.discounted} F</span>
                </div>
                <div className="text-xs text-[#580505] mt-1">{t("training_plus.bundles_save", { save: b.save })}</div>
                <Link to="/boutique" data-testid={`bundle-${b.id}`} className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 bg-[#580505] text-[#C4D2ED] border-[1.5px] border-[#580505] text-sm font-semibold hover:bg-[#2F0808] transition">
                  {t("training_plus.bundles_choose")}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PREMIUM VIP */}
      <section className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16">
        <Eyebrow>{t("training_plus.vip_eyebrow")}</Eyebrow>
        <h2 className="font-serif text-3xl text-[#2F0808] mt-3 uppercase tracking-tight">{t("training_plus.vip_title")}</h2>
        <p className="mt-3 text-[#4A4A4A] max-w-3xl font-light">{t("training_plus.vip_intro")}</p>
        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          <div>
            <h3 className="font-serif text-xl text-[#580505] mb-4">{t("training_plus.vip_sublevels_title")}</h3>
            <PricingTable
              headers={[t("training_plus.vip_table_h_sublevel"), t("training_plus.vip_table_h_duration"), t("training_plus.vip_table_h_ue"), t("training_plus.vip_table_h_price")]}
              rows={VIP_SUBLEVELS.map((r) => [r.level, t("training_plus.vip_weeks_short", { n: r.weeks }), t("training_plus.vip_ue_short", { n: r.ue }), `${r.fcfa} F`])}
            />
          </div>
          <div>
            <h3 className="font-serif text-xl text-[#580505] mb-4">{t("training_plus.vip_full_title")}</h3>
            <PricingTable
              headers={[t("training_plus.vip_table_h_level"), t("training_plus.vip_table_h_price")]}
              rows={[...VIP_FULL.map((r) => [r.level, `${r.fcfa} F`]), ["C1", t("training_plus.vip_c1_on_request")]]}
            />
          </div>
        </div>
      </section>

      <section className="bg-[#FAFAFA] border-y border-[#580505]/10">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16">
          <Eyebrow>{t("training_plus.vip_int_eyebrow")}</Eyebrow>
          <h2 className="font-serif text-3xl text-[#2F0808] mt-3 uppercase tracking-tight">{t("training_plus.vip_int_title")}</h2>
          <p className="mt-3 text-[#4A4A4A] max-w-3xl font-light">{t("training_plus.vip_int_intro")}</p>
          <div className="mt-6 max-w-2xl">
            <PricingTable
              headers={[t("training_plus.vip_table_h_level"), t("training_plus.vip_table_h_ue"), t("training_plus.vip_table_h_duration"), t("training_plus.vip_table_h_price")]}
              rows={VIP_INTENSIVE.map((r) => [r.level, t("training_plus.vip_ue_short", { n: r.ue }), t("training_plus.vip_weeks_short", { n: r.weeks }), `${r.fcfa} F`])}
            />
          </div>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16 grid lg:grid-cols-3 gap-5">
        <ComingSoon title={t("training_plus.coming_english")} />
        <ComingSoon title={t("training_plus.coming_french")} />
        <ComingSoon title={t("training_plus.coming_chinese")} />
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
