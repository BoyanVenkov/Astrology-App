import { useEffect, useRef, useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import { audioEngine, SOLFEGGIO_PRESETS, solfeggioInfo } from '../audio/audioEngine'
import { BreathVisualizer } from './BreathVisualizer'
import { BreathJourney } from './BreathJourney'
import { FrequencySession } from './FrequencySession'
import { Meditation } from './Meditation'
import { MoodCheckIn } from './MoodCheckIn'
import { BREATH_PATTERNS } from '../lib/breathwork'
import { MEDITATION_STYLE_MAP } from '../lib/meditation'
import { buildHoroscope } from '../lib/horoscope'
import { crystalName } from '../lib/crystals'
import {
  breathGuide,
  breathName,
  chakraLabel,
  medName,
  medTag,
  planetLabel,
  solfeggioIntention,
  useT,
} from '../lib/i18n'
import type { MessageKey } from '../lib/locales/en'
import { useEntitlements } from '../lib/premium'
import { ResonanceMark } from './Logo'
import { chakraColor } from '../lib/resonanceData'
import { practiceStreak } from '../lib/streak'
import { localDayKey } from '../lib/timezone'
import { LockIcon } from './icons'
import type {
  MeditationSound,
  PracticeKind,
  RitualPreset,
  SolfeggioFrequency,
} from '../types/resonance'

export type { RitualPreset }

interface RitualProps {
  onExit: () => void
  preset?: RitualPreset
  onUpgrade?: (reason?: string) => void
}

const FREQ_DURATIONS = [5, 10, 20, 30, 45]
const MED_SOUND_KEYS: MeditationSound[] = ['tone', 'music', 'silent']

const shell = 'mx-auto flex min-h-[100dvh] w-full max-w-md flex-col px-5'
const shellStyle = {
  paddingTop: 'max(1rem, env(safe-area-inset-top))',
  paddingBottom: 'max(1rem, env(safe-area-inset-bottom))',
}

const midOf = (arr: number[], fallback: number): number =>
  arr.length ? (arr[Math.floor(arr.length / 2)] ?? arr[0]) : fallback

export function Ritual({ onExit, preset, onUpgrade }: RitualProps) {
  const t = useT()
  const transit = useAppStore((s) => s.transit)
  const chakra = useAppStore((s) => s.chakra)
  const frequency = useAppStore((s) => s.frequency)
  const crystals = useAppStore((s) => s.dailyCrystals)
  const aspects = useAppStore((s) => s.aspects)
  const sky = useAppStore((s) => s.sky)
  const hasNatal = useAppStore((s) => s.hasNatal)
  const suggestedPattern = useAppStore((s) => s.suggestedPattern)
  const sessionLog = useAppStore((s) => s.sessionLog)
  const logPractice = useAppStore((s) => s.logPractice)
  const toggleAudio = useAppStore((s) => s.toggleAudio)
  const { isPro, freeFrequencyCount } = useEntitlements()

  const specificPractice = Boolean(
    preset?.breathPattern || preset?.meditationStyle || preset?.frequency,
  )
  const breathKey = preset?.breathPattern ?? suggestedPattern
  const medStyle = preset?.meditationStyle ?? 'chakra'
  const breathPattern = BREATH_PATTERNS[breathKey]
  const isJourney = Boolean(breathPattern.rounds)
  const breathDurations = breathPattern.durations
  const medDurations = MEDITATION_STYLE_MAP[medStyle]?.durations ?? [5, 10, 15]
  const recommendedFreq: SolfeggioFrequency =
    chakra?.frequency ?? transit?.recommendedFrequency ?? frequency

  const [screen, setScreen] = useState<'intro' | 'practice' | 'done'>(
    preset?.skipIntro ? 'practice' : 'intro',
  )
  const [mode, setMode] = useState<PracticeKind>(preset?.mode ?? 'breath')
  const [breathMin, setBreathMin] = useState(
    preset?.mode === 'breath' && preset.minutes
      ? preset.minutes
      : midOf(breathDurations, 6),
  )
  const [medMin, setMedMin] = useState(
    preset?.mode === 'meditation' && preset.minutes
      ? preset.minutes
      : midOf(medDurations, 10),
  )
  const [freqMin, setFreqMin] = useState(
    preset?.mode === 'frequency' && preset.minutes ? preset.minutes : 10,
  )
  const [chosenFreq, setChosenFreq] = useState<SolfeggioFrequency>(
    preset?.frequency ?? recommendedFreq,
  )
  const [medSound, setMedSound] = useState<MeditationSound>('tone')
  const [doneMinutes, setDoneMinutes] = useState(0)
  const startedAtRef = useRef(0)
  useEffect(() => {
    if (preset?.skipIntro && !startedAtRef.current) {
      startedAtRef.current = Date.now()
    }
  }, [preset])

  if (!transit || !chakra) {
    return (
      <div className={shell} style={shellStyle}>
        <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
          <p className="text-sm text-haze-300">{t('scr.ritual.attuning')}</p>
          <button
            type="button"
            onClick={onExit}
            className="text-xs uppercase tracking-[0.14em] text-gold-300"
          >
            {t('scr.ritual.back')}
          </button>
        </div>
      </div>
    )
  }

  const accent = chakraColor(chakra.key)
  const focus = chakraLabel(chakra.key, t)
  const medDisplayName = medName(medStyle, t)
  const freqInfo = solfeggioInfo(chosenFreq)
  const soundBath = mode === 'meditation' && medStyle === 'sound-bath'
  const minutes =
    mode === 'breath' ? breathMin : mode === 'meditation' ? medMin : freqMin
  const horoscope = buildHoroscope(
    {
      transit,
      chakra,
      crystals,
      aspects,
      sky,
      hasNatal,
      suggestedPattern,
    },
    t,
  )
  const stones = crystals.slice(0, 2).map((c) => crystalName(c.name, t))

  const doneLabel =
    mode === 'breath'
      ? breathName(breathKey, t)
      : mode === 'meditation'
        ? medDisplayName
        : `${chosenFreq} Hz`

  const record = (mins: number, completed: boolean) => {
    toggleAudio(false)
    logPractice({
      at: new Date().toISOString(),
      day: localDayKey(),
      kind: mode,
      chakra: chakra.key,
      frequency: mode === 'frequency' ? chosenFreq : frequency,
      pattern: mode === 'breath' ? breathKey : suggestedPattern,
      style: mode === 'meditation' ? medStyle : undefined,
      minutes: mins,
      completed,
    })
  }

  const begin = () => {
    audioEngine.unlock().catch(() => undefined)
    startedAtRef.current = Date.now()
    setScreen('practice')
  }

  const handleComplete = (mins: number) => {
    setDoneMinutes(mins)
    record(mins, true)
    setScreen('done')
  }

  const endEarly = () => {
    const mins = Math.max(
      0,
      Math.round((Date.now() - startedAtRef.current) / 60000),
    )
    record(mins, false)
    onExit()
  }

  /* ---------------------------------------------------------------- intro */
  if (screen === 'intro') {
    const durations =
      mode === 'breath'
        ? breathDurations
        : mode === 'meditation'
          ? medDurations
          : FREQ_DURATIONS
    const setDuration = (m: number) =>
      mode === 'breath'
        ? setBreathMin(m)
        : mode === 'meditation'
          ? setMedMin(m)
          : setFreqMin(m)

    const title = specificPractice
      ? mode === 'breath'
        ? breathName(breathKey, t)
        : mode === 'meditation'
          ? medDisplayName
          : `${chosenFreq} Hz`
      : t('scr.ritual.focusAlignment', { chakra: focus })
    const blurb = specificPractice
      ? mode === 'breath'
        ? breathGuide(breathKey, t)
        : mode === 'meditation'
          ? medTag(medStyle, t)
          : solfeggioIntention(chosenFreq, t)
      : horoscope.greeting

    return (
      <div className={`${shell} justify-center`} style={shellStyle}>
        <p className="eyebrow">
          {!preset?.personalised && specificPractice
            ? t('scr.ritual.fromLibrary')
            : t('scr.ritual.todaysPractice')}
        </p>
        <h1 className="mt-2 font-serif text-3xl leading-tight text-gilded">
          {title}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-haze-300">{blurb}</p>

        {/* mode — only when the practice wasn't chosen from the library */}
        {!specificPractice && (
          <div className="mt-5 grid grid-cols-3 gap-2">
            {(['breath', 'meditation', 'frequency'] as PracticeKind[]).map(
              (m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={`rounded-2xl border px-2 py-3 text-xs font-semibold capitalize transition ${
                    m === mode
                      ? 'border-gold-400/60 bg-gold-500/15 text-gold-100'
                      : 'border-white/12 bg-white/5 text-haze-300'
                  }`}
                >
                  {t(`lib.tab.${m}` as MessageKey)}
                </button>
              ),
            )}
          </div>
        )}

        <div className="mt-4 glass-panel p-5">
          <div className="flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-full"
              style={{
                background: mode === 'frequency' ? freqInfo.color : accent,
                boxShadow: `0 0 12px ${mode === 'frequency' ? freqInfo.color : accent}`,
              }}
            />
            <p className="font-serif text-lg text-white">
              {mode === 'breath'
                ? breathName(breathKey, t)
                : mode === 'meditation'
                  ? medDisplayName
                  : `${chosenFreq} Hz`}
            </p>
            {mode === 'breath' && (
              <span className="ms-auto text-xs text-haze-400">
                {breathPattern.ratio}
              </span>
            )}
          </div>
          <p className="mt-2 text-sm text-haze-300">
            {mode === 'breath'
              ? breathGuide(breathKey, t)
              : mode === 'meditation'
                ? medStyle === 'chakra'
                  ? t('scr.ritual.chakraBlurb', {
                      planet: planetLabel(transit.body, t),
                    })
                  : medTag(medStyle, t)
                : t('scr.ritual.freqBlurb', {
                    intention: solfeggioIntention(chosenFreq, t),
                  })}
          </p>
          {mode !== 'frequency' && (
            <p className="mt-3 text-xs uppercase tracking-[0.12em] text-haze-400">
              {t('scr.ritual.metaLine', {
                hz: recommendedFreq,
                chakra: focus,
                stones:
                  stones.length > 0
                    ? t('scr.ritual.stonesSuffix', {
                        stones: stones.join(' / '),
                      })
                    : '',
              })}
            </p>
          )}
        </div>

        {/* frequency chooser — pick which tone to sit with */}
        {mode === 'frequency' && !preset?.frequency && (
          <>
            <p className="mt-5 eyebrow">{t('scr.ritual.tone')}</p>
            <div className="no-scrollbar mt-2 flex gap-2 overflow-x-auto pb-1">
              {SOLFEGGIO_PRESETS.map((p, i) => {
                const unlocked =
                  isPro ||
                  i < freeFrequencyCount ||
                  p.frequency === recommendedFreq
                const active = p.frequency === chosenFreq
                return (
                  <button
                    key={p.frequency}
                    type="button"
                    onClick={() =>
                      unlocked
                        ? setChosenFreq(p.frequency)
                        : onUpgrade?.(t('lib.reasonFreq'))
                    }
                    className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-semibold tabular-nums transition ${
                      active
                        ? 'border-gold-400/60 bg-gold-500/15 text-gold-100'
                        : 'border-white/12 bg-white/5 text-haze-300'
                    } ${unlocked ? '' : 'opacity-60'}`}
                  >
                    {p.frequency}
                    {!unlocked && <LockIcon className="h-3 w-3" />}
                  </button>
                )
              })}
            </div>
          </>
        )}

        {isJourney ? (
          <p className="mt-5 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-haze-300">
            {t('scr.ritual.journeyNote', {
              n: breathPattern.rounds?.rounds ?? 3,
            })}
          </p>
        ) : (
          <>
            <p className="mt-5 eyebrow">{t('scr.ritual.length')}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {durations.map((m) => {
                const selected = m === minutes
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setDuration(m)}
                    className={`min-w-[4.5rem] flex-1 rounded-2xl border px-3 py-3 text-sm font-semibold transition ${
                      selected
                        ? 'border-gold-400/60 bg-gold-500/15 text-gold-100'
                        : 'border-white/12 bg-white/5 text-haze-300'
                    }`}
                  >
                    {t('tp.min', { n: m })}
                  </button>
                )
              })}
            </div>
          </>
        )}

        {/* meditation sound bed */}
        {mode === 'meditation' && !soundBath && (
          <>
            <p className="mt-5 eyebrow">{t('scr.ritual.sound')}</p>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {MED_SOUND_KEYS.map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setMedSound(k)}
                  className={`rounded-2xl border px-2 py-2.5 text-xs font-semibold transition ${
                    k === medSound
                      ? 'border-gold-400/60 bg-gold-500/15 text-gold-100'
                      : 'border-white/12 bg-white/5 text-haze-300'
                  }`}
                >
                  {t(`scr.ritual.sound.${k}` as MessageKey)}
                </button>
              ))}
            </div>
            <p className="mt-1.5 text-[11px] text-haze-500">
              {medSound === 'tone'
                ? t('scr.ritual.soundTone', { hz: recommendedFreq })
                : medSound === 'music'
                  ? t('scr.ritual.soundMusic')
                  : t('scr.ritual.soundSilent')}
            </p>
          </>
        )}

        <button
          type="button"
          onClick={begin}
          className="mt-6 rounded-2xl border border-gold-400/50 bg-gold-500/15 px-4 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-gold-100 shadow-gold-glow transition active:scale-[0.98]"
        >
          {t('scr.ritual.beginPractice')}
        </button>
        <button
          type="button"
          onClick={onExit}
          className="mt-3 text-center text-xs uppercase tracking-[0.14em] text-haze-300 active:text-haze-100"
        >
          {t('scr.ritual.notNow')}
        </button>
      </div>
    )
  }

  /* ------------------------------------------------------------- practice */
  if (screen === 'practice') {
    return (
      <div className={shell} style={shellStyle}>
        <button
          type="button"
          onClick={endEarly}
          className="self-start py-2 text-xs uppercase tracking-[0.14em] text-haze-300 active:text-haze-100"
        >
          {t('scr.ritual.endSession')}
        </button>
        <div className="flex flex-1 items-center">
          {mode === 'breath' ? (
            isJourney ? (
              <BreathJourney onComplete={handleComplete} className="w-full" />
            ) : (
              <BreathVisualizer
                key={breathKey}
                pattern={breathKey}
                autoStart
                sessionSeconds={minutes * 60}
                onComplete={handleComplete}
                className="w-full"
              />
            )
          ) : mode === 'meditation' ? (
            <Meditation
              minutes={minutes}
              style={medStyle}
              sound={medSound}
              onComplete={handleComplete}
              onStarted={() => {
                startedAtRef.current = Date.now()
              }}
              className="w-full"
            />
          ) : (
            <FrequencySession
              frequency={chosenFreq}
              minutes={freqMin}
              onComplete={handleComplete}
              className="w-full"
            />
          )}
        </div>
      </div>
    )
  }

  /* ----------------------------------------------------------------- done */
  const streak = practiceStreak(sessionLog)
  return (
    <div className={`${shell} justify-center text-center`} style={shellStyle}>
      <div
        className="mx-auto grid h-24 w-24 place-items-center rounded-full"
        style={{
          background: `radial-gradient(circle, ${accent}44, transparent 70%)`,
          boxShadow: `0 0 50px ${accent}55`,
        }}
      >
        <ResonanceMark className="h-12 w-12" style={{ color: accent }} animated />
      </div>
      <h1 className="mt-5 font-serif text-3xl text-gilded">
        {t('scr.ritual.complete')}
      </h1>
      <p className="mt-2 text-sm text-haze-300">
        {t('scr.ritual.doneMeta', {
          minutes: doneMinutes,
          chakra: focus,
          label: doneLabel,
        })}
      </p>

      {horoscope.affirmation && (
        <p className="mt-6 font-serif text-xl leading-relaxed text-white">
          “{t(horoscope.affirmation)}”
        </p>
      )}

      <p className="mt-4 text-sm text-gold-200">
        {streak > 0
          ? t('scr.ritual.streak', { n: streak })
          : t('scr.ritual.firstLogged')}
      </p>

      <div className="mt-8 w-full">
        <MoodCheckIn
          compact
          title={t('scr.ritual.howNow')}
          onDone={() => undefined}
        />
      </div>

      <button
        type="button"
        onClick={onExit}
        className="mt-6 rounded-2xl border border-gold-400/50 bg-gold-500/15 px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-gold-100 transition active:scale-[0.98]"
      >
        {t('scr.ritual.done')}
      </button>
    </div>
  )
}
