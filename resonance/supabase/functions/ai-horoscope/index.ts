// Supabase Edge Function: ai-horoscope
//
// The only place in this project that talks to Claude. Runs server-side so
// the Anthropic key never ships in the app bundle. Gates on a *server-side*
// check of Pro status (RevenueCat) plus a hard per-day cap in Postgres — the
// client's own "isPro" flag is UX only and is never trusted here, since
// anyone signed in could otherwise call this function directly and run up
// the bill.
//
// Deploy: supabase functions deploy ai-horoscope
// Secrets (supabase secrets set ...): ANTHROPIC_API_KEY, REVENUECAT_SECRET_KEY
// SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are injected automatically.
// One-time SQL setup: see ../../README.md in this directory's parent.

import Anthropic from 'npm:@anthropic-ai/sdk'
import { createClient } from 'npm:@supabase/supabase-js@2'

const DAILY_LIMIT = 3 // must match DAILY_LIMIT in src/components/OracleAI.tsx
const MODEL = 'claude-haiku-4-5'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const LOCALE_NAMES: Record<string, string> = {
  en: 'English',
  bg: 'Bulgarian',
  es: 'Spanish',
  it: 'Italian',
  fr: 'French',
  de: 'German',
  pt: 'Portuguese (Brazilian)',
  sv: 'Swedish',
  zh: 'Chinese (Simplified)',
  ja: 'Japanese',
  hi: 'Hindi',
  sw: 'Swahili',
  tr: 'Turkish',
  ar: 'Arabic (Modern Standard)',
  pl: 'Polish',
}

const SYSTEM_PROMPT = `You are the astrologer voice inside Resonance, an astrology app. You write ONE detailed, warm, professional daily reading from structured astrological facts the app has already computed — you do not calculate astrology yourself, only interpret what you're given.

Voice:
- Speak directly to the reader ("you"), never about them in the third person.
- Focus on how today's sky affects THEM personally — their mood, decisions, relationships, energy — not a description of what the planets are doing mechanically. "Mercury opposite your Moon sharpens old arguments today" is good; "Mercury is at 12° opposite the Moon" is not.
- Sound like a skilled professional astrologer's daily note: warm, direct, specific, a little poetic, never generic filler like "the stars suggest" or "energies are shifting."
- No astrology jargon dumps — translate technical terms into plain, felt meaning.
- Each entry in activeAspects has a def.harmony: hard (square/opposition), soft (trine/sextile), or neutral (conjunction). Don't only describe the hardest one — cover at least two to three of the most significant aspects (by exactness), including at least one important challenge AND one important support when both exist. A day is rarely only difficult.
- Go deep, not just wide: for each aspect you cover, give a concrete example of how it might actually show up today (a conversation, a decision, a feeling) and one specific, actionable thing to do with it — not just a one-line label for each.
- Also weave in the Moon's current sign/mood and, when a chakra focus is given, what today's energy is asking of that centre.
- 5 to 7 paragraphs, separated by a blank line. No headers, no bullet points, no markdown formatting, no emoji.
- Around 350-500 words total — this should read like a genuinely thorough personal reading, not a summary.
- If a first name is given, use it once, naturally — don't force it into every sentence.
- Write the ENTIRE reading in the requested language, including any name — never mix languages.
- If a grammatical gender is given for the reader, use the grammatically correct forms for addressing them in languages that require gender agreement for "you" (e.g. Bulgarian, Spanish, Arabic, German, French, Polish, Italian, Portuguese). If no gender is given, default to whichever form is more common as a generic/neutral default in that language, or restructure sentences to avoid needing to choose where the language allows it.`

interface Payload {
  locale?: string
  userName?: string
  pronounGender?: 'unspecified' | 'male' | 'female'
  hasNatal?: boolean
  transit?: unknown
  aspects?: unknown
  chakra?: unknown
  sky?: unknown
  natal?: unknown
  transitHouses?: unknown
  profile?: unknown
}

