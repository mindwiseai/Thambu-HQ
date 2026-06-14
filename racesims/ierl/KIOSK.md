# IERL Kiosk (hosted web)

Driver sign-in for a **shared Assetto Corsa rig**, served from the IERL site —
**no install on the rig**. The customer enters name + phone, the page builds a
Content Manager deeplink that launches AC with their name set, and logs the
sign-in to the Worker. Solves shared-rig driver identity (see
`wiki/concepts/ierl-driver-identification.md`).

## How it works

The kiosk builds and opens:

```
acmanager://race/online?ip=<ip>&port=<tcpPort>&httpPort=<httpPort>&car=<carId>&name=<HANDLE>
```

Content Manager's `race/online` command reads `name` and sets the in-game driver
name (verified in CM source `ArgumentsHandler.Race.cs`). A browser opening this
link launches AC directly into the server with that name — so a hosted page is
all each rig needs. The unrelated `race/online/join` link has **no** name param.

- **Handle** = `FIRSTNAME-####` (last 4 of phone) — unique, payout-linked.
- Only the handle is public. Name + phone go to D1 (`kiosk_signins`), private.
- Leaderboard ingest must **dedupe by name, not GUID** (shared rig = one GUID).

## Deploy a rig (per rig, one-time)

1. Make sure **Content Manager + Steam + Assetto Corsa** are installed and the
   class cars are present (look up the car folder id in `content/cars/`).
2. Open a browser to:
   `https://indianesportsracingleague.com/kiosk?centre=<partner-slug>&rig=<n>`
3. **F11** for fullscreen; set it as the browser's home page / startup tab so the
   rig boots into the kiosk. Done — nothing else to install.

First launch, the browser asks "Open Content Manager?" — tick *always allow* so
it never prompts again.

## Central config

The two class servers (IP / TCP port / HTTP port / car id) live in
`worker/src/kiosk.ts` → `KIOSK_CONFIG`. Edit there, `wrangler deploy`, and every
rig picks it up from `GET /api/kiosk/config`. No per-rig config files.

## Testing on a rig before deploy — Setup panel

You don't need the Worker deployed to test. On the rig, open the kiosk and tap
the **⚙ Setup** button (or add `?setup=1`). Enter the server IP / ports / car ids;
it saves to that device's `localStorage` and overrides the central config. The
panel shows a live test deeplink. Tap **Use central config** to clear the
override and follow the league server again.

Quick raw test (no page): Win+R →
`acmanager://race/online?ip=YOUR_IP&port=9600&httpPort=8081&car=ks_ferrari_488_gt3&name=TEST-0001`
→ check the server leaderboard shows `TEST-0001`.

## Files

- `site/kiosk.html` · `site/assets/kiosk.css` · `site/assets/kiosk.js` — the page
- `worker/src/kiosk.ts` — central config + sign-in recording
- `worker/migrations/0003_kiosk_signins.sql` — the private sign-in table
- API: `GET /api/kiosk/config`, `POST /api/kiosk/signin`

> The Python kiosk in `kiosk/` is the offline fallback (writes the name to
> `race.ini` locally) if the deeplink `name` ever fails on a given setup. The
> hosted web kiosk here is the primary, install-free deployment.
