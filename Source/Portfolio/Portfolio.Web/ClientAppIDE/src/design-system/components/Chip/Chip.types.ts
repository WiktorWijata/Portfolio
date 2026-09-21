import type { HTMLAttributes, ReactNode } from 'react'

export const ChipVariant = {
  /** Chip strony Stack: font mono 12,5 px, opcjonalna ikona (15 px), promień 3 px. */
  Default: 'default',
  /** Chip w kartach strony Home („Kluczowe technologie"): font mono 11,5 px. */
  Mono: 'mono',
  /** Mały chip przy warstwach architektury: font mono 10,5 px, ciaśniejszy padding. */
  Compact: 'compact',
  /** Znacznik technologii na stronie projektu („Technologie"): font mono 11 px, padding 5/9 px. */
  Tech: 'tech',
  /** Znacznik technologii w opisie stanowiska (Experience): font mono 11,5 px, padding 4/10 px, promień 3 px. */
  Position: 'position',
} as const
export type ChipVariant = (typeof ChipVariant)[keyof typeof ChipVariant]

export interface ChipProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'color'> {
  /**
   * Wygląd i rozmiar chipa.
   * @default ChipVariant.Default
   */
  variant?: ChipVariant
  /** Ikona przed nazwą technologii — SVG albo `<img>`, wyświetlana w 15 px. Tylko wariant `Default`. */
  icon?: ReactNode
  /** Nazwa technologii. */
  children: ReactNode
}
