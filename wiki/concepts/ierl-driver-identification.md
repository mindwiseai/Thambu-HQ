---
title: IERL Driver Identification on Shared Rigs
type: concept
domain: racesims
tags: [ierl, assetto-corsa, content-manager, kiosk, leaderboard, ops]
---

# IERL Driver Identification on Shared Rigs

How [[ierl-indian-esports-racing-league|IERL]] maps each customer's lap to the right name when **many customers share one rig**. Decided 2026-06-14 ([[2026-06-14-ierl-july-launch]]); kiosk built at `racesims/ierl/kiosk/`.

## The problem

A shared rig = **one Steam account = one GUID**. Every Assetto Corsa leaderboard plugin (stracker, [[real-penalty|Real Penalty]] output, Content Manager results) can key a lap on either the **GUID** or the **driver name**. The GUID never changes on a shared rig, so the only per-customer signal is the **name** — which must be:

1. **Set fresh for each customer** before their timed run, and
2. **Grouped by name, not GUID** on the leaderboard (else every customer on one rig collapses into a single entry).

## Where the name lives

AC sends the driver name from `Documents\Assetto Corsa\cfg\race.ini` → `[REMOTE] NAME` (online) / `[CAR_0] DRIVER_NAME`. **[[content-manager|Content Manager]]** owns that field and rewrites it on launch — so whatever sets the name in CM before "Join" controls the leaderboard identity.

> Caveat: Content Manager can overwrite `race.ini` from its own stored settings. The kiosk's name-write target is config-driven so it can point at the field CM actually reads — verify on-rig before go-live (see kiosk README).

## The solution — unique handle + kiosk

- **Handle scheme:** `FIRSTNAME-####` where #### = last 4 digits of phone (e.g. `RAHUL-4821`). Avoids two "Rahul"s merging, avoids typo collisions, and ties the public handle to a phone number for payout via [[ierl-direct-settlement|settlement]].
- **Private map:** a per-rig log (`entries-YYYY-MM.csv`) records `handle → name → phone → class`. The public leaderboard shows only the handle; the phone stays private. **PII — git-ignored, never committed.**
- **Anti-mistake guard:** reset the name to a placeholder (`— SET NAME —`) after each session. A lap under the placeholder instantly flags a forgotten sign-in rather than mis-attributing the time.

## Confirmed: the deeplink can set the driver name (2026-06-14)

Verified in Content Manager's source ([`ArgumentsHandler.Race.cs`](https://github.com/gro-ove/actools/blob/master/AcManager/Tools/ArgumentsHandler.Race.cs)):

- `acmanager://race/online/join` reads only `ip`, `httpPort`, `password` — **no name** (just opens the server page).
- `acmanager://race/online` reads `ip`, `port` (TCP), `httpPort`, `car` (required) **plus optional `name`** → assigned to `DriverName` and **launches the game directly**.

So the working deeplink is:
```
acmanager://race/online?ip=<ip>&port=<tcpPort>&httpPort=<httpPort>&car=<carId>&name=<HANDLE>
```
Because a **browser** can open this and CM launches AC with the name set, **no local file-writing or local app is required** — which is what makes a hosted kiosk possible.

## The kiosk — hosted web (primary)

Built into the IERL site: `site/kiosk.html` + `site/assets/kiosk.{css,js}`, config from `worker/src/kiosk.ts` (`GET /api/kiosk/config`), sign-ins to D1 via `POST /api/kiosk/signin` (`0003_kiosk_signins.sql`). See `racesims/ierl/KIOSK.md`.

- **Deployment = a browser bookmark**, no install: `…/kiosk?centre=<slug>&rig=<n>`, fullscreen. Each rig already has CM + Steam + AC.
- Customer enters **name + phone** → unique handle → page opens the `race/online` deeplink → CM launches with the name → sign-in logged to D1 (`kiosk_signins`, PII, private).
- Central config: maintain only **`ip` + `httpPort`** per class in `kiosk.ts`. **Auto-discovery** fetches each server's `http://ip:httpPort/INFO` and fills in the TCP `port` + current `car` (cached 60s, static fallback) — so the car always matches the running server and centres configure nothing.
- A per-device **Setup panel** (⚙ / `?setup=1`) overrides via localStorage for on-rig testing before deploy.

> Fallback: the **Python kiosk** (`racesims/ierl/kiosk/`, stdlib only) writes the name to `race.ini` locally instead of relying on the deeplink — kept in case `name` ever fails on a given CM/server combo. The hosted web kiosk is primary.

## Migration to LMU

When IERL migrates to [[le-mans-ultimate|Le Mans Ultimate]] (once the software is ready), identity is tied more tightly to the online account — per-customer name-swapping on a shared rig is harder, so the kiosk's name-injection bridge matters **more**, not less. Migration becomes mostly a change of *where* the name is written.

## Must-do leaderboard config

Whatever ingests server results (stracker / [[real-penalty|Real Penalty]] / the IERL scraper) **must dedupe and rank by driver name, not GUID** — the single most common way a shared-rig leaderboard breaks.

## Backlinks
- [[ierl-indian-esports-racing-league]]
- [[ierl-direct-settlement]]
- [[content-manager]] · [[real-penalty]] · [[assetto-corsa]]
- [[2026-06-14-ierl-july-launch]] · [[2026-06-14-ierl-kiosk-build]]
