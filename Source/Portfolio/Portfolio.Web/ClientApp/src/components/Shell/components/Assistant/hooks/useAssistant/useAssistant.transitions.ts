import type { ChatMessage } from '@/design-system'
import { ASSISTANT_MAX_MESSAGES } from '../../Assistant.consts'

/** Appends `added` to `prev`, keeping only the newest `ASSISTANT_MAX_MESSAGES` (oldest dropped first). */
export function appendMessages(prev: ChatMessage[], added: ChatMessage[]): ChatMessage[] {
  return [...prev, ...added].slice(-ASSISTANT_MAX_MESSAGES)
}
