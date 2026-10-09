// @vitest-environment jsdom
import { act, cleanup, render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { TourTarget } from '@/components/Shell/Shell.consts'
import { useTourTarget } from './useTourTarget'

// O1 regression: `findTarget` used to run once at mount — a layout change (the rail collapsing below its
// width threshold, hiding the currently-highlighted target) never re-selected the next visible target from
// `targets`, and left the shade highlighting a hidden (zero-rect) element. `measure()` now re-runs
// `findTarget` on every resize/scroll, restoring the previous target's styles and raising the new one.
let visible = new Set<TourTarget>()
let restore: (() => void) | undefined
beforeEach(() => {
  visible = new Set()
  const originalRects = Element.prototype.getClientRects
  const originalRect = Element.prototype.getBoundingClientRect
  Element.prototype.getClientRects = function (this: HTMLElement) {
    return visible.has(this.dataset.tour as TourTarget)
      ? ([{}] as unknown as DOMRectList)
      : ([] as unknown as DOMRectList)
  }
  Element.prototype.getBoundingClientRect = function (this: HTMLElement) {
    const isVisible = visible.has(this.dataset.tour as TourTarget)
    return { top: isVisible ? 10 : 0, left: 0, width: isVisible ? 20 : 0, height: isVisible ? 20 : 0 } as DOMRect
  }
  restore = () => {
    Element.prototype.getClientRects = originalRects
    Element.prototype.getBoundingClientRect = originalRect
  }
})
afterEach(() => {
  cleanup()
  restore?.()
})

function Probe({ targets }: { targets: TourTarget[] }) {
  const rect = useTourTarget(targets)
  return <div data-testid="rect">{rect ? JSON.stringify(rect) : 'null'}</div>
}

describe('useTourTarget — O1 regression: re-selects the target on layout change', () => {
  it('falls back to the next visible target when the current one becomes hidden, and back again', () => {
    visible = new Set([TourTarget.TerminalRail])
    render(
      <div>
        <button data-tour={TourTarget.TerminalRail}>rail target</button>
        <button data-tour={TourTarget.TerminalStatus}>status target</button>
        <Probe targets={[TourTarget.TerminalRail, TourTarget.TerminalStatus]} />
      </div>,
    )
    const rail = document.querySelector<HTMLElement>(`[data-tour="${TourTarget.TerminalRail}"]`)!
    const status = document.querySelector<HTMLElement>(`[data-tour="${TourTarget.TerminalStatus}"]`)!
    const readRect = () => JSON.parse(document.querySelector('[data-testid="rect"]')!.textContent ?? 'null')

    expect(readRect()).not.toBeNull()
    expect(rail.style.zIndex).toBe('9991')
    expect(rail.style.position).toBe('relative')
    expect(status.style.zIndex).toBe('')

    // The rail becomes hidden (e.g. narrow viewport); only the status-bar fallback is visible now.
    visible = new Set([TourTarget.TerminalStatus])
    act(() => {
      window.dispatchEvent(new Event('resize'))
    })

    expect(rail.style.zIndex).toBe('')
    expect(rail.style.position).toBe('')
    expect(status.style.zIndex).toBe('9991')
    expect(readRect()).toEqual({ top: 10, left: 0, width: 20, height: 20 })

    // Widen again: the rail comes back, the status bar's raised styles are restored.
    visible = new Set([TourTarget.TerminalRail])
    act(() => {
      window.dispatchEvent(new Event('resize'))
    })
    expect(rail.style.zIndex).toBe('9991')
    expect(status.style.zIndex).toBe('')
  })

  it('keeps listening for a target that is not visible at mount, and finds it once it appears', () => {
    visible = new Set()
    render(
      <div>
        <button data-tour={TourTarget.TerminalRail}>rail target</button>
        <Probe targets={[TourTarget.TerminalRail]} />
      </div>,
    )
    const rail = document.querySelector<HTMLElement>(`[data-tour="${TourTarget.TerminalRail}"]`)!
    const readRect = () => JSON.parse(document.querySelector('[data-testid="rect"]')!.textContent ?? 'null')

    expect(readRect()).toBeNull()

    visible = new Set([TourTarget.TerminalRail])
    act(() => {
      window.dispatchEvent(new Event('resize'))
    })

    expect(readRect()).not.toBeNull()
    expect(rail.style.zIndex).toBe('9991')
  })
})
