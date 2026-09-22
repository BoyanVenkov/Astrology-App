import { useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import { useT } from '../lib/i18n'
import { useEntitlements } from '../lib/premium'
import { supabase } from '../lib/supabase'
import { localDayKey } from '../lib/timezone'
import { LockIcon, OracleIcon } from './icons'
import { Screen } from './Screen'

interface OracleAIProps {
  onBack: () => void
  onUpgrade: (reason?: string) => void
}

/** Must match the per-day cap enforced in `supabase/functions/ai-horoscope`. */
const DAILY_LIMIT = 3

interface OracleResponse {
  reading: string
  remaining: number
  generatedAt: string
}

function UsagePips({ remaining }: { remaining: number }) {
  return (
    <div className="flex items-center gap-1.5" aria-hidden>
      {Array.from({ length: DAILY_LIMIT }, (_, i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 rounded-full transition"
          style={{
            background:
              i < remaining ? 'var(--rz-hue)' : 'rgba(255,255,255,0.16)',
            boxShadow: i < remaining ? '0 0 6px var(--rz-glow)' : 'none',
          }}
        />
      ))}
    </div>
  )
}

function ConsultOrb({ busy }: { busy: boolean }) {
  return (
    <div
      className={`relative grid h-16 w-16 shrink-0 place-items-center rounded-full border ${busy ? 'animate-pulse-glow' : ''}`}
      style={{
        background:
          'radial-gradient(circle at 50% 32%, color-mix(in srgb, var(--rz-hue) 72%, #fff 16%), color-mix(in srgb, var(--rz-hue) 38%, #05070f) 78%)',
        borderColor: 'color-mix(in srgb, var(--rz-hue) 45%, transparent)',
        boxShadow:
          '0 0 30px -4px var(--rz-glow), inset 0 1px 0 rgba(255,255,255,0.3)',
      }}
    >
      <OracleIcon className="h-7 w-7 text-[#05070f]" />
    </div>
  )
}

/**
 * A Claude-written personalised reading (Pro). Unlike `Horoscope.tsx`'s
 * deterministic phrase-bank composition, this calls the `ai-horoscope`
 * Supabase Edge Function, which is the only thing holding the Anthropic key
 * and the only place the daily-use cap is actually enforced — everything
 * here is UX, not the real gate.
 */
export function OracleAI({ onBack, onUpgrade }: OracleAIProps) {
  const t = useT()
  const { isPro } = useEntitlements()
  const transit = useAppStore((s) => s.transit)
  const aspects = useAppStore((s) => s.aspects)
  const chakra = useAppStore((s) => s.chakra)
  const sky = useAppStore((s) => s.sky)
  const natal = useAppStore((s) => s.natal)
  const transitHouses = useAppStore((s) => s.transitHouses)
  const hasNatal = useAppStore((s) => s.hasNatal)
  const profile = useAppStore((s) => s.profile)
  const locale = useAppStore((s) => s.locale)
  const pronounGender = useAppStore((s) => s.pronounGender)
  const editProfile = useAppStore((s) => s.editProfile)
  const oracleReading = useAppStore((s) => s.oracleReading)
  const setOracleReading = useAppStore((s) => s.setOracleReading)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const today = localDayKey()
  const cached = oracleReading?.day === today ? oracleReading : null
  const remaining = cached?.remaining ?? DAILY_LIMIT

  const consult = async () => {
    setLoading(true)
    setError(null)
    const { data, error: fnError } = await supabase().functions.invoke<OracleResponse>(
      'ai-horoscope',
      {
        body: {
          locale,
          pronounGender,
          transit,
          aspects,
          chakra,
          sky,
          natal,
          transitHouses,
          hasNatal,
          profile,
        },
      },
    )
    setLoading(false)
    if (fnError || !data) {
      const status = (fnError as { context?: { status?: number } } | null)
        ?.context?.status
      if (status === 429 && cached) {
        setOracleReading({ ...cached, remaining: 0 })
      }
      // 403 means the server-side Pro check specifically failed — worth its
      // own message, since it's a different (self-fixable) problem from a
      // network blip and otherwise looks identical to one.
      setError(status === 403 ? t('oracle.errorNotPro') : t('oracle.errorGeneric'))
      return
    }
    setOracleReading({
      day: today,
      text: data.reading,
      remaining: data.remaining,
      at: data.generatedAt,
    })
  }

  if (!isPro) {
    return (
      <Screen
        eyebrow={t('oracle.eyebrow')}
        title={t('oracle.title')}
        subtitle={t('oracle.blurb')}
        onBack={onBack}
      >
        <section className="glass-panel flex flex-col gap-3 p-5">
          <p className="text-sm italic leading-relaxed text-haze-200">
            {t('oracle.teaserSample1')}
          </p>
          <p className="text-sm italic leading-relaxed text-haze-200">
            {t('oracle.teaserSample2')}
          </p>
        </section>

        <button
          type="button"
          onClick={() => onUpgrade(t('oracle.reason'))}
          className="flex items-center justify-center gap-2 rounded-2xl border border-gold-400/50 bg-gold-500/20 px-4 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-gold-100 shadow-gold-glow transition active:scale-[0.98]"
        >
          <LockIcon className="h-4 w-4" />
          {t('oracle.unlock')}
        </button>
      </Screen>
    )
  }

  const phase: 'loading' | 'result' | 'idle' | 'exhausted' = loading
    ? 'loading'
    : cached?.text
      ? 'result'
      : remaining > 0
        ? 'idle'
        : 'exhausted'

  return (
    <Screen
      eyebrow={t('oracle.eyebrow')}
      title={t('oracle.title')}
      subtitle={t('oracle.blurb')}
      onBack={onBack}
    >
      <section className="glass-panel glass-panel-active flex flex-col items-center gap-4 p-6 text-center">
        {phase === 'idle' && (
          <>
            <ConsultOrb busy={false} />
            <button
              type="button"
              onClick={() => void consult()}
              className="rounded-2xl border border-gold-400/50 bg-gold-500/20 px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold-100 shadow-gold-glow transition active:scale-[0.98]"
            >
              {t('oracle.consult')}
            </button>
          </>
        )}

        {phase === 'loading' && (
          <>
            <ConsultOrb busy />
            <p className="text-sm text-haze-300">{t('oracle.loading')}</p>
          </>
        )}

        {phase === 'exhausted' && (
          <>
            <ConsultOrb busy={false} />
            <p className="text-sm text-haze-300">{t('oracle.noneLeft')}</p>
          </>
        )}

        {phase === 'result' && cached && (
          <div className="flex w-full flex-col gap-3 text-start">
            {cached.text.split('\n\n').map((para, i) => (
              <p
                key={i}
                className="font-serif text-[1.05rem] leading-relaxed text-haze-100"
              >
                {para}
              </p>
            ))}
          </div>
        )}

        {error && <p className="text-xs text-red-300">{error}</p>}

        <div className="flex flex-col items-center gap-2">
          <UsagePips remaining={remaining} />
          <span className="text-[11px] uppercase tracking-[0.12em] text-haze-400">
            {remaining === 0
              ? t('oracle.noneLeft')
              : remaining === 1
                ? t('oracle.remainingOne')
                : t('oracle.remaining', { n: remaining })}
          </span>
        </div>

        {phase === 'result' && remaining > 0 && (
          <button
            type="button"
            onClick={() => void consult()}
            className="text-xs uppercase tracking-[0.14em] text-gold-300"
          >
            {t('oracle.consultAgain')}
          </button>
        )}
      </section>

      {!hasNatal && (
        <button
          type="button"
          onClick={editProfile}
          className="px-1 text-start text-xs uppercase tracking-[0.14em] text-gold-300"
        >
          {t('oracle.addBirth')}
        </button>
      )}
    </Screen>
  )
}
