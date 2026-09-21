import { BookOpen, MessageSquareText } from 'lucide-react'
import {
  StatusBar,
  StatusBarAccent,
  StatusBarButton,
  StatusBarDivider,
  StatusBarItem,
  StatusBarSpacer,
  StatusBarSwitch,
  StatusBarTone,
  DESIGN_SYSTEM_VERSION,
} from '@/design-system'
import { useEditor, usePanels, usePreferences } from '@/context'
import { pages } from '@/navigation'
import { GIT_BRANCH, TourTarget } from '../../Shell.consts'
import {
  APP_VERSION,
  APP_VERSION_TITLE,
  ASSISTANT_TOGGLE_LABEL,
  ASSISTANT_TOGGLE_TEXT,
  DOCS_ARIA_LABEL,
  DOCS_LABEL,
  DOCS_URL,
  LANGUAGE_OPTIONS,
  LANGUAGE_SWITCH_LABEL,
  STATUS_BAR_LABEL,
  TERMINAL_TOGGLE_LABEL,
  TERMINAL_TOGGLE_TEXT,
} from './AppStatusBar.consts'

/** Bottom bar: branch, current file, terminal / assistant toggles, docs link, language switch, version. */
export function AppStatusBar() {
  const { activePage } = useEditor()
  const { terminalOpen, toggleTerminal, chatOpen, toggleChat } = usePanels()
  const { language, setLanguage } = usePreferences()
  const file = activePage ? pages[activePage].file : ''

  return (
    <StatusBar aria-label={STATUS_BAR_LABEL} data-tour={TourTarget.StatusBar}>
      <StatusBarItem tone={StatusBarTone.Success}>{GIT_BRANCH}</StatusBarItem>
      <StatusBarItem truncate title={file || undefined}>
        {file}
      </StatusBarItem>
      <StatusBarDivider />
      <StatusBarButton
        expanded={terminalOpen}
        aria-label={TERMINAL_TOGGLE_LABEL}
        data-tour={TourTarget.TerminalStatus}
        onClick={toggleTerminal}
      >
        {TERMINAL_TOGGLE_TEXT}
      </StatusBarButton>
      <StatusBarButton
        icon={<MessageSquareText strokeWidth={1.5} />}
        expanded={chatOpen}
        accent={StatusBarAccent.Assistant}
        aria-label={ASSISTANT_TOGGLE_LABEL}
        data-tour={TourTarget.AssistantStatus}
        onClick={toggleChat}
      >
        {ASSISTANT_TOGGLE_TEXT}
      </StatusBarButton>
      <StatusBarSpacer />
      <StatusBarButton
        icon={<BookOpen strokeWidth={1.5} />}
        href={DOCS_URL}
        target="_blank"
        rel="noopener"
        aria-label={DOCS_ARIA_LABEL}
        title={DOCS_ARIA_LABEL}
        className="max-bp570:hidden"
      >
        {`${DOCS_LABEL} v${DESIGN_SYSTEM_VERSION} ↗`}
      </StatusBarButton>
      <StatusBarSwitch
        aria-label={LANGUAGE_SWITCH_LABEL}
        data-tour={TourTarget.Language}
        value={language}
        onChange={setLanguage}
        options={LANGUAGE_OPTIONS}
      />
      <StatusBarItem tone={StatusBarTone.Faint} title={APP_VERSION_TITLE}>
        {APP_VERSION}
      </StatusBarItem>
    </StatusBar>
  )
}
