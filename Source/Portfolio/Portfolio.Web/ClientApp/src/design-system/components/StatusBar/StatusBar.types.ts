import type { HTMLAttributes, ReactNode } from 'react'

export interface StatusBarProps extends HTMLAttributes<HTMLElement> {
  /** Dostępna nazwa paska, np. „Pasek statusu". */
  'aria-label': string
  /** Elementy paska: `StatusBarItem`, `StatusBarButton`, `StatusBarDivider`, `StatusBarSpacer`, `StatusBarSwitch`. */
  children: ReactNode
}

export const StatusBarTone = {
  /** Kolor pomocniczy — ścieżka pliku, meta-informacje. */
  Default: 'default',
  /** Zielony — nazwa gałęzi. */
  Success: 'success',
  /** Bardzo przygaszony — wersja aplikacji. */
  Faint: 'faint',
} as const
export type StatusBarTone = (typeof StatusBarTone)[keyof typeof StatusBarTone]

export const StatusBarAccent = {
  /** Zielony — np. otwarty terminal. */
  Success: 'success',
  /** Pomarańczowy — kolor asystenta. */
  Assistant: 'assistant',
} as const
export type StatusBarAccent = (typeof StatusBarAccent)[keyof typeof StatusBarAccent]

export type { StatusBarItemProps } from './components/StatusBarItem'

export type {
  StatusBarButtonAsButtonProps,
  StatusBarButtonAsLinkProps,
  StatusBarButtonProps,
} from './components/StatusBarButton'

export type { StatusBarSwitchOption, StatusBarSwitchProps } from './components/StatusBarSwitch'
