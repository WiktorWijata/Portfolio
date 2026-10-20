import type { ReactNode } from 'react'

export interface TreeFolderProps {
  /**
   * Głębokość zagnieżdżenia — 0 dla elementów na najwyższym poziomie.
   * @default 0
   */
  level?: number
  /** Nazwa folderu. */
  label: ReactNode
  /** Ikona folderu. */
  icon: ReactNode
  /**
   * Początkowy stan otwarcia w trybie niekontrolowanym (bez `open`).
   * @default true
   */
  defaultOpen?: boolean
  /** Kontrolowany stan otwarcia — przekaż razem z `onToggle` (np. dla „rozwiń/zwiń wszystko"). */
  open?: boolean
  /** Wywoływane po kliknięciu chevrona z nowym stanem otwarcia. */
  onToggle?: (open: boolean) => void
  /**
   * Zaznaczony folder.
   * @default false
   */
  active?: boolean
  /** Wywoływane po kliknięciu samego wiersza (zaznaczenie) — chevron tylko rozwija i zwija. */
  onClick?: () => void
  /** Zawartość folderu: kolejne `TreeFile` i `TreeFolder`. */
  children: ReactNode
}
