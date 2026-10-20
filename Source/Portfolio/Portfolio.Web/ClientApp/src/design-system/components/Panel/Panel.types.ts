import type { HTMLAttributes, ReactNode } from 'react'

export interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Dodaje reakcję na najechanie (tło i obramowanie) — dla klikalnych paneli, np. kart projektów.
   * @default false
   */
  interactive?: boolean
  /**
   * Mocniejszy cień, dla panelu, który ma się wyraźnie wyróżniać na tle (np. formularz kontaktowy).
   * @default false
   */
  raised?: boolean
  /** Zawartość panelu. */
  children: ReactNode
}
