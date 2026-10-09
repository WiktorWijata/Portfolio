import type { ButtonHTMLAttributes, ReactNode } from 'react'

export const ToolbarButtonSize = {
  /** Stały kwadrat 32 px — przyciski narzędzi (Terminal, Asystent, ...). */
  Md: 'md',
  /** Rozmiar dopasowany do ikony z paddingiem 3 px — kompaktowe paski narzędzi, np. Solution Explorer. */
  Sm: 'sm',
} as const
export type ToolbarButtonSize = (typeof ToolbarButtonSize)[keyof typeof ToolbarButtonSize]

export interface ToolbarButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Ikona przycisku (renderowana w 16 px). */
  icon: ReactNode
  /** Dostępna nazwa przycisku — wymagana, bo przycisk nie ma widocznego tekstu. */
  'aria-label': string
  /**
   * Stan „włączony": jaśniejsze tło i tekst.
   * @default false
   */
  active?: boolean
  /**
   * Rozmiar przycisku.
   * @default ToolbarButtonSize.Md
   */
  size?: ToolbarButtonSize
}
