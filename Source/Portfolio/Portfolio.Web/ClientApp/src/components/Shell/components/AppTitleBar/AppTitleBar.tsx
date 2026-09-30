import { TitleBar, TitleBarButton, TitleBarButtonTone } from '@/design-system'
import { usePanels, usePreferences } from '@/context'
import { TourTarget } from '../../Shell.consts'
import { APP_LOGO, APP_TITLE_TEXT, EXPLORER_BUTTON_LABEL } from './AppTitleBar.consts'
import { TITLE_BAR_KEYS } from './AppTitleBar.keys'
import { EXPLORER_KEYS } from '@/components/Shell/components/Explorer/Explorer.keys'
import { useTexts } from '@/i18n/hooks/useTexts'

/** Title bar of the window: logo, title, the guide launcher and (on phones) the explorer toggle. */
export function AppTitleBar() {
  const [text] = useTexts(TITLE_BAR_KEYS)
  const [explorerText] = useTexts(EXPLORER_KEYS)
  const { explorerOpen, toggleExplorer } = usePanels()
  const { startTour } = usePreferences()

  return (
    <TitleBar logo={APP_LOGO} title={APP_TITLE_TEXT}>
      <TitleBarButton icon="▷" title={text.tourLauncherTitle} aria-label={text.tourLauncherAria} onClick={startTour}>
        {text.tourLauncher}
      </TitleBarButton>
      <span className="hidden max-bp570:contents">
        <TitleBarButton
          tone={TitleBarButtonTone.Link}
          aria-expanded={explorerOpen}
          data-tour={TourTarget.ExplorerTitleBar}
          aria-label={explorerOpen ? explorerText.hide : explorerText.show}
          onClick={toggleExplorer}
        >
          {EXPLORER_BUTTON_LABEL}
        </TitleBarButton>
      </span>
    </TitleBar>
  )
}
