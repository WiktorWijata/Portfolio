import { useId, useRef, type FormEvent, type MouseEvent } from 'react'
import { CloseButton, CloseButtonSize } from '../../internal/CloseButton'
import { useReopenFocus } from '../../internal/hooks/useReopenFocus'
import { useScrollToEnd } from '../../internal/hooks/useScrollToEnd'
import { FontFamily, FontSize, Text, TextColor } from '../Text'
import { useCommandInput } from './hooks/useCommandInput'
import { maxHeight, useResizableHeight } from './hooks/useResizableHeight'
import { DEFAULT_LABELS, MIN_HEIGHT } from './Terminal.consts'
import { TerminalLineKind, type TerminalProps } from './Terminal.types'

const lineKindClasses: Record<TerminalLineKind, string> = {
  [TerminalLineKind.Output]: '',
  [TerminalLineKind.Command]: 'text-[#d3afd0]',
  [TerminalLineKind.Error]: 'text-[#e6a080]',
}

/**
 * Bottom terminal panel: command history (↑/↓), Tab completion, Esc to close and a resizable height
 * (drag the top edge or use the arrow keys on it). Interpreting commands is the caller's job.
 */
export function Terminal({
  lines,
  suggestions = [],
  completions = [],
  prompt = 'visitor@portfolio:~$',
  subtitle = '/ portfolio',
  labels,
  onCommand,
  onClose,
  defaultHeight = 220,
  open = true,
  className = '',
  ...rest
}: TerminalProps) {
  const strings = { ...DEFAULT_LABELS, ...labels }
  const inputId = useId()
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { height, handleProps } = useResizableHeight(defaultHeight)
  const { run, inputProps } = useCommandInput({ completions, onCommand, onClose, inputRef })

  useScrollToEnd(scrollRef, lines)
  useReopenFocus(open, scrollRef, inputRef)

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    run(inputProps.value)
  }

  function onScrollAreaClick(e: MouseEvent) {
    if ((e.target as HTMLElement).closest('a,button,input,select,textarea')) return
    const selection = window.getSelection()
    if (selection && !selection.isCollapsed) return
    inputRef.current?.focus({ preventScroll: true })
  }

  return (
    <Text
      {...rest}
      as="section"
      size={FontSize.Small}
      font={FontFamily.Mono}
      color={TextColor.Body}
      hidden={!open}
      style={{ height }}
      className={[
        'relative flex max-h-[55dvh] min-h-[130px] flex-col border-t border-t-border-5 bg-editor leading-[1.7]',
        className,
      ].join(' ')}
    >
      {/* WAI-ARIA window splitter: a separator that is focusable and has a value is an interactive widget. */}
      <div
        role="separator"
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        aria-label={strings.resizeHandle}
        aria-orientation="horizontal"
        aria-valuemin={MIN_HEIGHT}
        aria-valuemax={maxHeight()}
        aria-valuenow={Math.round(height)}
        {...handleProps}
        className="absolute inset-x-0 -top-1 z-[2] h-[7px] cursor-ns-resize touch-none outline-none hover:bg-accent/[.333]"
      />

      <Text
        as="header"
        size={FontSize.XSmall}
        className="flex flex-none items-center justify-between border-b border-border bg-hover px-4 py-1.5 leading-[1.7]"
      >
        <Text>
          &gt;_ {strings.title} <Text className="text-text-label"> {subtitle}</Text>
        </Text>
        <CloseButton
          size={CloseButtonSize.Sm}
          aria-label={strings.closeButton}
          title={strings.closeButton}
          onClick={onClose}
        />
      </Text>

      {/* Mouse-only shortcut (a click on empty output focuses the input); keyboard users reach the input by Tab. */}
      <div
        ref={scrollRef}
        role="presentation"
        onClick={onScrollAreaClick}
        className="min-h-0 flex-1 overflow-auto overscroll-contain px-[18px] py-3"
      >
        <div role="log" aria-live="polite" aria-relevant="additions">
          {lines.map((line) => (
            <Text
              as="div"
              key={line.id}
              className={[
                'mb-1 [overflow-wrap:anywhere] whitespace-pre-wrap',
                lineKindClasses[line.kind ?? TerminalLineKind.Output],
              ].join(' ')}
            >
              {line.content}
            </Text>
          ))}
        </div>

        {suggestions.length > 0 && (
          <div className="my-2 flex flex-wrap gap-[7px]">
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => run(s)}
                className="cursor-pointer rounded-sm border border-chip-line bg-card px-2 py-0.5 text-[#b8a7bd] outline-none hover:border-[#b67aab] hover:text-[#ead9e7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <Text size={FontSize.XSmall} font={FontFamily.Mono} className="block leading-[normal]">
                  {s}
                </Text>
              </button>
            ))}
          </div>
        )}

        <form onSubmit={onSubmit} className="mt-[7px] flex items-baseline gap-[9px]">
          <label htmlFor={inputId} className="whitespace-nowrap text-accent">
            {prompt}
          </label>
          <input
            id={inputId}
            ref={inputRef}
            {...inputProps}
            aria-label={strings.commandInput}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            className="min-w-0 flex-1 border-0 bg-transparent p-0 font-[inherit] text-terminal-text caret-terminal-text outline-none"
          />
        </form>
      </div>
    </Text>
  )
}
