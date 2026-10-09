import { ButtonSize, ButtonVariant } from './Button.types'

export const variantClasses: Record<ButtonVariant, string> = {
  [ButtonVariant.Primary]: 'bg-accent text-accent-content hover:bg-accent-hover border border-transparent',
  [ButtonVariant.Outline]:
    'bg-transparent border border-line-emphasis hover:bg-accent-surface hover:border-accent-dark',
  [ButtonVariant.Secondary]:
    'bg-surface-hover text-content-body border border-line-default hover:bg-accent-surface hover:border-accent hover:text-accent-light',
}

// The label colour of Outline depends on the size: page buttons use the primary text colour,
// the compact ones (cards, overlays) the body colour.
export const sizeClasses: Record<ButtonSize, { box: string; outlineText: string }> = {
  [ButtonSize.Md]: { box: 'min-h-11 px-3.5 rounded-sm', outlineText: 'text-content-strong' },
  [ButtonSize.Sm]: { box: 'px-3 py-2 rounded-md', outlineText: 'text-content-body' },
  [ButtonSize.Card]: { box: 'min-h-10 px-3.5 rounded-md', outlineText: 'text-content-strong' },
  [ButtonSize.Xs]: { box: 'px-3 py-[7px] rounded-sm', outlineText: 'text-content-body' },
  [ButtonSize.Lg]: { box: 'px-[18px] py-3 rounded-md', outlineText: 'text-content-strong' },
}
