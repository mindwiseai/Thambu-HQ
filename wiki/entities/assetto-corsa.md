---
title: Assetto Corsa
type: entity
domain: racesims
tags: [platform, sim, ierl]
---

# Assetto Corsa

PC racing simulator (Kunos Simulazioni). The platform [[ierl-indian-esports-racing-league|IERL]] launches on for Season 1.

## Why IERL chose it (over Le Mans Ultimate)

- **Self-hostable 24/7.** RaceSims runs its own dedicated servers cheaply on a VPS. LMU / RaceControl.gg billed per-minute (~₹19,500/month for 24/7 — unviable, ~43% of the pool).
- **No session time cap** — qualifying loops run indefinitely (LMU capped sessions at 2h45m).
- **Base game, no DLC** needed for [[mugello|Mugello]] + the MX-5 ND / Ferrari 488 GT3 cars.
- Mature plugin ecosystem: [[real-penalty|Real Penalty]] (track limits / penalties) + stracker (lap logging).

## IERL config

- Everything is run through **[[content-manager|Content Manager]]** (launcher + server config) on the rigs.
- 2 dedicated servers (Amateur + Pro), 24/7, 60-min qualifying loops.
- Track limits enforced via [[real-penalty|Real Penalty]]; fixed/common car setups.
- Shared-rig driver identity handled by the [[ierl-driver-identification|kiosk]].
- July: lap times submitted **manually** to the leaderboard until [[racesims-vms-build|the VMS]] automates it. Migration target: [[le-mans-ultimate|LMU]].

> Note: the LOCKED [[racesims-championship-architecture]] specifies LMU + iRacing for the in-centre Chennai championship — a platform difference from IERL flagged for reconciliation. See [[2026-06-14-ierl-july-launch]].

## Backlinks
- [[ierl-indian-esports-racing-league]]
- [[real-penalty]]
