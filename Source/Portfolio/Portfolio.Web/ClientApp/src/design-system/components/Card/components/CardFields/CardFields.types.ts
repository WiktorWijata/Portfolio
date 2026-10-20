import type { HTMLAttributes, ReactNode } from 'react'

export interface CardFieldsProps extends HTMLAttributes<HTMLDListElement> {
  /** Wiersze: `CardField`. */
  children: ReactNode
}
