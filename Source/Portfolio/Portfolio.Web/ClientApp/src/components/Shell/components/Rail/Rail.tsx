import { MessageSquareText, PanelLeft, SquareTerminal } from 'lucide-react'
import { RailButton, RailButtonAccent, RailButtonIconSize } from '@/design-system'
import { useEditor, usePanels } from '@/context'
import { PAGE_SHELL } from '../../Shell.pages'
import { EXPLORER_HIDE_LABEL, EXPLORER_SHOW_LABEL, TourTarget } from '../../Shell.consts'
import {
  RAIL_CHAT_LABEL,
  RAIL_CHAT_TITLE,
  RAIL_EXPLORER_TITLE,
  RAIL_LABEL,
  RAIL_TERMINAL_LABEL,
  RAIL_TERMINAL_TITLE,
} from './Rail.consts'

/** Left icon rail: panel toggles on top, page shortcuts below, contact pinned to the bottom. */
export function Rail() {
  const { pageOrder, activePage, openPage } = useEditor()
  const { explorerOpen, toggleExplorer, terminalOpen, toggleTerminal, chatOpen, toggleChat } = usePanels()
  const pageButtons = pageOrder.flatMap((id) => {
    const page = PAGE_SHELL[id].rail
    return page ? [{ id, ...page }] : []
  })
  const firstPinned = pageButtons.findIndex((button) => button.pinned)

  return (
    <nav
      aria-label={RAIL_LABEL}
      className="flex flex-col items-center gap-[7px] border-r border-line-default bg-surface-hover py-3 max-bp570:hidden"
    >
      <RailButton
        className="pb-[9px]"
        icon={<PanelLeft strokeWidth={2} />}
        label={RAIL_EXPLORER_TITLE}
        accent={RailButtonAccent.Explorer}
        data-tour={TourTarget.ExplorerRail}
        aria-label={explorerOpen ? EXPLORER_HIDE_LABEL : EXPLORER_SHOW_LABEL}
        aria-expanded={explorerOpen}
        active={explorerOpen}
        onClick={toggleExplorer}
      />
      <RailButton
        icon={<SquareTerminal strokeWidth={1.5} />}
        iconSize={RailButtonIconSize.Lg}
        label={RAIL_TERMINAL_TITLE}
        accent={RailButtonAccent.Success}
        data-tour={TourTarget.TerminalRail}
        aria-label={RAIL_TERMINAL_LABEL}
        aria-expanded={terminalOpen}
        active={terminalOpen}
        onClick={toggleTerminal}
      />
      <RailButton
        icon={<MessageSquareText strokeWidth={1.5} />}
        iconSize={RailButtonIconSize.Xl}
        label={RAIL_CHAT_TITLE}
        accent={RailButtonAccent.Assistant}
        data-tour={TourTarget.AssistantRail}
        aria-label={RAIL_CHAT_LABEL}
        aria-expanded={chatOpen}
        active={chatOpen}
        onClick={toggleChat}
      />
      <div aria-hidden className="my-0.5 h-px w-[27px] bg-line-default" />
      {pageButtons.map((button, index) => (
        <RailButton
          key={button.id}
          className={index === firstPinned ? 'mt-auto' : ''}
          icon={button.icon}
          label={button.label}
          aria-label={button.name}
          active={activePage === button.id}
          onClick={() => openPage(button.id)}
        />
      ))}
    </nav>
  )
}
