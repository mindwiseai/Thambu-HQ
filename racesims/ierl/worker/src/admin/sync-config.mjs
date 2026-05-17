#!/usr/bin/env node
// Reads config/events.json + config/partners.json and emits a single SQL
// payload to stdout. The npm script pipes this into wrangler d1 execute.
//
// Usage (from ierl/):
//   node worker/src/admin/sync-config.mjs                       # local D1
//   node worker/src/admin/sync-config.mjs | wrangler d1 execute ierl --remote
//
// The package.json `sync-config` script wires this into wrangler with
// `--command "$(node ...)"` so you don't have to remember the pipe.

import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '../../..');

const events = JSON.parse(readFileSync(resolve(root, 'config/events.json'), 'utf8'));
const partners = JSON.parse(readFileSync(resolve(root, 'config/partners.json'), 'utf8'));

const sql = [];

// Partners: upsert by slug. We don't delete missing partners — that's a
// manual operation to avoid clobbering by accident.
for (const p of partners.partners) {
  sql.push(
    `INSERT INTO partners (slug, name, city, state, source_url, logo_url, is_active) VALUES (` +
      [q(p.slug), q(p.name), q(p.city), p.state ? q(p.state) : 'NULL',
       p.source_url ? q(p.source_url) : 'NULL', p.logo_url ? q(p.logo_url) : 'NULL', 1].join(',') +
    `) ON CONFLICT(slug) DO UPDATE SET ` +
      `name=excluded.name, city=excluded.city, state=excluded.state, ` +
      `source_url=excluded.source_url, logo_url=excluded.logo_url, is_active=1;`
  );
}

// Events: upsert by slug. Sources: deactivate then re-insert.
for (const e of events.events) {
  sql.push(
    `INSERT INTO events (slug, season_id, round_number, name, track, car, car_class, starts_at, ends_at, status, notes) VALUES (` +
      [q(e.slug),
       `(SELECT id FROM seasons WHERE year = ${events.season})`,
       int(e.round_number), q(e.name), q(e.track), q(e.car),
       e.car_class ? q(e.car_class) : 'NULL',
       q(e.starts_at), q(e.ends_at),
       q(e.status ?? 'upcoming'),
       e.notes ? q(e.notes) : 'NULL'].join(',') +
    `) ON CONFLICT(slug) DO UPDATE SET ` +
      `name=excluded.name, track=excluded.track, car=excluded.car, ` +
      `car_class=excluded.car_class, starts_at=excluded.starts_at, ` +
      `ends_at=excluded.ends_at, status=excluded.status, notes=excluded.notes;`
  );

  sql.push(`UPDATE event_sources SET is_active = 0 WHERE event_id = (SELECT id FROM events WHERE slug = ${q(e.slug)});`);
  for (const s of e.sources ?? []) {
    sql.push(
      `INSERT INTO event_sources (event_id, partner_id, source_kind, url, is_active) VALUES (` +
        [`(SELECT id FROM events WHERE slug = ${q(e.slug)})`,
         s.partner ? `(SELECT id FROM partners WHERE slug = ${q(s.partner)})` : 'NULL',
         q(s.kind), q(s.url), 1].join(',') +
      `) ON CONFLICT(event_id, url) DO UPDATE SET is_active = 1, source_kind = excluded.source_kind, partner_id = excluded.partner_id;`
    );
  }
}

process.stdout.write(sql.join('\n'));

function q(s) { return `'${String(s).replace(/'/g, "''")}'`; }
function int(n) { return String(parseInt(n, 10)); }
