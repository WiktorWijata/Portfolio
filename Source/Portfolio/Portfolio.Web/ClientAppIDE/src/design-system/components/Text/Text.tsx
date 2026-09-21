import type { ComponentType, HTMLAttributes, Ref } from 'react'
import { FontFamily, FontSize, FontWeight, TextColor, type TextProps } from './Text.types'

// Literal class strings — Tailwind can't scan dynamically built class names.
const sizeClasses: Record<FontSize, string> = {
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

const colorClasses: Record<TextColor, string> = {
  [TextColor.Primary]: 'text-text',
  [TextColor.Heading]: 'text-text-heading',
  [TextColor.Body]: 'text-text-body',
  [TextColor.Muted]: 'text-text-muted',
  [TextColor.Dim]: 'text-text-dim',
  [TextColor.Faint]: 'text-text-faint',
  [TextColor.Dimmer]: 'text-text-dim-2',
  [TextColor.Accent]: 'text-accent',
  [TextColor.AccentLight]: 'text-accent-light',
}

const fontClasses: Record<FontFamily, string> = {
  [FontFamily.Sans]: 'font-sans',
  [FontFamily.Mono]: 'font-mono',
}

const weightClasses: Record<FontWeight, string> = {
  [FontWeight.Normal]: 'font-normal',
  [FontWeight.Medium]: 'font-medium',
  [FontWeight.SemiBold]: 'font-semibold',
}

/**
 * Off-scale details (letter-spacing, line-height, one-off colors) go in `className`;
 * don't combine a `color`/`size` prop with a conflicting class.
 */
export function Text({ size, color, font, weight, as = 'span', className = '', children, ...rest }: TextProps) {
  // `as` is a union of element names; typing the tag by the props Text passes avoids per-element ref/props checks.
  const Tag = as as unknown as ComponentType<HTMLAttributes<HTMLElement> & { ref?: Ref<HTMLElement> }>
  return (
    <Tag
      className={[
        size && sizeClasses[size],
        color && colorClasses[color],
        font && fontClasses[font],
        weight && weightClasses[weight],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </Tag>
  )
}
