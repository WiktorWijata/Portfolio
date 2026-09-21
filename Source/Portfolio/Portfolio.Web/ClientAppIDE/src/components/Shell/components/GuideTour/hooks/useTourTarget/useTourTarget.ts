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

/**
 * Finds the element a tour step points at, lifts it above the shade and keeps its rectangle
 * (window coordinates) up to date on resize and scroll. `null` when no target is visible.
 */
export function useTourTarget(targets: TourTarget[]): GuideHighlightRect | null {
  const [rect, setRect] = useState<GuideHighlightRect | null>(null)

  useLayoutEffect(() => {
    const element = findTarget(targets)
    const measure = () => {
      const r = element?.getBoundingClientRect()
      setRect(r ? { top: r.top, left: r.left, width: r.width, height: r.height } : null)
    }
    measure()
    if (!element) return

    // Raise the element over the shade (the shade is z-9990); restore its inline styles afterwards.
    const { position, zIndex, isolation } = element.style
    element.style.position = 'relative'
    element.style.zIndex = '9991'
    element.style.isolation = 'isolate'

    window.addEventListener('resize', measure)
    document.addEventListener('scroll', measure, true)
    return () => {
      window.removeEventListener('resize', measure)
      document.removeEventListener('scroll', measure, true)
      element.style.position = position
      element.style.zIndex = zIndex
      element.style.isolation = isolation
    }
  }, [targets])

  return rect
}
