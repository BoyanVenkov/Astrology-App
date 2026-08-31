import { useEffect, useMemo, useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import {
  dailySeed,
  drawOracle,
  drawReading,
  freshSeed,
  oracleReading,
  SPREADS,
  spreadOf,
  type DrawnCard,
  type OracleVerdict,
  type Spread,
  type TarotReading,
} from '../lib/tarot'
import { spreadUnlocked, useEntitlements } from '../lib/premium'
import { localDayKey } from '../lib/timezone'
import { LockIcon } from './icons'
import { BackButton } from './Screen'
import { TarotCardBack, TarotCardFace } from './TarotCard'

interface TarotReaderProps {
  /** Only set when Tarot is pushed as a sub-screen; as a tab there's nowhere back. */
  onBack?: () => void
  onUpgrade?: (reason?: string) => void
}

type View = 'daily' | 'choose' | 'table' | 'oracle'

/* --------------------------------------------------------------- one card */

function CardSlot({
  drawn,
  faceUp,
  onFlip,
}: {
  drawn: DrawnCard
  faceUp: boolean
  onFlip: () => void
}) {
  return (
    <button
      type="button"
      onClick={onFlip}
      disabled={faceUp}
      className="tf-scene block w-full"
      aria-label={faceUp ? drawn.card.name : 'Turn this card'}
    >
      <div className={`tf-card aspect-[200/340] ${faceUp ? 'is-face' : ''}`}>
        <div className="tf-side">
          <TarotCardBack className="h-full w-full drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]" />
        </div>
        <div className="tf-side tf-side-face">
          <TarotCardFace
            card={drawn.card}
            reversed={drawn.reversed}
            className="h-full w-full drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          />
        </div>
      </div>
    </button>
  )
}

function Interpretation({
  position,
  drawn,
}: {
  position?: { label: string; prompt: string }
  drawn: DrawnCard
}) {
  return (
    <article className="glass-panel animate-rise-in p-4">
      {position && (
        <p className="eyebrow">
          {position.label}
          <span className="ml-2 normal-case tracking-normal text-haze-500">
            {position.prompt}
          </span>
        </p>
      )}
      <p className="mt-1.5 font-serif text-xl text-white">
        {drawn.card.name}
        {drawn.reversed && (
          <span className="ml-2 text-sm uppercase tracking-[0.14em] text-amber-300">
            reversed
          </span>
        )}
      </p>
      <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-haze-400">
        {drawn.card.keywords.join(' · ')}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-haze-100">
        {drawn.reversed ? drawn.card.reversed : drawn.card.upright}
      </p>
    </article>
  )
}

/* -------------------------------------------------------------- the oracle */

const VERDICT_COLOR: Record<OracleVerdict, string> = {
  yes: '#6ee7b7',
  no: '#fb923c',
  wait: '#9aa6c9',
  both: '#a78bfa',
}

function OracleResult({ q, card }: { q: string; card: DrawnCard }) {
  const r = oracleReading(card, q)
  const parts: { label: string; text: string }[] = [
    { label: 'The heart of it', text: r.heart },
    { label: 'What it’s really about', text: r.meaning },
    { label: 'What to do', text: r.action },
  ]
  return (
    <article className="glass-panel animate-rise-in p-4">
      <p className="text-[11px] uppercase tracking-[0.14em] text-haze-500">
        You asked
      </p>
      <p className="mt-1 font-serif text-lg leading-snug text-white">“{q}”</p>

      {r.verdictLabel && r.verdict && (
        <span
          className="mt-3 inline-block rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]"
          style={{
            color: VERDICT_COLOR[r.verdict],
            boxShadow: `inset 0 0 0 1px ${VERDICT_COLOR[r.verdict]}66`,
          }}
        >
          {r.verdictLabel}
        </span>
      )}

      <div className="mt-3 flex flex-col gap-3">
        {parts.map((p) => (
          <div key={p.label}>
            <p
              className="text-[10px] uppercase tracking-[0.16em]"
              style={{ color: 'var(--rz-hue)' }}
            >
              {p.label}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-haze-100">
              {p.text}
            </p>
          </div>
        ))}
      </div>
    </article>
  )
}

/* ---------------------------------------------------------------- reader */

export function TarotReader({ onBack, onUpgrade }: TarotReaderProps) {
  const profile = useAppStore((s) => s.profile)
  const drawnDay = useAppStore((s) => s.tarotDrawnDay)
  const markTarotDrawn = useAppStore((s) => s.markTarotDrawn)
  const { isPro } = useEntitlements()

  const today = localDayKey()
  const daily = useMemo(
    () => drawReading(spreadOf('one'), dailySeed(profile)),
    [profile],
  )

  const [view, setView] = useState<View>('daily')
  const [dailyUp, setDailyUp] = useState(drawnDay === today)

  const [spread, setSpread] = useState<Spread>(SPREADS[1])
  const [reading, setReading] = useState<TarotReading | null>(null)
  const [flipped, setFlipped] = useState<Set<number>>(new Set())
  const [shuffling, setShuffling] = useState(false)

  const [question, setQuestion] = useState('')
  const [oracle, setOracle] = useState<{ q: string; card: DrawnCard } | null>(null)
  const [oracleUp, setOracleUp] = useState(false)

  useEffect(() => {
    if (!shuffling) return
    const id = window.setTimeout(() => setShuffling(false), 1200)
    return () => window.clearTimeout(id)
  }, [shuffling])

  const startReading = (s: Spread) => {
    setSpread(s)
    setReading(drawReading(s, freshSeed()))
    setFlipped(new Set())
    setShuffling(true)
    setView('table')
  }

  const consultOracle = () => {
    const q = question.trim()
    if (q.length < 8) return
    setOracle({ q, card: drawOracle(q, profile) })
    setOracleUp(false)
  }

  const flip = (i: number) =>
    setFlipped((prev) => {
      const next = new Set(prev)
      next.add(i)
      return next
    })

  /* ------------------------------------------------------------- daily */
  if (view === 'daily') {
    const d = daily.cards[0]
    return (
      <div className="flex flex-col gap-4">
        {onBack && <BackButton onClick={onBack} />}

        <header className="px-1">
          <p className="eyebrow-hue">Tarot</p>
          <h1 className="mt-1 font-serif text-2xl leading-tight text-gilded">
            Your card for today
          </h1>
          <p className="mt-1 text-sm text-haze-300">
            {profile
              ? 'Shuffled for your chart and this date. It renews at midnight.'
              : 'One card for the day. It renews at midnight.'}
          </p>
        </header>

        <div className="mx-auto w-[210px]">
          <CardSlot
            drawn={d}
            faceUp={dailyUp}
            onFlip={() => {
              setDailyUp(true)
              markTarotDrawn()
            }}
          />
        </div>

        {dailyUp ? (
          <Interpretation drawn={d} />
        ) : (
          <p className="text-center text-sm text-haze-400">Tap the card to turn it.</p>
        )}

        <button
          type="button"
          onClick={() => setView('choose')}
          className="glass-panel glass-panel-active flex items-center justify-between p-4 text-left active:scale-[0.99]"
        >
          <span>
            <span className="font-serif text-lg text-white">
              Draw a full spread
            </span>
            <span className="block text-xs text-haze-300">
              Three cards, or the ten-card Celtic Cross
            </span>
          </span>
          <span style={{ color: 'var(--rz-hue)' }}>›</span>
        </button>

        <button
          type="button"
          onClick={() =>
            isPro
              ? setView('oracle')
              : onUpgrade?.('Ask the Oracle')
          }
          className="glass-panel flex items-center justify-between p-4 text-left active:scale-[0.99]"
        >
          <span>
            <span className="flex items-center gap-1.5 font-serif text-lg text-white">
              Ask the Oracle
              {!isPro && <LockIcon className="h-4 w-4 text-haze-400" />}
            </span>
            <span className="block text-xs text-haze-300">
              One card, one clear answer to your question
            </span>
          </span>
          <span style={{ color: 'var(--rz-hue)' }}>›</span>
        </button>
      </div>
    )
  }

  /* ------------------------------------------------------------ oracle */
  if (view === 'oracle') {
    return (
      <div className="flex flex-col gap-4">
        <BackButton
          onClick={() => {
            setView('daily')
            setOracle(null)
          }}
        />

        <header className="px-1">
          <p className="eyebrow-hue">Tarot · The Oracle</p>
          <h1 className="mt-1 font-serif text-2xl leading-tight text-gilded">
            Ask the Oracle
          </h1>
          <p className="mt-1 text-sm text-haze-300">
            One clear question — a decision, a “when”, or an open “what should I…”.
            The Oracle reads the card against what you asked.
          </p>
        </header>

        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows={3}
          placeholder="What do I need to understand about…"
          className="w-full resize-none rounded-2xl border border-white/12 bg-midnight-950/60 p-4 text-sm text-white outline-none transition focus:border-white/30"
        />

        <button
          type="button"
          onClick={consultOracle}
          disabled={question.trim().length < 8}
          className={`rounded-[0.9rem] px-4 py-3.5 text-sm uppercase ${
            question.trim().length < 8 ? 'btn-ghost opacity-55' : 'btn-primary'
          }`}
        >
          {oracle ? 'Ask again' : 'Consult the Oracle'}
        </button>

        {oracle && (
          <>
            <div className="mx-auto mt-1 w-[210px]">
              <button
                type="button"
                onClick={() => setOracleUp(true)}
                disabled={oracleUp}
                className="tf-scene block w-full"
                aria-label={oracleUp ? oracle.card.card.name : 'Turn the card'}
              >
                <div
                  className={`tf-card aspect-[200/340] ${oracleUp ? 'is-face' : ''}`}
                >
                  <div className="tf-side">
                    <TarotCardBack className="h-full w-full drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]" />
                  </div>
                  <div className="tf-side tf-side-face">
                    <TarotCardFace
                      card={oracle.card.card}
                      reversed={oracle.card.reversed}
                      className="h-full w-full drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                    />
                  </div>
                </div>
              </button>
            </div>

            {oracleUp ? (
              <OracleResult q={oracle.q} card={oracle.card} />
            ) : (
              <p className="text-center text-sm text-haze-400">
                Tap the card to turn it.
              </p>
            )}
          </>
        )}
      </div>
    )
  }

  /* ------------------------------------------------------------ choose */
  if (view === 'choose') {
    return (
      <div className="flex flex-col gap-4">
        <BackButton onClick={() => setView('daily')} />

        <header className="px-1">
          <p className="eyebrow-hue">Tarot</p>
          <h1 className="mt-1 font-serif text-2xl leading-tight text-gilded">
            Choose a spread
          </h1>
          <p className="mt-1 text-sm text-haze-300">
            Hold a question in mind, then pick how many cards to lay.
          </p>
        </header>

        <div className="flex flex-col gap-3">
          {SPREADS.map((s) => {
            const unlocked = spreadUnlocked(s.key, isPro)
            return (
              <button
                key={s.key}
                type="button"
                onClick={() =>
                  unlocked
                    ? startReading(s)
                    : onUpgrade?.('The 3-card & Celtic Cross spreads')
                }
                className={`glass-panel p-4 text-left active:scale-[0.99] ${
                  unlocked ? '' : 'opacity-60'
                }`}
              >
                <div className="flex items-center gap-2">
                  <h2 className="font-serif text-lg text-white">{s.name}</h2>
                  {unlocked ? (
                    <span className="ml-auto text-xs tabular-nums text-haze-400">
                      {s.positions.length} card{s.positions.length > 1 ? 's' : ''}
                    </span>
                  ) : (
                    <LockIcon className="ml-auto h-4 w-4 shrink-0 text-haze-400" />
                  )}
                </div>
                <p className="mt-1 text-sm text-haze-300">{s.blurb}</p>
              </button>
            )
          })}
        </div>
        {!isPro && (
          <p className="px-1 text-[11px] text-haze-500">
            The daily card is always free. Spreads are part of Resonance Pro.
          </p>
        )}
      </div>
    )
  }

  /* ------------------------------------------------------------- table */
  const cards = reading?.cards ?? []
  const allFlipped = flipped.size >= cards.length && cards.length > 0
  const layout =
    spread.key === 'one'
      ? 'mx-auto w-[210px]'
      : spread.key === 'three'
        ? 'grid grid-cols-3 gap-2'
        : 'grid grid-cols-2 gap-3'

  return (
    <div className="flex flex-col gap-4">
      <BackButton onClick={() => setView('choose')} />

      <header className="px-1">
        <p className="eyebrow-hue">Tarot · {spread.name}</p>
        <h1 className="mt-1 font-serif text-2xl leading-tight text-gilded">
          {shuffling
            ? 'Shuffling the deck…'
            : allFlipped
              ? 'The reading'
              : 'Turn each card'}
        </h1>
      </header>

      {shuffling ? (
        <div className="flex h-[280px] items-center justify-center">
          <div className="relative h-[210px] w-[124px]">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="absolute inset-0 animate-card-shuffle"
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                <TarotCardBack className="h-full w-full" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className={layout}>
            {cards.map((d, i) => (
              <div key={`${d.card.id}-${i}`} className="flex flex-col gap-1">
                {spread.key !== 'one' && (
                  <p className="text-center text-[10px] uppercase tracking-[0.1em] text-haze-500">
                    {spread.positions[i]?.label}
                  </p>
                )}
                <CardSlot
                  drawn={d}
                  faceUp={flipped.has(i)}
                  onFlip={() => flip(i)}
                />
              </div>
            ))}
          </div>

          {!allFlipped && (
            <p className="text-center text-sm text-haze-400">
              {flipped.size} of {cards.length} turned
            </p>
          )}

          <div className="flex flex-col gap-3">
            {cards.map((d, i) =>
              flipped.has(i) ? (
                <Interpretation
                  key={`int-${d.card.id}-${i}`}
                  position={
                    spread.key === 'one' ? undefined : spread.positions[i]
                  }
                  drawn={d}
                />
              ) : null,
            )}
          </div>

          {allFlipped && (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setView('choose')}
                className="flex-1 rounded-2xl border border-gold-400/50 bg-gold-500/15 px-4 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold-100 active:scale-[0.98]"
              >
                New spread
              </button>
              <button
                type="button"
                onClick={() => (onBack ? onBack() : setView('daily'))}
                className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-haze-200"
              >
                Done
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
