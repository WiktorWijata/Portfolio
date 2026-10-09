import { FontSize, Text, TextColor } from '../../../Text'
import type { ListSearchRowProps } from './ListSearchRow.types'

/**
 * List's own search row: flat, editor background, only a bottom hairline, a "⌕" glyph instead of an SVG
 * icon. Private to `List` — not the public `SearchField` — so it cannot be used or styled
 * inconsistently outside a searchable list.
 */
export function ListSearchRow(props: ListSearchRowProps) {
  return (
    <label className="flex items-center gap-[9px] border-b border-b-line-faint bg-surface-editor px-3.5 py-[9px]">
      <Text aria-hidden size={FontSize.Medium} color={TextColor.Faint} className="leading-none">
        ⌕
      </Text>
      <input
        type="search"
        className="min-w-0 flex-1 bg-transparent font-sans text-sm text-content-strong outline-none placeholder:text-content-faint"
        {...props}
      />
    </label>
  )
}
