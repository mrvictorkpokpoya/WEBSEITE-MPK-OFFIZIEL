import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, MessageCircle, ArrowRight, Clock, Map as MapIcon, Users } from "lucide-react";
import { PageHero } from "@/components/Common";
import { CAMPUSES, ONLINE_CAMPUS } from "@/lib/data";

function InfoRow({ icon: Icon, children, testid }) {
  return (
    <div className="flex items-start gap-3 text-sm text-[#4A4A4A]" data-testid={testid}>
      <Icon size={15} className="mt-0.5 flex-shrink-0 text-[#580505]" />
      <span className="leading-relaxed">{children}</span>
    </div>
  );
}

function CampusCard({ c }) {
  return (
    <article id={c.id} data-testid={`campus-card-${c.id}`} className="mpk-card flex flex-col bg-white">
      <div className="bg-[#580505] text-white px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 border border-white/40 grid place-items-center flex-shrink-0"><Users size={18} /></div>
          <div>
            <h2 className="font-serif text-lg leading-snug uppercase tracking-wide">{c.name}</h2>
            <div className="text-[11px] tracking-[0.2em] uppercase text-[#C4D2ED]">{c.city}{c.flagship ? " · Campus principal" : ""}</div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-3 flex-1">
        <InfoRow icon={MapPin} testid={`campus-address-${c.id}`}>{c.address}</InfoRow>
        <InfoRow icon={Phone}>{c.phones.join(" | ")}</InfoRow>
        <InfoRow icon={Mail}><a href={`mailto:${c.email}`} className="hover:text-[#580505] break-all">{c.email}</a></InfoRow>
        <a href={`https://wa.me/${c.whatsapp}`} target="_blank" rel="noreferrer" data-testid={`campus-whatsapp-${c.id}`} className="inline-flex items-center gap-2 text-sm font-medium text-[#580505] border border-[#580505]/30 px-3 py-2 hover:bg-[#580505] hover:text-white transition mt-1">
          <MessageCircle size={14} /> Communauté WhatsApp
        </a>
      </div>

      <div className="px-6 pb-6">
        <div className="text-[10px] tracking-[0.2em] uppercase text-[#550000] font-medium mb-2 flex items-center gap-2"><MapIcon size={12} /> Plan d'accès</div>
        {c.map ? (
          <a href={c.map} target="_blank" rel="noreferrer" data-testid={`campus-map-${c.id}`} className="block group">
            <div className="aspect-[16/9] overflow-hidden border border-[#580505]/15 bg-tint">
              <img src={c.map} alt={`Plan d'accès — ${c.name}`} className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-300" />
            </div>
            <div className="text-xs text-[#580505] mt-1.5 inline-flex items-center gap-1">Agrandir le plan <ArrowRight size={11} /></div>
          </a>
        ) : (
          <div data-testid={`campus-map-placeholder-${c.id}`} className="aspect-[16/9] border border-dashed border-[#580505]/25 bg-tint-soft grid place-items-center text-xs text-[#550000]/70 px-4 text-center">
            Plan d'accès — bientôt disponible
          </div>
        )}
      </div>

      <div className="px-6 pb-6 flex flex-wrap gap-3">
        <Link to="/contact" data-testid={`campus-register-${c.id}`} className="btn-primary text-xs">S'inscrire sur ce campus <ArrowRight size={13} /></Link>
        <Link to="/contact" data-testid={`campus-contact-${c.id}`} className="btn-ghost text-xs">Contacter ce campus</Link>
      </div>
    </article>
  );
}

function OnlineCard() {
  const o = ONLINE_CAMPUS;
  return (
    <article id={o.id} data-testid="campus-card-en-ligne" className="mpk-card flex flex-col bg-[#2F0808] text-white">
      <div className="px-6 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 border border-white/40 grid place-items-center flex-shrink-0"><Clock size={18} /></div>
          <div>
            <h2 className="font-serif text-lg leading-snug uppercase tracking-wide">{o.name}</h2>
            <div className="text-[11px] tracking-[0.2em] uppercase text-[#C4D2ED]">Partout au Bénin & diaspora</div>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-4 flex-1">
        <p className="text-sm text-white/75 font-light leading-relaxed">{o.desc}</p>
        <div>
          <div className="text-[10px] tracking-[0.2em] uppercase text-[#C4D2ED] font-medium mb-2">Créneaux disponibles</div>
          <div className="grid grid-cols-2 gap-2">
            {o.hours.map((h) => (
              <div key={h} className="border border-white/20 px-3 py-2 text-sm text-center">{h}</div>
            ))}
          </div>
        </div>
        <div className="space-y-3 pt-1">
          <InfoRowLight icon={Phone}>{o.phones.join(" | ")}</InfoRowLight>
          <InfoRowLight icon={Mail}><a href={`mailto:${o.email}`} className="hover:text-white break-all">{o.email}</a></InfoRowLight>
          <a href={`https://wa.me/${o.whatsapp}`} target="_blank" rel="noreferrer" data-testid="campus-whatsapp-en-ligne" className="inline-flex items-center gap-2 text-sm font-medium text-white border border-white/40 px-3 py-2 hover:bg-white hover:text-[#580505] transition">
            <MessageCircle size={14} /> Communauté WhatsApp
          </a>
        </div>
      </div>
      <div className="px-6 pb-6">
        <Link to="/cours-en-ligne" data-testid="campus-online-cta" className="inline-flex items-center gap-2 bg-white text-[#580505] px-4 py-2.5 text-xs font-medium hover:bg-[#C4D2ED]/90 transition">Découvrir les cours en ligne <ArrowRight size={13} /></Link>
      </div>
    </article>
  );
}

function InfoRowLight({ icon: Icon, children }) {
  return (
    <div className="flex items-start gap-3 text-sm text-white/80">
      <Icon size={15} className="mt-0.5 flex-shrink-0 text-[#C4D2ED]" />
      <span className="leading-relaxed">{children}</span>
    </div>
  );
}

export default function Campuses() {
  return (
    <>
      <PageHero eyebrow="Où nous trouver ?" title="6 campus physiques au Bénin — et en ligne." kicker="GODOMEY PK 14, AKPAKPA, PORTO-NOVO, LOKOSSA, DJOUGOU, PARAKOU — et des cours en ligne pour toutes les autres villes." />
      <section className="bg-tint">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {CAMPUSES.map((c) => <CampusCard key={c.id} c={c} />)}
            <OnlineCard />
          </div>
        </div>
      </section>
    </>
  );
}
