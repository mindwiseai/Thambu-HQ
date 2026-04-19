# ARKA Engineering — Excel Calculator Inventory

**Date ingested:** 2026-04-19
**Source:** email from `thambusamytd@gmail.com` to `mindwise.ai1@gmail.com` on 2026-04-19, subject "arka excel calulators"
**Location:** [raw/racesims/arka-engineering/excel-calculators/](excel-calculators/)
**Files:** 17 Excel/xls + 1 reference PDF

## Summary

17 files collapse into **7 functional groups**. Three groups (gear ratio, WTW suspension, ECU wiring) account for the bulk of recurring manual work. Two files (`ARKA Engineering TOOL LIST`, `alcon vw caliper` PDF) are not calculators — they're manufacturing references.

| # | File | Group | Purpose | Formulas? | Sheets | Reuse frequency |
|---|---|---|---|---|---|---|
| 1 | ARKA Engineering TOOL LIST.xlsx | Manufacturing BoM | Brake caliper CNC tool schedule (component → machine → op → Sandvik tool spec). 306 rows. | No | 3 | One-off (caliper build) |
| 2 | alcon vw caliper from msport.pdf | Reference | Alcon caliper spec from M-Sport — pairs with the TOOL LIST above | — | — | Reference only |
| 3 | Cyl lobe cc calc.xlsx | Engine math | Cylinder volume from bore + stroke × count. 5 cells total. | `πr²·s·n` | 1 | Rare |
| 4 | deg to time.xlsx | Engine math | Crank degrees from a timed event (ms) at a given frequency. | `t·f·360` | 1 | Per calibration |
| 5 | convert analog to adc.xlsx | Sensor math | NTC resistance → ADC counts (1024 bit) for VW water temp sensor with 3160Ω and 1kΩ pull-ups | Linear scale + divider | 1 | Per sensor fitment |
| 6 | v to resistance temp sensor.xlsx | Sensor math | Bosch 0281006051 & PST 0261230340 — resistance → voltage via divider (Vref=5V, R=1kΩ/1077Ω) | Voltage divider | 1 | Per sensor fitment |
| 7 | GEAR RATIO CALC XUV 300.xls | Gear ratio | PPG Gear Ratio Program — inputs diff + 6 gears + wheel dia + RPM band → min/max speed per gear + RPM drop per shift. XUV300 stock/diesel/close-ratio variants. | Yes | 3 | Per car × per config |
| 8 | gear ratio cal fo VW race car.xlsx | Gear ratio | Same PPG template — VW Vento, Polo, ITC Swift, Sadev 5-spd, Karna rally '22, VW race car, close-ratio 5-spd, mix-and-match. | Yes | **10** | Per car × per config |
| 9 | gear ratio cal fo VW.xlsx | Gear ratio | Same PPG template — 3MO race '24, Vento RR, Sadev variants, 3MO, MTM 1.6, 1.0 TSI 6-spd, close-ratio, ITC Swift, mix-and-match | Yes | **14** | Per car × per config |
| 10 | gear ratio cal for all cars.xlsx | Gear ratio | Same PPG template — Honda L15 6-spd, 3MO Vento, Sadev, 1.0 TSI, mix-and-match | Yes | 7 | Per car × per config |
| 11 | ITC WTW2018.xls | Suspension WTW | Smithees Racetech Weight Transfer Worksheet, imperial (lb/in), original template | Yes | 4 | Per event |
| 12 | ITC WTW2022.xlsx | Suspension WTW | Same template — metric (kg/mm) version | Yes | 4 | Per event |
| 13 | WTW suspension polo race car.xlsx | Suspension WTW | Heavily extended Smithees WTW — adds setup-1-to-5 tracker, ARB rate calc, wheel-rate calc, unit converters. Polo rally + Polo race + Honda tabs | Yes | 3 | Per event |
| 14 | WTW suspension polo race car 2025.xlsx | Suspension WTW | As above, 2025 revision | Yes | 3 | Per event |
| 15 | WTW suspension polo race and rally car .xlsx | Suspension WTW | Same as above, slightly different snapshot | Yes | 3 | Per event |
| 16 | Suspension setup sheet.xlsx | Setup log | Data-capture form for session setups (springs, dampers, ARB, camber, caster, toe, ride height, droop, corner weights). No formulas — pure template. | No | 2 | Per session |
| 17 | OBR wiring.xlsx | ECU wiring | **Polo 1.0 TSI → OBR ECU pin map.** 132 populated rows covering crank, cams, MAP/IAT, boost, fuel pressure, oil pressure, pedal, throttle body, knock, coolant, EGT, injectors 1–4, ignition coils, lambda, fans, injector pressure, VVT solenoids, DBW, comms. Columns: sensor pin, OEM pin, OBR ECU channel (UDIG/AVI/HBO/ATI/KNOCK/DI/IGN/LA/HBO), colour, ECU connector pin, connector (J1/J2/J3), wire gauge, function label. | No | 1 | Per car build |

## Observations

### Patterns that cost time

