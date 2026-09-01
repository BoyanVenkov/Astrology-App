import { useState } from 'react'
import {
  sendEmailCode,
  signInWithGoogle,
  verifyEmailCode,
} from '../lib/auth'

interface AuthSheetProps {
  onClose: () => void
  /** Fires once a session exists. */
  onSignedIn: () => void
}

const GoogleG = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.56c2.08-1.92 3.28-4.74 3.28-8.09Z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.76c-.98.66-2.23 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
    <path fill="#FBBC05" d="M5.84 14.09a6.6 6.6 0 0 1 0-4.18V7.07H2.18a11 11 0 0 0 0 9.86l3.66-2.84Z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z" />
  </svg>
)

export function AuthSheet({ onClose, onSignedIn }: AuthSheetProps) {
  const [view, setView] = useState<'choose' | 'email' | 'code'>('choose')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  const google = async () => {
    setBusy(true)
    setErr(null)
    const e = await signInWithGoogle()
    setBusy(false)
    if (e) setErr(e.message)
    // native returns after the browser round-trip; web redirects away
  }

  const send = async () => {
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setErr('That doesn’t look like an email address.')
      return
    }
    setBusy(true)
    setErr(null)
    const e = await sendEmailCode(email)
    setBusy(false)
    if (e) setErr(e.message)
    else setView('code')
  }

  const verify = async () => {
    setBusy(true)
    setErr(null)
    const e = await verifyEmailCode(email, code)
    setBusy(false)
    if (e) setErr(e.message)
    else onSignedIn()
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
        <p className="eyebrow-hue">Your account</p>
        <h2 className="mt-1 font-serif text-2xl text-gilded">
          Back up your practice
        </h2>
        <p className="mt-1.5 text-sm leading-relaxed text-haze-300">
          Optional — the app works fine without it. Sign in and your chart,
          journal and saved people are safe if you change phones or reinstall.
        </p>

        {view === 'choose' && (
          <div className="mt-5 flex flex-col gap-2.5">
            <button
              type="button"
              onClick={google}
              disabled={busy}
              className="flex items-center justify-center gap-2.5 rounded-[0.9rem] border border-white/15 bg-white/[0.06] px-4 py-3.5 text-sm font-semibold text-haze-100 active:bg-white/[0.12] disabled:opacity-50"
            >
              <GoogleG /> Continue with Google
            </button>
            <button
              type="button"
              onClick={() => {
                setErr(null)
                setView('email')
              }}
              className="rounded-[0.9rem] border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm font-semibold text-haze-200 active:bg-white/[0.08]"
            >
              Use an email code instead
            </button>
          </div>
        )}

        {view === 'email' && (
          <div className="mt-5 flex flex-col gap-2.5">
            <input
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="rounded-xl border border-white/12 bg-midnight-950/60 px-4 py-3 text-white outline-none focus:border-white/30"
            />
            <button
              type="button"
              onClick={send}
              disabled={busy}
              className="btn-primary rounded-[0.9rem] px-4 py-3.5 text-sm uppercase disabled:opacity-50"
            >
              {busy ? 'Sending…' : 'Send me a code'}
            </button>
          </div>
        )}

        {view === 'code' && (
          <div className="mt-5 flex flex-col gap-2.5">
            <p className="text-xs text-haze-400">
              Enter the 6-digit code sent to {email}.
            </p>
            <input
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
              placeholder="••••••"
              className="data rounded-xl border border-white/12 bg-midnight-950/60 px-4 py-3 text-center text-lg tracking-[0.4em] text-white outline-none focus:border-white/30"
            />
            <button
              type="button"
              onClick={verify}
              disabled={busy || code.length < 6}
              className="btn-primary rounded-[0.9rem] px-4 py-3.5 text-sm uppercase disabled:opacity-50"
            >
              {busy ? 'Checking…' : 'Sign in'}
            </button>
            <button
              type="button"
              onClick={() => setView('email')}
              className="text-center text-xs uppercase tracking-[0.14em] text-haze-400 active:text-haze-200"
            >
              Wrong email? Go back
            </button>
          </div>
        )}

        {err && <p className="mt-3 text-xs text-red-300">{err}</p>}

        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full text-center text-[11px] uppercase tracking-[0.14em] text-haze-500"
        >
          Not now
        </button>
      </div>
    </div>
  )
}
