import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { TrendingUp, Briefcase, Handshake, Mail, Building2, Users, GraduationCap, Target } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { PageHero, Eyebrow, CleanCard } from "@/components/Common";
import { CONTACT_INFO } from "@/lib/data";

const PROJECT_ICONS = [Building2, GraduationCap, Users, Target];
const PARTNERSHIP_ICONS = [TrendingUp, Briefcase, Handshake];

export default function Investment() {
  const { t } = useTranslation();
  const projects = t("investment.projects", { returnObjects: true });
  const advantages = t("investment.advantages", { returnObjects: true });
  const partnerships = t("investment.partnerships", { returnObjects: true });

  return (
    <>
      <PageHero
        eyebrow={t("investment.hero_eyebrow")}
        title={t("investment.hero_title")}
        kicker={t("investment.hero_kicker")}
      />

      {/* Projets — en cours de conception */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-12 lg:py-20">
        <Eyebrow>{t("investment.projects_eyebrow")}</Eyebrow>
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl mt-3 text-[#2F0808] uppercase tracking-tight">{t("investment.projects_title")}</h2>
        <p className="mt-3 sm:mt-4 text-[#4A4A4A] max-w-3xl font-light leading-relaxed">
          {t("investment.projects_intro")}
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-8 lg:mt-10">
          {projects.map((p, i) => {
            const Icon = PROJECT_ICONS[i];
            return (
              <CleanCard key={p.t} icon={Icon} title={p.t}>
                <p>{p.d}</p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-[10px] tracking-[0.18em] uppercase text-[#580505] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#580505] animate-pulse" /> {t("investment.in_design")}
                </div>
              </CleanCard>
            );
          })}
        </div>
      </section>

      {/* Pourquoi investir */}
      <section className="bg-[#FAFAFA] border-y border-[#580505]/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-12 lg:py-20">
          <Eyebrow>{t("investment.advantages_eyebrow")}</Eyebrow>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl mt-3 text-[#2F0808] uppercase tracking-tight">{t("investment.advantages_title")}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-8 lg:mt-10">
            {advantages.map((a, i) => (
              <CleanCard key={a.t} title={a.t}>
                <div className="font-serif text-3xl text-[#580505] mb-3 -mt-2">0{i + 1}</div>
                <p>{a.d}</p>
              </CleanCard>
            ))}
          </div>
        </div>
      </section>

      {/* Formes de partenariat */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-12 lg:py-20">
        <Eyebrow>{t("investment.partnerships_eyebrow")}</Eyebrow>
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl mt-3 text-[#2F0808] uppercase tracking-tight">{t("investment.partnerships_title")}</h2>
        <p className="mt-3 text-[#4A4A4A] max-w-2xl font-light leading-relaxed">{t("investment.partnerships_intro")}</p>
        <div className="grid sm:grid-cols-3 gap-4 sm:gap-5 mt-8 lg:mt-10">
          {partnerships.map((f, i) => {
            const Icon = PARTNERSHIP_ICONS[i];
            return (
              <CleanCard key={f.t} icon={Icon} title={f.t}>
                <p>{f.d}</p>
              </CleanCard>
            );
          })}
        </div>
      </section>

      {/* Contact investisseur */}
      <section className="bg-[#2F0808] text-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-12 lg:py-20 text-center">
          <Eyebrow><span className="text-[#C4D2ED]">{t("investment.cta_eyebrow")}</span></Eyebrow>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-5xl mt-3 uppercase tracking-tight">{t("investment.cta_title")}</h2>
          <p className="mt-4 sm:mt-6 max-w-2xl mx-auto text-white/80 font-light text-sm sm:text-base lg:text-lg">
            {t("investment.cta_kicker")}
          </p>

          <div className="mt-8 lg:mt-10 flex flex-wrap justify-center gap-3 sm:gap-4">
            <Link to="/contact" className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 bg-[#580505] text-[#C4D2ED] border-[1.5px] border-[#C4D2ED] font-semibold tracking-wide hover:bg-[#2F0808] transition text-sm sm:text-base">
              <Mail size={16} /> {t("investment.contact_us")}
            </Link>
            <a href={`mailto:${CONTACT_INFO.email}?subject=Discussion%20investissement%20%E2%80%94%20MULTIPLIKATOR`} className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 bg-transparent text-[#C4D2ED] border-[1.5px] border-[#C4D2ED] font-semibold tracking-wide hover:bg-[#C4D2ED]/10 transition text-sm sm:text-base">
              <Mail size={16} /> {t("investment.direct_email")}
            </a>
            <a href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=Bonjour,%20je%20souhaite%20discuter%20d'un%20investissement%20MULTIPLIKATOR`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 bg-transparent text-[#C4D2ED] border-[1.5px] border-[#C4D2ED] font-semibold tracking-wide hover:bg-[#C4D2ED]/10 transition text-sm sm:text-base">
              <FaWhatsapp size={16} /> {t("investment.whatsapp")}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
