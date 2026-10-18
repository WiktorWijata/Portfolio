import { MOBILE_TAB_BAR_HEIGHT } from '../MobileShell/MobileShell.consts'
import { PageId } from '@/navigation'
import type { AssistantRuleConfig } from './Assistant.types'
import { ASSISTANT_KEYS } from './Assistant.keys'

/** How many messages the transcript keeps (oldest drop off first), same idea as the terminal's line limit. */
export const ASSISTANT_MAX_MESSAGES = 100
/** Id of the first message, the welcome text, which is translated when shown. */
export const ASSISTANT_WELCOME_MESSAGE_ID = 0
/** Shown in the bubble of an answer until its first piece arrives. */
export const ASSISTANT_PENDING_TEXT = '…'
export const ASSISTANT_TOPIC_KEYS = [
  ASSISTANT_KEYS.topics.experience,
  ASSISTANT_KEYS.topics.stack,
  ASSISTANT_KEYS.topics.project,
  ASSISTANT_KEYS.topics.collaboration,
] as const

/** Checked in order — the first rule whose (translated) pattern matches answers. */
export const ASSISTANT_RULES: AssistantRuleConfig[] = [
  { key: 'contact', page: PageId.Contact },
  { key: 'project', page: PageId.Projects },
  { key: 'stack', page: PageId.Stack },
  { key: 'experience', page: PageId.Experience },
]

// Chat window position (px). It sits above the status bar and is lifted above a docked terminal.
export const CHAT_BOTTOM = 48
export const CHAT_BOTTOM_NARROW = 42
export const CHAT_NARROW_MAX_WIDTH = 600
export const CHAT_TERMINAL_GAP = 12
export const CHAT_MAX_HEIGHT = 580
export const CHAT_TOP_MARGIN = 16

// Phone layout: the chat is a sheet from just under the top of the screen down to the bottom edge, and the
// launcher sits above the tab bar. Inline styles, because they have to beat the window's own desktop placement.
export const CHAT_SHEET_STYLE = {
  top: 96,
  right: 0,
  bottom: 0,
  left: 0,
  width: 'auto',
  height: 'auto',
  borderRadius: '20px 20px 0 0',
} as const
export const CHAT_LAUNCHER_MOBILE_STYLE = {
  right: 16,
  bottom: `calc(${MOBILE_TAB_BAR_HEIGHT}px + max(env(safe-area-inset-bottom), 6px) + 16px)`,
} as const
