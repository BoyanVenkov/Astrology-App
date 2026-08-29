import { useAppStore } from '../store/useAppStore'
import type { PremiumTier } from '../types/resonance'

export const PRO_PRICING = {
  monthly: '$8.99',
  yearly: '$79',
}

export const PRO_FEATURES = [
  'The full Solfeggio frequency library',
  'Deep natal-chart integration & every transit',
  'Unlimited journal history & mood trends',
  'On-device HRV / sleep sync',
  'All breathwork patterns & session lengths',
]

export interface Entitlements {
  tier: PremiumTier
  isPro: boolean
  /** Free users can play the first N Solfeggio presets. */
  freeFrequencyCount: number
  /** Free users see the last N days of journal history. */
  freeHistoryDays: number
}

export function entitlementsFor(tier: PremiumTier): Entitlements {
  const isPro = tier === 'pro'
  return {
    tier,
    isPro,
    freeFrequencyCount: isPro ? Infinity : 3,
    freeHistoryDays: isPro ? Infinity : 7,
  }
}

export function useEntitlements(): Entitlements {
  const tier = useAppStore((s) => s.tier)
  return entitlementsFor(tier)
}

/**
 * Complete the purchase. Wire RevenueCat (`@revenuecat/purchases-capacitor`)
 * or StoreKit / Play Billing here; on success call `setTier('pro')`.
 * For now this is the dev unlock.
 */
export async function purchasePro(): Promise<boolean> {
  useAppStore.getState().setTier('pro')
  return true
}

export async function restorePurchases(): Promise<boolean> {
  // query the store for an active entitlement, then setTier accordingly
  return useAppStore.getState().tier === 'pro'
}
