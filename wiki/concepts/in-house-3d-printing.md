---
title: In-House 3D Printing (RaceSims)
type: concept
domain: racesims
updated: 2026-04-23
---

# In-House 3D Printing (RaceSims)

Capital-light manufacturing capability added to [[racesims-company|RaceSims]] Chennai operations in April 2026. Purpose: produce a branded sim-racing accessories catalogue, service B2B custom simulator jobs (e.g. [[online-instruments]]), and compress R&D iteration time on new rig components. Extends the existing [[local-manufacturing-positioning]] from rigs/enclosures to the accessory long-tail that no importer will customize.

Decision source: [[2026-04-23-3d-printing-capex-decision]].

## Machine

**Printer:** [[bambu-lab-x1-carbon]] Combo (X1C + AMS + hardened nozzles + filament dryer).
**Build volume:** 256 × 256 × 256 mm.
**Capex total:** ₹1,55,000 (printer ₹1,30,000 + ancillaries ₹25,000).
**Rationale:** enclosed heated chamber is the only way to reliably print ASA / ABS / PA-CF in Indian summer conditions; CoreXY + LIDAR gives production-viable speed; AMS enables branded multi-colour parts without post-processing; serviced in India by Dimensionex, 3Ding, Wol3D.

Rejected alternatives: Prusa MK4 (no enclosed chamber), Creality K1 family (enclosed but shorter service reach in South India), resin/SLA (wrong tech — parts too brittle for mechanical sim-rig mounts).

Planned second machine in Year 2: Bambu X1E or Creality K1 Max for large parts (wind-sim ducts, full monitor bezels) once single-printer throughput becomes a bottleneck.

## Materials working set

| Material | Primary use | Role |
|---|---|---|
| **PETG** | General accessories (phone holders, cup holders, LED channels) | Workhorse. ~80% of print time. |
| **ASA** | Customer-visible branded parts, showroom-grade | Pick over ABS for UV stability in India. |
| **ABS** | Internal structural parts hidden from sun | Cheaper; yellows in sunlight. |
| **TPU 95A** | Pedal grips, damping pads, rubber covers | Flexible. |
| **PA-CF** | Load-bearing brackets, wheel hub adapters | Engineering-grade. Near-aluminium strength. Kept in reserve due to cost. |
| **PLA** | Prototyping only | Never shipped to customers — deforms at 55°C (Indian summer car cabin temp). |

## Quality protocol (before any SKU is listed)

1. **Vibration test** — 100 hours on a rig with force feedback at 80%.
2. **Heat soak** — 48 hours at 45°C.
3. **Fit test** — against the real third-party part, not a CAD approximation.
4. **Drop test** (for phone/tablet holders) — 250 g dummy phone from seat height.

## Use cases

1. **Branded accessories catalogue** — see [[racesims-accessory-catalogue]] for the 10-SKU Sprint 1–3 plan.
2. **B2B custom simulator installs** — branded mounts, sensor housings, kiosk-mode covers for clients like [[online-instruments]] and [[araya-airport]].
3. **R&D iteration** — new cockpit bracket prototyped in hours vs 2 weeks via an external vendor.
4. **Cross-brand service revenue** — replacement parts for Moza/Fanatec/Simagic rigs that no other Indian shop offers.
5. **Bundle conversion** — free RaceSims-branded phone holder + logo badge with every kit sale. Soft ROI.

## Race-engineer voice applied to 3D-printed hardware

Per [[race-engineer-positioning]]: every SKU listing answers *"Why would a race engineer bother making this?"* Product pages include:
- Measured dimensions with tolerances (not "approx").
- Functional framing (phone holder for telemetry apps during a session, not Spotify).
- Documented durability testing (vibration hours, heat soak result).
- Subtle branding (RaceSims red accent, matte black ASA body — not loud).
- Installed in < 60 seconds with a QR-linked install video.

This is what separates RaceSims accessories from a generic seller printing the same STL file pulled off Thingiverse.

## Economics (steady state)

- **Monthly net profit:** ~₹53,334 on 70 units/mo mixed portfolio.
- **Capex payback:** 3 months steady state, 6 months with realistic ramp.
- **Year 1 ROI on ₹1,55,000:** ~320%.

Full ROI model in [[2026-04-23-3d-printing-capex-decision]].

## Operational open questions

- Printer operator — existing staff 2 hrs/day, or new junior tech?
- CAD ownership — [[thambu]] personally, or outsource part-time?
- Photography/Reels pipeline for listings.
- Integration with [[racesims-bot]] knowledge base for accessory questions.
