import React from "react";
import { useTranslation } from "react-i18next";
import { PageHero } from "@/components/Common";

const Section = ({ n, title, children }) => (
  <div>
    <h2 className="font-serif text-xl sm:text-2xl text-[#2F0808] mb-3">
      <span className="text-[#580505]">{n}.</span> {title}
    </h2>
    <div className="text-[#4A4A4A] font-light leading-relaxed space-y-2">{children}</div>
  </div>
);

export default function Terms() {
  const { t } = useTranslation();
  return (
    <>
      <PageHero
        eyebrow={t("terms.hero_eyebrow")}
        title={t("terms.hero_title")}
        kicker={t("terms.hero_kicker")}
      />
      <section className="max-w-[900px] mx-auto px-4 sm:px-5 lg:px-10 py-10 lg:py-14 space-y-8 sm:space-y-10 text-sm sm:text-base">
        <div className="text-xs sm:text-sm text-[#4A4A4A]/80 italic">{t("terms.updated")}</div>

        <Section n="1" title="Objet">
          <p>Les présentes Conditions Générales d'Utilisation (« CGU ») régissent l'accès et l'utilisation du site internet multiplikator-world.com (« le Site ») ainsi que des services en ligne associés (espace apprenant, boutique en ligne, formulaires de contact, etc.).</p>
          <p>Toute utilisation du Site implique l'acceptation pleine et entière des présentes CGU.</p>
        </Section>

        <Section n="2" title="Éditeur du Site">
          <p><strong>MULTIPLIKATOR START UP GROUP</strong><br/>Réseau d'instituts de langues — multi-campus<br/>Siège social : GODOMEY PK14 2è VONS APRÈS ORYNX, Cotonou (Bénin)<br/>Email : contact@multiplikator-world.com<br/>Téléphone : +229 01 96 59 38 66 / +229 01 99 93 33 33</p>
          <p>Directeur de la publication : Direction Exécutive de MULTIPLIKATOR Institut de Langues.</p>
        </Section>

        <Section n="3" title="Accès au site">
          <p>Le Site est accessible gratuitement à tout utilisateur disposant d'un accès internet. Les frais de connexion sont à la charge de l'utilisateur.</p>
          <p>MULTIPLIKATOR se réserve le droit de modifier, suspendre ou interrompre temporairement l'accès au Site, sans préavis, notamment pour des opérations de maintenance, sans que sa responsabilité puisse être engagée.</p>
        </Section>

        <Section n="4" title="Compte utilisateur (Espace Apprenant)">
          <p>Certains services nécessitent la création d'un compte. L'utilisateur s'engage à :</p>
          <ul className="list-disc pl-5 sm:pl-6 space-y-1">
            <li>Fournir des informations exactes, complètes et actualisées lors de son inscription.</li>
            <li>Maintenir la confidentialité de son identifiant et mot de passe.</li>
            <li>Informer immédiatement MULTIPLIKATOR de toute utilisation non autorisée de son compte.</li>
            <li>Ne pas céder son compte à un tiers.</li>
          </ul>
          <p>MULTIPLIKATOR se réserve le droit de suspendre ou supprimer tout compte en cas de manquement aux présentes CGU ou d'usage frauduleux.</p>
        </Section>

        <Section n="5" title="Inscription aux formations">
          <p>L'inscription à une formation MULTIPLIKATOR est soumise aux conditions suivantes :</p>
          <ul className="list-disc pl-5 sm:pl-6 space-y-1">
            <li>L'apprenant doit être majeur ou disposer d'une autorisation parentale écrite.</li>
            <li>Une évaluation initiale peut être requise pour les niveaux intermédiaires et avancés.</li>
            <li>Le paiement intégral conditionne la confirmation définitive de l'inscription, sauf modalités spécifiques (paiement en tranches, bundles).</li>
            <li>Les frais d'inscription et de documentation ne sont pas remboursables.</li>
          </ul>
        </Section>

        <Section n="6" title="Boutique en ligne et paiements">
          <p>Les paiements en ligne sont opérés via la plateforme sécurisée Stripe. MULTIPLIKATOR ne stocke aucune donnée bancaire.</p>
          <p><strong>Annulation et remboursement :</strong></p>
          <ul className="list-disc pl-5 sm:pl-6 space-y-1">
            <li>Avant le début du cours : remboursement à 100% (hors frais d'inscription).</li>
            <li>Dans les 7 premiers jours après le début du cours : remboursement à 50%.</li>
            <li>Au-delà de 7 jours : aucun remboursement, sauf cas de force majeure dûment justifié.</li>
            <li>Les cartes cadeaux sont valables 12 mois et ne sont pas remboursables.</li>
          </ul>
          <p><strong>Réductions :</strong> Les remises annoncées (10%, 15%) s'appliquent uniquement en paiement comptant intégral. Aucun cumul de promotions n'est possible.</p>
        </Section>

        <Section n="7" title="Propriété intellectuelle">
          <p>L'ensemble des contenus du Site (textes, images, logos, vidéos, supports pédagogiques, code source) est la propriété exclusive de MULTIPLIKATOR ou de ses partenaires, et est protégé par les lois en vigueur sur la propriété intellectuelle.</p>
          <p>Toute reproduction, représentation, modification, publication, transmission ou exploitation, totale ou partielle, sans autorisation écrite préalable, est strictement interdite et constitue une contrefaçon.</p>
          <p>Les supports pédagogiques fournis aux apprenants sont à usage strictement personnel et ne peuvent être partagés, revendus ou reproduits.</p>
        </Section>

        <Section n="8" title="Engagements de l'utilisateur">
          <p>L'utilisateur s'engage à utiliser le Site et les services dans le respect des lois en vigueur. Sont notamment interdits :</p>
          <ul className="list-disc pl-5 sm:pl-6 space-y-1">
            <li>Tout comportement frauduleux, diffamatoire, injurieux ou portant atteinte à la vie privée d'autrui.</li>
            <li>L'utilisation du Site à des fins commerciales non autorisées.</li>
            <li>L'introduction de virus, logiciels malveillants ou tentatives d'intrusion.</li>
            <li>La collecte automatisée de données (scraping, robots) sans autorisation.</li>
            <li>L'usurpation d'identité.</li>
          </ul>
        </Section>

        <Section n="9" title="Responsabilités">
          <p>MULTIPLIKATOR met tout en œuvre pour offrir aux utilisateurs des informations et outils fiables. Cependant, sa responsabilité ne saurait être engagée :</p>
          <ul className="list-disc pl-5 sm:pl-6 space-y-1">
            <li>En cas d'indisponibilité temporaire du Site ou d'erreur ponctuelle dans le contenu.</li>
            <li>En cas de dommage indirect résultant de l'utilisation du Site.</li>
            <li>En cas de force majeure (catastrophe naturelle, panne réseau, etc.).</li>
            <li>Pour les contenus de sites tiers vers lesquels le Site renvoie via des liens externes.</li>
          </ul>
        </Section>

        <Section n="10" title="Liens externes">
          <p>Le Site peut contenir des liens vers d'autres sites (réseaux sociaux, partenaires institutionnels). MULTIPLIKATOR n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.</p>
        </Section>

        <Section n="11" title="Données personnelles">
          <p>Le traitement des données personnelles est encadré par notre <a href="/confidentialite" className="text-[#580505] underline">Politique de confidentialité</a> et notre <a href="/traitement-donnees" className="text-[#580505] underline">Politique de traitement des données</a>, accessibles depuis toutes les pages du Site.</p>
        </Section>

        <Section n="12" title="Cookies">
          <p>Le Site utilise uniquement des cookies techniques essentiels au fonctionnement (session, sécurité, panier). Aucun cookie publicitaire ou de tracking marketing n'est utilisé.</p>
        </Section>

        <Section n="13" title="Modification des CGU">
          <p>MULTIPLIKATOR se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs sont invités à consulter régulièrement cette page. Les CGU applicables sont celles en vigueur à la date d'utilisation du Site.</p>
        </Section>

        <Section n="14" title="Droit applicable et juridiction">
          <p>Les présentes CGU sont régies par le droit béninois. En cas de litige, et après échec de toute tentative de résolution amiable, les tribunaux compétents de Cotonou (Bénin) seront seuls compétents.</p>
          <p>Pour les apprenants résidant à l'étranger, des dispositions particulières peuvent s'appliquer selon les conventions internationales en vigueur.</p>
        </Section>

        <Section n="15" title="Contact">
          <p>Pour toute question concernant les présentes CGU, contactez-nous :</p>
          <p>Email : <a href="mailto:contact@multiplikator-world.com" className="text-[#580505] underline">contact@multiplikator-world.com</a><br/>Téléphone : +229 01 96 59 38 66<br/>Adresse : GODOMEY PK 14, 2ème vons après station Orynx, Cotonou (Bénin).</p>
        </Section>
      </section>
    </>
  );
}
