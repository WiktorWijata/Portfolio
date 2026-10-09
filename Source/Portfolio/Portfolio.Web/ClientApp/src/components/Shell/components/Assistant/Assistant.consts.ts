import { PageId } from '@/navigation'
import type { AssistantRuleConfig } from './Assistant.types'
import { ASSISTANT_KEYS } from './Assistant.keys'

/** How many messages the transcript keeps (oldest drop off first), same idea as the terminal's line limit. */
export const ASSISTANT_MAX_MESSAGES = 100
/** Id of the first message, the welcome text, which is translated when shown. */
export const ASSISTANT_WELCOME_MESSAGE_ID = 0
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
