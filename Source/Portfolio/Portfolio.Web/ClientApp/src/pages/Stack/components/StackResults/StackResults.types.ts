import type { TechnologyGroup } from '../../Stack.types'

export interface StackResultsProps {
  groups: TechnologyGroup[]
  total: number
  /** No padding of its own: the results sit directly on the page (phones) instead of inside a panel. */
  flat?: boolean
}
