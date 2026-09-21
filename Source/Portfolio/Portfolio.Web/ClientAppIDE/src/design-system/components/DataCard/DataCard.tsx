import { PanelBar } from '../../internal/PanelBar'
import { FontFamily, FontSize, FontWeight, Text } from '../Text'
import type { DataCardActionProps, DataCardListProps, DataCardProps, DataCardRowProps } from './DataCard.types'

/**
 * Bordered card with a header bar (title, optional counter and action). Its body is up to the caller.
 */
export function DataCard({ title, count, action, className = '', children, ...rest }: DataCardProps) {
  return (
    <section
      className={['overflow-hidden rounded-xl border border-border-2 bg-list/80 shadow-panel', className].join(' ')}
      {...rest}
    >
      <PanelBar title={title} count={count} action={action} />
      {children}
    </section>
  )
}

/** Text button on the right of the header bar ("Otwórz →"). */
export function DataCardAction({ className = '', children, ...rest }: DataCardActionProps) {
  return (
    <button
      type="button"
      className={[
        'inline-flex cursor-pointer items-center border-0 bg-transparent p-0 text-text-tag transition-colors duration-150 ease-out hover:text-accent-light',
        'outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
        className,
      ].join(' ')}
      {...rest}
    >
      <Text
        size={FontSize.Micro}
        font={FontFamily.Mono}
        weight={FontWeight.SemiBold}
        className="leading-[normal] tracking-[.09em]"
      >
        {children}
      </Text>
    </button>
  )
}

export function DataCardList({ className = '', children, ...rest }: DataCardListProps) {
  return (
    <ul className={['m-0 list-none p-0', className].join(' ')} {...rest}>
      {children}
    </ul>
  )
}

/** Static row of a `DataCardList`: title (+ subtitle) on the left, an optional tag on the right. */
export function DataCardRow({ title, subtitle, tag, className = '', ...rest }: DataCardRowProps) {
  return (
    <li
      className={[
        'flex items-center justify-between gap-3.5 border-t border-border-3 px-3.5 py-[11px] first:border-t-0',
        className,
      ].join(' ')}
      {...rest}
    >
      <span className="min-w-0">
        <Text size={FontSize.Medium} font={FontFamily.Sans} className="block leading-[normal] text-text-item">
          {title}
        </Text>
        {subtitle && (
          <Text size={FontSize.XSmall} font={FontFamily.Sans} className="mt-0.5 block leading-[normal] text-text-dim-2">
            {subtitle}
          </Text>
        )}
      </span>
      {tag && (
        <Text
          as="span"
          font={FontFamily.Mono}
          className="shrink-0 rounded-sm border border-chip-line bg-hover px-2 py-[2.5px] text-[10.5px] leading-[normal] whitespace-nowrap text-text-tag"
        >
          {tag}
        </Text>
      )}
    </li>
  )
}
