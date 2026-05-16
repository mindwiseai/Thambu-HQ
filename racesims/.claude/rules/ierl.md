# IERL Domain Rules

Loads automatically when working inside `ierl/**`.

## What this is

The Indian Esports Racing League — a public leaderboard site at indianesportsracingleague.com. Monthly hot-lap series + season championship across the RaceSims partner network on Assetto Corsa. Cloudflare Pages (static) + Worker (cron + JSON API) + D1 + KV.

## Key terminology

Use this exact language in all wiki pages and code comments:

- **Partners**, never "dealers". The folks who host IERL rounds at their RaceSims-equipped locations.
- **Round** = one monthly event. **Event** is the schema name in code; "round" is the public-facing word.
- **Hot lap** = single fastest valid lap, not a race or session.
- **Leaderboard** = ranked driver list for a round (computed at query time).
- **Championship** = season-long points accumulation across all rounds.

## Standing rules

### Code

- Vanilla HTML/CSS/JS for the site — NO framework. The repo precedent is set, don't add React/Vue/Svelte.
- TypeScript on the Worker side only.
- Parser modules are pure functions of `(html, sourceUrl) => ParsedLap[]`. No network. No DB. Easy to fixture-test.
- New source kinds = new file under `worker/src/parsers/` + entry in the registry. Don't fork existing parsers in place.

### Data

- D1 lap_times rows are append-only with a `source_row_hash UNIQUE` constraint. Re-scrapes are idempotent.
- Best-lap per (event, driver) is `v_event_leaderboard`, never a stored column.
- Championship points are computed at query time — when scoring config changes, no migration is needed.
- Driver slugs are stable. Don't rename. If "Rahul S." needs to merge into "Rahul Sharma", that's a v2 aliasing concern.

### Visual

- Anthropic cream/coral palette. `--bg: #FAF9F5`, `--accent: #CC785C`. Tokens live in `site/assets/tokens.css`.
- Serif display (Fraunces / Tiempos), sans body (Inter / Styrene), mono for lap times (JetBrains Mono with `tnum`).
- Hairline 1px rules, no shadows, generous whitespace, no carbon-fiber/racing-stripe motifs.
- Coral accent is precious — only on live indicators, hover, P1, and the brand mark.

### Config workflow

- All event/partner changes go through `config/events.json` and `config/partners.json`, then `npm run sync-config`.
- Don't edit D1 by hand for normal operations.

### Verification

- Parsers: `npm test` runs vitest fixtures. New parser? New fixture under `fixtures/`.
- Site: `npm run dev:worker` + `npm run dev:site`, browse pages, watch `wrangler tail` for Worker errors.

## Cross-domain links

- **RaceSims is the parent brand** — link to `[[racesims]]` in any wiki ingest from IERL meetings or decisions.
- Partners are typically sim-racing-equipped retailers. Cross-reference `[[virtual-racing-hub]]` and other competitor/partner entities when relevant.
- IERL events and partner locations are part of the RaceSims ecosystem — always maintain bidirectional links.
- IERL-specific decisions or strategy should be filed under `wiki/domains/racesims/ierl-*.md` or similar, not orphaned.

## IERL wiki domain specifics

When ingesting IERL sources, use `domain: racesims` (IERL is a RaceSims sub-domain, not a separate domain) and tag with `source_type: ierl-update` or similar where applicable. Link all IERL entity pages back to `[[racesims]]`.
