import { useSyncExternalStore } from 'react'

/**
 * A tiny global "something is covering the screen" flag. While it's set, the
 * app shell hides its bottom tab bar so full-height surfaces — the birth-data
 * form, the scroll-wheel date/time pickers — aren't cut off by it.
 *
 * It's a counter, not a boolean, so nested users (a picker opened from within
 * the form) release cleanly.
 */
let count = 0
const listeners = new Set<() => void>()

const emit = (): void => {
  for (const l of listeners) l()
}

export function pushOverlay(): void {
  count += 1
  emit()
}

export function popOverlay(): void {
  count = Math.max(0, count - 1)
  emit()
}

export function useOverlayOpen(): boolean {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb)
      return () => listeners.delete(cb)
    },
    () => count > 0,
    () => false,
  )
}
