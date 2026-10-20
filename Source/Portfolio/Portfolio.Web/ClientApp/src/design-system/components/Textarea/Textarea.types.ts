import type { TextareaHTMLAttributes } from 'react'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Etykieta nad polem, powiązana z nim przez `htmlFor`/`id`. Bez niej pole nie ma widocznej etykiety. */
  label?: string
}
