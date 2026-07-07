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

Full per-rig landed cost table built for all 8 Chennai rigs, restructured 2026-06-27 into a bank-grade **asset register** (own vs buy) for a loan application. **Total studio hardware value ₹48,30,434 = Owned (promoter contribution) ₹18,98,624 + To-purchase (loan ask) ₹29,31,810.** Apex & Raptor seats ₹25,000 each (firm); SIM-07 RTX 5080 PAID (owned). PC + display portion now sourced to the actual [[2026-06-27-navkar-pc-display-quote|Navkar Computers quote]] (₹19,88,000) — which raised the PC line ₹2.63L vs the per-rig reconstruction because it provisions 9 component sets vs 6 builds (flagged for confirmation; trimming → loan ₹26,68,611). Rebuilding bottom-up from `racesims-chennai.json` corrected two errors in the earlier ₹29,38,637 figure: (1) 9× Visuvam monitors ₹1,86,750 are invoiced/paid → owned, not loan; (2) SIM-07 RTX 5080 ₹1,16,000 is incoming/owned, was double-counted in PC build; (3) Conspit 300GT needs 2× (SIM-01+06), earlier had 1× (+₹32,750). Deliverable: `~/Desktop/RaceSims-Chennai-Loan-Proposal.xlsx` (5 tabs). All seats in stock (owned, shown at landed value).

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

## Open questions (confirm before bank submission)

- ~~**Navkar quote 3 extra component sets (~₹2,63,199):** quote has 9× RAM/SSD/cooler + 8× PSU/case but only 6 new CPU+board builds. Confirm intended or trim → loan drops to ₹26,68,611.~~ ✅ **RESOLVED (2026-07-07):** spares kept as inventory; loan ask stays ₹29,31,810. See [[2026-06-27-navkar-pc-display-quote]].
- **Owned sim-hardware values (wheelbases/wheels/pedals):** EST landed/replacement values for the in-kind contribution total; confirm if bank wants documented valuation.

## Resolved (2026-06-27, round 2)

- **SIM-07 RTX 5080 (₹1,16,000):** PAID last week → confirmed owned, stays out of loan.
- **Apex & Raptor seats:** ₹25,000 each (firm) — was ₹20,000 placeholder. Owned-value +₹20,000.
- **45″ OLED & 27″ pricing:** confirmed from actual [[2026-06-27-navkar-pc-display-quote|Navkar quote]] — 45″ Corsair XENEON FLEX ₹1,24,999.76/unit, 27″ MSI MAG 275F ₹11,210/unit (both matched prior estimates exactly).

## Resolved

- **GT rigs SIM-01/02/08**: 1 GT rig already owned; 2 more to fabricate at ₹22,000 each = ₹44,000.
- **Seats**: All 8 seats in stock — XP×2 (SIM-01/02), Phantom×2 (SIM-06/08), Apex×2 (SIM-05/07), Raptor×2 (SIM-03/04). Zero seat procurement cost.
- **Triple monitor stand**: 1 already owned; 6 to buy (not 7), saving ₹20,000 vs earlier estimate.

## Backlinks

[[racesims-chennai-rig-config]] · [[racesims-chennai-premium-baseline]] · [[conspit]] · [[vnm]]
