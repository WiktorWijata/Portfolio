import { FolderOpen, GitBranch, Layers, Mail, PanelsTopLeft } from 'lucide-react'
import { PageId } from '@/navigation'
import { TerminalCommandName } from './components/AppTerminal/AppTerminal.types'
import type { PageShell } from './Shell.types'

/**
 * How the shell presents every page: its rail button and its terminal command. The order of the buttons and
 * commands is not set here — the rail and the terminal follow the order of pages in the solution (the order of
 * the files in the Solution Explorer). The type asks for an entry for every page, so a new page cannot be
 * forgotten; a page that needs neither gets `{}`.
 */
export const PAGE_SHELL: Record<PageId, PageShell> = {
  [PageId.GetStarted]: {},
  [PageId.Home]: {
    rail: { label: 'ABOUT', name: 'O mnie', icon: <PanelsTopLeft /> },
    command: { name: TerminalCommandName.About, description: 'O mnie' },
  },
  [PageId.Projects]: {
    rail: { label: 'WORK', name: 'Projekty', icon: <FolderOpen /> },
    command: { name: TerminalCommandName.Projects, description: 'Projekty' },
  },
  [PageId.ProjectPortfolio]: {},
  [PageId.Stack]: {
    rail: { label: 'STACK', name: 'Stack technologiczny', icon: <Layers /> },
    command: { name: TerminalCommandName.Stack, description: 'Technologie' },
  },
  [PageId.Experience]: {
    rail: { label: 'PATH', name: 'Doświadczenie', icon: <GitBranch /> },
    command: { name: TerminalCommandName.Experience, description: 'Doświadczenie' },
  },
  [PageId.Contact]: {
    rail: { label: 'MAIL', name: 'Kontakt', icon: <Mail />, pinned: true },
    command: { name: TerminalCommandName.Contact, description: 'Formularz kontaktowy' },
  },
}
