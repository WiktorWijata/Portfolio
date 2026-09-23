import type { DataCardListProps } from './DataCardList.types'

export function DataCardList({ className = '', children, ...rest }: DataCardListProps) {
  return (
    <ul className={['m-0 list-none p-0', className].join(' ')} {...rest}>
      {children}
    </ul>
  )
}
