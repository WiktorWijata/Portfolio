import { ContainerSize, type ContainerProps } from './Container.types'

const sizeClasses: Record<ContainerSize, string> = {
  [ContainerSize.Default]: 'max-w-[900px]',
  [ContainerSize.Wide]: 'max-w-[1280px]',
}

export function Container({ size = ContainerSize.Default, className = '', ...rest }: ContainerProps) {
  return <div className={['mx-auto w-full px-8', sizeClasses[size], className].join(' ')} {...rest} />
}
