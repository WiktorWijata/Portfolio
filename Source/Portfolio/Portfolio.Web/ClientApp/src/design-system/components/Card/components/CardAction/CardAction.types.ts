import type { HTMLAttributes, ReactNode } from 'react'

export interface CardActionProps extends HTMLAttributes<HTMLButtonElement> {
  /** Podpis akcji, np. „Otwórz →". */
  children: ReactNode
}
