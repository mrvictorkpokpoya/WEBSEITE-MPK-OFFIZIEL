import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Newspaper, Calendar, ArrowRight, Tag } from "lucide-react";
import { PageHero } from "@/components/Common";

const POST_IDS = ["blog-01", "blog-02", "blog-03", "blog-04", "blog-05", "blog-06"];
const READ_MIN = [8, 5, 7, 10, 6, 5];

export default function Blog() {
  const { t } = useTranslation();
  const [activeCat, setActiveCat] = useState(0);
  const categories = t("blog.categories", { returnObjects: true });
  const posts = t("blog.posts", { returnObjects: true });

  return (
    <>
      <PageHero
        eyebrow={t("blog.hero_eyebrow")}
        title={t("blog.hero_title")}
        kicker={t("blog.hero_kicker")}
      />

      <section className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-10 lg:py-14">
        {/* Catégories */}
        <div className="flex flex-wrap gap-2 mb-8 lg:mb-10">
          {categories.map((c, idx) => (
            <button
              key={idx}
              data-testid={`blog-cat-${idx}`}
              onClick={() => setActiveCat(idx)}
              className={`px-4 py-2 text-sm border ${idx === activeCat ? "bg-[#580505] text-[#C4D2ED] border-[#580505]" : "border-[#580505]/30 text-[#580505] hover:bg-[#FAFAFA]"}`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Articles */}
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
              <h3 className="font-serif text-lg text-[#2F0808] mt-2 leading-snug">{p.title}</h3>
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

        <div className="mt-12 text-center max-w-2xl mx-auto">
          <p className="text-sm sm:text-base text-[#4A4A4A] font-light">
            {t("blog.collab_text")}{" "}
            <Link to="/contact" className="text-[#580505] border-b border-[#580505]">{t("blog.collab_link")}</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
