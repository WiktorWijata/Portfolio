import type { HTMLAttributes, ReactNode } from 'react'

export interface DataCardProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Tytuł paska nagłówka; wyświetlany dużymi literami, np. „Ścieżka w skrócie". */
  title: ReactNode
  /** Licznik w małej plakietce po tytule, np. liczba wierszy. */
  count?: number | string
  /** Element po prawej stronie paska, zwykle `DataCardAction` („Otwórz →"). */
  action?: ReactNode
  /** Zawartość karty pod paskiem: `DataCardList`, chipy itp. */
  children: ReactNode
}
