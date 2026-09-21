import { PanelBar } from '../../internal/PanelBar'
import { FontFamily, FontSize, Text, TextColor } from '../Text'
import { ListItemVariant, type ListItemProps, type ListProps } from './List.types'
import type { InputHTMLAttributes } from 'react'

/**
 * List's own search row: flat, editor background, only a bottom hairline, a "⌕" glyph instead of an SVG
 * icon. Private to `List` — not the public `SearchField` — so it cannot be used or styled
 * inconsistently outside a searchable list.
 */
function ListSearchRow(props: Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>) {
  return (
    <label className="flex items-center gap-[9px] border-b border-b-bar-subtle bg-editor px-3.5 py-[9px]">
      <Text aria-hidden size={FontSize.Medium} color={TextColor.Faint} className="leading-none">
        ⌕
      </Text>
      <input
        type="search"
        className="min-w-0 flex-1 bg-transparent font-sans text-sm text-text outline-none placeholder:text-text-faint"
        {...props}
      />
    </label>
  )
}

/** List container with an optional header bar (label + counter) and an optional search row. */
export function List({ header, count, searchable = false, searchProps, className = '', children, ...rest }: ListProps) {
  return (
    <div className={['bg-list', className].join(' ')} {...rest}>
      {header && <PanelBar title={header} count={count} />}
      {searchable && <ListSearchRow {...searchProps} />}
      <ul className="flex flex-col @max-[700px]:flex-row @max-[700px]:flex-wrap">{children}</ul>
    </div>
  )
}

/**
 * Clickable list row. On hover/active the left accent indicator fades in, the row background lightens,
 * `padding-left` grows 14px → 18px, the title brightens and the subtitle (if any) turns accent-coloured.
 */
export function ListItem({
  variant = ListItemVariant.Detail,
  active = false,
  title,
  subtitle,
  tag,
  trailing,
  className = '',
  ...rest
}: ListItemProps) {
  const isFilter = variant === ListItemVariant.Filter
  return (
    <li
      data-variant={variant}
      className={[
        'group relative border-b border-border-3 last:border-b-0',
        isFilter
          ? '@max-[700px]:border-r @max-[700px]:border-b-0 @max-[700px]:last:border-r'
          : '@max-[700px]:basis-full @max-[700px]:border-r @max-[700px]:border-r-border-2',
      ].join(' ')}
    >
      <span
        aria-hidden
        className={[
          'absolute top-0 bottom-0 left-0 w-0.5 bg-accent',
          'transition-opacity duration-150 ease-out',
          active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
          isFilter ? '@max-[700px]:hidden' : '',
        ].join(' ')}
      />
      <button
        type="button"
        className={[
          'w-full text-left',
          isFilter
            ? 'block px-3.5 py-2.5 @max-[700px]:px-[13px] @max-[700px]:py-[9px]'
            : 'grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-[11px] pr-3.5 pl-3.5',
          'transition-[background-color,padding-left,box-shadow] duration-150 ease-out',
          active ? 'bg-hover pl-[18px]' : 'hover:bg-hover hover:pl-[18px]',
          isFilter
            ? '@max-[700px]:pl-[13px] @max-[700px]:hover:pl-[13px] @max-[700px]:hover:shadow-[inset_0_2px_#c77dbb]'
            : '',
          active ? '@max-[700px]:shadow-[inset_0_2px_#c77dbb]' : '',
          className,
        ].join(' ')}
        {...rest}
      >
        {isFilter ? (
          <Text
            size={FontSize.Small}
            font={FontFamily.Mono}
            className={[
              'block leading-[normal] transition-colors duration-150 ease-out',
              active ? 'text-text' : 'text-[#8f939b] group-hover:text-text',
            ].join(' ')}
          >
            {title}
          </Text>
        ) : (
          <>
            <span className="flex min-w-0 flex-col">
              <Text
                size={FontSize.Medium}
                font={FontFamily.Sans}
                className={[
                  'truncate leading-[normal] transition-colors duration-150 ease-out',
                  active ? 'text-text' : 'text-text-item group-hover:text-text',
                ].join(' ')}
              >
                {title}
              </Text>
              {subtitle && (
                <Text
                  size={FontSize.XSmall}
                  font={FontFamily.Mono}
                  className={[
                    'truncate leading-[normal] transition-colors duration-150 ease-out',
                    active ? 'text-accent' : 'text-text-label',
                  ].join(' ')}
                >
                  {subtitle}
                </Text>
              )}
            </span>
            {tag && (
              <Text
                font={FontFamily.Mono}
                className={[
                  'rounded-sm border px-2 py-[2.5px] text-[10.5px] leading-[1.5] whitespace-nowrap transition-colors duration-150 ease-out',
                  active
                    ? 'border-accent bg-cta-hover text-accent-light'
                    : 'border-chip-line bg-hover text-text-tag group-hover:border-accent group-hover:bg-cta-hover group-hover:text-accent-light',
                ].join(' ')}
              >
                {tag}
              </Text>
            )}
            {trailing && <span className="shrink-0">{trailing}</span>}
          </>
        )}
      </button>
    </li>
  )
}
