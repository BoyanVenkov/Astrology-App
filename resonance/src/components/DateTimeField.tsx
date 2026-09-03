import { useEffect, useMemo, useRef, useState } from 'react'
import { useT } from '../lib/i18n'

/**
 * Birth date / time inputs styled to the app instead of the OS's default
 * calendar and clock-face dialogs. A tap opens a bottom sheet with scroll
 * wheels; "Done" commits.
 */

const ROW = 44
const VISIBLE = 5
const PAD_ROWS = (VISIBLE - 1) / 2

const reduceMotion = (): boolean => {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch {
    return false
  }
}

/* ------------------------------------------------------------- scroll wheel */

function ScrollColumn({
  items,
  index,
  onIndex,
  width,
}: {
  items: string[]
  index: number
  onIndex: (i: number) => void
  width: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const settleTimer = useRef<number | undefined>(undefined)
  const programmatic = useRef(false)

  // keep the wheel aligned to the selected index (also when the day list shrinks)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const target = index * ROW
    if (Math.abs(el.scrollTop - target) > 1) {
      programmatic.current = true
      el.scrollTop = target
      window.setTimeout(() => (programmatic.current = false), 60)
    }
  }, [index, items.length])

  const settle = () => {
    const el = ref.current
    if (!el) return
    const i = Math.max(0, Math.min(items.length - 1, Math.round(el.scrollTop / ROW)))
    if (i !== index) onIndex(i)
    if (Math.abs(el.scrollTop - i * ROW) > 1) {
      programmatic.current = true
      el.scrollTo({ top: i * ROW, behavior: reduceMotion() ? 'auto' : 'smooth' })
      window.setTimeout(() => (programmatic.current = false), 260)
    }
  }

  const onScroll = () => {
    if (programmatic.current) return
    window.clearTimeout(settleTimer.current)
    settleTimer.current = window.setTimeout(settle, 120)
  }

  return (
    <div className="relative" style={{ height: ROW * VISIBLE, width }}>
      <div
        ref={ref}
        onScroll={onScroll}
        className="no-scrollbar h-full snap-y snap-mandatory overflow-y-scroll overscroll-contain"
      >
        <div style={{ height: ROW * PAD_ROWS }} />
        {items.map((it, i) => (
          <button
            key={it}
            type="button"
            onClick={() => {
              onIndex(i)
              ref.current?.scrollTo({
                top: i * ROW,
                behavior: reduceMotion() ? 'auto' : 'smooth',
              })
            }}
            className="flex w-full snap-center items-center justify-center tabular-nums transition-colors"
            style={{ height: ROW }}
          >
            <span
              className={
                i === index
                  ? 'font-serif text-xl text-white'
                  : 'text-base text-haze-500'
              }
            >
              {it}
            </span>
          </button>
        ))}
        <div style={{ height: ROW * PAD_ROWS }} />
      </div>

      {/* centre selection band */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-1 top-1/2 -translate-y-1/2 rounded-lg"
        style={{
          height: ROW,
          boxShadow:
            'inset 0 0 0 1px color-mix(in srgb, var(--rz-hue) 30%, transparent)',
          background: 'color-mix(in srgb, var(--rz-hue) 8%, transparent)',
        }}
      />
      {/* fade top / bottom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0"
        style={{ height: ROW * 2, background: 'linear-gradient(#0a0e1f, transparent)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0"
        style={{ height: ROW * 2, background: 'linear-gradient(transparent, #0a0e1f)' }}
      />
    </div>
  )
}

/* ---------------------------------------------------------------- the sheet */

function PickerSheet({
  title,
  onClose,
  onDone,
  children,
}: {
  title: string
  onClose: () => void
  onDone: () => void
  children: React.ReactNode
}) {
  const t = useT()
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-end bg-midnight-void/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="mx-auto w-full max-w-md rounded-t-3xl border-t border-white/10 bg-[#0a0e1f] p-5"
        onClick={(e) => e.stopPropagation()}
        style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}
      >
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-white/20" />
        <p className="eyebrow-hue text-center">{title}</p>
        <div className="mt-3 flex justify-center gap-1">{children}</div>
        <button
          type="button"
          onClick={onDone}
          className="btn-primary mt-4 w-full px-4 py-3.5 text-sm uppercase"
        >
          {t('common.done')}
        </button>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------- helpers */

const trigger =
  'w-full min-w-0 rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 py-3 text-start text-white outline-none transition active:border-white/30 active:bg-white/[0.06]'

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
const pad2 = (n: number): string => `${n}`.padStart(2, '0')
const daysIn = (year: number, month1: number): number =>
  new Date(year, month1, 0).getDate()
const MIN_YEAR = 1920

interface Ymd {
  y: number
  m: number
  d: number
}

/* ------------------------------------------------------------ date bits */

function DateSheet({
  initial,
  max,
  onClose,
  onCommit,
}: {
  initial: Ymd
  max: Ymd
  onClose: () => void
  onCommit: (value: string) => void
}) {
  const t = useT()
  const [draft, setDraft] = useState<Ymd>(initial)

  const years = useMemo(
    () => Array.from({ length: max.y - MIN_YEAR + 1 }, (_, i) => MIN_YEAR + i),
    [max.y],
  )
  const monthCount = draft.y === max.y ? max.m : 12
  const dayCount =
    draft.y === max.y && draft.m === max.m
      ? Math.min(daysIn(draft.y, draft.m), max.d)
      : daysIn(draft.y, draft.m)

  const setYear = (y: number) => {
    const m = Math.min(draft.m, y === max.y ? max.m : 12)
    const maxD =
      y === max.y && m === max.m
        ? Math.min(daysIn(y, m), max.d)
        : daysIn(y, m)
    setDraft({ y, m, d: Math.min(draft.d, maxD) })
  }
  const setMonth = (m: number) => {
    const maxD =
      draft.y === max.y && m === max.m
        ? Math.min(daysIn(draft.y, m), max.d)
        : daysIn(draft.y, m)
    setDraft({ ...draft, m, d: Math.min(draft.d, maxD) })
  }

  return (
    <PickerSheet
      title={t('picker.birthDate')}
      onClose={onClose}
      onDone={() => onCommit(`${draft.y}-${pad2(draft.m)}-${pad2(draft.d)}`)}
    >
      <ScrollColumn
        width="8.5rem"
        items={MONTHS.slice(0, monthCount)}
        index={draft.m - 1}
        onIndex={(i) => setMonth(i + 1)}
      />
      <ScrollColumn
        width="3.75rem"
        items={Array.from({ length: dayCount }, (_, i) => `${i + 1}`)}
        index={Math.min(draft.d, dayCount) - 1}
        onIndex={(i) => setDraft({ ...draft, d: i + 1 })}
      />
      <ScrollColumn
        width="5rem"
        items={years.map(String)}
        index={draft.y - MIN_YEAR}
        onIndex={(i) => setYear(MIN_YEAR + i)}
      />
    </PickerSheet>
  )
}

export function DateField({
  value,
  max,
  onChange,
}: {
  /** `YYYY-MM-DD` or empty. */
  value: string
  /** `YYYY-MM-DD` — no later date can be picked. */
  max: string
  onChange: (value: string) => void
}) {
  const [open, setOpen] = useState(false)

  const maxYmd = useMemo<Ymd>(() => {
    const [y, m, d] = max.split('-').map(Number)
    return { y, m, d }
  }, [max])

  const current = useMemo<Ymd | null>(() => {
    const [y, m, d] = value.split('-').map(Number)
    return value && Number.isFinite(y) ? { y, m, d } : null
  }, [value])

  const t = useT()
  const display = current
    ? new Date(current.y, current.m - 1, current.d).toLocaleDateString(undefined, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : t('picker.chooseDate')

  return (
    <>
      <button type="button" className={trigger} onClick={() => setOpen(true)}>
        <span className={current ? '' : 'text-haze-400'}>{display}</span>
      </button>
      {open && (
        <DateSheet
          initial={current ?? { y: maxYmd.y - 28, m: 6, d: 15 }}
          max={maxYmd}
          onClose={() => setOpen(false)}
          onCommit={(v) => {
            onChange(v)
            setOpen(false)
          }}
        />
      )}
    </>
  )
}

/* ------------------------------------------------------------ time bits */

function TimeSheet({
  initialH,
  initialM,
  label,
  onClose,
  onCommit,
}: {
  initialH: number
  initialM: number
  label: string
  onClose: () => void
  onCommit: (value: string) => void
}) {
  const [h, setH] = useState(initialH)
  const [m, setM] = useState(initialM)

  return (
    <PickerSheet
      title={label}
      onClose={onClose}
      onDone={() => onCommit(`${pad2(h)}:${pad2(m)}`)}
    >
      <ScrollColumn
        width="4.5rem"
        items={Array.from({ length: 24 }, (_, i) => pad2(i))}
        index={h}
        onIndex={setH}
      />
      <span className="self-center font-serif text-2xl text-haze-500">:</span>
      <ScrollColumn
        width="4.5rem"
        items={Array.from({ length: 60 }, (_, i) => pad2(i))}
        index={m}
        onIndex={setM}
      />
    </PickerSheet>
  )
}

export function TimeField({
  value,
  onChange,
  label,
}: {
  /** `HH:MM`, 24-hour. */
  value: string
  onChange: (value: string) => void
  label?: string
}) {
  const t = useT()
  const [open, setOpen] = useState(false)
  const [h, m] = value.split(':').map(Number)
  const safeH = Number.isFinite(h) ? h : 12
  const safeM = Number.isFinite(m) ? m : 0

  return (
    <>
      <button type="button" className={trigger} onClick={() => setOpen(true)}>
        <span className="tabular-nums">
          {pad2(safeH)}:{pad2(safeM)}
        </span>
      </button>
      {open && (
        <TimeSheet
          initialH={safeH}
          initialM={safeM}
          label={label ?? t('picker.birthTime')}
          onClose={() => setOpen(false)}
          onCommit={(v) => {
            onChange(v)
            setOpen(false)
          }}
        />
      )}
    </>
  )
}
