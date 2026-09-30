import type { ParseKeys } from 'i18next'
import type { PageId } from '@/navigation'

export const TerminalCommandName = {
  Help: 'help',
  About: 'about',
  Projects: 'projects',
  Stack: 'stack',
  Experience: 'experience',
  Contact: 'contact',
  Cv: 'cv',
  Clear: 'clear',
} as const
export type TerminalCommandName = (typeof TerminalCommandName)[keyof typeof TerminalCommandName]

export interface TerminalCommand {
  name: TerminalCommandName
  /** Translation key of the short description shown by `help` and, for page commands, in "Opened: …". */
  descriptionKey: ParseKeys
  /** Page the command opens in the editor. Commands without a page do something else (help, cv, clear). */
  page?: PageId
}

/** Command that opens a page; the page comes from the key it is registered under. */
export type TerminalPageCommand = Pick<TerminalCommand, 'name' | 'descriptionKey'>
