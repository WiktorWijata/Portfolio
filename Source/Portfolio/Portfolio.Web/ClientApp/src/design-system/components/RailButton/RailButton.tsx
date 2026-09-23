import { INTERACTIVE_BASE_CLASSES } from '../../internal/interactiveBase'
import { FontFamily, FontSize, FontWeight, Text } from '../Text'
import { activeClasses, iconSizeClasses } from './RailButton.consts'
import { RailButtonAccent, RailButtonIconSize, type RailButtonProps } from './RailButton.types'

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
        'focus-ring-tight',
        'transition-colors duration-150 ease-out',
        INTERACTIVE_BASE_CLASSES,
        active ? activeClasses[accent] : 'text-content-subtle hover:bg-surface-hover-strong hover:text-content-body',
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
