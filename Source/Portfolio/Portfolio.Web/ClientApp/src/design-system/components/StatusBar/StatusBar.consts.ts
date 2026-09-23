import { StatusBarAccent, StatusBarTone } from './StatusBar.types'

export const toneClasses: Record<StatusBarTone, string> = {
  [StatusBarTone.Default]: 'text-content-tertiary',
  [StatusBarTone.Success]: 'text-success-content-muted',
  [StatusBarTone.Faint]: 'text-content-dim',
}

export const accentClasses: Record<StatusBarAccent, string> = {
  [StatusBarAccent.Success]: 'text-success-content',
  [StatusBarAccent.Assistant]: 'text-warning-content',
}

export const buttonBase =
  'cursor-pointer font-mono text-2xs rounded-xs px-[5px] py-[3px] focus-ring-tight transition-colors duration-140 ease-out'
