import type { HTMLAttributes, ReactNode } from 'react'

export interface MenuGroupProps extends HTMLAttributes<HTMLDetailsElement> {
  /** Nazwa grupy widoczna na rozwijanym nagłówku. */
  label: ReactNode
  /**
   * Czy grupa jest domyślnie rozwinięta.
   * @default true
   */
  defaultOpen?: boolean
  /** Pozycje `MenuItem` z `nested`. */
  children: ReactNode
}
