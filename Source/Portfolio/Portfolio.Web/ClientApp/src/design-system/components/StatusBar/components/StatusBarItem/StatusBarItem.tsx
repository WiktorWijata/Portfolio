import { FontFamily, FontSize, Text } from '../../../Text'
import { toneClasses } from '../../StatusBar.consts'
import { StatusBarTone } from '../../StatusBar.types'
import type { StatusBarItemProps } from './StatusBarItem.types'

export function StatusBarItem({
  tone = StatusBarTone.Default,
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
      className={[toneClasses[tone], truncate ? 'min-w-0 truncate' : 'shrink-0 whitespace-nowrap', className].join(' ')}
    >
      {children}
    </Text>
  )
}
