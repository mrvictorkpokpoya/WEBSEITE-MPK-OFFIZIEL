import React from "react";
import { PageHero } from "@/components/Common";

export default function DataPolicy() {
  return (
    <>
      <PageHero
        eyebrow="Conformité"
        title="Politique de traitement des données"
        kicker="Conditions de traitement, de stockage et de sécurisation des données personnelles collectées par MULTIPLIKATOR Institut de Langues."
      />
      <section className="max-w-[900px] mx-auto px-5 lg:px-10 py-12 space-y-8 text-[#4A4A4A] leading-relaxed font-light">
        <div>
          <h2 className="font-serif text-2xl text-[#2F0808] mb-3">1. Responsable du traitement</h2>
          <p>MULTIPLIKATOR START UP GROUP, siège social à Godomey PK 14, Cotonou (Bénin). Représentant légal : Direction Exécutive.</p>
        </div>
        <div>
          <h2 className="font-serif text-2xl text-[#2F0808] mb-3">2. Finalités du traitement</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Gestion administrative et pédagogique de l'apprenant.</li>
            <li>Émission de certifications et relevés de notes.</li>
            <li>Communication institutionnelle (newsletter optionnelle).</li>
            <li>Statistiques anonymisées d'amélioration des programmes.</li>
          </ul>
        </div>
        <div>
          <h2 className="font-serif text-2xl text-[#2F0808] mb-3">3. Sécurité</h2>
          <p>Les données sont stockées sur des serveurs sécurisés, chiffrées en transit (HTTPS) et accessibles uniquement aux personnels habilités (direction, coordination, comptabilité).</p>
        </div>
        <div>
          <h2 className="font-serif text-2xl text-[#2F0808] mb-3">4. Transferts</h2>
          <p>Aucun transfert hors Bénin sauf nécessité opérationnelle (Goethe-Institut, ÖSD, universités partenaires en Allemagne) avec le consentement explicite de l'apprenant.</p>
        </div>
        <div>
          <h2 className="font-serif text-2xl text-[#2F0808] mb-3">5. Sous-traitants</h2>
          <p>Nos sous-traitants techniques (hébergement, paiement Stripe, envoi d'emails Resend) sont soumis à des engagements contractuels stricts de confidentialité.</p>
        </div>
        <div>
          <h2 className="font-serif text-2xl text-[#2F0808] mb-3">6. Contact</h2>
          <p>Pour toute question : <a href="mailto:contact@multiplikator-world.com" className="text-[#580505] underline">contact@multiplikator-world.com</a> · +229 01 96 59 38 66</p>
        </div>
      </section>
    </>
  );
}
