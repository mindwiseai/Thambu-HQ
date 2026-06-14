---
title: IERL Kiosk Build — Deeplink Finding, Hosted Kiosk, Auto-Discovery
type: source
source_type: spec
domain: racesims
raw_path: racesims/ierl/KIOSK.md
ingested: 2026-06-14
---

# IERL Kiosk Build — Deeplink Finding, Hosted Kiosk, Auto-Discovery

## Summary

Working session that turned the shared-rig driver-identity problem into a deployable solution for the [[ierl-indian-esports-racing-league|IERL]] partner network. Confirmed from [[content-manager|Content Manager]]'s source that the `acmanager://race/online` deeplink accepts a **`name`** parameter — so a browser can launch [[assetto-corsa|Assetto Corsa]] with the customer's name set, no local app needed. Built a **hosted web kiosk** into the IERL site (Cloudflare Pages + Worker + D1) that deploys as a **bookmark per rig** — zero install. Added **auto-discovery** so the Worker pulls each server's TCP port + current car from its live `/INFO`, leaving only `ip` + `httpPort` to maintain centrally.

## Key facts

- **Deeplink proof** (CM source [`ArgumentsHandler.Race.cs`](https://github.com/gro-ove/actools/blob/master/AcManager/Tools/ArgumentsHandler.Race.cs)):
  - `acmanager://race/online/join` → reads only `ip`, `httpPort`, `password`. **No name.**
  - `acmanager://race/online` → reads `ip`, `port` (TCP), `httpPort`, `car` (required), optional **`name`** (→ `DriverName`), `nationality`, `skin`, `track`, `password`. Launches the game directly.
  - Working link: `acmanager://race/online?ip=<ip>&port=<tcp>&httpPort=<http>&car=<carId>&name=<HANDLE>`
- **Hosted web kiosk** (primary): `racesims/ierl/site/kiosk.html` + `assets/kiosk.{css,js}`. Dark fullscreen UI on IERL tokens. Name + phone → unique handle (`FIRSTNAME-####`) → opens the deeplink → logs sign-in.
- **Deployment = a browser bookmark**: `…/kiosk?centre=<slug>&rig=<n>`, fullscreen. Rigs already have CM + Steam + AC. **Centres configure nothing.**
- **Worker endpoints**: `GET /api/kiosk/config` (central, auto-discovered) and `POST /api/kiosk/signin` (D1 `kiosk_signins`, migration `0003`). Config source: `worker/src/kiosk.ts` → `KIOSK_CONFIG`.
- **Auto-discovery**: classes flagged `autodiscover: true` only need `ip` + `httpPort`; the Worker fetches `http://ip:httpPort/INFO`, fills TCP `port` + current `car`, caches 60s in KV, falls back to static values if unreachable.
- **Setup panel** (⚙ / `?setup=1`): per-device localStorage override of the config — for on-rig testing before the Worker is deployed. Shows a live test deeplink.
- **Privacy**: only the handle is public; name + phone live in D1 (`kiosk_signins`), never exposed by a public API. Leaderboard ingest must dedupe by **name, not GUID**.

## Decisions

1. Hosted web kiosk is the **primary** deployment; the [[ierl-driver-identification|Python kiosk]] (`kiosk/`) is demoted to a documented fallback (writes `race.ini` locally) for the case the deeplink `name` ever fails.
2. Use `race/online` (not `race/online/join`) to carry the driver name.
3. Auto-discover TCP port + car from live `/INFO`; maintain only `ip` + `httpPort` centrally.

## Open questions

- `/INFO` field names vary by server/wrapper — auto-discovery reads `tport`/`tcp_port`/`port` and `cars[0]`/`car` with static fallback. Verify once against the live IERL servers (`GET /api/kiosk/config` should show the live TCP port + car).
- The AC server HTTP port must be reachable from Cloudflare for auto-discovery; otherwise it silently falls back.

## People mentioned

- [[thambu]] — will test the deeplink + kiosk on a rig.

## Backlinks
- [[ierl-driver-identification]]
- [[ierl-indian-esports-racing-league]]
- [[content-manager]] · [[assetto-corsa]]
