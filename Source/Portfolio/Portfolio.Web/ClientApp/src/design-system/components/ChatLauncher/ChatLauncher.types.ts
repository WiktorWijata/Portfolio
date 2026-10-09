import type { ComponentPropsWithRef, ReactNode } from 'react'

export interface ChatLauncherProps extends ComponentPropsWithRef<'button'> {
  /** Ikona przed podpisem (renderowana w 18 px), np. dymek czatu. */
  icon?: ReactNode
  /** Podpis przycisku, np. „Zapytaj o mnie". */
  children: ReactNode
}
