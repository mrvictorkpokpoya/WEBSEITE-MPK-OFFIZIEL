import React from "react";
import { useTranslation } from "react-i18next";
import { FileText, Mail, MessageCircle, Briefcase, GraduationCap, Plane, Sparkles } from "lucide-react";
import { PageHero, CTA, SectionTitle, CleanCard } from "@/components/Common";

const ICONS = [FileText, Mail, MessageCircle, Sparkles, GraduationCap, Plane, Briefcase];

export default function ExtraServices() {
  const { t } = useTranslation();
  const services = t("extra_services.services", { returnObjects: true });
  return (
    <>
      <PageHero
        eyebrow={t("extra_services.hero_eyebrow")}
        title={t("extra_services.hero_title")}
        kicker={t("extra_services.hero_kicker")}
      />

      <section className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-12 lg:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {services.map((s, i) => {
            const Icon = ICONS[i];
            return (
              <CleanCard key={s.t} icon={Icon} title={s.t}>
                <p>{s.d}</p>
              </CleanCard>
            );
          })}
        </div>
      </section>

      <section className="bg-[#FAFAFA] border-y border-[#580505]/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-12 lg:py-16 text-center">
          <SectionTitle title={t("extra_services.cta_title")} center caps />
          <div className="flex justify-center gap-3 sm:gap-4 flex-wrap">
            <CTA to="/contact" label={t("extra_services.cta_request")} testid="extra-cta-request" />
            <CTA to="/contact" label={t("extra_services.cta_quote")} variant="ghost" testid="extra-cta-quote" />
          </div>
        </div>
      </section>
    </>
  );
}
