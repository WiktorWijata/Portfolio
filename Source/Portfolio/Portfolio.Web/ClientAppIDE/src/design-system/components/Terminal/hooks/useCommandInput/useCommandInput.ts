import { useRef, useState, type ChangeEvent, type KeyboardEvent, type RefObject } from 'react'
import { HISTORY_LIMIT } from '../../Terminal.consts'

interface CommandInputOptions {
  /** Candidates for Tab completion. */
  completions: string[]
  onCommand: (command: string) => void
  onClose: () => void
  inputRef: RefObject<HTMLInputElement | null>
}

/**
 * The prompt of the terminal: the typed text, ↑/↓ history (the unsent text is kept as a draft), Tab completion
 * that cycles through the matches of the typed prefix, and Esc to close.
 */
export function useCommandInput({ completions, onCommand, onClose, inputRef }: CommandInputOptions) {
  const [value, setValue] = useState('')
  const history = useRef<string[]>([])
  const position = useRef(0)
  const draft = useRef('')
  const completion = useRef<{ matches: string[]; index: number } | null>(null)

  /** Runs a command: remembers it, clears the prompt and hands it to the caller. Empty input is ignored. */
  function run(raw: string) {
    const command = raw.trim()
    if (!command) return
    history.current = [...history.current, command].slice(-HISTORY_LIMIT)
    position.current = history.current.length
    draft.current = ''
    completion.current = null
    setValue('')
    onCommand(command)
    inputRef.current?.focus()
  }

  function browseHistory(step: -1 | 1) {
    if (position.current === history.current.length) draft.current = value
    position.current = Math.max(0, Math.min(history.current.length, position.current + step))
    setValue(position.current === history.current.length ? draft.current : (history.current[position.current] ?? ''))
    completion.current = null
  }

  function complete() {
    if (!completion.current) {
      const prefix = value.trim().toLowerCase()
      completion.current = { matches: completions.filter((c) => c.startsWith(prefix)), index: -1 }
    }
    const { matches } = completion.current
    if (matches.length) {
      completion.current.index = (completion.current.index + 1) % matches.length
      setValue(matches[completion.current.index] ?? '')
    }
  }

  /** Props for the `<input>`. */
  const inputProps = {
    value,
    onChange(e: ChangeEvent<HTMLInputElement>) {
      setValue(e.target.value)
      completion.current = null
    },
    onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault()
        browseHistory(e.key === 'ArrowUp' ? -1 : 1)
      } else if (e.key === 'Tab') {
        e.preventDefault()
        complete()
      }
    },
  }

  return { value, run, inputProps }
}
