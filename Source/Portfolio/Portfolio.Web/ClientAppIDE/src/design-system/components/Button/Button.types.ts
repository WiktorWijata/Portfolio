import type { AnchorHTMLAttributes, ReactNode } from 'react'

export const ButtonVariant = {
  /** Wypełniony kolorem akcentu — główna akcja na widoku. */
  Primary: 'primary',
  /** Przezroczysty z obramowaniem — akcja poboczna. */
  Outline: 'outline',
  /** Wypełniony neutralnym tłem z obramowaniem, akcentowy po najechaniu — np. „Pobierz CV ↓". */
  Secondary: 'secondary',
} as const
export type ButtonVariant = (typeof ButtonVariant)[keyof typeof ButtonVariant]

export const ButtonSize = {
  /** Przycisk akcji na stronie: minimalna wysokość 44 px, font mono 12 px. */
  Md: 'md',
  /** Kompaktowy, do kart i nakładek (np. przyciski przewodnika): padding 8×12 px, font sans 12 px. */
  Sm: 'sm',
  /** Mały odnośnik-przycisk (np. linki społecznościowe na Contact): padding 7×12 px, font mono 12 px. */
  Xs: 'xs',
  /** Przycisk w stopce karty (np. „Repozytorium"): wysokość 40 px, padding 14 px, promień 5 px, font mono 12 px. */
  Card: 'card',
  /** Wysłanie formularza: padding 12×18 px, font sans 13 px. */
  Lg: 'lg',
} as const
export type ButtonSize = (typeof ButtonSize)[keyof typeof ButtonSize]

export interface ButtonProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'color'> {
  /**
   * Adres. Z `href` przycisk jest odnośnikiem `<a>` wyglądającym jak przycisk (np. link do pliku CV);
   * bez niego — zwykłym `<button>`.
   */
  href?: string
  /** Wyłącza przycisk (tylko bez `href`). */
  disabled?: boolean
  /**
   * Wygląd przycisku.
   * @default ButtonVariant.Primary
   */
  variant?: ButtonVariant
  /**
   * Rozmiar przycisku.
   * @default ButtonSize.Md
   */
  size?: ButtonSize
  /** Etykieta przycisku. */
  children: ReactNode
}
