import type { TourTarget } from '../../Shell.consts'

export const TourStepAction = {
  /** Switches between PL and EN without closing the tour. */
  SwitchLanguage: 'switch-language',
} as const
export type TourStepAction = (typeof TourStepAction)[keyof typeof TourStepAction]

export interface TourStep {
  /**
   * Elements to point at, in order of preference: the first one that is visible wins. Later entries
   * are fallbacks (e.g. the rail button is hidden on phones, so the status bar button is used).
   */
  targets: TourTarget[]
  title: string
  /** Polish text of the step. */
  text: string
  /** English translation shown under the text (first step only). */
  translation?: string
  /** Extra action link under the text. */
  action?: TourStepAction
}
