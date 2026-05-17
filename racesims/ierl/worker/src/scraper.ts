import type { Env } from './types';
import { getParser } from './parsers';
import { ingestLaps } from './ingest';
import { refreshHomeCache } from './api';

type ActiveSourceRow = {
  id: number;
  event_id: number;
  url: string;
  source_kind: string;
  partner_id: number | null;
};

const FETCH_BATCH_SIZE = 5;

export async function runScrape(env: Env, opts: { force?: boolean } = {}): Promise<{
  attempted: number;
  ok: number;
  inserted: number;
  deduped: number;
  errors: number;
}> {
  const startedAt = new Date().toISOString();
  const runRow = await env.DB.prepare(
    `INSERT INTO scrape_runs (started_at) VALUES (?) RETURNING id`
  )
    .bind(startedAt)
    .first<{ id: number }>();
  const runId = runRow!.id;

  const sources = await listActiveSources(env, opts.force ?? false);
  let attempted = 0;
  let ok = 0;
  let inserted = 0;
  let deduped = 0;
  let errors = 0;

  for (let i = 0; i < sources.length; i += FETCH_BATCH_SIZE) {
    const batch = sources.slice(i, i + FETCH_BATCH_SIZE);
    const results = await Promise.allSettled(batch.map((s) => scrapeOne(env, s)));
    for (let j = 0; j < results.length; j++) {
      attempted++;
      const r = results[j]!;
      const source = batch[j]!;
      if (r.status === 'fulfilled') {
        ok++;
        inserted += r.value.inserted;
        deduped += r.value.deduped;
      } else {
        errors++;
        await logError(env, source.id, 'unknown', null, String(r.reason));
        await markSourceStatus(env, source.id, 'error');
      }
    }
  }

  await env.DB.prepare(
    `UPDATE scrape_runs
       SET finished_at = datetime('now'),
           sources_attempted = ?, sources_ok = ?,
           laps_inserted = ?, laps_deduped = ?,
           notes = ?
     WHERE id = ?`
  )
    .bind(
      attempted,
      ok,
      inserted,
      deduped,
      `errors=${errors}`,
      runId
    )
    .run();

  // Refresh KV homepage cache after every run.
  try {
    await refreshHomeCache(env);
  } catch (e) {
    // Non-fatal — the public API will fall back to D1.
    await logError(env, null, 'cache', null, `home cache refresh failed: ${String(e)}`);
  }

  return { attempted, ok, inserted, deduped, errors };
}

async function listActiveSources(env: Env, force: boolean): Promise<ActiveSourceRow[]> {
  const sql = force
    ? `SELECT es.id, es.event_id, es.url, es.source_kind, es.partner_id
         FROM event_sources es
         JOIN events e ON e.id = es.event_id
        WHERE es.is_active = 1`
    : `SELECT es.id, es.event_id, es.url, es.source_kind, es.partner_id
         FROM event_sources es
         JOIN events e ON e.id = es.event_id
        WHERE es.is_active = 1
          AND e.status IN ('live','upcoming')`;
  const result = await env.DB.prepare(sql).all<ActiveSourceRow>();
  return result.results ?? [];
}

function buildRequestHeaders(env: Env, kind: string): HeadersInit {
  const base: Record<string, string> = {
    'user-agent': env.SCRAPE_USER_AGENT,
    'accept': 'text/html,*/*',
  };
  if (kind === 'sra-vms') {
    base['accept'] = 'application/json';
    if (env.SRA_VMS_TOKEN) {
      base['authorization'] = `SRL ${env.SRA_VMS_TOKEN}`;
    }
  }
  return base;
}

async function scrapeOne(env: Env, source: ActiveSourceRow): Promise<{ inserted: number; deduped: number }> {
  let html: string;
  try {
    const res = await fetch(source.url, {
      headers: buildRequestHeaders(env, source.source_kind),
      cf: { cacheTtl: 300, cacheEverything: true },
    });
    if (!res.ok) {
      await logError(env, source.id, 'http', res.status, `HTTP ${res.status}`);
      await markSourceStatus(env, source.id, `http_${res.status}`);
      return { inserted: 0, deduped: 0 };
    }
    html = await res.text();
  } catch (e) {
    await logError(env, source.id, 'http', null, String(e));
    await markSourceStatus(env, source.id, 'http_error');
    throw e;
  }

  let laps;
  try {
    const parser = getParser(source.source_kind as any);
    laps = parser.parse(html, source.url);
  } catch (e) {
    await logError(env, source.id, 'parse', null, String(e), html.slice(0, 500));
    await markSourceStatus(env, source.id, 'parse_error');
    throw e;
  }

  if (laps.length === 0) {
    await logError(env, source.id, 'parse', null, 'parser returned 0 laps', html.slice(0, 500));
    await markSourceStatus(env, source.id, 'empty');
    return { inserted: 0, deduped: 0 };
  }

  const stats = await ingestLaps(env, {
    eventId: source.event_id,
    sourceUrl: source.url,
    partnerId: source.partner_id,
    laps,
  });

  await markSourceStatus(env, source.id, 'ok');
  return stats;
}

async function logError(
  env: Env,
  eventSourceId: number | null,
  kind: string,
  httpStatus: number | null,
  message: string,
  sample?: string
): Promise<void> {
  await env.DB.prepare(
    `INSERT INTO scrape_errors (event_source_id, kind, http_status, message, sample)
     VALUES (?,?,?,?,?)`
  )
    .bind(eventSourceId, kind, httpStatus, message.slice(0, 1000), sample ?? null)
    .run();
}

async function markSourceStatus(env: Env, id: number, status: string): Promise<void> {
  await env.DB.prepare(
    `UPDATE event_sources
        SET last_scraped_at = datetime('now'), last_status = ?
      WHERE id = ?`
  )
    .bind(status, id)
    .run();
}
