import type { Env, EventRow } from './types';
import { computeChampionship, computeEventLeaderboard } from './standings';
import { resolveKioskConfig, recordSignin } from './kiosk';

const HOME_CACHE_KEY = 'home:v1';
const HOME_CACHE_TTL_S = 300; // 5 minutes

export async function handleApi(req: Request, env: Env, url: URL): Promise<Response> {
  const path = url.pathname;

  if (path === '/api/home') return json(await getHomePayload(env));
  if (path === '/api/events') return json(await getEventList(env));
  if (path.startsWith('/api/event/')) {
    const slug = path.slice('/api/event/'.length);
    return json(await getEvent(env, slug));
  }
  if (path === '/api/championship') return json(await getChampionship(env));
  if (path === '/api/partners') return json(await getPartners(env));
  if (path.startsWith('/api/partner/')) {
    const slug = path.slice('/api/partner/'.length);
    return json(await getPartner(env, slug));
  }
  if (path === '/api/status') return json(await getStatus(env));

  // Kiosk: central per-rig config + sign-in logging (driver identity on shared rigs).
  if (path === '/api/kiosk/config') return json(await resolveKioskConfig(env));
  if (path === '/api/kiosk/signin' && req.method === 'POST') {
    let body: Record<string, unknown> = {};
    try {
      body = (await req.json()) as Record<string, unknown>;
    } catch {
      return json({ ok: false, error: 'invalid_json' }, 400);
    }
    const result = await recordSignin(env, body as Parameters<typeof recordSignin>[1]);
    return json(result, result.ok ? 200 : 400);
  }

  return json({ error: 'not_found' }, 404);
}

export async function refreshHomeCache(env: Env): Promise<void> {
  const fresh = await buildHomePayload(env);
  await env.CACHE.put(HOME_CACHE_KEY, JSON.stringify(fresh), {
    expirationTtl: HOME_CACHE_TTL_S * 12,
  });
}

async function getHomePayload(env: Env): Promise<unknown> {
  const cached = await env.CACHE.get(HOME_CACHE_KEY);
  if (cached) return JSON.parse(cached);
  const fresh = await buildHomePayload(env);
  await env.CACHE.put(HOME_CACHE_KEY, JSON.stringify(fresh), {
    expirationTtl: HOME_CACHE_TTL_S,
  });
  return fresh;
}

async function buildHomePayload(env: Env) {
  const season = await env.DB.prepare(
    `SELECT id, year, name FROM seasons WHERE is_current = 1 LIMIT 1`
  ).first<{ id: number; year: number; name: string }>();

  const currentEvent = await env.DB.prepare(
    `SELECT id, slug, round_number, name, track, car, car_class, starts_at, ends_at, status, hero_image
       FROM events
      WHERE season_id = ? AND status IN ('live','upcoming')
      ORDER BY status DESC, round_number ASC
      LIMIT 1`
  )
    .bind(season?.id ?? 0)
    .first<EventRow>();

  const top5 = currentEvent
    ? (await computeEventLeaderboard(env, currentEvent.id)).slice(0, 5)
    : [];

  const standings = season ? (await computeChampionship(env, season.id)).slice(0, 5) : [];

  const partnerCountRow = await env.DB.prepare(
    `SELECT COUNT(*) AS n FROM partners WHERE is_active = 1`
  ).first<{ n: number }>();

  return {
    season,
    current_event: currentEvent,
    top5,
    championship_top5: standings,
    partner_count: partnerCountRow?.n ?? 0,
    generated_at: new Date().toISOString(),
  };
}

async function getEventList(env: Env) {
  const result = await env.DB.prepare(
    `SELECT e.slug, e.round_number, e.name, e.track, e.car, e.car_class,
            e.starts_at, e.ends_at, e.status, e.hero_image,
            s.year AS season_year, s.name AS season_name
       FROM events e
       JOIN seasons s ON s.id = e.season_id
      ORDER BY s.year DESC, e.round_number DESC`
  ).all();
  return { events: result.results ?? [] };
}

