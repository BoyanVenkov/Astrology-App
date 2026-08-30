import { useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import { HOUSE_ARENA, ORDINAL } from '../lib/astrology'
import { useChakraField, type ChakraContact, type ChakraReading } from '../lib/chakraField'
import { ChakraColumn } from './ChakraColumn'
import { Screen } from './Screen'
import type { RitualPreset } from '../types/resonance'

interface ChakraFieldProps {
  onBack: () => void
  onRitual: (preset: RitualPreset) => void
}

const ASPECT_GLYPH: Record<string, string> = {
  conjunction: '☌︎',
  opposition: '☍︎',
  square: '□︎',
  trine: '△︎',
  sextile: '⚹︎',
}

const TONE_COLOR: Record<ChakraReading['tone'], string> = {
  blocked: '#f87171',
  strained: '#fb923c',
  quiet: '#94a3b8',
  steady: '#9aa6c9',
  lit: '#eccd82',
  open: '#6ee7b7',
}

function contactLine(c: ChakraContact): string {
  const glyph = ASPECT_GLYPH[c.aspect] ?? '·'
  const target = c.natal ? `natal ${c.other}` : c.other
  return `${c.transiting} ${glyph} ${target}`
}

function ChakraRow({
  c,
  open,
  onToggle,
  onRitual,
}: {
  c: ChakraReading
  open: boolean
  onToggle: () => void
  onRitual: (preset: RitualPreset) => void
}) {
  const driverText = c.driver
    ? contactLine(c.driver)
    : c.tone === 'quiet'
      ? 'No aspect in orb'
      : '—'

  return (
    <div
      className={`glass-panel overflow-hidden ${c.focus ? 'glass-panel-active' : ''}`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center gap-3 p-4 text-left active:scale-[0.995]"
      >
        <span
          className="h-3.5 w-3.5 shrink-0 rounded-full"
          style={{ background: c.color, boxShadow: `0 0 12px ${c.color}` }}
        />
        <span className="min-w-0 flex-1">
          <span className="flex items-baseline gap-2">
            <span className="font-serif text-lg leading-tight text-white">
              {c.name}
            </span>
            {c.focus && (
              <span className="eyebrow" style={{ color: 'var(--rz-hue)' }}>
                Today
              </span>
            )}
          </span>
          <span className="mt-0.5 block truncate text-xs text-haze-300">
            {driverText}
          </span>
        </span>
        <span className="shrink-0 text-right">
          <span
            className="block text-[11px] font-semibold uppercase tracking-[0.12em]"
            style={{ color: TONE_COLOR[c.tone] }}
          >
            {c.state}
          </span>
          <span className="data block text-[11px] text-haze-400">
            {c.charge}
            {c.driver ? ` · ${c.driver.orbDelta.toFixed(1)}°` : ''}
          </span>
        </span>
      </button>

      {/* charge bar */}
      <div className="mx-4 -mt-1 h-[3px] rounded-full bg-white/[0.06]">
        <div
          className="h-full rounded-full"
          style={{
            width: `${c.charge}%`,
            background: c.color,
            boxShadow: `0 0 8px ${c.color}`,
          }}
        />
      </div>

      {open && (
        <div className="animate-rise-in border-t border-white/[0.06] px-4 py-4">
          <p className="text-[11px] uppercase tracking-[0.14em] text-haze-500">
            {c.sanskrit} · {c.element} · {c.location}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-haze-200">{c.theme}.</p>

          {c.contacts.length > 0 ? (
            <ul className="mt-3 flex flex-col gap-1.5">
              {c.contacts.map((ct, i) => (
                <li
                  key={`${ct.transiting}-${ct.other}-${ct.aspect}-${i}`}
                  className="flex items-center justify-between text-xs"
                >
                  <span className="text-haze-100">{contactLine(ct)}</span>
                  <span className="data shrink-0 text-haze-400">
                    {ct.orbDelta.toFixed(1)}°{' '}
                    <span aria-hidden>{ct.applying ? '↑' : '↓'}</span>
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-xs text-haze-400">
              Nothing is aspecting this centre today — it&rsquo;s running clear.
            </p>
          )}

          {c.house && HOUSE_ARENA[c.house] && (
            <p className="mt-3 text-xs text-haze-300">
              Landing in your {ORDINAL[c.house]} house — {HOUSE_ARENA[c.house]}.
            </p>
          )}

          <p
            className="mt-3 rounded-xl border px-3 py-2 text-sm"
            style={{
              borderColor: `${c.color}33`,
              background: `${c.color}0f`,
              color: '#e7ecfa',
            }}
          >
            {c.cue}
          </p>

          <button
            type="button"
            onClick={() =>
              onRitual({ mode: 'frequency', frequency: c.frequency, minutes: 10 })
            }
            className="mt-3 w-full rounded-[0.9rem] border border-white/10 bg-white/[0.03] py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-haze-200 active:bg-white/[0.08]"
          >
            Tune the {c.name} · {c.frequency} Hz
          </button>
        </div>
      )}
    </div>
  )
}

export function ChakraField({ onBack, onRitual }: ChakraFieldProps) {
  const field = useChakraField()
  const hasNatal = useAppStore((s) => s.hasNatal)
  const editProfile = useAppStore((s) => s.editProfile)
  const [open, setOpen] = useState<ChakraReading['key'] | null>(null)

  const focus = field.find((c) => c.focus) ?? field[3]
  const strained = field.filter(
    (c) => c.tone === 'blocked' || c.tone === 'strained',
  )
  const flowing = field.filter((c) => c.tone === 'open' || c.tone === 'lit')
  const list = (cs: ChakraReading[]): string =>
    cs.map((c) => c.name).join(' and ')

  let summary: string
  if (!hasNatal) {
    summary =
      'Read from the transiting Moon. Add your birth chart for a field tuned to your own planets.'
  } else if (strained.length > 0) {
    const others = strained.filter((c) => !c.focus)
    summary = strained.some((c) => c.focus)
      ? `${focus.name} carries the day and takes the most strain${others.length ? `, with ${list(others)} close behind` : ''}.`
      : `${focus.name} carries the day; ${list(strained)} ${strained.length > 1 ? 'are' : 'is'} under the most strain.`
  } else if (flowing.length > 0) {
    summary = `${focus.name} carries the day, and ${list(flowing)} ${flowing.length > 1 ? 'are' : 'is'} wide open.`
  } else {
    summary = `${focus.name} carries the day. The rest of the field is fairly even.`
  }

  return (
    <Screen
      eyebrow="Your energy"
      title="The Chakra Field"
      subtitle="Where today's sky lands in the body"
      onBack={onBack}
      action={
        hasNatal ? undefined : (
          <button
            type="button"
            onClick={editProfile}
            className="text-[10px] uppercase tracking-[0.14em] text-gold-300"
          >
            Add chart
          </button>
        )
      }
    >
      <div className="flex justify-center py-1">
        <ChakraColumn
          field={field}
          size={300}
          labels
          selected={open}
          onSelect={(k) => setOpen((cur) => (cur === k ? null : k))}
        />
      </div>

      <p className="px-1 text-sm leading-relaxed text-haze-300">{summary}</p>

      <div className="flex flex-col gap-2.5">
        {field.map((c) => (
          <ChakraRow
            key={c.key}
            c={c}
            open={open === c.key}
            onToggle={() => setOpen((cur) => (cur === c.key ? null : c.key))}
            onRitual={onRitual}
          />
        ))}
      </div>

      <p className="px-1 pb-2 text-[11px] leading-relaxed text-haze-500">
        Each planet resonates with one centre; its aspects to your chart charge
        or strain it. Soft aspects open a centre, hard aspects put it under
        pressure. Recomputed through the day as the planets move.
      </p>
    </Screen>
  )
}
