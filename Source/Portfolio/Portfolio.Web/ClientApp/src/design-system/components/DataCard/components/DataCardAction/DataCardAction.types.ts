import type { HTMLAttributes, ReactNode } from 'react'

export interface DataCardActionProps extends HTMLAttributes<HTMLButtonElement> {
  /** Podpis akcji, np. „Otwórz →". */
  children: ReactNode
}
