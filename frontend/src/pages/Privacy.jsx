import React from "react";
import { PageHero } from "@/components/Common";

export default function Privacy() {
  return (
    <>
      <PageHero
        eyebrow="Conformité"
        title="Politique de confidentialité"
        kicker="MULTIPLIKATOR Institut de Langues s'engage à protéger les données personnelles de ses apprenant.e.s, candidat.e.s et visiteurs du site."
      />
      <section className="max-w-[900px] mx-auto px-5 lg:px-10 py-12 space-y-8 text-[#4A4A4A] leading-relaxed font-light">
        <div>
          <h2 className="font-serif text-2xl text-[#2F0808] mb-3">1. Collecte des données</h2>
          <p>Nous collectons uniquement les données nécessaires à la gestion des inscriptions, à la communication pédagogique et au suivi administratif : nom, prénom, email, téléphone, campus de rattachement, parcours suivi.</p>
        </div>
        <div>
          <h2 className="font-serif text-2xl text-[#2F0808] mb-3">2. Utilisation des données</h2>
          <p>Vos informations sont utilisées exclusivement pour : la gestion de votre dossier d'apprenant, l'envoi d'informations relatives à votre formation, les communications légales et institutionnelles. Aucune revente à des tiers.</p>
        </div>
        <div>
          <h2 className="font-serif text-2xl text-[#2F0808] mb-3">3. Conservation</h2>
          <p>Les données sont conservées pendant la durée de la formation et jusqu'à 5 ans après la dernière interaction, conformément à la réglementation béninoise et aux bonnes pratiques internationales.</p>
        </div>
        <div>
          <h2 className="font-serif text-2xl text-[#2F0808] mb-3">4. Vos droits</h2>
          <p>Vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition concernant vos données. Pour exercer ces droits : <a href="mailto:contact@multiplikator-world.com" className="text-[#580505] underline">contact@multiplikator-world.com</a>.</p>
        </div>
        <div>
          <h2 className="font-serif text-2xl text-[#2F0808] mb-3">5. Cookies</h2>
          <p>Le site utilise des cookies techniques uniquement (session, sécurité). Aucun cookie publicitaire tiers n'est déposé.</p>
        </div>
      </section>
    </>
  );
}
