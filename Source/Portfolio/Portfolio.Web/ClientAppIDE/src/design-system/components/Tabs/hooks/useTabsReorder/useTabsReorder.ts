import { useEffect, useRef, type RefObject } from 'react'
import { DRAG_THRESHOLD, DRAGGING_CLASSES, SWAP_TOLERANCE } from '../../Tabs.consts'
import {
  autoScrollSpeed,
  createTabAnimator,
  tabContaining,
  tabFromTarget,
  tabIdsOf,
  tabsOf,
  untransformedCenter,
} from '../../utils'

interface DragState {
  tab: HTMLElement
  pointerId: number
  /** Where the press started, and where the pointer is now (px). */
  startX: number
  x: number
  /** Distance from the left edge of the tab to the point that was grabbed. */
  grab: number
  /** The pointer has moved past the threshold, so this is a drag and not a click. */
  active: boolean
}

/**
 * Reordering of the tabs by dragging (or Alt+Shift+←/→). The dragged tab follows the pointer through a live
 * `transform`, its neighbours slide out of the way when it passes their centre, and the strip scrolls near its
 * ends. The DOM is reordered directly during the drag (that is what keeps it smooth); `onReorder` is called with
 * the resulting order once the tab is dropped.
 */
export function useTabsReorder(navRef: RefObject<HTMLElement | null>, onReorder?: (order: string[]) => void) {
  const onReorderRef = useRef(onReorder)

  useEffect(() => {
    onReorderRef.current = onReorder
  })

  useEffect(() => {
    const found = navRef.current
    if (!found) return
    // A typed copy: narrowing of `found` does not reach the function declarations below.
    const container: HTMLElement = found

    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)')
    const animator = createTabAnimator(container, reducedMotion)
    let drag: DragState | null = null
    let frame = 0

    const reportOrder = () => onReorderRef.current?.(tabIdsOf(container))

    /** One animation frame of a drag: scroll near the edges, swap with a neighbour, follow the pointer. */
    function tick() {
      frame = 0
      const current = drag
      if (!current?.active) return

      const bounds = container.getBoundingClientRect()
      container.scrollLeft += autoScrollSpeed(current.x, bounds.left, bounds.right)

      const items = tabsOf(container)
      const index = items.indexOf(current.tab)
      animator.layoutLeft(current.tab)
      const center = current.x - current.grab + current.tab.offsetWidth / 2
      const previous = items[index - 1]
      const next = items[index + 1]
      if (next && center > untransformedCenter(next) + SWAP_TOLERANCE) {
        animator.animateOrder(() => next.after(current.tab), current.tab)
      } else if (previous && center < untransformedCenter(previous) - SWAP_TOLERANCE) {
        animator.animateOrder(() => previous.before(current.tab), current.tab)
      }

      const left = animator.layoutLeft(current.tab)
      current.tab.style.transform = `translateX(${current.x - current.grab - left}px)`
      frame = requestAnimationFrame(tick)
    }

    function onPointerDown(e: PointerEvent) {
      if (!onReorderRef.current || e.button !== 0 || !e.isPrimary) return
      const tab = tabFromTarget(e.target)
      if (!tab) return
      animator.cancel(tab)
      drag = {
        tab,
        pointerId: e.pointerId,
        startX: e.clientX,
        x: e.clientX,
        grab: e.clientX - tab.getBoundingClientRect().left,
        active: false,
      }
    }

    function onPointerMove(e: PointerEvent) {
      if (!drag || e.pointerId !== drag.pointerId) return
      if (!drag.active) {
        if (Math.abs(e.clientX - drag.startX) < DRAG_THRESHOLD) return
        drag.active = true
        container.setPointerCapture(e.pointerId)
        drag.tab.className = `${drag.tab.className} ${DRAGGING_CLASSES}`
      }
      e.preventDefault()
      drag.x = e.clientX
      if (!frame) frame = requestAnimationFrame(tick)
    }

    function onPointerEnd(e: PointerEvent) {
      if (!drag || e.pointerId !== drag.pointerId) return
      cancelAnimationFrame(frame)
      frame = 0
      const { tab, pointerId, active } = drag
      const from = tab.style.transform
      tab.style.transform = ''
      tab.className = tab.className.replace(DRAGGING_CLASSES, '').replace(/\s+/g, ' ').trim()
      if (active) animator.animateDrop(tab, from)
      drag = null
      if (container.hasPointerCapture(pointerId)) container.releasePointerCapture(pointerId)
      if (active) reportOrder()
    }

    function onKeyDown(e: KeyboardEvent) {
      if (!onReorderRef.current || !e.altKey || !e.shiftKey || (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight')) return
      const tab = tabContaining(e.target)
      if (!tab) return
      const items = tabsOf(container)
      const neighbour = items[items.indexOf(tab) + (e.key === 'ArrowLeft' ? -1 : 1)]
      if (!neighbour) return
      e.preventDefault()
      animator.animateOrder(() => (e.key === 'ArrowLeft' ? neighbour.before(tab) : neighbour.after(tab)))
      tab.scrollIntoView({ block: 'nearest', inline: 'nearest' })
      reportOrder()
    }

    container.addEventListener('pointerdown', onPointerDown)
    container.addEventListener('pointermove', onPointerMove, { passive: false })
    container.addEventListener('pointerup', onPointerEnd)
    container.addEventListener('pointercancel', onPointerEnd)
    container.addEventListener('keydown', onKeyDown)

    return () => {
      container.removeEventListener('pointerdown', onPointerDown)
      container.removeEventListener('pointermove', onPointerMove)
      container.removeEventListener('pointerup', onPointerEnd)
      container.removeEventListener('pointercancel', onPointerEnd)
      container.removeEventListener('keydown', onKeyDown)
      cancelAnimationFrame(frame)
    }
  }, [navRef])
}
