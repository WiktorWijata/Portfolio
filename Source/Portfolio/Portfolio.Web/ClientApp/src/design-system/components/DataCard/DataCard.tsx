import { PanelBar } from '../../internal/PanelBar'
import type { DataCardProps } from './DataCard.types'

/**
 * Bordered card with a header bar (title, optional counter and action). Its body is up to the caller.
 */
export function DataCard({ title, count, action, className = '', children, ...rest }: DataCardProps) {
  return (
    <section
      className={[
        'overflow-hidden rounded-xl border border-line-subtle bg-surface-panel/80 shadow-panel',
        className,
      ].join(' ')}
      {...rest}
    >
      <PanelBar title={title} count={count} action={action} />
      {children}
    </section>
  )
}
