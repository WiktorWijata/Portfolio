import { FolderOpen, GitBranch, Layers, Mail, PanelsTopLeft } from 'lucide-react'
import { PageId } from '@/navigation'
import { TerminalCommandName } from './components/AppTerminal/AppTerminal.types'
import type { PageShell } from './Shell.types'
import { TERMINAL_KEYS } from '@/components/Shell/components/AppTerminal/AppTerminal.keys'
import { RAIL_KEYS } from '@/components/Shell/components/Rail/Rail.keys'

/**
 * How the shell presents every page: its rail button and its terminal command. The order of the buttons and
 * commands is not set here — the rail and the terminal follow the order of pages in the solution (the order of
 * the files in the Solution Explorer). The type asks for an entry for every page, so a new page cannot be
 * forgotten; a page that needs neither gets `{}`.
 */
export const PAGE_SHELL: Record<PageId, PageShell> = {
  [PageId.GetStarted]: {},
  [PageId.Home]: {
    rail: { label: 'ABOUT', name: RAIL_KEYS.pages.home, icon: <PanelsTopLeft /> },
    command: { name: TerminalCommandName.About, descriptionKey: TERMINAL_KEYS.commands.about },
  },
  [PageId.Projects]: {
    rail: { label: 'WORK', name: RAIL_KEYS.pages.projects, icon: <FolderOpen /> },
    command: { name: TerminalCommandName.Projects, descriptionKey: TERMINAL_KEYS.commands.projects },
  },
  [PageId.ProjectPortfolio]: {},
  [PageId.Stack]: {
    rail: { label: 'STACK', name: RAIL_KEYS.pages.stack, icon: <Layers /> },
    command: { name: TerminalCommandName.Stack, descriptionKey: TERMINAL_KEYS.commands.stack },
  },
  [PageId.Experience]: {
    rail: { label: 'PATH', name: RAIL_KEYS.pages.experience, icon: <GitBranch /> },
    command: { name: TerminalCommandName.Experience, descriptionKey: TERMINAL_KEYS.commands.experience },
  },
  [PageId.Contact]: {
    rail: { label: 'MAIL', name: RAIL_KEYS.pages.contact, icon: <Mail />, pinned: true },
    command: { name: TerminalCommandName.Contact, descriptionKey: TERMINAL_KEYS.commands.contact },
  },
}
