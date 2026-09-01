import { createClient, type SupabaseClient } from '@supabase/supabase-js'

/**
 * The Supabase client. Accounts are OPTIONAL — the app is fully usable
 * signed-out; signing in only turns on cloud backup + sync. The anon key is
 * public by design (row-level security is what protects the data).
 */

const URL =
  import.meta.env.VITE_SUPABASE_URL ??
  'https://oyjceuypabkrnkpenaqu.supabase.co'
const ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ??
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95amNldXlwYWJrcm5rcGVuYXF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgwNDgwNjAsImV4cCI6MjEwMzYyNDA2MH0.vZzTX-BeaNI6_T5SMzPEhc0Mwuc_1lcOc4zT28OJBPI'

/** Deep-link the OAuth redirect comes back to (also set in Supabase + Google). */
export const OAUTH_REDIRECT = 'com.resonance.app://auth-callback'

let client: SupabaseClient | null = null

export function supabase(): SupabaseClient {
  if (!client) {
    client = createClient(URL, ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        // we catch the redirect ourselves via the Capacitor App plugin
        detectSessionInUrl: false,
        flowType: 'pkce',
      },
    })
  }
  return client
}
