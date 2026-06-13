import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok, FaLinkedinIn, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import { PageHero, Eyebrow } from "@/components/Common";
import { SOCIAL_URLS } from "@/lib/data";

const SOCIALS = [
  { name: "Facebook", url: SOCIAL_URLS.facebook, Icon: FaFacebookF, handle: "@institutmultiplikator" },
  { name: "Instagram", url: SOCIAL_URLS.instagram, Icon: FaInstagram, handle: "@institut_multiplikator" },
  { name: "TikTok", url: SOCIAL_URLS.tiktok, Icon: FaTiktok, handle: "@institutmultiplikator" },
  { name: "YouTube", url: SOCIAL_URLS.youtube, Icon: FaYoutube, handle: "@multiplikator_institut" },
  { name: "LinkedIn", url: SOCIAL_URLS.linkedin, Icon: FaLinkedinIn, handle: "Institut Multiplikator" },
  { name: "Telegram", url: SOCIAL_URLS.telegram, Icon: FaTelegramPlane, handle: "@multiplikator" },
  { name: "WhatsApp", url: SOCIAL_URLS.whatsapp, Icon: FaWhatsapp, handle: "+229 01 96 59 38 66" },
];

export default function Social() {
  return (
    <>
      <PageHero eyebrow="Réseaux sociaux" title="Rejoignez la communauté MPK." kicker="Suivez nos rentrées, événements, témoignages et conseils linguistiques en direct depuis vos plateformes favorites." />
      <section className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-12 lg:py-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {SOCIALS.map((s, i) => (
          <a key={i} href={s.url} target="_blank" rel="noreferrer" data-testid={`social-${s.name}`} className="mpk-card p-5 sm:p-7 group hover:border-[#580505] transition">
            <s.Icon className="text-[#580505]" size={28}/>
            <Eyebrow><span className="mt-3 sm:mt-4 block">Suivez-nous sur</span></Eyebrow>
            <h3 className="font-serif text-xl sm:text-2xl mt-1 text-[#2F0808]">{s.name}</h3>
            <div className="mt-2 text-sm text-[#580505] break-all">{s.handle}</div>
          </a>
        ))}
      </section>
    </>
  );
}
