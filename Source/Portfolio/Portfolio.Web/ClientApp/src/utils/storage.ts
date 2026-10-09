/**
 * `localStorage` that never throws: it can be missing or blocked (private window, blocked site data, previews),
 * in which case a value is simply not remembered.
 */
export function readStorage(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

export function writeStorage(key: string, value: string): void {
  try {
    localStorage.setItem(key, value)
  } catch {
    /* storage unavailable — the value just isn't remembered */
  }
}
