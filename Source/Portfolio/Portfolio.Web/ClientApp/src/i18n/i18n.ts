import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import plTranslations from './locales/pl.json';
import enTranslations from './locales/en.json';

const STORAGE_KEY = 'portfolio-language';
const DEFAULT_LANGUAGE = 'pl';

// Get saved language from localStorage or use default
const savedLanguage = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANGUAGE;

i18n
  .use(initReactI18next)
  .init({
    resources: {
      pl: {
        translation: plTranslations
      },
      en: {
        translation: enTranslations
      }
    },
    lng: savedLanguage,
    fallbackLng: DEFAULT_LANGUAGE,
    interpolation: {
      escapeValue: false // React already escapes values
    }
  });

// Save language to localStorage whenever it changes
i18n.on('languageChanged', (lng) => {
  localStorage.setItem(STORAGE_KEY, lng);
});

export default i18n;
