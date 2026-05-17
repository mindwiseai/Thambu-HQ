# `ierl/config/`

Single source of truth for events and partners. Everything else (D1 rows, Worker bindings, the public site) is downstream.

## Adding a round

1. Edit [`events.json`](events.json).
2. Append a new event to the `events` array. Use a slug like `2026-r03-spa-bmw-m3-gt2`.
3. List all source URLs under `sources`. `kind` must be one of: `rsr`, `ac-server-manager`, `acti`, `generic`.
4. `npm run sync-config` from the parent folder.

## Source kinds

| `kind` | Use for |
|---|---|
| `rsr` | RSR Live Timing pages on radiators-champ.com |
| `ac-server-manager` | Pages from the AC Server Manager admin (acsm) |
| `acti` | Assetto Corsa Time Trial leaderboards and similar custom community sites |
| `generic` | Any partner-hosted ad-hoc results page with a `<table>` of times — fallback |

## Partners

[`partners.json`](partners.json) is the directory. Slugs are stable — don't rename, even if the partner rebrands. Add a new entry, then `npm run sync-config`.
