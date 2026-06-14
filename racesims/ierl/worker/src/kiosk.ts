import type { Env } from './types';

/**
 * Kiosk config — single source of truth for every rig's sign-in screen.
 *
 * Amateur and Pro run as TWO separate Assetto Corsa servers, so each class
 * carries its own ip / port (TCP) / httpPort. The kiosk builds a Content
 * Manager deeplink from these:
 *
 *   acmanager://race/online?ip=<ip>&port=<port>&httpPort=<httpPort>&car=<car>&name=<handle>
 *
 * `car` must be the AC car FOLDER id (look in …/assettocorsa/content/cars/).
 *
 * EDIT the placeholders below before launch, then `wrangler deploy`. Changing
 * a server here updates every rig at once — no per-centre config. (For an
 * on-rig test before this is deployed, use the kiosk's Setup panel, which
 * overrides this via localStorage.)
 *
 * AUTO-DISCOVERY: with `autodiscover: true`, you only need to set `ip` +
 * `httpPort`. The Worker queries the live AC server's `/INFO` and fills in the
 * TCP `port` and current `car` automatically (so the car always matches what
 * the server is actually running). The static `port`/`car` below are just the
 * fallback used if the server can't be reached. Result is cached 60s in KV.
 */
export const KIOSK_CONFIG = {
  leaderboard_url: 'https://indianesportsracingleague.com',
  return_seconds: 12,
  classes: {
    Amateur: {
      label: 'Amateur — Mazda MX-5',
      autodiscover: true,
      ip: '0.0.0.0',           // TODO: league Amateur server IP
      httpPort: 8081,          // TODO: HTTP port
      port: 9600,              // fallback TCP race port (auto-pulled when reachable)
      car: 'ks_mazda_mx5_cup', // fallback car (auto-pulled when reachable)
    },
    Pro: {
      label: 'Pro — Ferrari 488 GT3',
      autodiscover: true,
      ip: '0.0.0.0',             // TODO: league Pro server IP
      httpPort: 8082,            // TODO: HTTP port
      port: 9610,                // fallback TCP race port (auto-pulled when reachable)
      car: 'ks_ferrari_488_gt3', // fallback car (auto-pulled when reachable)
    },
  },
} as const;

export type ResolvedClass = { label: string; car: string; ip: string; port: number; httpPort: number };
export type ResolvedKioskConfig = {
  leaderboard_url: string;
  return_seconds: number;
  classes: Record<string, ResolvedClass>;
};

const RESOLVE_CACHE_KEY = 'kiosk:resolved:v1';
const RESOLVE_TTL_S = 60;

/** Static config (no live lookup) — used as the base and the fallback. */
export function getKioskConfig(): ResolvedKioskConfig {
  const classes: Record<string, ResolvedClass> = {};
  for (const [key, c] of Object.entries(KIOSK_CONFIG.classes)) {
    classes[key] = { label: c.label, car: c.car, ip: c.ip, port: c.port, httpPort: c.httpPort };
  }
  return { leaderboard_url: KIOSK_CONFIG.leaderboard_url, return_seconds: KIOSK_CONFIG.return_seconds, classes };
}

/**
 * Live config: auto-discovers TCP port + car from each class server's /INFO,
 * falling back to the static values per-field. Cached 60s in KV.
 */
export async function resolveKioskConfig(env: Env): Promise<ResolvedKioskConfig> {
  const cached = await env.CACHE.get(RESOLVE_CACHE_KEY);
  if (cached) {
    try {
      return JSON.parse(cached) as ResolvedKioskConfig;
    } catch {
      /* fall through and rebuild */
    }
  }

  const out = getKioskConfig();
  for (const [key, c] of Object.entries(KIOSK_CONFIG.classes)) {
    if (!c.autodiscover || !c.ip || c.ip === '0.0.0.0') continue;
    const info = await fetchServerInfo(c.ip, c.httpPort);
    if (!info) continue;
    const tport = Number(info.tport ?? info.tcp_port ?? info.port);
    if (Number.isFinite(tport) && tport > 0) out.classes[key].port = tport;
    const car = Array.isArray(info.cars) ? info.cars[0] : info.car;
    if (typeof car === 'string' && car) out.classes[key].car = car;
  }

  await env.CACHE.put(RESOLVE_CACHE_KEY, JSON.stringify(out), { expirationTtl: RESOLVE_TTL_S });
  return out;
}

/** Fetch an Assetto Corsa server's /INFO JSON (Kunos/CM-wrapper), with timeout. */
async function fetchServerInfo(ip: string, httpPort: number): Promise<Record<string, unknown> | null> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 2500);
  try {
    const r = await fetch(`http://${ip}:${httpPort}/INFO`, {
      signal: ctrl.signal,
      headers: { accept: 'application/json' },
    });
    if (!r.ok) return null;
    return (await r.json()) as Record<string, unknown>;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

type SigninBody = {
  centre?: string;
  rig?: string;
  class?: string;
  handle?: string;
  name?: string;
  phone?: string;
};

/**
 * Records a kiosk sign-in: the private map from public leaderboard handle to a
 * real person + payout phone. PII — only the handle is ever public.
 */
export async function recordSignin(env: Env, body: SigninBody): Promise<{ ok: boolean; error?: string }> {
  const handle = (body.handle ?? '').trim();
  const name = (body.name ?? '').trim();
  const klass = (body.class ?? '').trim();
  if (!handle || !name || !klass) {
    return { ok: false, error: 'handle, name and class are required' };
  }
  await env.DB.prepare(
    `INSERT INTO kiosk_signins (centre_slug, rig, handle, driver_name, phone, class)
     VALUES (?, ?, ?, ?, ?, ?)`
  )
    .bind(
      (body.centre ?? '').trim() || null,
      (body.rig ?? '').trim() || null,
      handle,
      name,
      (body.phone ?? '').trim() || null,
      klass
    )
    .run();
  return { ok: true };
}
