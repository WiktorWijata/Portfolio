import { List, ListItem, ListItemVariant } from '@/design-system'
import { ALL_CATEGORIES } from '../../Stack.consts'
import type { StackFiltersProps } from './StackFilters.types'
import { STACK_KEYS } from '../../Stack.keys'
import { useTexts } from '@/i18n/hooks/useTexts'

/** Left column of the Stack page: a search field and the list of categories ("Wszystkie" + one per group). */
export function StackFilters({ groups, category, onCategoryChange, query, onQueryChange }: StackFiltersProps) {
  const [text] = useTexts(STACK_KEYS)
  const categories = [{ id: ALL_CATEGORIES, label: text.filters.all }, ...groups]

  return (
    <List
      header={text.filters.header}
      count={groups.length}
      searchable
      searchProps={{
        value: query,
        onChange: (event) => onQueryChange(event.target.value),
        placeholder: text.filters.searchPlaceholder,
        'aria-label': text.filters.searchLabel,
      }}
      role="group"
      aria-label={text.filters.label}
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
