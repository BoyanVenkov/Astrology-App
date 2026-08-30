import { useEffect } from 'react'
import { useAppStore } from '../store/useAppStore'
import {
  locationIsFresh,
  locationPermissionState,
  requestCurrentLocation,
} from './location'
import { localDayKey } from './timezone'

/** How old the computed sky can get before we recompute it (ms). */
const SKY_MAX_AGE = 10 * 60_000

const dayRolledOver = (transitStartIso: string | undefined): boolean =>
  transitStartIso != null &&
  localDayKey(new Date(transitStartIso)) !== localDayKey()

/**
 * Keeps the reading genuinely live: the transiting Moon moves ~0.5°/hour and
 * the sky rising over the user shifts ~1°/4min, so a chart computed at 8am is
 * wrong by lunch. Recompute every ~10 minutes while the app is in the
 * foreground, on the day rolling over, and whenever the app is re-focused.
 */
export function useLiveSky(): void {
  const skyComputedAt = useAppStore((s) => s.skyComputedAt)
  const refresh = useAppStore((s) => s.refreshDailyTransit)

  useEffect(() => {
    const maybeRefresh = () => {
      const s = useAppStore.getState()
      if (
        dayRolledOver(s.transit?.window.start) ||
        Date.now() - s.skyComputedAt > SKY_MAX_AGE
      ) {
        s.refreshDailyTransit()
      }
    }

    maybeRefresh()

    const onVisible = () => {
      if (document.visibilityState === 'visible') maybeRefresh()
    }
    document.addEventListener('visibilitychange', onVisible)

    const id = window.setInterval(() => {
      if (document.visibilityState === 'visible') maybeRefresh()
    }, SKY_MAX_AGE)

    return () => {
      document.removeEventListener('visibilitychange', onVisible)
      window.clearInterval(id)
    }
    // refresh is a stable store action; skyComputedAt re-arms the check after each update
  }, [refresh, skyComputedAt])
}

/**
 * If the user has already granted location, silently refresh their fix on
 * launch so "the sky above you now" reflects where they actually are.
 */
export function useLiveLocation(): void {
  const setCurrentLocation = useAppStore((s) => s.setCurrentLocation)

  useEffect(() => {
    let cancelled = false
    void (async () => {
      const current = useAppStore.getState().currentLocation
      if (current && locationIsFresh(current)) return
      const perm = await locationPermissionState()
      if (perm !== 'granted') return
      const point = await requestCurrentLocation()
      if (!cancelled && point) setCurrentLocation(point)
    })()
    return () => {
      cancelled = true
    }
  }, [setCurrentLocation])
}
