import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Mail, MessageCircle } from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok, FaLinkedinIn, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import { CAMPUSES, CONTACT_INFO, LOGO_MARK, SOCIAL_URLS } from "@/lib/data";

const SOCIAL_LINKS = [
  { name: "facebook", url: SOCIAL_URLS.facebook, Icon: FaFacebookF },
  { name: "instagram", url: SOCIAL_URLS.instagram, Icon: FaInstagram },
  { name: "youtube", url: SOCIAL_URLS.youtube, Icon: FaYoutube },
  { name: "tiktok", url: SOCIAL_URLS.tiktok, Icon: FaTiktok },
  { name: "linkedin", url: SOCIAL_URLS.linkedin, Icon: FaLinkedinIn },
  { name: "telegram", url: SOCIAL_URLS.telegram, Icon: FaTelegramPlane },
  { name: "whatsapp", url: SOCIAL_URLS.whatsapp, Icon: FaWhatsapp },
];

function FooterTitle({ children }) {
  return <div className="text-[12px] tracking-[0.22em] uppercase font-semibold text-[#C4D2ED] mb-4 leading-none">{children}</div>;
}

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-[#2F0808] text-white mt-32">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <div className="flex items-start gap-4 mb-5">
            <div className="bg-white p-2 inline-flex flex-shrink-0">
              <img src={LOGO_MARK} alt="MPK — Institut de Langues MULTIPLIKATOR" className="h-12 w-auto" />
            </div>
            <div className="leading-tight pt-0.5">
              <div className="font-serif text-2xl text-white">MULTIPLIKATOR</div>
              <div className="text-[11px] tracking-[0.3em] uppercase text-white/70 mt-1">Institut de Langues</div>
            </div>
          </div>
          <p className="text-white/70 leading-relaxed font-light text-sm mt-2">
            {t("footer.tagline")}
          </p>
          <div className="flex items-center gap-2.5 mt-6 flex-wrap">
            {SOCIAL_LINKS.map((s) => (
              <a key={s.name} href={s.url} target="_blank" rel="noreferrer" data-testid={`footer-${s.name}`} className="w-9 h-9 grid place-items-center border border-white/30 hover:bg-white hover:text-[#580505] transition"><s.Icon size={15} /></a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <FooterTitle>{t("footer.navigation")}</FooterTitle>
          <ul className="space-y-2 text-[13px] text-white/80">
            <li><Link to="/a-propos" className="hover:text-white">{t("nav.about")}</Link></li>
            <li><Link to="/campus" className="hover:text-white">{t("nav.campuses")}</Link></li>
            <li><Link to="/departements/training-plus" className="hover:text-white">{t("nav.training_plus")}</Link></li>
            <li><Link to="/cours-en-ligne" className="hover:text-white">{t("nav.online_courses")}</Link></li>
            <li><Link to="/boutique" className="hover:text-white">{t("nav.shop")}</Link></li>
            <li><Link to="/telechargements" className="hover:text-white">{t("nav.downloads")}</Link></li>
            <li><Link to="/actualites" className="hover:text-white">{t("nav.news")}</Link></li>
            <li><Link to="/contact" className="hover:text-white">{t("nav.contact")}</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <FooterTitle>{t("footer.our_campuses")}</FooterTitle>
          <ul className="space-y-2 text-[13px] text-white/80">
            {CAMPUSES.map((c) => (
              <li key={c.id}><Link to={`/campus#${c.id}`} className="hover:text-white">{c.name}</Link></li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <FooterTitle>{t("footer.contact")}</FooterTitle>
          <ul className="space-y-3 text-[13px] text-white/80">
            <li className="flex items-center gap-2"><Mail size={14} className="flex-shrink-0" /> <span className="break-all">{CONTACT_INFO.email}</span></li>
            <li className="flex items-center gap-2"><FaWhatsapp size={14} className="flex-shrink-0 text-[#25D366]" /> <span className="whitespace-nowrap">{CONTACT_INFO.phones[0]}</span></li>
            <li className="flex items-center gap-2"><FaTelegramPlane size={14} className="flex-shrink-0 text-[#C4D2ED]" /> <span className="whitespace-nowrap">{CONTACT_INFO.phones[1]}</span></li>
            <li><a href={`https://wa.me/${CONTACT_INFO.whatsapp}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 mt-2 px-3 py-2 bg-[#580505] text-[#C4D2ED] border border-[#580505] text-xs font-semibold hover:bg-[#2F0808] transition" data-testid="footer-wa-cta"><MessageCircle size={14} /> {t("footer.whatsapp_direct")}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-5 text-xs text-white/60 flex flex-col sm:flex-row sm:justify-between gap-2">
          <div data-testid="footer-copyright">{t("footer.copyright")}</div>
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <Link to="/confidentialite" className="hover:text-white">{t("footer.privacy")}</Link>
            <span className="text-white/30">·</span>
            <Link to="/traitement-donnees" className="hover:text-white">{t("footer.data")}</Link>
            <span className="text-white/30">·</span>
            <Link to="/conditions-utilisation" className="hover:text-white">{t("footer.terms")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
