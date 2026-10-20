import type { StackCategory, TechnologyGroup } from '../../Stack.types'

export interface StackFiltersProps {
  groups: TechnologyGroup[]
  category: StackCategory
  onCategoryChange: (category: StackCategory) => void
  query: string
  onQueryChange: (query: string) => void
}
