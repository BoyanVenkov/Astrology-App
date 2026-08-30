import { useEffect, useMemo, useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import {
  dailySeed,
  drawReading,
  freshSeed,
  SPREADS,
  spreadOf,
  type DrawnCard,
  type Spread,
  type TarotReading,
} from '../lib/tarot'
import { localDayKey } from '../lib/timezone'
import { TarotCardBack, TarotCardFace } from './TarotCard'

interface TarotReaderProps {
  onBack: () => void
}

type View = 'daily' | 'choose' | 'table'

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

/* ---------------------------------------------------------------- reader */

export function TarotReader({ onBack }: TarotReaderProps) {
  const profile = useAppStore((s) => s.profile)
  const drawnDay = useAppStore((s) => s.tarotDrawnDay)
  const markTarotDrawn = useAppStore((s) => s.markTarotDrawn)

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
        <button
          type="button"
          onClick={onBack}
          className="self-start text-xs uppercase tracking-[0.14em] text-gold-300 active:text-gold-100"
        >
          ‹ Back
        </button>

        <header className="px-1">
          <p className="eyebrow">Tarot</p>
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
      </div>
    )
  }

  /* ------------------------------------------------------------ choose */
  if (view === 'choose') {
    return (
      <div className="flex flex-col gap-4">
        <button
          type="button"
          onClick={() => setView('daily')}
          className="self-start text-xs uppercase tracking-[0.14em] text-gold-300 active:text-gold-100"
        >
          ‹ Back
        </button>

        <header className="px-1">
          <p className="eyebrow">Tarot</p>
          <h1 className="mt-1 font-serif text-2xl leading-tight text-gilded">
            Choose a spread
          </h1>
          <p className="mt-1 text-sm text-haze-300">
            Hold a question in mind, then pick how many cards to lay.
          </p>
        </header>

        <div className="flex flex-col gap-3">
          {SPREADS.map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() => startReading(s)}
              className="glass-panel p-4 text-left active:scale-[0.99]"
            >
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-lg text-white">{s.name}</h2>
                <span className="ml-auto text-xs tabular-nums text-haze-400">
                  {s.positions.length} card{s.positions.length > 1 ? 's' : ''}
                </span>
              </div>
              <p className="mt-1 text-sm text-haze-300">{s.blurb}</p>
            </button>
          ))}
        </div>
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
      <button
        type="button"
        onClick={() => setView('choose')}
        className="self-start text-xs uppercase tracking-[0.14em] text-gold-300 active:text-gold-100"
      >
        ‹ Spreads
      </button>

      <header className="px-1">
        <p className="eyebrow">Tarot · {spread.name}</p>
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
                onClick={onBack}
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
