import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";
import { PageHero, Eyebrow } from "@/components/Common";

const CARD_LINKS = ["/cours-en-ligne", "/departements/exam-prep", "/departements/consulting-pro"];

export default function Dashboard() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const cards = t("auth.dashboard.cards", { returnObjects: true });
  return (
    <>
      <PageHero
        eyebrow={t("auth.dashboard.hero_eyebrow")}
        title={t("auth.dashboard.hero_welcome", { name: user?.name || user?.email || "" })}
        kicker={t("auth.dashboard.hero_kicker")}
      />
      <section className="max-w-[1400px] mx-auto px-5 lg:px-10 py-12 grid lg:grid-cols-3 gap-5">
        {cards.map((c, i) => (
          <Link key={i} to={CARD_LINKS[i]} className="mpk-card p-7 hover:border-[#580505]">
            <Eyebrow>0{i+1}</Eyebrow>
            <h3 className="font-serif text-2xl mt-2 text-[#2F0808]">{c.t}</h3>
            <p className="mt-3 text-[#4A4A4A] font-light">{c.d}</p>
          </Link>
        ))}
      </section>
      <section className="max-w-[1400px] mx-auto px-5 lg:px-10 py-12">
        <button data-testid="dashboard-logout" onClick={logout} className="btn-ghost">{t("auth.dashboard.logout")}</button>
      </section>
    </>
  );
}
