import React from "react";
import { Gift, Heart, Sparkles, Award, BookOpen, Zap, Crown, Languages } from "lucide-react";
import { PageHero, Eyebrow } from "@/components/Common";
import { addToCartWithToast, formatXof } from "@/lib/cart";
import {
  LANGUAGE_COURSES,
  SEMI_FULL,
  VIP_SUBLEVELS,
  VIP_FULL,
  ENGLISH_COURSES,
  ENGLISH_FULL,
  ENGLISH_VIP_SUBLEVELS,
  ENGLISH_VIP_FULL,
  BUNDLES,
  ENGLISH_BUNDLES,
  PREP_COURSES,
  PREP_PRICING,
  KIDS_ENGLISH,
} from "@/lib/data";

/* ============ Reusable Gift Card ============ */
function GiftCardItem({ id, title, subtitle, price, badge, tone = "#580505", accent = "#C4D2ED" }) {
  const isQuote = !id || String(price).toLowerCase().includes("devis") || String(price).toLowerCase().includes("demande");
  return (
    <article data-testid={`gift-card-${id || title}`} className="relative bg-white border border-[#580505]/15 p-5 flex flex-col group hover:shadow-[0_18px_40px_-14px_rgba(88,5,5,0.32)] transition-shadow overflow-hidden">
      {/* Ribbon */}
      <div className="absolute -top-2 -right-2 w-14 h-14" aria-hidden>
        <div className="absolute inset-0 rotate-45 translate-x-3 -translate-y-1 w-20 h-5 text-[8px] tracking-[0.2em] uppercase font-bold text-white grid place-items-center" style={{ background: tone }}>GIFT</div>
      </div>
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full grid place-items-center shrink-0" style={{ background: tone, color: accent }}>
          <Gift size={16} strokeWidth={1.5} />
        </div>
        <div className="flex-grow min-w-0">
          {badge && <div className="inline-block text-[9px] tracking-[0.18em] uppercase font-bold px-2 py-0.5 mb-1.5" style={{ background: `${tone}15`, color: tone }}>{badge}</div>}
          <h3 className="font-serif text-base text-[#2F0808] leading-snug">{title}</h3>
          {subtitle && <p className="mt-1 text-xs text-[#4A4A4A]/80 font-light leading-snug">{subtitle}</p>}
        </div>
      </div>
      <div className="mt-4 pt-3 border-t border-[#580505]/10 flex items-center justify-between gap-2">
        <div>
          <div className="text-[9px] uppercase tracking-wider text-[#4A4A4A]/70">Valeur</div>
          <div className="font-serif text-base font-bold" style={{ color: tone }}>{isQuote ? "Sur devis" : `${price} FCFA`}</div>
        </div>
        {isQuote ? (
          <a href="/contact" data-testid={`gift-quote-${id || title}`} className="inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold border-[1.5px] hover:bg-[#FAFAFA] transition" style={{ color: tone, borderColor: tone }}>
            <Heart size={12} /> Devis
          </a>
        ) : (
          <button onClick={() => addToCartWithToast(id, "🎁 Carte cadeau ajoutée au panier")} data-testid={`gift-buy-${id}`} className="inline-flex items-center gap-1 px-3 py-2 text-xs font-bold text-white hover:opacity-90 transition" style={{ background: tone }}>
            <Gift size={12} /> Offrir
          </button>
        )}
      </div>
    </article>
  );
}

