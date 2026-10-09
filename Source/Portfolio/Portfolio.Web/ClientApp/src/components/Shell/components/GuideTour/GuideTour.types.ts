import type { TourTarget } from '../../Shell.consts'

export const TourStepAction = {
  /** Switches between PL and EN without closing the tour. */
  SwitchLanguage: 'switch-language',
} as const
export type TourStepAction = (typeof TourStepAction)[keyof typeof TourStepAction]

export interface TourStep {
  /** Where the step's title and text are translated: `shell.tour.steps.<key>`. */
  key: 'language' | 'theme' | 'explorer' | 'tabs' | 'terminal' | 'assistant' | 'docs'
  /**
   * Elements to point at, in order of preference: the first one that is visible wins. Later entries
   * are fallbacks (e.g. the rail button is hidden on phones, so the status bar button is used).
   */
  targets: TourTarget[]
  /** Shows the text in Polish with the English translation under it, whatever the current language (first step). */
  bilingual?: boolean
  /** Extra action link under the text. */
  action?: TourStepAction
}
