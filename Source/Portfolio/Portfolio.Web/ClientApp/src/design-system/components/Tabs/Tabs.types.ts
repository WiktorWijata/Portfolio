import type { HTMLAttributes, ReactNode } from 'react'

export type { TabProps } from './components/Tab'

export interface TabsProps extends HTMLAttributes<HTMLElement> {
  /** Dostępna nazwa paska zakładek. */
  'aria-label': string
  /**
   * Włącza przeciąganie zakładek (i Alt+Shift+←/→); wywoływane z pełną, nową kolejnością
   * identyfikatorów po zakończeniu przeciągania. Bez tego zakładki nie zmieniają kolejności.
   */
  onReorder?: (newOrder: string[]) => void
  /** Zakładki `Tab`. */
  children: ReactNode
}
