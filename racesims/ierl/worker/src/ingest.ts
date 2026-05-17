import type { Env, ParsedLap } from './types';
import { sha1Hex, slugify } from './slugify';

export type IngestStats = { inserted: number; deduped: number };

// Insert parsed laps for a single event/source. Idempotent — re-running on
// the same HTML inserts zero new rows because source_row_hash collides.
export async function ingestLaps(
  env: Env,
  args: {
    eventId: number;
    sourceUrl: string;
    partnerId: number | null;
    laps: ParsedLap[];
  }
): Promise<IngestStats> {
  const stats: IngestStats = { inserted: 0, deduped: 0 };
  if (args.laps.length === 0) return stats;

  for (const lap of args.laps) {
    const driverSlug = slugify(lap.driver_name);
    if (!driverSlug) continue;
    if (!Number.isFinite(lap.lap_time_ms) || lap.lap_time_ms <= 0) continue;

    // Upsert driver. Stable slug — never renamed, even if display_name changes.
    const driverId = await upsertDriver(env, {
      slug: driverSlug,
      display_name: lap.driver_name.trim(),
      primary_partner_id: args.partnerId,
    });

    const hash = await sha1Hex(`${args.sourceUrl}|${driverSlug}|${lap.lap_time_ms}`);

    const result = await env.DB.prepare(
      `INSERT OR IGNORE INTO lap_times (
         event_id, driver_id, partner_id, lap_time_ms,
         sector1_ms, sector2_ms, sector3_ms,
         recorded_at, source_url, source_row_hash, is_valid
       ) VALUES (?,?,?,?,?,?,?,?,?,?,?)`
    )
      .bind(
        args.eventId,
        driverId,
        args.partnerId,
        lap.lap_time_ms,
        lap.sector1_ms ?? null,
        lap.sector2_ms ?? null,
        lap.sector3_ms ?? null,
        lap.recorded_at ?? null,
        args.sourceUrl,
        hash,
        lap.is_valid === false ? 0 : 1
      )
      .run();

    if (result.meta.changes && result.meta.changes > 0) stats.inserted++;
    else stats.deduped++;
  }

  return stats;
}

async function upsertDriver(
  env: Env,
  args: { slug: string; display_name: string; primary_partner_id: number | null }
): Promise<number> {
  // Try insert first; if slug is taken, just update last_seen_at and read the id.
  await env.DB.prepare(
    `INSERT OR IGNORE INTO drivers (slug, display_name, primary_partner_id)
     VALUES (?, ?, ?)`
  )
    .bind(args.slug, args.display_name, args.primary_partner_id)
    .run();

  await env.DB.prepare(
    `UPDATE drivers SET last_seen_at = datetime('now') WHERE slug = ?`
  )
    .bind(args.slug)
    .run();

  const row = await env.DB.prepare(`SELECT id FROM drivers WHERE slug = ?`)
    .bind(args.slug)
    .first<{ id: number }>();

  if (!row) throw new Error(`Driver upsert failed for slug: ${args.slug}`);
  return row.id;
}
