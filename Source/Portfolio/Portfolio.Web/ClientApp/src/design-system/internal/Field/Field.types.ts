import type { ReactNode } from 'react'

export interface FieldProps {
  /** Etykieta pola, powiązana z nim przez `htmlFor`/`id`. Bez niej pole nie ma widocznej etykiety. */
  label?: string
  /** Rozwiązane id pola (przekazane albo wygenerowane przez `useId`); `label`, jeśli jest, wskazuje na nie. */
  id: string
  /** Samo pole (`input`/`textarea`). */
  children: ReactNode
}
