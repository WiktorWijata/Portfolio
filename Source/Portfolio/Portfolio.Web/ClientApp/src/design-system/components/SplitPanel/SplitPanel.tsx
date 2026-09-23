import { collapseClasses } from './SplitPanel.consts'
import { SplitPanelCollapseAt, type SplitPanelProps } from './SplitPanel.types'

/**
 * Master-detail shell: grid `320px minmax(0,1fr)`, 1px border, 5px radius, overflow hidden. Collapses
 * to a single column (aside on top) below the breakpoint given in `collapseAt`.
 */
export function SplitPanel({
  aside,
  children,
  collapseAt = SplitPanelCollapseAt.Bp700,
  className = '',
  ...rest
}: SplitPanelProps) {
  return (
    <div
      className={[
        'grid grid-cols-[320px_minmax(0,1fr)]',
        'overflow-hidden rounded-md border border-line-default',
        '[&>:first-child]:border-r [&>:first-child]:border-line-default',
        collapseClasses[collapseAt],
        className,
      ].join(' ')}
      {...rest}
    >
      {aside}
      {children}
    </div>
  )
}
