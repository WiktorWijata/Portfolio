import { useCallback, useMemo, useRef, useState, type ReactNode } from 'react'
import { TerminalLineKind, type TerminalLine } from '@/design-system'
import { useEditor } from '@/context'
import {
  TERMINAL_MAX_LINES,
  TERMINAL_OPENED_PREFIX,
  TERMINAL_PROMPT,
  TERMINAL_UNKNOWN_HINT,
  TERMINAL_UNKNOWN_PREFIX,
  TERMINAL_WELCOME,
} from '../../AppTerminal.consts'
import { TerminalCommandName } from '../../AppTerminal.types'
import { createCommandHandlers, type CommandReply } from '../../utils'
import { useTerminalCommands } from '../useTerminalCommands'

/** Output and command interpreter of the portfolio terminal. Page commands open tabs in the editor. */
export function useTerminal() {
  const { openPage } = useEditor()
  const { commands } = useTerminalCommands()
  const handlers = useMemo(() => createCommandHandlers(commands), [commands])
  const nextId = useRef(1)
  const [lines, setLines] = useState<TerminalLine[]>([{ id: 0, content: TERMINAL_WELCOME }])

  const run = useCallback(
    (raw: string) => {
      const line = (content: ReactNode, kind?: TerminalLineKind): TerminalLine => ({
        id: nextId.current++,
        kind,
        content,
      })
      const command = commands.find((c) => c.name === raw.trim().toLowerCase())

      if (command?.name === TerminalCommandName.Clear) {
        setLines([])
        return
      }

      let reply: CommandReply
      if (!command) {
        reply = { content: `${TERMINAL_UNKNOWN_PREFIX} ${raw}. ${TERMINAL_UNKNOWN_HINT}`, kind: TerminalLineKind.Error }
      } else if (command.page) {
        openPage(command.page)
        reply = { content: `${TERMINAL_OPENED_PREFIX} ${command.description}.` }
      } else {
        reply = handlers[command.name]?.() ?? { content: '' }
      }

      const echo = line(`${TERMINAL_PROMPT} ${raw}`, TerminalLineKind.Command)
      setLines((prev) => [...prev, echo, line(reply.content, reply.kind)].slice(-TERMINAL_MAX_LINES))
    },
    [commands, handlers, openPage],
  )

  return { lines, run }
}
