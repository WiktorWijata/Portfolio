import type { ButtonHTMLAttributes, ReactNode } from 'react'

export interface TreeFileProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Głębokość zagnieżdżenia — 0 dla elementów na najwyższym poziomie.
   * @default 0
   */
  level?: number
  /**
   * Zaznaczony plik: tło i akcentowy pasek z lewej.
   * @default false
   */
  active?: boolean
  /** Znacznik typu pliku, np. kolorowe „C#" albo ikona SVG. */
  icon: ReactNode
  /** Nazwa pliku. */
  children: ReactNode
}
