import type { HTMLAttributes, ReactNode } from 'react'

export interface InfoCardProps extends HTMLAttributes<HTMLElement> {
  /** Etykieta na pasku nagłówka, np. „DANE FIRMY". */
  header: ReactNode
  /** Wiersze `InfoRow`. */
  children: ReactNode
}

export type { InfoRowProps } from './components/InfoRow'
