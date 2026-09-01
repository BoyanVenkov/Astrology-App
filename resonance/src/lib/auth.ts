import { useEffect, useState } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { App as CapApp } from '@capacitor/app'
import { Browser } from '@capacitor/browser'
import { Capacitor } from '@capacitor/core'
import { OAUTH_REDIRECT, supabase } from './supabase'

/**
 * Optional accounts. Signed-out is the default and works exactly as before —
 * signing in enables cloud backup (see `lib/sync.ts`).
 */

export type AuthStatus = 'loading' | 'signed-in' | 'signed-out'

export interface AuthState {
  status: AuthStatus
  session: Session | null
  user: User | null
}

export function useAuth(): AuthState {
  const [state, setState] = useState<AuthState>({
    status: 'loading',
    session: null,
    user: null,
  })

  useEffect(() => {
    let alive = true
    supabase()
      .auth.getSession()
      .then(({ data }) => {
        if (!alive) return
        setState({
          status: data.session ? 'signed-in' : 'signed-out',
          session: data.session,
          user: data.session?.user ?? null,
        })
      })

    const { data: sub } = supabase().auth.onAuthStateChange((_event, session) => {
      setState({
        status: session ? 'signed-in' : 'signed-out',
        session,
        user: session?.user ?? null,
      })
    })
    return () => {
      alive = false
      sub.subscription.unsubscribe()
    }
  }, [])

  return state
}

/* -------------------------------------------------------------- sign-in */

export type AuthError = { message: string }

/** Google — native opens the system browser and comes back via the deep link. */
export async function signInWithGoogle(): Promise<AuthError | null> {
  const native = Capacitor.isNativePlatform()
  const { data, error } = await supabase().auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: native ? OAUTH_REDIRECT : `${window.location.origin}`,
      skipBrowserRedirect: native,
    },
  })
  if (error) return { message: error.message }
  if (native && data?.url) {
    await Browser.open({ url: data.url, presentationStyle: 'popover' })
  }
  return null
}

/** Catch the OAuth redirect deep link and finish the PKCE exchange. */
export function useAuthDeepLink(): void {
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return
    const handle = CapApp.addListener('appUrlOpen', async ({ url }) => {
      if (!url.startsWith(OAUTH_REDIRECT)) return
      const code = new URL(url).searchParams.get('code')
      if (code) {
        await supabase().auth.exchangeCodeForSession(code)
      }
      await Browser.close().catch(() => undefined)
    })
    return () => {
      void handle.then((h) => h.remove())
    }
  }, [])
}

/** Email — sends a 6-digit code (needs `{{ .Token }}` in the Supabase email template). */
export async function sendEmailCode(email: string): Promise<AuthError | null> {
  const { error } = await supabase().auth.signInWithOtp({
    email: email.trim(),
    options: { shouldCreateUser: true },
  })
  return error ? { message: error.message } : null
}

export async function verifyEmailCode(
  email: string,
  code: string,
): Promise<AuthError | null> {
  const { error } = await supabase().auth.verifyOtp({
    email: email.trim(),
    token: code.trim(),
    type: 'email',
  })
  return error ? { message: error.message } : null
}

export async function signOut(): Promise<void> {
  await supabase().auth.signOut()
}

/**
 * Delete the account + all server data. Calls the `delete-account` Edge
 * Function (deploy it in Supabase — it runs `auth.admin.deleteUser`).
 * Falls back to wiping the sync row + signing out.
 */
export async function deleteAccount(): Promise<AuthError | null> {
  const { error } = await supabase().functions.invoke('delete-account')
  if (error) {
    // best-effort local cleanup if the function isn't deployed yet
    const uid = (await supabase().auth.getUser()).data.user?.id
    if (uid) await supabase().from('sync_state').delete().eq('user_id', uid)
    await signOut()
    return { message: error.message }
  }
  await signOut()
  return null
}
