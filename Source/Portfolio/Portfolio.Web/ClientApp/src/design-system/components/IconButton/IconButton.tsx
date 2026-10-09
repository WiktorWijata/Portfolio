import { INTERACTIVE_BASE_CLASSES } from '../../internal/interactiveBase'
import { sizeClasses } from './IconButton.consts'
import { IconButtonSize, type IconButtonProps } from './IconButton.types'

/** Przycisk z samą ikoną i obramowaniem — sterowanie w obrębie karty (np. strzałki karuzeli Gallery). */
export function IconButton({ icon, size = IconButtonSize.Md, className = '', ...rest }: IconButtonProps) {
  return (
    <button
      type="button"
      className={[
        'flex items-center justify-center rounded-md border border-line-emphasis p-0',
        sizeClasses[size],
        'text-content-tinted-strong hover:border-accent hover:bg-accent-surface-hover',
        'focus-ring',
        'transition-colors duration-150 ease-out',
        INTERACTIVE_BASE_CLASSES,
        className,
      ].join(' ')}
      {...rest}
    >
      {icon}
    </button>
  )
}
