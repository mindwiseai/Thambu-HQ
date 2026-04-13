---
title: RaceSims Import Operations
type: concept
domain: racesims
status: ACTIVE
tags: [operations, import, customs, supply-chain]
---

# RaceSims Import Operations

How [[domains/racesims/_index|RaceSims]] imports sim-racing hardware from international suppliers ([[conspit]], [[vnm]], [[asetek]], Two Seats, [[qubic-systems]]) into India. This is a core operational capability — managing landed costs determines margins on every product sold.

## Customs classification

- **HS Code:** 9023.00.90 — "instruments, apparatus and models designed for demonstrational purposes"
- **Classification rationale:** motorsport training equipment (not gaming equipment). End-use justification letter filed with customs.

## Duty structure

| Component | Rate | Notes |
|-----------|------|-------|
| Basic Customs Duty (BCD) | 10% | On CIF value |
| Social Welfare Surcharge (SWC) | 10% of BCD | i.e., 1% of CIF |
| IGST | 18% | On (CIF + BCD + SWC) |
| **Effective total** | **~31%** | Approximate all-in duty on FOB |

## Supplier chain

| Supplier | Origin | Products | Shipments documented |
|----------|--------|----------|---------------------|
| [[conspit]] | China/Vietnam | Wheelbases, wheels, pedals, handbrakes, dashboards | 7+ (May 2025 — Mar 2026) |
| [[vnm]] | Vietnam | Wheelbases, pedals, shifters, handbrakes, cockpits, motion | Active orders |
| Two Seats | (unknown) | Cockpit frames, seats | 2 shipments (Aug-Oct 2025) |
| [[asetek]] | Denmark | Invicta, Forte, La Prima lines | Pricelist relationship (Sep 2024) |
| Qubic Systems | (unknown) | Motion platforms | NDA stage only |
| Sim-Lab | Netherlands | Handbrakes, pedals, pivot adapters, wheels, shifters | Wholesale orders (20+ units) |

## Landed cost examples (from May 2025 import)

| Product | Landed cost per unit (INR) |
|---------|--------------------------|
| [[conspit]] GNX200 wheel | ~44,000-48,000 |
| [[conspit]] Ares Platinum 18Nm | ~43,000 |
| [[conspit]] CPP-EVO 3 | ~96,000 |
| [[conspit]] CDP Quick Release | ~66,000 |

## Margin structure

- **Distributor margin:** 25% on landed cost
- **Dealer margin:** 10-20% depending on channel
- **GST:** 18% on all sim racing equipment
- **MRP calculator:** on file at `racesims/03_Sales/Pricelists/untitled folder/MRP calculator Racesims.xlsx`

## Banking for imports

All international payments via [[racesims-company|ICICI Bank, KK Nagar]] (A/C 007705022712). SWIFT copies and Smart CRL remittance forms on file for each shipment.

## Connections

- [[racesims-company]] — the importing entity
- [[conspit]] — primary import partner
- [[vnm]] — secondary import partner
- [[asetek]] — tertiary supplier
- [[kit-pricing]] — prices derived from landed costs + margins
- [[2026-04-13-racesims-raw-dump]] — source
