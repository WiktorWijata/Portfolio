import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode, Ref } from 'react'
import type { FontSize, FontWeight } from '../Text'

export const LinkTone = {
  /** Kolor akcentu (różowy) — akcje w treści, np. „Zobacz w portfolio →". */
  Accent: 'accent',
  /** Niebieski, podkreślany po najechaniu — odnośniki w treści stron, np. „Poznaj mnie →". */
  Info: 'info',
} as const
export type LinkTone = (typeof LinkTone)[keyof typeof LinkTone]

interface LinkSharedProps {
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

/** Bez `href`: renderowany jako `<button>` uruchamiający `onClick`, z natywnymi atrybutami przycisku. */
export interface LinkAsButtonProps
  extends LinkSharedProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color' | 'children'> {
  href?: undefined
  ref?: Ref<HTMLButtonElement>
}

/** Z `href`: renderowany jako `<a>`, z natywnymi atrybutami odnośnika (`target`, `rel`…). */
export interface LinkAsAnchorProps
  extends LinkSharedProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'color' | 'children'> {
  /** Adres. */
  href: string
  ref?: Ref<HTMLAnchorElement>
}

export type LinkProps = LinkAsButtonProps | LinkAsAnchorProps
