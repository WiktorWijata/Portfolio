import { useRef, type KeyboardEvent } from 'react'
import { CloseButton } from '../../internal/CloseButton'
import { useReopenFocus } from '../../internal/hooks/useReopenFocus'
import { useScrollToEnd } from '../../internal/hooks/useScrollToEnd'
import { Link } from '../Link'
import { FontFamily, FontSize, FontWeight, Text, TextColor } from '../Text'
import { bubbleClasses, DEFAULT_LABELS, DEFAULT_MAX_LENGTH, focusRing } from './Chat.consts'
import { type ChatProps } from './Chat.types'
import { useChatInput } from './hooks/useChatInput'

/**
 * Assistant chat window: Enter sends, Shift+Enter inserts a newline, Esc closes. It is positioned `fixed` in
 * the bottom-right corner; override with `style` / `className` to place it elsewhere. Producing replies is
 * the caller's job.
 */
export function Chat({
  title,
  subtitle,
  avatar = 'AI',
  messages,
  topics = [],
  placeholder,
  note,
  labels,
  onSend,
  onClose,
  maxLength = DEFAULT_MAX_LENGTH,
  open = true,
  className = '',
  ...rest
}: ChatProps) {
  const strings = { ...DEFAULT_LABELS, ...labels }
  const logRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const { send, onSubmit, textareaProps } = useChatInput({ onSend, inputRef })

  useScrollToEnd(logRef, messages)
  useReopenFocus(open, logRef, inputRef)

  function onPanelKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      e.stopPropagation()
      onClose()
    }
  }

  return (
    <Text
      {...rest}
      as="section"
      size={FontSize.Large}
      font={FontFamily.Sans}
      color={TextColor.Body}
      role="dialog"
      hidden={!open}
      onKeyDown={onPanelKeyDown}
      className={[
        'fixed right-6 bottom-12 z-[41] flex h-[min(580px,calc(100dvh-100px))] w-[min(400px,calc(100vw-32px))] flex-col overflow-hidden',
        'rounded-3xl border border-line-strongest bg-surface-panel leading-[1.6] shadow-chat',
        className,
      ].join(' ')}
    >
      <header className="flex flex-none items-center gap-2.5 border-b border-line-default bg-surface-hover px-3 py-2">
        <Text
          size={FontSize.Small}
          font={FontFamily.Mono}
          className="grid size-[34px] flex-none place-items-center rounded-xl bg-accent/[.094] text-accent-light"
        >
          {avatar}
        </Text>
        <div className="flex-1">
          <Text as="strong" size={FontSize.Large} weight={FontWeight.Medium} className="block text-content-strong">
            {title}
          </Text>
          {subtitle && (
            <Text as="small" size={FontSize.XSmall} className="text-content-tertiary">
              {subtitle}
            </Text>
          )}
        </div>
        <CloseButton aria-label={strings.closeButton} onClick={onClose} />
      </header>

      <div
        ref={logRef}
        role="log"
        aria-live="polite"
        aria-relevant="additions"
        className="flex min-h-0 flex-1 flex-col gap-3.5 overflow-auto overscroll-contain p-[18px]"
      >
        {messages.map((m) => (
          <Text
            as="div"
            key={m.id}
            className={[
              'max-w-[94%] border px-3.5 py-3 [overflow-wrap:anywhere] whitespace-pre-wrap',
              bubbleClasses[m.role],
            ].join(' ')}
          >
            {m.content}
            {m.action && (
              <div className="mt-2.5 flex">
                <Link size={FontSize.Small} className="[&>span]:leading-[normal]" onClick={m.action.onAction}>
                  {m.action.label}
                </Link>
              </div>
            )}
          </Text>
        ))}
      </div>

      {topics.length > 0 && (
        <div className="flex flex-wrap gap-[7px] px-4 pb-3">
          {topics.map((topic) => (
            <button
              key={topic}
              type="button"
              onClick={() => send(topic)}
              className={[
                'cursor-pointer rounded-lg border border-line-emphasis bg-transparent px-[9px] py-1.5 text-content-body',
                'hover:border-accent-line-strong hover:bg-accent/[.07]',
                focusRing,
              ].join(' ')}
            >
              <Text size={FontSize.Small} className="block leading-[normal]">
                {topic}
              </Text>
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={onSubmit}
        className="mx-4 flex items-end gap-2 rounded-xl border border-line-emphasis bg-surface-editor p-2.5 focus-within:border-accent-line-hover"
      >
        <textarea
          ref={inputRef}
          rows={2}
          maxLength={maxLength}
          {...textareaProps}
          aria-label={strings.messageInput}
          placeholder={placeholder}
          className="min-w-0 flex-1 resize-none border-0 bg-transparent p-0.5 font-sans text-base leading-normal text-content-primary outline-none placeholder:text-content-faint"
        />
        <button
          type="submit"
          aria-label={strings.sendButton}
          className={[
            'grid size-[30px] flex-none cursor-pointer place-items-center rounded-lg bg-accent text-accent-content',
            focusRing,
          ].join(' ')}
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            aria-hidden="true"
          >
            <path d="M10 16V4m-5 5 5-5 5 5" />
          </svg>
        </button>
      </form>

      {note && (
        <Text as="div" size={FontSize.XXSmall} className="px-4 pt-[9px] pb-3 text-center text-content-dim">
          {note}
        </Text>
      )}
    </Text>
  )
}
