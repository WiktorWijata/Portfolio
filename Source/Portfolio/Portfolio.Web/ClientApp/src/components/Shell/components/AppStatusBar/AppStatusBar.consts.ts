import { Language } from '@/context'
import { ApiStatus } from '@/api'
import { StatusBarIndicator, type StatusBarSwitchOption } from '@/design-system'
import { STATUS_BAR_KEYS } from './AppStatusBar.keys'

export const APP_VERSION = 'v0.1.0'

/** The design-system documentation is a second entry point of the app (docs.html). */
export const DOCS_URL = '/docs.html'
export const DOCS_LABEL = 'OrchIDE UI'

/** Languages are named in their own language, so they are not translated. */
export const LANGUAGE_OPTIONS: StatusBarSwitchOption<Language>[] = [
  { value: Language.Pl, label: 'PL', 'aria-label': 'Polski' },
  { value: Language.En, label: 'EN', 'aria-label': 'English' },
]

/** The light, the label and the tooltip of each API connection state. */
export const API_STATUS_DISPLAY = {
  [ApiStatus.Online]: {
    indicator: StatusBarIndicator.Online,
    label: STATUS_BAR_KEYS.apiOnline,
    title: STATUS_BAR_KEYS.apiOnlineTitle,
  },
  [ApiStatus.Offline]: {
    indicator: StatusBarIndicator.Offline,
    label: STATUS_BAR_KEYS.apiOffline,
    title: STATUS_BAR_KEYS.apiOfflineTitle,
  },
  [ApiStatus.Checking]: {
    indicator: StatusBarIndicator.Pending,
    label: STATUS_BAR_KEYS.apiChecking,
    title: STATUS_BAR_KEYS.apiCheckingTitle,
  },
} as const
