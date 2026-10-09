import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { LANGUAGE_STORAGE_KEY } from '@/context/PreferencesContext/PreferencesContext.consts'
import { Language } from '@/context/PreferencesContext/PreferencesContext.types'
import { writeStorage } from '@/utils/storage'

/** The language of the docs: the same one (and the same stored choice) as in the portfolio app. */
export function useDocsLanguage() {
  const { i18n } = useTranslation()
  const language = i18n.language === Language.En ? Language.En : Language.Pl

  const setLanguage = useCallback(
    (next: Language) => {
      void i18n.changeLanguage(next)
      writeStorage(LANGUAGE_STORAGE_KEY, next)
      document.documentElement.lang = next
    },
    [i18n],
  )

  return [language, setLanguage] as const
}
