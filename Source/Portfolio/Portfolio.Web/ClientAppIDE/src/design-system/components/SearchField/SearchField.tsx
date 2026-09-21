import { Search } from 'lucide-react'
import type { SearchFieldProps } from './SearchField.types'

/**
 * General-purpose search field: bordered, with a Lucide `Search` icon. `List` has its own flat,
 * borderless search row (`searchable`); that one is a private detail of `List`.
 */
export function SearchField({ className = '', ...rest }: SearchFieldProps) {
  return (
    <label
      className={['flex items-center gap-[7px] rounded-sm border border-border bg-field px-[7px] py-1', className].join(
        ' ',
      )}
    >
      <Search className="size-4 shrink-0 text-text-dim" />
      <input
        type="search"
        className="min-w-0 flex-1 bg-transparent font-sans text-xs text-[#dddde5] outline-none placeholder:text-text-dim"
        {...rest}
      />
    </label>
  )
}