function buildUserPrompt(p: Payload): string {
  const language = LOCALE_NAMES[p.locale ?? 'en'] ?? 'English'
  const facts = {
    hasNatalChart: Boolean(p.hasNatal),
    dominantTransit: p.transit,
    activeAspects: p.aspects,
    chakraFocus: p.chakra,
    skyPositions: p.sky,
    natalPositions: p.natal ?? null,
    transitHouses: p.transitHouses ?? null,
    birthProfile: p.profile ?? null,
  }
  const nameLine = p.userName ? `The reader's first name is "${p.userName}".` : 'No name was given — do not address them by name.'
  const genderLine =
    p.pronounGender === 'male'
      ? 'The reader is male — use masculine grammatical agreement where the language requires it.'
      : p.pronounGender === 'female'
        ? 'The reader is female — use feminine grammatical agreement where the language requires it.'
        : 'No gender was given for the reader.'
  return `Respond only in ${language}.\n${nameLine}\n${genderLine}\n\nToday's computed astrological facts (JSON):\n${JSON.stringify(facts)}\n\nWrite today's personal reading now.`
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: CORS_HEADERS })
  }

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return json({ error: 'unauthorized' }, 401)
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY')!
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

    // Verifies the caller's JWT and gives us the authenticated user.
    const authedClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    })
    const {
      data: { user },
      error: userError,
    } = await authedClient.auth.getUser()
    if (userError || !user) {
      return json({ error: 'unauthorized' }, 401)
    }

    // Real Pro gate — RevenueCat's server API, keyed by the same id
    // `linkRevenueCatUser` logs the device into (see src/lib/revenuecat.ts).
    // Fails CLOSED: a missing/misconfigured secret must never silently open
    // this costed endpoint to every signed-in user — reject instead.
    const revenueCatKey = Deno.env.get('REVENUECAT_SECRET_KEY')
    if (!revenueCatKey) {
      console.error('ai-horoscope: REVENUECAT_SECRET_KEY is not set — refusing all requests')
      return json({ error: 'server_error' }, 500)
    }
    const rcRes = await fetch(`https://api.revenuecat.com/v1/subscribers/${user.id}`, {
      headers: { Authorization: `Bearer ${revenueCatKey}` },
    })
    if (!rcRes.ok) return json({ error: 'not_pro' }, 403)
    const rc = await rcRes.json()
    const pro = rc?.subscriber?.entitlements?.pro
    const active = pro && (!pro.expires_date || new Date(pro.expires_date) > new Date())
    if (!active) return json({ error: 'not_pro' }, 403)

    // Service-role client — bypasses RLS, only reachable from this function.
    const serviceClient = createClient(supabaseUrl, serviceRoleKey)
    const day = new Date().toISOString().slice(0, 10)
    const { data: usageCount, error: usageError } = await serviceClient.rpc(
      'increment_oracle_usage',
      { p_user_id: user.id, p_day: day, p_limit: DAILY_LIMIT },
    )
    if (usageError) {
      console.error('usage rpc error', usageError)
      return json({ error: 'server_error' }, 500)
    }
    if (usageCount === -1) {
      return json({ error: 'rate_limited', remaining: 0 }, 429)
    }
    const remaining = DAILY_LIMIT - (usageCount as number)

    const payload = (await req.json()) as Payload
    if (!payload.transit || !payload.chakra) {
      return json({ error: 'bad_request' }, 400)
    }

    const anthropic = new Anthropic({ apiKey: Deno.env.get('ANTHROPIC_API_KEY') })
    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 1200,
      system: [{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } }],
      messages: [{ role: 'user', content: buildUserPrompt(payload) }],
    })

    const textBlock = response.content.find((b) => b.type === 'text')
    const reading = textBlock && textBlock.type === 'text' ? textBlock.text.trim() : ''
    if (!reading) return json({ error: 'server_error' }, 502)

    return json({ reading, remaining, generatedAt: new Date().toISOString() }, 200)
  } catch (e) {
    console.error('ai-horoscope error', e)
    return json({ error: 'server_error' }, 500)
  }
})

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  })
}
