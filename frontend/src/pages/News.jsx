import React from "react";
import { useTranslation } from "react-i18next";
import { PageHero, Eyebrow, CTA } from "@/components/Common";
import { NEWS } from "@/lib/data";
import { Calendar } from "lucide-react";

export default function News() {
  const { t } = useTranslation();
  return (
    <>
      <PageHero
        eyebrow={t("news.hero_eyebrow")}
        title={t("news.hero_title")}
        kicker={t("news.hero_kicker")}
      />
      <section className="max-w-[1400px] mx-auto px-5 lg:px-10 py-12 grid lg:grid-cols-2 gap-6">
        {NEWS.map((n) => {
          const title = t(`news.items.${n.id}.title`, { defaultValue: n.title });
          const excerpt = t(`news.items.${n.id}.excerpt`, { defaultValue: n.excerpt });
          const tag = t(`news.items.${n.id}.tag`, { defaultValue: n.tag });
          return (
            <article key={n.id} className="mpk-card p-7">
              <div className="flex items-center justify-between text-xs">
                <Eyebrow>{tag}</Eyebrow>
                <span className="text-[#4A4A4A] flex items-center gap-1.5"><Calendar size={12}/> {n.date}</span>
              </div>
              <h2 className="font-serif text-2xl text-[#2F0808] mt-3">{title}</h2>
              <p className="mt-3 text-[#4A4A4A] font-light leading-relaxed">{excerpt}</p>
              <a href="#" className="inline-flex items-center gap-1 mt-5 text-[#580505] border-b border-[#580505] text-sm">{t("news.read_more")}</a>
            </article>
          );
        })}
      </section>

      <section className="bg-[#450000] text-white">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16 grid lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8">
            <Eyebrow><span className="text-white/70">{t("news.concours_eyebrow")}</span></Eyebrow>
            <h2 className="font-serif text-3xl lg:text-4xl mt-3">{t("news.concours_title")}</h2>
            <p className="mt-3 text-white/80 font-light">{t("news.concours_desc")}</p>
          </div>
          <div className="lg:col-span-4 lg:text-right"><CTA to="/contact" label={t("news.concours_cta")} testid="news-cta-concours"/></div>
        </div>
      </section>
    </>
  );
}
