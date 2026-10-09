import { FontFamily, FontSize, Text } from '../../../Text'
import { accentClasses, buttonBase } from '../../StatusBar.consts'
import { StatusBarAccent } from '../../StatusBar.types'
import type { StatusBarButtonProps } from './StatusBarButton.types'

export function StatusBarButton({
  icon,
  expanded,
  accent = StatusBarAccent.Success,
  className = '',
  children,
  ...rest
}: StatusBarButtonProps) {
  const classes = [
    'inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap no-underline hover:bg-tint/[.035]',
    buttonBase,
    expanded ? accentClasses[accent] : 'text-content-secondary',
    '[&_svg]:size-[13px]',
    className,
  ].join(' ')
  const content = (
    <>
      {icon}
      <Text size={FontSize.XXSmall} font={FontFamily.Mono}>
        {children}
      </Text>
    </>
  )

  if (rest.href !== undefined) {
    return (
      <a className={classes} {...rest}>
        {content}
      </a>
    )
  }
  return (
    <button type="button" aria-expanded={expanded} className={classes} {...rest}>
      {content}
    </button>
  )
}
