import type { TerminalLabels } from './Terminal.types'

/** Smallest height of the panel, in px. */
export const MIN_HEIGHT = 130
/** The panel can grow up to this share of the window height. */
export const MAX_HEIGHT_RATIO = 0.55
/** Height change of one arrow-key press on the resize handle, in px. */
export const KEYBOARD_STEP = 20
/** Number of commands remembered for the ↑/↓ history. */
export const HISTORY_LIMIT = 100

export const DEFAULT_LABELS: TerminalLabels = {
  title: 'Terminal',
  closeButton: 'Zamknij terminal',
  resizeHandle: 'Zmień wysokość terminala',
  commandInput: 'Komenda terminala',
}
