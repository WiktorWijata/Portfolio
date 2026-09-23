import type { ButtonHTMLAttributes, ReactNode } from 'react'
import type { ListItemVariant } from '../../List.types'

export interface ListItemProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'title'> {
  /**
   * Wygląd wiersza. `Filter` nie obsługuje `subtitle` ani `trailing`.
   * @default ListItemVariant.Detail
   */
  variant?: ListItemVariant
  /**
   * Zaznaczony element: akcentowy pasek z lewej, jaśniejsze tło, większy lewy padding.
   * @default false
   */
  active?: boolean
  /** Główny tekst wiersza, np. nazwa firmy. */
  title: ReactNode
  /** Druga linia pod tytułem, np. rola — w stanie aktywnym przyjmuje kolor akcentu. */
  subtitle?: ReactNode
  /** Ramkowana etykieta po prawej, np. zakres dat; zmienia wygląd razem z wierszem (hover i stan aktywny). */
  tag?: ReactNode
  /** Dowolna treść wyrównana do końca wiersza, np. `Badge`. */
  trailing?: ReactNode
}
