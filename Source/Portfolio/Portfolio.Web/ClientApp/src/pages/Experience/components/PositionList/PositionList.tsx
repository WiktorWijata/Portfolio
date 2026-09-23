import { List, ListItem } from '@/design-system'
import { POSITIONS_HEADER } from '../../Experience.consts'
import type { PositionListProps } from './PositionList.types'

/** Left column of the Experience page: the positions, newest first; the chosen one is highlighted. */
export function PositionList({ positions, activeId, onSelect }: PositionListProps) {
  return (
    <List header={POSITIONS_HEADER} count={positions.length} role="group" aria-label={POSITIONS_HEADER}>
      {positions.map((position) => (
        <ListItem
          key={position.id}
          title={position.company}
          subtitle={position.role}
          tag={position.period}
          active={position.id === activeId}
          aria-pressed={position.id === activeId}
          onClick={() => onSelect(position.id)}
        />
      ))}
    </List>
  )
}
