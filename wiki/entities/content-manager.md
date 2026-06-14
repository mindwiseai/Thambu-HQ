---
title: Content Manager (Assetto Corsa)
type: entity
domain: racesims
tags: [software, assetto-corsa, ierl, kiosk]
---

# Content Manager

The third-party launcher / server-config tool for [[assetto-corsa|Assetto Corsa]] that IERL uses to **run everything** on the rigs and to host/configure the league servers. Replaces AC's stock launcher.

## Role in IERL

- **On each rig:** the [[ierl-driver-identification|kiosk]] launches Content Manager into the chosen class server via its protocol deeplink (`acmanager://race/online/join?ip=…&httpPort=…`).
- **Driver name:** CM owns the driver-name field and rewrites `Documents\Assetto Corsa\cfg\race.ini` (`[REMOTE] NAME` / `[CAR_0] DRIVER_NAME`) on launch. Controlling that name is how shared-rig laps are attributed — see [[ierl-driver-identification]].
  - ⚠ CM can override `race.ini` from its own stored settings; the kiosk's write target is config-driven so it can point at whatever field CM actually reads (verify on-rig).
- **Server side:** used to configure the Amateur + Pro servers, content, and enforcement ([[real-penalty|Real Penalty]], track limits).

## Backlinks
- [[assetto-corsa]] · [[ierl-driver-identification]] · [[ierl-indian-esports-racing-league]]
