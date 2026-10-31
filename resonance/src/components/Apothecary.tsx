import { useMemo, useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import { ALL_CRYSTALS } from '../data/esoteric'
import { crystalDesc, crystalKeywords, crystalName } from '../lib/crystals'
import { chakraLabel, useT } from '../lib/i18n'
import { CHAKRA_ORDER, chakraColor } from '../lib/resonanceData'
import { Screen } from './Screen'
import { Chip, GemArt, ListRow, SegmentedTabs } from './ui'
import { SearchIcon } from './icons'
import type { ChakraKey } from '../types/resonance'

interface ApothecaryProps {
  onBack: () => void
  onPractice: () => void
}

type Tab = 'all' | 'chakra' | 'intention'

/** The crystal apothecary — today's transit-matched stones, then the full catalogue. */
export function Apothecary({ onBack, onPractice }: ApothecaryProps) {
  const t = useT()
  const dailyCrystals = useAppStore((s) => s.dailyCrystals)
  const transit = useAppStore((s) => s.transit)
  const todayNames = useMemo(
    () => new Set(dailyCrystals.map((c) => c.name)),
    [dailyCrystals],
  )

  const [tab, setTab] = useState<Tab>('all')
  const [chakra, setChakra] = useState<ChakraKey>(
    transit?.resonantChakra ?? 'heart',
  )
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState<string | null>(null)

  // every stone with its keywords in the reader's language, read once
  const catalogue = useMemo(
    () =>
      ALL_CRYSTALS.map((c) => ({
        crystal: c,
        name: crystalName(c.name, t),
        keywords: crystalKeywords(c, t),
      })),
    [t],
  )

  // intentions = the catalogue's own most-shared keywords
  const intentions = useMemo(() => {
    const count = new Map<string, number>()
    for (const c of catalogue)
      for (const k of c.keywords) count.set(k, (count.get(k) ?? 0) + 1)
    return [...count.entries()]
      .filter(([, n]) => n > 1)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 14)
      .map(([k]) => k)
  }, [catalogue])
  const [intention, setIntention] = useState<string | null>(null)
  const activeIntention = intention ?? intentions[0] ?? null

  const list = useMemo(() => {
    const q = query.trim().toLocaleLowerCase()
    const pool = catalogue.filter((c) => {
      if (tab === 'chakra' && c.crystal.chakra !== chakra) return false
      if (tab === 'intention' && activeIntention && !c.keywords.includes(activeIntention))
        return false
      if (
        q &&
        !c.name.toLocaleLowerCase().includes(q) &&
        !c.keywords.some((k) => k.toLocaleLowerCase().includes(q))
      )
        return false
      return true
    })
    return [
      ...pool.filter((c) => todayNames.has(c.crystal.name)),
      ...pool.filter((c) => !todayNames.has(c.crystal.name)),
    ]
  }, [catalogue, tab, chakra, activeIntention, query, todayNames])

  return (
    <Screen
      eyebrow={t('scr.apoth.eyebrow')}
      title={t('scr.apoth.title')}
      subtitle={
        transit
          ? t('scr.apoth.subChart', {
              chakra: chakraLabel(transit.resonantChakra, t),
              n: ALL_CRYSTALS.length,
            })
          : t('scr.apoth.subPlain', { n: ALL_CRYSTALS.length })
      }
      onBack={onBack}
      action={
        <button
          type="button"
          onClick={() => setSearchOpen((v) => !v)}
          aria-label={t('scr.apoth.search')}
          aria-expanded={searchOpen}
          className="glass-veil grid h-10 w-10 place-items-center rounded-full text-[#f6ecd2] transition hover:text-white active:scale-90"
        >
          <SearchIcon className="h-5 w-5" />
        </button>
      }
      width="wide"
    >
      {searchOpen && (
        <label className="animate-rise-in relative block">
          <span className="sr-only">{t('scr.apoth.search')}</span>
          <SearchIcon
            aria-hidden
            className="pointer-events-none absolute start-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-haze-300"
          />
          <input
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('scr.apoth.search')}
            className="field-input ps-11"
          />
        </label>
      )}

      <SegmentedTabs
        label={t('scr.apoth.tabsLabel')}
        value={tab}
        onChange={setTab}
        className="md:max-w-xl"
        options={[
          { key: 'all', label: t('scr.apoth.all') },
          { key: 'chakra', label: t('scr.apoth.tabChakra') },
          { key: 'intention', label: t('scr.apoth.tabIntention') },
        ]}
      />

      {tab === 'chakra' && (
        <div className="no-scrollbar -mx-1 -mt-1 flex gap-2 overflow-x-auto px-1 md:flex-wrap md:overflow-visible">
          {CHAKRA_ORDER.map((k) => (
            <Chip key={k} active={chakra === k} onClick={() => setChakra(k)}>
              <span
                aria-hidden
                className="me-1.5 inline-block h-2 w-2 rounded-full align-middle"
                style={{ background: chakraColor(k) }}
              />
              {chakraLabel(k, t)}
            </Chip>
          ))}
        </div>
      )}
      {tab === 'intention' && (
        <div className="no-scrollbar -mx-1 -mt-1 flex gap-2 overflow-x-auto px-1 md:flex-wrap md:overflow-visible">
          {intentions.map((k) => (
            <Chip key={k} active={activeIntention === k} onClick={() => setIntention(k)}>
              {k}
            </Chip>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 items-start gap-2.5 md:grid-cols-2">
        {list.map(({ crystal, name, keywords }, i) => {
          const isToday = todayNames.has(crystal.name)
          return (
            <ListRow
              key={crystal.id}
              delay={Math.min(i, 10) * 30}
              active={isToday}
              expanded={open === crystal.id}
              onClick={() => setOpen((o) => (o === crystal.id ? null : crystal.id))}
              leading={<GemArt name={crystal.name} color={crystal.color} className="h-14 w-14 shrink-0" />}
              title={
                <span className="flex items-center gap-2">
                  <span className="font-serif text-[1.08rem] font-medium">{name}</span>
                  {isToday && (
                    <span className="rounded-full border border-[rgba(232,194,116,0.45)] px-2 py-px text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-[color:var(--rz-gold)]">
                      {t('scr.apoth.today')}
                    </span>
                  )}
                </span>
              }
              sub={keywords.slice(0, 3).join(' · ')}
            >
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-haze-400">
                {t('scr.apoth.meta', {
                  chakra: chakraLabel(crystal.chakra, t),
                  keywords: keywords.join(' · '),
                })}
              </p>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-haze-100">
                {crystalDesc(crystal, t)}
              </p>
            </ListRow>
          )
        })}
      </div>
      {list.length === 0 && (
        <p className="glass-panel p-4 text-sm text-haze-400">
          {t('scr.apoth.none', {
            filter:
              tab === 'chakra'
                ? chakraLabel(chakra, t)
                : query.trim() || activeIntention || t('scr.apoth.noneThat'),
          })}
        </p>
      )}

      <button
        type="button"
        onClick={onPractice}
        className="btn-ghost self-center px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em]"
      >
        {t('scr.apoth.pair')}
      </button>
    </Screen>
  )
}
