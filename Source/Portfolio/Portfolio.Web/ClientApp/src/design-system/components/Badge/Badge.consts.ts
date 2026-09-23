import { TextColor } from '../Text'
import { BadgeTone } from './Badge.types'

export const toneClasses: Record<BadgeTone, string> = {
  [BadgeTone.Neutral]: 'border-line-emphasis',
  [BadgeTone.Accent]: 'border-accent',
}

export const toneColors: Record<BadgeTone, TextColor> = {
  [BadgeTone.Neutral]: TextColor.Muted,
  [BadgeTone.Accent]: TextColor.AccentLight,
}
