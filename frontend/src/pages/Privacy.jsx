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

export default function Privacy() {
  const { t } = useTranslation();
  return (
    <>
      <PageHero
        eyebrow={t("privacy.hero_eyebrow")}
        title={t("privacy.hero_title")}
        kicker={t("privacy.hero_kicker")}
      />
      <section className="max-w-[900px] mx-auto px-4 sm:px-5 lg:px-10 py-10 lg:py-14 space-y-8 sm:space-y-10 text-sm sm:text-base">
        <div className="text-xs sm:text-sm text-[#4A4A4A]/80 italic">{t("privacy.updated")}</div>

        <Section n="1" title="Responsable du traitement">
          <p>Le présent site (multiplikator-world.com) et l'ensemble des données collectées sont sous la responsabilité de :</p>
          <p><strong>MULTIPLIKATOR START UP GROUP</strong> — Réseau d'instituts de langues<br/>Siège social : GODOMEY PK 14, Cotonou, République du Bénin<br/>Email : contact@multiplikator-world.com<br/>Téléphone : +229 01 96 59 38 66</p>
        </Section>

        <Section n="2" title="Données collectées">
          <p>Nous collectons uniquement les données strictement nécessaires à nos missions pédagogiques, administratives et commerciales :</p>
          <ul className="list-disc pl-5 sm:pl-6 space-y-1">
            <li><strong>Identification</strong> : nom, prénom, civilité, date de naissance, photo (si fournie).</li>
            <li><strong>Coordonnées</strong> : email, téléphone, adresse postale, campus de rattachement.</li>
            <li><strong>Pédagogiques</strong> : niveau initial, parcours suivi, résultats d'évaluations, certifications obtenues.</li>
            <li><strong>Administratives</strong> : pièce d'identité (pour certifications officielles), justificatifs académiques.</li>
            <li><strong>Paiement</strong> : informations transmises directement à Stripe (aucune carte bancaire n'est stockée par MULTIPLIKATOR).</li>
            <li><strong>Techniques</strong> : adresse IP, type de navigateur, pages visitées (à des fins de sécurité uniquement).</li>
          </ul>
        </Section>

        <Section n="3" title="Finalités du traitement">
          <ul className="list-disc pl-5 sm:pl-6 space-y-1">
            <li>Gestion administrative et pédagogique du dossier apprenant.</li>
            <li>Émission de certifications, attestations et relevés de notes.</li>
            <li>Communication pédagogique (cours, rentrées, examens, événements).</li>
            <li>Newsletter institutionnelle (uniquement sur consentement explicite).</li>
            <li>Facturation, encaissement et obligations comptables/fiscales.</li>
            <li>Sécurité du site et prévention des fraudes.</li>
            <li>Statistiques anonymisées pour l'amélioration des programmes.</li>
          </ul>
        </Section>

        <Section n="4" title="Bases légales">
          <p>Le traitement de vos données repose sur :</p>
          <ul className="list-disc pl-5 sm:pl-6 space-y-1">
            <li><strong>L'exécution du contrat</strong> de formation que vous concluez avec MULTIPLIKATOR.</li>
            <li><strong>Le respect d'obligations légales</strong> (comptables, fiscales, certifiantes).</li>
            <li><strong>Votre consentement</strong> pour les communications marketing et la publication de témoignages.</li>
            <li><strong>L'intérêt légitime</strong> pour la sécurité et l'amélioration de nos services.</li>
          </ul>
        </Section>

        <Section n="5" title="Durée de conservation">
          <ul className="list-disc pl-5 sm:pl-6 space-y-1">
            <li>Dossier apprenant actif : pendant toute la durée de la formation.</li>
            <li>Dossier apprenant archivé : 5 ans après la dernière interaction.</li>
            <li>Données comptables et fiscales : 10 ans (obligation légale).</li>
            <li>Données de prospection : 3 ans à compter du dernier contact.</li>
            <li>Cookies techniques : 13 mois maximum.</li>
          </ul>
        </Section>

        <Section n="6" title="Destinataires des données">
          <p>Vos données ne sont accessibles qu'aux personnels habilités (Direction Exécutive, Direction Académique, Comptabilité, Coordinateurs de campus, Formateurs concernés). Elles peuvent être transmises à :</p>
          <ul className="list-disc pl-5 sm:pl-6 space-y-1">
            <li><strong>Organismes certificateurs</strong> : Goethe-Institut, ÖSD, ETS (TOEFL), British Council (IELTS), Institut Français (DELF/DALF) — uniquement pour valider votre inscription à un examen.</li>
            <li><strong>Universités et institutions partenaires</strong> en Allemagne, Autriche, France — uniquement avec votre consentement explicite (lettre de motivation, dossier candidature).</li>
            <li><strong>Sous-traitants techniques</strong> : Stripe (paiements), Resend (emails), hébergeur cloud — soumis à des engagements contractuels stricts de confidentialité.</li>
            <li><strong>Autorités</strong> : sur réquisition judiciaire uniquement.</li>
          </ul>
          <p>Aucune donnée n'est jamais revendue à des tiers.</p>
        </Section>

        <Section n="7" title="Transferts internationaux">
          <p>Certains de nos sous-traitants techniques sont basés hors du Bénin (Union européenne, États-Unis). Ces transferts sont encadrés par des clauses contractuelles types et le respect des standards internationaux de protection des données (RGPD européen, équivalents internationaux).</p>
        </Section>

        <Section n="8" title="Sécurité">
          <p>MULTIPLIKATOR met en œuvre les mesures techniques et organisationnelles appropriées pour garantir la sécurité de vos données :</p>
          <ul className="list-disc pl-5 sm:pl-6 space-y-1">
            <li>Chiffrement en transit (HTTPS/TLS).</li>
            <li>Accès aux bases protégés par authentification forte.</li>
            <li>Sauvegardes régulières chiffrées.</li>
            <li>Sensibilisation et formation continue du personnel.</li>
            <li>Procédure de notification en cas de violation de données (sous 72h).</li>
          </ul>
        </Section>

        <Section n="9" title="Vos droits">
          <p>Conformément aux réglementations applicables (RGPD européen pour les apprenants UE, loi béninoise sur la protection des données 2017-20), vous disposez des droits suivants :</p>
          <ul className="list-disc pl-5 sm:pl-6 space-y-1">
            <li><strong>Droit d'accès</strong> : obtenir une copie de vos données.</li>
            <li><strong>Droit de rectification</strong> : corriger des données inexactes.</li>
            <li><strong>Droit à l'effacement</strong> : supprimer vos données (sous réserve des obligations légales).</li>
            <li><strong>Droit à la limitation</strong> du traitement.</li>
            <li><strong>Droit à la portabilité</strong> : récupérer vos données dans un format structuré.</li>
            <li><strong>Droit d'opposition</strong> à la prospection commerciale.</li>
            <li><strong>Droit de retirer votre consentement</strong> à tout moment.</li>
            <li><strong>Droit d'introduire une réclamation</strong> auprès d'une autorité de contrôle (APDP au Bénin, CNIL ou équivalent dans votre pays).</li>
          </ul>
          <p>Pour exercer ces droits, écrivez-nous à : <a href="mailto:contact@multiplikator-world.com" className="text-[#580505] underline">contact@multiplikator-world.com</a>. Réponse sous 30 jours maximum.</p>
        </Section>

        <Section n="10" title="Cookies">
          <p>Notre site utilise uniquement des cookies techniques strictement nécessaires (session de connexion, sécurité, panier de la boutique). Aucun cookie publicitaire tiers ni pixel de tracking marketing n'est déposé sans votre consentement.</p>
        </Section>

        <Section n="11" title="Mineurs">
          <p>Les apprenants mineurs (moins de 18 ans) ne peuvent s'inscrire qu'avec l'autorisation expresse écrite d'un parent ou tuteur légal, qui devient responsable du traitement des données de l'enfant.</p>
        </Section>

        <Section n="12" title="Modifications">
          <p>La présente politique peut être mise à jour pour refléter des évolutions légales ou organisationnelles. La version en vigueur est toujours publiée sur cette page avec sa date de mise à jour.</p>
        </Section>
      </section>
    </>
  );
}