async function getEvent(env: Env, slug: string) {
  const event = await env.DB.prepare(
    `SELECT e.*, s.year AS season_year, s.name AS season_name
       FROM events e JOIN seasons s ON s.id = e.season_id
      WHERE e.slug = ?`
  )
    .bind(slug)
    .first<EventRow & { season_year: number; season_name: string }>();
  if (!event) return { error: 'not_found' };

  const leaderboard = await computeEventLeaderboard(env, event.id);

  const sources = await env.DB.prepare(
    `SELECT source_kind, last_scraped_at, last_status, partner_id
       FROM event_sources
      WHERE event_id = ? AND is_active = 1`
  )
    .bind(event.id)
    .all();

  return { event, leaderboard, sources: sources.results ?? [] };
}

async function getChampionship(env: Env) {
  const season = await env.DB.prepare(
    `SELECT id, year, name, point_system, drop_lowest_n, tiebreaker
       FROM seasons WHERE is_current = 1 LIMIT 1`
  ).first<{
    id: number;
    year: number;
    name: string;
    point_system: string;
    drop_lowest_n: number;
    tiebreaker: string;
  }>();
  if (!season) return { error: 'no_active_season' };

  const standings = await computeChampionship(env, season.id);

  const events = await env.DB.prepare(
    `SELECT slug, round_number, name, track, status
       FROM events WHERE season_id = ? ORDER BY round_number ASC`
  )
    .bind(season.id)
    .all();

  return { season, standings, events: events.results ?? [] };
}

async function getPartners(env: Env) {
  const result = await env.DB.prepare(
    `SELECT slug, name, city, state, logo_url
       FROM partners WHERE is_active = 1
      ORDER BY name ASC`
  ).all();
  return { partners: result.results ?? [] };
}

async function getPartner(env: Env, slug: string) {
  const partner = await env.DB.prepare(
    `SELECT * FROM partners WHERE slug = ?`
  )
    .bind(slug)
    .first<{ id: number; slug: string; name: string; city: string }>();
  if (!partner) return { error: 'not_found' };

  const drivers = await env.DB.prepare(
    `SELECT d.slug, d.display_name, COUNT(lt.id) AS lap_count, MIN(lt.lap_time_ms) AS best_lap_ms
       FROM drivers d
       LEFT JOIN lap_times lt ON lt.driver_id = d.id AND lt.partner_id = ?
      WHERE d.primary_partner_id = ?
      GROUP BY d.id
      ORDER BY lap_count DESC, d.display_name ASC`
  )
    .bind(partner.id, partner.id)
    .all();

  return { partner, drivers: drivers.results ?? [] };
}

async function getStatus(env: Env) {
  const lastRun = await env.DB.prepare(
    `SELECT * FROM scrape_runs ORDER BY id DESC LIMIT 1`
  ).first();

  const recentErrors = await env.DB.prepare(
    `SELECT id, occurred_at, kind, http_status, message, event_source_id
       FROM scrape_errors
      ORDER BY id DESC LIMIT 50`
  ).all();

  const sources = await env.DB.prepare(
    `SELECT es.id, es.url, es.source_kind, es.last_scraped_at, es.last_status,
            e.slug AS event_slug, e.name AS event_name, e.status AS event_status
       FROM event_sources es
       JOIN events e ON e.id = es.event_id
      WHERE es.is_active = 1
      ORDER BY es.last_scraped_at DESC NULLS LAST`
  ).all();

  return {
    last_run: lastRun,
    recent_errors: recentErrors.results ?? [],
    sources: sources.results ?? [],
    generated_at: new Date().toISOString(),
  };
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'access-control-allow-origin': '*',
      'cache-control': status === 200 ? 'public, max-age=60' : 'no-store',
    },
  });
}
