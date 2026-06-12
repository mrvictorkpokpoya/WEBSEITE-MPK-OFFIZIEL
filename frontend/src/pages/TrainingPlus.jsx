import React from "react";
import { Link } from "react-router-dom";
import { PageHero, Eyebrow, CTA, SectionTitle } from "@/components/Common";
import { SEMI_SUBLEVELS, SEMI_FULL, VIP_SUBLEVELS, VIP_FULL, VIP_INTENSIVE, BUNDLES } from "@/lib/data";
import { Star, Lock } from "lucide-react";

function PricingTable({ headers, rows }) {
  return (
    <div className="scroll-x"><table className="mpk-table min-w-[640px]">
      <thead><tr>{headers.map((h) => <th key={h}>{h}</th>)}</tr></thead>
      <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody>
    </table></div>
  );
}

function ComingSoon({ title }) {
  return (
    <div className="mpk-card p-10 text-center">
      <Lock className="mx-auto text-[#580505]" size={28} />
      <h3 className="font-serif text-2xl text-[#2F0808] mt-4">{title}</h3>
      <p className="mt-3 text-[#4A4A4A] font-light max-w-xl mx-auto">Offre en cours de mise à jour — détails disponibles prochainement. Contactez-nous pour être informé.e dès l'ouverture.</p>
      <div className="mt-6"><Link to="/contact" className="btn-primary text-sm">Me notifier</Link></div>
    </div>
  );
}

