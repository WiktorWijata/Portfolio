import { TerminalCommandName, type TerminalCommand } from './AppTerminal.types'

export const TERMINAL_HELP_COMMAND: TerminalCommand = {
  name: TerminalCommandName.Help,
  description: 'Dostępne komendy',
}

/** Commands that follow the page commands, in this order. */
export const TERMINAL_TRAILING_COMMANDS: TerminalCommand[] = [
  { name: TerminalCommandName.Cv, description: 'Link do CV' },
  { name: TerminalCommandName.Clear, description: 'Wyczyść terminal' },
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
export const TERMINAL_WELCOME =
  'Cześć! Możesz poruszać się po portfolio także stąd.\nWpisz help lub wybierz komendę poniżej.'
export const TERMINAL_HELP_FOOTER = '↑/↓ historia · Tab podpowiedzi · Esc zwiń'
/** How many output lines the terminal keeps. */
export const TERMINAL_MAX_LINES = 150

export const TERMINAL_LABEL = 'Terminal portfolio'
export const TERMINAL_CV_INTRO = 'CV jest dostępne tutaj:'
export const TERMINAL_CV_LINK = 'Pobierz CV ↗'
export const TERMINAL_OPENED_PREFIX = 'Otwarto:'
export const TERMINAL_UNKNOWN_PREFIX = 'Nieznana komenda:'
export const TERMINAL_UNKNOWN_HINT = 'Wpisz help.'
/** Width of the command column in the `help` output. */
export const TERMINAL_HELP_NAME_WIDTH = 13
