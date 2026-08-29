import { useEffect, useState } from 'react'
import { AudioBridge } from './audio/AudioBridge'
import { audioEngine, SOLFEGGIO_PRESETS } from './audio/audioEngine'
import { BreathVisualizer } from './components/BreathVisualizer'
import { Dashboard } from './components/Dashboard'
import { Horoscope } from './components/Horoscope'
import { Journal } from './components/Journal'
import { Layout } from './components/Layout'
import { Marketplace } from './components/Marketplace'
import { MoodCheckIn } from './components/MoodCheckIn'
import { NatalChart } from './components/NatalChart'
import { Onboarding } from './components/Onboarding'
import { Paywall } from './components/Paywall'
import { Ritual } from './components/Ritual'
import { Settings } from './components/Settings'
import { LockIcon, PauseIcon, PlayIcon } from './components/icons'
import { ALL_CRYSTALS } from './data/esoteric'
import { BREATH_PATTERNS } from './lib/breathwork'
import { syncNotifications } from './lib/notifications'
import { useEntitlements } from './lib/premium'
import { chakraName } from './lib/resonanceData'
import { localDayKey } from './lib/timezone'
import { useAppStore } from './store/useAppStore'
import type { SolfeggioFrequency, TabKey } from './types/resonance'

function useMidnightRefresh() {
  const transit = useAppStore((s) => s.transit)
  const refreshDailyTransit = useAppStore((s) => s.refreshDailyTransit)
  useEffect(() => {
    if (transit && localDayKey(new Date(transit.window.start)) !== localDayKey()) {
      refreshDailyTransit()
    }
  }, [transit, refreshDailyTransit])
}

/** Keep OS notifications in step with the user's preferences (no-op on web). */
function useNotificationSync() {
  const notifications = useAppStore((s) => s.notifications)
  useEffect(() => {
    void syncNotifications(notifications)
  }, [notifications])
}

type DashView =
  | 'home'
  | 'chart'
  | 'horoscope'
  | 'journal'
  | 'mood'
  | 'settings'
  | 'market'

function App() {
  const [tab, setTab] = useState<TabKey>('dashboard')
  const [dashView, setDashView] = useState<DashView>('home')
  const [ritual, setRitual] = useState(false)
  const [paywall, setPaywall] = useState<string | null>(null)
  const onboardingComplete = useAppStore((s) => s.onboardingComplete)
  useMidnightRefresh()
  useNotificationSync()

  const openPaywall = (reason?: string) => setPaywall(reason ?? 'Unlock Resonance Pro')
  const goTab = (next: TabKey) => {
    setTab(next)
    setDashView('home')
  }
  const home = () => setDashView('home')
  const openSettings = () => {
    setTab('dashboard')
    setDashView('settings')
  }

  if (!onboardingComplete) return <Onboarding />
  if (ritual)
    return (
      <>
        <AudioBridge />
        <Ritual onExit={() => setRitual(false)} />
      </>
    )

  return (
    <>
      <AudioBridge />
      <Layout active={tab} onTabChange={goTab} onOpenSettings={openSettings}>
        {tab === 'dashboard' && dashView === 'home' && (
          <Dashboard
            onNavigate={goTab}
            onOpen={setDashView}
            onStartRitual={() => setRitual(true)}
          />
        )}
        {tab === 'dashboard' && dashView === 'chart' && (
          <NatalChart onBack={home} />
        )}
        {tab === 'dashboard' && dashView === 'horoscope' && (
          <Horoscope onBack={home} />
        )}
        {tab === 'dashboard' && dashView === 'journal' && (
          <Journal onBack={home} onUpgrade={openPaywall} />
        )}
        {tab === 'dashboard' && dashView === 'mood' && (
          <MoodCheckIn onDone={home} />
        )}
        {tab === 'dashboard' && dashView === 'market' && (
          <Marketplace onBack={home} />
        )}
        {tab === 'dashboard' && dashView === 'settings' && (
          <Settings onBack={home} onUpgrade={() => openPaywall()} />
        )}
        {tab === 'frequencies' && <FrequenciesView onUpgrade={openPaywall} />}
        {tab === 'breathwork' && (
          <BreathworkView onStartRitual={() => setRitual(true)} />
        )}
        {tab === 'apothecary' && (
          <ApothecaryView onOpenShop={() => setDashView('market')} onNavigate={goTab} />
        )}
      </Layout>

      {paywall && (
        <Paywall reason={paywall} onClose={() => setPaywall(null)} />
      )}
    </>
  )
}