/* ============ Section Heading ============ */
function GiftSection({ icon: Icon, eyebrow, title, kicker, tone = "#580505", children }) {
  return (
    <section className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-10 lg:py-14">
      <div className="mb-7 flex items-start gap-4">
        <div className="w-12 h-12 grid place-items-center shrink-0 rounded-full" style={{ background: `${tone}15`, color: tone }}>
          <Icon size={20} strokeWidth={1.5} />
        </div>
        <div>
          <Eyebrow><span style={{ color: tone }}>{eyebrow}</span></Eyebrow>
          <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#2F0808] mt-1 leading-tight">{title}</h2>
          {kicker && <p className="mt-2 text-sm text-[#4A4A4A] font-light max-w-3xl leading-relaxed">{kicker}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}

const Grid = ({ children }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">{children}</div>
);

export default function GiftCards() {
  return (
    <>
      <PageHero
        eyebrow="MPK Cartes Cadeaux"
        title="Offrez un cours, offrez un avenir."
        kicker="TOUS nos packs, individuels ou groupés, sont disponibles en achat libre sous forme de cartes cadeaux. Idéal pour offrir à un·e proche le démarrage d'une langue, d'une certification ou d'un parcours complet."
      />

      {/* Banner */}
      <section className="bg-gradient-to-r from-[#580505] to-[#2F0808] text-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-6 grid sm:grid-cols-3 gap-4 text-center">
          <div data-testid="gift-perk-1" className="flex items-center justify-center gap-3">
            <Heart size={18} className="text-[#C4D2ED]" />
            <div className="text-xs sm:text-sm font-light">Achat libre — pour soi ou un proche</div>
          </div>
          <div data-testid="gift-perk-2" className="flex items-center justify-center gap-3">
            <Sparkles size={18} className="text-[#C4D2ED]" />
            <div className="text-xs sm:text-sm font-light">Valable sur tous nos campus MPK</div>
          </div>
          <div data-testid="gift-perk-3" className="flex items-center justify-center gap-3">
            <Award size={18} className="text-[#C4D2ED]" />
            <div className="text-xs sm:text-sm font-light">Validité 12 mois après achat</div>
          </div>
        </div>
      </section>

      {/* 1. ALLEMAND — Semi-Intensif sous-niveaux */}
      <GiftSection icon={BookOpen} eyebrow="Allemand · Semi-Intensif" title="Sous-niveaux A1.1 → C2.2" kicker="4 semaines · 64 UE par sous-niveau. Cours du jour et du soir, en présentiel ou en ligne." tone="#580505">
        <Grid>
          {LANGUAGE_COURSES.map((c) => (
            <GiftCardItem key={c.id} id={c.id} title={c.title} subtitle={`${c.duration}`} badge={c.level} price={c.priceFcfa} tone="#580505" accent="#C4D2ED" />
          ))}
        </Grid>
      </GiftSection>

      {/* 2. ALLEMAND — Niveaux complets */}
      <GiftSection icon={Languages} eyebrow="Allemand · Niveau complet" title="Packs A1 → C2 complets" kicker="Économisez avec les niveaux complets — 8 semaines / 128 UE par niveau." tone="#2B0000">
        <Grid>
          {SEMI_FULL.map((s) => (
            <GiftCardItem key={s.pkg || s.level} id={s.pkg} title={`Allemand ${s.level} complet`} subtitle="Niveau complet · Semi-Intensif" badge={s.level} price={s.fcfa} tone="#2B0000" accent="#C4D2ED" />
          ))}
        </Grid>
      </GiftSection>

      {/* 3. ALLEMAND — VIP sous-niveaux */}
      <GiftSection icon={Crown} eyebrow="Allemand · Premium VIP" title="VIP Accéléré A1.1 → C2.2" kicker="Format accéléré, encadrement renforcé, petites cohortes." tone="#7A0000">
        <Grid>
          {VIP_SUBLEVELS.map((v) => (
            <GiftCardItem key={v.id} id={v.id} title={`Allemand VIP ${v.level}`} subtitle={`${v.weeks} sem · ${v.ue} UE`} badge={`VIP · ${v.level}`} price={v.fcfa} tone="#7A0000" accent="#FFD93D" />
          ))}
        </Grid>
      </GiftSection>

      {/* 4. ALLEMAND — VIP Niveaux complets */}
      <GiftSection icon={Crown} eyebrow="Allemand · Premium VIP" title="VIP — Niveaux complets" kicker="Du A1 au C2 en accéléré. Encadrement individualisé." tone="#A30000">
        <Grid>
          {VIP_FULL.map((v) => (
            <GiftCardItem key={v.pkg || v.level} id={v.pkg} title={`Allemand VIP ${v.level} complet`} subtitle={`${v.weeks} semaines`} badge={`VIP · ${v.level}`} price={v.fcfa} tone="#A30000" accent="#FFD93D" />
          ))}
        </Grid>
      </GiftSection>

      {/* 5. ALLEMAND — Bundles */}
      <GiftSection icon={Zap} eyebrow="Allemand · Bundles" title="8 parcours en pack — jusqu'à -15%" kicker="Les parcours combinés A1→C1 pour aller plus loin à un meilleur tarif." tone="#000000">
        <Grid>
          {BUNDLES.map((b) => (
            <GiftCardItem key={b.id} id={b.id} title={b.title} subtitle={`${b.levels} · ${b.weeks}`} badge={`PACK · -${b.save}`} price={b.discounted} tone={b.tone} accent="#FFD93D" />
          ))}
        </Grid>
      </GiftSection>

      {/* 6. ANGLAIS — Sous-niveaux */}
      <GiftSection icon={BookOpen} eyebrow="Anglais · Semi-Intensif" title="Sous-niveaux A1.1 → C2.2" kicker="4 semaines · 36 UE par sous-niveau (3×3h/semaine). -20% vs allemand." tone="#1F2A4A">
        <Grid>
          {ENGLISH_COURSES.map((c) => (
            <GiftCardItem key={c.id} id={c.id} title={c.title} subtitle={c.duration} badge={c.level} price={c.priceFcfa} tone="#1F2A4A" accent="#C4D2ED" />
          ))}
        </Grid>
      </GiftSection>

      {/* 7. ANGLAIS — Niveaux complets */}
      <GiftSection icon={Languages} eyebrow="Anglais · Niveau complet" title="Packs A1 → C2 complets" kicker="Niveaux Anglais complets — meilleur rapport temps/prix." tone="#0F1F3D">
        <Grid>
          {ENGLISH_FULL.map((s) => (
            <GiftCardItem key={s.pkg || s.level} id={s.pkg} title={`Anglais ${s.level} complet`} subtitle="Niveau complet" badge={s.level} price={s.fcfa} tone="#0F1F3D" accent="#C4D2ED" />
          ))}
        </Grid>
      </GiftSection>

      {/* 8. ANGLAIS — VIP sous-niveaux */}
      <GiftSection icon={Crown} eyebrow="Anglais · Premium VIP" title="VIP Accéléré A1.1 → C2.2" kicker="Format accéléré anglais — préparation IELTS / TOEFL / Cambridge." tone="#2C3E70">
        <Grid>
          {ENGLISH_VIP_SUBLEVELS.map((v) => (
            <GiftCardItem key={v.id} id={v.id} title={`Anglais VIP ${v.level}`} subtitle={`${v.weeks} sem · ${v.ue} UE`} badge={`VIP · ${v.level}`} price={v.fcfa} tone="#2C3E70" accent="#FFD93D" />
          ))}
        </Grid>
      </GiftSection>

      {/* 9. ANGLAIS — VIP Niveaux complets */}
      <GiftSection icon={Crown} eyebrow="Anglais · Premium VIP" title="VIP — Niveaux complets" kicker="Anglais en accéléré, du A1 au C2." tone="#3A5285">
        <Grid>
          {ENGLISH_VIP_FULL.map((v) => (
            <GiftCardItem key={v.pkg || v.level} id={v.pkg} title={`Anglais VIP ${v.level} complet`} subtitle={`${v.weeks} semaines`} badge={`VIP · ${v.level}`} price={v.fcfa} tone="#3A5285" accent="#FFD93D" />
          ))}
        </Grid>
      </GiftSection>

      {/* 10. ANGLAIS — Bundles */}
      <GiftSection icon={Zap} eyebrow="Anglais · Bundles" title="8 parcours en pack — jusqu'à -15%" kicker="Parcours combinés A1→C1 anglais à tarif préférentiel." tone="#0A1830">
        <Grid>
          {ENGLISH_BUNDLES.map((b) => (
            <GiftCardItem key={b.id} id={b.id} title={b.title} subtitle={`${b.levels} · ${b.weeks}`} badge={`PACK · -${b.save}`} price={b.discounted} tone={b.tone || "#1F2A4A"} accent="#FFD93D" />
          ))}
        </Grid>
      </GiftSection>

      {/* 11. PREP EXAMENS — Goethe / ÖSD interne + externe */}
      <GiftSection icon={Award} eyebrow="Cours Préparatoires" title="Préparation aux examens Goethe & ÖSD" kicker="03 semaines de préparation intensive — formules Interne MPK (apprenants) et Externe (non-apprenants)." tone="#E6A600">
        <Grid>
          {PREP_COURSES.flatMap((p) => {
            const lvl = p.level;
            const interne = PREP_PRICING[lvl]?.interne;
            const externe = PREP_PRICING[lvl]?.externe;
            return [
              <GiftCardItem key={`${p.id}_int`} id={`${p.id}_int`} title={`${p.short} · Interne MPK`} subtitle={`${p.exam} · ${p.duration} · ${PREP_PRICING[lvl]?.temps}`} badge={`${lvl} · INTERNE`} price={interne} tone="#E6A600" accent="#2F0808" />,
              <GiftCardItem key={`${p.id}_ext`} id={`${p.id}_ext`} title={`${p.short} · Externe`} subtitle={`${p.exam} · ${p.duration} · ${PREP_PRICING[lvl]?.temps}`} badge={`${lvl} · EXTERNE`} price={externe} tone="#C58A00" accent="#FFF8E1" />,
            ];
          })}
        </Grid>
      </GiftSection>

      {/* 12. KIDS */}
      <GiftSection icon={Heart} eyebrow="MPK Kids" title="Initiation Anglais pour enfants" kicker="Une carte cadeau parfaite pour un enfant — initiation ludique à l'anglais." tone="#A30000">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <GiftCardItem id={KIDS_ENGLISH.id} title={KIDS_ENGLISH.title} subtitle={`${KIDS_ENGLISH.duration} · ${KIDS_ENGLISH.desc}`} badge="ENFANTS" price={KIDS_ENGLISH.priceFcfa} tone="#A30000" accent="#FFD93D" />
        </div>
      </GiftSection>

      {/* FOOTER NOTE */}
      <section className="bg-[#FAFAFA] border-t border-[#580505]/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-10 py-10 lg:py-12 text-center">
          <p className="text-sm sm:text-base text-[#4A4A4A] font-light max-w-3xl mx-auto leading-relaxed">
            🎁 <strong className="text-[#2F0808]">Comment ça marche ?</strong> Après votre achat, vous recevez un code cadeau par email. Transmettez-le au bénéficiaire — il pourra le présenter lors de son inscription sur l&apos;un des 6 campus MPK. <br className="hidden sm:block" />Tous nos tarifs incluent la qualité pédagogique MPK et l&apos;accès à la communauté apprenante.
          </p>
        </div>
      </section>
    </>
  );
}
