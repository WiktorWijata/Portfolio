import type { ReactNode } from 'react'

export interface InfoRowProps {
  /** Etykieta wiersza (wersalikami, mała, przygaszona). */
  label: ReactNode
  /** Wartość wiersza; wielolinijkowe (np. adres) można zapisać przez `<br />`. */
  children: ReactNode
}
