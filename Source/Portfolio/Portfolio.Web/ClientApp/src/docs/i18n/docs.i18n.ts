import i18n from '@/i18n/i18n'
import { Language } from '@/context/PreferencesContext/PreferencesContext.types'
import en from './locales/en.json'
import pl from './locales/pl.json'

/** The docs texts live in their own namespace, so the portfolio bundle does not carry them. */
i18n.addResourceBundle(Language.Pl, 'docs', pl)
i18n.addResourceBundle(Language.En, 'docs', en)
document.documentElement.lang = i18n.language
