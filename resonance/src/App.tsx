import { useEffect, useState } from 'react'
import { AudioBridge } from './audio/AudioBridge'
import { audioEngine, SOLFEGGIO_PRESETS } from './audio/audioEngine'
import { BodyCheckIn } from './components/BodyCheckIn'
import { Dashboard } from './components/Dashboard'
import { Horoscope } from './components/Horoscope'
import { Journal } from './components/Journal'
import { Layout } from './components/Layout'
import { Marketplace } from './components/Marketplace'
import { MoodCheckIn } from './components/MoodCheckIn'
import { NatalChart } from './components/NatalChart'
import { Onboarding } from './components/Onboarding'
import { OracleReader } from './components/OracleReader'
import { Paywall } from './components/Paywall'
import { PracticeSheet, type RitualLaunch } from './components/PracticeSheet'
import { Ritual, type RitualPreset } from './components/Ritual'
import { Settings } from './components/Settings'
import { SkyView } from './components/SkyView'
import { YouView } from './components/YouView'
import { LockIcon, PauseIcon, PlayIcon } from './components/icons'
import { ALL_CRYSTALS } from './data/esoteric'
import { syncNotifications } from './lib/notifications'
import { usePrescription } from './lib/prescription'
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
    const onFocus = () => {
      const t = useAppStore.getState().transit
      if (t && localDayKey(new Date(t.window.start)) !== localDayKey()) {
        useAppStore.getState().refreshDailyTransit()
      }
    }
    window.addEventListener('visibilitychange', onFocus)
    return () => window.removeEventListener('visibilitychange', onFocus)
  }, [transit, refreshDailyTransit])
}

function useNotificationSync() {
  const notifications = useAppStore((s) => s.notifications)
  useEffect(() => {
    void syncNotifications(notifications)
  }, [notifications])
}

type Sub =
  | null
  | 'chart'
  | 'horoscope'
  | 'oracle'
  | 'journal'
  | 'mood'
  | 'body'
  | 'market'
  | 'settings'
  | 'frequency'

function App() {
  const [tab, setTab] = useState<TabKey>('today')
  const [sub, setSub] = useState<Sub>(null)
  const [practiceOpen, setPracticeOpen] = useState(false)
  const [ritual, setRitual] = useState<RitualPreset | null>(null)
  const [paywall, setPaywall] = useState<string | null>(null)
  const onboardingComplete = useAppStore((s) => s.onboardingComplete)

  useMidnightRefresh()
  useNotificationSync()

  const openPaywall = (reason?: string) =>
    setPaywall(reason ?? 'Unlock Resonance Pro')
  const goTab = (next: TabKey) => {
    setTab(next)
    setSub(null)
    setPracticeOpen(false)
  }
  const back = () => setSub(null)
  const launchRitual = (preset: RitualPreset) => {
    setPracticeOpen(false)
    setRitual(preset)
  }

  if (!onboardingComplete) return <Onboarding />
  if (ritual)
    return (
      <>
        <AudioBridge />
        <Ritual preset={ritual} onExit={() => setRitual(null)} />
      </>
    )

  return (
    <>
      <AudioBridge />
      <Layout
        active={tab}
        onTabChange={goTab}
        onPractice={() => setPracticeOpen(true)}
        practiceLabel="today's ritual"
      >
        {sub === 'chart' && <NatalChart onBack={back} />}
        {sub === 'horoscope' && <Horoscope onBack={back} />}
        {sub === 'oracle' && (
          <OracleReader
            onBack={back}
            onPractice={() => setPracticeOpen(true)}
          />
        )}
        {sub === 'journal' && <Journal onBack={back} onUpgrade={openPaywall} />}
        {sub === 'mood' && <MoodCheckIn onDone={back} />}
        {sub === 'body' && <BodyCheckIn onDone={back} />}
        {sub === 'market' && <Marketplace onBack={back} />}
        {sub === 'settings' && (
          <Settings onBack={back} onUpgrade={() => openPaywall()} />
        )}
        {sub === 'frequency' && (
          <FrequenciesView onBack={back} onUpgrade={openPaywall} />
        )}

        {sub === null && tab === 'today' && (
          <Dashboard
            onRitual={launchRitual}
            onPracticeSheet={() => setPracticeOpen(true)}
            onTab={goTab}
            onOracle={() => setSub('oracle')}
          />
        )}
        {sub === null && tab === 'sky' && (
          <SkyView
            onOpenChart={() => setSub('chart')}
            onOpenHoroscope={() => setSub('horoscope')}
            onOpenOracle={() => setSub('oracle')}
          />
        )}
        {sub === null && tab === 'apothecary' && (
          <ApothecaryView
            onOpenShop={() => setSub('market')}
            onPractice={() => setPracticeOpen(true)}
          />
        )}
        {sub === null && tab === 'you' && (
          <YouView onOpen={setSub} onUpgrade={() => openPaywall()} />
        )}
      </Layout>

      {practiceOpen && (
        <PracticeLauncher
          onClose={() => setPracticeOpen(false)}
          onRitual={(l) => launchRitual(l)}
          onFrequency={() => {
            setPracticeOpen(false)
            setSub('frequency')
          }}
        />
      )}

      {paywall && <Paywall reason={paywall} onClose={() => setPaywall(null)} />}
    </>
  )
}

