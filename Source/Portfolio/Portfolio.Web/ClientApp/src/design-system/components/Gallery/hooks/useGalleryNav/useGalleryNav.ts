import type { KeyboardEvent } from 'react'

interface UseGalleryNavOptions {
  /** Indeks aktualnego slajdu (kontrolowany z zewnątrz). */
  activeIndex: number
  /** Liczba slajdów — do zawijania nawigacji na końcach. */
  length: number
  onActiveIndexChange: (index: number) => void
}

/** Ruch po slajdach karuzeli (zawijany) i obsługa strzałek ←/→ z klawiatury. */
export function useGalleryNav({ activeIndex, length, onActiveIndexChange }: UseGalleryNavOptions) {
  function move(delta: number) {
    onActiveIndexChange((activeIndex + delta + length) % length)
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault()
      move(e.key === 'ArrowLeft' ? -1 : 1)
    }
  }

  return { move, onKeyDown }
}
