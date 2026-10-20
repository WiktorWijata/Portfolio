import { useEffect, useRef, type RefObject } from 'react'
import { flushSync } from 'react-dom'
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
import { passedNeighbour, swapped } from './reorderMath'

interface DragState {
  id: string
  pointerId: number
  /** Where the press started, and where the pointer is now (px). */
  startX: number
  x: number
  /** Distance from the left edge of the tab to the point that was grabbed. */
  grab: number
  /** The pointer has moved past the threshold, so this is a drag and not a click. */
  active: boolean
  /** Ids in their current visual order; `order[i]` is the tab currently occupying flex slot `i`. */
  order: string[]
}

/**
 * Reordering of the tabs by dragging (or Alt+Shift+←/→). React's DOM (the tabs' actual position among their
 * siblings) is never touched during a gesture — only their flex `order` and `transform` styles move, which is
 * purely visual. React remains the sole owner of the real order: it is only ever changed by calling `onReorder`,
 * synchronously (`flushSync`) so the DOM the gesture leaves behind and the DOM React renders next agree with no
 * visible jump. If the gesture is cancelled (Escape, lost pointer capture, the tab set changing underneath it,
 * unmount), nothing is reported and the transient styles are cleared, so the strip falls back to the order React
 * already has. Only one reorder operation runs at a time: Alt+Shift+←/→ is ignored while a pointer drag is active,
 * rather than risk the two racing.
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
    const elementById = new Map<string, HTMLElement>()
    let drag: DragState | null = null
    let frame = 0

    function refreshElements() {
      elementById.clear()
      for (const el of tabsOf(container)) {
        if (el.dataset.tabId) elementById.set(el.dataset.tabId, el)
      }
    }

    /** Clears the transient flex `order` of every tab, handing visual order back to the real DOM order. */
    function clearVisualOrder() {
      for (const el of tabsOf(container)) el.style.order = ''
    }

    function applyVisualOrder(order: readonly string[]) {
      order.forEach((id, index) => {
        const el = elementById.get(id)
        if (el) el.style.order = String(index)
      })
    }

    /** One animation frame of a drag: scroll near the edges, swap with a neighbour, follow the pointer. */
    function tick() {
      frame = 0
      const current = drag
      if (!current?.active) return
      const tab = elementById.get(current.id)
      if (!tab) return

      const bounds = container.getBoundingClientRect()
      container.scrollLeft += autoScrollSpeed(current.x, bounds.left, bounds.right)

      const index = current.order.indexOf(current.id)
      // Cancels any running settle animation and resets a stale transform before we measure below.
      animator.layoutLeft(tab)
      const center = current.x - current.grab + tab.offsetWidth / 2
      const centerOf = (id: string) => {
        const el = elementById.get(id)
        return el ? untransformedCenter(el) : undefined
      }

      let swapWith: -1 | 1 | null = null
      if (passedNeighbour(current.order, index, 1, center, SWAP_TOLERANCE, centerOf)) swapWith = 1
      else if (passedNeighbour(current.order, index, -1, center, SWAP_TOLERANCE, centerOf)) swapWith = -1

      if (swapWith !== null) {
        const order = swapped(current.order, index, index + swapWith)
        current.order = order
        animator.animateOrder(() => applyVisualOrder(order), tab)
      }

      const newLeft = animator.layoutLeft(tab)
      tab.style.transform = `translateX(${current.x - current.grab - newLeft}px)`
      frame = requestAnimationFrame(tick)
    }

    /** Ends the gesture. `commit` reports the new order to React; a cancelled gesture reports nothing. */
    function endDrag(commit: boolean) {
      cancelAnimationFrame(frame)
      frame = 0
      const current = drag
      if (!current) return
      drag = null

      const tab = elementById.get(current.id)
      const from = tab?.style.transform ?? ''
      if (tab) {
        tab.style.transform = ''
        tab.className = tab.className.replace(DRAGGING_CLASSES, '').replace(/\s+/g, ' ').trim()
      }
      if (container.hasPointerCapture(current.pointerId)) container.releasePointerCapture(current.pointerId)

      if (current.active && commit && onReorderRef.current) {
        flushSync(() => onReorderRef.current?.(current.order))
      } else if (!commit) {
        // Cancelling restores the flex order right below (`clearVisualOrder`); stop any neighbour-slide
        // animation still chasing the tentative, now-discarded order first, so it doesn't fight that reset.
        animator.cancelAll()
      }
      // Either React just re-rendered with `current.order` (commit) or the DOM already matches the original
      // order (cancel, since it was never structurally changed) — both times the real DOM order is now correct,
      // so the transient flex `order` this gesture applied can be dropped.
      clearVisualOrder()
      if (current.active && tab) animator.animateDrop(tab, from)
    }

    function onPointerDown(e: PointerEvent) {
      if (!onReorderRef.current || e.button !== 0 || !e.isPrimary) return
      const tab = tabFromTarget(e.target)
      const id = tab?.dataset.tabId
      if (!tab || !id) return
      refreshElements()
      animator.cancel(tab)
      drag = {
        id,
        pointerId: e.pointerId,
        startX: e.clientX,
        x: e.clientX,
        grab: e.clientX - tab.getBoundingClientRect().left,
        active: false,
        order: tabIdsOf(container),
      }
    }

    function onPointerMove(e: PointerEvent) {
      if (!drag || e.pointerId !== drag.pointerId) return
      if (!drag.active) {
        if (Math.abs(e.clientX - drag.startX) < DRAG_THRESHOLD) return
        drag.active = true
        container.setPointerCapture(e.pointerId)
        const tab = elementById.get(drag.id)
        if (tab) tab.className = `${tab.className} ${DRAGGING_CLASSES}`
      }
      e.preventDefault()
      drag.x = e.clientX
      if (!frame) frame = requestAnimationFrame(tick)
    }

    function onPointerEnd(e: PointerEvent) {
      if (!drag || e.pointerId !== drag.pointerId) return
      endDrag(e.type === 'pointerup')
    }

    /** Escape cancels an active drag from anywhere, regardless of what currently has focus. */
    function onDocumentKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Escape' || !drag?.active) return
      e.preventDefault()
      endDrag(false)
    }

    function onLostPointerCapture(e: PointerEvent) {
      // Fires whenever capture ends, including release after a normal drop (already handled by `pointerup`,
      // which runs first and clears `drag`) — only acts when a gesture is still open, i.e. capture was lost
      // involuntarily (OS gesture, window losing focus, …), which is treated as a cancel, not a drop.
      if (!drag || e.pointerId !== drag.pointerId) return
      endDrag(false)
    }

    function onKeyDown(e: KeyboardEvent) {
      // A pointer gesture already owns the reorder; let it finish (or be cancelled) instead of racing it —
      // its closed-over `order` would otherwise overwrite this on drop, or vice versa.
      if (drag) return
      if (!onReorderRef.current || !e.altKey || !e.shiftKey || (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight')) return
      const tab = tabContaining(e.target)
      const id = tab?.dataset.tabId
      if (!tab || !id) return
      const order = tabIdsOf(container)
      const index = order.indexOf(id)
      const neighbourIndex = index + (e.key === 'ArrowLeft' ? -1 : 1)
      if (neighbourIndex < 0 || neighbourIndex >= order.length) return
      e.preventDefault()

      refreshElements()
      const next = swapped(order, index, neighbourIndex)
      animator.animateOrder(() => applyVisualOrder(next))
      flushSync(() => onReorderRef.current?.(next))
      clearVisualOrder()
      tab.scrollIntoView({ block: 'nearest', inline: 'nearest' })
    }

    // The tab set can change underneath an active gesture (a tab closed elsewhere, the solution reloading, …),
    // invalidating `elementById` and the order captured at pointerdown; there is no good way to patch a running
    // gesture back onto a different DOM, so it is simply cancelled — the visual state resets, nothing is reported.
    const observer = new MutationObserver(() => {
      if (drag) endDrag(false)
    })
    observer.observe(container, { childList: true })

    container.addEventListener('pointerdown', onPointerDown)
    container.addEventListener('pointermove', onPointerMove, { passive: false })
    container.addEventListener('pointerup', onPointerEnd)
    container.addEventListener('pointercancel', onPointerEnd)
    container.addEventListener('lostpointercapture', onLostPointerCapture)
    container.addEventListener('keydown', onKeyDown)
    document.addEventListener('keydown', onDocumentKeyDown)

    return () => {
      container.removeEventListener('pointerdown', onPointerDown)
      container.removeEventListener('pointermove', onPointerMove)
      container.removeEventListener('pointerup', onPointerEnd)
      container.removeEventListener('pointercancel', onPointerEnd)
      container.removeEventListener('lostpointercapture', onLostPointerCapture)
      container.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('keydown', onDocumentKeyDown)
      observer.disconnect()
      cancelAnimationFrame(frame)
      // A drag in flight at unmount never gets to report or clean up itself.
      if (drag) {
        const tab = elementById.get(drag.id)
        if (tab) tab.style.transform = ''
        clearVisualOrder()
      }
      animator.cancelAll()
    }
  }, [navRef])
}
