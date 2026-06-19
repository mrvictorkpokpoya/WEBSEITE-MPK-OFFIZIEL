import React from "react";
import { LOGO_MARK } from "@/lib/data";
import { MapPin, Phone, Calendar as CalendarIcon, GraduationCap, BookOpen, PartyPopper, Sparkles } from "lucide-react";

/**
 * 5 visuels MPK style "dépliants" (HTML/CSS only — pas d'images de production).
 * Design inspiré des flyers WhatsApp officiels de MULTIPLIKATOR Institut.
 */

const PHONE_TOP = "+229 01 96 59 38 66 / 01 99 93 33 33";
const PHONE_BOT = "+229 01 67 46 44 04";
const CAMPUS_LINE1 = "GODOMEY / AKPAKPA / PORTO-NOVO";
const CAMPUS_LINE2 = "PARAKOU / DJOUGOU / LOKOSSA";

function FlyerHeader({ light }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <img src={LOGO_MARK} alt="MPK" className="h-10 w-auto" />
        <div className="leading-tight">
          <div className={`text-[15px] font-bold tracking-tight ${light ? "text-white" : "text-[#2F0808]"}`}>MULTIPLIKATOR</div>
          <div className={`text-[9px] uppercase tracking-[0.25em] ${light ? "text-white/80" : "text-[#580505]"}`}>Institut <span className="italic font-light normal-case tracking-normal">De langues</span></div>
        </div>
      </div>
      <div className={`hidden sm:flex items-center gap-2 text-[10px] tracking-wider ${light ? "text-white/80" : "text-[#2F0808]"}`}>
        <span className="font-bold">X · f · O · t · W</span>
      </div>
    </div>
  );
}

function FlyerFooter({ light }) {
  return (
    <div className={`mt-5 pt-3 border-t ${light ? "border-white/20" : "border-[#580505]/15"} grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] sm:text-[11px]`}>
      <div className="flex items-start gap-2">
        <MapPin size={12} className={light ? "text-white/80 mt-0.5" : "text-[#580505] mt-0.5"} />
        <div className={`leading-tight ${light ? "text-white" : "text-[#2F0808]"}`}>
          <div className="font-bold">{CAMPUS_LINE1}</div>
          <div className="font-bold">{CAMPUS_LINE2}</div>
        </div>
      </div>
      <div className="flex items-start gap-2">
        <Phone size={12} className={light ? "text-white/80 mt-0.5" : "text-[#580505] mt-0.5"} />
        <div className={`leading-tight ${light ? "text-white" : "text-[#2F0808]"}`}>
          <div className="font-bold">{PHONE_TOP}</div>
          <div className="font-bold">{PHONE_BOT}</div>
        </div>
      </div>
    </div>
  );
}

