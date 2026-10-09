import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { Language } from '@/context/PreferencesContext/PreferencesContext.types'
import { LANGUAGE_STORAGE_KEY } from '@/context/PreferencesContext/PreferencesContext.consts'
import { readStorage } from '@/utils/storage'
import en from './locales/en.json'
import pl from './locales/pl.json'

/** The initial language only; afterwards `PreferencesProvider` is the single owner and calls `changeLanguage`. */
const initialLanguage = readStorage(LANGUAGE_STORAGE_KEY) === Language.En ? Language.En : Language.Pl

void i18n.use(initReactI18next).init({
  resources: {
    [Language.Pl]: { translation: pl },
    [Language.En]: { translation: en },
  },
  lng: initialLanguage,
  fallbackLng: Language.Pl,
  interpolation: { escapeValue: false },
})

if (import.meta.hot) {
  import.meta.hot.accept(['./locales/pl.json', './locales/en.json'], ([newPl, newEn]) => {
    const bundles = [
      [Language.Pl, newPl],
      [Language.En, newEn],
    ] as const
    for (const [language, module] of bundles) {
      if (module) i18n.addResourceBundle(language, 'translation', module.default, true, true)
    }
    void i18n.changeLanguage(i18n.language)
  })
}

export default i18n
