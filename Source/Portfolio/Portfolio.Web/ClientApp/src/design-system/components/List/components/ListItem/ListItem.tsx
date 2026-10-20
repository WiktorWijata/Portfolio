import { FontFamily, FontSize, Text } from '../../../Text'
import { ListItemVariant } from '../../List.types'
import type { ListItemProps } from './ListItem.types'

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
        'group relative border-b border-line-faint last:border-b-0',
        isFilter
          ? '@max-[700px]:border-r @max-[700px]:border-b-0 @max-[700px]:last:border-r'
          : '@max-[700px]:basis-full @max-[700px]:border-r @max-[700px]:border-r-line-subtle',
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
          active ? 'bg-surface-hover pl-[18px]' : 'hover:bg-surface-hover hover:pl-[18px]',
          isFilter
            ? '@max-[700px]:pl-[13px] @max-[700px]:hover:pl-[13px] @max-[700px]:hover:shadow-[inset_0_2px_var(--color-accent)]'
            : '',
          active ? '@max-[700px]:shadow-[inset_0_2px_var(--color-accent)]' : '',
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
              active ? 'text-content-strong' : 'text-content-muted group-hover:text-content-strong',
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
                  active ? 'text-content-strong' : 'text-content-secondary group-hover:text-content-strong',
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
                    active ? 'text-accent' : 'text-content-subtle',
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
                    ? 'border-accent bg-accent-surface text-accent-light'
                    : 'border-line-default bg-surface-hover text-content-tertiary group-hover:border-accent group-hover:bg-accent-surface group-hover:text-accent-light',
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
