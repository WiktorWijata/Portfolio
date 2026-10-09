import { useCallback } from 'react'
import { useDocsLanguage } from '../useDocsLanguage'
import { Language } from '@/context/PreferencesContext/PreferencesContext.types'
import translations from '../../i18n/api.en.json'

const english = translations as Record<string, string>

/**
 * The description of a prop, an interface or an enum member in the current language. The Polish text is the
 * JSDoc in the types file (the single source); the English one is looked up by that text in `api.en.json`,
 * and falls back to the Polish text when there is no translation yet.
 */
export function useApiText() {
  const [language] = useDocsLanguage()
  return useCallback((polish: string) => (language === Language.En ? (english[polish] ?? polish) : polish), [language])
}
