import { Terminal } from '@/design-system'
import { usePanels } from '@/context'
import { TERMINAL_ELEMENT_ID } from '../../Shell.consts'
import { useTerminal } from './hooks/useTerminal'
import { useTerminalCommands } from './hooks/useTerminalCommands'
import { TERMINAL_KEYS } from './AppTerminal.keys'
import { useTexts } from '@/i18n/hooks/useTexts'

/**
 * Terminal docked at the bottom of the editor area. It stays mounted while hidden, so the output,
 * command history (↑/↓) and height survive closing and reopening it.
 */
export function AppTerminal() {
  const [text] = useTexts(TERMINAL_KEYS)
  const { terminalOpen, setTerminalOpen } = usePanels()
  const { lines, run } = useTerminal()
  const { suggestions, completions } = useTerminalCommands()

  return (
    <Terminal
      id={TERMINAL_ELEMENT_ID}
      aria-label={text.label}
      labels={{
        title: text.labels.title,
        closeButton: text.labels.close,
        resizeHandle: text.labels.resize,
        commandInput: text.labels.input,
      }}
      open={terminalOpen}
      lines={lines}
      suggestions={suggestions}
      completions={completions}
      onCommand={run}
      onClose={() => setTerminalOpen(false)}
    />
  )
}
