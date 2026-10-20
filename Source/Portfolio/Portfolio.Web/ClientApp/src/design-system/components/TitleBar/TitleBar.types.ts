import type { HTMLAttributes, ReactNode } from 'react'

export interface TitleBarProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Krótki znak w akcentowym kafelku przed tytułem, np. `W_`. */
  logo: string
  /** Tytuł okna, np. „WiktorWijata / Portfolio". Zbyt długi jest przycinany wielokropkiem. */
  title: string
  /** Akcje po tytule: zwykle `TitleBarButton`. */
  children?: ReactNode
}

export const TitleBarButtonTone = {
  /** Niebieski przycisk „uruchom" (np. „Oprowadź mnie"). */
  Run: 'run',
  /** Bez tła, kolor akcentu — lekka akcja tekstowa (np. przełącznik explorera na telefonie). */
  Link: 'link',
} as const

export type { TitleBarButtonProps } from './components/TitleBarButton'

export type TitleBarButtonTone = (typeof TitleBarButtonTone)[keyof typeof TitleBarButtonTone]
