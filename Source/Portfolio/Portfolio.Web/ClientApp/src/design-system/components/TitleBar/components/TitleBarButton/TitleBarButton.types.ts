import type { ButtonHTMLAttributes, ReactNode } from 'react'
import type { TitleBarButtonTone } from '../../TitleBar.types'

export interface TitleBarButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Wygląd przycisku.
   * @default TitleBarButtonTone.Run
   */
  tone?: TitleBarButtonTone
  /** Ikona lub znak przed podpisem, np. `▷`. Dekoracyjne (aria-hidden). */
  icon?: ReactNode
  /** Podpis przycisku. */
  children: ReactNode
}
