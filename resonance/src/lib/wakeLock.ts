import { useEffect, useRef } from 'react'

/**
 * Keeps the screen on for as long as `active` is true — so a breathing,
 * meditation, or frequency session doesn't go dark mid-practice and strand
 * whoever's following the on-screen instructions. Uses the standard Screen
 * Wake Lock API (supported by Capacitor's Chromium WebView on Android); the
 * OS can still revoke it (e.g. the app is backgrounded), so we re-acquire
 * on visibilitychange, and fail silently where the API isn't available.
 */
export function useWakeLock(active: boolean): void {
  const sentinelRef = useRef<WakeLockSentinel | null>(null)

  useEffect(() => {
    if (!active || !('wakeLock' in navigator)) return
    let cancelled = false

    const acquire = async () => {
      try {
        const sentinel = await navigator.wakeLock.request('screen')
        if (cancelled) {
          void sentinel.release()
          return
        }
        sentinelRef.current = sentinel
      } catch {
        /* denied by battery saver, low power mode, etc. — ignore */
      }
    }

    void acquire()

    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible' && !sentinelRef.current) void acquire()
    }
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      cancelled = true
      document.removeEventListener('visibilitychange', onVisibilityChange)
      void sentinelRef.current?.release()
      sentinelRef.current = null
    }
  }, [active])
}
