import { describe, expect, it } from 'vitest'
import { ChatMessageRole, type ChatMessage } from '@/design-system'
import { ASSISTANT_MAX_MESSAGES } from '../../Assistant.consts'
import { appendMessages } from './useAssistant.transitions'

function message(id: number): ChatMessage {
  return { id, role: ChatMessageRole.User, content: `message ${id}` }
}

describe('appendMessages', () => {
  it('appends below the limit without dropping anything', () => {
    const prev = [message(0), message(1)]
    const result = appendMessages(prev, [message(2), message(3)])
    expect(result.map((m) => m.id)).toEqual([0, 1, 2, 3])
  })

  it('drops the oldest messages once the limit is exceeded', () => {
    const prev = Array.from({ length: ASSISTANT_MAX_MESSAGES }, (_, i) => message(i))
    const result = appendMessages(prev, [message(ASSISTANT_MAX_MESSAGES), message(ASSISTANT_MAX_MESSAGES + 1)])
    expect(result).toHaveLength(ASSISTANT_MAX_MESSAGES)
    expect(result[0]?.id).toBe(2)
    expect(result.at(-1)?.id).toBe(ASSISTANT_MAX_MESSAGES + 1)
  })

  it('never grows past the limit across many appends', () => {
    let messages: ChatMessage[] = []
    for (let i = 0; i < ASSISTANT_MAX_MESSAGES * 5; i += 2) {
      messages = appendMessages(messages, [message(i), message(i + 1)])
    }
    expect(messages).toHaveLength(ASSISTANT_MAX_MESSAGES)
    const ids = messages.map((m) => m.id)
    expect(new Set(ids).size).toBe(ASSISTANT_MAX_MESSAGES)
    expect(ids.at(-1)).toBe(ASSISTANT_MAX_MESSAGES * 5 - 1)
  })

  it('keeps message order stable (oldest first)', () => {
    const result = appendMessages([message(0)], [message(1), message(2)])
    expect(result.map((m) => m.id)).toEqual([0, 1, 2])
  })
})
