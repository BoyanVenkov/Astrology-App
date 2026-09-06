import { Capacitor } from '@capacitor/core'
import { LocalNotifications } from '@capacitor/local-notifications'
import * as Astronomy from 'astronomy-engine'
import type { NotificationPreferences } from '../types/resonance'
import { nextMoonSignChanges } from './ephemeris'
import { signLabel, type TFn } from './i18n'
import { upcomingVoidOfCourse } from './lunar'

/**
 * Local notifications, all computed on-device from the ephemeris — no server.
 * A no-op on the web; the real thing runs in the Capacitor build.
 *
 * Everything is scheduled as an **inexact** alarm (`isExactNotification: false`)
 * so Android 12+ never yanks the user to the system "Alarms & reminders" screen,
 * and `allowWhileIdle` so Doze doesn't defer them indefinitely. A morning nudge
 * landing a few minutes late is fine; reliability matters more than the second.
 */

const isNative = (): boolean => {
  try {
    return Capacitor.isNativePlatform()
  } catch {
    return false
  }
}

const CHANNEL_ID = 'resonance-default'

/** Android 8+: notifications need a channel, and its importance is fixed at
 *  creation — so make sure a HIGH one exists before scheduling anything. */
async function ensureChannel(): Promise<void> {
  if (Capacitor.getPlatform() !== 'android') return
  await LocalNotifications.createChannel({
    id: CHANNEL_ID,
    name: 'Resonance',
    description: 'Readings, wind-downs and sky events',
    importance: 4, // IMPORTANCE_HIGH — makes a sound, can pop as a heads-up
    visibility: 1,
  }).catch(() => undefined)
}

interface Scheduled {
  id: number
  title: string
  body: string
  schedule: { at: Date } | { on: { hour: number; minute: number } }
}

// Fixed id ranges so we can cancel cleanly and never collide.
const ID_CONFIRM = 99
const ID_DAILY = 100
const ID_EVENING = 101
const ID_MOON_PHASE = 200 // 200..205
const ID_MOON_SIGN = 300 // 300..305
const ID_VOC = 400 // 400..402

const parseHM = (hm: string): { hour: number; minute: number } => {
  const [h, m] = hm.split(':').map(Number)
  return { hour: h || 8, minute: m || 0 }
}

function buildSchedule(prefs: NotificationPreferences, t: TFn): Scheduled[] {
  const now = new Date()
  const out: Scheduled[] = []

  if (prefs.dailyReading) {
    out.push({
      id: ID_DAILY,
      title: t('notif.daily.title'),
      body: t('notif.daily.body'),
      schedule: { on: parseHM(prefs.dailyReadingTime) },
    })
  }

  if (prefs.eveningWind) {
    out.push({
      id: ID_EVENING,
      title: t('notif.evening.title'),
      body: t('notif.evening.body'),
      schedule: { on: parseHM(prefs.eveningWindTime) },
    })
  }

  if (prefs.moonPhases) {
    const phases = [0, 180]
    let idx = 0
    for (const deg of phases) {
      let search = now
      for (let i = 0; i < 2; i += 1) {
        const hit = Astronomy.SearchMoonPhase(deg, search, 40)
        if (!hit) break
        out.push({
          id: ID_MOON_PHASE + idx,
          title: deg === 0 ? t('notif.newMoon.title') : t('notif.fullMoon.title'),
          body: deg === 0 ? t('notif.newMoon.body') : t('notif.fullMoon.body'),
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
        title: t('notif.moonSign.title', { sign: signLabel(change.sign, t) }),
        body: t('notif.moonSign.body'),
        schedule: { at: change.at },
      })
    })
  }

  if (prefs.voidOfCourse) {
    upcomingVoidOfCourse(now, 3).forEach((voc, i) => {
      // 30 min ahead — enough lead that a Doze-delayed inexact alarm still
      // lands before the void actually starts.
      const fireAt = new Date(voc.since.getTime() - 30 * 60_000)
      if (fireAt.getTime() <= now.getTime()) return
      out.push({
        id: ID_VOC + i,
        title: t('notif.voc.title'),
        body: t('notif.voc.body'),
        schedule: { at: fireAt },
      })
    })
  }

  return out
}

// ID_CONFIRM is deliberately absent: it's a fire-once "it works" toast shown
// straight after the permission grant, and `syncNotifications` runs immediately
// after that — cancelling it here would dismiss it before it's seen.
const ALL_IDS = [
  ID_DAILY,
  ID_EVENING,
  ...Array.from({ length: 6 }, (_, i) => ID_MOON_PHASE + i),
  ...Array.from({ length: 6 }, (_, i) => ID_MOON_SIGN + i),
  ...Array.from({ length: 3 }, (_, i) => ID_VOC + i),
]

/** Re-schedule everything to match `prefs`. Safe to call often. */
export async function syncNotifications(
  prefs: NotificationPreferences,
  t: TFn,
): Promise<void> {
  if (!isNative()) return

  await LocalNotifications.cancel({
    notifications: ALL_IDS.map((id) => ({ id })),
  }).catch(() => undefined)

  if (!prefs.enabled) return

  const perm = await LocalNotifications.requestPermissions().catch(() => null)
  if (!perm || perm.display !== 'granted') return

  await ensureChannel()

  const items = buildSchedule(prefs, t)
  if (items.length === 0) return

  await LocalNotifications.schedule({
    notifications: items.map((n) => ({
      id: n.id,
      title: n.title,
      body: n.body,
      channelId: CHANNEL_ID,
      schedule: {
        ...n.schedule,
        allowWhileIdle: true,
      },
      // never bounce the user to the system "Alarms & reminders" screen
      isExactNotification: false,
    })),
  }).catch(() => undefined)
}

/**
 * Turn notifications on: ask for permission, and if granted fire one straight
 * away so the user actually sees it work (the scheduled ones may be hours off).
 * Returns whether permission is granted.
 */
export async function enableNotifications(t: TFn): Promise<boolean> {
  if (!isNative()) return true
  const res = await LocalNotifications.requestPermissions().catch(() => null)
  if (res?.display !== 'granted') return false

  await ensureChannel()
  // No `schedule` → the plugin delivers it right now, so the user sees proof
  // it works without waiting on an alarm.
  await LocalNotifications.schedule({
    notifications: [
      {
        id: ID_CONFIRM,
        title: t('notif.confirm.title'),
        body: t('notif.confirm.body'),
        channelId: CHANNEL_ID,
      },
    ],
  }).catch(() => undefined)
  return true
}
