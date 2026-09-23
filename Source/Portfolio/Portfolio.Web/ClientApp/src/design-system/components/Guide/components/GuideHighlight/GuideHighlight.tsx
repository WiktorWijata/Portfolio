import type { GuideHighlightProps } from './GuideHighlight.types'

export function GuideHighlight({ rect, className = '' }: GuideHighlightProps) {
  return (
    <div
      aria-hidden
      style={{ top: rect.top, left: rect.left, width: rect.width, height: rect.height }}
      className={[
        'pointer-events-none fixed z-[9991]',
        'rounded-lg border border-link bg-accent/[.04] shadow-glow-accent',
        className,
      ].join(' ')}
    />
  )
}
