import { useLayoutEffect, useState } from 'react'
import type { GuideHighlightRect } from '@/design-system'
import { TOUR_ATTRIBUTE, type TourTarget } from '@/components/Shell/Shell.consts'

/** First target that is currently visible (`display: none` elements have no client rects). */
function findTarget(targets: TourTarget[]): HTMLElement | null {
  for (const target of targets) {
    const element = document.querySelector<HTMLElement>(`[${TOUR_ATTRIBUTE}="${target}"]`)
    if (element && element.getClientRects().length > 0) return element
  }
  return null
}

/** Raises `element` above the shade (the shade is z-9990); returns a callback restoring its inline styles. */
function raise(element: HTMLElement) {
  const { position, zIndex, isolation } = element.style
  element.style.position = 'relative'
  element.style.zIndex = '9991'
  element.style.isolation = 'isolate'
  return () => {
    element.style.position = position
    element.style.zIndex = zIndex
    element.style.isolation = isolation
  }
}

/**
 * Finds the element a tour step points at, lifts it above the shade and keeps its rectangle
 * (window coordinates) up to date on resize and scroll. Re-selects the target on every measurement
 * so a layout change (e.g. the rail collapsing below a width threshold) that hides the current
 * target and reveals a later fallback from `targets` is picked up, not just re-measured. `null` when
 * no target is visible — that keeps listening, since a later resize may reveal one.
 */
export function useTourTarget(targets: TourTarget[]): GuideHighlightRect | null {
  const [rect, setRect] = useState<GuideHighlightRect | null>(null)

  useLayoutEffect(() => {
    let current: HTMLElement | null = null
    let restore: (() => void) | null = null

    const measure = () => {
      const next = findTarget(targets)
      if (next !== current) {
        restore?.()
        restore = next ? raise(next) : null
        current = next
      }
      const r = current?.getBoundingClientRect()
      setRect(r ? { top: r.top, left: r.left, width: r.width, height: r.height } : null)
    }

    measure()
    window.addEventListener('resize', measure)
    document.addEventListener('scroll', measure, true)
    return () => {
      window.removeEventListener('resize', measure)
      document.removeEventListener('scroll', measure, true)
      restore?.()
    }
  }, [targets])

  return rect
}
