import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PageHero, Eyebrow, CTA, SectionTitle } from "@/components/Common";
import { Trophy, Users, Languages, MessageSquare } from "lucide-react";
import { FaFutbol, FaBasketballBall, FaVolleyballBall } from "react-icons/fa";

const SPORT_CLUBS = [
  { id: "mfc", abbr: "MFC", nameKey: "MPK Football Club", Icon: FaFutbol, descKey: "mfc_desc", accent: "#1B7A37" },
  { id: "mbc", abbr: "MBC", nameKey: "MPK Basketball Club", Icon: FaBasketballBall, descKey: "mbc_desc", accent: "#D96A00" },
  { id: "mvc", abbr: "MVC", nameKey: "MPK Volleyball Club", Icon: FaVolleyballBall, descKey: "mvc_desc", accent: "#1564B5" },
];

const LANGUAGE_CLUBS = [
  { id: "mec", abbr: "MEC", nameKey: "MPK English Club", Icon: MessageSquare, descKey: "mec_desc", accent: "#580505" },
  { id: "mdk", abbr: "MDK", nameKey: "MPK Deutschklub", Icon: Languages, descKey: "mdk_desc", accent: "#2F0808" },
];

function ClubCard({ club }) {
  const { t } = useTranslation();
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
      <h3 className="font-serif text-xl text-[#2F0808] mt-5 leading-snug">{club.nameKey}</h3>
      <div className="mt-3 mb-3 h-px" style={{ background: `${accent}22` }} />
      <p className="text-sm text-[#4A4A4A] font-light leading-relaxed flex-grow">{t(`clubs_page.${club.descKey}`)}</p>
      <Link
        to="/contact"
        data-testid={`club-join-${club.id}`}
        className="mt-6 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-white border-[1.5px] text-sm font-semibold transition"
        style={{ background: accent, borderColor: accent }}
      >
        {t("clubs_page.join_btn")}
      </Link>
    </article>
  );
}

export default function MpkClubs() {
  const { t } = useTranslation();
  return (
    <>
      <PageHero
        eyebrow={t("clubs_page.hero_eyebrow")}
        title={t("clubs_page.hero_title")}
        kicker={t("clubs_page.hero_kicker")}
      />

      <section className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-12 lg:py-16">
        <div className="flex items-center gap-3 mb-3">
          <Trophy className="text-[#580505]" size={28} strokeWidth={1.5} />
          <Eyebrow>{t("clubs_page.sport_eyebrow")}</Eyebrow>
        </div>
        <h2 className="font-serif text-3xl lg:text-4xl text-[#2F0808] uppercase tracking-tight">{t("clubs_page.sport_title")}</h2>
        <p className="mt-3 text-[#4A4A4A] max-w-3xl font-light leading-relaxed">{t("clubs_page.sport_kicker")}</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {SPORT_CLUBS.map((c) => <ClubCard key={c.id} club={c} />)}
        </div>
      </section>

      <section className="bg-[#FAFAFA] border-y border-[#580505]/15">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-12 lg:py-16">
          <div className="flex items-center gap-3 mb-3">
            <Users className="text-[#580505]" size={28} strokeWidth={1.5} />
            <Eyebrow>{t("clubs_page.lang_eyebrow")}</Eyebrow>
          </div>
          <h2 className="font-serif text-3xl lg:text-4xl text-[#2F0808] uppercase tracking-tight">{t("clubs_page.lang_title")}</h2>
          <p className="mt-3 text-[#4A4A4A] max-w-3xl font-light leading-relaxed">{t("clubs_page.lang_kicker")}</p>
          <div className="grid sm:grid-cols-2 gap-5 mt-10">
            {LANGUAGE_CLUBS.map((c) => <ClubCard key={c.id} club={c} />)}
          </div>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-5 lg:px-10 py-20 text-center">
        <SectionTitle eyebrow={t("clubs_page.cta_eyebrow")} title={t("clubs_page.cta_title")} center caps />
        <div className="flex justify-center gap-4 flex-wrap">
          <CTA to="/contact" label={t("clubs_page.cta_join")} testid="clubs-cta-join" />
          <CTA to="/reseaux-sociaux" label={t("clubs_page.cta_social")} variant="ghost" testid="clubs-cta-social" />
        </div>
      </section>
    </>
  );
}
