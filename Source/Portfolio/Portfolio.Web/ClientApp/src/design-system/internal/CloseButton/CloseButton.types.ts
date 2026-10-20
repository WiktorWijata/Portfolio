import type { ButtonHTMLAttributes } from 'react'

export const CloseButtonSize = {
  /** 20 px — nagłówek terminala. */
  Sm: 'sm',
  /** 24 px — nagłówek czatu. */
  Md: 'md',
} as const
export type CloseButtonSize = (typeof CloseButtonSize)[keyof typeof CloseButtonSize]

export interface CloseButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Dostępna nazwa przycisku (przycisk nie ma tekstu, krzyżyk jest rysowany stylami). */
  'aria-label': string
  /** @default CloseButtonSize.Md */
  size?: CloseButtonSize
}
