import { Terminal } from '@/design-system'
import { usePanels } from '@/context'
import { TERMINAL_ELEMENT_ID } from '../../Shell.consts'
import { TERMINAL_LABEL } from './AppTerminal.consts'
import { useTerminal } from './hooks/useTerminal'
import { useTerminalCommands } from './hooks/useTerminalCommands'

/**
 * Terminal docked at the bottom of the editor area. It stays mounted while hidden, so the output,
 * command history (↑/↓) and height survive closing and reopening it.
 */
export function AppTerminal() {
  const { terminalOpen, setTerminalOpen } = usePanels()
  const { lines, run } = useTerminal()
  const { suggestions, completions } = useTerminalCommands()

  return (
    <Terminal
      id={TERMINAL_ELEMENT_ID}
      aria-label={TERMINAL_LABEL}
      open={terminalOpen}
      lines={lines}
      suggestions={suggestions}
      completions={completions}
      onCommand={run}
      onClose={() => setTerminalOpen(false)}
    />
  )
}
