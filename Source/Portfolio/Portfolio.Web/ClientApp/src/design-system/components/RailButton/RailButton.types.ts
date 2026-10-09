import type { ButtonHTMLAttributes, ReactNode } from 'react'

export const RailButtonAccent = {
  /** Fioletowy akcent — strony portfolio. */
  Accent: 'accent',
  /** Złoty — przełącznik explorera. */
  Explorer: 'explorer',
  /** Zielony — terminal. */
  Success: 'success',
  /** Pomarańczowy — czat / asystent. */
  Assistant: 'assistant',
} as const
export type RailButtonAccent = (typeof RailButtonAccent)[keyof typeof RailButtonAccent]

export const RailButtonIconSize = {
  /** 16 px — ikony stron. */
  Md: 'md',
  /** 17 px — ikona terminala. */
  Lg: 'lg',
  /** 18 px — ikona czatu. */
  Xl: 'xl',
} as const
export type RailButtonIconSize = (typeof RailButtonIconSize)[keyof typeof RailButtonIconSize]

export interface RailButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Ikona przycisku; rozmiar określa `iconSize`. */
  icon: ReactNode
  /**
   * Rozmiar ikony.
   * @default RailButtonIconSize.Md
   */
  iconSize?: RailButtonIconSize
  /** Krótki, pionowy podpis pod ikoną, np. „WORK". Dekoracyjny (aria-hidden) — nazwą dostępną jest `aria-label`. */
  label: string
  /** Dostępna nazwa przycisku, np. „Projekty". */
  'aria-label': string
  /**
   * Aktywna strona: podświetlone tło, kolor akcentu i pasek z lewej. Ustawia też `aria-pressed`.
   * @default false
   */
  active?: boolean
  /**
   * Kolor stanu `active` (tekst, tło i pasek z lewej).
   * @default RailButtonAccent.Accent
   */
  accent?: RailButtonAccent
}
