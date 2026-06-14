---
title: Hot Cache
type: meta
updated: 2026-06-14
---

# Hot Cache

Most recently touched context. Read this first for any query — it often answers the question alone. Trim to ~500 words; drop oldest entries first.

## 2026-06-14 (latest) — RaceSims Zoho Books year-end health review

- **FY25-26 = ~10-month first year** (ops started **June 2025**). Net revenue **₹1.96cr** · gross profit ₹67.3L (34.3%) · **net profit ₹54.4L (27.7%) — but overstated** (payroll barely booked ₹1.39L, no founder salary, studio rent not yet in P&L). Balance sheet ties out **₹1.35cr**. Inventory-heavy (₹53L) + running on SBI OD.
- **GST:** [[thambu]] confirmed returns are **paid/filed on the portal, up to date**; Zoho just not marked filed (cosmetic). Auditor flagged **4 of 11 months mismatch** Zoho vs portal → reconcile. BS net GST ~₹4.72L is a Zoho artifact.
- **"vaithamaniti" ₹9.31L = rental/capital advance for the [[racesims-studio]] space** (Apr–Jun 2026, uncategorized in ICICI) → book as **asset**, not expense.
- **[[arka-motorsports]] owes ₹6.24L** (>45d, related party) — 46% of AR. **TDS** barely applied (₹644, ₹0 deposited).
- **Rating 6.5/10** · indicative valuation **₹1.2–2.2cr (central ~₹1.5cr)**, provisional. 10-item cleanup punch-list + full numbers in [[racesims-financials-fy2526]]. Source: [[2026-06-14-zoho-books-health-review]].

## 2026-06-09 — Incorporation docs ingested · Master Operating Document filled

- **Incorporation confirmed:** Racesims Solutions Private Limited incorporated **13 May 2025**. Startup India cert **DIPP211636** issued 08-07-2025, valid until 12-05-2035 (Toys & Games / Virtual Games).
- **Legal names confirmed:** Thambu = **Theerthanagiri Dhandapani Thambusamy** · Aishu = **Aishwarya Chandrasekaran Reddy** — both first directors per AOA.
- **CIN pending:** SRN 1-17644512045 — confirm on MCA portal.
- **Master Operating Document v1.0** filled (120+ fields) and sent. Still needs: CIN, phone, auditor, cap table %, brand colours, investor contacts.
- Source: [[2026-06-09-racesims-incorporation-docs]]

## 2026-06-02 — 100-store all-owned network plan · investor deck rebuilt · championship reframed

- **Strategic pivot:** [[racesims-india-saturation-plan]] updated from 43-centre (12 direct + 31 franchise) → **100 all-owned centres**. Franchise model dropped entirely.
- **Single format:** [[racesims-chennai-flagship]] Chennai template replicated 100× — 2,000 sq ft · 8 rigs · ₹95L Y1 · ₹2.62 cr Y5 · 68% margin · 25-month payback. No Mega/Boutique split.
- **Y5 numbers (research-backed):** ₹150 cr revenue · ₹52 cr EBITDA (~35%) · valuation ₹1,500-2,000 cr Y5 · ₹3,000-4,000 cr at Y8 maturity.
- **Championship = break-even brand engine.** Research (F1 Arcade £31.9m FY24 still EBITDA-negative; F1 Esports $750K prize is subsidised) confirms leagues don't generate profit for operators. Modelled at break-even (₹2.5 cr). Real adjacency is hardware distribution (₹25 cr Y5 — 100 showrooms × 8 rigs each = 800 rigs on live display).
- **Capital:** Series A ₹25-30 cr → 8 centres by Y2. Series B ₹50-60 cr at Y3 (₹500-700 cr valuation). Total external ₹75-90 cr.
- **Gateway framing locked:** "RaceSims is India's gateway to motorsport." All 4 LoBs RaceSims-branded.
- **Active investor artefact:** `racesims-multi-centre-rollout.pdf` (13 slides). Three-question brief archived.
- Source: [[2026-06-02-racesims-100-store-investor-deck]]

## 2026-06-01 — Deck cleanup · worktree salvage · compass corrected · builders in-repo
- **4 canonical decks** (all others archived): `racesims-chennai-project-report.pdf` · `racesims-multi-centre-rollout.pdf` · `racesims-chennai-partner-corsair.pdf` · `motorsport-academy-curriculum.pdf`.
- **Worktrees** 16→9. 3 branches salvaged: `admiring-spence` → [[racesims-website]] (Next.js site, 104 files, Supabase auth); `brave-stonebraker` → improved Corsair deck + MD Computers quote; `wizardly-jemison` → GMC feed audit docs.
- **Compass corrected** (N↔S, E↔W, 180° flip): entrance **WEST** · office **SW** · motion faces **SOUTH** · rigs **east+north** walls · leaderboard **south**. Layout unchanged, still Vastu-correct. All assets updated incl. project report pp.4-5 (re-generated).
- **Builder scripts in-repo** at `racesims/marketing/decks/builders/`: `build-chennai-project-report.py` (11pp PDF) + `build-chennai-floorplan.py` (3174×2246px PNG). Regenerate with `python3 <script>`.
- **Numbers**: project report = single source of truth everywhere. See [[racesims-chennai-premium-baseline]] canonical block.
- Source: [[2026-05-31-chennai-cleanup-compass-builders]].

## 2026-05-31 — Chennai compass corrected (N↔S) + numbers standardised to project report
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

---
*Older entries trimmed (oldest-first per hot-cache rule); full history in `wiki/log.md` and the linked concept/source pages.*
