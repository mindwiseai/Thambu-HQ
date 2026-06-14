---
title: Content Manager (Assetto Corsa)
type: entity
domain: racesims
tags: [software, assetto-corsa, ierl, kiosk]
---

# Content Manager

The third-party launcher / server-config tool for [[assetto-corsa|Assetto Corsa]] that IERL uses to **run everything** on the rigs and to host/configure the league servers. Replaces AC's stock launcher.

## Deeplink — the two online commands (confirmed from source)

From CM's URI handler [`ArgumentsHandler.Race.cs`](https://github.com/gro-ove/actools/blob/master/AcManager/Tools/ArgumentsHandler.Race.cs):

- **`acmanager://race/online/join`** — reads only `ip`, `httpPort`, `password`. **No driver name.** Just opens the server page (manual Connect). This is the link server tools hand out.
- **`acmanager://race/online`** — reads `ip`, `port` (TCP), `httpPort`, `car` (required), optional **`name`** (assigned to `DriverName`), `nationality`, `skin`, `track`, `password`. **Launches the game directly.** This is the one the [[ierl-driver-identification|kiosk]] uses to set the customer's name:
  ```
  acmanager://race/online?ip=<ip>&port=<tcp>&httpPort=<http>&car=<carId>&name=<HANDLE>
  ```

Because a browser can open this, the [[ierl-driver-identification|hosted kiosk]] needs **no local file-writing** — no `race.ini` edit, no local app.

## Server info / auto-discovery

CM-wrapped / Kunos AC servers expose `http://ip:httpPort/INFO` (JSON: `cars`, `track`, TCP port, clients…). The kiosk's Worker reads this to **auto-fill the TCP port + current car** from just `ip` + `httpPort` — see [[ierl-driver-identification]].

## Role in IERL

- **On each rig:** launches AC into the chosen class server via the `race/online` deeplink above.
- **Server side:** configures the Amateur + Pro servers, content, and enforcement ([[real-penalty|Real Penalty]], track limits).
- **Legacy note (fallback only):** CM also owns `Documents\Assetto Corsa\cfg\race.ini` (`[REMOTE] NAME`); the Python kiosk fallback writes there instead of using the deeplink name.

## Backlinks
- [[assetto-corsa]] · [[ierl-driver-identification]] · [[ierl-indian-esports-racing-league]]
