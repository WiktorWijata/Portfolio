import type { InputHTMLAttributes } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Etykieta nad polem, powiązana z nim przez `htmlFor`/`id`. Bez niej pole nie ma widocznej etykiety. */
  label?: string
}
