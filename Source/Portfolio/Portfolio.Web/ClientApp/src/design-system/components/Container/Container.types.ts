import type { HTMLAttributes } from 'react'

export const ContainerSize = {
  /** 900 px — strony z treścią. */
  Default: 'default',
  /** 1280 px — szerokie układy, np. sidebar + treść. */
  Wide: 'wide',
} as const
export type ContainerSize = (typeof ContainerSize)[keyof typeof ContainerSize]

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Maksymalna szerokość kontenera.
   * @default ContainerSize.Default
   */
  size?: ContainerSize
}
