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
 */
export const KIOSK_CONFIG = {
  leaderboard_url: 'https://indianesportsracingleague.com',
  return_seconds: 12,
  classes: {
    Amateur: {
      label: 'Amateur — Mazda MX-5',
      car: 'ks_mazda_mx5_cup', // verify against content/cars
      ip: '0.0.0.0',           // TODO: league Amateur server IP
      port: 9600,              // TODO: TCP race port
      httpPort: 8081,          // TODO: HTTP port
    },
    Pro: {
      label: 'Pro — Ferrari 488 GT3',
      car: 'ks_ferrari_488_gt3', // verify against content/cars
      ip: '0.0.0.0',             // TODO: league Pro server IP
      port: 9610,                // TODO: TCP race port
      httpPort: 8082,            // TODO: HTTP port
    },
  },
} as const;

export function getKioskConfig() {
  return KIOSK_CONFIG;
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
