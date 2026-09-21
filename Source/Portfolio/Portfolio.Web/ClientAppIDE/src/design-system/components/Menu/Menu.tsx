import { FontFamily, FontSize, FontWeight, Text } from '../Text'
import type { MenuProps, MenuItemProps, MenuGroupProps } from './Menu.types'

/**
 * Grouped index/TOC menu: a bordered card with a header bar, flat top-level items and collapsible
 * `<details>` groups of nested items.
 * Give it a `max-h-*` class and the item list scrolls inside the card, header pinned.
 */
export function Menu({ header, className = '', children, ...rest }: MenuProps) {
  return (
    <nav
      className={[
        'flex flex-col overflow-hidden rounded-[9px] border border-border-5 bg-card',
        'shadow-[0_8px_26px_rgba(0,0,0,.2),inset_0_1px_0_rgba(255,255,255,.035)]',
        className,
      ].join(' ')}
      {...rest}
    >
      <Text
        as="div"
        size={FontSize.XXSmall}
        font={FontFamily.Mono}
        weight={FontWeight.Medium}
        className="shrink-0 border-b border-chip-line bg-hover px-3.5 py-3 tracking-[.09em] text-[#92909d] uppercase"
      >
        {header}
      </Text>
      <div className="min-h-0 flex-1 scrollbar-subtle overflow-y-auto">{children}</div>
    </nav>
  )
}

export function MenuItem({ active = false, nested = false, className = '', children, ...rest }: MenuItemProps) {
  return (
    <button
      type="button"
      className={[
        'block w-full border-l-[3px] py-[9px] pr-3 text-left',
        'transition-[background-color,color,border-color] duration-150 ease-out',
        nested ? 'pl-[29px]' : 'mt-[7px] mb-[3px] pl-3',
        active
          ? 'border-l-accent bg-[#39313c] text-[#ebdce8]'
          : [
              'border-l-transparent hover:bg-[#343139] hover:text-[#e4dbe8]',
              nested ? 'text-[#aaa8b4]' : 'text-text-muted',
            ].join(' '),
        className,
      ].join(' ')}
      {...rest}
    >
      <Text size={FontSize.Small} font={FontFamily.Sans} className="block">
        {children}
      </Text>
    </button>
  )
}

export function MenuGroup({ label, defaultOpen = true, className = '', children, ...rest }: MenuGroupProps) {
  return (
    <details open={defaultOpen} className={['mt-[5px] border-t border-border pt-[3px]', className].join(' ')} {...rest}>
      <Text
        as="summary"
        size={FontSize.Small}
        font={FontFamily.Sans}
        weight={FontWeight.Medium}
        className="cursor-pointer px-3.5 py-2.5 text-[#d0ccd7]"
      >
        {label}
      </Text>
      {children}
    </details>
  )
}
