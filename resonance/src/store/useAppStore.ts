import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type {
  AstrologicalTransit,
  AudioMode,
  AudioPreferences,
  BirthProfile,
  BreathPatternKey,
  ChakraState,
  Crystal,
  MoodEntry,
  PracticeSession,
  ResonanceSession,
  SolfeggioFrequency,
} from '../types/resonance'
import { computeDailyReading, type Aspect } from '../lib/astrology'
import type { BodyPosition } from '../lib/ephemeris'
import type { ChartAngles } from '../lib/houses'
import { localDayKey } from '../lib/timezone'

const DEFAULT_AUDIO: AudioPreferences = {
  masterVolume: 0.5,
  ambientPadEnabled: true,
  ambientPadLevel: 0.12,
  fadeSeconds: 2,
  breathVoice: true,
}

const SESSION_LOG_CAP = 120

const newSessionId = (): string =>
  globalThis.crypto?.randomUUID?.() ?? `session_${Date.now().toString(36)}`

/** Derived sky data — recomputed on every load, never persisted. */
export interface SkyState {
  aspects: Aspect[]
  sky: BodyPosition[]
  natal: BodyPosition[]
  natalAspects: Aspect[]
  angles: ChartAngles | null
  hasNatal: boolean
}

/** Everything the daily transit computation produces, ready to spread into state. */
interface ReadingSlice extends SkyState {
  transit: AstrologicalTransit
  chakra: ChakraState
  dailyCrystals: Crystal[]
  suggestedPattern: BreathPatternKey
}

const readingSlice = (profile: BirthProfile | null): ReadingSlice => {
  const reading = computeDailyReading(profile)
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
    hasNatal: reading.hasNatal,
  }
}

const createSession = (): ResonanceSession & SkyState => {
  const slice = readingSlice(null)
  return {
    aspects: slice.aspects,
    sky: slice.sky,
    natal: slice.natal,
    natalAspects: slice.natalAspects,
    angles: slice.angles,
    hasNatal: slice.hasNatal,
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
  /** Save natal data and recompute today's reading against it. */
  setProfile: (profile: BirthProfile) => void
  /** Re-open the birth-details form. */
  editProfile: () => void
  /** Continue without a natal chart (transit-only readings). */
  skipOnboarding: () => void
  /** Recompute the daily transit / chakra / crystals (call when the day rolls over). */
  refreshDailyTransit: () => void
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

      setProfile: (profile) =>
        set((state) => {
          const slice = readingSlice(profile)
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
          const slice = readingSlice(state.profile)
          return {
            ...slice,
            frequency: state.isPlaying
              ? state.frequency
              : slice.transit.recommendedFrequency,
          }
        }),

      endSession: () =>
        set((state) => ({
          ...createSession(),
          // Preferences + natal data + streak carry across sessions.
          audio: state.audio,
          breathPattern: state.breathPattern,
          profile: state.profile,
          onboardingComplete: state.onboardingComplete,
          completedSessions: state.completedSessions + 1,
          lastCompletedAt: new Date().toISOString(),
          ...readingSlice(state.profile),
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
      }),
      merge: (persisted, current) => {
        const saved = (persisted ?? {}) as Partial<ResonanceSession>
        const profile = saved.profile ?? null

        // The reading is deterministic and cheap — always recompute it fresh
        // for the current day / natal chart rather than trusting stale storage.
        const slice = readingSlice(profile)

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
          isPlaying: false,
        }
      },
    },
  ),
)
