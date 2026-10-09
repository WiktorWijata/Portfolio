import { SplitPanelCollapseAt } from './SplitPanel.types'

// Literal, statically-scannable class strings — Tailwind v4 can't pick up dynamically
// interpolated arbitrary-value classes, so each collapse breakpoint needs its own branch.
export const collapseClasses: Record<SplitPanelCollapseAt, string> = {
  [SplitPanelCollapseAt.Bp700]:
    'max-bp700:grid-cols-1 max-bp700:[&>:first-child]:border-r-0 max-bp700:[&>:first-child]:border-b',
  [SplitPanelCollapseAt.Bp820]:
    'max-[820px]:grid-cols-1 max-[820px]:[&>:first-child]:border-r-0 max-[820px]:[&>:first-child]:border-b',
  [SplitPanelCollapseAt.Container700]:
    '@max-[700px]:grid-cols-1 @max-[700px]:[&>:first-child]:border-r-0 @max-[700px]:[&>:first-child]:border-b',
}
