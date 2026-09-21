import type { ButtonHTMLAttributes } from 'react'
import { Text } from '../Text'
import { LinkTone, type LinkProps } from './Link.types'

const toneClasses: Record<LinkTone, string> = {
  [LinkTone.Accent]: 'text-link hover:text-link-hover',
  [LinkTone.Info]: 'text-link-info hover:text-link-info-hover hover:underline',
}

/**
 * Accent-coloured text link. With `href` it is an `<a>`; without it, a `<button>` for in-app actions
 * ("Zobacz w portfolio →", "Przejdź do kontaktu ↗"). Font family, size and line height are inherited
 * unless overridden, so it reads as part of the surrounding text.
 */
export function Link({
  tone = LinkTone.Accent,
  underline = false,
  size,
  weight,
  className = '',
  children,
  ...rest
}: LinkProps) {
  const classes = [
    'inline-flex cursor-pointer items-center border-0 bg-transparent p-0 no-underline',
    toneClasses[tone],
    'transition-colors duration-150 ease-out',
    'outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
    underline ? 'border-b border-b-accent-dark hover:border-b-link-hover' : '',
    className,
  ].join(' ')
  const label = (
    <Text size={size} weight={weight}>
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
    <button type="button" className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {label}
    </button>
  )
}
