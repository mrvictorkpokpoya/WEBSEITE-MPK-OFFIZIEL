import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Award, ShoppingCart, Loader2, ClipboardCheck, MessageSquareDashed, UsersRound } from "lucide-react";
import { PageHero, Eyebrow, CTA, SectionTitle, CleanCard } from "@/components/Common";
import { EXAMS, PREP_COURSES, PREP_PRICING } from "@/lib/data";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

async function startCheckout(packageId) {
  try {
    const res = await axios.post(`${API}/payments/checkout/session`, {
      package_id: packageId,
      origin_url: window.location.origin,
    });
    if (res.data?.url) window.location.href = res.data.url;
    else toast.error("Erreur : URL de paiement introuvable");
  } catch (err) {
    const d = err.response?.data?.detail;
    toast.error(typeof d === "string" ? d : "Erreur lors de la création du paiement");
  }
}

function PrepCard({ course }) {
  const [loading, setLoading] = useState(false);
  const onBuy = async (kind) => {
    setLoading(true);
    await startCheckout(`${course.id}_${kind}`);
    setLoading(false);
  };

  return (
    <div data-testid={`prep-card-${course.id}`} className="bg-white rounded-sm p-5 sm:p-6 shadow-[0_8px_24px_-12px_rgba(88,5,5,0.18)] hover:shadow-[0_14px_36px_-12px_rgba(88,5,5,0.28)] transition-shadow duration-300 flex flex-col h-full">
      <div className="flex items-start justify-between gap-3">
        <div className="inline-flex items-center justify-center min-w-[56px] h-10 px-3 font-serif text-lg font-semibold bg-[#580505] text-white">
          {course.short}
        </div>
        <span className="text-[10px] tracking-[0.18em] uppercase text-[#580505]/80 font-medium">{course.exam}</span>
      </div>
      <h3 className="font-serif text-lg text-[#2F0808] mt-4 leading-snug">{course.title}</h3>
      <div className="mt-3 mb-3 h-px bg-[#580505]/15 w-full" />
      <p className="text-sm text-[#4A4A4A] font-light leading-relaxed flex-grow">{course.desc}</p>
      <div className="text-xs text-[#580505] mt-3 tracking-wider uppercase font-medium">{course.duration}</div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
        <div className="bg-[#FAFAFA] px-3 py-2 border border-[#580505]/15">
          <div className="text-[#580505]/70 uppercase tracking-wider text-[10px]">Interne</div>
          <div className="font-serif text-[#2F0808] text-sm font-semibold mt-0.5">{PREP_PRICING[course.level].interne} F</div>
        </div>
        <div className="bg-[#FAFAFA] px-3 py-2 border border-[#580505]/15">
          <div className="text-[#580505]/70 uppercase tracking-wider text-[10px]">Externe</div>
          <div className="font-serif text-[#2F0808] text-sm font-semibold mt-0.5">{PREP_PRICING[course.level].externe} F</div>
        </div>
        <div className="bg-[#FAFAFA] px-3 py-2 border border-[#580505]/15 col-span-2">
          <div className="text-[#580505]/70 uppercase tracking-wider text-[10px]">Volume horaire</div>
          <div className="font-serif text-[#2F0808] text-sm font-semibold mt-0.5">{PREP_PRICING[course.level].temps}</div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          onClick={() => onBuy("int")}
          disabled={loading}
          data-testid={`prep-buy-${course.id}-int`}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-[#C4D2ED] text-[#580505] border-[1.5px] border-[#580505] text-xs font-semibold hover:bg-[#DCE5F2] transition disabled:opacity-60"
        >
          {loading ? <Loader2 size={12} className="animate-spin" /> : <ShoppingCart size={12} />} Acheter Interne
        </button>
        <button
          onClick={() => onBuy("ext")}
          disabled={loading}
          data-testid={`prep-buy-${course.id}-ext`}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-white text-[#580505] border-[1.5px] border-[#580505] text-xs font-semibold hover:bg-[#FAFAFA] transition disabled:opacity-60"
        >
          {loading ? <Loader2 size={12} className="animate-spin" /> : <ShoppingCart size={12} />} Acheter Externe
        </button>
      </div>
    </div>
  );
}

export default function ExamPrep() {
  return (
    <>
      <PageHero
        eyebrow="MPK Exam Prep"
        title="Préparation aux certifications internationales."
        kicker="Accompagnement ciblé pour réussir les examens linguistiques officiels reconnus mondialement — du Goethe au TOEFL, en passant par le TestDaF et le DELF."
      />

      {/* COURS PRÉPARATOIRES — Goethe + ÖSD */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-12 lg:py-16">
        <div className="flex items-center gap-3 mb-3">
          <Award className="text-[#580505]" size={26} strokeWidth={1.5} />
          <Eyebrow>Cours préparatoires · Goethe &amp; ÖSD</Eyebrow>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#2F0808] uppercase tracking-tight">Produits par certification.</h2>
        <p className="mt-3 text-[#4A4A4A] max-w-3xl font-light text-sm sm:text-base leading-relaxed">
          Cours intensifs courts (03 semaines par niveau) pour décrocher le Goethe-Zertifikat ou l'ÖSD. Tarifs <strong>internes</strong> (apprenants MPK) et <strong>externes</strong> (candidats libres).
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-8 lg:mt-10">
          {PREP_COURSES.map((c) => (
            <PrepCard key={c.id} course={c} />
          ))}
        </div>
        <p className="mt-6 text-xs text-[#580505] font-medium tracking-wide">
          NB · Chaque niveau de cours préparatoires dure 03 semaines.
        </p>
      </section>

      {/* AUTRES EXAMENS */}
      <section className="bg-[#FAFAFA] border-y border-[#580505]/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-12 lg:py-16">
          <Eyebrow>Autres examens préparés</Eyebrow>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#2F0808] mt-3 uppercase tracking-tight">Tous les principaux examens internationaux.</h2>
          <div className="scroll-x mt-8">
            <table className="mpk-table min-w-[720px]">
              <thead><tr><th>Examen</th><th>Langue</th><th>Niveau</th><th>Organisme</th></tr></thead>
              <tbody>
                {EXAMS.map((e, i) => (
                  <tr key={i}>
                    <td className="font-medium text-[#2F0808]">{e.exam}</td>
                    <td>{e.lang}</td>
                    <td>{e.level}</td>
                    <td className="text-[#4A4A4A]">{e.org}</td>
                  </tr>
                ))}
                <tr><td>Autres</td><td>Sur demande</td><td>—</td><td>—</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* APPROCHE */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-12 lg:py-16">
        <Eyebrow>Notre approche</Eyebrow>
        <h2 className="font-serif text-2xl sm:text-3xl text-[#2F0808] mt-3 uppercase tracking-tight">Trois piliers pour décrocher votre certification.</h2>
        <div className="grid sm:grid-cols-3 gap-4 sm:gap-5 mt-8 lg:mt-10">
          <CleanCard icon={ClipboardCheck} title="Sessions blanches">
            Simulations d'examen dans les conditions réelles, corrigées et analysées item par item.
          </CleanCard>
          <CleanCard icon={MessageSquareDashed} title="Feedback détaillé">
            Identification précise des points à renforcer pour chaque section (compréhension, expression, grammaire).
          </CleanCard>
          <CleanCard icon={UsersRound} title="Formateurs certifiés">
            Préparateurs formés aux exigences spécifiques de chaque organisme et régulièrement mis à jour.
          </CleanCard>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-12 lg:py-16 text-center">
        <SectionTitle title="Engagez votre préparation." center caps />
        <div className="flex justify-center gap-3 sm:gap-4 flex-wrap">
          <CTA to="/contact" label="S'inscrire à une préparation" testid="exam-cta-register" />
          <CTA to="/contact" label="Demander un devis" variant="ghost" testid="exam-cta-quote" />
        </div>
      </section>
    </>
  );
}
