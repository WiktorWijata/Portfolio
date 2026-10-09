import { LinkTone } from './Link.types'

export const toneClasses: Record<LinkTone, string> = {
  [LinkTone.Accent]: 'text-link hover:text-link-hover',
  [LinkTone.Info]: 'text-link-info hover:text-link-info-hover hover:underline',
}
