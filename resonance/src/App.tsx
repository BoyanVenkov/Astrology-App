import { useEffect, useState } from 'react'
import { App as CapApp } from '@capacitor/app'
import { AudioBridge } from './audio/AudioBridge'
import { Apothecary } from './components/Apothecary'
import { AuthSheet } from './components/AuthSheet'
import { ChakraField } from './components/ChakraField'
import { Compatibility } from './components/Compatibility'
import { Dashboard } from './components/Dashboard'
import { Horoscope } from './components/Horoscope'
import { Journal } from './components/Journal'
import { LanguageSheet } from './components/LanguageSheet'
import { Layout } from './components/Layout'
import { MoodCheckIn } from './components/MoodCheckIn'
import { MoodGate } from './components/MoodGate'
import { MoonScreen } from './components/MoonScreen'
import { FastingGuide } from './components/FastingGuide'
import { NatalChart } from './components/NatalChart'
import { Onboarding } from './components/Onboarding'
import { Paywall } from './components/Paywall'
import { PracticeLibrary } from './components/PracticeLibrary'
import { PracticeSheet } from './components/PracticeSheet'
import { Ritual } from './components/Ritual'
import { Settings } from './components/Settings'
import { SkyView } from './components/SkyView'
import { TarotReader } from './components/TarotReader'
import { Transits } from './components/Transits'
import { Welcome, Splash } from './components/Welcome'
import { YouView } from './components/YouView'
import { useAuth, useAuthDeepLink } from './lib/auth'
import { applyHtmlLang, useT } from './lib/i18n'
import { useLiveLocation, useLiveSky } from './lib/liveSky'
import { syncNotifications } from './lib/notifications'
import { useRevenueCat } from './lib/revenuecat'
import { useCloudSync } from './lib/sync'
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
  | 'chakras'
  | 'compat'
  | 'transits'
  | 'moon'
  | 'fasting'
  | 'stones'
  | 'library'
  | 'journal'
  | 'mood'
  | 'settings'

function App() {
  const [tab, setTab] = useState<TabKey>('today')
  const [tabNonce, setTabNonce] = useState(0)
  const [sub, setSub] = useState<Sub>(null)
  const [practiceOpen, setPracticeOpen] = useState(false)
  const [ritual, setRitual] = useState<RitualPreset | null>(null)
  const [paywall, setPaywall] = useState<string | null>(null)
  const [authOpen, setAuthOpen] = useState<'backup' | 'purchase' | null>(null)
  const [langOpen, setLangOpen] = useState(false)
  const auth = useAuth()
  const t = useT()
  const authSkipped = useAppStore((s) => s.authSkipped)
  const skipAuth = useAppStore((s) => s.skipAuth)
  const locale = useAppStore((s) => s.locale)
  const onboardingComplete = useAppStore((s) => s.onboardingComplete)
  const moodGateDay = useAppStore((s) => s.moodGateDay)
  const hasMoodToday = useAppStore((s) =>
    s.moodLog.some((m) => m.day === localDayKey()),
  )

  useLiveSky()
  useLiveLocation()
  useNotificationSync()
  useAuthDeepLink()
  useCloudSync()
  useRevenueCat(auth.user?.id ?? null)

  useEffect(() => {
    applyHtmlLang(locale)
  }, [locale])

  // Android hardware/gesture back: close whatever's on top, else step back
  // to the home tab, else exit — otherwise the OS just kills the app outright.
  useEffect(() => {
    const handle = CapApp.addListener('backButton', () => {
      if (langOpen) {
        setLangOpen(false)
        return
      }
      if (authOpen) {
        setAuthOpen(null)
        return
      }
      if (paywall) {
        setPaywall(null)
        return
      }
      if (practiceOpen) {
        setPracticeOpen(false)
        return
      }
      if (ritual) {
        setRitual(null)
        return
      }
      if (sub !== null) {
        setSub(null)
        return
      }
      if (tab !== 'today') {
        setTab('today')
        return
      }
      void CapApp.exitApp()
    })
    return () => {
      void handle.then((h) => h.remove())
    }
  }, [langOpen, authOpen, paywall, practiceOpen, ritual, sub, tab])

  const openPaywall = (reason?: string) => setPaywall(reason ?? t('pay.title'))
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

  // Sign-in is offered up front, but a guest can choose to explore first.
  // Buying Pro then requires an account (see the Paywall).
  if (auth.status === 'loading') return <Splash />
  if (auth.status === 'signed-out' && !authSkipped)
    return <Welcome onSkip={skipAuth} />

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
        practiceLabel={t('nav.practice')}
        onSettings={sub === null ? () => setSub('settings') : undefined}
      >
        {sub === 'chart' && <NatalChart onBack={back} />}
        {sub === 'horoscope' && (
          <Horoscope onBack={back} onRitual={launchRitual} />
        )}
        {sub === 'chakras' && (
          <ChakraField
            onBack={back}
            onRitual={launchRitual}
            onUpgrade={openPaywall}
          />
        )}
        {sub === 'compat' && <Compatibility onBack={back} />}
        {sub === 'transits' && <Transits onBack={back} />}
        {sub === 'moon' && (
          <MoonScreen onBack={back} onOpenFasting={() => setSub('fasting')} />
        )}
        {sub === 'fasting' && <FastingGuide onBack={() => setSub('moon')} />}
        {sub === 'stones' && (
          <Apothecary
            onBack={back}
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
        {sub === 'settings' && (
          <Settings
            onBack={back}
            onUpgrade={() => openPaywall()}
            onAuth={() => setAuthOpen('backup')}
            onLanguage={() => setLangOpen(true)}
          />
        )}

        {sub === null && tab === 'today' && (
          <Dashboard
            onRitual={launchRitual}
            onPracticeSheet={() => setPracticeOpen(true)}
            onTab={goTab}
            onStones={() => setSub('stones')}
            onChakras={() => setSub('chakras')}
          />
        )}
        {sub === null && tab === 'sky' && (
          <SkyView
            onOpenChart={() => setSub('chart')}
            onOpenHoroscope={() => setSub('horoscope')}
            onOpenChakras={() => setSub('chakras')}
            onOpenCompat={() => setSub('compat')}
            onOpenTransits={() => setSub('transits')}
            onOpenMoon={() => setSub('moon')}
            onOpenStones={() => setSub('stones')}
            onUpgrade={openPaywall}
          />
        )}
        {sub === null && tab === 'tarot' && (
          <TarotReader
            key={tabNonce}
            onUpgrade={() => openPaywall(t('pay.reasonSpreads'))}
          />
        )}
        {sub === null && tab === 'you' && (
          <YouView
            onOpen={setSub}
            onUpgrade={() => openPaywall()}
            onAuth={() => setAuthOpen('backup')}
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

      {paywall && (
        <Paywall
          reason={paywall}
          onClose={() => {
            setPaywall(null)
            setAuthOpen(null)
          }}
          onNeedAuth={() => setAuthOpen('purchase')}
        />
      )}

      {authOpen && auth.status !== 'signed-in' && (
        <AuthSheet reason={authOpen} onClose={() => setAuthOpen(null)} />
      )}

      {langOpen && <LanguageSheet onClose={() => setLangOpen(false)} />}
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
