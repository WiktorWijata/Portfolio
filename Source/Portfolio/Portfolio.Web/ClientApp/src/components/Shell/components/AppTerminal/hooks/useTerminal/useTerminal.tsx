import { useCallback, useMemo, useRef, useState, type ReactNode } from 'react'
import { TerminalLineKind, type TerminalLine } from '@/design-system'
import { useEditor } from '@/context'
import { TERMINAL_MAX_LINES, TERMINAL_PROMPT, TERMINAL_WELCOME_LINE_ID } from '../../AppTerminal.consts'
import { TerminalCommandName } from '../../AppTerminal.types'
import { createCommandHandlers, type CommandReply } from '../../utils'
import { useTerminalCommands } from '../useTerminalCommands'
import { TERMINAL_KEYS } from '../../AppTerminal.keys'
import { useTexts } from '@/i18n/hooks/useTexts'

/** Output and command interpreter of the portfolio terminal. Page commands open tabs in the editor. */
export function useTerminal() {
  const [text, t] = useTexts(TERMINAL_KEYS)
  const { openPage } = useEditor()
  const { commands } = useTerminalCommands()
  const handlers = useMemo(() => createCommandHandlers(commands, t), [commands, t])
  const nextId = useRef(1)
  const [lines, setLines] = useState<TerminalLine[]>([{ id: TERMINAL_WELCOME_LINE_ID, content: null }])

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
        reply = { content: t(TERMINAL_KEYS.unknown, { command: raw }), kind: TerminalLineKind.Error }
      } else if (command.page) {
        openPage(command.page)
        reply = { content: t(TERMINAL_KEYS.opened, { page: t(command.descriptionKey) }) }
      } else {
        reply = handlers[command.name]?.() ?? { content: '' }
      }

      const echo = line(`${TERMINAL_PROMPT} ${raw}`, TerminalLineKind.Command)
      setLines((prev) => [...prev, echo, line(reply.content, reply.kind)].slice(-TERMINAL_MAX_LINES))
    },
    [commands, handlers, openPage, t],
  )

  const shownLines = useMemo(
    () => lines.map((line) => (line.id === TERMINAL_WELCOME_LINE_ID ? { ...line, content: text.welcome } : line)),
    [lines, text],
  )

  return { lines: shownLines, run }
}
