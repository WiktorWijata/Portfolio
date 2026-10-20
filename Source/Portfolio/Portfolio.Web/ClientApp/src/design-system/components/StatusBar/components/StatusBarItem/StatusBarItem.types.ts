import type { HTMLAttributes, ReactNode } from 'react'
import type { StatusBarIndicator, StatusBarTone } from '../../StatusBar.types'

export interface StatusBarItemProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'color'> {
  /**
   * Kolor tekstu.
   * @default StatusBarTone.Default
   */
  tone?: StatusBarTone
  /** Lampka przed tekstem, np. stan połączenia z API. Sama lampka jest dekoracją — stan opisz w tekście albo `title`. */
  indicator?: StatusBarIndicator
  /**
   * Przycina zbyt długi tekst wielokropkiem i pozwala elementowi się zwężać (np. ścieżka pliku).
   * Bez tego element nie zmniejsza się i nie zawija.
   * @default false
   */
  truncate?: boolean
  /** Treść elementu. */
  children: ReactNode
}
