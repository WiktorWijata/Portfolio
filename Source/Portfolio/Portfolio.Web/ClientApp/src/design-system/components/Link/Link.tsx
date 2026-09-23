import { Text } from '../Text'
import { toneClasses } from './Link.consts'
import { LinkTone, type LinkProps } from './Link.types'

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
    'focus-ring',
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
    <button type="button" className={classes} {...rest}>
      {label}
    </button>
  )
}
