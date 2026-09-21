import { Language } from '@/context'
import type { StatusBarSwitchOption } from '@/design-system'

export const APP_VERSION = 'v0.1.0'

/** The design-system documentation is a second entry point of the app (docs.html). */
export const DOCS_URL = '/docs.html'
export const DOCS_LABEL = 'OrchIDE UI'
export const DOCS_ARIA_LABEL = 'Dokumentacja design systemu OrchIDE UI (nowa karta)'

export const LANGUAGE_OPTIONS: StatusBarSwitchOption<Language>[] = [
  { value: Language.Pl, label: 'PL', 'aria-label': 'Polski' },
  { value: Language.En, label: 'EN', 'aria-label': 'English' },
]

export const STATUS_BAR_LABEL = 'Pasek statusu'
export const TERMINAL_TOGGLE_LABEL = 'Przełącz terminal'
export const TERMINAL_TOGGLE_TEXT = '>_ Terminal'
export const ASSISTANT_TOGGLE_LABEL = 'Przełącz asystenta'
export const ASSISTANT_TOGGLE_TEXT = 'Asystent'
export const LANGUAGE_SWITCH_LABEL = 'Język'
export const APP_VERSION_TITLE = 'Wersja aplikacji'
