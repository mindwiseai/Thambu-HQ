---
title: Hot Cache
type: meta
updated: 2026-05-30
---

# Hot Cache

Most recently touched context. Read this first for any query — it often answers the question alone. Trim to ~500 words; drop oldest entries first.

## 2026-05-31 (latest) — Chennai compass corrected (N↔S) + numbers standardised to project report
- **Direction fix:** [[thambu]] flagged the floorplan compass was **inverted** — what was labelled **North is actually South** (180° flip: N↔S **and** E↔W). **Physical layout unchanged and still Vastu-correct; only the labels were wrong.** True directions now: **entrance WEST · office/training SW corner · motion rig faces SOUTH · 7 static rigs on east+north walls · leaderboard south wall · windows east/north.** Updated [[racesims-chennai-premium-baseline]] floor-fit + `racesims-chennai-3d.html` (labels/compass/floor-arrow) + stamped a correction banner on `racesims-chennai-floorplan.png` (no generator → needs full regen; pre-correction backup saved).
- **Numbers standardised:** the **project report is the single source of truth** for ALL Chennai figures — equipment (landed) ₹44.64L · fit-out ₹14.20L · gross ₹77.21L · ITC (₹8.75L) · **net ₹68.46L** · at-risk ₹59.14L · CoC ₹5.48L/yr · **break-even 11.5%** · EBITDA ₹3.57cr / PAT ₹2.11cr · payback ~2.0yr · **~3.1×**. Baseline reconciled (old ₹50.79L equip / ₹76.3L net / 2.8× → superseded; 6-rig table tagged historical). **TODO:** propagate to [[racesims-chennai-partnerships]] · [[racesims-chennai-flagship]] · [[racesims-chennai-execution-plan]].

## 2026-05-31 — Academy DELIVERY system (the *how we conduct it*)
- Thambu: training is the centrepiece — "proper format, workshops, exercises, everything... a very good structure for us to conduct." Built the **conduct layer** the wiki was missing (curriculum had the *what*, not the *how a coach runs it*).
- NEW [[racesims-academy-delivery-system]] — coach operating manual, **5 layers**: (1) Session Engine = the **APEX loop** (Aim·Practice·eXecute·eXamine, renamed from B·D·A·D) to-the-minute, one-concept-per-session, open-on-data/close-on-data, one homework Trainer; (2) [[racesims-drill-library|Drill Library]]; (3) Workshop Format = Theatre→Stations→Race→Podium, themed monthly editions; (4) Driver Development Record on VMS; (5) Coach Playbook + certification (the scaling layer). Three non-negotiables: data-not-vibes · spine-not-lessons · system-not-star-coach.
- NEW [[racesims-drill-library]] — named scored exercises (Braking Box, Release Ramp, Metronome, Slip Window, Rotation Point, The Flick, Switchback…) mapped to every glossary concept, L1–L4 + rally + racecraft; each = drill card (setup/metric/bronze-silver-gold/coach cue/common error). Coached drills = the self-serve Practice Trainers.
- Loop: **TELEMETRY → DRILL → GATE → RECORD → CHAMPIONSHIP.**
- **Next:** fold the session-format + drill-card + workshop slides into the deck — HELD pending Thambu's reaction to the structure.

## 2026-05-30 — Academy curriculum upgrade (Almeida-inspired)

- Thambu shared **Almeida Racing Academy** (Suellio Almeida) as inspiration — their "Racing Technique" driver-dev guide + Car Handling/Racecraft web courses. Folding in 4 things (cream editorial kept): **BAD-vs-GOOD** mistake-first teaching, themed skill **Levels**, a deepened **Racecraft pillar + Psychology**, and a **Challenges/practice-trainer** layer.
- Wiki done: [[racesims-academy-curriculum]] (added skill-order philosophy + 4 Levels + bigger glossary), [[racesims-curriculum-advanced-circuit]] (re-framed into Levels 2–4, mistake-first; Initiation = L1), NEW [[racesims-curriculum-racecraft]] (Foundations·Battle Dynamics·Strategies·Psychology) + NEW [[racesims-academy-challenges]] (Brake Precision / Race Start trainers + challenge gates → VMS/championship).
- **Next:** update the deck — add BAD/GOOD blocks to the 9 concept slides + new slides (skill-order, Levels overview, Racecraft pillar, Psychology, Challenges), render-verify, regenerate PDF.

