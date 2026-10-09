import type { ComponentType, HTMLAttributes, Ref } from 'react'
import { colorClasses, fontClasses, sizeClasses, weightClasses } from './Text.consts'
import { type TextProps } from './Text.types'

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
