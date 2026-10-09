import type { HTMLAttributes } from 'react'

export const LoaderStatus = {
  /** Trwa ładowanie — pasek postępu i migający kursor. */
  Loading: 'loading',
  /** Ładowanie się nie udało — bez paska, komunikat w kolorze błędu. */
  Error: 'error',
} as const
export type LoaderStatus = (typeof LoaderStatus)[keyof typeof LoaderStatus]

export interface LoaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Komunikat w linii statusu, np. „Ładowanie doświadczenia…”. */
  label: string
  /**
   * Stan: ładowanie albo błąd.
   * @default LoaderStatus.Loading
   */
  status?: LoaderStatus
}
