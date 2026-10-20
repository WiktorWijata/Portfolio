import { FontFamily, FontSize, FontWeight, Text } from '../../../Text'
import { toneClasses } from '../../TitleBar.consts'
import { TitleBarButtonTone } from '../../TitleBar.types'
import type { TitleBarButtonProps } from './TitleBarButton.types'

export function TitleBarButton({
  tone = TitleBarButtonTone.Run,
  icon,
  className = '',
  children,
  ...rest
}: TitleBarButtonProps) {
  const isRun = tone === TitleBarButtonTone.Run
  return (
    <button
      type="button"
      className={[
        'inline-flex shrink-0 cursor-pointer items-center text-xs leading-[1.3] whitespace-nowrap outline-none',
        'transition-[background-color,border-color,color] duration-150 ease-out',
        toneClasses[tone],
        className,
      ].join(' ')}
      {...rest}
    >
      {icon && <span aria-hidden="true">{icon}</span>}
      <Text
        size={FontSize.XSmall}
        font={isRun ? FontFamily.Sans : FontFamily.Mono}
        weight={isRun ? FontWeight.Medium : undefined}
      >
        {children}
      </Text>
    </button>
  )
}
