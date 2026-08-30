import { Geolocation } from '@capacitor/geolocation'
import type { GeoPoint } from '../types/resonance'

/**
 * The user's current position — used for the "sky above you now" chart, local
 * sunrise/sunset, and to make the daily reading reflect where they actually
 * are rather than where they were born. `@capacitor/geolocation` uses the
 * browser Geolocation API on web and the native one on device.
 */
export async function requestCurrentLocation(): Promise<GeoPoint | null> {
  try {
    // requestPermissions isn't implemented on web — getCurrentPosition prompts.
    await Geolocation.requestPermissions().catch(() => undefined)
    const pos = await Geolocation.getCurrentPosition({
      enableHighAccuracy: false,
      timeout: 12_000,
      maximumAge: 5 * 60_000,
    })
    return {
      lat: pos.coords.latitude,
      lon: pos.coords.longitude,
      label: 'Current location',
      at: new Date().toISOString(),
    }
  } catch {
    return null
  }
}

export async function locationPermissionState(): Promise<
  'granted' | 'denied' | 'prompt' | 'unknown'
> {
  try {
    const res = await Geolocation.checkPermissions()
    return res.location as 'granted' | 'denied' | 'prompt'
  } catch {
    return 'unknown'
  }
}

/** True while a stored fix is still worth trusting for astrology (a day). */
export const locationIsFresh = (point: GeoPoint | null): boolean => {
  if (!point) return false
  return Date.now() - new Date(point.at).getTime() < 24 * 60 * 60_000
}
