import type { HTMLAttributes, ReactNode } from 'react'

export const LabelTone = {
  /** Przygaszony szary — domyślny nagłówek panelu. */
  Muted: 'muted',
  /** Jasny akcent — kicker nad tytułem strony. */
  Accent: 'accent',
} as const
export type LabelTone = (typeof LabelTone)[keyof typeof LabelTone]

export const LabelSize = {
  /** 9 px — np. etykiety w rail. */
  Sm: 'sm',
  /** 9,5 px — np. paski nagłówków list i kart. */
  Md: 'md',
} as const
export type LabelSize = (typeof LabelSize)[keyof typeof LabelSize]

export interface LabelProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Kolor etykiety.
   * @default LabelTone.Muted
   */
  tone?: LabelTone
  /**
   * Rozmiar czcionki i rozstaw liter.
   * @default LabelSize.Md
   */
  size?: LabelSize
  /** Tekst etykiety (wyświetlany wersalikami). */
  children: ReactNode
}
