---
title: Chennai — Deck cleanup, compass correction, builder scripts
type: source
source_type: strategy
domain: racesims
raw_path: racesims/marketing/decks/
ingested: 2026-06-01
---

# Chennai — Deck cleanup, compass correction & builder scripts

## Summary
Three distinct threads of work completed on 2026-05-31. (1) **Deck cleanup** — identified the 4 canonical deliverable PDFs, archived ~6 outdated/duplicate decks, salvaged three stale branches whose content was worth keeping (racesims-web Next.js site, improved Corsair deck, GMC audit). (2) **Compass correction** — [[thambu]] flagged that North and South were inverted on all Chennai assets; applied 180° flip (N↔S and E↔W) everywhere while keeping the physical layout unchanged (it was already Vastu-correct). (3) **Builder scripts** — rebuilt the lost report builder and created a standalone floorplan builder, both committed into the repo so they survive `/tmp` wipes.

## Key facts

### Active decks (4 canonical deliverables, `racesims/marketing/decks/`)
- **`racesims-chennai-project-report.pdf`** (11pp) — primary Chennai Centre proposal; landed-cost basis (₹14.2L fit-out); compass-corrected on pages 4 & 5.
- **`racesims-multi-centre-rollout.pdf`** (13pp) — multi-centre rollout.
- **`racesims-chennai-partner-corsair.pdf`** (7pp) — Corsair sponsor pitch (improved version salvaged from branch; real MD Computers PC specs/prices).
- **`motorsport-academy-curriculum.pdf`** (21pp) — academy curriculum.
- Everything else moved to `marketing/decks/archive/` (reversible).

### Builder scripts (new — `racesims/marketing/decks/builders/`)
- **`build-chennai-project-report.py`** — full 11-page branded report; renders via Chrome headless; fonts from Google Fonts CDN. Output: `racesims/marketing/decks/racesims-chennai-project-report.pdf` + root mirror. Run with `python3 build-chennai-project-report.py`.
- **`build-chennai-floorplan.py`** — standalone A3-landscape PNG at 3174×2246px (~300dpi); corrected compass baked in. Output: `racesims/racesims-chennai-floorplan.png` (gitignored). Run with `python3 build-chennai-floorplan.py`.

### Compass correction (180° flip — N↔S AND E↔W)
- **What [[thambu]] said:** "one main mistake I made in the floor plan direction — what I told you north is actually south."
- **Fix:** 180° compass flip. Physical layout geometry **unchanged** — it was already Vastu-correct; only the cardinal labels were wrong.
- **Corrected true directions:** entrance **WEST** · office/training **SW** corner · motion rig faces **SOUTH** · 7 static rigs on **east + north** walls · leaderboard **south** wall · windows **east/north**.
- Assets corrected: [[racesims-chennai-premium-baseline]] (floor-fit section) · [[racesims-chennai-execution-plan]] (layout v6) · `racesims-chennai-3d.html` (HUD, compass widget, floor arrow) · `racesims-chennai-floorplan.png` (new clean build, old file had warning banner only) · `racesims-chennai-project-report.pdf` pages 4–5 (re-generated via builder).

### Numbers standardised
All Chennai pages now point to `racesims-chennai-project-report.pdf` as the **single source of truth**. Pages reconciled: [[racesims-chennai-premium-baseline]] (canonical block added, old ₹50.79L/₹76.3L/2.8× marked superseded, 6-rig table tagged historical) · [[racesims-chennai-partnerships]] (₹70.2L → ₹68.46L) · [[racesims-chennai-execution-plan]] (equipment → landed ₹44.64L, UPS 6→8 kVA, networking re-spec) · [[racesims-chennai-flagship]] (banner: flagship is the with-upside model, project report is canonical capital).

### Worktree/branch cleanup
Went from 16 worktrees → 9. Removed 7 dead ones (clean + fully merged into `main`). Salvaged 3 branches before retiring:
- **`admiring-spence`** (20 commits) → **`racesims/racesims-web/`** Next.js site (104 files): homepage, sim configurator, Chennai booking, League, Products, Driver Account with Supabase magic-link auth + Academy enrolment. Squash-landed; history preserved at tag `archive/racesims-web-history`.
- **`brave-stonebraker`** (4 commits) → improved Corsair deck + `partnerships/quotes/md-computers-pc-build-2026-05-30.pdf`. Excluded old report regression and wiki deletions.
- **`wizardly-jemison`** (2 commits) → `racesims/strategy/gmc-product-feed-audit-2026-05-07.md` + `gmc-rejection-history.md` + wiki source. Did NOT merge (−23k line wiki wipe); extracted content only.

## Decisions
- The 4 canonical deck list above is the working set; everything else is archived.
- Builder scripts live in-repo from now on — no more lost builders.
- The [[racesims-chennai-flagship]] page is intentionally kept as the upside model (café + academy + track-day) — do not overwrite its headline numbers; they represent a different scenario, not an error.
- [[racesims-chennai-premium-baseline]] holds the conservative floor model; project report is canonical capital for reporting.

## Open questions
- `admiring-spence` / `brave-stonebraker` / `wizardly-jemison` worktrees still exist (have uncommitted changes not yet inspected — left rather than lose work). Review and retire.
- Floorplan PNG is gitignored (local only) — regenerate with `build-chennai-floorplan.py` on any new machine.
- AC quote, UPS (APC VA + W), Philips lighting, solar (glazing sqft from [[guru-moorthy]]), signage (frontage measurement) — all pending from tomorrow field visit (2026-05-31); could move fit-out ±₹1–1.5L.
- Conspit/VNM landed vs sponsorship-showcase build of record — still unreconciled (see [[racesims-chennai-partnerships]] `[!contradiction]`).
- GMC appeal — `gmc-rejection-history.md` has the defence checklist. Identity verification in Merchant Center + Conspit authorization letter still pending.

## People mentioned
- [[thambu]] — owner; flagged the compass inversion; confirmed 4-deck working set.
- [[guru-moorthy]] — architect; taking measurements at site.

## Backlinks
- [[racesims-chennai-premium-baseline]] · [[racesims-chennai-execution-plan]] · [[racesims-chennai-flagship]] · [[racesims-chennai-partnerships]] · [[racesims-chennai-fitout]] · [[2026-05-30-chennai-fitout-optimisation]] · [[2026-05-30-chennai-landed-cost-bom]]
