import { BookOpen, MessageSquareText, Moon, Sun } from 'lucide-react'
import { useMemo } from 'react'
import {
  StatusBar,
  StatusBarAccent,
  StatusBarButton,
  StatusBarDivider,
  StatusBarItem,
  StatusBarSpacer,
  StatusBarSwitch,
  ThemeName,
  type StatusBarSwitchOption,
  StatusBarTone,
  DESIGN_SYSTEM_VERSION,
  useTheme,
} from '@/design-system'
import { useApiStatus } from '@/api'
import { useEditor, usePanels, usePreferences } from '@/context'
import { pages } from '@/navigation'
import { GIT_BRANCH, TourTarget } from '../../Shell.consts'
import { API_STATUS_DISPLAY, APP_VERSION, DOCS_LABEL, DOCS_URL, LANGUAGE_OPTIONS } from './AppStatusBar.consts'
import { useTexts } from '@/i18n/hooks/useTexts'
import { STATUS_BAR_KEYS } from './AppStatusBar.keys'

/** Bottom bar: branch, current file, terminal / assistant toggles, docs link, theme and language switches, version. */
export function AppStatusBar() {
  const [text, t] = useTexts(STATUS_BAR_KEYS)
  const apiStatus = useApiStatus()
  const api = apiStatus && API_STATUS_DISPLAY[apiStatus]
  const { activePage } = useEditor()
  const { terminalOpen, toggleTerminal, chatOpen, toggleChat } = usePanels()
  const { language, setLanguage } = usePreferences()
  const [theme, setTheme] = useTheme()
  const themeOptions = useMemo<StatusBarSwitchOption<ThemeName>[]>(
    () => [
      {
        value: ThemeName.Dark,
        label: text.themeDark,
        icon: <Moon strokeWidth={1.5} />,
        'aria-label': text.themeDarkAria,
      },
      {
        value: ThemeName.Light,
        label: text.themeLight,
        icon: <Sun strokeWidth={1.5} />,
        'aria-label': text.themeLightAria,
      },
    ],
    [text],
  )
  const file = activePage ? pages[activePage].file : ''

  return (
    <StatusBar aria-label={text.label} data-tour={TourTarget.StatusBar} className="max-bp570:gap-2.5">
      <StatusBarItem tone={StatusBarTone.Success}>{GIT_BRANCH}</StatusBarItem>
      <span className="contents max-bp570:hidden">
        <StatusBarItem truncate title={file || undefined}>
          {file}
        </StatusBarItem>
        <StatusBarDivider />
      </span>
      <StatusBarButton
        expanded={terminalOpen}
        aria-label={text.terminalToggle}
        data-tour={TourTarget.TerminalStatus}
        onClick={toggleTerminal}
      >
        {text.terminalText}
      </StatusBarButton>
      <StatusBarButton
        icon={<MessageSquareText strokeWidth={1.5} />}
        expanded={chatOpen}
        accent={StatusBarAccent.Assistant}
        aria-label={text.assistantToggle}
        data-tour={TourTarget.AssistantStatus}
        onClick={toggleChat}
      >
        {text.assistantText}
      </StatusBarButton>
      <StatusBarSpacer />
      <StatusBarButton
        icon={<BookOpen strokeWidth={1.5} />}
        href={DOCS_URL}
        data-tour={TourTarget.Docs}
        target="_blank"
        rel="noopener"
        aria-label={text.docsAria}
        title={text.docsAria}
        className="max-bp570:hidden"
      >
        {`${DOCS_LABEL} v${DESIGN_SYSTEM_VERSION} ↗`}
      </StatusBarButton>
      <StatusBarSwitch
        aria-label={text.themeSwitch}
        data-tour={TourTarget.Theme}
        value={theme}
        onChange={setTheme}
        options={themeOptions}
      />
      <StatusBarSwitch
        aria-label={text.languageSwitch}
        data-tour={TourTarget.Language}
        value={language}
        onChange={setLanguage}
        options={LANGUAGE_OPTIONS}
      />
      {api && (
        <StatusBarItem indicator={api.indicator} title={t(api.title)} className="max-bp570:hidden">
          {t(api.label)}
        </StatusBarItem>
      )}
      <StatusBarItem tone={StatusBarTone.Faint} title={text.versionTitle} className="max-bp570:hidden">
        {APP_VERSION}
      </StatusBarItem>
    </StatusBar>
  )
}
