import { useEffect, useRef } from 'react'
import { App as CapApp } from '@capacitor/app'
import { Capacitor } from '@capacitor/core'
import {
  LOG_LEVEL,
  PURCHASES_ERROR_CODE,
  Purchases,
  type CustomerInfo,
  type PurchasesError,
  type PurchasesPackage,
} from '@revenuecat/purchases-capacitor'
import { useAppStore } from '../store/useAppStore'

/**
 * Google Play Billing via RevenueCat. Android-only — this whole module is a
 * safe no-op on web or when the SDK key isn't configured (dev by default),
 * so nothing here can break local testing before the dashboards are set up.
 *
 * Setup (see resonance-project memory / RELEASE notes):
 *  1. Play Console → Monetize → Products → Subscriptions:
 *     create `resonance_pro_monthly` and `resonance_pro_yearly`. (No free-trial
 *     offer configured — add one on the base plan later if you want it back.)
 *  2. RevenueCat project → connect the Play Console app (service-account JSON)
 *     → Entitlement `pro` → attach both products → Offering with `monthly`/
 *     `annual` packages, marked current.
 *  3. Put the RevenueCat "Google (Play Store)" public API key in `.env.local`
 *     as VITE_REVENUECAT_ANDROID_KEY.
 */

const ENTITLEMENT = 'pro'
const API_KEY = import.meta.env.VITE_REVENUECAT_ANDROID_KEY as string | undefined

const isNative = (): boolean => {
  try {
    return Capacitor.isNativePlatform()
  } catch {
    return false
  }
}

let configured = false

/** Boot the SDK once, on app start. No-ops on web or without a key. */
export async function configureRevenueCat(): Promise<void> {
  if (configured || !isNative() || !API_KEY) return
  try {
    await Purchases.setLogLevel({ level: LOG_LEVEL.ERROR })
    await Purchases.configure({ apiKey: API_KEY })
    configured = true
  } catch {
    /* leave `configured` false — every call below degrades gracefully */
  }
}

/**
 * Keep RevenueCat's app-user-id in step with the (optional) Supabase account.
 * Returns whether it actually succeeded — callers that are about to take a
 * purchase (see `Paywall.tsx`) should await this and check the result rather
 * than assuming `App.tsx`'s own background call has already finished; a
 * purchase made while still on the wrong identity gets attributed to it
 * permanently, with no user-visible sign anything went wrong (the local
 * purchase itself still succeeds, so the client shows "Pro active" while the
 * account RevenueCat is actually tracking never received the entitlement).
 */
export async function linkRevenueCatUser(userId: string | null): Promise<boolean> {
  if (!configured) return true
  try {
    if (userId) {
      await Purchases.logIn({ appUserID: userId })
    } else {
      // Only log out an actually-identified user. Calling logOut() while
      // already anonymous throws `LogOutWithAnonymousUserError` — harmless but
      // it floods the log on every launch for guests / signed-out users.
      const { isAnonymous } = await Purchases.isAnonymous()
      if (!isAnonymous) await Purchases.logOut()
    }
    return true
  } catch (e) {
    // Not fatal for normal app use — purchases still work under RevenueCat's
    // own anonymous id — but a caller about to purchase needs to know this
    // failed so it can retry rather than silently proceeding on the wrong id.
    console.error('linkRevenueCatUser failed', e)
    return false
  }
}

export interface ProPackages {
  monthly: PurchasesPackage | null
  annual: PurchasesPackage | null
}

/** The current offering's monthly/annual packages — carries real store pricing. */
export async function fetchProPackages(): Promise<ProPackages> {
  if (!configured) return { monthly: null, annual: null }
  try {
    const { current } = await Purchases.getOfferings()
    return { monthly: current?.monthly ?? null, annual: current?.annual ?? null }
  } catch {
    return { monthly: null, annual: null }
  }
}

const hasPro = (info: CustomerInfo): boolean =>
  Boolean(info.entitlements.active[ENTITLEMENT])

export interface PurchaseOutcome {
  ok: boolean
  cancelled: boolean
  error?: string
}

