import type { ButtonHTMLAttributes, ReactNode } from 'react'

export const IconButtonSize = {
  /** Kwadrat 36 px — sterowanie w obrębie karty (np. strzałki karuzeli). */
  Md: 'md',
} as const
export type IconButtonSize = (typeof IconButtonSize)[keyof typeof IconButtonSize]

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Ikona przycisku. */
  icon: ReactNode
  /** Dostępna nazwa przycisku — wymagana, bo przycisk nie ma widocznego tekstu. */
  'aria-label': string
  /**
   * Rozmiar przycisku.
   * @default IconButtonSize.Md
   */
  size?: IconButtonSize
}
