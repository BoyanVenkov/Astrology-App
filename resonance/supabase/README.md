# Oracle AI — Supabase Edge Function setup

`functions/ai-horoscope` is the only backend code in this project. It's the
server-side proxy that calls Claude for the Oracle AI tab — the Anthropic key
must never live in the app itself, so this function holds it instead.

There's no Supabase CLI project linked yet, so this is a one-time setup.

## 1. One-time SQL (run once in the Supabase dashboard → SQL Editor)

This creates the daily-use counter and the atomic increment function the
Edge Function calls. Paste and run:

```sql
create table if not exists public.ai_horoscope_usage (
  user_id uuid not null,
  day date not null,
  count int not null default 0,
  primary key (user_id, day)
);

alter table public.ai_horoscope_usage enable row level security;
-- No policies: only the service-role key (used inside the Edge Function) can
-- touch this table. Nothing else needs access to it.

create or replace function public.increment_oracle_usage(
  p_user_id uuid, p_day date, p_limit int
)
returns int
language plpgsql
security definer
as $$
declare
  new_count int;
begin
  insert into public.ai_horoscope_usage (user_id, day, count)
  values (p_user_id, p_day, 1)
  on conflict (user_id, day)
  do update set count = ai_horoscope_usage.count + 1
  returning count into new_count;

  if new_count > p_limit then
    return -1;
  end if;
  return new_count;
end;
$$;
```

## 2. Get the two secrets the function needs

- **Anthropic API key** — console.anthropic.com → API Keys → Create Key.
  Copy it (starts `sk-ant-...`).
- **RevenueCat secret key** — this is *different* from the public SDK key
  already in `.env.local` (`VITE_REVENUECAT_ANDROID_KEY`). In the RevenueCat
  dashboard: Project settings → API keys → "Secret" key (server-side,
  read-only is fine). This is what lets the function check server-side
  whether the caller is actually a paying Pro subscriber — without it, the
  function still works but skips the RevenueCat check and relies only on the
  per-day cap below, which is less safe but not broken.

## 3. Install the Supabase CLI and link this project

```bash
npm install -g supabase
supabase login
supabase link --project-ref oyjceuypabkrnkpenaqu
```

(That's the project ref already baked into `src/lib/supabase.ts`.)

## 4. Set the secrets and deploy

```bash
supabase secrets set ANTHROPIC_API_KEY=sk-ant-...
supabase secrets set REVENUECAT_SECRET_KEY=sk_...
supabase functions deploy ai-horoscope
```

Deploy **without** `--no-verify-jwt` (the default) — the function relies on
Supabase verifying the caller's session before it ever runs.

## 5. Verify

From a signed-in Pro account in the app, open the Oracle AI tab and tap
"Consult the Oracle." To check logs: `supabase functions logs ai-horoscope`.

Cost note: on Claude Haiku 4.5 this runs about $0.003–0.004 per reading —
at the 3/day cap that's roughly $0.30/month for an actively-using Pro
subscriber, trivial against the $6.99–29.99 subscription price.
