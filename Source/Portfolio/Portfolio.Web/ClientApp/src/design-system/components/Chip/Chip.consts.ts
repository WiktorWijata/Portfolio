import { ChipVariant } from './Chip.types'

// Literal class strings — Tailwind can't scan dynamically built class names.
export const variantClasses: Record<ChipVariant, string> = {
  [ChipVariant.Default]:
    'gap-2 rounded-xs py-1.5 pr-[13px] pl-2.5 bg-surface-hover border-line-default font-mono text-[12.5px] leading-[normal] text-content-body',
  [ChipVariant.Mono]:
    'rounded-sm px-[11px] py-[5px] bg-surface-hover border-line-default font-mono text-[11.5px] leading-[normal] text-content-body',
  [ChipVariant.Compact]:
    'rounded-sm px-2 py-[3px] bg-surface-hover border-line-default font-mono text-[10.5px] leading-[normal] text-content-tertiary',
  [ChipVariant.Position]:
    'rounded-xs px-2.5 py-1 bg-surface-hover border-line-default font-mono text-[11.5px] leading-[normal] text-content-body',
  [ChipVariant.Tech]:
    'rounded-sm px-[9px] py-[5px] bg-surface-hover border-line-default font-mono text-[11px] leading-[normal] text-content-body',
}
