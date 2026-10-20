import type { PanelProps } from './Panel.types'

/**
 * `interactive`/`raised` own the surface: background, border, radius and shadow; `className` is for layout
 * (padding, width, overflow, flex/grid) — a class that overrides the surface itself (`rounded-*`, `bg-*`,
 * `shadow-*`) may or may not win over the variant classes, depending on Tailwind's output order, not on
 * where it sits in `className`.
 */
export function Panel({ interactive = false, raised = false, className = '', children, ...rest }: PanelProps) {
  return (
    <div
      className={[
        'rounded-3xl border border-line-emphasis bg-surface-card',
        raised ? 'shadow-card-raised' : 'shadow-card',
        'transition-[background-color,border-color] duration-140 ease-out',
        interactive ? 'hover:border-accent-dark hover:bg-surface-hover' : '',
        className,
      ].join(' ')}
      {...rest}
    >
      {children}
    </div>
  )
}
