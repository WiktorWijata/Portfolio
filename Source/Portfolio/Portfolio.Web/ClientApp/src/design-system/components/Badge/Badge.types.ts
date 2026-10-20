import type { HTMLAttributes, ReactNode } from 'react'

export const BadgeTone = {
  /** Szare obramowanie i przygaszony tekst. */
  Neutral: 'neutral',
  /** Obramowanie w kolorze akcentu i jasny tekst akcentowy. */
  Accent: 'accent',
} as const
export type BadgeTone = (typeof BadgeTone)[keyof typeof BadgeTone]

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Odcień etykiety: neutralny albo akcentowy (np. bieżące stanowisko).
   * @default BadgeTone.Neutral
   */
  tone?: BadgeTone
  /** Treść etykiety, np. zakres dat. */
  children: ReactNode
}
