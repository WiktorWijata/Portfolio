import { FontFamily, FontSize, FontWeight, Text } from '../Text'
import { RailButtonAccent, RailButtonIconSize, type RailButtonProps } from './RailButton.types'

// Literal class strings — Tailwind can't scan dynamically built class names.
const activeClasses: Record<RailButtonAccent, string> = {
  [RailButtonAccent.Accent]: 'bg-active text-accent shadow-[inset_2px_0_0_0_var(--color-accent)]',
  [RailButtonAccent.Explorer]: 'bg-active text-explorer-active shadow-[inset_2px_0_0_0_var(--color-explorer-active)]',
  [RailButtonAccent.Success]:
    'bg-rail-success text-status-success shadow-[inset_2px_0_0_0_var(--color-status-success)]',
  [RailButtonAccent.Assistant]: 'bg-rail-assistant text-assistant shadow-[inset_2px_0_0_0_var(--color-assistant)]',
}

const iconSizeClasses: Record<RailButtonIconSize, string> = {
  [RailButtonIconSize.Md]: '[&_svg]:size-4',
  [RailButtonIconSize.Lg]: '[&_svg]:size-[17px]',
  [RailButtonIconSize.Xl]: '[&_svg]:size-[18px]',
}

export function RailButton({
  icon,
  iconSize = RailButtonIconSize.Md,
  label,
  active = false,
  accent = RailButtonAccent.Accent,
  className = '',
  ...rest
}: RailButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={[
        'inline-flex w-8 flex-col items-center gap-[7px] rounded-sm px-0 py-[7px]',
        'outline-none focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-accent',
        'transition-colors duration-150 ease-out',
        active ? activeClasses[accent] : 'text-text-label hover:bg-hover-2 hover:text-text-body',
        iconSizeClasses[iconSize],
        className,
      ].join(' ')}
      {...rest}
    >
      {icon}
      <Text
        aria-hidden
        size={FontSize.Nano}
        font={FontFamily.Mono}
        weight={FontWeight.SemiBold}
        className="tracking-[.09em] [writing-mode:vertical-rl]"
      >
        {label}
      </Text>
    </button>
  )
}
