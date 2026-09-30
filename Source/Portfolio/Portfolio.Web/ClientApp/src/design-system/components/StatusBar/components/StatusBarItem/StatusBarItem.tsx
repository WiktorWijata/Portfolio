import { FontFamily, FontSize, Text } from '../../../Text'
import { indicatorClasses, toneClasses } from '../../StatusBar.consts'
import { StatusBarTone } from '../../StatusBar.types'
import type { StatusBarItemProps } from './StatusBarItem.types'

export function StatusBarItem({
  tone = StatusBarTone.Default,
  indicator,
  truncate = false,
  className = '',
  children,
  ...rest
}: StatusBarItemProps) {
  return (
    <Text
      {...rest}
      size={tone === StatusBarTone.Faint ? FontSize.XXSmall : FontSize.XSmall}
      font={FontFamily.Mono}
      className={[
        toneClasses[tone],
        indicator ? 'inline-flex items-center gap-1.5' : '',
        truncate ? 'min-w-0 truncate' : 'shrink-0 whitespace-nowrap',
        className,
      ].join(' ')}
    >
      {indicator && (
        <span aria-hidden className={['size-1.5 shrink-0 rounded-full', indicatorClasses[indicator]].join(' ')} />
      )}
      {children}
    </Text>
  )
}
