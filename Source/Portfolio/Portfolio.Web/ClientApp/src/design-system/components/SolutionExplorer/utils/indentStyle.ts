import type { CSSProperties } from 'react'

export function indentStyle(level: number): CSSProperties {
  return { ['--tree-indent' as string]: `${level * 16}px` }
}
