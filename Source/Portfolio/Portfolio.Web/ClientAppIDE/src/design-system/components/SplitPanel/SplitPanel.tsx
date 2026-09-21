import { SplitPanelCollapseAt, type SplitPanelProps } from './SplitPanel.types'

// Literal, statically-scannable class strings — Tailwind v4 can't pick up dynamically
// interpolated arbitrary-value classes, so each collapse breakpoint needs its own branch.
const collapseClasses: Record<SplitPanelCollapseAt, string> = {
  [SplitPanelCollapseAt.Bp700]:
    'max-bp700:grid-cols-1 max-bp700:[&>:first-child]:border-r-0 max-bp700:[&>:first-child]:border-b',
  [SplitPanelCollapseAt.Bp820]:
    'max-[820px]:grid-cols-1 max-[820px]:[&>:first-child]:border-r-0 max-[820px]:[&>:first-child]:border-b',
  [SplitPanelCollapseAt.Container700]:
    '@max-[700px]:grid-cols-1 @max-[700px]:[&>:first-child]:border-r-0 @max-[700px]:[&>:first-child]:border-b',
}

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
        'overflow-hidden rounded-md border border-border',
        '[&>:first-child]:border-r [&>:first-child]:border-border',
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
