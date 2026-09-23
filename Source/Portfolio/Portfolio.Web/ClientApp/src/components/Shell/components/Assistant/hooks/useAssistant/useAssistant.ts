import { useCallback, useRef, useState } from 'react'
import { ChatMessageRole, type ChatMessage } from '@/design-system'
import { useEditor, usePanels } from '@/context'
import { ASSISTANT_ACTION_LABEL, ASSISTANT_WELCOME } from '../../Assistant.consts'
import { getAnswer } from '../../utils'
import { appendMessages } from './useAssistant.transitions'

/**
 * Conversation with the assistant. Answers are canned for now; replies with a page offer a jump to it.
 * Keeps the last `ASSISTANT_MAX_MESSAGES`, oldest first out, so a long session doesn't grow the transcript
 * (and its DOM) without bound.
 */
export function useAssistant() {
  const { openPage } = useEditor()
  const { setChatOpen } = usePanels()
  const nextId = useRef(1)
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 0, role: ChatMessageRole.Assistant, content: ASSISTANT_WELCOME },
  ])

  const send = useCallback(
    (text: string) => {
      const { text: answer, page } = getAnswer(text)
      const question: ChatMessage = { id: nextId.current++, role: ChatMessageRole.User, content: text }
      const reply: ChatMessage = {
        id: nextId.current++,
        role: ChatMessageRole.Assistant,
        content: answer,
        action: page
          ? {
              label: ASSISTANT_ACTION_LABEL,
              onAction: () => {
                openPage(page)
                setChatOpen(false)
              },
            }
          : undefined,
      }
      setMessages((prev) => appendMessages(prev, [question, reply]))
    },
    [openPage, setChatOpen],
  )

  return { messages, send }
}
