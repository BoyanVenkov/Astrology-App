import { useState, type ReactNode } from 'react'
import { useAppStore } from '../store/useAppStore'
import { BodyCheckIn } from './BodyCheckIn'
import { bodyState } from '../lib/biometrics'
import { deleteAccount, signOut, useAuth } from '../lib/auth'
import { backupNow } from '../lib/sync'
import {
  ensureNotificationPermission,
  syncNotifications,
} from '../lib/notifications'
import { locationIsFresh, requestCurrentLocation } from '../lib/location'
import { useEntitlements } from '../lib/premium'
import { Screen } from './Screen'

interface SettingsProps {
  onBack: () => void
  onUpgrade: () => void
  onAuth: () => void
}

function Toggle({
  on,
  onChange,
  label,
  hint,
}: {
  on: boolean
  onChange: (v: boolean) => void
  label: string
  hint?: string
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!on)}
      className="flex w-full items-center justify-between gap-3 py-2 text-left"
    >
      <span>
        <span className="text-sm text-haze-100">{label}</span>
        {hint && <span className="block text-xs text-haze-400">{hint}</span>}
      </span>
      <span
        className={`h-6 w-10 shrink-0 rounded-full p-0.5 transition ${
          on ? 'bg-gold-500/60' : 'bg-white/15'
        }`}
      >
        <span
          className={`block h-5 w-5 rounded-full bg-white transition-transform ${
            on ? 'translate-x-4' : ''
          }`}
        />
      </span>
    </button>
  )
}

function Row({ children }: { children: ReactNode }) {
  return <div className="border-t border-white/8 first:border-0">{children}</div>
}

function Section({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section>
      <p className="eyebrow mb-2 px-1">{title}</p>
      <div className="glass-panel px-4 py-1">{children}</div>
    </section>
  )
}

const fieldCls =
  'rounded-xl border border-white/12 bg-midnight-950/60 px-3 py-2 text-sm text-white outline-none focus:border-gold-400/60'

