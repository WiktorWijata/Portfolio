import type { AnchorHTMLAttributes, ReactNode } from 'react'
import type { FontSize, FontWeight } from '../Text'

export const LinkTone = {
  /** Kolor akcentu (różowy) — akcje w treści, np. „Zobacz w portfolio →". */
  Accent: 'accent',
  /** Niebieski, podkreślany po najechaniu — odnośniki w treści stron, np. „Poznaj mnie →". */
  Info: 'info',
} as const
export type LinkTone = (typeof LinkTone)[keyof typeof LinkTone]

export interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'color'> {
  /**
   * Adres. Z `href` komponent renderuje odnośnik `<a>`; bez niego — przycisk (`<button>`)
   * uruchamiający akcję z `onClick`, np. „Zobacz w portfolio →".
   */
  href?: string
  /**
   * Kolor odnośnika.
   * @default LinkTone.Accent
   */
  tone?: LinkTone
  /**
   * Podkreślenie (dolna linia w kolorze akcentu, jaśniejsza po najechaniu).
   * @default false
   */
  underline?: boolean
  /** Rozmiar czcionki ze skali. Pominięty jest dziedziczony z rodzica. */
  size?: FontSize
  /** Grubość czcionki. Pominięta jest dziedziczona z rodzica. */
  weight?: FontWeight
  /** Treść odnośnika. */
  children: ReactNode
}
