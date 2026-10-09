import type { HTMLAttributes, ReactNode } from 'react'

export interface MenuProps extends HTMLAttributes<HTMLElement> {
  /** Etykieta paska nagłówka, np. „SZYBKI PRZEWODNIK". */
  header: ReactNode
  /** Dostępna nazwa nawigacji. */
  'aria-label': string
  /** Elementy `MenuItem` i grupy `MenuGroup`. Po nadaniu `Menu` klasy `max-h-*` lista przewija się wewnątrz karty, a nagłówek zostaje na górze. */
  children: ReactNode
}

export type { MenuItemProps } from './components/MenuItem'

export type { MenuGroupProps } from './components/MenuGroup'
