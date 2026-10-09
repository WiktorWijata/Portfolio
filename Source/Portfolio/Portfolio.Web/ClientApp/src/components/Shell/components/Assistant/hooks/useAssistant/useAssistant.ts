import { useCallback, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChatMessageRole, type ChatMessage } from '@/design-system'
import { useEditor, usePanels } from '@/context'
import { ASSISTANT_WELCOME_MESSAGE_ID } from '../../Assistant.consts'
import { getAnswer } from '../../utils'
import { appendMessages } from './useAssistant.transitions'
import { ASSISTANT_KEYS } from '../../Assistant.keys'

/**
 * Conversation with the assistant. Answers are canned for now; replies with a page offer a jump to it.
 * Keeps the last `ASSISTANT_MAX_MESSAGES`, oldest first out, so a long session doesn't grow the transcript
 * (and its DOM) without bound.
 */
export function useAssistant() {
  const { t, i18n } = useTranslation()
  const { openPage } = useEditor()
  const { setChatOpen } = usePanels()
  const nextId = useRef(1)
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: ASSISTANT_WELCOME_MESSAGE_ID, role: ChatMessageRole.Assistant, content: null },
  ])

  const send = useCallback(
    (text: string) => {
      const { text: answer, page } = getAnswer(text, t, i18n.language)
      const question: ChatMessage = { id: nextId.current++, role: ChatMessageRole.User, content: text }
      const reply: ChatMessage = {
        id: nextId.current++,
        role: ChatMessageRole.Assistant,
        content: answer,
        action: page
          ? {
              label: t(ASSISTANT_KEYS.action),
              onAction: () => {
                openPage(page)
                setChatOpen(false)
              },
            }
          : undefined,
      }
      setMessages((prev) => appendMessages(prev, [question, reply]))
    },
    [openPage, setChatOpen, t, i18n.language],
  )

  const shownMessages = useMemo(
    () =>
      messages.map((message) =>
        message.id === ASSISTANT_WELCOME_MESSAGE_ID ? { ...message, content: t(ASSISTANT_KEYS.welcome) } : message,
      ),
    [messages, t],
  )

  return { messages: shownMessages, send }
}
