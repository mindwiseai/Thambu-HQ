---
title: RaceSims Customer Pipeline
type: concept
domain: racesims
status: ACTIVE
updated: 2026-06-16
tags: [sales, customers, pipeline, dispatch]
---

# RaceSims Customer Pipeline

Known customers, active dispatch queue, and pending B2B quotes. Updated 16/06/2026 from full dispatch planning session — see [[2026-06-16-dispatch-pipeline-session]].

## Active dispatch queue (June 2026)

All items below are invoiced and waiting dispatch. PO-00054 (ENSU Shanghai, $26,294.90, 151 items) arrived 16/06/2026 and supplements current stock.

| Priority | Customer | Invoice | Payment | Amount | Location |
|----------|----------|---------|---------|--------|----------|
| **P1** | Asif | INV-26/0029 | ✅ PAID | ₹3,32,935 | Kozhikode KL |
| **P2** | Dhruv P Chavan | INV-26/0028 | ⚠ COLLECT at dispatch | ₹3,03,429 | Tamil Nadu |
| **P3** | Amruth | INV-26/0025 | ✅ PAID | ₹2,19,923 | Markapur AP |
| **P4** | Adhyan | INV-26/0026 | ✅ PAID | ₹38,230 | Bengaluru |
| **P5** | Ragav | INV-000133 | 🔴 OVERDUE since 28/05 | ₹3,76,956 | Coimbatore |

### Dispatch blockers by customer

- **Asif:** should clear after PO-00054 received. 1× GT rig PRO (fabricate), 1× Triple Monitor stand basic (fabricate).
- **Dhruv:** collect ₹3,03,429 before dispatch. 1× GT rig PRO, 1× Standalone Monitor stand.
- **Amruth:** 1× Recliner seat (std) = zero stock, not in PO — needs separate order. All other items available.
- **Adhyan:** CPP Apex 2-pedal + Clutch — both in PO. Easiest dispatch.
- **Ragav:** **MAX01 Steering Wheel = zero stock, not in PO** — completely blocked until sourced.

## Pending B2B quotes (quote pipeline)

| Customer | Quote | Value | Rigs | Stage | Key blocker |
|----------|-------|-------|------|-------|-------------|
| [[davlish-singh|Davlish Singh]] (Delhi) | QT-000370 | ₹5,49,900 | 3 | Quoted | CPP Apex 3-pedal (not in PO) |
| Star Enterprises (TN) | QT-000331 | ₹24,49,559 | 2 | Quoted | 6× Samsung G5 32" (short 3), 2× PC Spec #1.5, 2× VNM 3DOF (stock OK) |
| RaceSims Studio (Thambusamy) | QT-000360 | ₹27,99,459 | 7 | Quoted (internal) | 7× basic Triple Monitor stands (−9 stock), 6× Ares 12nm |
| Garvish (Kerala) | QT-000368 + 369 | ₹30,71,824 | 7 | **POSTPONED ~2 months (Jun 2026)** | Deferred by customer — re-engage ~Aug 2026 |
| INVRSE | QT-000320 | TBD | 6 | Quoted | Accessories not yet itemised |
| PS8 | QT-000317 | TBD | 4 | Quoted | 12× Samsung G5 32" monitors (critical) |
| Manoj | TBD | TBD | 1 | Active | 1× Ares Platinum 20nm |

**Active B2B GT rig demand (Garvish deferred): 3+2+7+6+4+1 = 23 rigs.** Current stock = −2. All need fabrication. (Garvish's 7 rigs = ~Aug 2026.)

## Critical procurement actions (updated 2026-06-18 — Garvish deferred)

| Item | Shortfall | Action |
|------|-----------|--------|
| GT rig PRO | −25 | Fabrication queue — dominant constraint |
| Triple Monitor stand basic | −8 | Fabrication queue (Studio 7× + Asif invoiced) |
| PC tray / Keyboard tray | −8 each | Fabrication queue (was −15 with Garvish) |
| Samsung G5 32" curved | −15 (Star 6 + PS8 12) | Separate procurement |
| Ares 12nm Wheelbase | −2 | Next ENSU order (was −11 with Garvish) |
| Triple Monitor stand precision | −1 | Next ENSU/fabrication (was −8 with Garvish) |
| Standalone Monitor stand | −3 | Fabrication |
| CPP Lite 2-pedal | −1 | Next order (was −3 with Garvish) |
| MAX01 Wheel | −1 | Source urgently — Ragav blocker |
| CPP Apex 3-pedal | −1 | Separate order — Davlish blocker |
| PC Spec #1.5 | −2 | Build 2 PCs for Star |
| Conspit HB + Shifter | −1 each | Source for Ragav (not in PO) |
| Recliner seat (std) | −1 | Source for Amruth |
| **VNM 3DOF Motion** | **0** | **✅ CLEARED** — Star 2 + Studio 1 = stock 3 exact. No reorder needed. |

## Confirmed historical customers (pre-June 2026)

| Customer | Date | Items | Amount |
|----------|------|-------|--------|
| Mr. Sreekar (Bengaluru) | Jun 2025 | Conspit 300GT Wheelrim ×1 | ₹44,200 |
| [[davlish-singh|Davlish Singh]] | May 2025 | 2 invoices | On file |
| Nikhil | Jan 2025 | Full rig | On file |
| Jacob | — | — | On file |
| Wilson | — | — | On file |

## B2B prospects (non-rig)

| Client | Type | Status | Value |
|--------|------|--------|-------|
| [[araya-airport]] | Airport simulators | Proposal + quotes issued | ₹6.86-6.96L per unit |
| [[ajit-kumar-racing]] | Pro driver training sim | Proposal stage | TBD (Asetek Invicta) |
| CSK ([[chennai-super-kings]]) | Content partnership | Draft pitch unsent | Zero-cost (content deal) |

## Dealer network

- [[ragav-coimbatore-dealer|Raghav]] — Coimbatore (also direct dispatch customer INV-000133)
- [[sim-racing-hq]] ([[trayas]]) — Bangalore
- [[racing-rigs]] ([[lakshay]]) — Bangalore

## Notable findings

- [[virtual-racing-hub|VRH]] sold [[moza]] equipment to RaceSims on 21/01/2025 (Invoice #3224, ₹1,29,196) — competitor was once a supplier.

## Connections

- [[2026-06-16-dispatch-pipeline-session]] — full June 2026 dispatch planning session
- [[2026-06-16-qt-000370-davlish-updated]] — Davlish's current quote
- [[import-operations]] — [[conspit]] and [[vnm]] supply chain
- [[gt-pro-rig]] — primary fabricated product
- [[kit-pricing]] — pricing tiers
