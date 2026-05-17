---
title: ARKA Engineering — Excel Calculator Inventory
type: source
source_type: document
domain: racesims
raw_path: raw/racesims/arka-engineering/calculator-inventory.md
ingested: 2026-04-19
---

# ARKA Engineering — Excel Calculator Inventory

**Date ingested:** 2026-04-19  
**Source:** [[raw/racesims/arka-engineering/calculator-inventory.md]]

## Summary

ARKA Motorsports maintains 17 Excel/XLS calculators and 1 reference PDF covering gear ratio optimization, suspension weight-transfer analysis, ECU wiring harness mapping, sensor conversions, and engine math. The inventory collapses into 7 functional groups with recurring manual work concentrated in three areas: gear ratio per-car duplication (~33 sheets), WTW suspension template drift, and OBR ECU wiring data quality. The document recommends three ranked POC candidates for automation: OBR wiring rebuild (highest risk/value), gear ratio consolidation (visual/accessible), and WTW + setup-sheet unification.

## Key facts

- **17 Excel files + 1 PDF reference** spanning manufacturing, engine math, sensor conversions, gear ratio, suspension, and ECU wiring
- **7 functional groups**: (1) Manufacturing BoM, (2) Engine math (cylinder lobe, crank degrees), (3) Sensor math (ADC/voltage conversion), (4) Gear ratio (4 files, ~33 sheets, PPG template), (5) Suspension WTW (5 files, Smithees template + Polo extensions), (6) Setup data capture, (7) OBR ECU wiring
- **Per-car gear ratio duplication**: Vento, Polo, Swift, Sadev, Honda L15 configs duplicated across 4 files with no single source of truth
- **WTW template drift**: Smithees imperial, Smithees metric, and bespoke Polo extension diverge. Setup tracker columns exist only on Polo file.
- **OBR wiring complexity**: 132 populated rows covering 14 sensor/actuator blocks (crank, cams, boost, fuel, oil, coolant, EGT, 4× injectors, ignition, lambda, fans, etc.) with missing/inconsistent data (typos "VREF 2" vs "VERF 2", empty pin/colour cells) creating ECU safety risk
- **Setup sheet disconnected**: Paper form template doesn't feed WTW calculator — manual re-entry required
- **Sensor conversion sheets**: VW water temp, Bosch 0281006051, PST 0261230340 resistance curves are car-agnostic but siloed in one-off files
- **No version control**: Three near-identical WTW files with no dates in filenames, trailing spaces, no way to identify latest

## Tools catalogued

| Group | Files | Purpose | Reuse frequency |
|-------|-------|---------|-----------------|
| Manufacturing BoM | 1 | Brake caliper CNC tool schedule, 306 rows | One-off |
| Engine math | 2 | Cylinder volume, crank degree timing | Rare |
| Sensor math | 2 | NTC/ADC/voltage conversion tables | Per sensor fitment |
| Gear ratio | 4 | PPG template: diff/gears/wheel-dia → min/max speed/RPM drop. XUV300, VW race, 10–14 sheets each | Per car × per config |
| Suspension WTW | 5 | Smithees Weight Transfer Worksheet (imperial/metric) + Polo race/rally extensions, setup-1-to-5 tracker | Per event |
| Setup log | 1 | Data-capture form for session setups (springs, dampers, ARB, camber, corner weights) | Per session |
| ECU wiring | 1 | **Polo 1.0 TSI → OBR ECU pin map**, 132 rows, sensor/actuator blocks | Per car build |

## Observations & patterns costing time

1. **Per-car sheet duplication for gear ratio** — ~33 sheets across 4 files, all same template with teeth-count inputs and wheel-diameter changes. "Which file has the latest Vento 3MO?" unanswerable without opening three.
2. **WTW template drift** — Smithees imperial, metric, and bespoke Polo extension diverge. Setup-tracker columns exist only on Polo file. Rally version bolted onto race version; drift invisible.
3. **Setup sheet disconnected** — paper-form template doesn't feed WTW calculator. Setup → weight transfer is manual re-entry.
4. **Sensor conversion sheets trivial math hiding reusable lookup tables** — VW water temp, Bosch 0281006051, PST 0261230340 resistance curves are car-agnostic reference data, currently siloed in one-off xlsx files.
5. **OBR wiring missing/inconsistent cells** — typos ("VREF 2" vs "VERF 2"), empty OEM-pin/colour cells in Boost block, no wire length, no connector type, no splice plan. Single typo = blown ECU.
6. **No version control** — three WTW suspension files are near-copies. No dates in filenames, trailing space in one. "Which is latest" is guesswork.

## POC candidates (ranked by risk/value)

| Rank | Candidate | Hours saved/event | Risk reduction | Ease | Reusable |
|------|-----------|-------------------|-----------------|------|----------|
| **1** | **OBR wiring → single-source DB + auto-generated outputs** | 2–4h | **Very high** (typo = fried ECU/fire) | Medium | Yes |
| 2 | Gear ratio — consolidated multi-car calculator | 30–60 min | Low | Easy | Yes |
| 3 | WTW + Setup-sheet unified workbook | 1–2h | Medium (setup errors = DNF) | Medium | Yes |
| 4 | Sensor conversion library as math-channel bundle | 15–30 min | Low | Easy | Yes |
| 5 | Cyl-lobe / deg-to-time inline calculators | <5 min | Low | Trivial | Yes |

## Open questions

- What is the outcome of the POC decision? Which automation path did [[thambu]] prioritize?
- Is the OBR ECU datasheet / pinout PDF available for building a canonical master channel reference?
- Have any of these calculators been rebuilt as a Python CLI, web app, or local tool since April 2026?
- Which ARKA engineers (besides [[mr-leela-krishnan]]) use these calculators most frequently for event preparation?
- What's the impact of gear ratio duplication on race-weekend prep time vs. sim-rig setup time?

## Backlinks

- [[arka-motorsports]] — main entity
- [[mr-leela-krishnan]] — ARKA lead, design mentor
- [[thambu]] — race engineer using these tools
- [[next-gen-racesims-rigs]] — design process that benefits from consolidated calculators
- [[can-bus-telemetry]] — telemetry R&D that could feed sensor conversion data
