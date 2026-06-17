import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import fr from "./locales/fr.json";
import en from "./locales/en.json";
import de from "./locales/de.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "fr",
    debug: false,
    interpolation: { escapeValue: false },
    resources: {
      fr: { translation: fr },
      en: { translation: en },
      de: { translation: de },
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "mpk-lang",
    },
  });

// Keep <html lang="..."> in sync with active language (SEO + a11y)
if (typeof document !== "undefined") {
  const apply = (lng) => { document.documentElement.lang = (lng || "fr").split("-")[0]; };
  apply(i18n.language);
  i18n.on("languageChanged", apply);
}

export default i18n;
