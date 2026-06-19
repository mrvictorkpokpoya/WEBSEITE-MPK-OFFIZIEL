import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function Eyebrow({ children }) {
  return <div className="eyebrow">{children}</div>;
}

export function SectionTitle({ eyebrow, title, kicker, center, light, caps }) {
  return (
    <div className={`${center ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl'} mb-12`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className={`font-serif text-3xl sm:text-4xl lg:text-5xl mt-3 ${light ? 'text-white' : 'text-[#2F0808]'} leading-tight ${caps ? 'uppercase tracking-tight' : ''}`}>{title}</h2>
      {kicker && <p className={`mt-4 text-base sm:text-lg ${light ? 'text-white/70' : 'text-[#4A4A4A]'} font-light leading-relaxed`}>{kicker}</p>}
    </div>
  );
}

export function CTA({ to, label, variant = "primary", testid, external = false }) {
  const cls = variant === "primary" ? "btn-primary" : "btn-ghost";
  if (external) return <a href={to} className={cls} data-testid={testid}>{label} <ArrowRight size={16} /></a>;
  return <Link to={to} className={cls} data-testid={testid}>{label} <ArrowRight size={16} /></Link>;
}

export function Stat({ value, label, note }) {
  return (
    <div className="text-center">
      {note && <div className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-[#550000]/80 mb-1 sm:mb-2 font-medium">{note}</div>}
      <div className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#580505]">{value}</div>
      <div className="text-[10px] sm:text-xs tracking-[0.18em] uppercase text-[#550000] mt-1 sm:mt-2 leading-relaxed">{label}</div>
    </div>
  );
}

export function CleanCard({ icon: Icon, title, children, accent }) {
  return (
    <div className="bg-white rounded-sm p-6 sm:p-7 border border-[#580505]/25 shadow-[0_14px_30px_-12px_rgba(88,5,5,0.35)] hover:shadow-[0_22px_44px_-12px_rgba(88,5,5,0.42)] hover:border-[#580505]/40 transition-all duration-300 flex flex-col h-full">
      {Icon && (
        <div className="w-14 h-14 rounded-full bg-[#F4F0F0] grid place-items-center mb-5 sm:mb-6">
          <Icon className="text-[#580505]" size={22} strokeWidth={1.5} />
        </div>
      )}
      <h3 className="font-serif text-lg sm:text-xl text-[#2F0808] leading-snug">{title}</h3>
      <div className="mt-3 sm:mt-4 mb-3 sm:mb-4 h-px bg-[#580505]/20 w-full" />
      {accent && <div className="absolute h-0.5 bg-[#580505] mt-[-1.5rem]" style={{width: "60px"}} />}
      <div className="text-sm text-[#4A4A4A] font-light leading-relaxed flex-grow">{children}</div>
    </div>
  );
}

export function PageHero({ eyebrow, title, kicker }) {
  return (
    <section className="bg-tint border-b border-[#580505]/10">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16 lg:py-24">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl mt-3 text-[#2F0808] leading-[1.05] max-w-4xl">{title}</h1>
        {kicker && <p className="mt-6 text-lg text-[#4A4A4A] max-w-3xl font-light leading-relaxed">{kicker}</p>}
      </div>
    </section>
  );
}
