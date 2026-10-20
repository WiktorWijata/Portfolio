import { TitleBar, TitleBarButton } from '@/design-system'
import { usePreferences } from '@/context'
import { APP_LOGO, APP_TITLE_TEXT } from './AppTitleBar.consts'
import { TITLE_BAR_KEYS } from './AppTitleBar.keys'
import { useTexts } from '@/i18n/hooks/useTexts'

/** Title bar of the window: logo, title and the guide launcher. */
export function AppTitleBar() {
  const [text] = useTexts(TITLE_BAR_KEYS)
  const { startTour } = usePreferences()

  return (
    <TitleBar logo={APP_LOGO} title={APP_TITLE_TEXT}>
      <TitleBarButton icon="▷" title={text.tourLauncherTitle} aria-label={text.tourLauncherAria} onClick={startTour}>
        {text.tourLauncher}
      </TitleBarButton>
    </TitleBar>
  )
}
