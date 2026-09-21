import { IconButtonSize, type IconButtonProps } from './IconButton.types'

const sizeClasses: Record<IconButtonSize, string> = {
  [IconButtonSize.Md]: 'size-8',
  [IconButtonSize.Sm]: 'p-[3px]',
}

export function IconButton({
  icon,
  active = false,
  size = IconButtonSize.Md,
  className = '',
  ...rest
}: IconButtonProps) {
  return (
    <button
      type="button"
      className={[
        'inline-flex items-center justify-center rounded-sm',
        sizeClasses[size],
        'text-text-dim-2 hover:bg-hover hover:text-text',
        'outline-none focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-accent',
        'transition-[background-color,color] duration-[140ms] ease-out',
        active ? 'bg-active text-text' : '',
        '[&_svg]:size-4',
        className,
      ].join(' ')}
      {...rest}
    >
      {icon}
    </button>
  )
}
