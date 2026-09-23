import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { readStorage, writeStorage } from '@/utils/storage'
import { PreferencesContext } from './PreferencesContext'
import { LANGUAGE_STORAGE_KEY, TOUR_SEEN_VALUE, TOUR_STORAGE_KEY } from './PreferencesContext.consts'
import { Language, type Preferences } from './PreferencesContext.types'

const readLanguage = (): Language => (readStorage(LANGUAGE_STORAGE_KEY) === Language.En ? Language.En : Language.Pl)

/** The language and the tour, remembered in the browser. The tour starts by itself until it has been seen once. */
export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(readLanguage)
  const [tourActive, setTourActive] = useState(() => readStorage(TOUR_STORAGE_KEY) !== TOUR_SEEN_VALUE)

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next)
    writeStorage(LANGUAGE_STORAGE_KEY, next)
  }, [])

  const startTour = useCallback(() => setTourActive(true), [])
  const endTour = useCallback(() => {
    setTourActive(false)
    writeStorage(TOUR_STORAGE_KEY, TOUR_SEEN_VALUE)
  }, [])

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const preferences = useMemo<Preferences>(
    () => ({ language, setLanguage, tourActive, startTour, endTour }),
    [language, setLanguage, tourActive, startTour, endTour],
  )

  return <PreferencesContext.Provider value={preferences}>{children}</PreferencesContext.Provider>
}
