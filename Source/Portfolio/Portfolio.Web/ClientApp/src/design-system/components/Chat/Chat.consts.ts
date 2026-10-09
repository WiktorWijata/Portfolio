import type { ChatLabels } from './Chat.types'
import { ChatMessageRole } from './Chat.types'

/** Maximum length of a message. */
export const DEFAULT_MAX_LENGTH = 1000

export const DEFAULT_LABELS: ChatLabels = {
  closeButton: 'Zamknij czat',
  messageInput: 'Wiadomość do asystenta',
  sendButton: 'Wyślij wiadomość',
}

export const bubbleClasses: Record<ChatMessageRole, string> = {
  [ChatMessageRole.Assistant]: 'rounded-[3px_12px_12px_12px] border-line-default bg-surface-hover',
  [ChatMessageRole.User]:
    'self-end rounded-[12px_3px_12px_12px] border-chat-user-line bg-accent-surface text-content-primary',
}

export const focusRing = 'focus-ring'
