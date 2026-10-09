import { useMemo } from 'react'
import { useEditor } from '@/context'
import {
  TERMINAL_HELP_COMMAND,
  TERMINAL_SUGGESTED_COMMANDS,
  TERMINAL_TRAILING_COMMANDS,
} from '../../AppTerminal.consts'
import type { TerminalCommand } from '../../AppTerminal.types'
import { PAGE_SHELL } from '../../../../Shell.pages'

/**
 * The terminal's command list: `help`, then the page commands in the order of the files in the
 * Solution Explorer, then `cv` and `clear`. The chips and Tab completion use the same order.
 */
export function useTerminalCommands() {
  const { pageOrder } = useEditor()

  return useMemo(() => {
    const pageCommands = pageOrder.flatMap((page): TerminalCommand[] => {
      const command = PAGE_SHELL[page].command
      return command ? [{ ...command, page }] : []
    })
    const commands = [TERMINAL_HELP_COMMAND, ...pageCommands, ...TERMINAL_TRAILING_COMMANDS]
    return {
      commands,
      suggestions: commands.map((c) => c.name).filter((name) => TERMINAL_SUGGESTED_COMMANDS.includes(name)),
      completions: commands.map((c) => c.name),
    }
  }, [pageOrder])
}