export default function TrainingPlus() {
  return (
    <>
      <PageHero eyebrow="MPK Training Plus" title="Formation linguistique — le département principal." kicker="Allemand, anglais, FLE, chinois. Du semi-intensif accessible au Premium VIP accéléré, structuré par sous-niveaux pour vous laisser entrer à votre rythme." />

      <section className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16">
        <Eyebrow>Allemand · Programme opérationnel</Eyebrow>
        <h2 className="font-serif text-3xl lg:text-4xl text-[#2F0808] mt-3">Allemand Semi-Intensif A1 → B1 (+B2)</h2>
        <p className="mt-3 text-[#4A4A4A] max-w-3xl font-light">8 semaines par niveau · lundi au jeudi · créneaux 08:00-11:00 / 11:30-14:30 / 15:00-18:00 / 18:30-21:30 ou personnalisé. Frais d'inscription unique : 5.000 FCFA. Frais de documentation par niveau : 10.000 FCFA. Réduction 15% en paiement comptant.</p>

        <h3 className="font-serif text-2xl text-[#580505] mt-12">Tarifs par sous-niveau (Béninois)</h3>
        <div className="mt-5"><PricingTable headers={["Sous-niveau", "Durée", "Volume UE", "Tarif Béninois", "Diaspora / Intl."]} rows={SEMI_SUBLEVELS.map(r => [r.level, `${r.weeks} sem.`, `${r.ue} UE`, r.fcfa === 'sur devis' ? 'sur devis' : `${r.fcfa} FCFA`, r.eur === 'sur devis' ? 'sur devis' : `${r.eur} EUR`])} /></div>

        <h3 className="font-serif text-2xl text-[#580505] mt-12">Niveau complet (option recommandée)</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-5">
          {SEMI_FULL.map((r) => (
            <div key={r.level} className={`mpk-card p-6 ${r.level === 'B1' ? 'border-[#580505] bg-[#FAFAFA]' : ''}`}>
              {r.level === 'B1' && <div className="text-[10px] tracking-[0.2em] uppercase text-[#580505] font-semibold mb-2 flex items-center gap-1"><Star size={10} fill="#580505" stroke="#580505"/> Recommandé</div>}
              <div className="font-serif text-3xl text-[#2F0808]">{r.level}</div>
              <div className="text-xs text-[#550000] mt-1">A1.1 + A1.2 (parcours complet)</div>
              <div className="mt-4 font-serif text-2xl text-[#580505]">{r.fcfa === 'sur devis' ? 'Sur devis' : `${r.fcfa} FCFA`}</div>
              <div className="text-xs text-[#4A4A4A] mt-1">{r.eur === 'sur devis' ? '' : `${r.eur} EUR (Diaspora)`}</div>
              <Link to="/contact" className="mt-5 inline-block text-sm text-[#580505] border-b border-[#580505]">S'inscrire</Link>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#FAFAFA] border-y border-[#580505]/10">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16">
          <Eyebrow>Bundles Allemand · Parcours de progression</Eyebrow>
          <h2 className="font-serif text-3xl text-[#2F0808] mt-3">Packs multi-niveaux — économisez en vous projetant.</h2>
          <p className="mt-3 text-[#4A4A4A] max-w-2xl font-light">Réduction de 10% sur les packs de 2 niveaux et 15% sur les packs de 3 niveaux, en paiement comptant en une seule tranche.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
            {BUNDLES.map((b) => (
              <div key={b.id} className={`mpk-card p-7 relative ${b.featured ? 'border-[#580505]' : ''}`}>
                {b.featured && <div className="absolute top-0 right-0 bg-[#580505] text-white text-[10px] tracking-[0.2em] uppercase px-3 py-1">Best value</div>}
                <Eyebrow>{b.weeks}</Eyebrow>
                <h3 className="font-serif text-2xl text-[#2F0808] mt-2">{b.title}</h3>
                <div className="text-sm text-[#550000] mt-1">{b.levels}</div>
                <div className="flex items-baseline gap-3 mt-5"><span className="text-[#4A4A4A] line-through text-sm">{b.normal} FCFA</span><span className="text-[#580505] font-serif text-2xl">{b.discounted} FCFA</span></div>
                <div className="text-xs text-[#580505] mt-1">Économie de {b.save}</div>
                <Link to="/boutique" data-testid={`bundle-${b.id}`} className="mt-5 btn-primary text-sm">Choisir ce bundle</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16">
        <Eyebrow>Allemand Premium VIP Accéléré A1 → B1</Eyebrow>
        <h2 className="font-serif text-3xl text-[#2F0808] mt-3">4 semaines par niveau · 56 UE par sous-niveau</h2>
        <p className="mt-3 text-[#4A4A4A] max-w-3xl font-light">Lundi au jeudi, 08:00 – 14:30 (2 pauses de 20 min). Démarrage possible à partir de 2 candidat.e.s. Frais d'inscription unique : 10.000 FCFA. Réduction 15% en paiement comptant.</p>
        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          <div>
            <h3 className="font-serif text-xl text-[#580505] mb-4">Sous-niveaux</h3>
            <PricingTable headers={["Sous-niveau", "Durée", "UE", "Tarif"]} rows={VIP_SUBLEVELS.map(r => [r.level, `${r.weeks} sem.`, `${r.ue} UE`, `${r.fcfa} FCFA`])} />
          </div>
          <div>
            <h3 className="font-serif text-xl text-[#580505] mb-4">Niveau complet</h3>
            <PricingTable headers={["Niveau", "Tarif"]} rows={[...VIP_FULL.map(r => [r.level, `${r.fcfa} FCFA`]), ["C1", "Sur demande"]]} />
          </div>
        </div>
      </section>

      <section className="bg-[#FAFAFA] border-y border-[#580505]/10">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16">
          <Eyebrow>Premium VIP Intensif Accéléré B2 → C1</Eyebrow>
          <h2 className="font-serif text-3xl text-[#2F0808] mt-3">214 UE · 8 semaines · 7 UE par séance</h2>
          <p className="mt-3 text-[#4A4A4A] max-w-3xl font-light">Lundi au jeudi 08:00 – 14:30. Frais d'inscription : 10.000 FCFA. Paiement possible en 2 tranches.</p>
          <div className="mt-6 max-w-2xl"><PricingTable headers={["Niveau", "UE", "Durée", "Tarif"]} rows={VIP_INTENSIVE.map(r => [r.level, `${r.ue} UE`, `${r.weeks} sem.`, `${r.fcfa} FCFA`])} /></div>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-5 lg:px-10 py-16 grid lg:grid-cols-3 gap-5">
        <ComingSoon title="Cours d'Anglais" />
        <ComingSoon title="Cours de Français Langue Étrangère" />
        <ComingSoon title="Cours de Chinois" />
      </section>

      <section className="max-w-[1400px] mx-auto px-5 lg:px-10 py-20 text-center">
        <SectionTitle eyebrow="Prêt à commencer ?" title="Un conseiller MPK vous guide vers le bon parcours." center />
        <div className="flex justify-center gap-4 flex-wrap"><CTA to="/contact" label="Demander un devis" testid="training-cta-quote" /><CTA to="/boutique" label="Voir bundles & cartes" variant="ghost" testid="training-cta-shop" /></div>
      </section>
    </>
  );
}
