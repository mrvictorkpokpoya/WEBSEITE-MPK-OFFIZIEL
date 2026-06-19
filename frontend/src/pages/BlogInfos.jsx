import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Newspaper, Calendar, ArrowRight, Tag, Megaphone, FileText, Download } from "lucide-react";
import { PageHero, Eyebrow } from "@/components/Common";
import { FlyerCalendar, FlyerAcademicHolidays, FlyerExamGoodLuck } from "@/components/MpkFlyers";

const POST_IDS = ["blog-01", "blog-02", "blog-03", "blog-04", "blog-05", "blog-06"];
const READ_MIN = [8, 5, 7, 10, 6, 5];

export default function BlogInfos() {
  const { t } = useTranslation();
  const [activeCat, setActiveCat] = React.useState(0);
  const categories = t("blog.categories", { returnObjects: true });
  const posts = t("blog.posts", { returnObjects: true });
  const newsItems = t("news.items_inline", { returnObjects: true, defaultValue: [] });

  return (
    <>
      <PageHero
        eyebrow={t("blog_infos.hero_eyebrow")}
        title={t("blog_infos.hero_title")}
        kicker={t("blog_infos.hero_kicker")}
      />

      {/* SECTION 1 — INFOS PRATIQUES (visuels dépliants) */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-12 lg:py-16">
        <div className="mb-8">
          <Eyebrow>{t("blog_infos.visuals_eyebrow")}</Eyebrow>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#2F0808] mt-2 leading-tight">{t("blog_infos.visuals_title")}</h2>
          <p className="mt-3 text-sm sm:text-base text-[#4A4A4A] max-w-2xl font-light leading-relaxed">{t("blog_infos.visuals_kicker")}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <FlyerCalendar />
          <FlyerExamGoodLuck />
          <FlyerAcademicHolidays />
        </div>
      </section>

      {/* SECTION 2 — ARTICLES BLOG */}
      <section className="bg-[#FAFAFA] border-y border-[#580505]/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-12 lg:py-16">
          <div className="mb-8">
            <Eyebrow>{t("blog_infos.articles_eyebrow")}</Eyebrow>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#2F0808] mt-2 leading-tight">{t("blog_infos.articles_title")}</h2>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((c, idx) => (
              <button
                key={idx}
                data-testid={`blog-cat-${idx}`}
                onClick={() => setActiveCat(idx)}
                className={`px-4 py-2 text-xs sm:text-sm border ${idx === activeCat ? "bg-[#580505] text-[#C4D2ED] border-[#580505]" : "border-[#580505]/30 text-[#580505] hover:bg-white"}`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {posts.map((p, i) => (
              <article
                key={POST_IDS[i]}
                data-testid={`blog-card-${POST_IDS[i]}`}
                className="bg-white rounded-sm p-5 sm:p-6 shadow-[0_8px_24px_-12px_rgba(88,5,5,0.18)] hover:shadow-[0_14px_36px_-12px_rgba(88,5,5,0.28)] transition-shadow duration-300 flex flex-col h-full"
              >
                <div className="w-12 h-12 rounded-full bg-[#F4F0F0] grid place-items-center mb-4">
                  <Newspaper className="text-[#580505]" size={18} strokeWidth={1.5} />
                </div>
                <div className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.18em] uppercase text-[#580505] font-semibold">
                  <Tag size={10} /> {p.category}
                </div>
                <h3 className="font-serif text-base sm:text-lg text-[#2F0808] mt-2 leading-snug">{p.title}</h3>
                <div className="mt-3 mb-3 h-px bg-[#580505]/15 w-full" />
                <p className="text-sm text-[#4A4A4A] font-light leading-relaxed flex-grow">{p.excerpt}</p>
                <div className="mt-4 flex items-center justify-between text-[10px] uppercase tracking-wider">
                  <span className="inline-flex items-center gap-1 text-[#580505]/60"><Calendar size={11} /> {t("blog.date_soon")}</span>
                  <span className="text-[#4A4A4A]/70">{t("blog.read_min", { n: READ_MIN[i] })}</span>
                </div>
                <div className="mt-4 inline-flex items-center gap-1.5 text-sm text-[#580505] border-b border-[#580505] self-start opacity-60 cursor-not-allowed">
                  {t("blog.coming")} <ArrowRight size={13} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — ACTUALITÉS */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-12 lg:py-16">
        <div className="mb-8">
          <Eyebrow>{t("blog_infos.news_eyebrow")}</Eyebrow>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#2F0808] mt-2 leading-tight">{t("blog_infos.news_title")}</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {(newsItems.length ? newsItems : [1,2,3,4,5,6]).map((n, i) => (
            <article key={i} className="bg-white border border-[#580505]/15 p-5 sm:p-6 hover:shadow-[0_14px_36px_-12px_rgba(88,5,5,0.28)] transition-shadow">
              <div className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.18em] uppercase text-[#580505] font-semibold">
                <Megaphone size={11} /> {n.tag || t("blog_infos.news_tag")}
              </div>
              <h3 className="font-serif text-base sm:text-lg text-[#2F0808] mt-2 leading-snug">{n.title || t(`blog_infos.news_default.${i}.title`, { defaultValue: t("blog_infos.news_default_title") })}</h3>
              <div className="mt-3 mb-3 h-px bg-[#580505]/15 w-full" />
              <p className="text-sm text-[#4A4A4A] font-light leading-relaxed">{n.excerpt || t(`blog_infos.news_default.${i}.excerpt`, { defaultValue: t("blog_infos.news_default_excerpt") })}</p>
            </article>
          ))}
        </div>
      </section>

      {/* SECTION 4 — TÉLÉCHARGEMENTS */}
      <section className="bg-[#580505] text-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-12 lg:py-16 grid lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-semibold text-[#C4D2ED]">
              <FileText size={12} /> {t("blog_infos.downloads_eyebrow")}
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl mt-3">{t("blog_infos.downloads_title")}</h2>
            <p className="mt-3 text-white/80 font-light leading-relaxed max-w-2xl">{t("blog_infos.downloads_kicker")}</p>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <Link to="/telechargements" data-testid="blog-infos-downloads-cta" className="inline-flex items-center gap-2 bg-white text-[#580505] px-5 py-3 text-sm font-bold tracking-wider hover:bg-[#C4D2ED] transition">
              <Download size={14} /> {t("blog_infos.downloads_cta")}
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-12 text-center">
        <p className="text-sm sm:text-base text-[#4A4A4A] font-light max-w-2xl mx-auto">
          {t("blog.collab_text")}{" "}
          <Link to="/contact" className="text-[#580505] border-b border-[#580505]">{t("blog.collab_link")}</Link>.
        </p>
      </section>
    </>
  );
}
