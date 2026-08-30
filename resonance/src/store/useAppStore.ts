import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type {
  AstrologicalTransit,
  AudioMode,
  AudioPreferences,
  BiometricReading,
  BirthProfile,
  BreathPatternKey,
  ChakraState,
  Crystal,
  GeoPoint,
  MoodEntry,
  NotificationPreferences,
  PracticeSession,
  PremiumTier,
  ResonanceSession,
  SavedPerson,
  SolfeggioFrequency,
} from '../types/resonance'
import { computeDailyReading, type Aspect } from '../lib/astrology'
import type { BodyName, BodyPosition } from '../lib/ephemeris'
import type { ChartAngles } from '../lib/houses'
import { localDayKey } from '../lib/timezone'

const DEFAULT_AUDIO: AudioPreferences = {
  masterVolume: 0.5,
  ambientPadEnabled: true,
  ambientPadLevel: 0.12,
  fadeSeconds: 2,
  breathVoice: true,
}

const DEFAULT_NOTIFICATIONS: NotificationPreferences = {
  enabled: false,
  dailyReading: true,
  dailyReadingTime: '08:00',
  moonPhases: true,
  moonSignChange: false,
  voidOfCourse: true,
  eveningWind: true,
  eveningWindTime: '21:00',
}

const SESSION_LOG_CAP = 120

const newSessionId = (): string =>
  globalThis.crypto?.randomUUID?.() ?? `session_${Date.now().toString(36)}`

/** Derived sky data — recomputed on every load + on the live-sky ticker, never persisted. */
export interface SkyState {
  aspects: Aspect[]
  sky: BodyPosition[]
  natal: BodyPosition[]
  natalAspects: Aspect[]
  angles: ChartAngles | null
  nowAngles: ChartAngles | null
  transitHouses: Partial<Record<BodyName, number>>
  hasLocation: boolean
  hasNatal: boolean
  /** epoch ms — when the sky/transit/reading was last computed. */
  skyComputedAt: number
}

/** Everything the daily transit computation produces, ready to spread into state. */
interface ReadingSlice extends SkyState {
  transit: AstrologicalTransit
  chakra: ChakraState
  dailyCrystals: Crystal[]
  suggestedPattern: BreathPatternKey
}

const readingSlice = (
  profile: BirthProfile | null,
  currentLocation: GeoPoint | null,
): ReadingSlice => {
  const reading = computeDailyReading(profile, new Date(), currentLocation)
  return {
    transit: reading.transit,
    chakra: reading.chakra,
    dailyCrystals: reading.crystals,
    suggestedPattern: reading.suggestedPattern,
    aspects: reading.aspects,
    sky: reading.sky,
    natal: reading.natal,
    natalAspects: reading.natalAspects,
    angles: reading.angles,
    nowAngles: reading.nowAngles,
    transitHouses: reading.transitHouses,
    hasLocation: reading.hasLocation,
    hasNatal: reading.hasNatal,
    skyComputedAt: Date.now(),
  }
}

const createSession = (): ResonanceSession & SkyState => {
  const slice = readingSlice(null, null)
  return {
    aspects: slice.aspects,
    sky: slice.sky,
    natal: slice.natal,
    natalAspects: slice.natalAspects,
    angles: slice.angles,
    nowAngles: slice.nowAngles,
    transitHouses: slice.transitHouses,
    hasLocation: slice.hasLocation,
    hasNatal: slice.hasNatal,
    skyComputedAt: slice.skyComputedAt,
    id: newSessionId(),
    startedAt: new Date().toISOString(),
    chakra: slice.chakra,
    transit: slice.transit,
    frequency: slice.transit.recommendedFrequency,
    isPlaying: false,
    audioMode: 'tone',
    breathPattern: 'box',
    suggestedPattern: slice.suggestedPattern,
    dailyCrystals: slice.dailyCrystals,
    profile: null,
    onboardingComplete: false,
    audio: DEFAULT_AUDIO,
    completedSessions: 0,
    lastCompletedAt: null,
    sessionLog: [],
    moodLog: [],
    biometricLog: [],
    currentLocation: null,
    notifications: DEFAULT_NOTIFICATIONS,
    tier: 'free',
    tarotDrawnDay: null,
    moodGateDay: null,
    people: [],
  }
}

