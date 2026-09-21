import type { HTMLAttributes, ReactNode } from 'react'

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

export interface TabProps {
  /** Wymagane przy przeciąganiu — identyfikuje zakładkę w kontrolerze `Tabs`, a jej kolejność jest zwracana przez `onReorder`. */
  id?: string
  /**
   * Zakładka aktywna: akcentowa kreska u góry i tło edytora.
   * @default false
   */
  active?: boolean
  /** Etykieta zakładki, np. nazwa pliku. */
  children: ReactNode
  /** Wywoływane po kliknięciu zakładki. */
  onSelect?: () => void
  /** Pokazuje przycisk zamykania i wywołuje się po jego kliknięciu. Bez tego zakładka jest zwykłą zakładką nawigacyjną. */
  onClose?: () => void
  /** Dostępna nazwa przycisku zamykania — wymagana razem z `onClose`. */
  closeLabel?: string
}
