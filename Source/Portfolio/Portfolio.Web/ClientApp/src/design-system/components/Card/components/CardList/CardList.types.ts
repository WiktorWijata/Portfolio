import type { HTMLAttributes, ReactNode } from 'react'

export interface CardListProps extends HTMLAttributes<HTMLUListElement> {
  /** Wiersze: `CardRow`. */
  children: ReactNode
}
