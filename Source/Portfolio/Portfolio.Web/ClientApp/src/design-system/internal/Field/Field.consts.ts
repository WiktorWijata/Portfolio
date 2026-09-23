/**
 * Base look shared by every text field (Input, Textarea): surface, border, font, focus ring and the mobile
 * font-size fix that prevents iOS from auto-zooming on focus. Each field appends its own extra classes
 * (e.g. `resize-y` and a height for Textarea).
 */
export const FIELD_BASE_CLASSES = [
  'w-full min-w-0 rounded-md border border-line-emphasis bg-surface-inset p-3',
  'font-sans text-md leading-[1.5] text-content-strong placeholder:text-content-muted',
  'outline-none focus:border-accent focus:outline-2 focus:outline-offset-1 focus:outline-accent',
  'transition-[border-color] duration-140 ease-out',
  'max-bp600:text-[16px]', // prevents iOS auto-zoom on focus
].join(' ')
