import { FontFamily, FontSize, Text, TextColor } from '../Text'
import { BadgeTone, type BadgeProps } from './Badge.types'

const toneClasses: Record<BadgeTone, string> = {
  [BadgeTone.Neutral]: 'border-border-6',
  [BadgeTone.Accent]: 'border-accent',
}

const toneColors: Record<BadgeTone, TextColor> = {
  [BadgeTone.Neutral]: TextColor.Muted,
  [BadgeTone.Accent]: TextColor.AccentLight,
}

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
