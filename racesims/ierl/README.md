# Indian Esports Racing League — `ierl/`

Public leaderboard site at **indianesportsracingleague.com**. Monthly hot-lap series + season championship across the RaceSims partner network on Assetto Corsa.

Stack: Cloudflare Pages (static site) + Cloudflare Worker (cron scraper + JSON API) + D1 (SQLite) + KV (homepage cache). Vanilla HTML/CSS/JS, no framework. Anthropic-brand visual language.

## Folders

| Folder | What |
|---|---|
| `site/` | Cloudflare Pages — static HTML/CSS/JS |
| `worker/` | Cloudflare Worker — cron handler, scraper, JSON API |
| `worker/migrations/` | D1 schema and seed |
| `worker/src/parsers/` | One file per leaderboard source kind |
| `config/` | `events.json`, `partners.json` — Thambu's edit surface |
| `fixtures/` | Captured HTML samples for parser tests |

## First-time setup

```bash
cd ierl/
npm install
cp .dev.vars.example .dev.vars

# create remote D1 + KV (one time)
npx wrangler d1 create ierl
npx wrangler kv namespace create CACHE
# paste the IDs into wrangler.toml

npm run db:reset      # apply schema to local D1
npm run db:seed       # seed 2026 season + sample event
npm run dev:worker    # http://localhost:8787 (Worker + JSON API)
npm run dev:site      # http://localhost:8788 (Pages, talks to Worker)
```

## Adding a round

Edit [`config/events.json`](config/events.json):

```json
{
  "slug": "2026-r03-spa-bmw-m3-gt2",
  "round_number": 3,
  "name": "Round 3 — Spa-Francorchamps",
  "track": "Spa-Francorchamps",
  "car": "BMW M3 GT2",
  "starts_at": "2026-05-01T00:00:00Z",
  "ends_at": "2026-05-31T23:59:59Z",
  "sources": [
    { "kind": "rsr", "url": "https://radiators-champ.com/...", "partner": null }
  ]
}
```

Then `npm run sync-config`.

## Deploy

```bash
npm run deploy:worker
npm run deploy:site
```

## Scoring (defaults — override per season in DB)

- Points: F1 system `[25, 18, 15, 12, 10, 8, 6, 4, 2, 1]`
- Drop lowest 2 rounds
- Tiebreaker: countback (most wins, most P2s, ...)

## Plan

See [/Users/mindwise.ai/.claude/plans/we-are-planning-to-declarative-sutherland.md](../.claude/plans/we-are-planning-to-declarative-sutherland.md) for the full architectural plan.
