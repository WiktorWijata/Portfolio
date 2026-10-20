import { FontFamily, FontSize, SearchField, Text } from '@/design-system'
import { ALL_CATEGORIES } from '../../Stack.consts'
import type { StackFiltersProps } from '../StackFilters/StackFilters.types'
import { STACK_KEYS } from '../../Stack.keys'
import { useTexts } from '@/i18n/hooks/useTexts'

/** Phone version of the filters: a search field and the categories as pills in one row that scrolls sideways. */
export function StackFilterChips({ groups, category, onCategoryChange, query, onQueryChange }: StackFiltersProps) {
  const [text] = useTexts(STACK_KEYS)
  const categories = [{ id: ALL_CATEGORIES, label: text.filters.all }, ...groups]

  return (
    <div>
      <SearchField
        className="h-[46px] rounded-md bg-surface-field px-3 [&_input]:text-base [&_svg]:size-[18px]"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder={text.filters.searchPlaceholder}
        aria-label={text.filters.searchLabel}
      />
      <div
        role="group"
        aria-label={text.filters.label}
        className="-mx-5 mt-3.5 flex [scrollbar-width:none] gap-2 overflow-x-auto px-5 pb-1 [&::-webkit-scrollbar]:hidden"
      >
        {categories.map((item) => {
          const active = item.id === category
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={active}
              onClick={() => onCategoryChange(item.id)}
              className={[
                'h-9 flex-none cursor-pointer rounded-full border px-3.5 focus-ring transition-colors duration-140',
                active
                  ? 'border-accent bg-accent-surface text-content-strong'
                  : 'border-line-default bg-transparent text-content-muted',
              ].join(' ')}
            >
              <Text size={FontSize.Small} font={FontFamily.Mono} className="leading-[normal] whitespace-nowrap">
                {item.label}
              </Text>
            </button>
          )
        })}
      </div>
    </div>
  )
}
