import { useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import {
  houseArena,
  ordinal,
  planetLabel,
  useT,
  type TFn,
} from '../lib/i18n'
import { useChakraField, type ChakraContact, type ChakraReading } from '../lib/chakraField'
import { useEntitlements } from '../lib/premium'
import { ChakraColumn } from './ChakraColumn'
import { LockIcon } from './icons'
import { Screen } from './Screen'
import type { RitualPreset } from '../types/resonance'

interface ChakraFieldProps {
  onBack: () => void
  onRitual: (preset: RitualPreset) => void
  onUpgrade: (reason?: string) => void
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

function contactLine(c: ChakraContact, t: TFn): string {
  const glyph = ASPECT_GLYPH[c.aspect] ?? '·'
  const body = planetLabel(c.other, t)
  const target = c.natal ? t('field.natalTarget', { body }) : body
  return t('field.contactLine', {
    planet: planetLabel(c.transiting, t),
    glyph,
    target,
  })
}

function ChakraRow({
  c,
  open,
  locked,
  onToggle,
  onRitual,
  t,
}: {
  c: ChakraReading
  open: boolean
  locked: boolean
  onToggle: () => void
  onRitual: (preset: RitualPreset) => void
  t: TFn
}) {
  const driverText = c.driver
    ? contactLine(c.driver, t)
    : c.tone === 'quiet'
      ? t('field.noAspect')
      : '—'

  return (
    <div
      className={`glass-panel overflow-hidden ${c.focus ? 'glass-panel-active' : ''} ${
        locked ? 'opacity-70' : ''
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={locked ? undefined : open}
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
                {t('field.today')}
              </span>
            )}
          </span>
          <span className="mt-0.5 block truncate text-xs text-haze-300">
            {driverText}
          </span>
        </span>
        <span className="flex shrink-0 items-center gap-2 text-right">
          <span>
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
          {locked && <LockIcon className="h-4 w-4 shrink-0 text-haze-400" />}
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
                  <span className="text-haze-100">{contactLine(ct, t)}</span>
                  <span className="data shrink-0 text-haze-400">
                    {ct.orbDelta.toFixed(1)}°{' '}
                    <span aria-hidden>{ct.applying ? '↑' : '↓'}</span>
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-xs text-haze-400">
              {t('field.nothingAspecting')}
            </p>
          )}

          {c.house && c.house >= 1 && (
            <p className="mt-3 text-xs text-haze-300">
              {t('field.landingHouse', {
                ord: ordinal(c.house, t),
                arena: houseArena(c.house, t),
              })}
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
            {t('field.tune', { chakra: c.name, hz: c.frequency })}
          </button>
        </div>
      )}
    </div>
  )
}

export function ChakraField({ onBack, onRitual, onUpgrade }: ChakraFieldProps) {
  const t = useT()
  const field = useChakraField()
  const hasNatal = useAppStore((s) => s.hasNatal)
  const editProfile = useAppStore((s) => s.editProfile)
  const { isPro } = useEntitlements()
  const [open, setOpen] = useState<ChakraReading['key'] | null>(null)

  const focus = field.find((c) => c.focus) ?? field[3]
  const strained = field.filter(
    (c) => c.tone === 'blocked' || c.tone === 'strained',
  )
  const flowing = field.filter((c) => c.tone === 'open' || c.tone === 'lit')
  const list = (cs: ChakraReading[]): string =>
    cs.map((c) => c.name).join(t('field.summary.join'))
  const verb = (n: number): string =>
    n > 1 ? t('field.summary.are') : t('field.summary.is')

  let summary: string
  if (!hasNatal) {
    summary = t('field.summary.noNatal')
  } else if (strained.length > 0) {
    const others = strained.filter((c) => !c.focus)
    summary = strained.some((c) => c.focus)
      ? t('field.summary.strainFocus', {
          focus: focus.name,
          others: others.length
            ? t('field.summary.strainFocusOthers', { names: list(others) })
            : '',
        })
      : t('field.summary.strainNoFocus', {
          focus: focus.name,
          names: list(strained),
          verb: verb(strained.length),
        })
  } else if (flowing.length > 0) {
    summary = t('field.summary.flowing', {
      focus: focus.name,
      names: list(flowing),
      verb: verb(flowing.length),
    })
  } else {
    summary = t('field.summary.even', { focus: focus.name })
  }

  return (
    <Screen
      eyebrow={t('field.eyebrow')}
      title={t('field.title')}
      subtitle={t('field.sub')}
      onBack={onBack}
      action={
        hasNatal ? undefined : (
          <button
            type="button"
            onClick={editProfile}
            className="text-[10px] uppercase tracking-[0.14em] text-gold-300"
          >
            {t('field.addChart')}
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
        {field.map((c) => {
          const locked = !isPro && !c.focus
          return (
            <ChakraRow
              key={c.key}
              c={c}
              locked={locked}
              open={open === c.key}
              onToggle={() =>
                locked
                  ? onUpgrade(t('field.reasonFull'))
                  : setOpen((cur) => (cur === c.key ? null : c.key))
              }
              onRitual={onRitual}
              t={t}
            />
          )
        })}
      </div>

      {!isPro && (
        <button
          type="button"
          onClick={() => onUpgrade(t('field.reasonFull'))}
          className="glass-panel glass-panel-active flex items-center justify-between gap-3 p-4 text-left active:scale-[0.99]"
        >
          <span>
            <span className="flex items-center gap-1.5 font-serif text-lg text-white">
              <LockIcon className="h-4 w-4 text-gold-300" />
              {t('field.openEvery')}
            </span>
            <span className="mt-0.5 block text-xs text-haze-300">
              {t('field.openEverySub')}
            </span>
          </span>
          <span style={{ color: 'var(--rz-hue)' }}>›</span>
        </button>
      )}

      <p className="px-1 pb-2 text-[11px] leading-relaxed text-haze-500">
        {t('field.footer')}
      </p>
    </Screen>
  )
}
