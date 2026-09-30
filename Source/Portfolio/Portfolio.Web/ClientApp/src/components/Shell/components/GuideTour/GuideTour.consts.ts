import { TourTarget } from '../../Shell.consts'
import { TourStepAction, type TourStep } from './GuideTour.types'

/** Space around the pointed element inside the spotlight (px). */
export const HIGHLIGHT_PADDING = 3

/** Translations of each step live under `shell.tour.steps.<key>`. */
export const TOUR_STEPS: TourStep[] = [
  {
    key: 'language',
    targets: [TourTarget.Language, TourTarget.StatusBar],
    bilingual: true,
    action: TourStepAction.SwitchLanguage,
  },
  { key: 'theme', targets: [TourTarget.Theme, TourTarget.StatusBar] },
  {
    key: 'explorer',
    targets: [TourTarget.Explorer, TourTarget.ExplorerRail, TourTarget.ExplorerTitleBar, TourTarget.StatusBar],
  },
  { key: 'tabs', targets: [TourTarget.Tabs, TourTarget.StatusBar] },
  {
    key: 'terminal',
    targets: [TourTarget.TerminalRail, TourTarget.TerminalStatus, TourTarget.StatusBar],
  },
  {
    key: 'assistant',
    targets: [TourTarget.AssistantRail, TourTarget.AssistantStatus, TourTarget.StatusBar],
  },
  { key: 'docs', targets: [TourTarget.Docs, TourTarget.StatusBar] },
]