export function Settings({ onBack, onUpgrade, onAuth }: SettingsProps) {
  const { status, user } = useAuth()
  const [acctBusy, setAcctBusy] = useState<null | 'backup' | 'out' | 'delete'>(
    null,
  )
  const [acctMsg, setAcctMsg] = useState<string | null>(null)

  const doBackup = async () => {
    setAcctBusy('backup')
    const ok = await backupNow()
    setAcctBusy(null)
    setAcctMsg(ok ? 'Backed up.' : 'Backup failed — check your connection.')
  }
  const doDelete = async () => {
    if (
      !window.confirm(
        'Permanently delete your account and everything backed up to the cloud? Data on this device is kept until you also erase it below.',
      )
    )
      return
    setAcctBusy('delete')
    const err = await deleteAccount()
    setAcctBusy(null)
    setAcctMsg(err ? `Deletion issue: ${err.message}` : 'Account deleted.')
  }

  const audio = useAppStore((s) => s.audio)
  const updateAudioPreferences = useAppStore((s) => s.updateAudioPreferences)
  const notifications = useAppStore((s) => s.notifications)
  const updateNotificationPrefs = useAppStore((s) => s.updateNotificationPrefs)
  const profile = useAppStore((s) => s.profile)
  const angles = useAppStore((s) => s.angles)
  const editProfile = useAppStore((s) => s.editProfile)
  const biometricLog = useAppStore((s) => s.biometricLog)
  const tier = useAppStore((s) => s.tier)
  const setTier = useAppStore((s) => s.setTier)
  const currentLocation = useAppStore((s) => s.currentLocation)
  const setCurrentLocation = useAppStore((s) => s.setCurrentLocation)
  const { isPro } = useEntitlements()

  const [showBody, setShowBody] = useState(false)
  const [notice, setNotice] = useState<string | null>(null)
  const [locMsg, setLocMsg] = useState<string | null>(null)
  const [locBusy, setLocBusy] = useState(false)

  const refreshLocation = async () => {
    setLocBusy(true)
    setLocMsg(null)
    const point = await requestCurrentLocation()
    setLocBusy(false)
    if (point) {
      setCurrentLocation(point)
      setLocMsg('Location updated — your reading now reflects where you are.')
    } else {
      setLocMsg('Couldn’t get a location. Check the app’s location permission.')
    }
  }

  const body = bodyState(biometricLog)

  const patchNotif = (patch: Partial<typeof notifications>) => {
    updateNotificationPrefs(patch)
    void syncNotifications({ ...notifications, ...patch })
  }

  const toggleNotifications = async (on: boolean) => {
    if (on) {
      const granted = await ensureNotificationPermission()
      if (!granted) {
        setNotice('Notifications are blocked in your OS settings.')
        return
      }
    }
    setNotice(null)
    patchNotif({ enabled: on })
  }

  const resetAll = () => {
    if (
      !window.confirm(
        'Erase your chart, practice history and preferences on this device?',
      )
    )
      return
    try {
      localStorage.removeItem('resonance-session')
    } catch {
      /* ignore */
    }
    window.location.reload()
  }

  return (
    <Screen eyebrow="Settings" title="Attune the app" onBack={onBack}>
      <Section title="Account">
        {status === 'signed-in' && user ? (
          <>
            <Row>
              <div className="flex items-center justify-between py-3 text-sm">
                <span>
                  <span className="text-haze-100">Signed in ✦</span>
                  <span className="block text-xs text-haze-400">
                    {user.email ?? 'account linked'} · backup on
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => void doBackup()}
                  disabled={acctBusy !== null}
                  className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.14em] text-haze-200 disabled:opacity-50"
                >
                  {acctBusy === 'backup' ? '…' : 'Back up now'}
                </button>
              </div>
            </Row>
            <Row>
              <button
                type="button"
                onClick={() => {
                  setAcctBusy('out')
                  void signOut().finally(() => setAcctBusy(null))
                }}
                className="w-full py-3 text-left text-sm text-haze-200"
              >
                Sign out
              </button>
            </Row>
            <Row>
              <button
                type="button"
                onClick={() => void doDelete()}
                disabled={acctBusy !== null}
                className="w-full py-3 text-left text-xs text-red-300 disabled:opacity-50"
              >
                {acctBusy === 'delete' ? 'Deleting…' : 'Delete account & cloud data'}
              </button>
            </Row>
          </>
        ) : (
          <Row>
            <div className="flex items-center justify-between py-3 text-sm">
              <span>
                <span className="text-haze-100">Not signed in</span>
                <span className="block text-xs text-haze-400">
                  Sign in to back up your chart, journal &amp; people
                </span>
              </span>
              <button
                type="button"
                onClick={onAuth}
                className="rounded-full border border-gold-400/50 bg-gold-500/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-gold-100"
              >
                Sign in
              </button>
            </div>
          </Row>
        )}
        {acctMsg && (
          <Row>
            <p className="py-3 text-xs text-haze-400">{acctMsg}</p>
          </Row>
        )}
      </Section>

      <Section title="Sound">
        <Row>
          <div className="py-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-haze-100">Master volume</span>
              <span className="tabular-nums text-haze-400">
                {Math.round(audio.masterVolume * 100)}%
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={audio.masterVolume}
              onChange={(e) =>
                updateAudioPreferences({ masterVolume: Number(e.target.value) })
              }
              className="mt-2 w-full accent-gold-400"
            />
          </div>
        </Row>
        <Row>
          <Toggle
            label="Ambient pad"
            hint="Low brown-noise bed under everything"
            on={audio.ambientPadEnabled}
            onChange={(v) => updateAudioPreferences({ ambientPadEnabled: v })}
          />
        </Row>
        <Row>
          <Toggle
            label="Breathing sound"
            hint="Synthesised inhale / exhale during breathwork"
            on={audio.breathVoice}
            onChange={(v) => updateAudioPreferences({ breathVoice: v })}
          />
        </Row>
        <Row>
          <div className="flex items-center justify-between py-3 text-sm">
            <span className="text-haze-100">Fade in / out</span>
            <select
              value={audio.fadeSeconds}
              onChange={(e) =>
                updateAudioPreferences({ fadeSeconds: Number(e.target.value) })
              }
              className={fieldCls}
            >
              {[1, 2, 3, 4].map((s) => (
                <option key={s} value={s}>
                  {s}s
                </option>
              ))}
            </select>
          </div>
        </Row>
      </Section>

      <Section title="Notifications">
        <Row>
          <Toggle
            label="Enable notifications"
            hint="Computed on-device from the sky — no server"
            on={notifications.enabled}
            onChange={(v) => void toggleNotifications(v)}
          />
        </Row>
        {notice && (
          <Row>
            <p className="py-3 text-xs text-haze-400">{notice}</p>
          </Row>
        )}
        {notifications.enabled && (
          <>
            <Row>
              <div className="flex items-center justify-between py-3 text-sm">
                <span className="text-haze-100">Morning reading</span>
                <input
                  type="time"
                  value={notifications.dailyReadingTime}
                  onChange={(e) =>
                    patchNotif({ dailyReadingTime: e.target.value })
                  }
                  disabled={!notifications.dailyReading}
                  className={fieldCls}
                />
              </div>
            </Row>
            <Row>
              <Toggle
                label="Morning reading nudge"
                on={notifications.dailyReading}
                onChange={(v) => patchNotif({ dailyReading: v })}
              />
            </Row>
            <Row>
              <div className="flex items-center justify-between py-3 text-sm">
                <span className="text-haze-100">Evening wind-down</span>
                <input
                  type="time"
                  value={notifications.eveningWindTime}
                  onChange={(e) =>
                    patchNotif({ eveningWindTime: e.target.value })
                  }
                  disabled={!notifications.eveningWind}
                  className={fieldCls}
                />
              </div>
            </Row>
            <Row>
              <Toggle
                label="Evening wind-down"
                on={notifications.eveningWind}
                onChange={(v) => patchNotif({ eveningWind: v })}
              />
            </Row>
            <Row>
              <Toggle
                label="New & Full Moon"
                on={notifications.moonPhases}
                onChange={(v) => patchNotif({ moonPhases: v })}
              />
            </Row>
            <Row>
              <Toggle
                label="Moon changes sign"
                hint="The emotional weather shifts"
                on={notifications.moonSignChange}
                onChange={(v) => patchNotif({ moonSignChange: v })}
              />
            </Row>
            <Row>
              <Toggle
                label="Void-of-course Moon"
                hint="A cue to ground, not to begin"
                on={notifications.voidOfCourse}
                onChange={(v) => patchNotif({ voidOfCourse: v })}
              />
            </Row>
          </>
        )}
      </Section>

      <Section title="Birth chart">
        <Row>
          <div className="flex items-center justify-between py-3 text-sm">
            <span>
              <span className="text-haze-100">
                {profile
                  ? `${profile.date} · ${profile.timeKnown ? profile.time : 'noon'}`
                  : 'Not set'}
              </span>
              <span className="block text-xs text-haze-400">
                {profile?.placeLabel ??
                  (profile ? 'no birth place' : 'transit-only readings')}
                {angles ? ` · ${angles.system} houses` : ''}
              </span>
            </span>
            <button
              type="button"
              onClick={editProfile}
              className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.14em] text-haze-200"
            >
              Edit
            </button>
          </div>
        </Row>
      </Section>

      <Section title="Location">
        <Row>
          <div className="flex items-center justify-between py-3 text-sm">
            <span>
              <span className="text-haze-100">
                {currentLocation
                  ? locationIsFresh(currentLocation)
                    ? `${currentLocation.lat.toFixed(2)}, ${currentLocation.lon.toFixed(2)}`
                    : 'Stored fix is stale'
                  : profile?.lat != null
                    ? 'Using your birth place'
                    : 'Not set'}
              </span>
              <span className="block text-xs text-haze-400">
                Powers “the sky above you now”, local sun times and a more
                precise reading
              </span>
            </span>
            <button
              type="button"
              onClick={() => void refreshLocation()}
              disabled={locBusy}
              className="shrink-0 rounded-full border border-gold-400/50 bg-gold-500/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-gold-100 disabled:opacity-50"
            >
              {locBusy ? '…' : 'Update'}
            </button>
          </div>
        </Row>
        {currentLocation && (
          <Row>
            <button
              type="button"
              onClick={() => setCurrentLocation(null)}
              className="w-full py-3 text-left text-xs text-haze-400"
            >
              Clear location · fall back to birth place
            </button>
          </Row>
        )}
        {locMsg && (
          <Row>
            <p className="py-3 text-xs text-haze-400">{locMsg}</p>
          </Row>
        )}
      </Section>

      <Section title="Body & recovery">
        <Row>
          <div className="flex items-center justify-between py-3 text-sm">
            <span>
              <span className="text-haze-100">
                {body.hasData
                  ? `${body.label} · ${Math.round(body.recovery * 100)}%`
                  : 'No reading yet'}
              </span>
              <span className="block text-xs text-haze-400">
                Enter your HRV, sleep &amp; resting heart rate — a low-recovery
                day shortens the practice
              </span>
            </span>
            <button
              type="button"
              onClick={() => setShowBody((v) => !v)}
              className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.14em] text-haze-200"
            >
              {showBody ? 'Close' : 'Log'}
            </button>
          </div>
        </Row>
        {showBody && (
          <Row>
            <div className="py-3">
              <BodyCheckIn compact onDone={() => setShowBody(false)} />
            </div>
          </Row>
        )}
      </Section>

      <Section title="Resonance Pro">
        <Row>
          <div className="flex items-center justify-between py-3 text-sm">
            <span>
              <span className="text-haze-100">
                {isPro ? 'Pro active ✦' : 'Free plan'}
              </span>
              <span className="block text-xs text-haze-400">
                {isPro
                  ? 'Full library, deep history'
                  : '3 tones · 7-day history'}
              </span>
            </span>
            {isPro ? (
              <button
                type="button"
                onClick={() => setTier('free')}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.14em] text-haze-200"
              >
                Lock (dev)
              </button>
            ) : (
              <button
                type="button"
                onClick={onUpgrade}
                className="rounded-full border border-gold-400/50 bg-gold-500/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-gold-100"
              >
                Upgrade
              </button>
            )}
          </div>
        </Row>
        {!isPro && (
          <Row>
            <button
              type="button"
              onClick={() => setTier('pro')}
              className="w-full py-3 text-left text-xs text-haze-400"
            >
              Dev: unlock Pro without paying →
            </button>
          </Row>
        )}
      </Section>

      <Section title="Data">
        <Row>
          <button
            type="button"
            onClick={resetAll}
            className="w-full py-3 text-left text-sm text-red-300"
          >
            Erase all data on this device
          </button>
        </Row>
      </Section>

      <p className="px-1 pb-2 text-center text-[11px] text-haze-500">
        Resonance · tier {tier}
      </p>
    </Screen>
  )
}
