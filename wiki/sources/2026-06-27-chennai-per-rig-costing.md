---
title: RaceSims Chennai — Per-Rig Costing Session (Jun 27 2026)
type: source
source_type: document
domain: racesims
raw_path: racesims/ierl/config/centres/racesims-chennai.json
ingested: 2026-06-27
---

# RaceSims Chennai — Per-Rig Costing Session

Costing session deriving landed unit prices and capital-required table for the [[racesims-chennai-flagship|Chennai studio]]. Prices sourced from three documents: Racesims Landed Costs Excel (Conspit/VNM/Seats), Navkar Quote (PC components + monitors), Visuvam Computech invoice VC/26-27/1079 (Samsung 32" monitors). Extends [[2026-06-27-racesims-chennai-rig-config]].

## Summary

Full per-rig landed cost table built for all 8 Chennai rigs. **Capital required to open: ₹29,38,637** — all items fully resolved. All seats confirmed in stock (XP×2 for SIM-01/02, Phantom for SIM-08); 2 GT rigs to fabricate at ₹22,000 each; 1 triple stand already owned.

## Key facts

- **Total capital required: ₹29,38,637** — fully resolved. Breakdown: ₹29,14,637 base + ₹44,000 (2× GT rig fabrication) − ₹20,000 (1 triple stand already owned). Seats: all in stock (XP×2 for SIM-01/02, Phantom for SIM-08, Apex×2 for SIM-05/07, Raptor×2 for SIM-03/04)
- **Samsung 32" G5 (LS32CG550E): ₹20,750/unit** — Visuvam Computech invoice VC/26-27/1079 dated 22-Jun-26; 9 units × ₹20,750 = ₹1,86,750 already invoiced
- **RTX 5080 Founders Edition: ₹1,16,000** — confirmed by Thambu; both SIM-07 and SIM-08 units treated as owned
- **RM1200x PSU (SIM-08): ₹17,000** — confirmed by Thambu; already owned
- **SIM-08 full PC: entirely owned** — 9800X3D + RTX 5080 + RM1200x + all peripherals
- **Monitor stands: ₹20,000 landed (triple), ₹10,000 (single)** — confirmed by Thambu; 7× triple + 1× single = ₹1,50,000
- **VNM 3-DOF motion platform: ₹3,71,677/unit** — May 2026 import rate per unit

## PC component prices (Navkar Quote, Jun 2026, all incl. 18% GST)

| Component | Price |
|-----------|-------|
| AMD Ryzen 9 9800X3D | ₹47,790 |
| AMD Ryzen 7 9700X | ₹30,975 |
| Gigabyte B850 Gaming X WiFi 6 | ₹17,464 |
| RTX 5070 Ti SOLID SFF OC | ₹1,12,100 |
| RTX 5070 Twin Edge | ₹71,980 |
| Corsair Vengeance 32GB DDR5 6000 | ₹43,070 |
| Corsair MP600 Pro NH 1TB NVMe | ₹17,700 |
| Corsair Nautilus 360mm AIO | ₹8,083 |
| Corsair RM850e | ₹10,325 |
| Corsair RM1000e | ₹17,110 |
| Corsair 3500X R ARGB case | ₹8,555 |
| Corsair 4000D Frame ARGB case | ₹8,555 |

## Per-rig landed cost totals

| Rig | PC (₹) | Sim HW (₹) | Monitors (₹) | Stand (₹) | Total known (₹) |
|-----|---------|------------|--------------|-----------|-----------------|
| SIM-01 | 2,08,152 | 1,28,331 | 33,630 | 20,000 | ~3,90,113 + cockpit/seat |
| SIM-02 | ~70,000 est | 1,16,314 | ~35,000 est | 10,000 | ~2,31,314 + cockpit/seat |
| SIM-03 | 1,52,987 (no GPU) | 96,156 | 62,250 | 20,000 | ~3,31,393 + cockpit/seat |
| SIM-04 | 2,65,087 | 1,10,523 | 62,250 | 20,000 | ~4,57,860 + cockpit/seat |
| SIM-05 | 2,65,087 | 1,23,252 | 62,250 | 20,000 | ~4,70,589 + cockpit/seat |
| SIM-06 | 2,65,087 | 1,70,560 | 62,250 | 20,000 | ~5,17,897 + cockpit/seat |
| SIM-07 | 2,75,772 | 1,68,487 | ~84,000 est | 20,000 | ~5,48,259 + cockpit/seat |
| SIM-08 | owned | 4,19,381 + SC2+pedals | 3,75,000 | 20,000 | ~8,14,381+ |

## Capital breakdown (items to procure)

| Category | Amount (₹) |
|----------|------------|
| GT PRO Rigs × 5 | 1,75,000 |
| GT Rigs × 2 (fabricate — 1 of 3 owned) | 44,000 |
| Seats × 3 (XP×2 + Phantom — all in stock) | 0 |
| PC builds × 6 (SIM-01, 03–07) | 14,32,172 |
| Conspit wheelbases × 4 | 1,57,633 |
| Conspit 300GT wheel × 1 | 32,775 |
| Monitors (32"×9 + 27"×3 + 45"×3) | 5,95,380 |
| Monitor stands (6× triple + 1× single — 1 triple owned) | 1,30,000 |
| VNM 3-DOF motion platform | 3,71,677 |
| **Total** | **29,38,637** |

Already invoiced (committed): Samsung 32" G5 ×9 = ₹1,86,750 (Visuvam VC/26-27/1079).
Still to pay: ~₹27,51,887.

## Open questions

- SIM-07 RTX 5080 FE status: treated as owned; confirm if SIM-07 unit has been ordered separately.

## Resolved

- **GT rigs SIM-01/02/08**: 1 GT rig already owned; 2 more to fabricate at ₹22,000 each = ₹44,000.
- **Seats**: All 8 seats in stock — XP×2 (SIM-01/02), Phantom×2 (SIM-06/08), Apex×2 (SIM-05/07), Raptor×2 (SIM-03/04). Zero seat procurement cost.
- **Triple monitor stand**: 1 already owned; 6 to buy (not 7), saving ₹20,000 vs earlier estimate.

## Backlinks

[[racesims-chennai-rig-config]] · [[racesims-chennai-premium-baseline]] · [[conspit]] · [[vnm]]
