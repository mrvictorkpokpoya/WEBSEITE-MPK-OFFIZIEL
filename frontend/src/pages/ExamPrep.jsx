import React from "react";
import { PageHero, Eyebrow, CTA, SectionTitle } from "@/components/Common";
import { EXAMS } from "@/lib/data";

export default function ExamPrep() {
  return (
    <>
      <PageHero eyebrow="MPK Exam Prep" title="Préparation aux certifications internationales." kicker="Accompagnement ciblé pour réussir les examens linguistiques officiels reconnus mondialement — du Goethe au TOEFL, en passant par le TestDaF et le DELF." />
      <section className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16">
        <div className="scroll-x">
          <table className="mpk-table min-w-[720px]">
            <thead><tr><th>Examen</th><th>Langue</th><th>Niveau</th><th>Organisme</th></tr></thead>
            <tbody>{EXAMS.map((e, i) => <tr key={i}><td className="font-medium text-[#2F0808]">{e.exam}</td><td>{e.lang}</td><td>{e.level}</td><td className="text-[#4A4A4A]">{e.org}</td></tr>)}<tr><td>Autres</td><td>Sur demande</td><td>—</td><td>—</td></tr></tbody>
          </table>
        </div>
      </section>
      <section className="bg-[#FAFAFA] border-y border-[#580505]/10">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16 grid md:grid-cols-3 gap-6">
          {[{t:"Sessions blanches", d:"Simulations d'examen dans les conditions réelles, corrigées et analysées."}, {t:"Feedback détaillé", d:"Identification précise des points à renforcer pour chaque section."}, {t:"Formateurs certifiés", d:"Préparateurs formés aux exigences spécifiques de chaque organisme."}].map((c, i) => (
            <div key={i} className="mpk-card p-7"><Eyebrow>0{i+1}</Eyebrow><h3 className="font-serif text-xl mt-3 text-[#2F0808]">{c.t}</h3><p className="mt-2 text-[#4A4A4A] font-light">{c.d}</p></div>
          ))}
        </div>
      </section>
      <SectionWrap><CTA to="/contact" label="S'inscrire à une préparation" testid="exam-cta-register"/><CTA to="/contact" label="Demander un devis" variant="ghost" testid="exam-cta-quote"/></SectionWrap>
    </>
  );
}

function SectionWrap({ children }) {
  return <section className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16 text-center"><SectionTitle title="Engagez votre préparation." center /><div className="flex justify-center gap-4 flex-wrap">{children}</div></section>;
}
