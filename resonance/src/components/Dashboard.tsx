import { useAppStore } from '../store/useAppStore'
import { audioEngine } from '../audio/audioEngine'
import { Aura } from './Aura'
import { BREATH_PATTERNS } from '../lib/breathwork'
import { auraLabel, computeAura, MOOD_META } from '../lib/aura'
import { chakraColor, chakraName, chakraNote, zodiacGlyph } from '../lib/resonanceData'
import { practicedToday, practiceStreak } from '../lib/streak'
import { localDayKey } from '../lib/timezone'
import { planetSymbol } from '../data/esoteric'
import type { TabKey } from '../types/resonance'
import { PlayIcon } from './icons'

interface DashboardProps {
  onNavigate: (tab: TabKey) => void
  onOpen: (
    view: 'chart' | 'horoscope' | 'journal' | 'mood' | 'market' | 'settings',
  ) => void
  onStartRitual: () => void
}

const ASPECT_GLYPH: Record<string, string> = {
  conjunction: '☌',
  opposition: '☍',
  square: '□',
  trine: '△',
  sextile: '⚹',
  in: '·',
}

export function Dashboard({ onNavigate, onOpen, onStartRitual }: DashboardProps) {
  const transit = useAppStore((s) => s.transit)
  const chakra = useAppStore((s) => s.chakra)
  const frequency = useAppStore((s) => s.frequency)
  const isPlaying = useAppStore((s) => s.isPlaying)
  const setFrequency = useAppStore((s) => s.setFrequency)
  const toggleAudio = useAppStore((s) => s.toggleAudio)
  const setAudioMode = useAppStore((s) => s.setAudioMode)
  const crystals = useAppStore((s) => s.dailyCrystals)
  const breathPattern = useAppStore((s) => s.breathPattern)
  const editProfile = useAppStore((s) => s.editProfile)
  const aspects = useAppStore((s) => s.aspects)
  const sky = useAppStore((s) => s.sky)
  const hasNatal = useAppStore((s) => s.hasNatal)
  const sessionLog = useAppStore((s) => s.sessionLog)
  const moodLog = useAppStore((s) => s.moodLog)
  const biometricLog = useAppStore((s) => s.biometricLog)

  const streak = practiceStreak(sessionLog)
  const doneToday = practicedToday(sessionLog)

  const focusChakra = chakra?.key ?? transit?.resonantChakra ?? 'heart'
  const accent = chakraColor(focusChakra)
  const pattern = BREATH_PATTERNS[breathPattern]
  const chakraHz = chakra?.frequency ?? transit?.recommendedFrequency ?? frequency
  const aura = computeAura(focusChakra, sessionLog, moodLog, biometricLog)
  const hasMoodToday = moodLog.some((m) => m.day === localDayKey())

  const focusPlanet = sky.find((p) => p.body === transit?.body)
  const underPressure = (chakra?.balance ?? 50) < 50

  const align = () => {
    audioEngine.unlock().catch(() => undefined)
    setAudioMode('tone')
    if (!isPlaying) setFrequency(chakraHz)
    toggleAudio(!isPlaying)
  }

  return (
    <div className="flex flex-col gap-5">
      {/* ---- aura ---------------------------------------------------- */}
      <section className="glass-panel flex items-center gap-4 p-4">
        <button
          type="button"
          onClick={() => onOpen('journal')}
          className="shrink-0"
          aria-label="Open your journal"
        >
          <Aura state={aura} size={104} className="h-24 w-24" />
        </button>
        <div className="min-w-0 flex-1">
          <p className="eyebrow">Your aura</p>
          <p className="font-serif text-xl text-white">
            {auraLabel(aura.score)}
            <span className="ml-2 text-sm text-haze-400">
              {Math.round(aura.score * 100)}%
            </span>
          </p>
          {aura.needsRest ? (
            <p className="mt-0.5 text-xs text-red-300">
              Body’s run down — keep today restorative
            </p>
          ) : hasMoodToday && aura.mood ? (
            <p className="mt-0.5 text-xs text-haze-300">
              Feeling {MOOD_META[aura.mood].label.toLowerCase()} ·{' '}
              {streak > 0 ? `${streak}-day streak` : 'begin a streak today'}
            </p>
          ) : (
            <button
              type="button"
              onClick={() => onOpen('mood')}
              className="mt-1 text-xs text-gold-300 active:text-gold-100"
            >
              How are you feeling tonight? →
            </button>
          )}
        </div>
      </section>

      {/* ---- daily astrological status -------------------------------- */}
      <header className="px-1">
        <div className="flex items-start justify-between gap-3">
          <p className="eyebrow">Today’s Sky</p>
          <button
            type="button"
            onClick={() => (hasNatal ? onOpen('chart') : editProfile())}
            className="shrink-0 text-[10px] uppercase tracking-[0.14em] text-gold-300 active:text-gold-100"
          >
            {hasNatal ? '✦ natal chart' : '✦ add birth chart'}
          </button>
        </div>

        {transit ? (
          <>
            <h1 className="mt-1 font-serif text-2xl leading-tight text-gilded">
              {transit.body} <span aria-hidden>{planetSymbol(transit.body)}</span>
              {focusPlanet?.retrograde && (
                <span className="ml-1 align-super text-sm text-haze-300">℞</span>
              )}
              <span className="text-haze-400"> · </span>
              {chakraName(focusChakra)} Focus
            </h1>
            <p className="mt-1 text-sm text-haze-300">
              {transit.title}
              {focusPlanet && (
                <>
                  {' · '}
                  {Math.floor(focusPlanet.signDegree)}° {focusPlanet.sign}{' '}
                  <span aria-hidden>{zodiacGlyph(focusPlanet.sign)}</span>
                </>
              )}
            </p>
            <p className="mt-0.5 text-xs text-haze-400">
              {transit.moonPhase} · {transit.illumination}% lit
              {!hasNatal && ' · transit-only reading'}
            </p>
          </>
        ) : (
          <h1 className="mt-1 font-serif text-2xl text-gilded">
            Attuning to the sky…
          </h1>
        )}
      </header>

      {/* ---- active chakra card -------------------------------------- */}
      <section className="glass-panel p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow">Active Chakra</p>
            <div className="mt-2 flex items-center gap-2">
              <span
                className="h-3 w-3 rounded-full"
                style={{ background: accent, boxShadow: `0 0 12px ${accent}` }}
              />
              <h2 className="font-serif text-2xl text-white">
                {chakraName(focusChakra)}
              </h2>
              <span className="text-xs text-haze-400">
                note {chakraNote(focusChakra)}
              </span>
            </div>
            <p
              className={`mt-1 text-[10px] uppercase tracking-[0.14em] ${
                underPressure ? 'text-red-300' : 'text-emerald-300'
              }`}
            >
              {underPressure ? 'Under pressure — ground & restore' : 'Well-supported — amplify'}
            </p>
            {transit && (
              <p className="mt-2 max-w-[42ch] text-sm leading-relaxed text-haze-300">
                {transit.influence}
              </p>
            )}
          </div>
          <div className="shrink-0 text-right">
            <p className="font-sans text-3xl font-semibold tabular-nums text-gilded">
              {chakraHz}
            </p>
            <p className="eyebrow">Hz target</p>
          </div>
        </div>

        <button
          type="button"
          onClick={align}
          aria-pressed={isPlaying}
          className={`mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold uppercase tracking-[0.14em] transition active:scale-[0.98] ${
            isPlaying
              ? 'border-gold-400/60 bg-gold-500/15 text-gold-100 shadow-gold-glow'
              : 'border-white/15 bg-white/5 text-haze-100'
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              isPlaying ? 'animate-pulse-glow bg-gold-300' : 'bg-haze-400'
            }`}
          />
          {isPlaying ? `Aligned at ${chakraHz} Hz — tap to release` : 'Align Frequency'}
        </button>
      </section>

      {/* ---- full horoscope link ---------------------------------- */}
      <button
        type="button"
        onClick={() => onOpen('horoscope')}
        className="glass-panel flex items-center justify-between p-4 text-left active:scale-[0.99]"
      >
        <span className="font-serif text-lg text-white">
          Read today’s full horoscope
        </span>
        <span className="text-gold-300">›</span>
      </button>

      {/* ---- sky report -------------------------------------------- */}
      <section className="glass-panel p-4">
        <p className="eyebrow">
          {hasNatal ? 'Transits to your chart' : 'Moon’s aspects today'}
        </p>
        {aspects.length > 0 ? (
          <ul className="mt-3 flex flex-col gap-2">
            {aspects.slice(0, 3).map((a) => (
              <li
                key={`${a.transiting}-${a.other}-${a.def.name}`}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-haze-100">
                  {a.transiting}{' '}
                  <span aria-hidden>{ASPECT_GLYPH[a.def.name]}</span>{' '}
                  {hasNatal ? 'natal ' : ''}
                  {a.other}
                </span>
                <span className="tabular-nums text-xs text-haze-400">
                  {a.orbDelta.toFixed(1)}° {a.applying ? 'applying' : 'separating'}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <button
            type="button"
            onClick={editProfile}
            className="mt-3 text-left text-sm text-haze-300 active:text-white"
          >
            Add your birth date & time to track real planetary transits against
            your natal chart →
          </button>
        )}
      </section>

      {/* ---- crystal apothecary strip ------------------------------- */}
      <section>
        <div className="mb-2 flex items-center justify-between px-1">
          <p className="eyebrow">Crystal Apothecary</p>
          <button
            type="button"
            onClick={() => onNavigate('apothecary')}
            className="text-xs text-gold-300 active:text-gold-100"
          >
            View all
          </button>
        </div>
        <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1">
          {crystals.map((crystal) => (
            <article
              key={crystal.id}
              className="glass-panel w-44 shrink-0 snap-start p-4"
            >
              <span
                className="block h-3 w-3 rounded-full"
                style={{
                  background: crystal.color,
                  boxShadow: `0 0 10px ${crystal.color}`,
                }}
              />
              <h3 className="mt-2 font-serif text-lg leading-tight text-white">
                {crystal.name}
              </h3>
              <p className="text-[10px] uppercase tracking-[0.12em] text-haze-400">
                {chakraName(crystal.chakra)}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-haze-200">
                {crystal.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* ---- daily practice CTA ---------------------------------- */}
      <button
        type="button"
        onClick={onStartRitual}
        className="glass-panel glass-panel-active flex items-center justify-between gap-4 p-5 text-left transition active:scale-[0.98]"
      >
        <div>
          <div className="flex items-center gap-2">
            <p className="eyebrow">Today’s Practice</p>
            {streak > 0 && (
              <span className="text-[10px] uppercase tracking-[0.14em] text-gold-300">
                {streak}-day streak
              </span>
            )}
          </div>
          <p className="mt-1 font-serif text-xl text-white">
            {doneToday ? 'Practice again' : `Begin ${pattern.name}`}
          </p>
          <p className="text-sm text-haze-300">
            {doneToday
              ? 'You’ve practised today ✦'
              : `${pattern.ratio} · guided, with breath sounds`}
          </p>
        </div>
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gold-500/20 text-gold-100">
          <PlayIcon className="h-5 w-5" />
        </span>
      </button>
    </div>
  )
}