/* ------------------------------------------------------------ frequencies */

function FrequenciesView({ onUpgrade }: { onUpgrade: (reason?: string) => void }) {
  const frequency = useAppStore((s) => s.frequency)
  const setFrequency = useAppStore((s) => s.setFrequency)
  const isPlaying = useAppStore((s) => s.isPlaying)
  const toggleAudio = useAppStore((s) => s.toggleAudio)
  const setAudioMode = useAppStore((s) => s.setAudioMode)
  const recommended = useAppStore((s) => s.transit?.recommendedFrequency)
  const { isPro, freeFrequencyCount } = useEntitlements()

  const tuneTo = (value: SolfeggioFrequency) => {
    audioEngine.unlock().catch(() => undefined)
    setAudioMode('tone')
    setFrequency(value)
    if (!isPlaying) toggleAudio(true)
  }

  return (
    <div className="flex flex-col gap-4">
      <header className="px-1">
        <p className="eyebrow">Solfeggio</p>
        <h1 className="mt-1 font-serif text-2xl text-gilded">
          Frequency Library
        </h1>
      </header>

      <button
        type="button"
        onClick={() => {
          audioEngine.unlock().catch(() => undefined)
          setAudioMode('tone')
          toggleAudio(!isPlaying)
        }}
        aria-pressed={isPlaying}
        className="glass-panel flex items-center justify-between p-4"
      >
        <span className="font-serif text-lg text-white">
          {isPlaying ? 'Playing' : 'Paused'} ·{' '}
          <span className="tabular-nums text-gilded">{frequency} Hz</span>
        </span>
        <span className="grid h-10 w-10 place-items-center rounded-full bg-gold-500/20 text-gold-100">
          {isPlaying ? (
            <PauseIcon className="h-4 w-4" />
          ) : (
            <PlayIcon className="h-4 w-4" />
          )}
        </span>
      </button>

      <ul className="flex flex-col gap-2">
        {SOLFEGGIO_PRESETS.map((preset, i) => {
          const active = preset.frequency === frequency
          const unlocked =
            isPro || i < freeFrequencyCount || preset.frequency === recommended
          return (
            <li key={preset.frequency}>
              <button
                type="button"
                onClick={() =>
                  unlocked
                    ? tuneTo(preset.frequency)
                    : onUpgrade('The full frequency library')
                }
                className={`glass-panel flex w-full items-center justify-between p-4 text-left transition active:scale-[0.99] ${
                  active ? 'glass-panel-active' : ''
                } ${unlocked ? '' : 'opacity-60'}`}
              >
                <div>
                  <p className="font-sans text-lg font-semibold tabular-nums text-white">
                    {preset.name}
                  </p>
                  <p className="text-xs text-haze-300">{preset.intention}</p>
                </div>
                {unlocked ? (
                  <span
                    className={`text-[10px] uppercase tracking-[0.14em] ${
                      active ? 'text-gold-300' : 'text-haze-400'
                    }`}
                  >
                    {active ? 'Active' : 'Tune'}
                  </span>
                ) : (
                  <LockIcon className="h-4 w-4 text-haze-400" />
                )}
              </button>
            </li>
          )
        })}
      </ul>
      {!isPro && (
        <button
          type="button"
          onClick={() => onUpgrade('The full frequency library')}
          className="glass-panel p-4 text-left text-sm text-gold-200"
        >
          ✦ Unlock all {SOLFEGGIO_PRESETS.length} tones with Pro →
        </button>
      )}
    </div>
  )
}

/* -------------------------------------------------------------- breathwork */

