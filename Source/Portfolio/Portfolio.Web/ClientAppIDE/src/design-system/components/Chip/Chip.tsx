import { Text } from '../Text'
import { ChipVariant, type ChipProps } from './Chip.types'

// Literal class strings — Tailwind can't scan dynamically built class names.
const variantClasses: Record<ChipVariant, string> = {
  [ChipVariant.Default]:
    'gap-2 rounded-xs py-1.5 pr-[13px] pl-2.5 bg-hover border-border font-mono text-[12.5px] leading-[normal] text-text-body',
  [ChipVariant.Mono]:
    'rounded-sm px-[11px] py-[5px] bg-hover border-border font-mono text-[11.5px] leading-[normal] text-text-body',
  [ChipVariant.Compact]:
    'rounded-sm px-2 py-[3px] bg-hover border-border font-mono text-[10.5px] leading-[normal] text-text-tag',
  [ChipVariant.Position]:
    'rounded-xs px-2.5 py-1 bg-hover border-border font-mono text-[11.5px] leading-[normal] text-text-body',
  [ChipVariant.Tech]:
    'rounded-sm px-[9px] py-[5px] bg-hover border-chip-line font-mono text-[11px] leading-[normal] text-text-body',
}

/** Static tag, e.g. a technology or a position; `variant` picks the size and the look. */
export function Chip({ variant = ChipVariant.Default, icon, className = '', children, ...rest }: ChipProps) {
  return (
    <Text {...rest} className={['inline-flex items-center border', variantClasses[variant], className].join(' ')}>
      {variant === ChipVariant.Default && icon && (
        <span className="inline-flex shrink-0 [&_img]:size-[15px] [&_svg]:size-[15px]">{icon}</span>
      )}
      {children}
    </Text>
  )
}
