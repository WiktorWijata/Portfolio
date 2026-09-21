import { CloseButtonSize, type CloseButtonProps } from './CloseButton.types'

// Literal class strings — Tailwind can't scan dynamically built class names.
const sizeClasses: Record<CloseButtonSize, string> = {
  [CloseButtonSize.Sm]: [
    'size-5 transition-[color,background-color] duration-[120ms] active:bg-[#484c54]',
    'before:top-[9.5px] before:left-[5px] before:rounded-[1px] after:top-[9.5px] after:left-[5px] after:rounded-[1px]',
  ].join(' '),
  [CloseButtonSize.Md]: 'size-6 before:top-[11.5px] before:left-[7px] after:top-[11.5px] after:left-[7px]',
}

/**
 * The "×" button in the headers of the terminal and the chat. The cross is drawn with the two pseudo-elements,
 * so the button has no text and needs an `aria-label`. Internal to the design system.
 */
export function CloseButton({ size = CloseButtonSize.Md, className = '', ...rest }: CloseButtonProps) {
  return (
    <button
      type="button"
      className={[
        'relative flex flex-none items-center justify-center rounded-sm text-close-button',
        'hover:bg-close-button-hover-bg hover:text-close-button-hover',
        'outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
        "before:absolute before:h-px before:w-2.5 before:rotate-45 before:bg-current before:content-['']",
        "after:absolute after:h-px after:w-2.5 after:-rotate-45 after:bg-current after:content-['']",
        sizeClasses[size],
        className,
      ].join(' ')}
      {...rest}
    />
  )
}
