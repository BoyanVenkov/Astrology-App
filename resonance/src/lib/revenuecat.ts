import { useEffect, useRef } from 'react'
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
 *     create `resonance_pro_monthly` and `resonance_pro_yearly` (7-day trial).
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

/** Keep RevenueCat's app-user-id in step with the (optional) Supabase account. */
export async function linkRevenueCatUser(userId: string | null): Promise<void> {
  if (!configured) return
  try {
    if (userId) await Purchases.logIn({ appUserID: userId })
    else await Purchases.logOut()
  } catch {
    /* not fatal — purchases still work under RevenueCat's own anonymous id */
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

/** Sync the local tier from RevenueCat's record — call on launch and resume. */
export async function refreshEntitlement(): Promise<void> {
  if (!configured) return
  try {
    const { customerInfo } = await Purchases.getCustomerInfo()
    useAppStore.getState().setTier(hasPro(customerInfo) ? 'pro' : 'free')
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
 */
export function useRevenueCat(userId: string | null): void {
  const lastUserId = useRef<string | null | undefined>(undefined)

  useEffect(() => {
    let cancelled = false
    void (async () => {
      await configureRevenueCat()
      if (cancelled) return
      if (lastUserId.current !== userId) {
        await linkRevenueCatUser(userId)
        lastUserId.current = userId
      }
      if (!cancelled) await refreshEntitlement()
    })()
    return () => {
      cancelled = true
    }
  }, [userId])
}
