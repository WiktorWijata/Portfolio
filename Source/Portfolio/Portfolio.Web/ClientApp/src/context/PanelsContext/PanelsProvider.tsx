import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { PanelsContext } from './PanelsContext'
import type { Panels } from './PanelsContext.types'

/** State of the explorer, terminal and chat panels. The explorer starts open: the IDE window only exists above the mobile width. */
export function PanelsProvider({ children }: { children: ReactNode }) {
  const [explorerOpen, setExplorerOpen] = useState(true)
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)

  const toggleExplorer = useCallback(() => setExplorerOpen((open) => !open), [])
  const toggleTerminal = useCallback(() => setTerminalOpen((open) => !open), [])
  const toggleChat = useCallback(() => setChatOpen((open) => !open), [])

  const panels = useMemo<Panels>(
    () => ({
      explorerOpen,
      setExplorerOpen,
      toggleExplorer,
      terminalOpen,
      setTerminalOpen,
      toggleTerminal,
      chatOpen,
      setChatOpen,
      toggleChat,
    }),
    [explorerOpen, toggleExplorer, terminalOpen, toggleTerminal, chatOpen, toggleChat],
  )

  return <PanelsContext.Provider value={panels}>{children}</PanelsContext.Provider>
}
