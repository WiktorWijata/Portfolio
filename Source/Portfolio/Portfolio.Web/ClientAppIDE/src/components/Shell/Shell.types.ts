import type { TerminalPageCommand } from './components/AppTerminal/AppTerminal.types'
import type { RailPage } from './components/Rail/Rail.types'

/** How the shell presents one page besides its tab: on the rail and as a terminal command. Both are optional. */
export interface PageShell {
  /** Rail button; pages without one are reached through the explorer, the tabs or other pages. */
  rail?: RailPage
  /** Terminal command that opens the page. */
  command?: TerminalPageCommand
}