1. **Per-car sheet duplication for gear ratio** — ~33 sheets across 4 files, all the same template with teeth-count inputs and wheel-diameter changes. No single source of truth. "Which file has the latest Vento 3MO?" = unanswerable without opening three.
2. **WTW template drift** — Smithees imperial, Smithees metric, and a bespoke Polo extension all diverge. Setup-tracker columns exist only on the Polo file. Rally version is bolted onto the race version; the drift between the two is invisible.
3. **Setup sheet is disconnected** — a paper-form template that doesn't feed the WTW calculator. Setup → weight transfer is a manual re-entry.
4. **Sensor conversion sheets are trivial math hiding reusable lookup tables** — the VW water temp sensor, Bosch 0281006051, PST 0261230340 resistance curves are car-agnostic reference data, currently siloed in one-off xlsx files.
5. **OBR wiring has missing/inconsistent cells** — "VREF 2" vs "VERF 2" typos, empty OEM-pin/colour cells in the Boost Pressure block, no wire length, no connector type, no splice plan. A single typo = blown ECU.
6. **No version control** — three WTW suspension files are near-copies (`.xlsx`, `...2025.xlsx`, `... polo race and rally car .xlsx`). No dates in filenames, trailing space in one filename, "which is latest" is guesswork.

### Patterns that are already healthy

- Input cells are colour-coded (purple) in the gear ratio sheets — good input discipline
- Smithees WTW template is industry-standard and solid — no need to reinvent the physics
- Setup sheet taxonomy (Front/Rear × Springs/Damper/ARB/Camber/Caster/Toe/Ride Height/Droop/Corner Weight) is complete and well-structured
- OBR wiring groups by sensor/actuator block with consistent pin numbering — the structure is there, just needs data hygiene

## POC candidate — ranked

| Rank | Candidate | Hours/event saved | Risk-reduction value | Ease to rebuild | Reusable across cars |
|---|---|---|---|---|---|
| **1** | **OBR wiring → single-source wiring DB + auto-generated outputs** | 2–4h per new build | **Very high** (typo = fried ECU / fire) | Medium | Yes — template per ECU family |
| 2 | Gear ratio — consolidated multi-car calculator | 30–60 min per gearbox decision | Low | Easy | Yes — already per-car |
| 3 | WTW suspension + Setup-sheet unified workbook | 1–2h per event | Medium (setup errors = DNF) | Medium | Yes |
| 4 | Sensor conversion library (analog→ADC + V→R curves) as i2 math channel bundle | 15–30 min per sensor fitment | Low | Easy | Yes — universal |
| 5 | Cyl-lobe / deg-to-time as inline calculators | <5 min | Low | Trivial | Yes |

## Recommendation

### POC #1: OBR wiring rebuild — single source of truth

**Why this first:**
- Biggest *risk* exposure — a wiring typo during a build can destroy an ECU and lose a race weekend. Calculation errors in the gear or suspension sheets produce a slow car, not a dead car.
- The OBR sheet is already data, not math — it belongs in a structured format (CSV / SQLite / a small web form), not a spreadsheet
- Reusable across every car ARKA builds — the OBR ECU channel map is constant, only the vehicle-specific pin mapping changes
- Clear deliverable Leelakrishnan and the workshop techs can see working in one pass

**Rebuild plan (proposed):**
- **Canonical data:** single CSV/JSON file `obr-wiring-<car>.csv` with columns → sensor, pin#, sensor-side pin label, signal type (5V/sig/GND/PWR), OEM connector + pin, wire colour, wire gauge, length, ECU connector (J1/J2/J3), ECU pin, ECU channel (UDIG/AVI/HBO/…), ECU function label, notes
- **Master reference:** `obr-ecu-channels.csv` — every OBR ECU pin/channel, its capability (digital-in, analog-in, lambda, injector-HBO, ignition etc.), max voltage, intended use
- **Auto-generated outputs** (one click / one command):
  - Loom build sheet — grouped by ECU connector → cut list for the wire builder
  - OEM harness mapping — grouped by OEM connector → quick-ref during connection
  - Pinout PDF — one page per ECU connector, printable for the car file
  - Continuity / power-up test checklist — every 5V line, GND, signal, actuator, in a checkable order
  - Wire-tag print list — each wire gets a unique tag
  - Sanity validator — catches "two signals on one channel", "5V shorted to GND", "wire gauge too light for actuator current", "ECU pin used twice"
- **Round-trip:** Excel import/export so anyone who prefers Excel still can

**What I need from you to build it:**
- Confirmation this is the POC you want (vs. gear ratio or WTW)
- The OBR ECU datasheet / pinout PDF (so the master channel reference is authoritative)
- Whether to do it as: (a) pure Python CLI + CSV + generated PDFs (fastest), (b) a small local web app (nicer UX, runs in the browser), or (c) a cleaned-up Excel with validation (most familiar to the team)

### POC #2 candidate (alternative)

If you'd rather start with something visual: **gear ratio consolidation**.

- One HTML page, car-profile dropdown, teeth inputs for diff + 6 gears, wheel diameter, min/max RPM, KPH/MPH toggle
- Outputs min/max speed per gear, RPM drop per shift, speed-vs-RPM chart, overlays multiple configs for side-by-side comparison
- Import your ~33 existing configs as starting profiles
- Persist in a single JSON file in the project — goodbye to "which file is the latest"

Lower risk, faster to demo, more visually convincing to the team. But lower *strategic* value than fixing the wiring mess.

## Ask

Which POC do you want built first — **OBR wiring** or **gear ratio consolidation**? And for whichever it is: delivery preference = Excel / Python CLI / local web app?
