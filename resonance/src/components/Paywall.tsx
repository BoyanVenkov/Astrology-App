import { useState } from 'react'
import {
  PRO_FEATURES,
  PRO_PRICING,
  purchasePro,
  restorePurchases,
} from '../lib/premium'
import { LockIcon } from './icons'

interface PaywallProps {
  onClose: () => void
  reason?: string
}

export function Paywall({ onClose, reason }: PaywallProps) {
  const [plan, setPlan] = useState<'monthly' | 'yearly'>('yearly')
  const [busy, setBusy] = useState(false)

  const buy = async () => {
    setBusy(true)
    const ok = await purchasePro()
    setBusy(false)
    if (ok) onClose()
  }

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
          <p className="eyebrow">Resonance Pro</p>
        </div>
        <h2 className="mt-1 font-serif text-2xl text-gilded">
          {reason ?? 'Unlock the full engine'}
        </h2>

        <ul className="mt-4 flex flex-col gap-2 text-sm text-haze-200">
          {PRO_FEATURES.map((f) => (
            <li key={f} className="flex gap-2">
              <span className="text-gold-300">✦</span>
              {f}
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
            <p className="text-sm font-semibold text-white">{PRO_PRICING.yearly}/yr</p>
            <p className="text-[11px] text-gold-300">2 months free</p>
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
              {PRO_PRICING.monthly}/mo
            </p>
            <p className="text-[11px] text-haze-400">billed monthly</p>
          </button>
        </div>

        <button
          type="button"
          onClick={buy}
          disabled={busy}
          className="mt-4 w-full rounded-2xl border border-gold-400/50 bg-gold-500/20 px-4 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-gold-100 shadow-gold-glow transition active:scale-[0.98] disabled:opacity-50"
        >
          {busy ? 'One moment…' : `Start Pro · ${PRO_PRICING[plan]}`}
        </button>

        <div className="mt-3 flex items-center justify-between text-[11px] text-haze-400">
          <button type="button" onClick={() => void restorePurchases()}>
            Restore purchases
          </button>
          <button type="button" onClick={onClose}>
            Maybe later
          </button>
        </div>
      </div>
    </div>
  )
}
