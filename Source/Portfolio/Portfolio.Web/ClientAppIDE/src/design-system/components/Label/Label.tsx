import { FontFamily, FontSize, Text, TextColor } from '../Text'
import { LabelSize, LabelTone, type LabelProps } from './Label.types'

const toneColors: Record<LabelTone, TextColor> = {
  [LabelTone.Muted]: TextColor.Dimmer,
  [LabelTone.Accent]: TextColor.AccentLight,
}

const sizes: Record<LabelSize, { fontSize: FontSize; tracking: string }> = {
  [LabelSize.Sm]: { fontSize: FontSize.Nano, tracking: 'tracking-[.09em]' },
  [LabelSize.Md]: { fontSize: FontSize.Micro, tracking: 'tracking-[.11em]' },
}

/**
 * Small uppercase eyebrow/section label (JetBrains Mono, 9–9.5px), e.g. a kicker above a heading
 * or a caption of a panel.
 */
export function Label({ tone = LabelTone.Muted, size = LabelSize.Md, className = '', children, ...rest }: LabelProps) {
  return (
    <Text
      {...rest}
      size={sizes[size].fontSize}
      font={FontFamily.Mono}
      color={toneColors[tone]}
      className={['uppercase', sizes[size].tracking, className].join(' ')}
    >
      {children}
    </Text>
  )
}