## 2026-05-30 — Chennai fit-out re-sourced & optimised ₹16.1L → ₹14.2L
- [[thambu]] challenged the carried-forward ₹16.1L fit-out ("where are these numbers from?"). Re-grounded all 17 lines from **real 2026 India quotes/listings** (IndiaMART, Philips, Moglix, Chennai contractors) + C&W/JLL benchmarks, then walked every line with him. Living schedule: [[racesims-chennai-fitout]]; method: [[2026-05-30-chennai-fitout-optimisation]].
- **Fit-out ₹16.10L → ₹14.20L** (15 funded lines). Key calls: carpet **tiles** (not SPC, −₹1L) · **black-framed** glass (−₹47k) · mid-tier magnetic-track lighting (−₹76k) · **4-cam** CCTV · attendance-only biometric (door is a shutter) · 65″ QLED leaderboard (₹0 if Samsung) · tablet POS. **Acoustic + ambient audio → Phase 2.** AC stays **8 T** (don't undersize); UPS PC-only, outdoors → weatherproof enclosure + heat-derating watch (lithium vs VRLA).
- **Founder insight:** old ₹16.1L = ₹1,240/sqft = a *lean* finish, not premium (real premium ₹1,800–2,700/sqft; honest MID ₹21.3L) — and it was *incomplete* (buried UPS, no WiFi). ₹14.2L is lower **and** complete.
- **Capital reflow:** gross ₹77.21L · ITC ₹8.75L · **net ₹68.46L** · at-risk ₹59.14L · CoC ₹5.48L/yr · break-even 11.5% · **~3.1× multiple.** EBITDA ₹3.57cr / PAT ₹2.11cr hold. Landed report **rebuilt** (commit 2ce3d8d).
- New architect: [[guru-moorthy]] — quoted paint ₹75k, measuring glazing/walls/frontage on-site 2026-05-31.
- **Open:** 5 lines provisional (AC/UPS/lighting/solar/signage quotes pending, ±₹1–1.5L) · **washroom/sanitary** line unconfirmed (ask [[guru-moorthy]]) · Conspit/VNM-vs-sponsorship build of record.

## 2026-05-30 — Chennai landed-cost BOM + two project reports
- **Actual landed-cost rig BOM** from [[thambu]] (incl. tax) — [[2026-05-30-chennai-landed-cost-bom]]. **4 Formula/GT** (Apex 2-pedal, ₹1,60,750 sim hw) + **4 Rally/GT** (VNM 3-pedal + shifter + handbrake, ₹2,14,750). +PC+screens ₹3,23,995 ⇒ Formula ₹4,84,745 / Rally ₹5,38,745. **Motion platform ₹3,70,000** ⇒ motion rig ₹9,08,745. 7 static + 1 motion. **Fleet equipment ₹44.64L.**
- **Primary report:** `racesims-chennai-project-report.pdf` is now THE project report (landed-cost basis, 11 pp, optimised fit-out — promoted 2026-05-30 from `-landed-cost`). The old distributor-value version (10 pp) is archived to `marketing/decks/archive/`. Old drafts archived.
- **Office (NE corner):** ~12.2 × 12.1 ft (~148 sq ft).

## 2026-05-30 — Chennai partnerships + Nungambakkam + costing
- **Location: Nungambakkam.** Brand-partnership/sponsorship plan to cut list capital toward ~₹55-58L — [[racesims-chennai-partnerships]]. Rig split 2 Conspit + 2 VNM + 2 Fanatec + 2 reserved (showcase). Partner pitches: **Corsair** (PC + Fanatec — Corsair owns Fanatec), Zotac (GPUs ₹9.1L), Samsung (monitors ₹5.8L + leaderboard TV), AMD (CPUs ₹2.5L). Corsair deck built; Zotac/Samsung/AMD/Fanatec pending.

## 2026-05-30 — Chennai property LOCKED · layout v7 · AC
- **Property LOCKED, opens July 2026.** Layout v7 (Vastu) — *directions corrected 2026-05-31, see top entry:* entrance **WEST**, office/training **SW** corner, motion rig faces **SOUTH**, 7 static rigs on **east+north** walls, all screens against walls. Room 8.73 m E–W × 12.15 m N–S (~1,142 sqft). See [[racesims-chennai-premium-baseline]] (LOCKED), `racesims-chennai-floorplan.png`, `racesims-chennai-3d.html`.
- **AC: ~6 T calc → install 8 T.** Master rate card: 30 min ₹750 · 1 hr ₹1,250 · Motion +₹500/hr ([[racesims-master-rate-card]]).

---
*Older entries trimmed (oldest-first per hot-cache rule); full history in `wiki/log.md` and the linked concept/source pages.*
