import { runeText, type DrawnRune } from '../lib/runes'
import type { TFn } from '../lib/i18n'
import { RuneGlyph } from './RuneGlyph'

/**
 * A cast rune stone. Face-down it's a plain river stone; tap and it turns to
 * show the rune carved into it, in gold, upright or merkstave.
 */

function StoneShell({
  children,
  carved = false,
}: {
  children: React.ReactNode
  carved?: boolean
}) {
  return (
    <div
      className="grid aspect-[5/6] w-full place-items-center rounded-[22%]"
      style={{
        background:
          'radial-gradient(120% 100% at 30% 20%, #333949, #23283492 55%, #1a1d27)',
        border: '1px solid rgba(255,255,255,0.10)',
        boxShadow: carved
          ? 'inset 0 2px 10px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.04), 0 14px 34px -12px rgba(0,0,0,0.6)'
          : 'inset 0 1px 0 rgba(255,255,255,0.08), 0 14px 34px -12px rgba(0,0,0,0.6)',
      }}
    >
      {children}
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
      <div className={`tf-card aspect-[5/6] ${faceUp ? 'is-face' : ''}`}>
        <div className="tf-side">
          <StoneShell>
            <span
              className="font-serif text-2xl"
              style={{ color: 'rgba(212,175,55,0.28)' }}
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
              strokeWidth={2.2}
              className="h-[62%] w-[62%]"
              style={{
                color: '#e3c063',
                filter:
                  'drop-shadow(0 1px 0 rgba(0,0,0,0.65)) drop-shadow(0 0 6px rgba(227,192,99,0.25))',
              }}
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
      className="grid shrink-0 place-items-center rounded-[26%]"
      style={{
        width: size,
        height: size * 1.16,
        background:
          'radial-gradient(120% 100% at 30% 20%, #333949, #23283492 55%, #1a1d27)',
        border: '1px solid rgba(255,255,255,0.10)',
        boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.45)',
      }}
    >
      <RuneGlyph
        runeKey={drawn.key}
        merkstave={drawn.merkstave}
        className="h-[64%] w-[64%]"
        style={{ color: '#e3c063' }}
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
