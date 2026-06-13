import React from "react";
import { Link } from "react-router-dom";
import { Mail, MessageCircle } from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok, FaLinkedinIn, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import { CAMPUSES, CONTACT_INFO, LOGO_MARK } from "@/lib/data";

const SOCIAL_LINKS = [
  { name: "facebook", url: "https://facebook.com", Icon: FaFacebookF },
  { name: "instagram", url: "https://instagram.com", Icon: FaInstagram },
  { name: "youtube", url: "https://youtube.com", Icon: FaYoutube },
  { name: "tiktok", url: "https://tiktok.com", Icon: FaTiktok },
  { name: "linkedin", url: "https://linkedin.com", Icon: FaLinkedinIn },
  { name: "telegram", url: "https://t.me", Icon: FaTelegramPlane },
  { name: "whatsapp", url: "https://wa.me/2290196593866", Icon: FaWhatsapp },
];

function FooterTitle({ children }) {
  return <div className="text-[14px] tracking-[0.22em] uppercase font-semibold text-[#C4D2ED] mb-5 leading-none">{children}</div>;
}

export default function Footer() {
  return (
    <footer className="bg-[#2F0808] text-white mt-32">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16 grid lg:grid-cols-12 gap-10">
        {/* Brand block — MULTIPLIKATOR aligned with top line of logo */}
        <div className="lg:col-span-4">
          <div className="flex items-start gap-4 mb-5">
            <div className="bg-white p-2 inline-flex flex-shrink-0">
              <img src={LOGO_MARK} alt="MPK — Institut de Langues MULTIPLIKATOR" className="h-14 w-auto" />
            </div>
            <div className="flex flex-col justify-between h-[72px] py-0.5">
              <div className="font-serif text-[14px] tracking-[0.22em] uppercase font-semibold text-[#C4D2ED] leading-none">MULTIPLIKATOR</div>
              <div className="text-[11px] tracking-[0.3em] uppercase text-white/70 leading-none">Institut de Langues</div>
            </div>
          </div>
          <p className="text-white/70 leading-relaxed font-light mt-2">
            Réseau d'instituts de langues multi-campus, fondé en 2021 au Bénin.
            Excellence académique, accompagnement vers la mobilité internationale.
          </p>
          <div className="flex items-center gap-2.5 mt-6 flex-wrap">
            {SOCIAL_LINKS.map((s) => (
              <a key={s.name} href={s.url} target="_blank" rel="noreferrer" data-testid={`footer-${s.name}`} className="w-9 h-9 grid place-items-center border border-white/30 hover:bg-white hover:text-[#580505] transition"><s.Icon size={15} /></a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3">
          <FooterTitle>Navigation</FooterTitle>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link to="/a-propos" className="hover:text-white">À propos</Link></li>
            <li><Link to="/campus" className="hover:text-white">Nos Campus</Link></li>
            <li><Link to="/departements/training-plus" className="hover:text-white">Formations</Link></li>
            <li><Link to="/cours-en-ligne" className="hover:text-white">Cours en ligne</Link></li>
            <li><Link to="/boutique" className="hover:text-white">Boutique & Cartes Cadeaux</Link></li>
            <li><Link to="/actualites" className="hover:text-white">Actualités</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <FooterTitle>Nos Campus</FooterTitle>
          <ul className="space-y-2 text-sm text-white/80">
            {CAMPUSES.map((c) => (
              <li key={c.id}><Link to={`/campus#${c.id}`} className="hover:text-white">{c.area}</Link></li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <FooterTitle>Contact</FooterTitle>
          <ul className="space-y-3 text-sm text-white/80">
            <li className="flex items-center gap-2"><Mail size={14} className="flex-shrink-0" /> <span className="break-all">{CONTACT_INFO.email}</span></li>
            <li className="flex items-center gap-2"><FaWhatsapp size={14} className="flex-shrink-0 text-[#25D366]" /> <span className="whitespace-nowrap">{CONTACT_INFO.phones[0]}</span></li>
            <li className="flex items-center gap-2"><FaTelegramPlane size={14} className="flex-shrink-0 text-[#C4D2ED]" /> <span className="whitespace-nowrap">{CONTACT_INFO.phones[1]}</span></li>
            <li><a href={`https://wa.me/${CONTACT_INFO.whatsapp}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 mt-2 px-3 py-2 bg-[#C4D2ED] text-[#580505] border border-[#580505] text-xs font-semibold" data-testid="footer-wa-cta"><MessageCircle size={14} /> WhatsApp direct</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-5 text-xs text-white/60 flex flex-col sm:flex-row sm:justify-between gap-2">
          <div data-testid="footer-copyright">© MULTIPLIKATOR START UP GROUP</div>
          <div className="flex items-center gap-4">
            <Link to="/confidentialite" className="hover:text-white">Politique de confidentialité</Link>
            <span className="text-white/30">·</span>
            <Link to="/traitement-donnees" className="hover:text-white">Traitement des données</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
