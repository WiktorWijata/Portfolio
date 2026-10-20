import { PanelBar } from '../../internal/PanelBar'
import { FontFamily, FontSize, FontWeight, Text } from '../Text'
import { CardVariant, type CardProps } from './Card.types'

const surfaceClasses: Record<CardVariant, string> = {
  [CardVariant.Compact]: 'rounded-xl border border-line-subtle bg-surface-panel/80 shadow-panel',
  [CardVariant.Standard]: 'rounded-2xl border border-line-emphasis bg-surface-card',
  [CardVariant.Hero]: 'rounded-2xl border border-line-emphasis bg-hero-card shadow-hero',
}

/** Light header of the larger variants: an optional icon and the title, separated from the body by a line. */
const headerClasses: Record<Exclude<CardVariant, typeof CardVariant.Compact>, string> = {
  [CardVariant.Standard]: 'border-b-line-default px-4',
  [CardVariant.Hero]: 'border-b-tint/5 px-5',
}

/**
 * Bordered card with an optional header. `Compact` has a header bar (title, counter, action) for data;
 * `Standard` and `Hero` are larger and have a light title (with an optional icon) only. The body is up to the caller.
 */
export function Card({
  variant = CardVariant.Compact,
  title,
  icon,
  count,
  action,
  className = '',
  children,
  ...rest
}: CardProps) {
  return (
    <section className={['overflow-hidden', surfaceClasses[variant], className].join(' ')} {...rest}>
      {title !== undefined &&
        (variant === CardVariant.Compact ? (
          <PanelBar title={title} count={count} action={action} />
        ) : (
          <div className={['flex items-center gap-2.5 border-b py-3', headerClasses[variant]].join(' ')}>
            {icon && (
              <span aria-hidden className="grid shrink-0 place-items-center text-accent [&_svg]:size-[15px]">
                {icon}
              </span>
            )}
            <Text
              size={FontSize.XSmall}
              font={FontFamily.Mono}
              weight={FontWeight.Medium}
              className="leading-[normal] tracking-[.07em] text-content-secondary"
            >
              {title}
            </Text>
          </div>
        ))}
      {children}
    </section>
  )
}
