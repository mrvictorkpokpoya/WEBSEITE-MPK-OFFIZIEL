import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { LOGO_MARK } from "@/lib/data";

const LANGS = [
  { code: "fr", label: "FR" },
  { code: "en", label: "EN" },
  { code: "de", label: "DE" },
];

function LangSwitcher({ onChange }) {
  const { i18n, t } = useTranslation();
  const current = (i18n.language || "fr").split("-")[0];
  const [open, setOpen] = useState(false);

  const select = (code) => {
    i18n.changeLanguage(code);
    setOpen(false);
    if (onChange) onChange();
  };

  return (
    <div className="relative" data-testid="lang-switcher">
      <button
        onClick={() => setOpen(!open)}
        aria-label={t("lang.switch")}
        className="flex items-center gap-1.5 px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#2F0808] hover:text-[#580505] border border-[#580505]/20 hover:border-[#580505]/40 transition"
      >
        <Globe size={13} />
        {current.toUpperCase()}
        <ChevronDown size={11} />
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-1 bg-white border border-[#580505]/15 shadow-lg py-1 min-w-[120px] z-50">
          {LANGS.map((l) => (
            <button
              key={l.code}
              data-testid={`lang-${l.code}`}
              onClick={() => select(l.code)}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-[#FAFAFA] ${current === l.code ? "text-[#580505] font-semibold" : "text-[#2F0808]"}`}
            >
              {l.code.toUpperCase()} — {t(`lang.${l.code}`)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);
  const { user, logout } = useAuth();
  const { t } = useTranslation();

  const navGroups = [
    { key: "institute", label: t("nav.institute"), items: [
      { to: "/", label: t("nav.home") },
      { to: "/a-propos", label: t("nav.about") },
      { to: "/notre-histoire", label: t("nav.history") },
      { to: "/team", label: t("nav.team") },
      { to: "/campus", label: t("nav.campuses") },
      { to: "/appel-a-investissement", label: t("nav.investment") },
    ]},
    { key: "service", label: t("nav.service"), items: [
      { to: "/departements/training-plus", label: t("nav.training_plus") },
      { to: "/departements/exam-prep", label: t("nav.exam_prep") },
      { to: "/departements/translation-pro", label: t("nav.translation_pro") },
      { to: "/departements/consulting-pro", label: t("nav.consulting_pro") },
      { to: "/departements/tourism", label: t("nav.tourism") },
      { to: "/departements/extra-services", label: t("nav.extra_services") },
      { to: "/cours-en-ligne", label: t("nav.online_courses") },
      { to: "/boutique", label: t("nav.shop") },
    ]},
    { key: "community", label: t("nav.community"), items: [
      { to: "/alumnis", label: t("nav.alumnis") },
      { to: "/clubs", label: t("nav.clubs") },
      { to: "/blog", label: t("nav.blog") },
      { to: "/galerie", label: t("nav.gallery") },
      { to: "/temoignages", label: t("nav.testimonials") },
      { to: "/actualites", label: t("nav.news") },
      { to: "/telechargements", label: t("nav.downloads") },
      { to: "/reseaux", label: t("nav.social") },
    ]},
    { key: "contact", label: t("nav.contact"), to: "/contact" },
  ];

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
            <div key={g.key} className="relative" onMouseEnter={() => setActive(g.key)} onMouseLeave={() => setActive(null)}>
              <button data-testid={`nav-${g.key}`} className="flex items-center gap-1 px-4 py-2 text-sm font-medium uppercase tracking-wider text-[#2F0808] hover:text-[#580505]">
                {g.label} <ChevronDown size={14} />
              </button>
              {active === g.key && (
                <div className="absolute top-full left-0 min-w-[260px] bg-white border border-[#580505]/15 shadow-lg py-2">
                  {g.items.map((it) => (
                    <Link key={it.to} to={it.to} data-testid={`nav-sub-${it.to}`} className="block px-4 py-2.5 text-sm text-[#2F0808] hover:bg-[#FAFAFA] hover:text-[#580505]">
                      {it.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <NavLink key={g.key} to={g.to} data-testid={`nav-${g.key}`} className={({isActive}) => `px-4 py-2 text-sm font-medium uppercase tracking-wider ${isActive ? 'text-[#580505]' : 'text-[#2F0808] hover:text-[#580505]'}`}>
              {g.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <LangSwitcher />
          {user ? (
            <>
              <Link data-testid="header-dashboard" to="/espace-apprenant" className="text-sm text-[#580505]">{user.name || user.email}</Link>
              <button data-testid="header-logout" onClick={logout} className="text-sm text-[#2F0808] hover:text-[#580505]">{t("nav.logout")}</button>
            </>
          ) : (
            <Link data-testid="header-login" to="/connexion" className="text-sm text-[#2F0808] hover:text-[#580505]">{t("nav.login")}</Link>
          )}
          <Link data-testid="header-register-cta" to="/contact" className="btn-primary text-sm">{t("nav.register")}</Link>
        </div>

        <button data-testid="header-mobile-toggle" className="lg:hidden text-[#2F0808]" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-[#580505]/10 bg-white max-h-[80vh] overflow-y-auto">
          <div className="px-5 py-4 space-y-1">
            <div className="flex justify-end pb-2 border-b border-[#580505]/10 mb-2">
              <LangSwitcher onChange={() => setOpen(false)} />
            </div>
            {navGroups.map((g) => g.items ? (
              <details key={g.key} className="group">
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
              <Link key={g.key} to={g.to} onClick={() => setOpen(false)} className="block py-2 text-[#2F0808] font-medium">{g.label}</Link>
            ))}
            <div className="pt-3 border-t border-[#580505]/10 flex flex-col gap-2">
              {user ? (
                <>
                  <Link to="/espace-apprenant" onClick={() => setOpen(false)} className="text-sm text-[#580505]">{user.name || user.email}</Link>
                  <button onClick={() => { logout(); setOpen(false); }} className="text-sm text-left text-[#2F0808]">{t("nav.logout")}</button>
                </>
              ) : (
                <Link to="/connexion" onClick={() => setOpen(false)} className="text-sm text-[#2F0808]">{t("nav.login")}</Link>
              )}
              <Link to="/contact" onClick={() => setOpen(false)} className="btn-primary text-sm justify-center">{t("nav.register")}</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