function BreathworkView({ onStartRitual }: { onStartRitual: () => void }) {
  const transit = useAppStore((s) => s.transit)
  const breathPattern = useAppStore((s) => s.breathPattern)
  const suggestedPattern = useAppStore((s) => s.suggestedPattern)
  const setBreathPattern = useAppStore((s) => s.setBreathPattern)

  const suggested = BREATH_PATTERNS[suggestedPattern]
  const showNudge = suggestedPattern !== breathPattern

  return (
    <div className="flex flex-col gap-4">
      <header className="px-1">
        <p className="eyebrow">Guided Practice</p>
        <h1 className="mt-1 font-serif text-2xl text-gilded">Breathwork</h1>
        {transit && (
          <p className="mt-1 text-sm text-haze-300">
            Breathe along — the sound follows each inhale and exhale
          </p>
        )}
      </header>

      <button
        type="button"
        onClick={onStartRitual}
        className="glass-panel glass-panel-active flex items-center justify-between p-4 text-left active:scale-[0.99]"
      >
        <span>
          <span className="font-serif text-lg text-white">
            Start a timed session
          </span>
          <span className="block text-xs text-haze-300">
            {suggested.name} · 3, 6 or 10 min · logged to your streak
          </span>
        </span>
        <span className="text-gold-300">›</span>
      </button>

      {showNudge && (
        <button
          type="button"
          onClick={() => setBreathPattern(suggestedPattern)}
          className="glass-panel flex items-center justify-between gap-3 p-3 text-left active:scale-[0.99]"
        >
          <span className="text-sm text-haze-200">
            Today’s sky suggests{' '}
            <span className="text-gold-200">{suggested.name}</span> ({suggested.ratio})
          </span>
          <span className="shrink-0 text-[10px] uppercase tracking-[0.14em] text-gold-300">
            Use it
          </span>
        </button>
      )}

      {/* open-ended practice; remount on pattern change for a clean timeline */}
      <BreathVisualizer key={breathPattern} />
    </div>
  )
}

/* -------------------------------------------------------------- apothecary */

function ApothecaryView({
  onOpenShop,
  onNavigate,
}: {
  onOpenShop: () => void
  onNavigate: (tab: TabKey) => void
}) {
  const dailyCrystals = useAppStore((s) => s.dailyCrystals)
  const todayNames = new Set(dailyCrystals.map((crystal) => crystal.name))

  return (
    <div className="flex flex-col gap-4">
      <header className="flex items-start justify-between px-1">
        <div>
          <p className="eyebrow">Apothecary</p>
          <h1 className="mt-1 font-serif text-2xl text-gilded">
            Crystal Companions
          </h1>
          <p className="mt-1 text-sm text-haze-300">
            Highlighted stones resonate with today’s transit.
          </p>
        </div>
        <button
          type="button"
          onClick={onOpenShop}
          className="shrink-0 text-[10px] uppercase tracking-[0.14em] text-gold-300 active:text-gold-100"
        >
          Shop ›
        </button>
      </header>

      <div className="flex flex-col gap-3">
        {ALL_CRYSTALS.map((crystal) => {
          const isToday = todayNames.has(crystal.name)
          return (
            <article
              key={crystal.id}
              className={`glass-panel p-4 ${isToday ? 'glass-panel-active' : ''}`}
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{
                    background: crystal.color,
                    boxShadow: `0 0 10px ${crystal.color}`,
                  }}
                />
                <h3 className="font-serif text-lg text-white">{crystal.name}</h3>
                {isToday && (
                  <span className="ml-auto text-[10px] uppercase tracking-[0.14em] text-gold-300">
                    Today
                  </span>
                )}
              </div>
              <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-haze-400">
                {chakraName(crystal.chakra)} · {crystal.keywords.join(' · ')}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-haze-200">
                {crystal.description}
              </p>
            </article>
          )
        })}
      </div>

      <button
        type="button"
        onClick={() => onNavigate('breathwork')}
        className="text-center text-xs uppercase tracking-[0.14em] text-haze-500"
      >
        pair a stone with today’s breathwork →
      </button>
    </div>
  )
}

export default App
