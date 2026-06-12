import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { PageHero, Eyebrow } from "@/components/Common";

export default function Dashboard() {
  const { user, logout } = useAuth();
  return (
    <>
      <PageHero eyebrow="Espace apprenant" title={`Bienvenue, ${user?.name || user?.email}`} kicker="Votre tableau de bord centralise vos formations, certifications et démarches mobilité." />
      <section className="max-w-[1400px] mx-auto px-5 lg:px-10 py-12 grid lg:grid-cols-3 gap-5">
        {[
          { t: "Mes formations", d: "Suivez vos cours en présentiel ou en ligne. Bientôt disponible.", to: "/cours-en-ligne" },
          { t: "Mes certifications", d: "Préparation en cours et résultats officiels. Bientôt disponible.", to: "/departements/exam-prep" },
          { t: "Mobilité & démarches", d: "Suivi de vos dossiers visa, FSJ, Au Pair. Bientôt disponible.", to: "/departements/consulting-pro" },
        ].map((c, i) => (
          <Link key={i} to={c.to} className="mpk-card p-7 hover:border-[#580505]">
            <Eyebrow>0{i+1}</Eyebrow><h3 className="font-serif text-2xl mt-2 text-[#2F0808]">{c.t}</h3><p className="mt-3 text-[#4A4A4A] font-light">{c.d}</p>
          </Link>
        ))}
      </section>
      <section className="max-w-[1400px] mx-auto px-5 lg:px-10 py-12">
        <button data-testid="dashboard-logout" onClick={logout} className="btn-ghost">Se déconnecter</button>
      </section>
    </>
  );
}