function PracticeLauncher(props: {
  onClose: () => void
  onRitual: (l: RitualLaunch) => void
  onFrequency: () => void
}) {
  const prescription = usePrescription()
  return <PracticeSheet prescription={prescription} {...props} />
}

/* ------------------------------------------------------------ frequencies */

function FrequenciesView({
  onBack,
  onUpgrade,
}: {
  onBack: () => void
  onUpgrade: (reason?: string) => void
}) {
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
      <button
        type="button"
        onClick={onBack}
        className="self-start text-xs uppercase tracking-[0.14em] text-gold-300 active:text-gold-100"
      >
        ‹ Back
      </button>
      <header className="px-1">
        <p className="eyebrow">Solfeggio</p>
        <h1 className="mt-1 font-serif text-2xl text-gilded">Frequency Library</h1>
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
        <span
          className="grid h-10 w-10 place-items-center rounded-full text-midnight-void"
          style={{ background: 'var(--rz-hue)' }}
        >
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
                    className="text-[10px] uppercase tracking-[0.14em]"
                    style={{ color: active ? 'var(--rz-hue)' : undefined }}
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

/* -------------------------------------------------------------- apothecary */

function ApothecaryView({
  onOpenShop,
  onPractice,
}: {
  onOpenShop: () => void
  onPractice: () => void
}) {
  const dailyCrystals = useAppStore((s) => s.dailyCrystals)
  const transit = useAppStore((s) => s.transit)
  const todayNames = new Set(dailyCrystals.map((crystal) => crystal.name))

  const featured = [
    ...ALL_CRYSTALS.filter((c) => todayNames.has(c.name)),
    ...ALL_CRYSTALS.filter((c) => !todayNames.has(c.name)),
  ]

  return (
    <div className="flex flex-col gap-4">
      <header className="flex items-start justify-between px-1">
        <div>
          <p className="eyebrow">Apothecary</p>
          <h1 className="mt-1 font-serif text-2xl text-gilded">
            Crystal Companions
          </h1>
          <p className="mt-1 text-sm text-haze-300">
            {transit
              ? `Stones for ${chakraName(transit.resonantChakra)} work today.`
              : 'Highlighted stones resonate with today’s transit.'}
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
        {featured.map((crystal) => {
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
        onClick={onPractice}
        className="text-center text-xs uppercase tracking-[0.14em] text-haze-500"
      >
        pair a stone with today’s practice →
      </button>
    </div>
  )
}

export default App
