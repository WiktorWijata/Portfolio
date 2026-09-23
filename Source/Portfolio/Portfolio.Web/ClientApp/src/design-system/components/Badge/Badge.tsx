import { FontFamily, FontSize, Text } from '../Text'
import { toneClasses, toneColors } from './Badge.consts'
import { BadgeTone, type BadgeProps } from './Badge.types'

export function Badge({ tone = BadgeTone.Neutral, className = '', children, ...rest }: BadgeProps) {
  return (
    <Text
      {...rest}
      size={FontSize.XSmall}
      font={FontFamily.Mono}
      color={toneColors[tone]}
      className={['inline-flex items-center rounded-sm border px-2.5 py-1', toneClasses[tone], className].join(' ')}
    >
      {children}
    </Text>
  )
}
