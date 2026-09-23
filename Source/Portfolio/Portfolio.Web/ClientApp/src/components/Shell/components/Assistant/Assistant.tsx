import { MessageSquareText } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { Chat, ChatLauncher } from '@/design-system'
import { usePanels } from '@/context'
import { CHAT_ELEMENT_ID } from '../../Shell.consts'
import {
  ASSISTANT_LAUNCHER_LABEL,
  ASSISTANT_NOTE,
  ASSISTANT_PLACEHOLDER,
  ASSISTANT_SUBTITLE,
  ASSISTANT_TITLE,
  ASSISTANT_TOPICS,
} from './Assistant.consts'
import { useAssistant } from './hooks/useAssistant'
import { useChatDock } from './hooks/useChatDock'

/**
 * Portfolio assistant: the chat window and its floating launcher. The window stays mounted while
 * hidden (the draft survives), and both sit above the terminal when it is open.
 */
export function Assistant() {
  const { chatOpen, setChatOpen } = usePanels()
  const { messages, send } = useAssistant()
  const { bottom, height } = useChatDock()

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
        aria-label={ASSISTANT_TITLE}
        open={chatOpen}
        style={{ bottom, height }}
        title={ASSISTANT_TITLE}
        subtitle={ASSISTANT_SUBTITLE}
        placeholder={ASSISTANT_PLACEHOLDER}
        note={ASSISTANT_NOTE}
        topics={ASSISTANT_TOPICS}
        messages={messages}
        onSend={send}
        onClose={() => setChatOpen(false)}
      />
      {!chatOpen && (
        <ChatLauncher
          ref={launcherRef}
          icon={<MessageSquareText strokeWidth={1.5} />}
          aria-expanded={false}
          aria-controls={CHAT_ELEMENT_ID}
          style={{ bottom }}
          onClick={() => setChatOpen(true)}
        >
          {ASSISTANT_LAUNCHER_LABEL}
        </ChatLauncher>
      )}
    </>
  )
}
