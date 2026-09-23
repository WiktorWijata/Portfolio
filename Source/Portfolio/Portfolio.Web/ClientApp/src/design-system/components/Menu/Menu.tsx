import { FontFamily, FontSize, FontWeight, Text } from '../Text'
import type { MenuProps } from './Menu.types'

/**
 * Grouped index/TOC menu: a bordered card with a header bar, flat top-level items and collapsible
 * `<details>` groups of nested items.
 * Give it a `max-h-*` class and the item list scrolls inside the card, header pinned.
 */
export function Menu({ header, className = '', children, ...rest }: MenuProps) {
  return (
    <nav
      className={[
        'flex flex-col overflow-hidden rounded-xl-plus border border-line-emphasis bg-surface-card',
        'shadow-menu',
        className,
      ].join(' ')}
      {...rest}
    >
      <Text
        as="div"
        size={FontSize.XXSmall}
        font={FontFamily.Mono}
        weight={FontWeight.Medium}
        className="shrink-0 border-b border-line-default bg-surface-hover px-3.5 py-3 tracking-[.09em] text-content-muted uppercase"
      >
        {header}
      </Text>
      <div className="min-h-0 flex-1 scrollbar-subtle overflow-y-auto">{children}</div>
    </nav>
  )
}
