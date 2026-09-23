import { useState, type ChangeEvent, type FormEvent, type KeyboardEvent, type RefObject } from 'react'

interface UseChatInputOptions {
  onSend: (text: string) => void
  inputRef: RefObject<HTMLTextAreaElement | null>
}

/**
 * The message draft: typed text, Enter to send (Shift+Enter inserts a newline instead), and refocusing
 * the textarea after a send.
 */
export function useChatInput({ onSend, inputRef }: UseChatInputOptions) {
  const [value, setValue] = useState('')

  /** Sends trimmed, non-empty text: clears the draft, hands it to the caller and refocuses the textarea. */
  function send(raw: string) {
    const text = raw.trim()
    if (!text) return
    setValue('')
    onSend(text)
    inputRef.current?.focus()
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    send(value)
  }

  /** Props for the `<textarea>`. */
  const textareaProps = {
    value,
    onChange(e: ChangeEvent<HTMLTextAreaElement>) {
      setValue(e.target.value)
    },
    onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
      if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
        e.preventDefault()
        send(value)
      }
    },
  }

  return { send, onSubmit, textareaProps }
}
