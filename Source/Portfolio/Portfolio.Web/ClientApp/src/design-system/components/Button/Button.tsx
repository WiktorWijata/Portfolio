import { INTERACTIVE_BASE_CLASSES } from '../../internal/interactiveBase'
import { FontFamily, FontSize, FontWeight, Text } from '../Text'
import { sizeClasses, variantClasses } from './Button.consts'
import { ButtonSize, ButtonVariant, type ButtonProps } from './Button.types'

/**
 * A button — or, with `href`, a link that looks like one. Page buttons: 44 px high, mono 12 px.
 *
 * `variant`/`size` own background, border, text colour and padding; `className` is for layout only
 * (position, margin, width) — a class that fights one of those two loses or wins by accident, depending
 * on Tailwind's internal ordering, not on where it sits in `className`.
 */
export function Button({
  variant = ButtonVariant.Primary,
  size = ButtonSize.Md,
  className = '',
  children,
  ...rest
}: ButtonProps) {
  const isMono = size === ButtonSize.Md || size === ButtonSize.Xs || size === ButtonSize.Card
  const isLg = size === ButtonSize.Lg
  const classes = [
    'inline-flex items-center justify-center gap-2 no-underline',
    sizeClasses[size].box,
    'transition-[background-color,color,border-color] duration-140 ease-out',
    'focus-ring',
    INTERACTIVE_BASE_CLASSES,
    variantClasses[variant],
    variant === ButtonVariant.Outline ? sizeClasses[size].outlineText : '',
    className,
  ].join(' ')
  const label = (
    <Text
      size={isLg ? FontSize.Medium : FontSize.Small}
      font={isMono ? FontFamily.Mono : FontFamily.Sans}
      weight={
        (size === ButtonSize.Md || size === ButtonSize.Card || isLg) && variant === ButtonVariant.Primary
          ? FontWeight.Medium
          : undefined
      }
      className={size === ButtonSize.Xs || isLg ? 'leading-[normal]' : undefined}
    >
      {children}
    </Text>
  )

  if (rest.href !== undefined) {
    return (
      <a className={classes} {...rest}>
        {label}
      </a>
    )
  }
  return (
    <button type="button" className={classes} {...rest}>
      {label}
    </button>
  )
}
