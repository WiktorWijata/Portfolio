import type { PanelProps } from './Panel.types'

export function Panel({ interactive = false, raised = false, className = '', children, ...rest }: PanelProps) {
  return (
    <div
      className={[
        'rounded-3xl border border-border-5 bg-card',
        raised ? 'shadow-card-raised' : 'shadow-card',
        'transition-[background-color,border-color] duration-[140ms] ease-out',
        interactive ? 'hover:border-accent-dark hover:bg-hover' : '',
        className,
      ].join(' ')}
      {...rest}
    >
      {children}
    </div>
  )
}
