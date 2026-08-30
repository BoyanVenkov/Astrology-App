import { useEffect, useState } from 'react'
import { AudioBridge } from './audio/AudioBridge'
import { Apothecary } from './components/Apothecary'
import { BodyCheckIn } from './components/BodyCheckIn'
import { Dashboard } from './components/Dashboard'
import { Horoscope } from './components/Horoscope'
import { Journal } from './components/Journal'
import { Layout } from './components/Layout'
import { Marketplace } from './components/Marketplace'
import { MoodCheckIn } from './components/MoodCheckIn'
import { MoodGate } from './components/MoodGate'
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
import { useLiveLocation, useLiveSky } from './lib/liveSky'
import { syncNotifications } from './lib/notifications'
import { usePrescription } from './lib/prescription'
import { localDayKey } from './lib/timezone'
import { useAppStore } from './store/useAppStore'
import type { RitualPreset, TabKey } from './types/resonance'

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
  | 'stones'
  | 'library'
  | 'journal'
  | 'mood'
  | 'body'
  | 'market'
  | 'settings'

function App() {
  const [tab, setTab] = useState<TabKey>('today')
  const [tabNonce, setTabNonce] = useState(0)
  const [sub, setSub] = useState<Sub>(null)
  const [practiceOpen, setPracticeOpen] = useState(false)
  const [ritual, setRitual] = useState<RitualPreset | null>(null)
  const [paywall, setPaywall] = useState<string | null>(null)
  const onboardingComplete = useAppStore((s) => s.onboardingComplete)
  const moodGateDay = useAppStore((s) => s.moodGateDay)
  const hasMoodToday = useAppStore((s) =>
    s.moodLog.some((m) => m.day === localDayKey()),
  )

  useLiveSky()
  useLiveLocation()
  useNotificationSync()

  const openPaywall = (reason?: string) =>
    setPaywall(reason ?? 'Unlock Resonance Pro')
  const goTab = (next: TabKey) => {
    if (next === tab && sub === null) setTabNonce((n) => n + 1)
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

  const moodGateOpen =
    !ritual && !hasMoodToday && moodGateDay !== localDayKey()
  if (moodGateOpen) {
    return <MoodGate onDone={() => setTabNonce((n) => n + 1)} />
  }

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
        onSettings={sub === null ? () => setSub('settings') : undefined}
      >
        {sub === 'chart' && <NatalChart onBack={back} />}
        {sub === 'horoscope' && (
          <Horoscope onBack={back} onRitual={launchRitual} />
        )}
        {sub === 'stones' && (
          <Apothecary
            onBack={back}
            onShop={() => setSub('market')}
            onPractice={() => setPracticeOpen(true)}
          />
        )}
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
            onStones={() => setSub('stones')}
          />
        )}
        {sub === null && tab === 'sky' && (
          <SkyView
            onTab={goTab}
            onOpenChart={() => setSub('chart')}
            onOpenHoroscope={() => setSub('horoscope')}
            onOpenStones={() => setSub('stones')}
            onRitual={launchRitual}
          />
        )}
        {sub === null && tab === 'tarot' && <TarotReader key={tabNonce} />}
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

export default App
