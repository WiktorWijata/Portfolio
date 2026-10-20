import { useCallback } from 'react'
import { Language } from '@/context/PreferencesContext/PreferencesContext.types'
import type { Release } from '../../changelog'
import translations from '../../i18n/changelog.en.json'
import { useDocsLanguage } from '../useDocsLanguage'

type EnglishRelease = Pick<Release, 'title' | 'added' | 'changed' | 'fixed'>
const english = translations as Record<string, EnglishRelease>

/**
 * A release in the current language. The Polish text is `changelog.ts` (the single source, written with each
 * release); the English one is looked up by version in `changelog.en.json` and falls back to the Polish text.
 */
export function useLocalizedRelease() {
  const [language] = useDocsLanguage()
  return useCallback(
    (release: Release): Release => {
      const translated = language === Language.En ? english[release.version] : undefined
      return translated ? { ...release, ...translated } : release
    },
    [language],
  )
}
