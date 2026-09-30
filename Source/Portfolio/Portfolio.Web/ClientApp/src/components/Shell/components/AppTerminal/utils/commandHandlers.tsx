import type { TFunction } from 'i18next'
import type { ReactNode } from 'react'
import { Link, type TerminalLineKind } from '@/design-system'
import { CV_URL } from '@/profile'
import { TERMINAL_HELP_NAME_WIDTH } from '../AppTerminal.consts'
import { TerminalCommandName, type TerminalCommand } from '../AppTerminal.types'
import { TERMINAL_KEYS } from '../AppTerminal.keys'

/** What a command prints: a line of output, optionally coloured as an error. */
export interface CommandReply {
  content: ReactNode
  kind?: TerminalLineKind
}

export type CommandHandler = () => CommandReply

/** The `help` text: every command with its description, then the keyboard hints. */
export function formatHelp(commands: TerminalCommand[], t: TFunction): string {
  const list = commands.map((c) => `${c.name.padEnd(TERMINAL_HELP_NAME_WIDTH)}— ${t(c.descriptionKey)}`).join('\n')
  return `${list}\n\n${t(TERMINAL_KEYS.helpFooter)}`
}

/**
 * Handlers of the commands that neither open a page nor clear the output. A command is added here as one entry;
 * page commands are handled by the caller because they need the editor.
 */
export function createCommandHandlers(
  commands: TerminalCommand[],
  t: TFunction,
): Partial<Record<TerminalCommandName, CommandHandler>> {
  return {
    [TerminalCommandName.Help]: () => ({ content: formatHelp(commands, t) }),
    [TerminalCommandName.Cv]: () => {
      window.open(CV_URL, '_blank', 'noopener')
      return {
        content: (
          <>
            {t(TERMINAL_KEYS.cvIntro)}{' '}
            <Link href={CV_URL} target="_blank" rel="noopener">
              {t(TERMINAL_KEYS.cvLink)}
            </Link>
          </>
        ),
      }
    },
  }
}
