import { Capacitor } from '@capacitor/core'
import { LocalNotifications } from '@capacitor/local-notifications'
import * as Astronomy from 'astronomy-engine'
import type { NotificationPreferences } from '../types/resonance'
import { nextMoonSignChanges } from './ephemeris'

/**
 * Local notifications, all computed on-device from the ephemeris — no server.
 * A no-op on the web; the real thing runs in the Capacitor build.
 */

const isNative = (): boolean => {
  try {
    return Capacitor.isNativePlatform()
  } catch {
    return false
  }
}

interface Scheduled {
  id: number
  title: string
  body: string
  schedule: { at: Date } | { on: { hour: number; minute: number }; every: 'day' }
}

// Fixed id ranges so we can cancel cleanly and never collide.
const ID_DAILY = 100
const ID_EVENING = 101
const ID_MOON_PHASE = 200 // 200..205
const ID_MOON_SIGN = 300 // 300..305

const parseHM = (hm: string): { hour: number; minute: number } => {
  const [h, m] = hm.split(':').map(Number)
  return { hour: h || 8, minute: m || 0 }
}

function buildSchedule(prefs: NotificationPreferences): Scheduled[] {
  const now = new Date()
  const out: Scheduled[] = []

  if (prefs.dailyReading) {
    out.push({
      id: ID_DAILY,
      title: 'Your reading is ready',
      body: 'Today’s transit, chakra focus and practice are waiting.',
      schedule: { on: parseHM(prefs.dailyReadingTime), every: 'day' },
    })
  }

  if (prefs.eveningWind) {
    out.push({
      id: ID_EVENING,
      title: 'Wind down',
      body: 'A few breaths and a mood check-in before sleep.',
      schedule: { on: parseHM(prefs.eveningWindTime), every: 'day' },
    })
  }

  if (prefs.moonPhases) {
    const phases: { deg: number; label: string }[] = [
      { deg: 0, label: 'New Moon' },
      { deg: 180, label: 'Full Moon' },
    ]
    let idx = 0
    for (const { deg, label } of phases) {
      let search = now
      for (let i = 0; i < 2; i += 1) {
        const hit = Astronomy.SearchMoonPhase(deg, search, 40)
        if (!hit) break
        out.push({
          id: ID_MOON_PHASE + idx,
          title: `${label} tonight`,
          body:
            deg === 0
              ? 'A quiet reset — set an intention and keep it to yourself.'
              : 'Feelings run bright. Notice what comes to the surface.',
          schedule: { at: new Date(hit.date.getTime() - 60 * 60 * 1000) },
        })
        idx += 1
        search = new Date(hit.date.getTime() + 24 * 60 * 60 * 1000)
      }
    }
  }

  if (prefs.moonSignChange) {
    nextMoonSignChanges(now, 4).forEach((change, i) => {
      out.push({
        id: ID_MOON_SIGN + i,
        title: `Moon enters ${change.sign}`,
        body: 'The emotional weather shifts — a good moment to ground your energy.',
        schedule: { at: change.at },
      })
    })
  }

  return out
}

const ALL_IDS = [
  ID_DAILY,
  ID_EVENING,
  ...Array.from({ length: 6 }, (_, i) => ID_MOON_PHASE + i),
  ...Array.from({ length: 6 }, (_, i) => ID_MOON_SIGN + i),
]

/** Re-schedule everything to match `prefs`. Safe to call often. */
export async function syncNotifications(
  prefs: NotificationPreferences,
): Promise<void> {
  if (!isNative()) return

  await LocalNotifications.cancel({
    notifications: ALL_IDS.map((id) => ({ id })),
  }).catch(() => undefined)

  if (!prefs.enabled) return

  const perm = await LocalNotifications.requestPermissions().catch(() => null)
  if (!perm || perm.display !== 'granted') return

  const items = buildSchedule(prefs)
  if (items.length === 0) return

  await LocalNotifications.schedule({
    notifications: items.map((n) => ({
      id: n.id,
      title: n.title,
      body: n.body,
      schedule: n.schedule,
    })),
  }).catch(() => undefined)
}

/** True once the OS has granted (or we're on web where it doesn't matter). */
export async function ensureNotificationPermission(): Promise<boolean> {
  if (!isNative()) return true
  const res = await LocalNotifications.requestPermissions().catch(() => null)
  return res?.display === 'granted'
}
