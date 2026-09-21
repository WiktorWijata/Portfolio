import type { Position } from '../../Experience.types'

export interface PositionListProps {
  positions: Position[]
  activeId: string
  onSelect: (id: string) => void
}
