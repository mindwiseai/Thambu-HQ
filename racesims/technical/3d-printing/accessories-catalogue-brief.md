# RaceSims 3D-Printing Accessories — Catalogue Brief v1

**Author:** Thambu
**Date:** 2026-04-23
**Status:** Pre-investment brief. Capex not yet approved.

---

## Objective

Stand up an in-house 3D-printing capability at RaceSims (Chennai) to produce a branded accessories catalogue and service custom B2B jobs. This extends the existing local-manufacturing USP from rigs and enclosures to the accessory long-tail that no importer will customize.

## Capex

| Item | INR |
|---|---|
| Bambu Lab X1 Carbon Combo (printer + AMS) | 1,30,000 |
| Hardened-steel + 0.6mm nozzles (carbon-fibre ready) | 8,000 |
| Extra build plates (smooth PEI + textured) | 5,000 |
| Filament dryer (mandatory for PA-CF and ASA) | 7,000 |
| Tools, spares, storage bins | 5,000 |
| **Total capex** | **1,55,000** |

Expected payback: ~3 months at steady state, ~6 months with realistic ramp (see ROI model in appendix).

## Material working set

| Material | Primary use | ₹/kg | Notes |
|---|---|---|---|
| PETG | Phone/cup holders, LED channels, general accessories | 1,500–2,200 | Workhorse. ~80% of parts. |
| ASA | Customer-visible branded mounts, showroom parts | 2,500–3,500 | UV-stable. Pick over ABS for India. |
| ABS | Internal structural parts, hidden from sun | 1,800–2,500 | Cheaper, yellows in sunlight. |
| TPU 95A | Pedal grips, rubber covers, damping pads | 2,500–4,000 | Flexible. Grip and impact. |
| PA-CF | Load-bearing brackets, wheel hub adapters | 6,000–10,000 | Engineering-grade. Near-aluminium strength. |
| PLA | Prototypes only | 1,200–1,800 | Never ship in PLA — deforms at 55°C. |

## The 10 core accessories — priority order

Organized into three two-week sprints. Sprint 1 proves the workflow with simple high-volume SKUs. Sprint 2 builds margin. Sprint 3 opens premium/custom categories.

### Sprint 1 — Catalogue basics (weeks 1–2)

**Goal:** ship 4 SKUs, run the full pipeline (CAD → print → photograph → list → first sale) end-to-end.

| # | Product | Buyer | CAD hrs | Material | Print time | Unit COGS | Sell | Margin |
|---|---|---|---|---|---|---|---|---|
| 1 | **Universal phone/tablet holder** (clamps to 20×40 or 40×40 profile, pivots for driver or spectator view) | Every rig owner | 8 | PETG | 4 hr | ₹250 | ₹999 | ₹749 |
| 2 | **Universal cup holder** (clamps to profile, holds standard 500 ml bottle + can) | Every rig owner | 5 | PETG | 2 hr | ₹200 | ₹799 | ₹599 |
| 3 | **Profile end caps** (20×40 + 40×40 in RaceSims red) — ship-with-every-rig part | Kit buyers, bundled free | 3 | PETG | 15 min / pair | ₹15 | bundled | — |
| 4 | **RaceSims logo badge** (bolt-on brand plate, 4-colour AMS) | Every rig, bundled free + sold separately | 4 | ASA + AMS | 30 min | ₹80 | ₹299 (standalone) | ₹219 |

### Sprint 2 — Lighting & premium add-ons (weeks 3–4)

**Goal:** open the ambient-lighting product category (no Indian competitor serves this well) and introduce the first Conspit-specific branded SKU.

| # | Product | Buyer | CAD hrs | Material | Print time | Unit COGS | Sell | Margin |
|---|---|---|---|---|---|---|---|---|
| 5 | **LED strip channel + diffuser** (fits 8–12 mm strips, clips onto profile; 300 mm segment) | Ambient-lighting upgraders | 10 | PETG + white PETG | 5 hr / pair | ₹150 | ₹599 | ₹449 |
| 6 | **Philips Hue Play/Signe holder** (positions Hue bar under triple display for bias lighting) | Hue-ecosystem customers | 6 | PETG | 3 hr | ₹120 | ₹899 | ₹779 |
| 7 | **Conspit 310 Apex branded side plate set** (replaces stock with RaceSims-branded ASA) | Conspit wheel owners | 14 | ASA + AMS | 6 hr / pair | ₹400 | ₹1,499 | ₹1,099 |
| 8 | **Bass shaker enclosure + mount** (fits Dayton DAEX32 / TT25 transducers; bolts under seat) | Haptic upgraders | 12 | PETG | 4 hr | ₹250 | ₹1,199 | ₹949 |

### Sprint 3 — Premium & custom categories (weeks 5–6)

**Goal:** open two entirely new product categories (wind sim + custom shift knob) that no Indian competitor offers. These carry race-engineer-voice copy in listings.