interface ResonanceActions {
  /** Set the chakra currently in focus. */
  setChakraState: (chakra: ChakraState) => void
  /** Apply an astrological transit; also suggests a tone when idle. */
  setTransit: (transit: AstrologicalTransit) => void
  /** Choose a Solfeggio tone. */
  setFrequency: (frequency: SolfeggioFrequency) => void
  /** Choose the guided breath pattern. */
  setBreathPattern: (key: BreathPatternKey) => void
  /** Reflect the audio engine's play/stop state. */
  toggleAudio: (isPlaying: boolean) => void
  /** Switch the engine between the pure tone and breath sounds. */
  setAudioMode: (mode: AudioMode) => void
  /** Patch audio preferences. */
  updateAudioPreferences: (prefs: Partial<AudioPreferences>) => void
  /** Record a finished (or abandoned) guided practice. */
  logPractice: (session: PracticeSession) => void
  /** Record today's mood check-in (replaces any earlier one for the same day). */
  logMood: (entry: MoodEntry) => void
  /** Record a body reading (replaces any earlier one for the same day). */
  logBiometrics: (reading: BiometricReading) => void
  /** Patch notification preferences. */
  updateNotificationPrefs: (prefs: Partial<NotificationPreferences>) => void
  /** Set the entitlement tier (called by the purchase flow / dev unlock). */
  setTier: (tier: PremiumTier) => void
  /** Update the current location and recompute the reading against it. */
  setCurrentLocation: (location: GeoPoint | null) => void
  /** Save natal data and recompute today's reading against it. */
  setProfile: (profile: BirthProfile) => void
  /** Re-open the birth-details form. */
  editProfile: () => void
  /** Continue without a natal chart (transit-only readings). */
  skipOnboarding: () => void
  /** Recompute the daily transit / chakra / crystals (call when the day rolls over). */
  refreshDailyTransit: () => void
  /** Mark that today's daily tarot card has been turned. */
  markTarotDrawn: () => void
  /** Mark today's mood gate handled (answered or skipped) so it stops asking. */
  dismissMoodGate: () => void
  /** Save someone for chart-compatibility readings. */
  addPerson: (person: SavedPerson) => void
  /** Forget a saved person. */
  removePerson: (id: string) => void
  /** Mark the current session finished and start a fresh one. */
  endSession: () => void
}

