---
title: Dispatch Pipeline Planning Session — 16 June 2026
type: source
source_type: strategy
domain: racesims
raw_path: (session — no single raw file; synthesised from QT-000368/369, INV-26/0025/26/28/29, INV-000133, PO-00054, Items.xls, QT-000370)
ingested: 2026-06-16
---

# Dispatch Pipeline Planning Session — 16 Jun 2026

## Summary

Full cross-reference of all open dispatch orders, pending B2B quotes, current stock (Items.xls snapshot), and incoming shipment PO-00054 (arriving tonight). Session produced a prioritised dispatch queue, a complete stock-vs-demand matrix across 12 customers and 38 SKUs, and a shortfall action list. Davlish's quote was revised (QT-000370 supersedes QT-000348).

## Key facts — Dispatch queue (priority order)

| Priority | Customer | Invoice | Status | Amount | Location |
|----------|----------|---------|--------|--------|----------|
| P1 | [[asif-kozhikode|Asif]] | INV-26/0029 | PAID | ₹3,32,935 | Kozhikode KL |
| P2 | Dhruv P Chavan | INV-26/0028 | UNPAID (collect) | ₹3,03,429 | Tamil Nadu |
| P3 | Amruth | INV-26/0025 | PAID | ₹2,19,923 | Markapur AP |
| P4 | Adhyan | INV-26/0026 | PAID | ₹38,230 | Bengaluru |
| P5 | [[ragav-coimbatore-dealer|Ragav]] | INV-000133 | OVERDUE since 28 May | ₹3,76,956 | Coimbatore |

**Note:** Dhruv (P2) to collect payment before or at dispatch. All others are paid.

### Asif (P1) — INV-26/0029
- 1× Ares Platinum 20nm · 1× 310 Apex · 1× CDR NRG QR · 1× CPP Apex 2-pedal · 1× CPP Apex Clutch
- 1× VNM Handbrake · 1× VNM Shifter · 1× GT rig PRO · 1× Triple Monitor stand (basic)
- 1× Fixed Back seat

### Dhruv (P2) — INV-26/0028
- 1× Ares Platinum 20nm · 1× CDR NRG QR · 1× 300 GT wheel · 1× CPP EVO 3-pedal
- 1× GT rig PRO · 1× Standalone Single Monitor stand · 1× Fixed Back seat

### Amruth (P3) — INV-26/0025
- 1× Ares 8nm · 1× 290 GP · 1× CDR NRG QR · 1× CPP Lite 2-pedal · 1× GT rig PRO
- 1× Recliner seat (std)

### Adhyan (P4) — INV-26/0026
- 1× CPP Apex 2-pedal · 1× CPP Apex Clutch

### Ragav (P5) — INV-000133 (29/03/2026, overdue since 28/05)
- 2× Ares 12nm · 1× CPP Lite 2-pedal · 1× CPP Lite 3-pedal · 1× MAX01 Steering Wheel
- 1× H.OA Hub · 1× C rim · 1× VNM Shifter · 1× VNM Handbrake · 2× CDR NRG QR
- **MAX01 Wheel: zero stock, not in PO — BLOCKS Ragav entirely until sourced**

## Key facts — Pending B2B quotes

| Customer | Quote | Value | Rigs | Notes |
|----------|-------|-------|------|-------|
| [[davlish-singh|Davlish Singh]] (Delhi) | QT-000370 | ₹5,49,900 | 3 | Supersedes QT-000348 |
| Star Enterprises (TN) | QT-000331 | ₹24,49,559 | 2 | Includes 2× VNM 3DOF, 6× Samsung G5 32", 2× PC Spec #1.5 |
| RaceSims Studio (Thambusamy) | QT-000360 | ₹27,99,459 | 7 | Internal — includes 1× VNM 3DOF |
| Garvish (Kerala) | QT-000368 + QT-000369 | ₹30,71,824 | 7 | Includes 2× VNM 3DOF — blocked, reorder needed |
| INVRSE | QT-000320 | TBD | 6 | Full accessory line items not yet retrieved |
| PS8 | QT-000317 | TBD | 4 | 12× Samsung G5 32" monitors needed — critical |
| Manoj | TBD | TBD | 1 | 1× Ares Platinum 20nm |

