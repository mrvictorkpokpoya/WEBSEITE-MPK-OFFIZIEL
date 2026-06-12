import React from "react";
import { Facebook, Instagram, Youtube, MessageCircle } from "lucide-react";
import { PageHero, Eyebrow } from "@/components/Common";

const SOCIALS = [
  { name: "Facebook", url: "https://facebook.com", Icon: Facebook, handle: "@multiplikator.benin" },
  { name: "Instagram", url: "https://instagram.com", Icon: Instagram, handle: "@multiplikator_institut" },
  { name: "TikTok", url: "https://tiktok.com", Icon: MessageCircle, handle: "@multiplikator.bj" },
  { name: "YouTube", url: "https://youtube.com", Icon: Youtube, handle: "@MULTIPLIKATOR" },
  { name: "WhatsApp", url: "https://wa.me/2290196593866", Icon: MessageCircle, handle: "+229 01 96 59 38 66" },
];

export default function Social() {
  return (
    <>
      <PageHero eyebrow="Réseaux sociaux" title="Rejoignez la communauté MPK." kicker="Suivez nos rentrées, événements, témoignages et conseils linguistiques en direct depuis vos plateformes favorites." />
      <section className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {SOCIALS.map((s, i) => (
          <a key={i} href={s.url} target="_blank" rel="noreferrer" data-testid={`social-${s.name}`} className="mpk-card p-7 group hover:border-[#580505] transition">
            <s.Icon className="text-[#580505]" size={32} strokeWidth={1.5}/>
            <Eyebrow><span className="mt-4 block">Suivez-nous sur</span></Eyebrow>
            <h3 className="font-serif text-2xl mt-1 text-[#2F0808]">{s.name}</h3>
            <div className="mt-2 text-sm text-[#580505]">{s.handle}</div>
          </a>
        ))}
      </section>
    </>
  );
}
