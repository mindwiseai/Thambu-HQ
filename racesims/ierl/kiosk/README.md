# IERL Kiosk (Python — fallback)

> **The primary kiosk is now the hosted web kiosk** (`../KIOSK.md`, `../site/kiosk.html`).
> It needs no install — a browser opening `acmanager://race/online?…&name=<handle>`
> launches Content Manager with the driver name set (confirmed in CM source). Use
> this Python version only if the deeplink `name` ever fails on a given CM/server
> combo — it writes the name to `race.ini` locally instead.

Driver sign-in screen for a **shared Assetto Corsa rig**. The customer enters
their name + phone, the kiosk builds a unique leaderboard handle, writes it
into AC's driver-name fields, logs the entry, and launches **Content Manager**
straight into the chosen class server.

This is the interim, manual-era solution to the shared-rig identity problem
(one rig = one Steam GUID, so laps must be keyed on the **name**). It is the
same component that later folds into the [[racesims-vms-build|VMS]] automation.

## Why it exists

See `wiki/concepts/ierl-driver-identification.md`. Short version: every
customer on a rig shares one Steam account, so the only per-customer signal on
the leaderboard is the driver **name** — and that name must be set fresh before
each timed run. This kiosk makes that a one-tap ritual and removes human error
from the one thing that decides who gets paid.

## Run it

Zero dependencies — Python 3 standard library only.

```bash
cp config.example.json config.json   # then edit config.json for this rig
python kiosk.py
```

Open `http://localhost:8900/` in a browser, press **F11** for fullscreen
(kiosk mode). Set the browser to launch this URL on boot for an unattended rig.

To preview the UI on any machine without touching AC, leave `"simulate": true`
— nothing is written and Content Manager is not launched.

## Configure (`config.json`)

| Key | What |
|-----|------|
| `rig_name` / `centre` | Shown top-right on the screen + logged with each entry |
| `ac_cfg_dir` | Path to `Documents\Assetto Corsa\cfg` on this rig |
| `leaderboard_url` | Shown on the "you're on track" screen |
| `session_return_seconds` | Auto-return to the welcome screen after launch |
| `simulate` | `true` = preview only (no file writes, no launch). Set `false` on the rig. |
| `name_targets` | Which ini section/keys receive the driver name (see below) |
| `classes` | Each class → display label + Content Manager join `deeplink` |

The join **deeplink** is Content Manager's protocol URL:
`acmanager://race/online/join?ip=<SERVER_IP>&httpPort=<CM_HTTP_PORT>`.
Run two servers (Amateur + Pro) and give each class its own deeplink.

## ⚠ The one on-rig verification step

Content Manager can **overwrite** `race.ini` from its own stored settings when
it launches. Before go-live, do a 10-minute check:

1. `simulate: false`, sign in as `TEST-0001`, launch, look at the server
   leaderboard (stracker / Real Penalty output).
2. **If `TEST-0001` shows up** → the default `name_targets` work. Done.
3. **If the rig's old/CM name shows instead** → CM is overriding `race.ini`.
   Point `name_targets` at the field CM actually reads (its stored driver name)
   and re-test. The write logic in `apply_driver_name()` is config-driven so
   only `config.json` changes, not the code.

## Leaderboard config — must-do

Whatever ingests server results (stracker, Real Penalty output, or the IERL
scraper) **must dedupe/rank by driver name, not GUID**. On a shared rig the
GUID is identical for everyone; keying on GUID collapses every customer into
one driver.

## Data / privacy

- `entries-YYYY-MM.csv` holds `handle, name, phone, class, rig` — this is the
  private map from the public leaderboard handle to a real person + payout
  contact. **Git-ignored. Contains PII — never commit it.**
- The public leaderboard only ever shows the **handle** (e.g. `RAHUL-4821`),
  never the phone number.
