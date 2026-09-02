import { useState } from 'react'
import { signInWithGoogle } from '../lib/auth'
import { useT } from '../lib/i18n'

interface AuthSheetProps {
  onClose: () => void
  /** Why the sheet was opened — changes the heading + blurb. */
  reason?: 'backup' | 'purchase'
}

const GoogleG = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.56c2.08-1.92 3.28-4.74 3.28-8.09Z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.76c-.98.66-2.23 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
    <path fill="#FBBC05" d="M5.84 14.09a6.6 6.6 0 0 1 0-4.18V7.07H2.18a11 11 0 0 0 0 9.86l3.66-2.84Z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z" />
  </svg>
)

export function AuthSheet({ onClose, reason = 'backup' }: AuthSheetProps) {
  const t = useT()
  const title = reason === 'purchase' ? t('auth.purchaseTitle') : t('auth.backupTitle')
  const blurb = reason === 'purchase' ? t('auth.purchaseBlurb') : t('auth.backupBlurb')
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  const google = async () => {
    setBusy(true)
    setErr(null)
    const e = await signInWithGoogle()
    setBusy(false)
    if (e) setErr(e.message)
    // native returns after the browser round-trip, web redirects away — either
    // way the session lands via the auth listener; App closes this on sign-in.
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
        <p className="eyebrow-hue">{t('auth.yourAccount')}</p>
        <h2 className="mt-1 font-serif text-2xl text-gilded">{title}</h2>
        <p className="mt-1.5 text-sm leading-relaxed text-haze-300">{blurb}</p>

        <div className="mt-5 flex flex-col gap-2.5">
          <button
            type="button"
            onClick={google}
            disabled={busy}
            className="flex items-center justify-center gap-2.5 rounded-[0.9rem] bg-[#f6f4ec] px-4 py-3.5 text-sm font-semibold text-[#1a1c22] active:scale-[0.98] disabled:opacity-50"
          >
            <GoogleG />
            {busy ? t('welcome.googleOpening') : t('welcome.google')}
          </button>
        </div>

        {err && <p className="mt-3 text-xs text-red-300">{err}</p>}

        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full text-center text-[11px] uppercase tracking-[0.14em] text-haze-500"
        >
          {t('common.notNow')}
        </button>
      </div>
    </div>
  )
}