export type AppStore = ResonanceSession & SkyState & ResonanceActions

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      ...createSession(),

      setChakraState: (chakra) => set({ chakra }),

      setTransit: (transit) =>
        set((state) => ({
          transit,
          frequency: state.isPlaying
            ? state.frequency
            : transit.recommendedFrequency,
        })),

      setFrequency: (frequency) => set({ frequency }),

      setBreathPattern: (breathPattern) => set({ breathPattern }),

      toggleAudio: (isPlaying) => set({ isPlaying }),

      setAudioMode: (audioMode) => set({ audioMode }),

      updateAudioPreferences: (prefs) =>
        set((state) => ({ audio: { ...state.audio, ...prefs } })),

      logPractice: (session) =>
        set((state) => {
          const completedSessions =
            state.completedSessions + (session.completed ? 1 : 0)
          return {
            sessionLog: [...state.sessionLog, session].slice(-SESSION_LOG_CAP),
            completedSessions,
            lastCompletedAt: session.completed
              ? session.at
              : state.lastCompletedAt,
          }
        }),

      logMood: (entry) =>
        set((state) => ({
          moodLog: [
            ...state.moodLog.filter((m) => m.day !== entry.day),
            entry,
          ].slice(-SESSION_LOG_CAP),
        })),

      logBiometrics: (reading) =>
        set((state) => ({
          biometricLog: [
            ...state.biometricLog.filter((b) => b.day !== reading.day),
            reading,
          ].slice(-SESSION_LOG_CAP),
        })),

      updateNotificationPrefs: (prefs) =>
        set((state) => ({
          notifications: { ...state.notifications, ...prefs },
        })),

      setTier: (tier) => set({ tier }),

      setCurrentLocation: (currentLocation) =>
        set((state) => {
          const slice = readingSlice(state.profile, currentLocation)
          return {
            currentLocation,
            ...slice,
            frequency: state.isPlaying
              ? state.frequency
              : slice.transit.recommendedFrequency,
          }
        }),

      setProfile: (profile) =>
        set((state) => {
          const slice = readingSlice(profile, state.currentLocation)
          return {
            profile,
            onboardingComplete: true,
            ...slice,
            frequency: state.isPlaying
              ? state.frequency
              : slice.transit.recommendedFrequency,
          }
        }),

      editProfile: () => set({ onboardingComplete: false }),

      skipOnboarding: () => set({ onboardingComplete: true }),

      refreshDailyTransit: () =>
        set((state) => {
          const slice = readingSlice(state.profile, state.currentLocation)
          return {
            ...slice,
            frequency: state.isPlaying
              ? state.frequency
              : slice.transit.recommendedFrequency,
          }
        }),

      markTarotDrawn: () => set({ tarotDrawnDay: localDayKey() }),

      dismissMoodGate: () => set({ moodGateDay: localDayKey() }),

      addPerson: (person) =>
        set((state) => ({
          people: [
            person,
            ...state.people.filter((p) => p.id !== person.id),
          ].slice(0, 12),
        })),

      removePerson: (id) =>
        set((state) => ({ people: state.people.filter((p) => p.id !== id) })),

      endSession: () =>
        set((state) => ({
          ...createSession(),
          // Preferences + natal data + streak carry across sessions.
          audio: state.audio,
          breathPattern: state.breathPattern,
          profile: state.profile,
          currentLocation: state.currentLocation,
          onboardingComplete: state.onboardingComplete,
          tarotDrawnDay: state.tarotDrawnDay,
          moodGateDay: state.moodGateDay,
          people: state.people,
          completedSessions: state.completedSessions + 1,
          lastCompletedAt: new Date().toISOString(),
          ...readingSlice(state.profile, state.currentLocation),
        })),
    }),
    {
      name: 'resonance-session',
      version: 3,
      storage: createJSONStorage(() => localStorage),
      migrate: (persisted) => persisted as ResonanceSession,
      partialize: (state) => ({
        id: state.id,
        startedAt: state.startedAt,
        // `transit` is persisted only so `merge` can tell whether the day rolled
        // over; `chakra` / `dailyCrystals` are always recomputed fresh.
        transit: state.transit,
        frequency: state.frequency,
        breathPattern: state.breathPattern,
        profile: state.profile,
        onboardingComplete: state.onboardingComplete,
        audio: state.audio,
        completedSessions: state.completedSessions,
        lastCompletedAt: state.lastCompletedAt,
        sessionLog: state.sessionLog,
        moodLog: state.moodLog,
        biometricLog: state.biometricLog,
        currentLocation: state.currentLocation,
        notifications: state.notifications,
        tier: state.tier,
        tarotDrawnDay: state.tarotDrawnDay,
        moodGateDay: state.moodGateDay,
        people: state.people,
      }),
      merge: (persisted, current) => {
        const saved = (persisted ?? {}) as Partial<ResonanceSession>
        const profile = saved.profile ?? null
        const location = saved.currentLocation ?? null

        // The reading is deterministic and cheap — always recompute it fresh
        // for the current day / natal chart / location.
        const slice = readingSlice(profile, location)

        return {
          ...current,
          ...saved,
          ...slice,
          // keep a manually-tuned frequency if the day hasn't rolled over
          frequency:
            saved.frequency != null &&
            saved.transit != null &&
            localDayKey(new Date(saved.transit.window.start)) === localDayKey()
              ? saved.frequency
              : slice.transit.recommendedFrequency,
          audio: { ...current.audio, ...saved.audio },
          notifications: { ...current.notifications, ...saved.notifications },
          people: saved.people ?? current.people,
          isPlaying: false,
        }
      },
    },
  ),
)
