import { ContainerSize } from './Container.types'

export const sizeClasses: Record<ContainerSize, string> = {
  [ContainerSize.Default]: 'max-w-[900px]',
  [ContainerSize.Wide]: 'max-w-[1280px]',
}
