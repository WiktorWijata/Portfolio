import { useEffect, useState } from 'react'
import { usePanels } from '@/context'
import { TERMINAL_ELEMENT_ID } from '@/components/Shell/Shell.consts'
import {
  CHAT_BOTTOM,
  CHAT_BOTTOM_NARROW,
  CHAT_MAX_HEIGHT,
  CHAT_NARROW_MAX_WIDTH,
  CHAT_TERMINAL_GAP,
  CHAT_TOP_MARGIN,
} from '../../Assistant.consts'

function baseBottom() {
  return window.innerWidth <= CHAT_NARROW_MAX_WIDTH ? CHAT_BOTTOM_NARROW : CHAT_BOTTOM
}

/**
 * Offset of the chat window (and its launcher) from the bottom of the viewport. It stays above the
 * status bar and, while the terminal is open, above the terminal — following its height as it is resized.
 * Opening or closing the terminal recomputes it directly; dragging the terminal's edge is picked up by
 * the ResizeObserver.
 */
export function useChatDock() {
  const { terminalOpen } = usePanels()
  const [bottom, setBottom] = useState(baseBottom)

  // `terminalOpen` is a trigger: the effect re-runs (and recomputes) whenever the terminal opens or closes.
  useEffect(() => {
    const terminal = document.getElementById(TERMINAL_ELEMENT_ID)

    const update = () => {
      const base = baseBottom()
      const terminalVisible = terminal !== null && !terminal.hidden
      setBottom(
        terminalVisible
          ? Math.max(base, window.innerHeight - terminal.getBoundingClientRect().top + CHAT_TERMINAL_GAP)
          : base,
      )
    }

    const observer = terminal ? new ResizeObserver(update) : null
    if (terminal) observer?.observe(terminal)
    window.addEventListener('resize', update)
    update()

    return () => {
      observer?.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [terminalOpen])

  return { bottom, height: `min(${CHAT_MAX_HEIGHT}px, calc(100dvh - ${bottom + CHAT_TOP_MARGIN}px))` }
}
