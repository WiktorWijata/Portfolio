import { MessageSquareText } from 'lucide-react'
import { useEffect, useMemo, useRef } from 'react'
import { Chat, ChatLauncher, ChatMessageRole } from '@/design-system'
import { useIsMobile, usePanels } from '@/context'
import { CHAT_ELEMENT_ID } from '../../Shell.consts'
import {
  ASSISTANT_PENDING_TEXT,
  ASSISTANT_TOPIC_KEYS,
  CHAT_LAUNCHER_MOBILE_STYLE,
  CHAT_SHEET_STYLE,
} from './Assistant.consts'
import { TypingIndicator } from './components/TypingIndicator'
import { useAssistant } from './hooks/useAssistant'
import { useChatDock } from './hooks/useChatDock'
import { renderMarkdown } from './utils'
import { ASSISTANT_KEYS } from './Assistant.keys'
import { useTexts } from '@/i18n/hooks/useTexts'

/**
 * Portfolio assistant: the chat window and its floating launcher. The window stays mounted while
 * hidden (the draft survives), and both sit above the terminal when it is open.
 */
export function Assistant() {
  const [text, t] = useTexts(ASSISTANT_KEYS)
  const { chatOpen, setChatOpen } = usePanels()
  const { messages, send } = useAssistant()

  // The answers are Markdown (bold, lists, links); the one that has not started yet shows the pulsing dots.
  const shownMessages = useMemo(
    () =>
      messages.map((message) => {
        if (message.role !== ChatMessageRole.Assistant || typeof message.content !== 'string') return message

        return {
          ...message,
          content:
            message.content === ASSISTANT_PENDING_TEXT ? (
              <TypingIndicator label={text.typing} />
            ) : (
              renderMarkdown(message.content)
            ),
        }
      }),
    [messages, text.typing],
  )
  const dock = useChatDock()
  const isMobile = useIsMobile()
  // On a phone the window is a sheet over the page and the launcher floats above the tab bar.
  const windowStyle = isMobile ? CHAT_SHEET_STYLE : { bottom: dock.bottom, height: dock.height }
  const launcherStyle = isMobile ? CHAT_LAUNCHER_MOBILE_STYLE : { bottom: dock.bottom }

  // Closing the window hands the focus to the launcher (not on first render).
  const launcherRef = useRef<HTMLButtonElement>(null)
  const wasOpen = useRef(chatOpen)
  useEffect(() => {
    if (wasOpen.current && !chatOpen) launcherRef.current?.focus()
    wasOpen.current = chatOpen
  }, [chatOpen])

  return (
    <>
      <Chat
        id={CHAT_ELEMENT_ID}
        aria-label={text.title}
        open={chatOpen}
        style={windowStyle}
        title={text.title}
        labels={{
          closeButton: text.labels.close,
          messageInput: text.labels.input,
          sendButton: text.labels.send,
        }}
        subtitle={text.subtitle}
        placeholder={text.placeholder}
        note={text.note}
        topics={ASSISTANT_TOPIC_KEYS.map((key) => t(key))}
        messages={shownMessages}
        onSend={send}
        onClose={() => setChatOpen(false)}
      />
      {!chatOpen && (
        <ChatLauncher
          ref={launcherRef}
          icon={<MessageSquareText strokeWidth={1.5} />}
          aria-expanded={false}
          aria-controls={CHAT_ELEMENT_ID}
          style={launcherStyle}
          onClick={() => setChatOpen(true)}
        >
          {text.launcher}
        </ChatLauncher>
      )}
    </>
  )
}
