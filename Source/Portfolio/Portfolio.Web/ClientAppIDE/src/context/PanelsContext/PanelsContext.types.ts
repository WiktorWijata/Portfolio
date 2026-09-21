import type { Dispatch, SetStateAction } from 'react'

/** Which side and bottom panels of the window are open. */
export interface Panels {
  explorerOpen: boolean
  setExplorerOpen: Dispatch<SetStateAction<boolean>>
  toggleExplorer: () => void
  terminalOpen: boolean
  setTerminalOpen: Dispatch<SetStateAction<boolean>>
  toggleTerminal: () => void
  chatOpen: boolean
  setChatOpen: Dispatch<SetStateAction<boolean>>
  toggleChat: () => void
}
