import { useEffect, useState } from 'react'
import { useAuth } from '../lib/auth'
import { useT } from '../lib/i18n'
import type { MessageKey } from '../lib/locales/en'
import { PRO_PRICING } from '../lib/premium'
import {
  buyPackage,
  fetchProPackages,
  restoreEntitlement,
  type ProPackages,
} from '../lib/revenuecat'
import { LockIcon } from './icons'

interface PaywallProps {
  onClose: () => void
  reason?: string
  /** Open the sign-in sheet — a purchase needs an account. */
  onNeedAuth?: () => void
}

const FEATURE_KEYS: MessageKey[] = [
  'pay.feat.compat',
  'pay.feat.chakra',
  'pay.feat.practice',
  'pay.feat.tarot',
  'pay.feat.horoscope',
  'pay.feat.journal',
]

export function Paywall({ onClose, reason, onNeedAuth }: PaywallProps) {
  const t = useT()
  const { status } = useAuth()
  const needsAuth = status !== 'signed-in'
  const [plan, setPlan] = useState<'monthly' | 'yearly'>('yearly')
  const [busy, setBusy] = useState<'buy' | 'restore' | null>(null)
  const [err, setErr] = useState<string | null>(null)
  const [packages, setPackages] = useState<ProPackages | null>(null)

  // Real store pricing once the offering loads — the plan strings below are
  // just the placeholder shown before that (or if RevenueCat isn't configured).
  useEffect(() => {
    let cancelled = false
    void fetchProPackages().then((p) => {
      if (!cancelled) setPackages(p)
    })
    return () => {
      cancelled = true
    }
  }, [])

  const monthlyPkg = packages?.monthly ?? null
  const yearlyPkg = packages?.annual ?? null
  const monthlyPrice = monthlyPkg?.product.priceString ?? PRO_PRICING.monthly
  const yearlyPrice = yearlyPkg?.product.priceString ?? PRO_PRICING.yearly
  const yearlyPerMonth =
    yearlyPkg?.product.pricePerMonthString ?? PRO_PRICING.yearlyPerMonth
  const savePct =
    monthlyPkg && yearlyPkg
      ? Math.round(
          (1 - yearlyPkg.product.price / (monthlyPkg.product.price * 12)) * 100,
        )
      : null

  const buy = async () => {
    if (needsAuth) {
      onNeedAuth?.()
      return
    }
    const pkg = plan === 'yearly' ? yearlyPkg : monthlyPkg
    if (!pkg) {
      setErr(t('pay.notAvailable'))
      return
    }
    setBusy('buy')
    setErr(null)
    const res = await buyPackage(pkg)
    setBusy(null)
    if (res.ok) onClose()
    else if (!res.cancelled) setErr(res.error ?? t('pay.somethingWrong'))
  }

  const restore = async () => {
    if (needsAuth) {
      onNeedAuth?.()
      return
    }
    setBusy('restore')
    setErr(null)
    const ok = await restoreEntitlement()
    setBusy(null)
    if (ok) onClose()
    else setErr(t('pay.nothingToRestore'))
  }

  const cta = needsAuth
    ? t('pay.ctaSignIn')
    : plan === 'yearly'
      ? t('pay.ctaTrial', { days: PRO_PRICING.trialDays })
      : t('pay.ctaMonthly', { price: monthlyPrice })

  const terms =
    plan === 'yearly'
      ? t('pay.termsTrial', {
          days: PRO_PRICING.trialDays,
          yearly: yearlyPrice,
          perMonth: yearlyPerMonth,
        })
      : t('pay.termsMonthly', { monthly: monthlyPrice })

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-end bg-midnight-void/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="glass-panel mx-auto w-full max-w-md rounded-b-none p-6"
        onClick={(e) => e.stopPropagation()}
        style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}
      >
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-white/20" />
        <div className="flex items-center gap-2">
          <LockIcon className="h-4 w-4 text-gold-300" />
          <p className="eyebrow">{t('pay.eyebrow')}</p>
        </div>
        <h2 className="mt-1 font-serif text-2xl text-gilded">
          {reason ?? t('pay.title')}
        </h2>

        <ul className="mt-4 flex flex-col gap-2 text-sm text-haze-200">
          {FEATURE_KEYS.map((k) => (
            <li key={k} className="flex gap-2">
              <span className="text-gold-300">✦</span>
              {t(k)}
            </li>
          ))}
        </ul>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setPlan('yearly')}
            className={`rounded-2xl border p-3 text-left transition ${
              plan === 'yearly'
                ? 'border-gold-400/60 bg-gold-500/15'
                : 'border-white/12 bg-white/5'
            }`}
          >
            <p className="text-sm font-semibold text-white">
              {t('pay.perYear', { price: yearlyPrice })}
            </p>
            <p className="text-[11px] text-gold-300">
              {t('pay.freeTrial', { days: PRO_PRICING.trialDays })}
              {savePct != null && savePct > 0
                ? ` · ${t('pay.save', { pct: savePct })}`
                : ''}
            </p>
          </button>
          <button
            type="button"
            onClick={() => setPlan('monthly')}
            className={`rounded-2xl border p-3 text-left transition ${
              plan === 'monthly'
                ? 'border-gold-400/60 bg-gold-500/15'
                : 'border-white/12 bg-white/5'
            }`}
          >
            <p className="text-sm font-semibold text-white">
              {t('pay.perMonth', { price: monthlyPrice })}
            </p>
            <p className="text-[11px] text-haze-400">{t('pay.billedMonthly')}</p>
          </button>
        </div>

        <button
          type="button"
          onClick={() => void buy()}
          disabled={busy !== null}
          className="mt-4 w-full rounded-2xl border border-gold-400/50 bg-gold-500/20 px-4 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-gold-100 shadow-gold-glow transition active:scale-[0.98] disabled:opacity-50"
        >
          {busy === 'buy' ? t('pay.oneMoment') : cta}
        </button>

        <p className="mt-2.5 text-center text-[11px] leading-relaxed text-haze-500">
          {needsAuth ? t('pay.accountNote') : ''}
          {terms}
        </p>

        {err && (
          <p className="mt-2 text-center text-xs text-red-300">{err}</p>
        )}

        <div className="mt-3 flex items-center justify-between text-[11px] text-haze-400">
          <button
            type="button"
            onClick={() => void restore()}
            disabled={busy !== null}
          >
            {busy === 'restore' ? t('pay.restoreChecking') : t('pay.restore')}
          </button>
          <button type="button" onClick={onClose}>
            {t('pay.maybeLater')}
          </button>
        </div>
      </div>
    </div>
  )
}
