import { useEffect, useState } from 'react'
import { AudioBridge } from './audio/AudioBridge'
import { BodyCheckIn } from './components/BodyCheckIn'
import { Dashboard } from './components/Dashboard'
import { Horoscope } from './components/Horoscope'
import { Journal } from './components/Journal'
import { Layout } from './components/Layout'
import { Marketplace } from './components/Marketplace'
import { MoodCheckIn } from './components/MoodCheckIn'
import { NatalChart } from './components/NatalChart'
import { Onboarding } from './components/Onboarding'
import { Paywall } from './components/Paywall'
import { PracticeLibrary } from './components/PracticeLibrary'
import { PracticeSheet } from './components/PracticeSheet'
import { Ritual } from './components/Ritual'
import { Settings } from './components/Settings'
import { SkyView } from './components/SkyView'
import { TarotReader } from './components/TarotReader'
import { YouView } from './components/YouView'
import { ALL_CRYSTALS } from './data/esoteric'
import { syncNotifications } from './lib/notifications'
import { usePrescription } from './lib/prescription'
import { chakraName } from './lib/resonanceData'
import { localDayKey } from './lib/timezone'
import { useAppStore } from './store/useAppStore'
import type { RitualPreset, TabKey } from './types/resonance'

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
  | 'tarot'
  | 'library'
  | 'journal'
  | 'mood'
  | 'body'
  | 'market'
  | 'settings'

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
        <Ritual
          preset={ritual}
          onExit={() => setRitual(null)}
          onUpgrade={openPaywall}
        />
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
        {sub === 'horoscope' && (
          <Horoscope onBack={back} onRitual={launchRitual} />
        )}
        {sub === 'tarot' && <TarotReader onBack={back} />}
        {sub === 'library' && (
          <PracticeLibrary
            onBack={back}
            onLaunch={launchRitual}
            onUpgrade={openPaywall}
          />
        )}
        {sub === 'journal' && <Journal onBack={back} onUpgrade={openPaywall} />}
        {sub === 'mood' && <MoodCheckIn onDone={back} />}
        {sub === 'body' && <BodyCheckIn onDone={back} />}
        {sub === 'market' && <Marketplace onBack={back} />}
        {sub === 'settings' && (
          <Settings onBack={back} onUpgrade={() => openPaywall()} />
        )}

        {sub === null && tab === 'today' && (
          <Dashboard
            onRitual={launchRitual}
            onPracticeSheet={() => setPracticeOpen(true)}
            onTab={goTab}
            onTarot={() => setSub('tarot')}
          />
        )}
        {sub === null && tab === 'sky' && (
          <SkyView
            onOpenChart={() => setSub('chart')}
            onOpenHoroscope={() => setSub('horoscope')}
            onOpenTarot={() => setSub('tarot')}
            onRitual={launchRitual}
          />
        )}
        {sub === null && tab === 'apothecary' && (
          <ApothecaryView
            onOpenShop={() => setSub('market')}
            onPractice={() => setPracticeOpen(true)}
          />
        )}
        {sub === null && tab === 'you' && (
          <YouView
            onOpen={setSub}
            onUpgrade={() => openPaywall()}
            onRitual={launchRitual}
          />
        )}
      </Layout>

      {practiceOpen && (
        <PracticeLauncher
          onClose={() => setPracticeOpen(false)}
          onRitual={(l) => launchRitual(l)}
          onLibrary={() => {
            setPracticeOpen(false)
            setSub('library')
          }}
        />
      )}

      {paywall && <Paywall reason={paywall} onClose={() => setPaywall(null)} />}
    </>
  )
}

function PracticeLauncher(props: {
  onClose: () => void
  onRitual: (l: RitualPreset) => void
  onLibrary: () => void
}) {
  const prescription = usePrescription()
  return <PracticeSheet prescription={prescription} {...props} />
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
