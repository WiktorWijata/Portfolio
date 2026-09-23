import { PanelBar } from '../../internal/PanelBar'
import type { InfoCardProps } from './InfoCard.types'

/**
 * Read-only label/value card. Same surface as `List` but non-interactive.
 */
export function InfoCard({ header, className = '', children, ...rest }: InfoCardProps) {
  return (
    <aside
      className={[
        'overflow-hidden rounded-xl border border-line-subtle bg-surface-panel',
        'shadow-panel',
        className,
      ].join(' ')}
      {...rest}
    >
      <PanelBar title={header} />
      <dl className="m-0">{children}</dl>
    </aside>
  )
}
