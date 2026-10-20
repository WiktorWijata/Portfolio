import { PanelBar } from '../../internal/PanelBar'
import { ListSearchRow } from './components/ListSearchRow'
import { type ListProps } from './List.types'

/** List container with an optional header bar (label + counter) and an optional search row. */
export function List({ header, count, searchable = false, searchProps, className = '', children, ...rest }: ListProps) {
  return (
    <div className={['bg-surface-panel', className].join(' ')} {...rest}>
      {header && <PanelBar title={header} count={count} />}
      {searchable && <ListSearchRow {...searchProps} />}
      <ul className="flex flex-col @max-[700px]:flex-row @max-[700px]:flex-wrap">{children}</ul>
    </div>
  )
}
