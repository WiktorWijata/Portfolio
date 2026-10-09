import { RailButtonAccent, RailButtonIconSize } from './RailButton.types'

// Literal class strings — Tailwind can't scan dynamically built class names.
export const activeClasses: Record<RailButtonAccent, string> = {
  [RailButtonAccent.Accent]: 'bg-surface-active text-accent shadow-[inset_2px_0_0_0_var(--color-accent)]',
  [RailButtonAccent.Explorer]:
    'bg-surface-active text-warning-content-soft shadow-[inset_2px_0_0_0_var(--color-warning-content-soft)]',
  [RailButtonAccent.Success]:
    'bg-success-surface text-success-content shadow-[inset_2px_0_0_0_var(--color-success-content)]',
  [RailButtonAccent.Assistant]:
    'bg-warning-surface text-warning-content shadow-[inset_2px_0_0_0_var(--color-warning-content)]',
}

export const iconSizeClasses: Record<RailButtonIconSize, string> = {
  [RailButtonIconSize.Md]: '[&_svg]:size-4',
  [RailButtonIconSize.Lg]: '[&_svg]:size-[17px]',
  [RailButtonIconSize.Xl]: '[&_svg]:size-[18px]',
}