## Key facts — Incoming PO-00054 (ENSU Shanghai, arriving 16/06/2026)

$26,294.90 · 151 items:
- 10× Ares 12nm · 8× Ares Platinum 20nm · 4× Ares 8nm
- 8× 290 GP · 15× 300 GT · 10× 310 Apex
- 5× H.OA Hub · 6× C rim · 4× D rim · 2× Round rim
- 38× CDR NRG QR · 8× CPP Apex 2-pedal · 2× CPP Apex Clutch
- 1× CPP EVO 3-pedal · 5× CPP EVO 2-pedal · 3× CPP Lite 2-pedal
- 4× Apex desk clamp · 1× PW1 Formula wheel · 4× USB Universal adapter · 5× gloves · 2× FP Lite Keyboard stand

## Key facts — Critical shortfalls (after PO-00054 received)

| Item | Stock after PO | Known demand | Balance | Note |
|------|---------------|--------------|---------|------|
| Ares 12nm | 8 | 19 (Ragav 2 + Davlish 2 + Star 2 + Studio 6 + Garvish 7) | **−11** | Urgent reorder from ENSU |
| PC tray | 4 | 19 | **−15** | Must fabricate |
| Keyboard tray | 4 | 19 | **−15** | Must fabricate |
| Triple Monitor (basic ₹38,500) | −1 | 8 (Asif 1 + Studio 7) | **−9** | Must fabricate |
| Triple Monitor (precision) | 3 | 11 (Davlish 2 + Star 2 + Garvish 7) | **−8** | Must fabricate |
| Samsung G5 32" curved | 3 | 18 (Star 6 + PS8 12) | **−15** | Separate procurement |
| CPP Apex 2-pedal | 8 | 11 (Adhyan 1 + Asif 1 + Studio 2 + Garvish 7) | **−3** | — |
| VNM Shifter | 2 | 4 (Asif 1 + Ragav 1 + Studio 2) | **−2** | — |
| CPP Lite 2-pedal | 1 | 4 (Amruth + Ragav + Studio + Davlish) | **−3** | — |
| VNM 3DOF Motion | 3 | 5 (Star 2 + Studio 1 + Garvish 2) | **−2** | Star+Studio get stock; Garvish on reorder |
| MAX01 Wheel | 0 | 1 (Ragav) | **−1** | Not in PO, blocks Ragav |
| CPP Apex 3-pedal | 0 | 1 (Davlish) | **−1** | Not in PO, blocks Davlish partial |
| Recliner seat (std) | 0 | 1 (Amruth) | **−1** | Separate order needed |
| PC Spec #1.5 | 0 | 2 (Star) | **−2** | Must build/procure 2 PCs |

## Decisions

- Asif and Dhruv are top priority for dispatch.
- VNM 3DOF allocation: Star gets 2, Studio gets 1 (all 3 stock units). Garvish must wait — reorder from [[vnm]] (30–45 day lead time).
- Ares 12nm: urgent reorder from [[conspit]]/ENSU for ~12+ units on top of tonight's PO.

## Open questions

- INVRSE and PS8 full accessory line items not yet retrieved — matrix marked with "?" for those customers.
- Davlish payment terms not confirmed.
- MAX01 Wheel sourcing timeline unknown.
- Star's Racesims PC Spec #1.5 — need to confirm build spec and timeline.

## Backlinks

- [[customer-pipeline]]
- [[conspit]] · [[vnm]]
- [[import-operations]]
- [[davlish-singh]]
- [[ragav-coimbatore-dealer]]
