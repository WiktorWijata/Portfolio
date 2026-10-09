import { MessageSquareText, PanelLeft, SquareTerminal } from 'lucide-react'
import { RailButton, RailButtonAccent, RailButtonIconSize } from '@/design-system'
import { useEditor, usePanels } from '@/context'
import { PAGE_SHELL } from '../../Shell.pages'
import { TourTarget } from '../../Shell.consts'
import { RAIL_EXPLORER_TITLE, RAIL_TERMINAL_TITLE } from './Rail.consts'
import { EXPLORER_KEYS } from '@/components/Shell/components/Explorer/Explorer.keys'
import { RAIL_KEYS } from './Rail.keys'
import { useTexts } from '@/i18n/hooks/useTexts'

/** Left icon rail: panel toggles on top, page shortcuts below, contact pinned to the bottom. */
export function Rail() {
  const [text, t] = useTexts(RAIL_KEYS)
  const [explorerText] = useTexts(EXPLORER_KEYS)
  const { pageOrder, activePage, openPage } = useEditor()
  const { explorerOpen, toggleExplorer, terminalOpen, toggleTerminal, chatOpen, toggleChat } = usePanels()
  const pageButtons = pageOrder.flatMap((id) => {
    const page = PAGE_SHELL[id].rail
    return page ? [{ id, ...page }] : []
  })
  const firstPinned = pageButtons.findIndex((button) => button.pinned)

  return (
    <nav
      aria-label={text.label}
      className="flex flex-col items-center gap-[7px] border-r border-line-default bg-surface-hover py-3 max-bp570:hidden"
    >
      <RailButton
        className="pb-[9px]"
        icon={<PanelLeft strokeWidth={2} />}
        label={RAIL_EXPLORER_TITLE}
        accent={RailButtonAccent.Explorer}
        data-tour={TourTarget.ExplorerRail}
        aria-label={explorerOpen ? explorerText.hide : explorerText.show}
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
        aria-label={text.terminalLabel}
        aria-expanded={terminalOpen}
        active={terminalOpen}
        onClick={toggleTerminal}
      />
      <RailButton
        icon={<MessageSquareText strokeWidth={1.5} />}
        iconSize={RailButtonIconSize.Xl}
        label={text.chatTitle}
        accent={RailButtonAccent.Assistant}
        data-tour={TourTarget.AssistantRail}
        aria-label={text.chatLabel}
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
          aria-label={t(button.name)}
          active={activePage === button.id}
          onClick={() => openPage(button.id)}
        />
      ))}
    </nav>
  )
}
