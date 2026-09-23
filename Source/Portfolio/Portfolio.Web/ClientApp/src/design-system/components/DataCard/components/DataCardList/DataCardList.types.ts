import type { HTMLAttributes, ReactNode } from 'react'

export interface DataCardListProps extends HTMLAttributes<HTMLUListElement> {
  /** Wiersze: `DataCardRow`. */
  children: ReactNode
}
