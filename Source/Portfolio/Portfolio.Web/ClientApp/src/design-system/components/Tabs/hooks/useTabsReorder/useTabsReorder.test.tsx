// @vitest-environment jsdom
import { cleanup, render } from '@testing-library/react'
import { useRef } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useTabsReorder } from './useTabsReorder'

afterEach(cleanup)

// jsdom has none of these — pointer capture, rAF, matchMedia and scrollIntoView — and the hook depends on all of them.
// Reduced-motion (`matches: true`) also keeps the animator's Web Animations API (`Element.animate`, which
// jsdom doesn't implement either) out of the picture entirely, since both animation paths short-circuit on it.
let restore: (() => void) | undefined
beforeEach(() => {
  const setPointerCapture = vi.fn()
  const hasPointerCapture = vi.fn(() => false)
  const releasePointerCapture = vi.fn()
  const rAF = vi.fn(() => 1)
  const cAF = vi.fn()
  const matchMedia = vi.fn().mockReturnValue({
    matches: true,
    media: '',
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })

  const scrollIntoView = vi.fn()

  Element.prototype.setPointerCapture = setPointerCapture
  Element.prototype.hasPointerCapture = hasPointerCapture
  Element.prototype.releasePointerCapture = releasePointerCapture
  Element.prototype.scrollIntoView = scrollIntoView
  window.requestAnimationFrame = rAF
  window.cancelAnimationFrame = cAF
  window.matchMedia = matchMedia

  restore = () => {
    // @ts-expect-error test-only cleanup of the polyfills installed above
    delete Element.prototype.setPointerCapture
    // @ts-expect-error test-only cleanup
    delete Element.prototype.hasPointerCapture
    // @ts-expect-error test-only cleanup
    delete Element.prototype.releasePointerCapture
    // @ts-expect-error test-only cleanup
    delete Element.prototype.scrollIntoView
  }
})
afterEach(() => restore?.())

function Strip({
  navRef,
  onReorder,
}: {
  navRef: React.RefObject<HTMLDivElement | null>
  onReorder: (o: string[]) => void
}) {
  useTabsReorder(navRef, onReorder)
  return (
    <div ref={navRef}>
      <div data-tab-id="a">A</div>
      <div data-tab-id="b">B</div>
      <div data-tab-id="c">C</div>
    </div>
  )
}

function renderStrip(onReorder: (o: string[]) => void) {
  function Wrapper() {
    const navRef = useRef<HTMLDivElement>(null)
    return <Strip navRef={navRef} onReorder={onReorder} />
  }
  return render(<Wrapper />)
}

/** Dispatches a pointer-flavoured MouseEvent — jsdom's MouseEvent constructor covers `button`/`clientX`;
 * `pointerId`/`isPrimary` (real PointerEvent fields the handlers read) are added directly onto the instance. */
function firePointer(type: string, el: Element, opts: { clientX: number; pointerId?: number }) {
  const event = new MouseEvent(type, { bubbles: true, cancelable: true, button: 0, clientX: opts.clientX })
  Object.assign(event, { pointerId: opts.pointerId ?? 1, isPrimary: true })
  el.dispatchEvent(event)
}

function fireKey(target: EventTarget, opts: { key: string; altKey?: boolean; shiftKey?: boolean }) {
  target.dispatchEvent(
    new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      key: opts.key,
      altKey: opts.altKey,
      shiftKey: opts.shiftKey,
    }),
  )
}

/** Starts a drag on tab `id` past DRAG_THRESHOLD (6px) — enough to flip `drag.active`, nothing further. */
function startDrag(container: Element, id: string) {
  const tab = container.querySelector<HTMLElement>(`[data-tab-id="${id}"]`)!
  firePointer('pointerdown', tab, { clientX: 0 })
  firePointer('pointermove', tab, { clientX: 20 })
  return tab
}

describe('useTabsReorder — N4 regression: reorder gesture cannot race other operations', () => {
  it('Alt+Shift+ArrowRight is ignored while a pointer drag is active (no onReorder call)', () => {
    const onReorder = vi.fn()
    const { container } = renderStrip(onReorder)
    const nav = container.firstElementChild!
    const tab = startDrag(nav, 'a')

    fireKey(tab, { key: 'ArrowRight', altKey: true, shiftKey: true })
    expect(onReorder).not.toHaveBeenCalled()
  })

  it('Alt+Shift+ArrowRight works normally once no drag is active', () => {
    const onReorder = vi.fn()
    const { container } = renderStrip(onReorder)
    const nav = container.firstElementChild!
    const tab = nav.querySelector<HTMLElement>('[data-tab-id="a"]')!

    fireKey(tab, { key: 'ArrowRight', altKey: true, shiftKey: true })
    expect(onReorder).toHaveBeenCalledWith(['b', 'a', 'c'])
  })

  it('Escape cancels an active drag: no onReorder call, dragging class and transform are cleared', () => {
    const onReorder = vi.fn()
    const { container } = renderStrip(onReorder)
    const nav = container.firstElementChild!
    const tab = startDrag(nav, 'a')
    expect(tab.className).toContain('opacity-[.96]')

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }))

    expect(onReorder).not.toHaveBeenCalled()
    expect(tab.className).not.toContain('opacity-[.96]')
    expect(tab.style.transform).toBe('')

    // The cancelled gesture must not leave a dangling reorder waiting for the next pointerup either.
    firePointer('pointerup', tab, { clientX: 20 })
    expect(onReorder).not.toHaveBeenCalled()
  })

  it('the tab set changing under an active drag cancels it (no onReorder on the eventual pointerup)', () => {
    const onReorder = vi.fn()
    const { container } = renderStrip(onReorder)
    const nav = container.firstElementChild!
    const tab = startDrag(nav, 'a')

    const extra = document.createElement('div')
    extra.dataset.tabId = 'd'
    nav.appendChild(extra)

    // MutationObserver callbacks run as a microtask — flush the microtask queue.
    return Promise.resolve().then(() => {
      firePointer('pointerup', tab, { clientX: 20 })
      expect(onReorder).not.toHaveBeenCalled()
    })
  })

  it('losing pointer capture involuntarily cancels the drag without reporting a reorder', () => {
    const onReorder = vi.fn()
    const { container } = renderStrip(onReorder)
    const nav = container.firstElementChild!
    const tab = startDrag(nav, 'a')

    const event = new MouseEvent('lostpointercapture', { bubbles: true, cancelable: true })
    Object.assign(event, { pointerId: 1 })
    tab.dispatchEvent(event)

    expect(onReorder).not.toHaveBeenCalled()
    expect(tab.className).not.toContain('opacity-[.96]')
  })

  it('a completed drag (pointerup) does report the reorder', () => {
    const onReorder = vi.fn()
    const { container } = renderStrip(onReorder)
    const nav = container.firstElementChild!
    const tab = startDrag(nav, 'a')

    firePointer('pointerup', tab, { clientX: 20 })
    // Geometry is all-zero in jsdom, so no swap is triggered — but the drag was active and dropped, which
    // must still commit the (unchanged) order rather than silently doing nothing.
    expect(onReorder).toHaveBeenCalledWith(['a', 'b', 'c'])
  })
})
