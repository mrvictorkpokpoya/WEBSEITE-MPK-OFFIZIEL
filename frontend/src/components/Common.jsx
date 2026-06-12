import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function Eyebrow({ children }) {
  return <div className="eyebrow">{children}</div>;
}

export function SectionTitle({ eyebrow, title, kicker, center, light }) {
  return (
    <div className={`${center ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl'} mb-12`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className={`font-serif text-3xl sm:text-4xl lg:text-5xl mt-3 ${light ? 'text-white' : 'text-[#2F0808]'} leading-tight`}>{title}</h2>
      {kicker && <p className={`mt-4 text-base sm:text-lg ${light ? 'text-white/70' : 'text-[#4A4A4A]'} font-light leading-relaxed`}>{kicker}</p>}
    </div>
  );
}

export function CTA({ to, label, variant = "primary", testid, external = false }) {
  const cls = variant === "primary" ? "btn-primary" : "btn-ghost";
  if (external) return <a href={to} className={cls} data-testid={testid}>{label} <ArrowRight size={16} /></a>;
  return <Link to={to} className={cls} data-testid={testid}>{label} <ArrowRight size={16} /></Link>;
}

export function Stat({ value, label }) {
  return (
    <div>
      <div className="font-serif text-4xl sm:text-5xl text-[#580505]">{value}</div>
      <div className="text-xs tracking-[0.2em] uppercase text-[#550000] mt-2">{label}</div>
    </div>
  );
}

export function PageHero({ eyebrow, title, kicker }) {
  return (
    <section className="bg-[#FAFAFA] border-b border-[#580505]/10">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16 lg:py-24">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl mt-3 text-[#2F0808] leading-[1.05] max-w-4xl">{title}</h1>
        {kicker && <p className="mt-6 text-lg text-[#4A4A4A] max-w-3xl font-light leading-relaxed">{kicker}</p>}
      </div>
    </section>
  );
}
