import type { ButtonHTMLAttributes, ReactNode } from 'react'

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
