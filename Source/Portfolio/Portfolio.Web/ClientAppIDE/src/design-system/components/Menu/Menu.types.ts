import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'

export interface MenuProps extends HTMLAttributes<HTMLElement> {
  /** Etykieta paska nagłówka, np. „SZYBKI PRZEWODNIK". */
  header: ReactNode
  /** Dostępna nazwa nawigacji. */
  'aria-label': string
  /** Elementy `MenuItem` i grupy `MenuGroup`. Po nadaniu `Menu` klasy `max-h-*` lista przewija się wewnątrz karty, a nagłówek zostaje na górze. */
  children: ReactNode
}

export interface MenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Zaznaczona pozycja: akcentowy pasek z lewej i podświetlone tło.
   * @default false
   */
  active?: boolean
  /**
   * Pozycja wewnątrz `MenuGroup` — większy lewy padding i ciemniejszy domyślny kolor.
   * @default false
   */
  nested?: boolean
  /** Etykieta pozycji. */
  children: ReactNode
}

export interface MenuGroupProps extends HTMLAttributes<HTMLDetailsElement> {
  /** Nazwa grupy widoczna na rozwijanym nagłówku. */
  label: ReactNode
  /**
   * Czy grupa jest domyślnie rozwinięta.
   * @default true
   */
  defaultOpen?: boolean
  /** Pozycje `MenuItem` z `nested`. */
  children: ReactNode
}
