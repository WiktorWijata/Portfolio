import { List, ListItem, ListItemVariant } from '@/design-system'
import {
  ALL_CATEGORIES,
  STACK_ALL_LABEL,
  STACK_CATEGORIES_HEADER,
  STACK_CATEGORIES_LABEL,
  STACK_SEARCH_LABEL,
  STACK_SEARCH_PLACEHOLDER,
} from '../../Stack.consts'
import type { StackFiltersProps } from './StackFilters.types'

/** Left column of the Stack page: a search field and the list of categories ("Wszystkie" + one per group). */
export function StackFilters({ groups, category, onCategoryChange, query, onQueryChange }: StackFiltersProps) {
  const categories = [{ id: ALL_CATEGORIES, label: STACK_ALL_LABEL }, ...groups]

  return (
    <List
      header={STACK_CATEGORIES_HEADER}
      count={groups.length}
      searchable
      searchProps={{
        value: query,
        onChange: (event) => onQueryChange(event.target.value),
        placeholder: STACK_SEARCH_PLACEHOLDER,
        'aria-label': STACK_SEARCH_LABEL,
      }}
      role="group"
      aria-label={STACK_CATEGORIES_LABEL}
    >
      {categories.map((item) => (
        <ListItem
          key={item.id}
          variant={ListItemVariant.Filter}
          title={item.label}
          active={item.id === category}
          aria-pressed={item.id === category}
          onClick={() => onCategoryChange(item.id)}
        />
      ))}
    </List>
  )
}
