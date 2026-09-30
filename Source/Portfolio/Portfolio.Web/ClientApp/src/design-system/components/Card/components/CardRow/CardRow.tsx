import { FontFamily, FontSize, Text } from '../../../Text'
import type { CardRowProps } from './CardRow.types'

/** Static row of a `CardList`: title (+ subtitle) on the left, an optional tag on the right. */
export function CardRow({ title, subtitle, tag, className = '', ...rest }: CardRowProps) {
  return (
    <li
      className={[
        'flex items-center justify-between gap-3.5 border-t border-line-faint px-3.5 py-[11px] first:border-t-0',
        className,
      ].join(' ')}
      {...rest}
    >
      <span className="min-w-0">
        <Text size={FontSize.Medium} font={FontFamily.Sans} className="block leading-[normal] text-content-secondary">
          {title}
        </Text>
        {subtitle && (
          <Text
            size={FontSize.XSmall}
            font={FontFamily.Sans}
            className="mt-0.5 block leading-[normal] text-content-dim"
          >
            {subtitle}
          </Text>
        )}
      </span>
      {tag && (
        <Text
          as="span"
          font={FontFamily.Mono}
          className="shrink-0 rounded-sm border border-line-default bg-surface-hover px-2 py-[2.5px] text-[10.5px] leading-[normal] whitespace-nowrap text-content-tertiary"
        >
          {tag}
        </Text>
      )}
    </li>
  )
}
