import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode, Ref } from 'react'

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

interface ButtonSharedProps {
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

/** Bez `href`: renderowany jako `<button>`, z jego natywnymi atrybutami (`type`, `disabled`, `form`…). */
export interface ButtonAsButtonProps
  extends ButtonSharedProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color' | 'children'> {
  href?: undefined
  ref?: Ref<HTMLButtonElement>
}

/**
 * Z `href`: przycisk jest odnośnikiem `<a>` wyglądającym jak przycisk (np. link do pliku CV), z natywnymi
 * atrybutami odnośnika (`target`, `rel`…). Kotwica nie ma `disabled` — HTML go dla niej nie przewiduje.
 */
export interface ButtonAsLinkProps
  extends ButtonSharedProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'color' | 'children'> {
  /** Adres. */
  href: string
  ref?: Ref<HTMLAnchorElement>
}

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps
