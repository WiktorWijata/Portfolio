import { FontSize, TextColor } from '../Text'
import { LabelSize, LabelTone } from './Label.types'

export const toneColors: Record<LabelTone, TextColor> = {
  [LabelTone.Muted]: TextColor.Dimmer,
  [LabelTone.Accent]: TextColor.AccentLight,
}

export const sizes: Record<LabelSize, { fontSize: FontSize; tracking: string }> = {
  [LabelSize.Sm]: { fontSize: FontSize.Nano, tracking: 'tracking-[.09em]' },
  [LabelSize.Md]: { fontSize: FontSize.Micro, tracking: 'tracking-[.11em]' },
}
