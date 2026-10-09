import { sizeClasses } from './Container.consts'
import { ContainerSize, type ContainerProps } from './Container.types'

export function Container({ size = ContainerSize.Default, className = '', ...rest }: ContainerProps) {
  return <div className={['mx-auto w-full px-8', sizeClasses[size], className].join(' ')} {...rest} />
}
