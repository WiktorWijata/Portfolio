import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChatError, ChatErrorKind, streamChatAnswer } from '@/api'
import { ChatMessageRole, type ChatMessage } from '@/design-system'
import { useEditor, usePanels } from '@/context'
import { ASSISTANT_PENDING_TEXT, ASSISTANT_WELCOME_MESSAGE_ID } from '../../Assistant.consts'
import { getAnswer } from '../../utils'
import { appendMessages } from './useAssistant.transitions'
import { ASSISTANT_KEYS } from '../../Assistant.keys'

/** With mock data there is no API to ask, so the prepared answers are used (see `getAnswer`). */
const useMock = import.meta.env.VITE_USE_MOCK === 'true'

const ERROR_KEYS = {
  [ChatErrorKind.Unavailable]: ASSISTANT_KEYS.errors.unavailable,
  [ChatErrorKind.RateLimited]: ASSISTANT_KEYS.errors.rateLimited,
  [ChatErrorKind.Interrupted]: ASSISTANT_KEYS.errors.interrupted,
} as const

/**
 * Conversation with the assistant. Each answer is streamed from the API into its bubble as it is written; the
 * messages go one after another, because a follow-up needs the id of the conversation the previous answer opened.
 * Keeps the last `ASSISTANT_MAX_MESSAGES`, oldest first out, so a long session doesn't grow the transcript
 * (and its DOM) without bound. With mock data the answers are the prepared ones, and those with a page offer a jump to it.
 */
export function useAssistant() {
  const { t, i18n } = useTranslation()
  const { openPage } = useEditor()
  const { setChatOpen } = usePanels()
  const nextId = useRef(1)
  const completionId = useRef<string | null>(null)
  const queue = useRef<Promise<void>>(Promise.resolve())
  const abort = useRef(new AbortController())
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: ASSISTANT_WELCOME_MESSAGE_ID, role: ChatMessageRole.Assistant, content: null },
  ])

  // A new controller on mount (not only in the initial value): React runs the cleanup and the effect again in development.
  useEffect(() => {
    abort.current = new AbortController()
    return () => abort.current.abort()
  }, [])

  const setContent = useCallback((id: number, content: string) => {
    setMessages((prev) => prev.map((message) => (message.id === id ? { ...message, content } : message)))
  }, [])

  const ask = useCallback(
    async (question: string, replyId: number) => {
      let reply = ''

      try {
        completionId.current = await streamChatAnswer({
          prompt: question,
          completionId: completionId.current,
          signal: abort.current.signal,
          onToken: (token) => {
            reply += token
            setContent(replyId, reply)
          },
        })
      } catch (error) {
        if (abort.current.signal.aborted) return

        // The next message starts a new conversation: this one may be gone on the other side.
        completionId.current = null
        const kind = error instanceof ChatError ? error.kind : ChatErrorKind.Unavailable
        const message = t(ERROR_KEYS[kind])
        setContent(replyId, reply && kind === ChatErrorKind.Interrupted ? `${reply}\n\n${message}` : message)
      }
    },
    [setContent, t],
  )

  const send = useCallback(
    (text: string) => {
      const question: ChatMessage = { id: nextId.current++, role: ChatMessageRole.User, content: text }

      if (useMock) {
        const { text: answer, page } = getAnswer(text, t, i18n.language)
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
        return
      }

      const reply: ChatMessage = {
        id: nextId.current++,
        role: ChatMessageRole.Assistant,
        content: ASSISTANT_PENDING_TEXT,
      }
      setMessages((prev) => appendMessages(prev, [question, reply]))
      queue.current = queue.current.then(() => ask(text, reply.id as number))
    },
    [ask, openPage, setChatOpen, t, i18n.language],
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
