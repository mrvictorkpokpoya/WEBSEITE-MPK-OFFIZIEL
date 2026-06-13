import React, { useState } from "react";
import { PageHero, Eyebrow } from "@/components/Common";
import { TEAM_CATEGORIES } from "@/lib/data";

const FILTERS = ["Tous", ...TEAM_CATEGORIES.map((c) => c.title)];

function Initials({ name }) {
  const parts = name.split(" ").filter((p) => p && !p.startsWith("(") && p !== "À");
  const initials = parts.slice(0, 2).map((p) => p[0]).join("");
  return <>{initials || "MK"}</>;
}

function MemberCard({ m }) {
  return (
    <div className="mpk-card overflow-hidden">
      <div className={`aspect-[4/5] grid place-items-center text-white font-serif text-5xl ${m.placeholder ? "bg-gradient-to-b from-[#580505]/40 to-[#2F0808]/40" : "bg-gradient-to-b from-[#580505] to-[#2F0808]"}`}>
        <Initials name={m.name} />
      </div>
      <div className="p-5">
        <div className="text-[10px] tracking-[0.18em] uppercase text-[#580505] font-semibold">{m.placeholder ? "Poste" : m.gender === "F" ? "Mme" : "M."}</div>
        <h3 className="font-serif text-lg text-[#2F0808] mt-1 leading-snug">{m.name}</h3>
        <div className="text-sm text-[#580505] mt-1">{m.role}</div>
      </div>
    </div>
  );
}

export default function Team() {
  const [filter, setFilter] = useState("Tous");
  const visible = filter === "Tous" ? TEAM_CATEGORIES : TEAM_CATEGORIES.filter((c) => c.title === filter);
  return (
    <>
      <PageHero
        eyebrow="La Team MPK"
        title="L'humain derrière le réseau."
        kicker="Direction actuelle, équipe technique et anciens collègues maintenant établis en Allemagne — tous engagés dans l'aventure MULTIPLIKATOR."
      />
      <section className="max-w-[1400px] mx-auto px-5 lg:px-10 py-12">
        <div className="flex flex-wrap gap-2 mb-12">
          {FILTERS.map((c) => (
            <button
              key={c}
              data-testid={`team-filter-${c}`}
              onClick={() => setFilter(c)}
              className={`px-4 py-2 text-sm border ${filter === c ? "bg-[#580505] text-white border-[#580505]" : "border-[#580505]/30 text-[#580505] hover:bg-[#FAFAFA]"}`}
            >
              {c}
            </button>
          ))}
        </div>

        {visible.map((cat) => (
          <div key={cat.id} className="mb-16">
            <Eyebrow>{cat.id === "admin" ? "Direction" : cat.id === "technique" ? "IT & Communication" : "Mémoire & héritage"}</Eyebrow>
            <h2 className="font-serif text-3xl lg:text-4xl text-[#2F0808] mt-3 uppercase tracking-tight">{cat.title}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
              {cat.members.map((m, i) => (
                <MemberCard key={`${cat.id}-${i}`} m={m} />
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
