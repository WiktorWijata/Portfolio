import type { ReactNode } from 'react'
import { Link, type TerminalLineKind } from '@/design-system'
import { CV_URL } from '@/profile'
import {
  TERMINAL_CV_INTRO,
  TERMINAL_CV_LINK,
  TERMINAL_HELP_FOOTER,
  TERMINAL_HELP_NAME_WIDTH,
} from '../AppTerminal.consts'
import { TerminalCommandName, type TerminalCommand } from '../AppTerminal.types'

/** What a command prints: a line of output, optionally coloured as an error. */
export interface CommandReply {
  content: ReactNode
  kind?: TerminalLineKind
}

export type CommandHandler = () => CommandReply

/** The `help` text: every command with its description, then the keyboard hints. */
export function formatHelp(commands: TerminalCommand[]): string {
  const list = commands.map((c) => `${c.name.padEnd(TERMINAL_HELP_NAME_WIDTH)}— ${c.description}`).join('\n')
  return `${list}\n\n${TERMINAL_HELP_FOOTER}`
}

/**
 * Handlers of the commands that neither open a page nor clear the output. A command is added here as one entry;
 * page commands are handled by the caller because they need the editor.
 */
export function createCommandHandlers(
  commands: TerminalCommand[],
): Partial<Record<TerminalCommandName, CommandHandler>> {
  return {
    [TerminalCommandName.Help]: () => ({ content: formatHelp(commands) }),
    [TerminalCommandName.Cv]: () => {
      window.open(CV_URL, '_blank', 'noopener')
      return {
        content: (
          <>
            {TERMINAL_CV_INTRO}{' '}
            <Link href={CV_URL} target="_blank" rel="noopener">
              {TERMINAL_CV_LINK}
            </Link>
          </>
        ),
      }
    },
  }
}