/* ============ FLYER 1 — COURS DE LANGUES (Allemand / Anglais) ============ */
export function FlyerLanguageCourses({ testid = "flyer-language-courses" }) {
  return (
    <div data-testid={testid} className="relative bg-[#F5F4F2] border border-[#580505]/15 p-5 sm:p-6 overflow-hidden">
      <FlyerHeader />
      <div className="mt-5 grid grid-cols-12 gap-4">
        <div className="col-span-12 sm:col-span-7">
          <h3 className="font-serif text-3xl sm:text-4xl text-[#2F0808] font-bold tracking-tight leading-none uppercase">Cours de Langues</h3>
          <div className="inline-block mt-3 bg-[#580505] text-white px-4 py-1.5 text-sm font-bold tracking-wider">ALLEMAND — ANGLAIS</div>
          <div className="mt-1 w-12 h-0.5 bg-[#E6C200]" />

          <div className="mt-5 flex items-end gap-3">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-[#2F0808] tracking-tight">06 <span className="text-sm font-semibold">JUILL</span></div>
              <div className="h-1 bg-gradient-to-r from-[#2F0808] to-[#a08070] w-16" />
              <div className="text-[11px] text-[#580505] font-semibold mt-0.5">2026</div>
            </div>
            <div className="w-7 h-7 rounded-full bg-[#E6C200] grid place-items-center text-[10px] font-bold text-[#2F0808]">au</div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-[#2F0808] tracking-tight">04 <span className="text-sm font-semibold">SEPT</span></div>
              <div className="h-1 bg-gradient-to-r from-[#2F0808] to-[#a08070] w-16" />
              <div className="text-[11px] text-[#580505] font-semibold mt-0.5">2026</div>
            </div>
          </div>

          <div className="mt-5">
            <div className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-white bg-[#580505] px-3 py-1">— Nos Services —</div>
            <ul className="mt-3 space-y-1 text-[12px] sm:text-[13px] text-[#2F0808] font-semibold">
              <li>– COURS DE LANGUES</li>
              <li>– VOYAGES / BOURSES</li>
              <li>– FORMATIONS / ETUDES</li>
              <li>– EMPLOIS / TRADUCTIONS</li>
            </ul>
          </div>
        </div>

        <div className="col-span-12 sm:col-span-5 grid grid-rows-2 gap-3">
          <div className="bg-gradient-to-br from-[#580505] to-[#2F0808] border-2 border-[#580505] rounded-tl-3xl rounded-br-3xl p-5 grid place-items-center">
            <GraduationCap size={48} className="text-[#E6C200]" strokeWidth={1.5} />
          </div>
          <div className="bg-gradient-to-br from-[#580505] to-[#2F0808] border-2 border-[#580505] rounded-tl-3xl rounded-br-3xl p-5 grid place-items-center">
            <Sparkles size={48} className="text-[#C4D2ED]" strokeWidth={1.5} />
          </div>
        </div>
      </div>
      <FlyerFooter />
    </div>
  );
}

/* ============ FLYER 2 — COURS PRÉPARATOIRES A MPK ============ */
const PrepRow = ({ r }) => (
  <div className="grid grid-cols-4 items-center gap-2 sm:gap-3 text-center">
    <div className={`${r.color} font-bold py-2 text-base rounded-full`}>{r.lvl}</div>
    <div className="bg-white text-[#2F0808] font-bold py-2 text-xs sm:text-sm rounded-full">{r.interne}</div>
    <div className="bg-white text-[#2F0808] font-bold py-2 text-xs sm:text-sm rounded-full">{r.externe}</div>
    <div className="bg-white text-[#2F0808] font-bold py-2 text-xs sm:text-sm rounded-full">{r.time}</div>
  </div>
);
const PrepHead = () => (
  <div className="grid grid-cols-4 items-center gap-2 sm:gap-3 text-center">
    <div />
    <div className="bg-[#F5E6B8] text-[#2F0808] font-bold py-2 text-xs tracking-wider rounded-full">INTERNE</div>
    <div className="bg-[#F5E6B8] text-[#2F0808] font-bold py-2 text-xs tracking-wider rounded-full">EXTERNE</div>
    <div className="bg-[#F5E6B8] text-[#2F0808] font-bold py-2 text-xs tracking-wider rounded-full">TEMPS</div>
  </div>
);
export function FlyerPrepCourses({ testid = "flyer-prep-courses" }) {
  const rows1 = [
    { lvl: "A1", color: "bg-[#FFD93D] text-[#2F0808]", interne: "35 000 F", externe: "40 000 F", time: "03h/jour" },
    { lvl: "A2", color: "bg-[#F4B400] text-[#2F0808]", interne: "45 000 F", externe: "50 000 F", time: "03h/jour" },
  ];
  const rows2 = [
    { lvl: "B1", color: "bg-[#A30000] text-white", interne: "60 000 F", externe: "65 000 F", time: "07h/jour" },
    { lvl: "B2", color: "bg-[#7A0000] text-white", interne: "65 000 F", externe: "70 000 F", time: "07h/jour" },
  ];
  return (
    <div data-testid={testid} className="relative bg-[#580505] text-white p-5 sm:p-6">
      <FlyerHeader light />
      <div className="mt-5 text-center">
        <div className="inline-block bg-[#A30000] px-5 py-2 text-base sm:text-lg font-bold tracking-wider">COURS PRÉPARATOIRES A MPK</div>
      </div>
      <div className="mt-6 space-y-3">
        <PrepHead />
        {rows1.map((r) => <PrepRow key={r.lvl} r={r} />)}
      </div>
      <div className="mt-5 mb-4 flex justify-center"><div className="w-32 h-px bg-white/30" /></div>
      <div className="space-y-3">
        <PrepHead />
        {rows2.map((r) => <PrepRow key={r.lvl} r={r} />)}
      </div>
      <p className="mt-5 text-[11px] sm:text-xs italic text-[#FFD93D] text-center font-semibold">NB : Chaque niveau de cours préparatoires <strong className="not-italic">dure 03 semaines</strong></p>
      <FlyerFooter light />
    </div>
  );
}

/* ============ FLYER 3 — CALENDRIER ANNUEL DES RENTRÉES ============ */
export function FlyerCalendar({ testid = "flyer-calendar" }) {
  const months = [
    { m: "JANVIER", d: "05 JAN - 04 MARS", c: "bg-[#580505]" },
    { m: "FEVRIER", d: "02 FEV - 01 AVRIL", c: "bg-[#580505]" },
    { m: "MARS", d: "02 MARS - 01 MAI", c: "bg-[#580505]" },
    { m: "AVRIL", d: "06 AVRIL - 05 JUIN", c: "bg-[#580505]" },
    { m: "MAI", d: "04 MAI - 03 JUILL", c: "bg-[#1F2A4A]" },
    { m: "JUIN", d: "01 JUIN - 31 JUILL", c: "bg-[#1F2A4A]" },
    { m: "JUILLET", d: "06 JUILL - 04 SEPT", c: "bg-[#1F2A4A]" },
    { m: "AOUT", d: "03 AOÛT - 02 OCT", c: "bg-[#1F2A4A]" },
    { m: "SEPTEMBRE", d: "07 SEPT - 06 NOV", c: "bg-[#580505]" },
    { m: "OCTOBRE", d: "05 OCT - 04 DEC", c: "bg-[#580505]" },
    { m: "NOVEMBRE", d: "02 NOV - 24 DEC", c: "bg-[#580505]" },
    { m: "DECEMBRE", d: "07 DEC - 12 FEV 27", c: "bg-[#580505]" },
  ];
  return (
    <div data-testid={testid} className="relative bg-[#FAF7F2] border border-[#580505]/15 p-5 sm:p-6 overflow-hidden">
      <FlyerHeader />
      <div className="mt-5 relative bg-gradient-to-r from-[#3A2520]/90 to-[#1F2A4A]/90 p-5 rounded">
        <h3 className="font-serif text-2xl sm:text-3xl text-[#FFD93D] font-bold leading-none uppercase">Calendrier Annuel<br/>de nos Rentrées</h3>
        <div className="mt-3 inline-block bg-[#580505] text-white px-3 py-1 text-[10px] sm:text-[11px] font-semibold">
          - COURS DE LANGUES : Allemand / Anglais (A1 - A2 - B1 - B2)<br/>
          - VOYAGES / BOURSES - FORMATIONS / ETUDES<br/>
          - EMPLOIS - TRADUCTIONS
        </div>
        <div className="absolute top-3 right-3 text-[9px] text-white/80 text-right leading-tight">COURS DU JOUR et du SOIR<br/>COURS EN PRESENTIEL et EN LIGNE</div>
      </div>
      <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-2">
        {months.map((mo) => (
          <div key={mo.m} className="flex items-center gap-2">
            <div className={`${mo.c} text-white grid place-items-center w-9 h-9 shrink-0`}><CalendarIcon size={16} /></div>
            <div className="flex-1 bg-white border border-[#580505]/15 px-2 py-1">
              <div className="text-[10px] font-bold text-[#580505] tracking-wider">{mo.m}</div>
              <div className="text-[10px] text-[#2F0808] font-semibold">{mo.d}</div>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[11px] sm:text-xs font-bold text-[#2F0808]">Inscription : <span className="text-[#580505]">5 000 FCFA</span> / test d&apos;entrée : <span className="text-[#580505]">2 500 FCFA</span></p>
      <FlyerFooter />
    </div>
  );
}

/* ============ FLYER 4 — EXAMEN BONNE CHANCE ============ */
export function FlyerExamGoodLuck({ testid = "flyer-exam-luck" }) {
  return (
    <div data-testid={testid} className="relative bg-gradient-to-br from-[#FFF8E1] to-[#F5E6B8] border border-[#580505]/15 p-5 sm:p-6 overflow-hidden">
      <FlyerHeader />
      <div className="mt-5 relative">
        <div className="inline-flex items-center gap-2 bg-[#FFD93D] text-[#2F0808] px-3 py-1 text-sm font-bold tracking-wider">
          <span>—</span> EXAMEN
        </div>
        <div className="mt-6 text-center">
          <div className="font-serif text-4xl sm:text-5xl font-extrabold text-white drop-shadow-[2px_2px_0_#2F0808] tracking-tight leading-none">BONNE CHANCE</div>
          <div className="mt-3 flex items-center justify-center gap-3">
            <div className="font-serif italic text-2xl text-[#2F0808]">à</div>
            <div className="bg-[#FFD93D] text-[#2F0808] px-3 py-1 text-base font-bold tracking-wider">NOS APPRENANTS</div>
          </div>
        </div>
        <div className="mt-6 flex justify-center gap-3 text-[#580505]">
          <PartyPopper size={36} strokeWidth={1.5} />
          <GraduationCap size={36} strokeWidth={1.5} />
          <Sparkles size={36} strokeWidth={1.5} />
        </div>
      </div>
      <FlyerFooter />
    </div>
  );
}

/* ============ FLYER 5 — CONGÉS ACADÉMIQUES ============ */
export function FlyerAcademicHolidays({ testid = "flyer-holidays" }) {
  return (
    <div data-testid={testid} className="relative bg-[#580505] text-white p-5 sm:p-6 overflow-hidden">
      <FlyerHeader light />
      <div className="mt-6">
        <h3 className="font-serif text-2xl sm:text-3xl text-[#FFF8E1] font-bold uppercase tracking-tight">Congés Académiques</h3>
        <div className="mt-1 w-20 h-px bg-[#FFF8E1]/40" />

        <div className="mt-4 bg-white text-[#2F0808] px-3 py-2 inline-block text-xs sm:text-sm font-bold tracking-wider">
          INSTITUT MULTIPLIKATOR EST EN CONGÉ
        </div>
        <div className="mt-3 text-sm sm:text-base">
          <div>Du <strong>Ven. 19 juin 2026</strong></div>
          <div>au <strong>Mar. 30 juin 2026</strong></div>
        </div>

        <div className="mt-6">
          <h4 className="font-serif text-xl sm:text-2xl text-[#FFF8E1] font-bold uppercase tracking-tight">Reprise</h4>
          <div className="mt-1 w-16 h-px bg-[#FFF8E1]/40" />
          <div className="mt-3 text-base sm:text-lg"><strong>Mer. 01 juill. 2026</strong></div>
        </div>
      </div>
      <div className="mt-5 flex justify-end">
        <BookOpen size={36} className="text-white/40" strokeWidth={1.2} />
      </div>
      <FlyerFooter light />
    </div>
  );
}