/** Buy a package. On success, the store's tier flips to 'pro' immediately. */
export async function buyPackage(pkg: PurchasesPackage): Promise<PurchaseOutcome> {
  if (!configured) return { ok: false, cancelled: false, error: 'not-configured' }
  try {
    const { customerInfo } = await Purchases.purchasePackage({ aPackage: pkg })
    const ok = hasPro(customerInfo)
    if (ok) useAppStore.getState().setTier('pro')
    return { ok, cancelled: false }
  } catch (e) {
    const err = e as Partial<PurchasesError>
    if (err.code === PURCHASES_ERROR_CODE.PURCHASE_CANCELLED_ERROR) {
      return { ok: false, cancelled: true }
    }
    return { ok: false, cancelled: false, error: err.message ?? 'Purchase failed' }
  }
}

/** Re-link any active purchase to this device/account (Play Billing only needs the Google account). */
export async function restoreEntitlement(): Promise<boolean> {
  if (!configured) return useAppStore.getState().tier === 'pro'
  try {
    const { customerInfo } = await Purchases.restorePurchases()
    const ok = hasPro(customerInfo)
    useAppStore.getState().setTier(ok ? 'pro' : 'free')
    return ok
  } catch {
    return false
  }
}

/**
 * Sync the local tier from RevenueCat's record — call on launch and resume.
 *
 * `reconcile: true` (cold start only — see `useRevenueCat`) additionally
 * falls back to `restorePurchases()` when this identity shows no entitlement.
 * `getCustomerInfo()` alone only ever reflects what's already attached to the
 * *current* RevenueCat app-user-id — a fresh identity (new install, cleared
 * app data, a testing-lab reset) starts blank even when the signed-in Google
 * account already owns a real, active subscription. Only `restorePurchases()`
 * actually asks Play Billing "what does this account already own?" and
 * reattaches it. Without this, a real subscription silently stops being
 * recognized the moment the local RevenueCat identity resets.
 */
export async function refreshEntitlement(opts?: { reconcile?: boolean }): Promise<void> {
  if (!configured) return
  try {
    const { customerInfo } = await Purchases.getCustomerInfo()
    if (hasPro(customerInfo)) {
      useAppStore.getState().setTier('pro')
      return
    }
    if (opts?.reconcile) {
      const { customerInfo: restored } = await Purchases.restorePurchases()
      useAppStore.getState().setTier(hasPro(restored) ? 'pro' : 'free')
      return
    }
    useAppStore.getState().setTier('free')
  } catch {
    /* keep whatever tier we already had */
  }
}

/** Deep link to manage/cancel the active subscription in Google Play, if any. */
export async function subscriptionManagementUrl(): Promise<string | null> {
  if (!configured) return null
  try {
    const { customerInfo } = await Purchases.getCustomerInfo()
    return customerInfo.managementURL
  } catch {
    return null
  }
}

/**
 * Boots the SDK once on mount, then keeps its app-user-id in step with the
 * (optional) Supabase account and re-checks the entitlement on every switch —
 * so a subscription bought on one account never leaks onto another, and a
 * lapsed/renewed subscription (changed outside the app) is caught on launch.
 *
 * Also re-checks on every app **resume** (not just launch/sign-in) — without
 * this, a cancelled/refunded/renewed subscription that changes while the app
 * is merely backgrounded (not force-killed) would stay stale for the rest of
 * the session, potentially days.
 */
export function useRevenueCat(userId: string | null | undefined): void {
  const lastUserId = useRef<string | null | undefined>(undefined)

  useEffect(() => {
    // `undefined` means Supabase's own session restore hasn't resolved yet —
    // NOT "signed out". Auth always starts this way for a moment on every
    // cold start (`getSession()` is async). Treating that gap as "signed
    // out" would call `Purchases.logOut()` on a device that's actually
    // already identified from a prior session, demoting it to a fresh
    // anonymous id — and since Google Play Billing purchases only get
    // reattached to an *already-known* identified user via `restorePurchases`
    // (not automatically by a later `logIn`), any entitlement active at that
    // moment gets orphaned on the throwaway anonymous id instead of staying
    // on the real account. Waiting for a real answer here avoids the churn.
    if (userId === undefined) return
    let cancelled = false
    void (async () => {
      await configureRevenueCat()
      if (cancelled) return
      if (lastUserId.current !== userId) {
        await linkRevenueCatUser(userId)
        lastUserId.current = userId
      }
      if (!cancelled) await refreshEntitlement({ reconcile: true })
    })()
    return () => {
      cancelled = true
    }
  }, [userId])

  useEffect(() => {
    const handle = CapApp.addListener('resume', () => {
      void refreshEntitlement()
    })
    return () => {
      void handle.then((h) => h.remove())
    }
  }, [])
}
