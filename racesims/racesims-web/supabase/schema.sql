-- RaceSims Driver Account — database schema
-- Run this once in your Supabase project: SQL Editor → paste → Run.
-- Safe to re-run (idempotent).
--
-- Model:
--   profiles        one row per signed-in user (auto-created on signup)
--   saved_builds    configurator specs a driver has saved
--   journey_events  the training journey: sessions, milestones, tier changes
--   bookings        Chennai Sim Centre reservations
-- All tables are protected by Row-Level Security: a user can only read/write
-- their own rows.

-- ── profiles ──────────────────────────────────────────────────────────────
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  home_centre  text default 'Chennai',
  tier         text default 'Rookie',          -- Rookie · Club · Pro · Elite
  points       integer default 0,
  created_at   timestamptz default now()
);

-- ── saved_builds ──────────────────────────────────────────────────────────
create table if not exists public.saved_builds (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  name        text not null default 'My build',
  preset      text,                            -- starter | sim | pro | custom
  selections  jsonb not null,                  -- { wheelbase: "ares-12", ... }
  addons      jsonb not null default '[]',
  total       integer not null default 0,
  created_at  timestamptz default now()
);

-- ── journey_events ────────────────────────────────────────────────────────
create table if not exists public.journey_events (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  kind        text not null,                   -- session | milestone | tier | league
  title       text not null,
  detail      text,
  points      integer default 0,
  occurred_at timestamptz default now()
);

-- ── bookings ──────────────────────────────────────────────────────────────
create table if not exists public.bookings (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  rig         text not null,
  slot        text not null,
  duration    text not null,
  motion      boolean default false,
  booked_for  date not null,
  status      text default 'confirmed',        -- confirmed | completed | cancelled
  created_at  timestamptz default now()
);

-- ── enrolments ──────────────────────────────────────────────────────────────
-- A driver signing up for an Academy programme. Progress tracked by sessions.
create table if not exists public.enrolments (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references auth.users(id) on delete cascade,
  programme       text not null,                 -- programme slug
  programme_name  text not null,
  sessions_total  integer not null default 0,
  sessions_done   integer not null default 0,
  status          text default 'enquiry',        -- enquiry | active | completed
  centre          text default 'chennai',
  created_at      timestamptz default now()
);

-- ── licences ────────────────────────────────────────────────────────────────
-- Earned credentials — the rungs of the Ladder.
create table if not exists public.licences (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  name        text not null,                     -- "Initiation Licence" etc
  earned_at   timestamptz default now()
);

-- ── Row-Level Security ──────────────────────────────────────────────────────
alter table public.profiles       enable row level security;
alter table public.saved_builds   enable row level security;
alter table public.journey_events enable row level security;
alter table public.bookings       enable row level security;
alter table public.enrolments     enable row level security;
alter table public.licences       enable row level security;

-- helper: a policy that lets a user touch only their own rows
do $$
declare t text;
begin
  foreach t in array array['saved_builds','journey_events','bookings','enrolments','licences'] loop
    execute format('drop policy if exists "own rows" on public.%I', t);
    execute format(
      'create policy "own rows" on public.%I for all
         using (auth.uid() = user_id) with check (auth.uid() = user_id)', t);
  end loop;
end $$;

drop policy if exists "own profile" on public.profiles;
create policy "own profile" on public.profiles for all
  using (auth.uid() = id) with check (auth.uid() = id);

-- ── auto-create a profile + welcome journey on signup ───────────────────────
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, split_part(new.email, '@', 1))
  on conflict (id) do nothing;

  insert into public.journey_events (user_id, kind, title, detail, points)
  values (new.id, 'milestone', 'Joined RaceSims',
          'Your driver account is live. Spec a build, book a rig, race the league.', 0);
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
