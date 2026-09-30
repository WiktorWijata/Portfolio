import type { CardListProps } from './CardList.types'

export function CardList({ className = '', children, ...rest }: CardListProps) {
  return (
    <ul className={['m-0 list-none p-0', className].join(' ')} {...rest}>
      {children}
    </ul>
  )
}
