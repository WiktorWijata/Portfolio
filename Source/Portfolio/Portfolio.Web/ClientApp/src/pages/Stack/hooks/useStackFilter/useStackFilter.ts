import { useMemo, useState } from 'react'
import { ALL_CATEGORIES } from '../../Stack.consts'
import type { StackCategory, TechnologyGroup } from '../../Stack.types'
import { countTechnologies, filterGroups } from '../../utils'

/** State of the Stack page: the chosen category, the search query and the groups that match them. */
export function useStackFilter(groups: TechnologyGroup[]) {
  const [category, setCategory] = useState<StackCategory>(ALL_CATEGORIES)
  const [query, setQuery] = useState('')

  const visibleGroups = useMemo(() => filterGroups(groups, category, query), [groups, category, query])

  return { category, setCategory, query, setQuery, visibleGroups, total: countTechnologies(visibleGroups) }
}
