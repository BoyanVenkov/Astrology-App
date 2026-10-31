import { useEffect, useLayoutEffect, useState } from 'react'
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
import { Layout, type NavSub } from './components/Layout'
import { MoodCheckIn } from './components/MoodCheckIn'
import { MoodGate } from './components/MoodGate'
import { MoonScreen } from './components/MoonScreen'
import { FastingGuide } from './components/FastingGuide'
import { NatalChart } from './components/NatalChart'
import { Onboarding } from './components/Onboarding'
import { OracleAI } from './components/OracleAI'
import { Paywall } from './components/Paywall'
import { PracticeLibrary } from './components/PracticeLibrary'
import { PracticeSheet } from './components/PracticeSheet'
import { Ritual } from './components/Ritual'
import { Settings } from './components/Settings'
import { SkyView } from './components/SkyView'
import { TarotReader } from './components/TarotReader'
import { RuneReader } from './components/RuneReader'
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
import { useEntitlements } from './lib/premium'
import { useOverlayOpen } from './lib/overlayLock'
import { localDayKey } from './lib/timezone'
import { useAppStore } from './store/useAppStore'
import type { RitualPreset, TabKey } from './types/resonance'

function useNotificationSync() {
  const t = useT()
  const notifications = useAppStore((s) => s.notifications)
  useEffect(() => {
    void syncNotifications(notifications, t)
  }, [notifications, t])
}

/**
 * Every pushed screen belongs to one section — the dock / sidebar lights that
 * section while the screen is open. `null` = it belongs to wherever you were
 * (the practice library sits under the orb, not a tab).
 */
const SUB_PARENT: Record<Exclude<Sub, null>, TabKey | null> = {
  chart: 'sky',
  horoscope: 'sky',
  oracle: 'sky',
  chakras: 'sky',
  compat: 'sky',
  transits: 'sky',
  moon: 'sky',
  fasting: 'sky',
  stones: null,
  library: null,
  runes: 'tarot',
  journal: 'you',
  mood: 'you',
  settings: 'you',
}

type Sub =
  | null
  | 'chart'
  | 'horoscope'
  | 'oracle'
  | 'chakras'
  | 'compat'
  | 'transits'
  | 'moon'
  | 'fasting'
  | 'stones'
  | 'library'
  | 'journal'
  | 'mood'
  | 'runes'
  | 'settings'

