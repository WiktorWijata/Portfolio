// Literal class strings (Tailwind can't scan built ones): rail / explorer / editor columns and the
// mobile layout (≤570px: rail hidden, explorer stacked above the editor).
export const GRID_EXPLORER_OPEN =
  'grid-cols-[42px_224px_minmax(0,1fr)] max-bp850:grid-cols-[36px_210px_minmax(0,1fr)] max-bp570:grid-cols-1 max-bp570:grid-rows-[auto_minmax(0,1fr)]'

export const GRID_EXPLORER_COLLAPSED =
  'grid-cols-[42px_minmax(0,1fr)] max-bp850:grid-cols-[36px_minmax(0,1fr)] max-bp570:grid-cols-1 max-bp570:grid-rows-[minmax(0,1fr)]'

// DOM ids shared between panels: the assistant lifts itself above the docked terminal, and the
// launcher points `aria-controls` at the chat window.
export const TERMINAL_ELEMENT_ID = 'portfolio-terminal'
export const CHAT_ELEMENT_ID = 'portfolio-ai-chat'

/**
 * Elements the guide tour can point at. They carry `data-tour="<value>"`; the tour finds them by
 * that attribute, so it does not depend on class names or on where the element sits in the tree.
 */
export const TourTarget = {
  Language: 'language',
  Explorer: 'explorer',
  ExplorerRail: 'explorer-rail',
  ExplorerTitleBar: 'explorer-title-bar',
  Tabs: 'tabs',
  TerminalRail: 'terminal-rail',
  TerminalStatus: 'terminal-status',
  AssistantRail: 'assistant-rail',
  AssistantStatus: 'assistant-status',
  StatusBar: 'status-bar',
} as const
export type TourTarget = (typeof TourTarget)[keyof typeof TourTarget]

export const TOUR_ATTRIBUTE = 'data-tour'

/** Static value shown in the status bar and the empty editor; it will come from the API later. */
export const GIT_BRANCH = '⑂ master'

/** Labels of the buttons that fold and unfold the Solution Explorer (rail, title bar and the explorer itself). */
export const EXPLORER_HIDE_LABEL = 'Zwiń explorer'
export const EXPLORER_SHOW_LABEL = 'Pokaż explorer'
