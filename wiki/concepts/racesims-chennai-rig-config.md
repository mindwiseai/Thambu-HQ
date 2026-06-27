---
title: RaceSims Chennai — Per-Rig Hardware Config
type: concept
domain: racesims
tags: [chennai, hardware, bom, rig-config]
---

# RaceSims Chennai — Per-Rig Hardware Config

Authoritative per-rig BOM for the [[racesims-chennai-flagship|Chennai studio]] (Nungambakkam, opens July 2026). Config of record: `racesims/ierl/config/centres/racesims-chennai.json`. Finalized 2026-06-27 — source: [[2026-06-27-racesims-chennai-rig-config]].

Layout: 1 Hero (SIM-08, west wall, 3-DOF) · 5 Standard east row (SIM-03–07) · 2 Entry (SIM-01 south, SIM-02 north). See [[racesims-chennai-premium-baseline]] for financial model.

## Per-rig BOM

| Rig | Wheelbase | Wheel | Pedals | PC | Monitors |
|-----|-----------|-------|--------|-----|----------|
| SIM-08 Hero | SC2 Pro ✓ | HOA Hub + D-rim ✓ | Simtrecs Pro 3P ✓ | 9800X3D + RTX 5080 + RM1200x ✓ | 3× 45" ⚙ |
| SIM-07 | VNM Xtreme 32Nm ✓ | VNM GT ✓ | VNM V1 ✓ | 9800X3D + RTX 5080 (incoming) + RM1000x | 3× 32" ⚙ |
| SIM-06 | Ares 12Nm ⚙ | 300GT ⚙ | Conspit Evo ✓ | 9800X3D + RTX 5070 Ti + RM850x | 3× 32" ⚙ |
| SIM-05 | Conspit 20Nm ✓ | 290GP ✓ | Conspit CPP Lite ✓ | 9800X3D + RTX 5070 Ti + RM850x | 3× 32" ⚙ |
| SIM-04 | Ares 12Nm ⚙ | Max 01 ✓ | Conspit CPP Apex ✓ | 9800X3D + RTX 5070 Ti + RM850x | 3× 32" G5 ✓ |
| SIM-03 | Ares 12Nm ⚙ | 310 Apex ✓ | VNM Lite ✓ | 9800X3D + RTX 5070 Ti ★ + RM850x | 3× 32" G6 ✓ |
| SIM-02 Entry | Fanatec 8Nm #2 ✓ | Formula 2.5 ✓ | Fanatec CSL 3P ✓ | Existing Ryzen 7 5700 + RTX 4070 ✓ | 1× 34" curved ✓ |
| SIM-01 Entry | Conspit Apex 8Nm ⚙ | Conspit 300GT ⚙ | Heusinkveld Sprint 2P ✓ | Ryzen 7 9700 + RTX 5070 + RM850x | 3× 27" ⚙ |

✓ = in stock · ⚙ = procure · ★ = extra unit in stock (saves one GPU purchase)

All PC builds (except SIM-02): Gigabyte B850 Gaming X WiFi 6 · 32GB DDR5 6000MHz · 1TB M.2 Gen4 · 360mm AIO · Corsair 3500X.

## Landed cost & capital required

Costing finalized 2026-06-27 — source: [[2026-06-27-chennai-per-rig-costing]].

**Bank asset register (2026-06-27):** Total studio hardware value **₹45,47,236** = Owned (promoter contribution in kind) **₹18,78,624** + To-purchase (loan ask) **₹26,68,612**. All seats owned (shown at landed value). See [[2026-06-27-chennai-per-rig-costing]] for the own-vs-buy breakdown and open items.

| Rig | Cockpit+Seat | PC | Sim HW | Monitors+Stand | Total est. |
|-----|-------------|-----|--------|----------------|------------|
| SIM-01 | ₹39,346 | ₹2,08,152 | ₹1,28,331 | ₹53,630 | **~₹4,29,459** |
| SIM-02 | ₹39,346 | ~₹70,000 | ₹1,16,314 | ~₹45,000 | **~₹2,70,660** |
| SIM-03 | ₹58,055 | ₹1,52,987 | ₹96,156 | ₹82,250 | **~₹3,89,448** |
| SIM-04 | ₹58,055 | ₹2,65,087 | ₹1,10,523 | ₹82,250 | **~₹5,15,915** |
| SIM-05 | ₹56,957 | ₹2,65,087 | ₹1,23,252 | ₹82,250 | **~₹5,27,546** |
| SIM-06 | ₹57,835 | ₹2,65,087 | ₹1,70,560 | ₹82,250 | **~₹5,75,732** |
| SIM-07 | ₹56,957 | ₹2,75,772 | ₹1,68,487 | ~₹1,04,000 | **~₹6,05,216** |
| SIM-08 | ₹44,835 | owned | ~₹6,70,000 | ₹3,95,000 | **~₹11,09,835** |

Key unit prices: RTX 5080 FE ₹1,16,000 · RTX 5070 Ti ₹1,12,100 · 9800X3D ₹47,790 · Samsung 32" G5 ₹20,750 · 45" OLED ₹1,25,000 · Triple stand ₹20,000 · Single stand ₹10,000.

## Extras / spares

- **Fanatec 8Nm #1** — spare (repair + intel/loan use). Original SIM-01 unit, condition uncertain.
- **Fanatec McLaren GT3 V2 rim** — SIM-02 alternate swappable rim (Fanatec QR, incompatible with Conspit bases).
- **VNM shifter + handbrake** — SIM-08 only (in stock).

## Suppliers

[[conspit]] supplies: Ares 12Nm, Apex 8Nm, 310 Apex, Max 01, 290GP, 300GT, CPP Apex, CPP Lite, Evo pedals.
[[vnm]] supplies: Xtreme 32Nm, GT wheel, V1 pedals, VNM Lite, 3-DOF motion platform, shifter, handbrake.