| # | Product | Buyer | CAD hrs | Material | Print time | Unit COGS | Sell | Margin |
|---|---|---|---|---|---|---|---|---|
| 9 | **Wind simulator fan housing + duct adapter** (mounts 140mm PC fan + aims airflow at driver face/chest; optional dual-fan) | Advanced sim builders | 18 | PETG + ABS for motor zone | 8 hr | ₹400 | ₹1,499 (single) / ₹2,499 (dual) | ₹1,099 / ₹2,099 |
| 10 | **Custom shift knob** (3 shapes × 3 colours × TPU grip option) | Formula/GT enthusiasts | 14 + 4/variant | ASA + TPU grip | 2 hr | ₹350 | ₹2,499 | ₹2,149 |

## Design principles (the race-engineer voice in hardware)

Every product listing on racesims.in should answer: *"Why would a race engineer bother making this?"* If the answer is weak, either the product is wrong or the copy is wrong.

1. **Measured, not guessed.** Dimensions come from the actual parts (Conspit 310 Apex is measured, not approximated from photos). List tolerances in product specs.
2. **Functional before decorative.** Phone holder works for *telemetry apps* during a session, not just Spotify. Cup holder holds an isotonic sports bottle, not just a coffee mug.
3. **Durability tested.** Every SKU gets a 100-hour vibration test on a rig before it ships to a customer. Document it.
4. **Branded, not loud.** RaceSims red is one element, not the whole part. Most of the part is matte black ASA. Subtle.
5. **Installed in < 60 seconds.** If it takes longer, it's too complex. Ship with labelled hardware and a QR code that links to a 20-second install video.

## Quality + testing protocol

Before any SKU is listed:
- **Vibration test:** 100 hours mounted on a rig with force-feedback activated at 80% max.
- **Heat soak:** 48 hours at 45°C (Chennai summer worst case).
- **Fit test:** every SKU that attaches to a third-party part (Conspit wheel, Dayton shaker, profile) is tested on the real part, not just a CAD model.
- **Drop test:** phone holder with a 250g dummy phone dropped from seat height. Must not crack the holder, must protect the dummy.

## Launch plan (8 weeks total)

- **Weeks 1–2:** Sprint 1 designs (SKUs 1–4) + workflow shakedown. Ship beta units to 5 existing customers free for feedback.
- **Weeks 3–4:** Sprint 2 designs (SKUs 5–8) + Sprint 1 goes live on racesims.in. First paid orders.
- **Weeks 5–6:** Sprint 3 designs (SKUs 9–10) + Sprint 2 goes live. Start B2B custom pipeline with Online Instruments as pilot.
- **Weeks 7–8:** Full catalogue live. Begin second-phase catalogue (wheel-specific adapters, pedal extenders, cross-brand service parts).

## Content plan (racesims.in + Instagram)

Each SKU launch ships with:
- One product page on racesims.in with FAQ schema (race-engineer-voice copy, "why a race engineer built this" angle).
- One Instagram Reel (15–20 sec) of the part being used on a rig.
- One process Reel showing the print → install → use flow.
- One technical post (printer settings, material choice, tolerance math) — this is the race-engineer-content moat.

## Unquantified upside — why the math understates the case

1. **Kit-bundle conversion.** Free RaceSims-branded phone holder + logo badge with every kit costs ₹300 and raises perceived value on a ₹2–5L purchase. One extra kit sale per year fully pays for the printer.
2. **B2B custom margin.** Online Instruments-style branded installs pay 3–5× retail. One ₹25k custom job funds a quarter of consumables.
3. **R&D iteration.** New mount design prototyped in hours, not 2 weeks via a vendor.
4. **Cross-brand service.** "My Moza cup holder broke" → RaceSims prints one and sells it. No other Indian shop does this.
5. **Inventory compression.** Print on demand replaces stocking 20+ SKUs.

## Appendix — ROI calculation

### Steady-state monthly P&L

| | INR |
|---|---|
| Revenue (mixed SKU portfolio, 70 units/mo) | 86,434 |
| Material COGS | (19,600) |
| Electricity | (500) |
| Maintenance | (1,000) |
| Operator (existing staff, 2 hrs/day) | (12,000) |
| **Net monthly profit** | **53,334** |

### Year 1 (with realistic ramp)

| Months | Ramp | Net/mo |
|---|---|---|
| 1–3 | 40% | ₹21,300 |
| 4–6 | 70% | ₹37,300 |
| 7–12 | 100% | ₹53,300 |
| **Year 1 total net** | | **₹4,95,600** |

**Capex payback: 6 months with ramp, 3 months at steady state.**
**Year 1 ROI on ₹1,55,000: ~320%.**

### Sensitivity — if volumes land at 25% of projection
Net ~₹13,000/mo. Payback ~12 months. Still profitable.

---

*Related:* `racesims/technical/partners/Online Instruments/Online_Instruments_Transport_Spec.pdf` — first B2B custom job candidate.
