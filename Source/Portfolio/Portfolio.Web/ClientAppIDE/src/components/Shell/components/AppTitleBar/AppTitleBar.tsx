import { TitleBar, TitleBarButton, TitleBarButtonTone } from '@/design-system'
import { usePanels, usePreferences } from '@/context'
import { EXPLORER_HIDE_LABEL, EXPLORER_SHOW_LABEL, TourTarget } from '../../Shell.consts'
import {
  APP_LOGO,
  APP_TITLE_TEXT,
  EXPLORER_BUTTON_LABEL,
  TOUR_LAUNCHER_ARIA_LABEL,
  TOUR_LAUNCHER_LABEL,
  TOUR_LAUNCHER_TITLE,
} from './AppTitleBar.consts'

/** Title bar of the window: logo, title, the guide launcher and (on phones) the explorer toggle. */
export function AppTitleBar() {
  const { explorerOpen, toggleExplorer } = usePanels()
  const { startTour } = usePreferences()

  return (
    <TitleBar logo={APP_LOGO} title={APP_TITLE_TEXT}>
      <TitleBarButton icon="▷" title={TOUR_LAUNCHER_TITLE} aria-label={TOUR_LAUNCHER_ARIA_LABEL} onClick={startTour}>
        {TOUR_LAUNCHER_LABEL}
      </TitleBarButton>
      <span className="hidden max-bp570:contents">
        <TitleBarButton
          tone={TitleBarButtonTone.Link}
          aria-expanded={explorerOpen}
          data-tour={TourTarget.ExplorerTitleBar}
          aria-label={explorerOpen ? EXPLORER_HIDE_LABEL : EXPLORER_SHOW_LABEL}
          onClick={toggleExplorer}
        >
          {EXPLORER_BUTTON_LABEL}
        </TitleBarButton>
      </span>
    </TitleBar>
  )
}
