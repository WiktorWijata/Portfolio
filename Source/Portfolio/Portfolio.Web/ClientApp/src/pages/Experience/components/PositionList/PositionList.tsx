import { List, ListItem } from '@/design-system'
import type { PositionListProps } from './PositionList.types'
import { EXPERIENCE_KEYS } from '../../Experience.keys'
import { useTexts } from '@/i18n/hooks/useTexts'

/** Left column of the Experience page: the positions, newest first; the chosen one is highlighted. */
export function PositionList({ positions, activeId, onSelect }: PositionListProps) {
  const [text] = useTexts(EXPERIENCE_KEYS)

  return (
    <List header={text.positionsHeader} count={positions.length} role="group" aria-label={text.positionsHeader}>
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
