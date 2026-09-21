import type { HTMLAttributes, ReactNode } from 'react'

export interface InfoCardProps extends HTMLAttributes<HTMLElement> {
  /** Etykieta na pasku nagłówka, np. „DANE FIRMY". */
  header: ReactNode
  /** Wiersze `InfoRow`. */
  children: ReactNode
}

export interface InfoRowProps {
  /** Etykieta wiersza (wersalikami, mała, przygaszona). */
  label: ReactNode
  /** Wartość wiersza; wielolinijkowe (np. adres) można zapisać przez `<br />`. */
  children: ReactNode
}
