import { useEffect, useRef } from 'react'
import { supabase } from './supabase'
import { useAuth } from './auth'
import {
  applySync,
  snapshotForSync,
  useAppStore,
  type SyncSnapshot,
} from '../store/useAppStore'

/**
 * Cloud backup for signed-in users. On sign-in it pulls the remote row, merges
 * it into local state (logs union, no data loss), then pushes the result.
 * After that, any change to the synced slice is pushed, debounced.
 */

const SYNCED_AT_KEY = 'resonance-synced-at'
const getSyncedAt = (): number => {
  try {
    return Number(localStorage.getItem(SYNCED_AT_KEY) ?? 0)
  } catch {
    return 0
  }
}
const setSyncedAt = (t: number): void => {
  try {
    localStorage.setItem(SYNCED_AT_KEY, String(t))
  } catch {
    /* ignore */
  }
}

async function pull(userId: string): Promise<void> {
  const { data, error } = await supabase()
    .from('sync_state')
    .select('state, updated_at')
    .eq('user_id', userId)
    .maybeSingle()
  if (error || !data) return
  const remoteNewer = new Date(data.updated_at).getTime() > getSyncedAt()
  applySync((data.state ?? {}) as Partial<SyncSnapshot>, remoteNewer)
  useAppStore.getState().refreshDailyTransit()
}

async function push(userId: string): Promise<boolean> {
  const { error } = await supabase().from('sync_state').upsert({
    user_id: userId,
    state: snapshotForSync(),
    updated_at: new Date().toISOString(),
  })
  if (error) return false
  setSyncedAt(Date.now())
  return true
}

export function useCloudSync(): void {
  const { status, user } = useAuth()
  const uid = user?.id ?? null
  const ready = useRef(false)
  const lastSnap = useRef('')
  const timer = useRef<number | undefined>(undefined)

  // sign-in: pull → merge → push
  useEffect(() => {
    if (status !== 'signed-in' || !uid) {
      ready.current = false
      return
    }
    let cancelled = false
    void (async () => {
      await pull(uid)
      if (cancelled) return
      await push(uid)
      lastSnap.current = JSON.stringify(snapshotForSync())
      ready.current = true
    })()
    return () => {
      cancelled = true
    }
  }, [status, uid])

  // debounced push on any change to the synced slice
  useEffect(() => {
    if (status !== 'signed-in' || !uid) return
    const unsub = useAppStore.subscribe(() => {
      if (!ready.current) return
      const snap = JSON.stringify(snapshotForSync())
      if (snap === lastSnap.current) return
      lastSnap.current = snap
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => {
        void push(uid)
      }, 2500)
    })
    return () => {
      unsub()
      window.clearTimeout(timer.current)
    }
  }, [status, uid])
}

/** A one-shot manual backup (used by the "Back up now" button). */
export async function backupNow(): Promise<boolean> {
  const uid = (await supabase().auth.getUser()).data.user?.id
  if (!uid) return false
  return push(uid)
}
