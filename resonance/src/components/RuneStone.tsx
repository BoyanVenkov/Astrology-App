import { runeText, type DrawnRune } from '../lib/runes'
import type { TFn } from '../lib/i18n'
import { RuneGlyph } from './RuneGlyph'
import stoneArt from '../assets/art/rune-stone-blank.webp'

/**
 * A cast rune stone — a photographed slate river pebble (Gemini, keyed).
 * Face-down it carries a faint gold sigil; tap and it turns to show the rune
 * carved into it, in gold, upright or merkstave.
 */

/** The carved-gold look: a lit lower lip, a shadowed upper edge, a warm glow. */
const CARVED = {
  color: '#e9c873',
  filter:
    'drop-shadow(0 1px 0 rgba(255,255,255,0.18)) drop-shadow(0 -1px 0 rgba(0,0,0,0.85)) drop-shadow(0 0 8px rgba(233,200,115,0.45))',
}

function StoneShell({
  children,
  carved = false,
}: {
  children: React.ReactNode
  carved?: boolean
}) {
  return (
    <div className="relative grid aspect-[12/11] w-full place-items-center">
      <span
        aria-hidden
        className="absolute inset-[14%] rounded-full blur-2xl"
        style={{ background: 'var(--rz-gold-glow)', opacity: carved ? 0.5 : 0.3 }}
      />
      <img
        src={stoneArt}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_18px_26px_rgba(0,0,0,0.65)]"
        style={carved ? { filter: 'brightness(0.92) contrast(1.05)' } : undefined}
      />
      <span className="relative grid h-full w-full place-items-center">{children}</span>
    </div>
  )
}

export function RuneStoneSlot({
  drawn,
  faceUp,
  onReveal,
  t,
}: {
  drawn: DrawnRune
  faceUp: boolean
  onReveal: () => void
  t: TFn
}) {
  return (
    <button
      type="button"
      onClick={onReveal}
      disabled={faceUp}
      className="tf-scene block w-full"
      aria-label={faceUp ? runeText(drawn.key, drawn.merkstave, t).name : t('rune.turnStone')}
    >
      <div className={`tf-card aspect-[12/11] ${faceUp ? 'is-face' : ''}`}>
        <div className="tf-side">
          <StoneShell>
            <span
              className="animate-pulse-glow font-serif text-4xl"
              style={{
                color: 'rgba(233,200,115,0.55)',
                textShadow: '0 0 14px rgba(233,200,115,0.4)',
              }}
            >
              ✦
            </span>
          </StoneShell>
        </div>
        <div className="tf-side tf-side-face">
          <StoneShell carved>
            <RuneGlyph
              runeKey={drawn.key}
              merkstave={drawn.merkstave}
              strokeWidth={2.4}
              className="h-[52%] w-[52%]"
              style={CARVED}
            />
          </StoneShell>
        </div>
      </div>
    </button>
  )
}

/** A small inline stone — for spreads and the library list. */
export function RuneChip({
  drawn,
  size = 44,
}: {
  drawn: DrawnRune
  size?: number
}) {
  return (
    <span
      className="relative grid shrink-0 place-items-center"
      style={{ width: size * 1.1, height: size }}
    >
      <img
        src={stoneArt}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_6px_8px_rgba(0,0,0,0.6)]"
      />
      <RuneGlyph
        runeKey={drawn.key}
        merkstave={drawn.merkstave}
        strokeWidth={2.4}
        className="relative h-[56%] w-[56%]"
        style={CARVED}
      />
    </span>
  )
}

/** The reading article for one drawn rune. */
export function RuneInterpretation({
  drawn,
  position,
  t,
}: {
  drawn: DrawnRune
  position?: { label: string; prompt: string }
  t: TFn
}) {
  const text = runeText(drawn.key, drawn.merkstave, t)
  return (
    <article className="glass-panel animate-rise-in p-4">
      {position && (
        <p className="eyebrow">
          {position.label}
          <span className="ms-2 normal-case tracking-normal text-haze-500">
            {position.prompt}
          </span>
        </p>
      )}
      <p className="mt-1.5 font-serif text-xl text-white">
        {text.name}
        {drawn.merkstave && (
          <span className="ms-2 text-sm uppercase tracking-[0.14em] text-amber-300">
            {t('rune.merkstave')}
          </span>
        )}
      </p>
      <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-haze-400">
        {text.keywords.join(' · ')}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-haze-100">{text.body}</p>
      {drawn.merkstave && (
        <p className="mt-2 text-xs italic text-haze-400">
          {t('rune.merkstaveNote')}
        </p>
      )}
    </article>
  )
}
