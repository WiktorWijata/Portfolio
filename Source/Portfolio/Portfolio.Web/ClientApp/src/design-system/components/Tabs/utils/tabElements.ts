/** Selector of a tab (`data-tab-id`) and of its close button (`data-close-tab`). */
const TAB_SELECTOR = '[data-tab-id]'
const CLOSE_SELECTOR = '[data-close-tab]'

/** The tabs of the strip in their current order. */
export function tabsOf(container: HTMLElement): HTMLElement[] {
  return [...container.children].filter((el): el is HTMLElement => el instanceof HTMLElement && !!el.dataset.tabId)
}

/** Ids of the tabs in their current order. */
export function tabIdsOf(container: HTMLElement): string[] {
  return tabsOf(container).flatMap((el) => (el.dataset.tabId ? [el.dataset.tabId] : []))
}

/** The tab an event happened in, or `null` (e.g. for the close button, which must not start a drag). */
export function tabFromTarget(target: EventTarget | null): HTMLElement | null {
  if (!(target instanceof Element) || target.closest(CLOSE_SELECTOR)) return null
  return target.closest<HTMLElement>(TAB_SELECTOR)
}

/** The tab an event happened in, including its close button (used by the keyboard). */
export function tabContaining(target: EventTarget | null): HTMLElement | null {
  return target instanceof Element ? target.closest<HTMLElement>(TAB_SELECTOR) : null
}

/** Horizontal centre of a tab without the transform that a drag or animation applies. */
export function untransformedCenter(el: HTMLElement): number {
  const rect = el.getBoundingClientRect()
  const matrix = new DOMMatrixReadOnly(getComputedStyle(el).transform)
  return rect.left - matrix.m41 + rect.width / 2
}