function App() {
  const [tab, setTab] = useState<TabKey>('today')
  const [tabNonce, setTabNonce] = useState(0)
  const [sub, setSub] = useState<Sub>(null)
  // where Back returns to — the tab you were on when you opened the screen
  const [origin, setOrigin] = useState<TabKey>('today')
  const [practiceOpen, setPracticeOpen] = useState(false)
  const [ritual, setRitual] = useState<RitualPreset | null>(null)
  const [paywall, setPaywall] = useState<string | null>(null)
  const [authOpen, setAuthOpen] = useState<'backup' | 'purchase' | null>(null)
  const [langOpen, setLangOpen] = useState(false)
  const auth = useAuth()
  const t = useT()
  const { isPro } = useEntitlements()
  const overlayOpen = useOverlayOpen()
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
  useRevenueCat(auth.status === 'loading' ? undefined : (auth.user?.id ?? null))

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
      if (sub === 'fasting') {
        setSub('moon')
        return
      }
      if (sub !== null) {
        setSub(null)
        setTab(origin)
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
  }, [langOpen, authOpen, paywall, practiceOpen, ritual, sub, tab, origin])

  // Every screen change starts at the top — the page scrolls the window, so
  // without this a new screen opened at the previous one's scroll depth.
  // Layout effect: reset before paint, so there's no flash mid-page.
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [tab, sub, tabNonce, ritual])

  // Keyboard: Esc steps back out of a pushed screen, same as the chevron.
  // Sheets / pickers own their Esc, so stand aside while any is open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape' || sub === null) return
      if (langOpen || authOpen || paywall || practiceOpen || ritual || overlayOpen)
        return
      if (sub === 'fasting') {
        setSub('moon')
        return
      }
      setSub(null)
      setTab(origin)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [langOpen, authOpen, paywall, practiceOpen, ritual, overlayOpen, sub, origin])

  const openPaywall = (reason?: string) => setPaywall(reason ?? t('pay.title'))
  const goTab = (next: TabKey) => {
    if (next === tab && sub === null) setTabNonce((n) => n + 1)
    setTab(next)
    setSub(null)
    setPracticeOpen(false)
  }
  const back = () => {
    setSub(null)
    setTab(origin)
  }
  /** Push a screen: light its own section, remember where Back should land. */
  const push = (next: Exclude<Sub, null>) => {
    if (sub === null) setOrigin(tab)
    setPracticeOpen(false)
    setTab(SUB_PARENT[next] ?? tab)
    setSub(next)
  }
  // One entry point for every shortcut into a pushed screen (sidebar,
  // dashboard widgets) — the Pro gates live here, not at each call site.
  const openSub = (next: NavSub) => {
    if (next === 'horoscope' && !isPro) return openPaywall(t('sky.reasonHoroscope'))
    if (next === 'compat' && !isPro) return openPaywall(t('sky.reasonCompat'))
    push(next)
  }
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
        sub={sub}
        onTabChange={goTab}
        onOpen={openSub}
        onPractice={() => setPracticeOpen(true)}
        practiceLabel={t('nav.practice')}
        onSettings={sub === null ? () => push('settings') : undefined}
      >
        {sub === 'chart' && <NatalChart onBack={back} />}
        {sub === 'horoscope' && (
          <Horoscope onBack={back} onRitual={launchRitual} onUpgrade={openPaywall} />
        )}
        {sub === 'oracle' && (
          <OracleAI onBack={back} onUpgrade={openPaywall} />
        )}
        {sub === 'chakras' && (
          <ChakraField
            onBack={back}
            onRitual={launchRitual}
            onUpgrade={openPaywall}
          />
        )}
        {sub === 'compat' && (
          <Compatibility onBack={back} onUpgrade={openPaywall} />
        )}
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
        {sub === 'journal' && (
          <Journal onBack={back} onUpgrade={openPaywall} onStart={() => setPracticeOpen(true)} />
        )}
        {sub === 'mood' && <MoodCheckIn onDone={back} />}
        {sub === 'runes' && (
          <RuneReader onBack={back} onUpgrade={openPaywall} />
        )}
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
            onUpgrade={openPaywall}
            onTab={goTab}
            onOpen={openSub}
            onChakras={() => push('chakras')}
          />
        )}
        {sub === null && tab === 'sky' && (
          <SkyView
            onOpenChart={() => push('chart')}
            onOpenHoroscope={() => push('horoscope')}
            onOpenOracle={() => push('oracle')}
            onOpenChakras={() => push('chakras')}
            onOpenCompat={() => push('compat')}
            onOpenTransits={() => push('transits')}
            onOpenMoon={() => push('moon')}
            onUpgrade={openPaywall}
          />
        )}
        {sub === null && tab === 'tarot' && (
          <TarotReader
            key={tabNonce}
            onUpgrade={() => openPaywall(t('pay.reasonSpreads'))}
            onOpenRunes={() => push('runes')}
          />
        )}
        {sub === null && tab === 'you' && (
          <YouView
            onOpen={push}
            onUpgrade={() => openPaywall()}
            onAuth={() => setAuthOpen('backup')}
          />
        )}
      </Layout>

      {practiceOpen && (
        <PracticeLauncher
          onClose={() => setPracticeOpen(false)}
          onRitual={(l) => launchRitual(l)}
          onUpgrade={openPaywall}
          onLibrary={() => push('library')}
          onStones={() => push('stones')}
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
  onUpgrade: (reason?: string) => void
  onLibrary: () => void
  onStones: () => void
}) {
  const prescription = usePrescription()
  return <PracticeSheet prescription={prescription} {...props} />
}

export default App
