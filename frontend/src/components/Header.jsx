import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { LOGO_MARK } from "@/lib/data";

const navGroups = [
  { label: "L'Institut", items: [
    { to: "/", label: "Accueil" },
    { to: "/a-propos", label: "À propos" },
    { to: "/notre-histoire", label: "Notre histoire" },
    { to: "/team", label: "La Team MPK" },
    { to: "/campus", label: "Nos Campus" },
    { to: "/appel-a-investissement", label: "Appel à investissement" },
  ]},
  { label: "Service", items: [
    { to: "/departements/training-plus", label: "MPK Training Plus" },
    { to: "/departements/exam-prep", label: "MPK Exam Prep" },
    { to: "/departements/translation-pro", label: "MPK Translation Pro" },
    { to: "/departements/consulting-pro", label: "MPK Consulting Pro" },
    { to: "/departements/tourism", label: "MPK Tourism Programm" },
    { to: "/departements/extra-services", label: "MPK Extra Services" },
    { to: "/cours-en-ligne", label: "Cours en ligne" },
    { to: "/boutique", label: "Boutique M" },
  ]},
  { label: "Communauté", items: [
    { to: "/alumnis", label: "MPK World Alumnis" },
    { to: "/galerie", label: "Galerie photos & vidéos" },
    { to: "/temoignages", label: "Témoignages" },
    { to: "/actualites", label: "Actualités & Concours" },
    { to: "/reseaux", label: "Nos réseaux sociaux" },
  ]},
  { label: "Contact", to: "/contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);
  const { user, logout } = useAuth();

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur border-b border-[#580505]/10">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-10 h-16 lg:h-20 flex items-center justify-between">
        <Link to="/" data-testid="header-logo" className="flex items-center gap-3">
          <img src={LOGO_MARK} alt="MPK — Institut de Langues MULTIPLIKATOR" className="h-10 lg:h-12 w-auto" />
          <div className="leading-tight hidden sm:block">
            <div className="text-[#2F0808] text-lg font-semibold tracking-tight">MULTIPLIKATOR</div>
            <div className="text-[10px] tracking-[0.25em] uppercase text-[#550000]">Institut de Langues</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-2">
          {navGroups.map((g) => g.items ? (
            <div key={g.label} className="relative" onMouseEnter={() => setActive(g.label)} onMouseLeave={() => setActive(null)}>
              <button data-testid={`nav-${g.label}`} className="flex items-center gap-1 px-4 py-2 text-sm font-medium uppercase tracking-wider text-[#2F0808] hover:text-[#580505]">
                {g.label} <ChevronDown size={14} />
              </button>
              {active === g.label && (
                <div className="absolute top-full left-0 min-w-[260px] bg-white border border-[#580505]/15 shadow-lg py-2">
                  {g.items.map((it) => it.divider ? (
                    <div key={it.label} className="px-4 pt-3 pb-1 mt-1 border-t border-[#580505]/10 text-[10px] tracking-[0.2em] uppercase text-[#580505]/70 font-medium">{it.label}</div>
                  ) : (
                    <Link key={it.to} to={it.to} data-testid={`nav-sub-${it.to}`} className="block px-4 py-2.5 text-sm text-[#2F0808] hover:bg-[#FAFAFA] hover:text-[#580505]">
                      {it.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <NavLink key={g.to} to={g.to} data-testid={`nav-${g.label}`} className={({isActive}) => `px-4 py-2 text-sm font-medium uppercase tracking-wider ${isActive ? 'text-[#580505]' : 'text-[#2F0808] hover:text-[#580505]'}`}>
              {g.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          {user ? (
            <>
              <Link data-testid="header-dashboard" to="/espace-apprenant" className="text-sm text-[#580505]">{user.name || user.email}</Link>
              <button data-testid="header-logout" onClick={logout} className="text-sm text-[#2F0808] hover:text-[#580505]">Déconnexion</button>
            </>
          ) : (
            <Link data-testid="header-login" to="/connexion" className="text-sm text-[#2F0808] hover:text-[#580505]">Connexion</Link>
          )}
          <Link data-testid="header-register-cta" to="/contact" className="btn-primary text-sm">S'inscrire</Link>
        </div>

        <button data-testid="header-mobile-toggle" className="lg:hidden text-[#2F0808]" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-[#580505]/10 bg-white max-h-[80vh] overflow-y-auto">
          <div className="px-5 py-4 space-y-1">
            {navGroups.map((g) => g.items ? (
              <details key={g.label} className="group">
                <summary className="flex items-center justify-between py-2 cursor-pointer text-[#2F0808] font-medium">
                  {g.label} <ChevronDown size={16} />
                </summary>
                <div className="pl-3 py-1 space-y-1">
                  {g.items.map((it) => (
                    <Link key={it.to} to={it.to} onClick={() => setOpen(false)} className="block py-1.5 text-sm text-[#550000]">{it.label}</Link>
                  ))}
                </div>
              </details>
            ) : (
              <Link key={g.to} to={g.to} onClick={() => setOpen(false)} className="block py-2 text-[#2F0808] font-medium">{g.label}</Link>
            ))}
            <div className="pt-3 border-t border-[#580505]/10 flex flex-col gap-2">
              {user ? (
                <>
                  <Link to="/espace-apprenant" onClick={() => setOpen(false)} className="text-sm text-[#580505]">{user.name || user.email}</Link>
                  <button onClick={() => { logout(); setOpen(false); }} className="text-sm text-left text-[#2F0808]">Déconnexion</button>
                </>
              ) : (
                <Link to="/connexion" onClick={() => setOpen(false)} className="text-sm text-[#2F0808]">Connexion</Link>
              )}
              <Link to="/contact" onClick={() => setOpen(false)} className="btn-primary text-sm justify-center">S'inscrire</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
