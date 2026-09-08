import { useMemo, useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import {
  askRunes,
  drawRunes,
  layoutOf,
  runeDailySeed,
  runeFreshSeed,
  runeMeta,
  runeText,
  RUNE_KEYS,
  RUNE_LAYOUTS,
  RUNES,
  type RuneAnswer,
  type RuneCast,
  type RuneKey,
  type RuneLayout,
} from '../lib/runes'
import { chakraLabel, useT, type TFn } from '../lib/i18n'
import { chakraColor } from '../lib/resonanceData'
import { runeLayoutUnlocked, useEntitlements } from '../lib/premium'
import { localDayKey } from '../lib/timezone'
import type { MessageKey } from '../lib/locales/en'
import { LockIcon } from './icons'
import { BackButton } from './Screen'
import { RuneGlyph } from './RuneGlyph'
import { RuneChip, RuneInterpretation, RuneStoneSlot } from './RuneStone'

interface RuneReaderProps {
  onBack: () => void
  onUpgrade?: (reason?: string) => void
}

type View = 'daily' | 'choose' | 'cast' | 'ask' | 'library'

const VERDICT_COLOR = {
  yes: '#6ee7b7',
  no: '#fb923c',
  wait: '#9aa6c9',
  hidden: '#c8b6f0',
} as const

function posFor(layout: RuneLayout, i: number, t: TFn) {
  const key = layout.positions[i] ?? 'now'
  return {
    label: t(`rune.pos.${key}` as MessageKey),
    prompt: t(`rune.pos.${key}.prompt` as MessageKey),
  }
}

export function RuneReader({ onBack, onUpgrade }: RuneReaderProps) {
  const t = useT()
  const profile = useAppStore((s) => s.profile)
  const chakra = useAppStore((s) => s.chakra)
  const drawnDay = useAppStore((s) => s.runeDrawnDay)
  const markRuneDrawn = useAppStore((s) => s.markRuneDrawn)
  const { isPro } = useEntitlements()

  const today = localDayKey()
  const daily = useMemo(
    () => drawRunes(layoutOf('one'), runeDailySeed(profile)).runes[0],
    [profile],
  )

  const [view, setView] = useState<View>('daily')
  const [dailyUp, setDailyUp] = useState(drawnDay === today)

  const [layout, setLayout] = useState<RuneLayout>(RUNE_LAYOUTS[1])
  const [cast, setCast] = useState<RuneCast | null>(null)
  const [shown, setShown] = useState<Set<number>>(new Set())

  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState<{ q: string; a: RuneAnswer } | null>(null)
  const [answerUp, setAnswerUp] = useState(false)

  const [openRune, setOpenRune] = useState<RuneKey | null>(null)

  const beginCast = (l: RuneLayout) => {
    setLayout(l)
    setCast(drawRunes(l, runeFreshSeed()))
    setShown(new Set())
    setView('cast')
  }

  const consult = () => {
    const q = question.trim()
    if (q.length < 8) return
    setAnswer({ q, a: askRunes(q, profile) })
    setAnswerUp(false)
  }

  const reveal = (i: number) =>
    setShown((prev) => new Set(prev).add(i))

  /* ------------------------------------------------------------- daily */
  if (view === 'daily') {
    const text = runeText(daily.key, daily.merkstave, t)
    const meta = runeMeta(daily.key)
    const resonance =
      chakra != null
        ? chakra.key === meta.chakra
          ? t('rune.resonance.match', {
              chakra: chakraLabel(meta.chakra, t),
            })
          : t('rune.resonance.bridge', {
              sky: chakraLabel(chakra.key, t),
              rune: chakraLabel(meta.chakra, t),
            })
        : null

    return (
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-4">
        <BackButton onClick={onBack} />

        <header className="px-1">
          <p className="eyebrow-hue">{t('rune.eyebrow')}</p>
          <h1 className="mt-1 font-serif text-2xl leading-tight text-gilded">
            {t('rune.dailyTitle')}
          </h1>
          <p className="mt-1 text-sm text-haze-300">
            {profile ? t('rune.dailyBlurbChart') : t('rune.dailyBlurbPlain')}
          </p>
        </header>

        <div className="mx-auto w-[180px]">
          <RuneStoneSlot
            drawn={daily}
            faceUp={dailyUp}
            t={t}
            onReveal={() => {
              setDailyUp(true)
              markRuneDrawn()
            }}
          />
        </div>

        {dailyUp ? (
          <>
            <RuneInterpretation drawn={daily} t={t} />

            <section className="glass-panel glass-panel-active p-4">
              <p className="eyebrow">{t('rune.pos.now')}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-haze-100">
                {text.today}
              </p>
              {resonance && (
                <p
                  className="mt-3 border-t border-white/[0.07] pt-3 text-[13px] leading-snug text-haze-300"
                  style={{ color: chakraColor(meta.chakra) }}
                >
                  {resonance}
                </p>
              )}
            </section>
          </>
        ) : (
          <p className="text-center text-sm text-haze-400">
            {t('rune.tapReveal')}
          </p>
        )}

        <button
          type="button"
          onClick={() => setView('choose')}
          className="glass-panel flex items-center justify-between p-4 text-start active:scale-[0.99]"
        >
          <span>
            <span className="font-serif text-lg text-white">
              {t('rune.cast')}
            </span>
            <span className="block text-xs text-haze-300">
              {t('rune.castSub')}
            </span>
          </span>
          <span style={{ color: 'var(--rz-hue)' }}>›</span>
        </button>

        <button
          type="button"
          onClick={() =>
            isPro ? setView('ask') : onUpgrade?.(t('rune.ask'))
          }
          className="glass-panel flex items-center justify-between p-4 text-start active:scale-[0.99]"
        >
          <span>
            <span className="flex items-center gap-1.5 font-serif text-lg text-white">
              {t('rune.ask')}
              {!isPro && <LockIcon className="h-4 w-4 text-haze-400" />}
            </span>
            <span className="block text-xs text-haze-300">
              {t('rune.askSub')}
            </span>
          </span>
          <span style={{ color: 'var(--rz-hue)' }}>›</span>
        </button>

        <button
          type="button"
          onClick={() => setView('library')}
          className="glass-panel flex items-center justify-between p-4 text-start active:scale-[0.99]"
        >
          <span>
            <span className="font-serif text-lg text-white">
              {t('rune.library')}
            </span>
            <span className="block text-xs text-haze-300">
              {t('rune.librarySub')}
            </span>
          </span>
          <span style={{ color: 'var(--rz-hue)' }}>›</span>
        </button>
      </div>
    )
  }

  /* ------------------------------------------------------------ choose */
  if (view === 'choose') {
    return (
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-4">
        <BackButton onClick={() => setView('daily')} />

        <header className="px-1">
          <p className="eyebrow-hue">{t('rune.eyebrow')}</p>
          <h1 className="mt-1 font-serif text-2xl leading-tight text-gilded">
            {t('rune.chooseTitle')}
          </h1>
          <p className="mt-1 text-sm text-haze-300">{t('rune.chooseBlurb')}</p>
        </header>

        <div className="flex flex-col gap-3">
          {RUNE_LAYOUTS.filter((l) => l.key !== 'one').map((l) => {
            const unlocked = runeLayoutUnlocked(l.key, isPro)
            return (
              <button
                key={l.key}
                type="button"
                onClick={() =>
                  unlocked ? beginCast(l) : onUpgrade?.(t('rune.cast'))
                }
                className={`glass-panel p-4 text-start active:scale-[0.99] ${
                  unlocked ? '' : 'opacity-60'
                }`}
              >
                <div className="flex items-center gap-2">
                  <h2 className="font-serif text-lg text-white">
                    {t(`rune.layout.${l.key}` as MessageKey)}
                  </h2>
                  {unlocked ? (
                    <span className="ms-auto text-xs tabular-nums text-haze-400">
                      {t('rune.runeCount.many', { n: l.count })}
                    </span>
                  ) : (
                    <LockIcon className="ms-auto h-4 w-4 shrink-0 text-haze-400" />
                  )}
                </div>
                <p className="mt-1 text-sm text-haze-300">
                  {t(`rune.layout.${l.key}Sub` as MessageKey)}
                </p>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  /* -------------------------------------------------------------- cast */
  if (view === 'cast') {
    const runes = cast?.runes ?? []
    const allShown = shown.size >= runes.length && runes.length > 0
    const grid =
      layout.count === 3 ? 'grid grid-cols-3 gap-2' : 'grid grid-cols-3 gap-2'

    return (
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-4">
        <BackButton onClick={() => setView('choose')} />

        <header className="px-1">
          <p className="eyebrow-hue">
            {t('rune.castEyebrow', {
              layout: t(`rune.layout.${layout.key}` as MessageKey),
            })}
          </p>
          <h1 className="mt-1 font-serif text-2xl leading-tight text-gilded">
            {allShown ? t('rune.castReading') : t('rune.tapReveal')}
          </h1>
        </header>

        <div className={grid}>
          {runes.map((d, i) => (
            <RuneStoneSlot
              key={i}
              drawn={d}
              faceUp={shown.has(i)}
              t={t}
              onReveal={() => reveal(i)}
            />
          ))}
        </div>

        {allShown &&
          runes.map((d, i) => (
            <RuneInterpretation
              key={i}
              drawn={d}
              position={posFor(layout, i, t)}
              t={t}
            />
          ))}

        {allShown && (
          <button
            type="button"
            onClick={() => beginCast(layout)}
            className="btn-ghost rounded-[0.9rem] px-4 py-3 text-sm uppercase tracking-[0.14em] text-haze-200"
          >
            {t('rune.drawAgain')}
          </button>
        )}
      </div>
    )
  }

  /* --------------------------------------------------------------- ask */
  if (view === 'ask') {
    const a = answer?.a
    return (
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-4">
        <BackButton
          onClick={() => {
            setView('daily')
            setAnswer(null)
          }}
        />

        <header className="px-1">
          <p className="eyebrow-hue">{t('rune.askEyebrow')}</p>
          <h1 className="mt-1 font-serif text-2xl leading-tight text-gilded">
            {t('rune.ask')}
          </h1>
          <p className="mt-1 text-sm text-haze-300">{t('rune.askBlurb')}</p>
        </header>

        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows={3}
          placeholder={t('rune.askPlaceholder')}
          className="w-full resize-none rounded-2xl border border-white/12 bg-midnight-950/60 p-4 text-sm text-white outline-none transition focus:border-white/30"
        />

        <button
          type="button"
          onClick={consult}
          disabled={question.trim().length < 8}
          className={`rounded-[0.9rem] px-4 py-3.5 text-sm uppercase ${
            question.trim().length < 8 ? 'btn-ghost opacity-55' : 'btn-primary'
          }`}
        >
          {answer ? t('rune.askAgain') : t('rune.consult')}
        </button>

        {answer && a && (
          <>
            <p className="px-1 text-sm text-haze-300">
              <span className="text-[11px] uppercase tracking-[0.14em] text-haze-500">
                {t('rune.youAsked')}
              </span>{' '}
              {answer.q}
            </p>

            <div className="mx-auto w-[170px]">
              <RuneStoneSlot
                drawn={a.drawn}
                faceUp={answerUp}
                t={t}
                onReveal={() => setAnswerUp(true)}
              />
            </div>

            {answerUp && (
              <>
                <div
                  className="glass-panel animate-rise-in p-4 text-center"
                  style={{ borderColor: `${VERDICT_COLOR[a.verdict]}55` }}
                >
                  <p
                    className="font-serif text-2xl"
                    style={{ color: VERDICT_COLOR[a.verdict] }}
                  >
                    {t(`rune.verdict.${a.verdict}` as MessageKey)}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-haze-200">
                    {t(`rune.verdict.${a.verdict}.gloss` as MessageKey)}
                  </p>
                </div>
                <RuneInterpretation drawn={a.drawn} t={t} />
              </>
            )}
          </>
        )}
      </div>
    )
  }

  /* ----------------------------------------------------------- library */
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 md:max-w-4xl">
      <BackButton onClick={() => setView('daily')} />

      <header className="px-1">
        <p className="eyebrow-hue">{t('rune.eyebrow')}</p>
        <h1 className="mt-1 font-serif text-2xl leading-tight text-gilded">
          {t('rune.library')}
        </h1>
        <p className="mt-1 text-sm text-haze-300">{t('rune.librarySub')}</p>
      </header>

      {[1, 2, 3].map((aett) => (
        <section key={aett} className="flex flex-col gap-2">
          <p className="eyebrow px-1">{t(`rune.aett.${aett}` as MessageKey)}</p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {RUNE_KEYS.filter((k) => RUNES[k].aett === aett).map((k) => {
            const m = RUNES[k]
            const text = runeText(k, false, t)
            const open = openRune === k
            return (
              <button
                key={k}
                type="button"
                onClick={() => setOpenRune(open ? null : k)}
                className="glass-panel p-3 text-start active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <RuneChip drawn={{ key: k, merkstave: false }} size={34} />
                  <span className="min-w-0 flex-1">
                    <span className="font-serif text-base text-white">
                      {m.name}
                    </span>
                    <span className="block truncate text-xs text-haze-400">
                      {text.meaning}
                    </span>
                  </span>
                  <span
                    className="text-[10px] uppercase tracking-[0.12em] text-haze-500"
                  >
                    {m.sound}
                  </span>
                </div>
                {open && (
                  <div className="mt-2 border-t border-white/[0.07] pt-2">
                    <p className="text-[11px] uppercase tracking-[0.12em] text-haze-400">
                      {text.keywords.join(' · ')}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-haze-100">
                      {text.body}
                    </p>
                  </div>
                )}
              </button>
            )
          })}
          </div>
        </section>
      ))}
    </div>
  )
}

/** A compact glyph row used elsewhere (e.g. the Divination hub teaser). */
export function RuneRow() {
  return (
    <span className="flex gap-1.5" aria-hidden>
      {(['fehu', 'ansuz', 'gebo', 'sowilo', 'algiz'] as RuneKey[]).map((k) => (
        <RuneGlyph
          key={k}
          runeKey={k}
          className="h-4 w-3"
          style={{ color: 'var(--rz-hue)' }}
        />
      ))}
    </span>
  )
}
