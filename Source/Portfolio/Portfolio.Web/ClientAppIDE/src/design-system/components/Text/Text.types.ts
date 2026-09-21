import type { HTMLAttributes, ReactNode, Ref } from 'react'

export const FontSize = {
  /** 9 px — najmniejsze etykiety (rail, kickery). */
  Nano: 'nano',
  /** 9,5 px — paski nagłówków list i kart. */
  Micro: 'micro',
  /** 10 px. */
  XXSmall: 'xxsmall',
  /** 11 px. */
  XSmall: 'xsmall',
  /** 12 px. */
  Small: 'small',
  /** 12,5 px. */
  SmallPlus: 'smallplus',
  /** 13 px — podstawowa treść interfejsu. */
  Medium: 'medium',
  /** 14 px. */
  Large: 'large',
  /** 15 px. */
  XLarge: 'xlarge',
  /** 17 px. */
  XXLarge: 'xxlarge',
  /** 20 px. */
  Title: 'title',
  /** 36 px — nagłówek strony. */
  Heading: 'heading',
  /** 44 px — największy nagłówek. */
  Display: 'display',
} as const
export type FontSize = (typeof FontSize)[keyof typeof FontSize]

export const TextColor = {
  /** Główny kolor tekstu. */
  Primary: 'primary',
  /** Kolor nagłówków. */
  Heading: 'heading',
  /** Kolor treści. */
  Body: 'body',
  /** Przygaszony — teksty pomocnicze. */
  Muted: 'muted',
  /** Wyraźnie przygaszony — opisy, podpisy. */
  Dim: 'dim',
  /** Bardzo przygaszony — etykiety, drugorzędne szczegóły. */
  Faint: 'faint',
  /** Odcień pośredni między Dim a Faint. */
  Dimmer: 'dimmer',
  /** Kolor akcentu. */
  Accent: 'accent',
  /** Jasny wariant akcentu. */
  AccentLight: 'accentlight',
} as const
export type TextColor = (typeof TextColor)[keyof typeof TextColor]

export const FontFamily = {
  /** IBM Plex Sans — tekst interfejsu. */
  Sans: 'sans',
  /** JetBrains Mono — kod, etykiety, przyciski. */
  Mono: 'mono',
} as const
export type FontFamily = (typeof FontFamily)[keyof typeof FontFamily]

export const FontWeight = {
  /** 400. */
  Normal: 'normal',
  /** 500. */
  Medium: 'medium',
  /** 600. */
  SemiBold: 'semibold',
} as const
export type FontWeight = (typeof FontWeight)[keyof typeof FontWeight]

/** Znaczniki HTML, którymi może być wyrenderowany `Text`. */
export type TextElement =
  | 'span'
  | 'p'
  | 'div'
  | 'strong'
  | 'small'
  | 'em'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'section'
  | 'aside'
  | 'header'
  | 'summary'
  | 'dt'
  | 'dd'

export interface TextProps extends HTMLAttributes<HTMLElement> {
  /** Rozmiar czcionki ze skali. Pominięty jest dziedziczony z rodzica. */
  size?: FontSize
  /** Kolor tekstu ze skali. Pominięty jest dziedziczony z rodzica. */
  color?: TextColor
  /** Rodzina czcionek. Pominięta jest dziedziczona z rodzica. */
  font?: FontFamily
  /** Grubość czcionki. Pominięta jest dziedziczona z rodzica. */
  weight?: FontWeight
  /**
   * Znacznik, którym wyrenderowany jest tekst.
   * @default 'span'
   */
  as?: TextElement
  /** Referencja do wyrenderowanego elementu. */
  ref?: Ref<HTMLElement>
  /** Treść. */
  children: ReactNode
}
