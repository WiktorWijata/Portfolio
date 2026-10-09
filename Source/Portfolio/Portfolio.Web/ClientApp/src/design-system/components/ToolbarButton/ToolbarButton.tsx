import { INTERACTIVE_BASE_CLASSES } from '../../internal/interactiveBase'
import { sizeClasses } from './ToolbarButton.consts'
import { ToolbarButtonSize, type ToolbarButtonProps } from './ToolbarButton.types'

export function ToolbarButton({
  icon,
  active = false,
  size = ToolbarButtonSize.Md,
  className = '',
  ...rest
}: ToolbarButtonProps) {
  return (
    <button
      type="button"
      className={[
        'inline-flex items-center justify-center rounded-sm',
        sizeClasses[size],
        'text-content-dim hover:bg-surface-hover hover:text-content-strong',
        'focus-ring-tight',
        'transition-[background-color,color] duration-140 ease-out',
        INTERACTIVE_BASE_CLASSES,
        active ? 'bg-surface-active text-content-strong' : '',
        '[&_svg]:size-4',
        className,
      ].join(' ')}
      {...rest}
    >
      {icon}
    </button>
  )
}
