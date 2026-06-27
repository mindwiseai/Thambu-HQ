---
title: RaceSims Chennai — 8-Rig Hardware Config Session
type: source
source_type: spec
domain: racesims
raw_path: racesims/ierl/config/centres/racesims-chennai.json
ingested: 2026-06-27
---

## Summary

Full hardware BOM for all 8 simulator rigs at the [[racesims-chennai-flagship|RaceSims Chennai]] studio (Nungambakkam, opens July 2026, [[ierl]] joins August 2026). Session mapped every component — wheelbase, wheel, pedals, PC, monitors — against in-stock inventory, then finalized a zero-open-questions buy list. Config of record: `racesims/ierl/config/centres/racesims-chennai.json` (Studio62 electrical layout 19.06.2026, Project 90873).

## Key facts

- **8 rigs total:** 1 Hero (SIM-08, 3-DOF motion, west wall), 5 Standard (SIM-03 to SIM-07, east row, triple 32"), 2 Entry (SIM-01 south, SIM-02 north)
- **SIM-08 Hero:** [[simucube]] SC2 Pro + HOA Hub + D-rim · Simtrecs Pro 3-pedal · VNM shifter + handbrake · VNM 3-DOF motion (procure) · triple 45" (procure). All PC parts in stock (9800X3D + RTX 5080 + RM1200x).
- **SIM-07:** VNM Xtreme 32Nm + VNM GT + VNM V1 pedals (all in stock). RTX 5080 incoming. RM1000x PSU.
- **SIM-05:** [[conspit]] 20Nm + Conspit 290GP + Conspit CPP Lite pedals (all in stock).
- **SIM-03:** Conspit Ares 12Nm (procure) + Conspit 310 Apex + VNM Lite pedals (both in stock). Extra RTX 5070 Ti in stock saves one GPU purchase.
- **SIM-04:** Conspit Ares 12Nm (procure) + Conspit Max 01 (high-end wheel, in stock) + Conspit CPP Apex pedals (in stock).
- **SIM-06:** Conspit Ares 12Nm (procure) + Conspit 300GT (procure) + Conspit Evo pedals (in stock).
- **SIM-01 Entry:** Conspit Apex 8Nm (procure, replaces suspect Fanatec) + Conspit 300GT (procure) + Heusinkveld Sprint 2-pedal (only 1 set, in stock).
- **SIM-02 Entry:** Existing full PC (Ryzen 7 5700 + RTX 4070). Fanatec 8Nm #2 (confirmed working) + Fanatec CSL Formula 2.5 + Fanatec CSL 3-pedal + Samsung 34" curved. McLaren GT3 rim (in stock) = additional swappable rim for SIM-02.
- **Fanatec 8Nm #1:** Moved to spare (repair + intel/loan use) — not assigned to a rig.
- **Monitors in stock:** 3× Samsung 32" G6 (SIM-03), 3× Samsung 32" G5 (SIM-04), 1× Samsung 34" curved (SIM-02).

## People mentioned

- [[thambu]] — hardware decisions + inventory confirmation

## Decisions

- SIM-01 base swapped from Fanatec 8Nm (uncertain condition) to **Conspit Apex 8Nm** — safer for launch
- VNM Xtreme 32Nm kit moved from SIM-05 → **SIM-07**; Conspit 20Nm + 290GP moved SIM-07 → **SIM-05**
- Heusinkveld Sprint 2-pedal: **only 1 set** — goes to SIM-01; SIM-03 uses VNM Lite
- Fanatec McLaren GT3 rim: Fanatec QR incompatible with Conspit base → repurposed as **SIM-02 alternate rim**

## Buy list (final)

| Category | Items |
|---|---|
| Wheelbases | 3× Conspit Ares 12Nm (SIM-03, 04, 06) · 1× Conspit Apex 8Nm (SIM-01) |
| Wheels | 2× Conspit 300GT (SIM-01, SIM-06) |
| Motion | 1× VNM 3-DOF platform (SIM-08) |
| Monitors | 9× 32" curved (SIM-05/06/07) · 3× 27" (SIM-01) · 3× 45" (SIM-08) |
| PC builds | 7 builds — see [[racesims-chennai-rig-config]] for per-rig PC specs |

## Open questions

None — all resolved in this session.
