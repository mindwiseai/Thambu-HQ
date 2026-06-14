---
title: Hot Cache
type: meta
updated: 2026-06-15
---

# Hot Cache

Most recently touched context. Read this first for any query — it often answers the question alone. Trim to ~500 words; drop oldest entries first.

## 2026-06-15 — Mindwise packaging brief finalized · 4-side label + regulatory architecture locked

- **[[2026-03-17-mindwise-packaging-brief-presentation|Packaging brief (March 17-23, 2026)]]** — comprehensive specification ingested from Sorted deck (18 slides). Bottle specs: 100mL translucent, [[60-capsule-bottle-decision|60 capsules]], cylinder + rectangle options, [[patco-pharmaceuticals]] vendor. [[packaging-content-layout|4-side label architecture]] locked per April 8: **Side 1** (hero: "Your Unfair Advantage" + "Government-Backed Brain Supplement"), **Side 2** (science: "Not All Bacopa Is Created Equal" + 55% bacosides claim), **Side 3** (formulation: CSIR-CDRI logo + GMP/allergen-free/gluten-free badges), **Side 4** (benefits: focus/clarity/performance). Outer box: front hero + regulatory clutter (nutrition/dosage/storage). Key decisions: drop "cruelty free" (animal testing history), use "vegetarian capsules" not vegan, min 2-3 bottle purchase to span [[8-12-week-onset-claim|8-12 week onset]]. [[tic-tac-seal-concept]] feasibility TBD. Critical path: June 1 launch.

## 2026-06-14 — IERL July launch structure locked · partner deck built

- **[[ierl-indian-esports-racing-league|IERL]] launches July 1, 2026** — monthly hot-lap league across the RaceSims partner network on [[assetto-corsa|Assetto Corsa]]. Deck: `racesims/marketing/decks/ierl-july-2026.html` (10 slides). Source: [[2026-06-14-ierl-july-launch]].
- **Brand:** lead with **IERL**, not "by RaceSims" — all centres pool, shared community brand. RaceSims Studio Chennai is one centre among equals.
- **July = manual** (league-hosted 24/7 server + manual leaderboard) until [[uday-hyderabad|Uday]]'s [[racesims-vms-build|VMS]] automation is ready; [[racing-point-esports|Racing Point Esports]] (his Hyderabad centre) joins then.
- **[[ierl-direct-settlement|Splitwise-style settlement]]** — league never holds money; matches each dealer's contribution to winners; 1–2 UPI transfers each.
- **[[real-penalty|Real Penalty]]** tool + identical centre hardware = controlled env, no cheating → reason it's centre-only, never home.
- **Season 1:** [[mugello]] · Amateur MX-5 ND / Pro Ferrari 488 GT3 · [[ierl-promotion-ladder|promotion ladder]]. **July pool ₹40K** (6 centres, 17 rigs); **local prize ₹500 × rigs** (centre-funded, separate). Aug 2: +Chennai → 33 rigs / ₹80K.
- ⚠ Platform contradiction flagged with LOCKED [[racesims-championship-architecture]] (LMU/iRacing vs AC). Resolution: **AC now → migrate to [[le-mans-ultimate|LMU]] once software ready.**
- **Shared-rig driver identity solved** via [[ierl-driver-identification|kiosk]] (`racesims/ierl/kiosk/`): name+phone → unique handle (`FIRSTNAME-####`) → writes AC name field → launches [[content-manager|Content Manager]] into class server. Leaderboard must dedupe by **name not GUID**. CM run on every rig.

## 2026-06-14 — RaceSims Zoho Books year-end health review

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

---
*Older entries trimmed (oldest-first per hot-cache rule); full history in `wiki/log.md` and the linked concept/source pages.*
