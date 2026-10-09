import { FontFamily, FontSize, FontWeight, TextColor } from './Text.types'

// Literal class strings — Tailwind can't scan dynamically built class names.
export const sizeClasses: Record<FontSize, string> = {
  [FontSize.Nano]: 'text-3xs',
  [FontSize.Micro]: 'text-3xs-plus',
  [FontSize.XXSmall]: 'text-2xs',
  [FontSize.XSmall]: 'text-xs',
  [FontSize.Small]: 'text-sm',
  [FontSize.SmallPlus]: 'text-sm-plus',
  [FontSize.Medium]: 'text-base',
  [FontSize.Large]: 'text-md',
  [FontSize.XLarge]: 'text-lg',
  [FontSize.XXLarge]: 'text-xl',
  [FontSize.Title]: 'text-3xl',
  [FontSize.Heading]: 'text-h1-sm',
  [FontSize.Display]: 'text-h1',
}

export const colorClasses: Record<TextColor, string> = {
  [TextColor.Primary]: 'text-content-strong',
  [TextColor.Heading]: 'text-content-primary',
  [TextColor.Body]: 'text-content-body',
  [TextColor.Muted]: 'text-content-secondary',
  [TextColor.Dim]: 'text-content-muted',
  [TextColor.Faint]: 'text-content-faint',
  [TextColor.Dimmer]: 'text-content-dim',
  [TextColor.Accent]: 'text-accent',
  [TextColor.AccentLight]: 'text-accent-light',
}

export const fontClasses: Record<FontFamily, string> = {
  [FontFamily.Sans]: 'font-sans',
  [FontFamily.Mono]: 'font-mono',
}

export const weightClasses: Record<FontWeight, string> = {
  [FontWeight.Normal]: 'font-normal',
  [FontWeight.Medium]: 'font-medium',
  [FontWeight.SemiBold]: 'font-semibold',
}
