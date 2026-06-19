import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useTranslation, Trans } from "react-i18next";
import { Award, ShoppingCart, Loader2, ClipboardCheck, MessageSquareDashed, UsersRound, MessageCircle, Pencil, BookOpen, Headphones, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { PageHero, Eyebrow, CTA, SectionTitle, CleanCard } from "@/components/Common";
import { EXAMS, PREP_COURSES, PREP_PRICING, PREP_MODULES } from "@/lib/data";
import { apiAddToCart } from "@/lib/cart";

const MODULE_ICON = { MessageCircle, Pencil, BookOpen, Headphones };

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

function PrepCard({ course }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const startCheckout = async (packageId) => {
    try {
      const res = await axios.post(`${API}/payments/checkout/session`, {
        package_id: packageId,
        origin_url: window.location.origin,
      });
      if (res.data?.url) window.location.href = res.data.url;
      else toast.error(t("training_plus.errors.no_url"));
    } catch (err) {
      const d = err.response?.data?.detail;
      toast.error(typeof d === "string" ? d : t("training_plus.errors.checkout"));
    }
  };

  const onBuy = async (kind) => {
    setLoading(true);
    await startCheckout(`${course.id}_${kind}`);
    setLoading(false);
  };

  const courseTitle = t(`prep.${course.id}.title`, { defaultValue: course.title });
  const courseDesc = t(`prep.${course.id}.desc`, { defaultValue: course.desc });
  const courseDuration = t("prep.duration_3w");

  return (
    <div data-testid={`prep-card-${course.id}`} className="bg-white rounded-sm p-5 sm:p-6 shadow-[0_8px_24px_-12px_rgba(88,5,5,0.18)] hover:shadow-[0_14px_36px_-12px_rgba(88,5,5,0.28)] transition-shadow duration-300 flex flex-col h-full">
      <div className="flex items-start justify-between gap-3">
        <div className="inline-flex items-center justify-center min-w-[56px] h-10 px-3 font-serif text-lg font-semibold bg-[#580505] text-white whitespace-nowrap">
          {course.level}
        </div>
        <span className="text-[10px] tracking-[0.18em] uppercase text-[#580505]/80 font-medium text-right leading-tight whitespace-nowrap">{course.exam}</span>
      </div>
      <h3 className="font-serif text-lg text-[#2F0808] mt-4 leading-snug">{courseTitle}</h3>
      <div className="mt-3 mb-3 h-px bg-[#580505]/15 w-full" />
      <p className="text-sm text-[#4A4A4A] font-light leading-relaxed flex-grow">{courseDesc}</p>
      <div className="text-xs text-[#580505] mt-3 tracking-wider uppercase font-medium">{courseDuration}</div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
        <div className="bg-[#FAFAFA] px-3 py-2 border border-[#580505]/15">
          <div className="text-[#580505]/70 uppercase tracking-wider text-[10px]">{t("exam_prep.internal")}</div>
          <div className="font-serif text-[#2F0808] text-sm font-semibold mt-0.5">{PREP_PRICING[course.level].interne} F</div>
        </div>
        <div className="bg-[#FAFAFA] px-3 py-2 border border-[#580505]/15">
          <div className="text-[#580505]/70 uppercase tracking-wider text-[10px]">{t("exam_prep.external")}</div>
          <div className="font-serif text-[#2F0808] text-sm font-semibold mt-0.5">{PREP_PRICING[course.level].externe} F</div>
        </div>
        <div className="bg-[#FAFAFA] px-3 py-2 border border-[#580505]/15 col-span-2">
          <div className="text-[#580505]/70 uppercase tracking-wider text-[10px]">{t("exam_prep.volume")}</div>
          <div className="font-serif text-[#2F0808] text-sm font-semibold mt-0.5">{PREP_PRICING[course.level].temps}</div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          onClick={() => onBuy("int")}
          disabled={loading}
          data-testid={`prep-buy-${course.id}-int`}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-[#580505] text-[#C4D2ED] border-[1.5px] border-[#580505] text-xs font-semibold hover:bg-[#2F0808] transition disabled:opacity-60"
        >
          {loading ? <Loader2 size={12} className="animate-spin" /> : <ShoppingCart size={12} />} {t("exam_prep.buy_internal")}
        </button>
        <button
          onClick={() => onBuy("ext")}
          disabled={loading}
          data-testid={`prep-buy-${course.id}-ext`}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-white text-[#580505] border-[1.5px] border-[#580505] text-xs font-semibold hover:bg-[#FAFAFA] transition disabled:opacity-60"
        >
          {loading ? <Loader2 size={12} className="animate-spin" /> : <ShoppingCart size={12} />} {t("exam_prep.buy_external")}
        </button>
        <button
          onClick={async () => { try { await apiAddToCart(`${course.id}_int`); toast.success("Ajouté au panier"); } catch { toast.error("Erreur ajout"); } }}
          data-testid={`prep-cart-${course.id}-int`}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-white text-[#580505] border-[1.5px] border-[#580505]/40 text-[10px] font-semibold hover:border-[#580505] hover:bg-[#FAFAFA] transition"
        >
          <Plus size={10} /> Panier (Interne)
        </button>
        <button
          onClick={async () => { try { await apiAddToCart(`${course.id}_ext`); toast.success("Ajouté au panier"); } catch { toast.error("Erreur ajout"); } }}
          data-testid={`prep-cart-${course.id}-ext`}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-white text-[#580505] border-[1.5px] border-[#580505]/40 text-[10px] font-semibold hover:border-[#580505] hover:bg-[#FAFAFA] transition"
        >
          <Plus size={10} /> Panier (Externe)
        </button>
      </div>
    </div>
  );
}

export default function ExamPrep() {
  const { t } = useTranslation();
  return (
    <>
      <PageHero
        eyebrow={t("exam_prep.hero_eyebrow")}
        title={t("exam_prep.hero_title")}
        kicker={t("exam_prep.hero_kicker")}
      />

      {/* COURS PRÉPARATOIRES — Goethe + ÖSD */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-12 lg:py-16">
        <div className="flex items-center gap-3 mb-3">
          <Award className="text-[#580505]" size={26} strokeWidth={1.5} />
          <Eyebrow>{t("exam_prep.courses_eyebrow")}</Eyebrow>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#2F0808] uppercase tracking-tight">{t("exam_prep.courses_title")}</h2>
        <p className="mt-3 text-[#4A4A4A] max-w-3xl font-light text-sm sm:text-base leading-relaxed">
          <Trans i18nKey="exam_prep.courses_intro" components={{ strong: <strong /> }} />
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-8 lg:mt-10">
          {PREP_COURSES.map((c) => (
            <PrepCard key={c.id} course={c} />
          ))}
        </div>
        <p className="mt-6 text-xs text-[#580505] font-medium tracking-wide">
          {t("exam_prep.note")}
        </p>
      </section>

      {/* MODULES INDIVIDUELS */}
      <section className="bg-[#FAFAFA] border-y border-[#580505]/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-12 lg:py-16">
          <Eyebrow>{t("exam_prep.modules_eyebrow")}</Eyebrow>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl mt-3 text-[#2F0808] uppercase tracking-tight">{t("exam_prep.modules_title")}</h2>
          <p className="mt-3 text-[#4A4A4A] max-w-3xl font-light text-sm sm:text-base leading-relaxed">
            {t("exam_prep.modules_intro")}
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-8 lg:mt-10">
            {PREP_MODULES.map((m) => {
              const Icon = MODULE_ICON[m.icon] || MessageCircle;
              const mTitle = t(`modules.${m.id}.title`, { defaultValue: m.title });
              const mComp = t(`modules.${m.id}.competence`, { defaultValue: m.competence });
              const mDesc = t(`modules.${m.id}.desc`, { defaultValue: m.desc });
              return (
                <article
                  key={m.id}
                  data-testid={`module-card-${m.id}`}
                  className="bg-white rounded-sm p-5 sm:p-6 shadow-[0_8px_24px_-12px_rgba(88,5,5,0.18)] hover:shadow-[0_14px_36px_-12px_rgba(88,5,5,0.28)] transition-shadow duration-300 flex flex-col h-full"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#F4F0F0] grid place-items-center">
                      <Icon className="text-[#580505]" size={20} strokeWidth={1.5} />
                    </div>
                    <span className="text-[10px] tracking-[0.18em] uppercase text-[#580505]/80 font-medium">{m.short}</span>
                  </div>
                  <h3 className="font-serif text-lg text-[#2F0808] mt-4 leading-snug">{mTitle}</h3>
                  <div className="mt-3 mb-3 h-px bg-[#580505]/15 w-full" />
                  <div className="text-[10px] tracking-[0.18em] uppercase text-[#580505]/70 font-medium mb-2">{mComp}</div>
                  <p className="text-sm text-[#4A4A4A] font-light leading-relaxed flex-grow">{mDesc}</p>
                  <div className="mt-4 text-[10px] tracking-[0.18em] uppercase text-[#580505]/70 font-medium">{t("exam_prep.price_label")}</div>
                  <div className="font-serif text-xl text-[#580505] mt-0.5">{t("training_plus.card_price_quote")}</div>
                  <Link
                    to="/contact"
                    data-testid={`module-quote-${m.id}`}
                    className="mt-5 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-[#580505] border-[1.5px] border-[#580505] text-sm font-semibold hover:bg-[#FAFAFA] transition"
                  >
                    <ShoppingCart size={14} /> {t("exam_prep.quote_request")}
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* AUTRES EXAMENS */}
      <section className="bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-12 lg:py-16">
          <Eyebrow>{t("exam_prep.exams_eyebrow")}</Eyebrow>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#2F0808] mt-3 uppercase tracking-tight">{t("exam_prep.exams_title")}</h2>
          <div className="scroll-x mt-8">
            <table className="mpk-table min-w-[720px]">
              <thead><tr><th>{t("exam_prep.exams_table_exam")}</th><th>{t("exam_prep.exams_table_lang")}</th><th>{t("exam_prep.exams_table_level")}</th><th>{t("exam_prep.exams_table_org")}</th></tr></thead>
              <tbody>
                {EXAMS.map((e, i) => (
                  <tr key={i}>
                    <td className="font-medium text-[#2F0808]">{e.exam}</td>
                    <td>{e.lang}</td>
                    <td>{e.level}</td>
                    <td className="text-[#4A4A4A]">{e.org}</td>
                  </tr>
                ))}
                <tr><td>{t("exam_prep.exams_others")}</td><td>{t("exam_prep.exams_on_request")}</td><td>—</td><td>—</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* APPROCHE */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-12 lg:py-16">
        <Eyebrow>{t("exam_prep.approach_eyebrow")}</Eyebrow>
        <h2 className="font-serif text-2xl sm:text-3xl text-[#2F0808] mt-3 uppercase tracking-tight">{t("exam_prep.approach_title")}</h2>
        <div className="grid sm:grid-cols-3 gap-4 sm:gap-5 mt-8 lg:mt-10">
          <CleanCard icon={ClipboardCheck} title={t("exam_prep.approach_1_t")}>
            {t("exam_prep.approach_1_d")}
          </CleanCard>
          <CleanCard icon={MessageSquareDashed} title={t("exam_prep.approach_2_t")}>
            {t("exam_prep.approach_2_d")}
          </CleanCard>
          <CleanCard icon={UsersRound} title={t("exam_prep.approach_3_t")}>
            {t("exam_prep.approach_3_d")}
          </CleanCard>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-12 lg:py-16 text-center">
        <SectionTitle title={t("exam_prep.cta_title")} center caps />
        <div className="flex justify-center gap-3 sm:gap-4 flex-wrap">
          <CTA to="/contact" label={t("exam_prep.cta_register")} testid="exam-cta-register" />
          <CTA to="/contact" label={t("exam_prep.cta_quote")} variant="ghost" testid="exam-cta-quote" />
        </div>
      </section>
    </>
  );
}
