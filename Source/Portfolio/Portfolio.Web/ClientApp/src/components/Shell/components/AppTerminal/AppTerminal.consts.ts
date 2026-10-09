import { TerminalCommandName, type TerminalCommand } from './AppTerminal.types'
import { TERMINAL_KEYS } from './AppTerminal.keys'

export const TERMINAL_HELP_COMMAND: TerminalCommand = {
  name: TerminalCommandName.Help,
  descriptionKey: TERMINAL_KEYS.commands.help,
}

/** Commands that follow the page commands, in this order. */
export const TERMINAL_TRAILING_COMMANDS: TerminalCommand[] = [
  { name: TerminalCommandName.Cv, descriptionKey: TERMINAL_KEYS.commands.cv },
  { name: TerminalCommandName.Clear, descriptionKey: TERMINAL_KEYS.commands.clear },
]

/** Commands offered as clickable chips under the output (shown in the order of the command list). */
export const TERMINAL_SUGGESTED_COMMANDS: TerminalCommandName[] = [
  TerminalCommandName.Help,
  TerminalCommandName.About,
  TerminalCommandName.Projects,
  TerminalCommandName.Stack,
  TerminalCommandName.Experience,
  TerminalCommandName.Contact,
]

export const TERMINAL_PROMPT = 'visitor@portfolio:~$'
/** How many output lines the terminal keeps. */
export const TERMINAL_MAX_LINES = 150
/** Id of the first output line, the welcome text, which is translated when shown. */
export const TERMINAL_WELCOME_LINE_ID = 0
/** Width of the command column in the `help` output. */
export const TERMINAL_HELP_NAME_WIDTH = 13
