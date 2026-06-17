import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { PageHero, Eyebrow } from "@/components/Common";
import { TEAM_CATEGORIES } from "@/lib/data";

function Initials({ name }) {
  const parts = name.split(" ").filter((p) => p && !p.startsWith("(") && p !== "À");
  const initials = parts.slice(0, 2).map((p) => p[0]).join("");
  return <>{initials || "MK"}</>;
}

function MemberCard({ m }) {
  const { t } = useTranslation();
  const isPlaceholder = !!m.placeholder;
  const displayName = isPlaceholder ? t("team.to_come") : m.name;
  const tag = isPlaceholder ? t("team.role_position") : (m.gender === "F" ? t("team.mrs") : t("team.mr"));
  return (
    <div className="mpk-card overflow-hidden">
      <div className={`aspect-[4/5] grid place-items-center text-white font-serif text-5xl ${isPlaceholder ? "bg-gradient-to-b from-[#580505]/40 to-[#2F0808]/40" : "bg-gradient-to-b from-[#580505] to-[#2F0808]"}`}>
        <Initials name={m.name} />
      </div>
      <div className="p-5">
        <div className="text-[10px] tracking-[0.18em] uppercase text-[#580505] font-semibold">{tag}</div>
        <h3 className="font-serif text-lg text-[#2F0808] mt-1 leading-snug">{displayName}</h3>
        <div className="text-sm text-[#580505] mt-1">{m.role}</div>
      </div>
    </div>
  );
}

export default function Team() {
  const { t } = useTranslation();
  const filters = ["all", ...TEAM_CATEGORIES.map((c) => c.id)];
  const [filter, setFilter] = useState("all");
  const visible = filter === "all" ? TEAM_CATEGORIES : TEAM_CATEGORIES.filter((c) => c.id === filter);
  return (
    <>
      <PageHero
        eyebrow={t("team.hero_eyebrow")}
        title={t("team.hero_title")}
        kicker={t("team.hero_kicker")}
      />
      <section className="max-w-[1400px] mx-auto px-5 lg:px-10 py-12">
        <div className="flex flex-wrap gap-2 mb-12">
          {filters.map((id) => {
            const label = id === "all" ? t("common.all") : t(`team.categories.${id}.title`, { defaultValue: TEAM_CATEGORIES.find((c) => c.id === id)?.title });
            return (
              <button
                key={id}
                data-testid={`team-filter-${id}`}
                onClick={() => setFilter(id)}
                className={`px-4 py-2 text-sm border ${filter === id ? "bg-[#580505] text-white border-[#580505]" : "border-[#580505]/30 text-[#580505] hover:bg-[#FAFAFA]"}`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {visible.map((cat) => {
          const title = t(`team.categories.${cat.id}.title`, { defaultValue: cat.title });
          const eyebrowTxt = t(`team.categories.${cat.id}.eyebrow`, { defaultValue: cat.title });
          return (
            <div key={cat.id} className="mb-16">
              <Eyebrow>{eyebrowTxt}</Eyebrow>
              <h2 className="font-serif text-3xl lg:text-4xl text-[#2F0808] mt-3 uppercase tracking-tight">{title}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
                {cat.members.map((m, i) => (
                  <MemberCard key={`${cat.id}-${i}`} m={m} />
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}
