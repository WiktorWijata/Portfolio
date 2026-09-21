import type { ButtonHTMLAttributes } from 'react'
import { FontFamily, FontSize, FontWeight, Text } from '../Text'
import { ButtonSize, ButtonVariant, type ButtonProps } from './Button.types'

const variantClasses: Record<ButtonVariant, string> = {
  [ButtonVariant.Primary]: 'bg-accent text-on-accent hover:bg-accent-hover border border-transparent',
  [ButtonVariant.Outline]: 'bg-transparent border border-border-5 hover:bg-cta-hover hover:border-accent-dark',
  [ButtonVariant.Secondary]:
    'bg-hover text-text-body border border-chip-line hover:bg-cta-hover hover:border-accent hover:text-accent-light',
}

// The label colour of Outline depends on the size: page buttons use the primary text colour,
// the compact ones (cards, overlays) the body colour.
const sizeClasses: Record<ButtonSize, { box: string; outlineText: string }> = {
  [ButtonSize.Md]: { box: 'min-h-11 px-3.5 rounded-sm', outlineText: 'text-text' },
  [ButtonSize.Sm]: { box: 'px-3 py-2 rounded-md', outlineText: 'text-text-body' },
  [ButtonSize.Card]: { box: 'min-h-10 px-3.5 rounded-md', outlineText: 'text-text' },
  [ButtonSize.Xs]: { box: 'px-3 py-[7px] rounded-sm', outlineText: 'text-text-body' },
  [ButtonSize.Lg]: { box: 'px-[18px] py-3 rounded-md', outlineText: 'text-text' },
}

/** A button — or, with `href`, a link that looks like one. Page buttons: 44 px high, mono 12 px. */
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
    'inline-flex items-center justify-center gap-2 cursor-pointer no-underline',
    sizeClasses[size].box,
    'transition-[background-color,color,border-color] duration-[140ms] ease-out',
    'outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
    'disabled:opacity-50 disabled:cursor-not-allowed',
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
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {label}
    </button>
  )
}
