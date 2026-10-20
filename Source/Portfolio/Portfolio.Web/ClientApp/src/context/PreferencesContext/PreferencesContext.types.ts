export const Language = {
  Pl: 'pl',
  En: 'en',
} as const
export type Language = (typeof Language)[keyof typeof Language]

/** Settings the visitor makes and the browser remembers: the language and whether the tour has been seen. */
export interface Preferences {
  language: Language
  setLanguage: (language: Language) => void

  /** The guide tour ("Oprowadź mnie") is showing. It starts on the first visit and from the title bar. */
  tourActive: boolean
  startTour: () => void
  /** Closes the tour and remembers that the visitor has seen it, so it does not start again. */
  endTour: () => void
}
