import { TitleBarButtonTone } from './TitleBar.types'

export const toneClasses: Record<TitleBarButtonTone, string> = {
  [TitleBarButtonTone.Run]:
    'gap-[7px] rounded-md border border-info-line bg-info-surface px-[11px] py-1.5 text-info-content ' +
    'hover:border-info-line-hover hover:bg-info-surface-hover hover:text-info-content-hover ' +
    'focus-visible:outline-2 focus-visible:outline-info-focus focus-visible:outline-offset-2',
  [TitleBarButtonTone.Link]: 'gap-[5px] rounded-sm px-[7px] py-1 text-accent hover:text-accent-light focus-ring-tight',
}
