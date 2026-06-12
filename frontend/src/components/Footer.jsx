import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, MessageCircle, Mail, Phone } from "lucide-react";
import { CAMPUSES } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-[#2F0808] text-white mt-32">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white text-[#580505] grid place-items-center font-serif text-2xl">M</div>
            <div>
              <div className="font-serif text-2xl">MULTIPLIKATOR</div>
              <div className="text-[11px] tracking-[0.3em] uppercase text-white/60">Institut de Langues</div>
            </div>
          </div>
          <p className="text-white/70 leading-relaxed font-light">
            Réseau d'instituts de langues multi-campus, fondé en 2021 au Bénin.
            Excellence académique, accompagnement vers la mobilité internationale.
          </p>
          <div className="flex items-center gap-3 mt-6">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" data-testid="footer-facebook" className="w-9 h-9 grid place-items-center border border-white/30 hover:bg-white hover:text-[#580505] transition"><Facebook size={16} /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" data-testid="footer-instagram" className="w-9 h-9 grid place-items-center border border-white/30 hover:bg-white hover:text-[#580505] transition"><Instagram size={16} /></a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" data-testid="footer-youtube" className="w-9 h-9 grid place-items-center border border-white/30 hover:bg-white hover:text-[#580505] transition"><Youtube size={16} /></a>
            <a href="https://wa.me/22900000000" target="_blank" rel="noreferrer" data-testid="footer-whatsapp" className="w-9 h-9 grid place-items-center border border-white/30 hover:bg-white hover:text-[#580505] transition"><MessageCircle size={16} /></a>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="eyebrow text-white/60 mb-4">Navigation</div>
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

        <div className="lg:col-span-3">
          <div className="eyebrow text-white/60 mb-4">Nos 6 Campus</div>
          <ul className="space-y-2 text-sm text-white/80">
            {CAMPUSES.map((c) => (
              <li key={c.id}><Link to={`/campus#${c.id}`} className="hover:text-white">{c.name}</Link></li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <div className="eyebrow text-white/60 mb-4">Contact</div>
          <ul className="space-y-3 text-sm text-white/80">
            <li className="flex items-start gap-2"><Mail size={14} className="mt-1 flex-shrink-0" /> contact@multiplikator.bj</li>
            <li className="flex items-start gap-2"><Phone size={14} className="mt-1 flex-shrink-0" /> +229 00 00 00 00</li>
            <li><a href="https://wa.me/22900000000" className="inline-flex items-center gap-2 mt-2 px-3 py-2 bg-white text-[#580505] text-xs font-medium" data-testid="footer-wa-cta"><MessageCircle size={14} /> WhatsApp direct</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-5 text-xs text-white/50 flex flex-col sm:flex-row sm:justify-between gap-2">
          <div>© 2021–2026 MULTIPLIKATOR Institut de Langues — Tous droits réservés.</div>
          <div>Bénin · Présentiel & En ligne</div>
        </div>
      </div>
    </footer>
  );
}
