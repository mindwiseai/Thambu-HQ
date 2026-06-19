---
title: Wiki Log
type: meta
---

# Wiki Operation Log

Append-only chronological record of every ingest, lint, and major edit. **Newest entries at top.** Format: `## [YYYY-MM-DD] <operation> | <title>` so `grep "^## \[" log.md | head -20` shows recent activity.

---

## [2026-06-19] inbox-check | Command Center inbox check — 2026-06-19 night (already processed)
- Source: Gmail inbox check (mindwise.ai1@gmail.com, 5 unread threads)
- Domain: cross
- Key finding: **All messages already processed.** (1) GitHub Pages deploy failure (2026-06-19 12:18) — already logged in prior commits. (2) Shivank Google Doc share #2 (edit access, 08:43) — same doc as [[2026-06-18-octupie-scripts-delivered]], permissions upgrade only. (3) OpenAI ChatGPT marketing (02:42) — promotional. (4) Octupie script delivery (2026-06-18 18:22) — already ingested. (5) Shivendra forward — duplicate. **No new work items.**

## [2026-06-19] inbox-check | Command Center inbox check — 2026-06-19 night status (no new messages)
- Source: Gmail inbox check (mindwise.ai1@gmail.com, 2026-06-19 ~20:30 local time)
- Domain: cross
- Key finding: **GitHub Pages deploy failure logged.** Workflow "Deploy to GitHub Pages" failed on main (commit b54ae06) at 2026-06-19 12:18 UTC — all jobs failed in 26s. All other messages already processed or non-actionable (Octupie scripts ingested, marketing emails from OpenAI/Framer). **No new work items beyond deploy failure notification.**

## [2026-06-19] inbox-check | Command Center inbox check — Shivank script review doc (edit access granted)
- Source: Gmail inbox check (mindwise.ai1@gmail.com, 2026-06-19 08:43 UTC)
- Domain: cross
- Key finding: **No new content.** Google Doc share notification from Shivank (edit access granted, previously comment access). Same doc as [[2026-06-18-octupie-scripts-delivered]] (link: `1xCJHUrgGsUIb-FFLF8QGOv9vwc8Go-xC_Q88mRPXvZw`). Permissions update only, content already ingested. No other actionable emails (OpenAI/Framer marketing, meeting forwards). **No new work items.**

## [2026-06-19] inbox-check | Command Center inbox check (third check, evening — no new items)
- Source: Gmail inbox check (mindwise.ai1@gmail.com, 6 threads since 2026-06-17)
- Domain: cross
- Key finding: **All messages already processed or non-actionable.** Octupie script delivery (shivank@octupie.com, 2026-06-18 18:22) — already ingested as [[2026-06-18-octupie-scripts-delivered]]. Shivendra forward + Google Doc share notification — duplicates. OpenAI ChatGPT + Framer emails — promotional. **No new work items.**

## [2026-06-19] inbox-check | Command Center inbox check — Octupie scripts (second check, evening)
- Source: Gmail inbox check (mindwise.ai1@gmail.com, 5 unread messages since 2026-06-17)
- Domain: cross
- Key finding: **All messages already processed or non-actionable.** (1) Octupie script delivery (shivank@octupie.com, 2026-06-18 18:22) — already ingested as [[2026-06-18-octupie-scripts-delivered]], hot.md up to date. (2) Shivendra's forward of Octupie script notification — duplicate. (3) Shivank Google Doc share notification — duplicate. (4) OpenAI ChatGPT marketing email (2026-06-19 02:42) — promotional, not actionable. (5) Framer 3.0 announcement (2026-06-17) — promotional, not actionable. **No new work items.** Gmail unlabel failed (insufficient scopes) — MCP server read-only mode.

## [2026-06-19] inbox-check | Command Center inbox check — Octupie scripts (duplicates cleaned)
- Source: Gmail inbox check (mindwise.ai1@gmail.com, 4 unread messages since 2026-06-18)
- Updated: [[log]], [[hot]] (duplicates removed), removed 2 duplicate source files
- Domain: cross
- Key finding: **Octupie scripts delivery already processed** (earlier today). Cleaned 3 duplicate source files → kept [[2026-06-18-octupie-scripts-delivered]]. Cleaned duplicate hot.md entries. OpenAI ChatGPT marketing email (not actionable). No new work items.

## [2026-06-19] ingest | Octupie scripts delivered — 9 scripts for Mindwise trial batch
- Source: [[2026-06-18-octupie-scripts-delivered]] (Gmail thread 19edbf8deec6d8ca, shivank@octupie.com → shiv_selvam@hotmail.com, 2026-06-18 18:22 UTC)
- Created: 1 new source page — [[2026-06-18-octupie-scripts-delivered]]
- Updated: [[hot]] (new 2026-06-19 entry at top), [[log]]
- Domain: mindwise
- Key facts: **9 video scripts delivered** via Google Doc (https://docs.google.com/document/d/1xCJHUrgGsUIb-FFLF8QGOv9vwc8Go-xC_Q88mRPXvZw/edit). **Select 7 for trial batch.** Hook-first format (first line = camera hook). Shivank: "**Selvam's voice is the whole point**" — add personal lines/memories/corrections. ✅ Lights arrived ✅ Signed contract (Mindwise-Octupie-Onboarding.pdf attached) ✅ Team ready (Jay, Vishnu, Shivank). **Waiting on:** (1) Selvam's availability this coming week (2) Chennai office address for lighting/setup. **Lock shoot date this week.**

## [2026-06-19] ingest | IERL July 2026 launch planning — 27 rigs, ₹1L prize pool, sim-to-reality
- Source: [[2026-06-19-ierl-july-launch]] (planning deck: `racesims/marketing/decks/ierl-july-2026.html`)
- Created: 7 new pages — [[2026-06-19-ierl-july-launch]] (source) · [[ierl]] (entity) · [[uday]] (entity) · [[racing-point-esports]] (entity) · [[buzzing-hornet-motorsports]] (entity) · [[ierl-prize-pool-formula]] (concept) · [[ierl-sim-to-reality]] (concept)
- Updated: [[hot]] (new 2026-06-19 entry) · [[log]] · [[index]] (IERL entities + concepts added)
- Domain: racesims
- Key facts: July network 7 centres / 27 rigs. Prize pool formula: ₹1,00,000 ÷ total rigs (July: ₹3,704/rig; Aug preview: 35 rigs → ₹2,857/rig). ARKA Motorsports: 4 rally/race cars for sim-to-reality program. Buzzing Hornet: VW Polo Cup track experiences (Chennai). Track/car combo now chosen monthly by Uday. Partner WhatsApp message drafted (approved). Eligibility: triple monitor + 12Nm load cell + VMS + vision alignment.

## [2026-06-18] ingest | Dispatch amendments session — all orders unblocked
- Source: [[2026-06-18-dispatch-amendments]]
- Created: 1 new page — [[2026-06-18-dispatch-amendments]]
- Updated: [[davlish-singh]] (pedal swap noted), [[customer-pipeline]] (dispatch statuses + procurement table), [[index]], [[hot]], [[log]]
- Domain: racesims
- Key decisions: Asif EVO 3-pedal confirmed. Ragav MAX01→290 GP + Conspit HB/Shifter follow separately. Amruth recliner in stock. Davlish CPP Apex 3-pedal→2-pedal+Clutch. Garvish deferred 2mo. Studio deferred (internal-last). All 5 dispatches clear. Only import need: Ares 12nm −2.

## [2026-06-18] update | All dispatch orders unblocked — final swaps + Studio deferred
- Updated: [[customer-pipeline]] (all 5 dispatches cleared, procurement table finalised), [[hot]]
- Domain: racesims
- Decisions: Ragav MAX01 → 290 GP (7 in stock). Conspit HB+Shifter ship separately. Amruth recliner confirmed in stock. Davlish CPP Apex 3-pedal → 2-pedal + Clutch. Studio (QT-000360) deferred — internal order, external first. Only active import need: Ares 12nm (−2).

## [2026-06-18] update | Garvish order postponed 2 months — pipeline and shortfalls revised
- Updated: [[customer-pipeline]] (Garvish row → POSTPONED, active rig demand 30→23, shortfall table rebuilt), [[hot]] (new 2026-06-18 entry)
- Domain: racesims
- Key decision: Garvish (QT-000368+369, ₹30.7L, 7 rigs, Kerala) deferred ~Aug 2026. Impact: Ares 12nm −11→−2, Triple Monitor precision −8→−1, VNM 3DOF −2→0 (no reorder needed), PC/KB tray −15→−8 each. Active quote rig demand = 23.

## [2026-06-16] ingest | Dispatch pipeline planning session + QT-000370 Davlish updated quote
- Source: [[2026-06-16-dispatch-pipeline-session]] · [[2026-06-16-qt-000370-davlish-updated]]
- Created: 3 new pages — [[2026-06-16-dispatch-pipeline-session]] · [[2026-06-16-qt-000370-davlish-updated]] · [[davlish-singh]]
- Updated: [[customer-pipeline]] (major — 5-order dispatch queue, 7-customer quote pipeline, 11 critical shortfalls, procurement action list) · [[hot]] · [[log]] · [[index]]
- Domain: racesims
- Key decisions: dispatch priority P1=Asif → P2=Dhruv (collect payment) → P3=Amruth → P4=Adhyan → P5=Ragav (overdue, blocked on MAX01 Wheel). PO-00054 (151 items, $26,294.90, ENSU Shanghai) arrived tonight. QT-000370 supersedes QT-000348 — Davlish 4→3 rigs, ₹7.42L→₹5.50L. Ares 12nm shortfall −11 units (urgent reorder). GT rigs, PC/KB trays, monitor stands all need fabrication.

## [2026-06-15] ingest | Mindwise raw folder — meetings, WhatsApp, security check
- Source: raw/mindwise/ folder (9.5GB, 96 documents processed)
- Created: 4 new source pages — [[2026-06-15-mindwise-raw-ingest-whatsapp]] (WhatsApp Dec 2025–Mar 2026) · [[2026-06-15-aarti-first-call]] (discovery call, late 2025/early 2026) · [[2026-03-23-sorted-intro-call-manik]] (formal proposal, Mar 23) · 3 additional sources from background agents
- Created: 2 new entity pages — [[jaiman]] (original Sorted account manager, departed Jan 29, 2026) · [[marketing-budget-25l]] (₹25L annual budget, announced Feb 12)
- Updated: .gitignore (added second Razorpay credential path)
- Domain: mindwise
- **Security:** Razorpay credentials at `raw/mindwise/Sales channels/Website/rzp-2.csv` and `raw/mindwise/Life Essence/Website/rzp-2.csv` confirmed in .gitignore (already protected, second path added)
- **WhatsApp timeline:** Dec 19, 2025 (group created by [[jaiman]]) → Mar 23, 2026 (packaging spec finalization). Key moments: logo lock Mar 16 ([[route-3-architecture-of-intelligence]]), [[patco-pharmaceuticals]] discovered Mar 18, [[two-track-bottle-strategy]] established Mar 17, [[marketing-budget-25l]] announced Feb 12, [[jaiman]] departed Jan 29
- **Aarti first call:** Foundational discovery where [[thambu]] explains complete [[cdri-08]] story; [[aarti-samant]] delivers blunt feedback (too clinical/medical), recommends brand communication strategy, WHY/WHAT/HOW framework, shift to "human" personality
- **Manik intro call:** Formal [[sorted-agency]] proposal (₹11.5L combined, 9 weeks); brain health market validation; Two Brothers Organic Farms case study
- **Process:** 6 parallel agents launched for meeting transcript extraction; security check completed; wiki source pages created with dense linking
- **Raw folder state:** 5,621 files total (38.5GB); Mindwise 96 text documents; RaceSims 29GB (not processed this session)

## [2026-06-15] ingest | Mindwise visual identity meeting — 3 routes, Route 3 locked
- Source: [[2026-03-23-mindwise-visual-identity-meeting]]
- Created: 4 new pages — [[2026-03-23-mindwise-visual-identity-meeting]] (source, 35-min meeting + 62-slide deck + video) · [[route-3-architecture-of-intelligence]] (LOCKED, concept) · [[route-1-peak-and-stoic-mind]] (explored, archived) · [[route-2-neural-network]] (explored, archived; legibility gap flagged)
- Updated: [[wiki/hot|hot]] (new 2026-06-15 entry + visual identity section) · [[domains/mindwise/_index]] (added visual identity routes section) · [[wiki/index|index]] (added 3 route pages)
- Domain: mindwise
- **Design LOCKED:** Route 3 "Architecture of Intelligence" — M transforms into geometric brain silhouette (vs literal drawing). Typography: Helvetica Neue with Mind (bold) + wise (light) = strength ↔ subtlety. Color: neon green + black (energy/performance vs grounding). Insignia: works as standalone icon.
- **Why Route 3 won:** Unanimous internal consensus ("all of us universally had this was the third one... it's bang out there"). Superior legibility, memorability, sophistication. Route 1A (Peak Mind) too bold/intimidating. Route 1B (Stoic Mind) better but lacked "smartness". Route 2 (Neural Network) clever concept but **unresolved cold-start legibility gap** in retail (concept requires animation/website context to decode; assumes customer discovers brand online first, not in-store).
- **Packaging:** semi-transparent matte-finish bottle (shows green capsules), neon logo placement TBD (black vs white bottle). Sleeve ideal but volumes don't support; labels fallback. Neon bottle sourcing being explored.
- **Next steps:** refined color mockups (promised Mar 24); internal review (Krishna + Selva); packaging integration; web/collateral rollout.
- **Design process note:** 7 initial routes filtered to 4 via external rater feedback (feeling-word rating system, not good/bad) — these 4 are the winners presented.

## [2026-06-15] ingest | Mindwise Brand Communication Strategy Workshop (Jan 23, 2026)
- Source: [[2026-01-23-brand-communication-strategy-workshop]]
- Created: 1 new page — [[2026-01-23-brand-communication-strategy-workshop]] (source; comprehensive workshop extract: 3C framework, competitor analysis, Brain Hackers network, strategic decisions)
- Updated: [[domains/mindwise/_index]] (added source to chronological list) · [[wiki/hot|hot]]
- Domain: mindwise
- Key facts captured: **3C Framework** — Context (nutraceuticalization post-COVID; $800M→$2.9B market 2035; 5 pillars regenerative health), Community (universal cognitive strain; popcorn brain; dopamine-driven feedback loops; consumers in "cognitive panic" state), Category (polarized Ayurveda vs modern nootropics; Himalaya/Organic India (legacy) vs Mind Lab Pro/Qualia (inaccessible) → MindWise = bridge). **Strategic decisions:** position as uniter of Bacopa credibility + evidence-based efficacy; "Placebo Wellness" = enemy; brand personality = Minimalist/Ordinary model (scientist-forward, transparent, confident); target network = "Brain Hackers" (treat brain as lifelong asset). **Core brand:** tagline "Your Unfair Advantage" · claim "Only Govt-Backed Daily Brain Supplement for Sharper Mind" · purpose "We Help You Build New Neural Links For Peak Brain Performance". **Brain Hackers shared beliefs:** brain health = personal responsibility; focus = superpower; prevention > panic; inside jokes ("If it worked instantly, it wouldn't last"; "Brain gains > brain hacks"; forgetting words mid-sentence). **Immediate action items:** update CDRI website (remove ProMind, feature Mindwise only — critical before launch); PR content blast on CDRI-08 + clinical trials; website optimization for research timeline + papers + efficacy data.

## [2026-06-15] ingest | Mindwise Packaging Brief presentation (March 17-23, 2026)
- Source: [[2026-03-17-mindwise-packaging-brief-presentation]]
- Created: 1 new page — [[2026-03-17-mindwise-packaging-brief-presentation]] (source, comprehensive specification)
- Updated: [[wiki/hot|hot]] · [[packaging-content-layout]] (cross-check with April 8 lock) · [[wiki/index|index]]
- Domain: mindwise
- Key facts captured: **Bottle specs:** 100mL translucent, [[60-capsule-bottle-decision|60 capsules]], cylinder + rectangle options, [[patco-pharmaceuticals|Patco]] vendor. **4-side label architecture locked (April 8):** Side 1 = hero ("Your Unfair Advantage" + "Government-Backed Brain Supplement" + 60 caps), Side 2 = science ("Not All Bacopa Is Created Equal" + 55% bacosides + 40yr research + 7 clinical trials), Side 3 = formulation (CSIR-CDRI logo + GMP/allergen-free/gluten-free/vegetarian icons), Side 4 = benefits (focus/clarity/performance). **Outer box:** front hero + regulatory (nutrition/dosage/storage/batch info). **Key decisions:** drop "cruelty free" (animal testing history [[cdri-08-safety-profile]]), use "vegetarian capsules" not "vegan", min 2-3 bottle purchase to span [[8-12-week-onset-claim|8-12 week onset window]]. **Open:** CSIR-CDRI logo artwork delivery, [[tic-tac-seal-concept|Tic Tac seal]] feasibility, outer box decision (cost vs compliance clutter), QR destination (website vs Amazon vs Linktree), blister pack (30-cap B2B). **Critical path:** June 1, 2026 launch.

## [2026-06-14] ingest | IERL hosted web kiosk + deeplink finding + auto-discovery
- Source: [[2026-06-14-ierl-kiosk-build]]
- Confirmed from [[content-manager|CM]] source: `acmanager://race/online` accepts `name` (sets DriverName) → browser can launch AC with the customer's name, no local app. `race/online/join` has no name.
- Built **hosted web kiosk** in the IERL site (`site/kiosk.html` + assets; Worker `/api/kiosk/config` + `/api/kiosk/signin`; D1 `0003_kiosk_signins`). Deploy = a browser bookmark per rig, **centres configure nothing**.
- **Auto-discovery**: Worker reads each server's `/INFO` to fill TCP port + current car from just `ip`+`httpPort` (KV-cached, static fallback).
- Created: [[2026-06-14-ierl-kiosk-build]] (source). Updated: [[ierl-driver-identification]] · [[content-manager]] · `racesims/ierl/KIOSK.md` · [[wiki/hot|hot]]. Python kiosk demoted to fallback.

## [2026-06-14] edit | IERL driver identification + kiosk build (Python interim)
- Driver-sign-in kiosk built at `racesims/ierl/kiosk/` (zero-dep Python + branded UI): name+phone → unique handle → writes AC name field → launches [[content-manager|Content Manager]] into class server → auto-reset. Tested in simulate mode. (Superseded as primary by the hosted web kiosk above; kept as fallback.)
- Created: [[ierl-driver-identification]] (concept) · [[content-manager]] (entity) · [[le-mans-ultimate]] (entity, migration target)
- Updated: [[ierl-indian-esports-racing-league]] · [[assetto-corsa]] · [[domains/racesims/_index]] · [[wiki/hot|hot]]
- Key: shared rig = one GUID → laps keyed on driver NAME; handle = FIRSTNAME-#### (last4 phone); leaderboard must dedupe by name not GUID; CM may override race.ini (on-rig verify). AC now → LMU later.

## [2026-06-14] ingest | RaceSims Zoho Books year-end health review (FY25-26)
- Source: [[2026-06-14-zoho-books-health-review]]
- Created: 3 new pages — [[2026-06-14-zoho-books-health-review]] (source) · [[racesims-financials-fy2526]] (concept) · [[racesims-studio]] (entity)
- Updated: [[racesims-company]] (financial state + fuller banking: SBI OD/Current, gateways) · [[arka-motorsports]] (₹6.24L related-party receivable) · [[wiki/hot|hot]]
- Domain: racesims
- Key facts: ops started June 2025 (10-month FY) · net rev ₹1.96cr · net profit ₹54.4L (overstated, unnormalized) · BS ₹1.35cr · GST paid on portal but 4/11 months mismatch Zoho (auditor) · TDS barely applied (₹644, ₹0 deposited) · ₹9.31L studio advance ("vaithamaniti") to be booked as asset · ARKA ₹6.24L related-party AR · rating 6.5/10 · indicative valuation ₹1.2–2.2cr · 10-item books cleanup punch-list

## [2026-06-14] ingest | IERL July 2026 launch — structure & partner deck
- Source: [[2026-06-14-ierl-july-launch]]
- Created: 6 new pages — [[2026-06-14-ierl-july-launch]] (source) · [[ierl-indian-esports-racing-league]] · [[ierl-direct-settlement]] · [[ierl-promotion-ladder]] · [[real-penalty]] · [[assetto-corsa]]
- Updated: [[uday-hyderabad]] (his centre = Racing Point Esports, joins IERL when VMS ready) · [[racesims-championship-architecture]] (contradiction callout — LMU/iRacing vs IERL Assetto Corsa) · [[domains/racesims/_index]] (new IERL section) · [[wiki/hot|hot]]
- Domain: racesims
- Key decisions: IERL = shared community brand (not "by RaceSims") · July runs manual until [[racesims-vms-build|Uday's VMS]] ready · [[ierl-direct-settlement|Splitwise-style settlement]] (no central pot) · [[real-penalty|Real Penalty]] + centre-only = no cheating · [[mugello]] / MX-5 ND + Ferrari 488 GT3 · local prize ₹500 × rigs (centre-funded)
- Open: platform contradiction with LOCKED [[racesims-championship-architecture]]; partner-centre entity pages pending (6 dead links flagged for next ingest)

## [2026-06-09] ingest | RaceSims incorporation documents — MOA, AOA, Startup India cert, Board Resolution
- Source: [[2026-06-09-racesims-incorporation-docs]]
- Created: 1 new page — [[2026-06-09-racesims-incorporation-docs]] (source)
- Updated: [[racesims-company]] (incorporation date, Startup India cert no., SRNs, full legal names, MOA objects) · [[thambu]] (full legal name confirmed) · [[aishwarya-chandrasekaran]] (full legal name + RaceSims co-director role confirmed) · [[wiki/hot|hot]]
- Domain: racesims
- Key facts confirmed: incorporated 13 May 2025 · DIPP211636 (Toys & Games / Virtual Games) · Thambu's full name: Theerthanagiri Dhandapani Thambusamy · Aishu's full name: Aishwarya Chandrasekaran Reddy · CIN still to confirm via MCA portal

## [2026-06-02] ingest | RaceSims 100-store all-owned network plan + investor deck session
- Source: [[2026-06-02-racesims-100-store-investor-deck]]
- Created: 1 new page — [[2026-06-02-racesims-100-store-investor-deck]] (source)
- Updated: [[racesims-india-saturation-plan]] (major — pivot from 43-centre franchise to 100 all-owned; Chennai template as sole format; cohort revenue math; research-backed adjacency rebalance) · [[wiki/index|index]] · [[wiki/hot|hot]]
- Domain: racesims
- Key decisions: franchise model dropped entirely; Mega/Boutique split dropped; championship = break-even brand engine (not ₹8 cr profit line); hardware distribution is the real adjacency (₹25 cr Y5); 3-question investor brief archived

## [2026-06-01] ingest | Chennai deck cleanup, compass correction & builder scripts
- Source: [[2026-05-31-chennai-cleanup-compass-builders]]
- Created: 2 new pages — [[2026-05-31-chennai-cleanup-compass-builders]] (source) · [[racesims-website]] (new concept: Next.js site)
- Updated: [[racesims-chennai-premium-baseline]] (canonical capital block, compass, directions) · [[racesims-chennai-execution-plan]] (compass + numbers) · [[racesims-chennai-partnerships]] (₹70.2L→₹68.46L) · [[racesims-chennai-flagship]] (upside model banner) · [[wiki/hot|hot]] · [[wiki/log|log]] · [[wiki/index|index]]
- Domain: racesims

## [2026-05-31] edit | Chennai compass correction (N↔S, 180°) + numbers standardised to project report
- [[thambu]]: "what I told you north is actually south." Floorplan compass was inverted 180° (N↔S **and** E↔W). **Physical layout unchanged & still Vastu-correct — only labels were wrong.**
- Corrected directions (entrance WEST · office SW · motion faces SOUTH · rigs east+north walls · leaderboard south · windows east/north) in: [[racesims-chennai-premium-baseline]] floor-fit section, `racesims-chennai-3d.html` (HUD/buttons/compass widget/floor north-arrow flipped to +z), `racesims-chennai-floorplan.png` (banner-stamped; no generator → flagged for full regen; `-PRECORRECTION-backup.png` saved).
- **Numbers:** made `racesims-chennai-project-report.pdf` the single source of truth. Reconciled [[racesims-chennai-premium-baseline]] — canonical block (equip ₹44.64L landed · fit-out ₹14.20L · net ₹68.46L · break-even 11.5% · ~3.1×); marked old ₹50.79L/₹76.3L/2.8× superseded; tagged 6-rig table historical-variant.
- Updated: [[wiki/hot|hot]], [[wiki/log|log]]. **TODO:** propagate canonical numbers to [[racesims-chennai-partnerships]] · [[racesims-chennai-flagship]] · [[racesims-chennai-execution-plan]].

## [2026-05-31] edit | Academy delivery system — coach operating manual + drill library
- Thambu: "how do we format our courses... proper format, workshops, exercises, everything... a very good structure for us to conduct." The training is RaceSims' centrepiece.
- Created: 2 new pages — [[racesims-academy-delivery-system]] (the *conduct* layer: 5 layers — Session Engine to-the-minute, Drill Library, Workshop Format, Driver Record, Coach Playbook; built on 3 non-negotiables: data-not-vibes, spine-not-lessons, system-not-star-coach) + [[racesims-drill-library]] (named scored exercises mapped to every glossary concept, L1–L4 + rally + racecraft; drill-card template).
- Updated: [[racesims-academy-curriculum]] (now framed as the *what*; points to delivery system as the *how*), [[wiki/index|index]].
- Retention loop spine: TELEMETRY → DRILL → GATE → RECORD → CHAMPIONSHIP.
- **Next (not done):** fold session-format + drill-card + workshop slides into the curriculum deck (held pending Thambu's reaction to the structure).

## [2026-05-30] ingest | Chennai fit-out real-world sourcing + line-by-line optimisation
- Source: [[2026-05-30-chennai-fitout-optimisation]] — re-grounded the carried-forward ₹16.1L fit-out from real 2026 India listings/rate-cards (IndiaMART, Philips, Moglix, Chennai contractors) + C&W/JLL benchmarks; walked all 17 lines with [[thambu]].
- Created: 2 new pages ([[racesims-chennai-fitout]] living schedule, [[2026-05-30-chennai-fitout-optimisation]] source) + 1 new entity ([[guru-moorthy]] architect).
- Updated: [[2026-05-30-chennai-landed-cost-bom]] (superseded-capital note), [[racesims-chennai-partnerships]] (fit-out ₹14.2L), [[racesims-chennai-premium-baseline]] (landed callout + fit-out note), [[wiki/index|index]].
- **Fit-out ₹16.10L → ₹14.20L** (15 funded lines; acoustic + ambient audio → Phase 2). Old estimate was a *lean* number (₹1,240/sqft, not premium) and *incomplete* (buried UPS, no WiFi); honest premium = ₹21.3L; optimised to ₹14.2L via VE + phasing + sponsor-shift.
- **Capital reflow:** gross ₹77.21L · ITC ₹8.75L · **net ₹68.46L** · at-risk ₹59.14L · CoC ₹5.48L/yr · break-even 11.5% · **~3.1× multiple.** Landed report rebuilt (commit 2ce3d8d).
- **Open:** 5 lines provisional (AC/UPS/lighting/solar/signage quotes pending) · washroom line unconfirmed · Conspit-vs-sponsorship build of record.

## [2026-05-30] ingest | Chennai landed-cost equipment BOM + capital
- Source: [[2026-05-30-chennai-landed-cost-bom]] — [[thambu]]'s actual landed-cost figures (incl. tax) for the rig hardware.
- Created: 1 new page ([[2026-05-30-chennai-landed-cost-bom]]).
- Updated: [[racesims-chennai-partnerships]] (landed BOM in costing section), [[racesims-chennai-premium-baseline]] (landed-cost variant callout).
- **Build mix:** 4 Formula/GT (Apex 2-pedal ₹1,60,750 sim hw) + 4 Rally/GT (VNM 3-pedal + shifter + handbrake ₹2,14,750); +PC+screens ₹3,23,995 ⇒ Formula ₹4,84,745 / Rally ₹5,38,745 per rig. **Motion platform ₹3,70,000** (supplier-quoted) ⇒ motion rig ₹9,08,745. 7 static + 1 motion.
- **Fleet equipment ₹44.64L landed** (vs ₹50.79L est) → **net capital ₹70.2L · cost of capital ₹5.62L/yr · payback ~2.0 yr · ~3.0× multiple.** Break-even unchanged (10.0% / 11.6%).
- Deliverable: `racesims/marketing/decks/racesims-chennai-project-report-landed-cost.pdf` (11 pp, separate from premium report). Premium report also redesigned this session (landscape, RaceSims editorial).
- Contradiction flagged: landed build is Conspit/VNM only vs the 2C/2V/2Fanatec/2-reserved sponsorship showcase — landed = buy-it-ourselves baseline.
- Domain: racesims

## [2026-05-30] strategy | Chennai partnerships + Nungambakkam + costing refine
- Created: [[racesims-chennai-partnerships]] — brand-partner/sponsorship plan to cut ₹73.5L list capital toward ~₹55-58L.
- **Location locked: Nungambakkam** (central Chennai).
- **Rig split:** 2 Conspit + 2 VNM + 2 Fanatec + 2 reserved (multi-brand showcase).
- **Partner pitches:** Corsair (PC + Fanatec, ₹10-18L — Corsair owns Fanatec), Zotac (8× RTX 5070 Ti ₹9.1L), Samsung (24× Odyssey G5 ₹5.8L), AMD (8× Ryzen 7 ₹2.5L), Fanatec (₹4-12L). Ask = full sponsorship, implied not stated; branding in exchange.
- **Costing refined (sourced prices):** PC = RTX 5070 Ti build ₹3.24L/rig (RAM at market — AI-driven DRAM spike); AC = energy-efficient 5-star inverter high-wall splits ₹2.4L (most efficient; cassettes ruled out — exposed ceiling); internet = 2× fibre (Jio+Airtel) failover.
- Built: `racesims/marketing/decks/racesims-chennai-partner-corsair.pdf` (7-slide template, real Corsair sails logo). 4 more decks pending (Zotac, Samsung, AMD, Fanatec).
- Domain: racesims

## [2026-05-30] LOCK | Chennai property confirmed + AC sizing + 5yr report
- **Property LOCKED**, opens July 2026. Updated [[racesims-chennai-premium-baseline]] (locked financials) + [[racesims-chennai-execution-plan]] (HVAC).
- **Numbers rechecked:** fleet blended ₹1,218/hr, break-even 10.0%, 5yr EBITDA ₹3.57cr / PAT ~₹2.14cr / payback ~2yr — all confirmed.
- **Cost of capital added:** 8% p.a. blended (part loan/part own) = ₹5.79L/yr.
- **AC sized:** calculated ~6 T peak (PCs + solar-through-glass + fresh air); install **8 T** (4×2-ton inverter splits), capex ~₹4.5L → net capital ₹68.3L → **₹72.3L**.
- **Layout LOCKED at v7:** North-up, entrance EAST, office NE, motion faces N, all rigs face their walls.
- Deliverables in `racesims/marketing/decks/`: `racesims-chennai-project-report.pdf` (8-pg consolidated), `racesims-chennai-5yr-business-plan.pdf`, `racesims-chennai-economics.pdf`. Floor plan + 3D in `racesims/`.

## [2026-05-30] build | Academy curriculum upgrade (Almeida-inspired)
- Inspiration: Almeida Racing Academy "Racing Technique" guide + web courses (Thambu shared).
- Updated [[racesims-academy-curriculum]]: added "right order of skills" (stay on track → consistent → faster), four named skill **Levels** (Consistency&Confidence → Balance&Speed → Precision → Mastery), expanded concept glossary (+slip angle, neutral steer, max rotation point, brake bias, racecraft set).
- Re-framed [[racesims-curriculum-advanced-circuit]] into Levels 2–4, mistake-first (BAD→GOOD) teaching; Initiation = Level 1.
- Created [[racesims-curriculum-racecraft]] (COMPETE pillar: Foundations · Battle Dynamics · Strategies · **Psychology**) and [[racesims-academy-challenges]] (practice trainers + challenge gates tied to VMS/championship).
- Updated index. Visual direction: keep cream editorial. Deck update (BAD/GOOD + new slides) follows.
- Domain: racesims

## [2026-05-30] fix | Rebuilt all 9 concept diagrams (were geometrically wrong)
- All 9 SVG concept diagrams in `motorsport-academy-curriculum.html` rebuilt on verifiable geometry after the first versions read as nonsense.
- Method: each diagram authored as an isolated standalone, rendered via headless Chrome, visually verified, then ported into the deck. Racing line / late-apex / overtake / flick now use a clean L-corner (apex = inner corner) instead of error-prone arc-sweeps; braking + trail-braking are proper aligned telemetry traces; understeer/oversteer show correct car attitudes; weight transfer is a clean side-view.
- All 21 pages re-verified in-context. PDF regenerated.
- Domain: racesims

## [2026-05-30] build | Academy full curriculum + illustrated deck
- Created: [[racesims-academy-curriculum]] (hub: B·D·A·D session model, progression logic, 16-concept glossary) + 6 per-programme curriculum pages — [[racesims-curriculum-initiation]], [[racesims-curriculum-advanced-circuit]], [[racesims-curriculum-advanced-rally]], [[racesims-curriculum-sim-reality]], [[racesims-curriculum-track-day]], [[racesims-curriculum-tuner-lab]]
- Each curriculum is session-by-session with assessment gates + outcomes
- Built deck: `racesims/marketing/decks/motorsport-academy-curriculum.html` + `.pdf` — 21 slides, layered (aspirational → 9 custom-SVG concept diagrams → per-programme session detail). RaceSims editorial system. Verified render via Playwright; PDF 1280×720, 21pp.
- Custom SVG diagrams: racing line, braking/threshold, trail braking, throttle/exit, understeer-oversteer, switchback overtake, Scandinavian flick, pace notes, weight transfer
- Updated: [[racesims-motorsport-academy]], index (new Academy & curriculum cluster)
- Domain: racesims

## [2026-05-30] edit | Academy simplified to 3 tiers
- Updated: [[racesims-motorsport-academy]] — 7-tier programme collapsed to 3: Initiation (₹8K) · Advanced Circuit/Rally (₹20K/₹25K) · Sim + Reality Rally/Circuit (₹1.75L/₹2.25L). Pro Track removed. Track Day Programmes + Tuner Lab moved out of Academy into separate offerings.
- Updated: [[racesims-master-rate-card]] TRAIN section to match
- Updated: [[racesims-drive-train-compete]] TRAIN table to match
- Domain: racesims

## [2026-05-30] edit | Group pricing rework + 8-seat correction
- Updated: [[racesims-master-rate-card]] group section — replaced 4 overlapping flat-rate products with: Group Race (₹1,000/hr/seat rally, non-exclusive), Private Event (₹12,000/hr all 8 seats, 3-hr min), Corporate Shootout (₹45-65K/event), Corporate Retainer (₹1,000/hr/seat B2B)
- Updated: [[racesims-drive-train-compete]] DRIVE table to reflect new group products
- Updated: [[racesims-chennai-flagship]] — added contradiction callout: centre is 8 seats (7 rally + 1 motion), P&L was built on 6-rig assumption. P&L recalibration pending.
- Domain: racesims

## [2026-05-29] edit | Pricing restructure — master rate card + 5 page updates
- Created: [[racesims-master-rate-card]] (new single source of truth for all pricing)
- Updated: [[racesims-drive-train-compete]], [[racesims-motorsport-academy]], [[racesims-chennai-flagship]], [[racesims-naming-architecture]], [[racesims-championship-architecture]]
- Key changes: session-based pricing (30min ₹750 · 1hr ₹1,250) · Race Academy ₹20K · Rally School ₹25K · Real Drives added to TRAIN · Championship Pass rig-time policy clarified · 4 contradictory rate tables eliminated
- Pass 8/16 model (monthly vs prepaid) still provisional — confirm with Thambu
- P&L v3.2 blended rate (₹750/hr) pre-dates new pricing; recalibration needed separately
- Domain: racesims

## [2026-05-29] edit | Chennai execution plan + final floor plan/3D
- Created: [[racesims-chennai-execution-plan]] (12-section build-and-launch plan, Variant C)
- Updated: [[racesims-chennai-premium-baseline]] floor-fit section (final layout)
- Deliverables in `racesims/`: floor plan (final — entrance on lift-lobby wall, coffee+reception cluster, 2 washroom doors kept clear, glass training/academy room, L-shape 8 rigs), interactive 3D model, branded plan HTML, live Excel
- Layout corrected over 3 iterations per Thambu's PDF markups (entrance, then coffee clear of washroom, then 2 washroom doors)
- Domain: racesims

## [2026-05-29] ingest | Chennai Premium Baseline Forecast
- Source: [[2026-05-29-chennai-premium-baseline-forecast]]
- Created: 3 new pages — [[racesims-chennai-premium-baseline]], [[uday-hyderabad]], [[2026-05-29-chennai-premium-baseline-forecast]]
- Updated: [[racesims-chennai-flagship]] (contradiction callout + backlink), domain index, hot
- Domain: racesims
- Note: conservative sim-only forecast anchored to real dealer data. Y1 EBITDA ₹11.7L (brand-lands), break-even 13.8%, payback ~19-22mo. Flags v3.1 deck occupancy (30-68%) as 1.5-3× Uday's real ~20%. Live model in racesims-chennai-premium-forecast.xlsx (gitignored).

## [2026-05-19 EVE] ingest | Multi-centre rollout deck COMPLETE (slides 5-13 built)
- Updated: `racesims-multi-centre-rollout.html` + `.pdf` — full 13-slide Series A deck
- **Deck structure (locked):**
  - Slide 1: Cover · National Network · Y2-Y5 rollout
  - Slide 2: What is RaceSims? · 3 pillars (Equipment, Pedigree, Integration)
  - Slide 3: Where in 3 years? · Universal motorsport curiosity → numbers
  - Slide 4: Per-centre revenue model · Drive · Train · Compete (3 columns)
  - **Slide 5: Chennai proof point** · ₹95L / ₹4.91cr 5Y EBITDA / 26mo payback / 5.2× / mini P&L table
  - **Slide 6: Two formats** · Boutique (Chennai template, ₹95L, 67% margin Y5) vs Mega Flagship (4-6K sqft, ₹4-5cr capex, 30-35% margin)
  - **Slide 7: 5-year rollout timeline** · Y1 Chennai → Y2 Mumbai Mega + 5 boutique → Y3 BLR+DEL Megas + 8 boutique → Y4 +3 Megas + 12 → Y5 saturation 43 centres
  - **Slide 8: Network economics Y5** · 43 centres · ₹105cr network · ₹83cr RaceSims direct · ₹33cr EBITDA · full breakdown table
  - **Slide 9: Capital roadmap** · ₹56.95cr 5Y total · ₹20-25cr Series A first 30 months · operating cash funds rest after Y3
  - **Slide 10: Franchise economics** · Franchisee Y1 ₹1.2cr → 5Y ₹4.3cr EBITDA · 30mo payback · RaceSims books ₹85L per franchise over 5Y
  - **Slide 11: Five moats** · Pedigree · Integration · Cost · Network · Brand (deeper than cover-slide treatment)
  - **Slide 12: Valuation case** · ₹1,000-1,300cr Y5 base case · ₹1,250-1,650cr with adjacencies · IPO / strategic / PE / private exit options
  - **Slide 13: The Ask** · ₹15-20cr Series A · use of funds + what it returns + 90-day timeline · closing line: *"Help us put the next great Indian driver on a real grid by 2029"*
- **PDF: 13 pages · 984 KB · zero overflow on any slide**
- All 4 investor decks now visually consistent (cream + RS Red + Montserrat)
- **Investor pack ready:**
  - `racesims-investor-narrative.pdf` (A4, pre-meeting send)
  - `racesims-multi-centre-rollout.pdf` (13 slides, meeting opener + full pitch)
  - `chennai-centre-proposal.pdf` (12 slides, proof-point companion)
  - `hotlap-pool-structure.pdf` (5 slides, dealer brief context)
- Domain: racesims

## [2026-05-19 PM] ingest | Multi-centre deck Slide 4 — Per-centre revenue model (Drive · Train · Compete)
- Updated: `racesims-multi-centre-rollout.html` + `.pdf` — added Slide 4 (now 4 total slides; previously 3)
- **Slide 4 structure:** 3-column grid aligned to [[racesims-drive-train-compete|Drive · Train · Compete]] brand framework — brand structure = revenue structure
- **DRIVE column** *(the volume)*: Per-session rigs (Open Sessions ₹500-1K/hr · Pass 8/16 · Motion premium ₹1.2-2.5K) · Group/Corporate (team days ₹40-60K · birthdays · private nights · brand activations) · Café+Merch+Content
- **TRAIN column** *(the depth)*: Motorsport Academy (Initiation ₹8K → Pro Track) · Pro Driver Training B2B · **Real Driving Experiences** (NEW · highlighted card)
- **COMPETE column** *(the brand engine)*: Championship participation (round entry · season pass · qualifying) · **Championship operating profits** (centre share of hosted rounds + sponsorship + broadcast + content)
- **Real Driving Experiences pricing locked (Option B):**
  - ARKA Real Drive — customer ₹1.75L · our cost ₹1L · **₹75K margin · 43% GM**
  - Buzzing Hornet Real Drive — customer ₹2.25L · our cost ₹1.25L · **₹1L margin · 44% GM**
  - Sold individually + corporate packages
  - Volume: 1-3 packages/month per mature centre → ₹20-80L annual experience revenue per centre
- **NEW REVENUE STREAMS added explicitly:** Pro Driver Training (B2B), Real Driving Experiences (ARKA + Buzzing Hornet bridge), Championship operating profits (centre share of HQ-level revenue)
- **Scope guard:** Slide intentionally excludes RaceSims trading/distribution streams (hardware sales, dealer wholesale, B2B installations, 3D printing accessories, Hot Lap pool management) — those are HQ trading business, not centre revenue. This slide is **centre-only**.
- Closing line: *"₹2.5cr Y5 revenue per mature centre · multi-stream resilience · Compete compounds with every new centre."*
- Domain: racesims

## [2026-05-19] ingest | Chennai Flagship v3.1 — rent locked at ₹1.75L
- Source: continuation of [[2026-05-18-chennai-flagship-proposal-v2]]
- Updated: [[racesims-chennai-flagship]] (full v3.1 P&L cascade), Chennai proposal deck slides 6/7/8/10/11/12
- **Single change:** rent ₹1.25L → **₹1.75L** (conservative budget for premium 2,000 sq ft location)
- **Cascaded impacts:**
  - Y1 monthly opex (incl COGS): ₹3.98L → **₹4.48L**
  - Annual Y1 opex: ₹47.7L → **₹53.7L**
  - Hard capex (incl ₹10.5L deposit at 6 mo × ₹1.75L): ₹69.32L → **₹72.32L**
  - Working capital (5 mo): ₹19.9L → **₹22.4L**
  - **Y1 cash need: ₹89L → ₹95L**
  - Y1 EBITDA: ₹19.7L → ₹13.7L (margin 29% → 20%)
  - 5Y cumulative EBITDA: ₹5.24cr → **₹4.91cr**
  - 5Y cumulative PAT: ₹3.53cr → **₹3.28cr**
  - Payback: 24 mo → **26 mo**
  - Capital multiple: 5.9× → **5.2×**
  - Y5 EBITDA margin: 70% → **67%**
  - Break-even: 21% blended → **24% blended** (6-pt cushion vs Y1 plan 30%)
- Network Year 3 projections (17 centres · ₹40cr · ₹8-10cr EBITDA · ₹250-400cr valuation) unchanged — aggregate ranges, not Chennai-specific
- 3-slide opener + investor one-pager don't reference Chennai-specific cash need (only ₹65L→₹39L rig cost edge, which is unchanged); re-exported for cleanliness
- Domain: racesims

## [2026-05-18 EVE] ingest | RaceSims 3-Year Vision — investor narrative LOCKED (v4)
- Created: [[racesims-3-year-vision]] — full v4 narrative concept page (~850 words, humble/partnership-led/story-first)
- Output artefacts:
  - `racesims/marketing/decks/racesims-investor-narrative.html` + `.pdf` (A4 standalone one-pager for pre-meeting investor reading)
  - `racesims/marketing/decks/racesims-multi-centre-rollout.html` + `.pdf` (3 slides: Cover + What is RaceSims + Where in 3 years — opening of multi-centre rollout deck)
- **Tone principles locked:** humble (no put-downs of existing motorsport ecosystem), partnership-led (credits ARKA, INRC, Polo Cup, MRF, JK Tyre), additive not disruptive, story-first then numbers
- **Three pillars locked:**
  1. The equipment — DD wheelbases, motion, load-cell pedals affordable for commercial India deployment
  2. The pedigree — Thambu race engineer at [[arka-motorsports|ARKA]] (130+ titles), Academy graduates earn real seats via ARKA Rally Drive / Polo Cup
  3. The integration — **direct distributor for both Conspit AND VNM** (corrected from earlier "VNM via Uday" misreading); ₹65L spec built for ₹39L; full stack under one brand
- **3-year vision:** 17 centres, ₹40cr network revenue, ₹25-28cr RaceSims direct, ₹8-10cr EBITDA, ₹250-400cr valuation, 100K+ customers, 2K+ Academy graduates, first Academy graduate in real INRC/Polo Cup seat
- **Closing line:** *"The next great Indian driver will tell their story starting with three words: 'I started at RaceSims.'"*
- 4 narrative drafts iterated before lock — v1 too confrontational, v2 used "private club" framing that risked offending motorsport partners, v3 still too disruptor-toned, v4 humble + story-first
- Domain: racesims

## [2026-05-18 PM] ingest | Chennai Flagship v3 — overhead line audit + 5Y P&L re-cascade
- Source: continuation of [[2026-05-18-chennai-flagship-proposal-v2]] (source page updated in-place)
- Updated: [[racesims-chennai-flagship]] (full v3 P&L + opex tables + cumulative cash position)
- **Material overhead corrections (line-by-line audit):**
  - Rent: ₹1.5L → **₹1.25L** (found 2,000 sq ft place at ₹1L, modelled at ₹1.25L for safety)
  - Electricity: ₹1L → **₹50K** (honest math with 4 × 1.5T 5-star inverter ACs + realistic PC load curves — not 800W constant. Previous ₹1L over-estimated)
  - Maintenance: ₹25K → **₹7.5K** (rig preventive ₹1K not ₹10K; CCTV upkeep dropped; realistic line items)
  - Software: ₹5K → **₹3K** (Zoho Books + Google Workspace billed elsewhere already)
  - Music & content licence: **REMOVED** (₹3K → ₹0, no licensed background music)
  - Insurance: ₹4.2K → **₹7.5K** (proper ₹50L+ asset cover + public liability + business interruption)
  - Payment gateway: ₹3K flat → **2% of digital revenue** (scales with utilisation; Y1 ₹8.4K → Y5 ₹35.7K)
  - Marketing: **₹35K Y1 launch boost, taper to ₹25K from Y2** (was flat ₹25K)
- **Y1 monthly opex: ₹4.63L → ₹3.84L** (-₹79K/month, -₹9.5L/year)
- **Y1 cash need: ₹92L → ₹89L** (₹69L capex + ₹20L WC at 5 mo × ₹3.98L including café COGS)
- **5Y cumulative EBITDA: ₹4.74cr → ₹5.24cr** (+₹50L, materially better despite rent precision)
- **5Y cumulative PAT: ₹3.14cr → ₹3.53cr**
- **Payback: 26 mo → 24 mo** (end of Y2, was mid-Y3)
- **Capital multiple: 5.1× → 5.9×**
- **Y5 EBITDA margin: 65% → 70%**
- **Break-even: 28% → 21% blended** (Y1 plan 30% → 9-pt cushion, was 2-pt)
- Deck updated: cover, slide 6 (Capex), 7 (Operations), 8 (Revenue), 10 (P&L), 11 (Returns), 12 (Ask). PDF exported, zero overflow on any slide.
- Domain: racesims

## [2026-05-18] ingest | RaceSims naming architecture LOCKED — centre = "RaceSims · Chennai", programme inside = "The Motorsport Academy"
- Created: [[racesims-naming-architecture]] (full brand architecture rationale), [[racesims-motorsport-academy]] (the structured training programme)
- Updated: [[racesims-chennai-flagship]] — renamed from "Flagship Experience Centre" to "RaceSims · Chennai (Flagship Centre)" + naming architecture section added
- **Key decision: Academy is the PROGRAMME, not the PLACE.** Earlier candidate "RaceSims Motorsport Academy" as the whole-centre name was rejected because it risked gating out the casual college-kid funnel that's already converting via Instagram → phone calls. Apple Store pattern adopted: front door = "RaceSims · Chennai" (low-friction), inside = "The Motorsport Academy" (serious upsell tier).
- **Customer architecture locked:**
  - Front door: `RaceSims · Chennai` (storefront/Google/IG bio)
  - Open Sessions (drop-in, ₹750-1,000/hr)
  - Pass 8 / Pass 16 (memberships)
  - Experiences (Team Day, Birthday, Corporate Track Day)
  - **The Motorsport Academy** (Initiation ₹8K · Race Academy ₹14K · Rally School ₹16K · Pro Track bespoke · Tuner Lab ₹28K corporate)
  - RaceSims Championship (competitive arc)
  - The Ladder (sim-to-seat pathway → ARKA Rally Drive / Polo Cup)
- **Strategic upsides:** preserves casual phone-call funnel, defensible premium pricing on Academy programmes, sponsor magnetism for academies (MRF/JK Tyre/Castrol-class), Champions become "Academy graduates" (brandable outcome), franchise sells as "academy network" not "sim café chain"
- Domain: racesims

## [2026-05-18] ingest | Chennai Flagship Proposal v2 — investor-grade single-centre business case
- Source: [[2026-05-18-chennai-flagship-proposal-v2]] (long deep-dive session, 11-slide deck delivered)
- Created: [[2026-05-18-chennai-flagship-proposal-v2]]
- Updated: [[racesims-chennai-flagship]] — **v2 numbers locked, supersedes May 17 v1** with `> [!contradiction]` callout
- Key decisions locked (v2):
  - **₹92L Y1 total** (₹69L hard capex + ₹23L WC, 5 months) — was ₹66-68L v1
  - **Rigs ₹39.09L** — 5 Rally @ ₹5,84,900 + 1 Motion @ ₹9,84,900 (Conspit/VNM at distributor cost, from `RaceSims Outlet.xlsx`)
  - **Built-in equity ₹26-31L** — rigs retail ₹65-70L vs. our ₹39L cost
  - **Lean 4-person team** — Senior Lead ₹35K + 2 multi-role ₹20K + housekeeping ₹5K. CA outsourced ₹7K. No security guard, no in-house accountant/marketing
  - **Monthly opex ₹4.63L** — rent ₹1.5L premium location (6 mo deposit)
  - **Utilisation ramp 30/50/60/65/68** (base case, revised down from aggressive 30/50/65/70/72)
  - **Blended rate ramp ₹750-1,100** with full rate-card decomposition
  - **Ancillary 14% → 28% of rig revenue** (merch recalibrated to 3-4% walk-in attach)
  - **5Y cumulative EBITDA ₹4.74cr, payback 26 months, 5.1× capital multiple, Y5 65% margin**
- Output artefacts: `racesims/marketing/decks/chennai-centre-proposal.html` + `.pdf` (RaceSims editorial theme — cream + RS Red + Montserrat)
- Git: commits `47e6a3d` (v2 initial) + `d357a56` (merch recalibration)
- Domain: racesims

## [2026-05-17] ingest | RaceSims Chennai Flagship — full strategic plan (positioning, championship, ladder, VMS, India saturation, revenue stack)
- Source: [[2026-05-17-racesims-chennai-flagship-planning]] (multi-session planning conversation, ~12K words)
- Created: [[racesims-chennai-flagship]] (₹66L investment, 6 seats, 1,800 sqft, ₹32L Y1 EBITDA, 17mo payback), [[racesims-drive-train-compete]] (positioning framework), [[racesims-championship-architecture]] (4-layer competition structure + season + Grand Final), [[racesims-the-ladder]] (sim-to-reality pathway), [[racesims-vms-build]] (custom software platform, replaces ₹30K/mo SaaS), [[racesims-india-saturation-plan]] (43-centre 5-year network, ₹1,000-1,300 cr valuation), [[racesims-revenue-stack]] (6 adjacencies: AMC, Junior Academy, Merch, Coaching Academy, Karting Academy, College Curriculum)
- Updated: [[arka-motorsports]] (Real-Drive Prize partnership, Rally School endorsement, recommendation to formalise exclusivity contract)
- Key decisions locked: 6 seats Day 1, lean industrial fit-out, full café, VMS built in-house (saves ₹3.6L/year/centre), ARKA + Polo Cup as Real-Drive prizes, Drive·Train·Compete positioning, two parallel championships (Circuit on LMU+iRacing, Rally on AC Rally+Richard Burns Rally)
- Director ([[thambu]]) remuneration ₹75K/month from Day 1 (no deferral). Working capital ₹15.80L (3 months).
- Strategic context: India saturation as base case (Path B); global hyper-scale (₹6,000-12,000 cr valuation) discussed but deferred to Year 4+
- Domain: racesims

## [2026-05-17] ingest | Reddit AMA Draft + Conspit Import Letter + ARKA Calculator Inventory
- Source: [[2026-05-17-reddit-ama-draft]], [[2026-05-17-conspit-import-justification]], [[2026-04-19-arka-calculator-inventory]]
- Created: [[2026-05-17-reddit-ama-draft]], [[2026-05-17-conspit-import-justification]], [[2026-04-19-arka-calculator-inventory]]
- Updated: [[arka-motorsports]] (Engineering Tools section)
- Security: discord_backup_codes.txt added to .gitignore
- Domain: racesims

## [2026-05-17] ingest | RaceSims GMC & SEO full audit — schema stack, Judge.me, image alt text, collection SEO
- Source: [[2026-05-17-gmc-seo-optimisation]]
- Created: [[2026-05-17-gmc-seo-optimisation]]
- Updated: [[seo-technical-fixes]] (marked 8 items done, updated open backlog)
- Updated: [[hot]] (new latest entry)
- Domain: racesims

## [2026-05-11] ingest | Mindwise technical — CTD module status, NDAs, security flags documented
- Source: [[2026-04-13-mindwise-raw-dump]]
- Updated: [[ctd-module-2]] (status breakdown: modules 2.4/2.5/2.7 completed, 1/2.1-2.3/2.6/3-5 pending), [[domains/mindwise/_index]] (legal & NDA section added)
- Created: [[meta/security-flags]] (Razorpay credentials + 2FA backup codes documented with warnings)
- Domain: mindwise

## [2026-05-11] ingest | RaceSims commercial leads — IPL team pipeline + Araya Airport configs + Techxhub/Fanatec pricing
- Source: [[2026-04-13-racesims-raw-dump]]
- Created: [[ipl-team-pipeline]]
- Updated: [[araya-airport]] (Config A/B pricing), [[techxhub]] (Fanatec + Playseat March 2026 pricing)
- Domain: racesims

## [2026-05-11] ingest | RaceSims technical detail — GT Pro Rig BOM, CAN bus R&D specifics, VRH distribution contract terms
- Source: [[2026-04-13-racesims-raw-dump]]
- Updated: [[gt-pro-rig]] (BOM costing entry/mid/pro + PC builds), [[can-bus-telemetry]] (Suzuki Baleno/Jason + AiM C125 iterations), [[virtual-racing-hub]] (distribution contract July 22 2025 + 24-month non-circumvention)
- Domain: racesims

## [2026-05-07] update | Catalogue: Tesla model + VNM Lite default + Conspit cockpits out of production + Commercial section added
- Updated: [[racesims-catalogue]], [[kit-pricing]]
- **Catalogue model changed from 4-tier to Tesla-style.** After psychology brainstorm with Thambu (Apple vs Tesla product strategies), landed on Tesla model: ONE default Sim + Quick Start presets (Starter / Sim / Pro) + per-component configurator with explicit price deltas + cross-tier add-on packs.
- **New Sim default total: ₹6,50,998** (was ₹6,68,997). Pedal default switched from Conspit CPP Lite to **VNM Lite Pedal (₹42,000)** per Thambu — saves customer ₹17,999 + makes default more accessible. Customer can swap up to CPP Lite (+₹17,999), CPP EVO V2 2-pedal (+₹37,999), or CPP EVO V2 3-pedal (+₹53,999) inline in the configurator.
- **Conspit formula cockpits OUT OF PRODUCTION** (per Thambu — Conspit not producing currently). FP-Lite Formula, FC Formula, FC PRO, FC PRO MOTION removed from active catalogue but **pricing retained in [[kit-pricing]] with OUT OF PRODUCTION marker** — will return when Conspit resumes. Tier 4b path (FC PRO MOTION turnkey) removed from preconfigured bundles.
- **Pro preset (Tier 4 equivalent) now uses VNM 3DOF Motion + GT Sim Cockpit only** as the motion path. Total still ₹17,03,999.
- **NEW: Commercial / B2B section** added. Covers existing customers ([[online-instruments]] Thar variant, [[araya-airport]] airport lounge) + the **enclosed rig in R&D** — RaceSims-developed purpose-designed enclosed simulator cabin for commercial environments (corporate showrooms, hospitality, retail experience zones). Status: R&D, available for early-customer development partnerships, ~₹35-50L+ reference order of magnitude. Adjacent path: Mahindra Thar half-cut variant (already shipping per Online Instruments).
- **Sample customer journeys (7) rewritten** with verified math against new Tesla model. All journey totals double-checked with Python before commit.
- **Configurator structure documented** per component: each component shows the picked default with inline alternatives + explicit price deltas (upgrades and downgrades visible together), so newcomers see "−₹10,000" entry options without hunting through a separate "budget" section.
- Domain: racesims

## [2026-05-04] update | Catalogue: Simagic removed from active quotes + bundles restructured for consistency
- Updated: [[racesims-catalogue]], [[kit-pricing]], [[domains/racesims/_index]], [[hot]]
- **Simagic removed from active default quotes** (per Thambu — same treatment as Moza). Note: [[simagic-distributor|South India exclusive distributor agreement is RETAINED contractually]], products available on customer-specific request only. Simagic Alpha Mini, Alpha, Alpha U wheelbases + GT NEO wheel pulled from default lineup.
- **Bundles restructured for consistency** — addressed the inconsistencies the prior bundle structure had:
  - Every tier now has **ONE default per component** (no more "X or Y" choices in the locked BOM)
  - Tier price is a **single number** quotable as-is (Tier 1 ₹5,65,498 / Tier 2 ₹6,68,997 / Tier 3 ₹9,43,999 / Tier 4 ₹17,03,999 / Tier 4b ₹35,57,999)
  - At-a-glance comparison table across all 4 tiers — sales conversation has clear answer to "what's the next tier up?"
  - Added Cross-tier upgrade matrix (audio, haptics, wheels, pedals, wheelbases, monitors, cockpits) — modifications happen here, not in tier definition
  - Added Cross-tier add-on packs (Rally Pack ₹39k, Shifter Pack ₹39k, Premium Handbrake +₹500, Cabin Comfort ₹6k, Office Integration ₹12.5k, Branding Pack ₹4k, Immersion Pack ₹8k)
  - Tier 1 renamed from "RALLY SETUP" to "STARTER" — rally is now a cross-tier pack, not a tier name (rally needs handbrake which Tier 1 didn't include)
  - Tier 4 wheelbase locked to VNM Supreme 25Nm (was "Conspit Platinum or VNM Xtreme") for VNM-stack consistency with the motion kit
  - All sample customer journeys rebuilt against new tier + upgrade structure with verified math
- Domain: racesims

## [2026-05-04] update | RaceSims catalogue refreshed with verified racesims.in pricing — Moza removed, VNM pedals/shifter/handbrake added, Simagic added
- Source: live racesims.in store via WebFetch (homepage + collections/cockpits + collections/racing-simulator-display + collections/all)
- Updated: [[racesims-catalogue]], [[kit-pricing]], [[domains/racesims/_index]]
- **Removed:** all Moza products (per Thambu — RaceSims is not carrying Moza for now). Moza R9 V2 wheelbase removed from lineup; Moza references removed from supplier list, brand list, and connections.
- **Added (verified from racesims.in):**
  - Wheelbases: [[simagic-distributor|Simagic]] Alpha Mini (₹64,999), Alpha (₹80,000), Alpha U (₹99,000); [[vnm]] Direct Drive Supreme 25Nm (₹1,15,000)
  - Wheels: [[simagic-distributor|Simagic]] GT NEO (₹40,000), [[vnm]] GT Steering Wheel V1 (₹59,999), [[conspit]] 310 APEX (₹39,999)
  - Pedals: [[vnm]] Lite Pedal (from ₹42,000) — per Thambu's request
  - Shifters/handbrakes: [[vnm]] Sequential/H-Pattern Shifter (₹35,000), [[vnm]] 1.5 Rally Handbrake (₹35,000) — per Thambu's request
  - Cockpits: [[conspit]] FP-Lite Formula Style (₹1,15,000), FC Formula (₹8,55,000), FC PRO (₹10,50,000), **FC PRO MOTION (₹24,95,000 — flagship)**
  - Monitor stands: 4 RaceSims-built variants (₹8k–30,500)
  - Seats: 4 RaceSims-built (Premium Recliner ₹29,500, Sport Recliner ₹36,500, Pro Fixed Back ₹39,500, Pro X-Large ₹45,500)
  - Monitors: full Gigabyte lineup (GS32QC, G34WQC, GS27F, CO49DQ ₹1,34,500 OLED)
  - Motion: VNM 3DOF Motion Kit (₹6,00,000)
  - Accessories: Mouse Tray, PC Stand, HD Castors, Handbrake/Shifter Mount, Keyboard Tray (₹500–7,500)
  - Conspit pre-priced bundles: Apex Bundle ₹1,27,500 + 8 wheelbase+QR+wheel combos
- **Updated pricing on existing items:** Conspit Ares Apex 8Nm (was wiki ₹69,950 → racesims.in ₹49,999), 290GP (was ₹79,950 → ₹69,500), MAX-01 (was ₹84,950 → ₹76,500), CDR QR (was ₹7,500 → ₹6,500), 300GT (was ₹53,950 → ₹49,999), CCP Lite/EVO V2 grouped under "from" pricing
- **New Tier 4b** added: Conspit FC PRO MOTION turnkey path (~₹35L+) alongside the existing VNM Motion on RaceSims cockpit path (~₹14-15L)
- Domain: racesims

## [2026-05-04] catalogue | Full RaceSims catalogue created with preconfigured bundles
- Source: [[racesims-catalogue]]
- Created: 1 page — [[racesims-catalogue]] (concept, full product line + 4 preconfigured kit bundles)
- Updated: [[domains/racesims/_index]], [[hot]], this log
- **Coverage:** all RaceSims products organised in race-engineer build-flow order — controls → cockpit & seat → display & compute → audio + haptics → 3D-printed accessories → preconfigured bundles
- **Bundles:** Tier 1 Rally (~₹2.5L), Tier 2 Formula (~₹4-5L), Tier 3 Formula Cockpit (~₹5-6L), Tier 4 Formula Cockpit with Motion (~₹11L+) — each with full BOM + target customer profile
- **Add-ons section:** audio upgrades, haptics upgrades, wind sim, Hue lighting, branded accessories — works with any tier
- **Sample customer journeys:** four illustrative profiles showing how the catalogue applies to typical customer types (newcomer, regional racer, F1-shifter, esports/commercial)
- Pricing discipline: every price marked `[verify]` where not directly verified against pricelist
- Cross-links: [[kit-pricing]], [[gt-pro-rig]], [[racesims-audio-tiers]], [[racesims-accessory-catalogue]], [[arka-motorsports]], [[online-instruments]], [[araya-airport]]
- Domain: racesims

## [2026-05-04] decision | Audio tiers locked (mid + high-end + haptics) — full sales-spec reference
- Source: [[racesims-audio-tiers]]
- Created: 1 page — [[racesims-audio-tiers]] (concept, full sales reference for both audio tiers)
- Updated: [[racesims-accessory-catalogue]] (added Sprint 4 with SKUs 11 + 12 + 13 = audio tier mount brackets); `racesims/technical/3d-printing/accessories-catalogue-brief.md` (corresponding canonical doc update); [[hot]]; [[domains/racesims/_index]]; this log
- **Mid tier locked:** Logitech Z906 + Creative AE-5+ + Razer Black Shark V2 Hyperspeed Wireless = ~₹70-80k. AE-5+ rationale shifted from "previous mobo had no optical" to "current AM5 boards often lack optical + SBX adds sim-racing value"
- **High-end tier locked:** Sonos Beam Gen 2 + Sub Mini + 2× Era 100 (default) OR Samsung HW-Q990F (alternative) + Audeze Maxwell + motherboard audio (no sound card) + 5-port gigabit switch = ~₹1,90k. Arc Ultra + Sub Gen 3 +₹60k for multi-purpose rooms.
- **Haptics tier locked (standard, applies to both):** 2× Dayton BTS-1 + Nobsound 2-ch USB DAC + custom mounts = ~₹17k
- **Custom mount SKUs added to 3D-printing catalogue** (Sprint 4): BTS-1 mount kit, Sonos Era 100 rig mount, universal soundbar shelf — each high-end audio tier sale generates ₹4-6k in mount-SKU revenue
- **PC build context verified:** 9700X / 9800X3D both have RDNA 2 iGPU (verified from AMD product spec); RTX 5070 Ti has HDMI 2.1 + eARC for Atmos to Sonos; 4-monitor case handled by motherboard HDMI from CPU iGPU
- Domain: racesims

## [2026-04-23] ingest | 3D-printing capex decision + accessories catalogue brief + Online Instruments pivot
- Source: [[2026-04-23-3d-printing-capex-decision]]
- Raw file: `racesims/technical/3d-printing/accessories-catalogue-brief.md`
- Created: 4 pages — [[2026-04-23-3d-printing-capex-decision]] (source), [[online-instruments]] (entity), [[in-house-3d-printing]] (concept), [[racesims-accessory-catalogue]] (concept)
- Updated: [[domains/racesims/_index]], [[hot]], this log
- Capex recommendation: Bambu Lab X1 Carbon Combo + accessories, **~₹1,55,000**. Payback ~3 mo steady / ~6 mo with ramp, Year 1 ROI ~320%.
- 10-SKU catalogue plan across 3 two-week sprints — phone holder, cup holder, profile caps, logo badge, LED channel, Hue holder, [[conspit]] 310 Apex branded side plates, bass-shaker enclosure, wind-sim fan housing, custom shift knob.
- Also logged the [[online-instruments]] pivot: client dropped the custom-enclosure design, wants a Mahindra Thar Roxx cut in half as the simulator shell. Transport spec PDF shipped to client (`racesims/technical/partners/Online Instruments/Online_Instruments_Transport_Spec.pdf`).
- Domain: racesims

## [2026-04-14] cleanup | Lint follow-through (all issues from 2026-04-14 lint report addressed)
- Triggered by: [[meta/lint-2026-04-14]]
- **Critical fixes (both complete):**
  - Deleted empty `sources/2026-04-13.md` stub (0 bytes, the wiki's only true orphan)
  - Updated [[overview]] from "two businesses" to three — added Prenatal (Aishu's brand) alongside Mindwise + RaceSims
- **Warning fixes (all complete):**
  - Stripped 6 backslash-escape typos from wiki links across [[customer-pipeline]] and [[cdri-08-global-brands]] — `\|` inside `[[target\|alias]]` breaks the link; restructured to put the alias text outside the wikilink
  - Created 7 missing entity stubs: [[fanatec]], [[playseat]], [[tikitar]], [[guhan]], [[rohub]], [[qubic-systems]], [[ajit-kumar-racing]]
  - Linked the new [[tikitar]] and [[ajit-kumar-racing]] stubs from [[customer-pipeline]] where they were plain-text
  - Trimmed [[hot]] from 729 → 547 words by dropping the oldest April 12 ingest details (already captured on entity pages) and compressing the lint entry
- **Regulatory contradictions resolved by [[thambu]]:**
  - FSSAI dosage: **two capsules a day for adults, after breakfast** — updated [[fssai-label-regulatory-text]] (contradiction callout converted to "Contradiction resolved" note). Any packaging drafts still showing "one capsule" need correction.
  - LMC registered office: **Chennai 600083** (NEW NO.22 / OLD NO.2, First Cross Street, Second Avenue, Ashok Nagar) is authoritative. The 600085 postcode in the Dec 2023 barcode subscription letter is a typo. Updated [[lumen-marketing-company]] and [[2026-raw-mindwise-unique-files]].

## [2026-04-14] lint | Second lint pass (11 ingests since 2026-04-12)
- Report: [[meta/lint-2026-04-14]]
- Total pages: 197 (up from ~180)
- Health: strong — zero pages over 200-line limit, zero unbacked Mindwise claims, 1 orphan (empty stub)
- Critical: delete empty `sources/2026-04-13.md` stub; update [[overview]] to reflect 3 businesses (still says "two")
- Warnings: 7 missing entity pages (fanatec, playseat, tikitar, guhan, rohub, qubic-systems, ajit-kumar-racing); 6 backslash-escape typos in wiki links; hot.md grew to 729 words (target ~500)
- Flagged for human: FSSAI dosage contradiction ("one capsule" vs "two capsules"), LMC Chennai address mismatch — both regulatory liabilities

## [2026-04-19] update | Realistic launch budget — Rs.70-90L (Tier 2)
- Aishu pushed back on the original under-budgeted proposal, specifically on marketing costs being unrealistically low.
- **Updated proposal Capital + Timeline section** with the realistic Tier 2 budget (Rs.70-90L) breakdown across:
  - Build + setup: Rs.25-38L (entity, FSSAI, inventory, brand identity, packaging, photography, tech stack, logistics, insurance, legal)
  - Marketing 12-month runway: Rs.25-40L (performance ads, influencer, PR, content)
  - Founder/team runway: Rs.13-20L (lean team of 2-3 + working capital)
- **Updated Math Comparison table** to reflect realistic capital across all 3 launch options:
  - All 3 Day 1: Rs.95-115L
  - Edit For Two + Prenatal Day 1 (recommended): Rs.70-90L
  - Prenatal Only: Rs.40-50L
- **Pitch deck already aligned** at Rs.75-90L (Tier 2 ask). Now proposal matches.
- Regenerated The Edit Proposal India PDF + DOCX.
- Domain: prenatal

## [2026-04-17] decision | Brand manifesto locked + Entity reversal (LMC umbrella → own Pvt Ltd)
- **Brand manifesto LOCKED:** [[prenatal-brand-manifesto]] — "The wellness brand India was missing." Aishu selected the "missing brand" framing (Version 12 reworked) with couples-inclusive, gender-neutral wording and Ayurveda reframed as "different tradition" (not legally risky).
- Earlier "TTC is a team job" manifesto ([[prenatal-brand-manifesto-couples-equality]]) is marked SUPERSEDED — still true as a supporting value but too narrow as the brand's central idea.
- **Entity decision REVERSED:** The Edit will NOT operate under [[lumen-marketing-company|LMC]] umbrella. Will incorporate as its own independent Pvt Ltd — "The Edit Pvt Ltd" (working name). Reason: Aishu wants to protect LMC's existing operations (Mindwise, CDRI-08 licenses, royalties) from any liability exposure that The Edit might carry. Clean-slate entity also makes future equity allocation (gynaecologist co-founder) cleaner.
- **Cost + timeline implication:** Adds Rs.50K-1L + 2-4 months to launch prep. Build timeline now 18-20 months (was 16-18). Total launch capital now Rs.25-30L (was Rs.20-25L).
- **Proposal rebuilt:** The Edit Proposal India (.md, .pdf, .docx) all reflect new entity + new manifesto.
- Domain: prenatal

## [2026-04-14] decision | MAJOR — The Edit becomes a couples reproductive wellness brand
- **Created:** [[prenatal-brand-manifesto-couples-equality]] — the brand manifesto: "TTC is a team job. Men need to be equally invested."
- **Created:** [[prenatal-launch-architecture-scenario-d]] — locked launch architecture (Couples Bundle + Prenatal at Day 1, Postnatal Month 9-12)
- **Updated:** [[domains/prenatal/_index]] — manifesto + launch architecture noted at top
- **Updated:** [[hot]] — major pivot logged
- **Strategic shift:** The Edit is no longer just a prenatal brand. It's India's first couples reproductive wellness brand. Aishu articulated the equality insight unprompted.
- **Resource implications:** Rs.20-25L initial capital, 16-18 month build, TWO regulatory pathways (FSDU + Health Supplement)
- **Manufacturer outreach:** Tanishq + Brukem Gmail drafts being updated to reflect 3-SKU scope (was 1 SKU)
- Domain: prenatal

## [2026-04-14] decision | Brand name candidate: "The Edit"
- **Created:** [[prenatal-brand-name-the-edit]] — new concept page for the candidate brand name
- **Updated:**
  - [[domains/prenatal/_index]] — working brand name noted
  - [[hot]] — naming decision + LMC umbrella + India manufacturing + email drafts logged
- **Positioning clarified:** "Only what matters. No bullshit." Essentialism, not precision. Same conceptual-minimalism lane as Ritual, The Ordinary, Everlane, Aesop.
- **Rejected name: "Precision"** — means "exact measurement" not "nothing extra"; trademark gridlock with Precision Nutrition Inc.; cold/clinical vibe wrong for prenatal warmth
- **No existing "The Edit" prenatal brand found** in India/UK/US searches
- **Pending:** formal IP India trademark search (Class 5 + 30), domain availability check
- Domain: prenatal

## [2026-04-14] decision | Prenatal operates under Lumen Marketing Company umbrella
- Aishu decided to skip separate entity registration — will operate the prenatal brand under [[lumen-marketing-company|LMC]] initially
- **Tradeoffs acknowledged:** (1) LMC's FSSAI is for Health Supplements, not FSDU — will need category endorsement added; (2) liability mixing with Mindwise + CDRI-08 assets; (3) equity allocation for future gynecologist co-founder may need spin-out later
- **Net effect:** compresses 4 weeks + Rs.30K from launch timeline
- Updated: [[hot]]
- Domain: prenatal

## [2026-04-14] decision | Manufacture domestically in India (not overseas)
- Aishu considered Thailand manufacturing; analysis concluded domestic India is clearly better for this brand
- **Reasons:** brand thesis is "Indian women shouldn't have to import" — overseas manufacturing contradicts the founding story; 30%+ import duties + GST add 40-60% to landed cost; imported FSDU has slower regulatory pathway; MOQs higher overseas; longer lead times; QC + service friction
- Revisit only if: exporting to ASEAN markets (Year 3-5), or if India regulatory becomes hostile
- Domain: prenatal

## [2026-04-14] verification | Tanishq Boranutri prenatal SKU details + regulatory flags
- Aishu shared specific URL: https://tanishqlifecare.com/boranutri.php
- **Updated: [[tanishq-lifecare]]:**
  - Boranutri formulation extracted (22 ingredients, pregnancy + lactation positioning)
  - Full 41-SKU nutraceutical portfolio listed
  - **Flagged:** Boranutri's therapeutic claim ("reduces preterm birth + low birth weight") is FSSAI-prohibited → suggests DCGI drug license, not FSDU
  - **Flagged:** No DHA in Boranutri formula — gap vs Ritual standard
  - Verification questions expanded to 10, reprioritized
- Updated: [[hot]] with verification flags
- Domain: prenatal

## [2026-04-14] update | Tanishq prenatal capability confirmed
- **Updated:** [[tanishq-lifecare]] — Aishu confirmed Tanishq lists prenatals under their nutraceutical segment (international tab on website). This upgrades Tanishq significantly — they have actual prenatal capability, not just custom formulation.
- **Updated:** [[prenatal-contract-manufacturers]] — shortlist table now reflects confirmed prenatal experience for Tanishq.
- **Updated:** [[hot]] — pivot + confirmation logged.
- Domain: prenatal

## [2026-04-13] decision | Prenatal manufacturer pivot — Tanishq over Brukem
- **Created:** [[tanishq-lifecare]] — new top-pick manufacturer entity page
- **Updated:**
  - [[brukem-life-care]] — moved from top pick to runner-up status
  - [[prenatal-contract-manufacturers]] — shortlist reordered, decision rationale added
  - [[domains/prenatal/_index]] — manufacturer list updated
  - [[hot]] — pivot logged + bootstrap-vs-wait strategy discussion
- Domain: prenatal
- **Rationale:** Tanishq's USDA + EU Organic certifications align with the transparency-led lifestyle positioning. The brand story carries more weight than Brukem's prenatal track record + USFDA. 8 verification questions still pending before signing with Tanishq (most critical: FSSAI Central License must cover FSDU category).

## [2026-04-13] ingest | Prenatal Brand Strategy — New Domain Bootstrap
- Source: [[2026-04-13-prenatal-brand-strategy]]
- **Created: 13 new pages:**
  - [[domains/prenatal/_index]] — new domain index (third business)
  - [[aishwarya-chandrasekaran]] — Aishu, founder, Thambu's wife
  - [[ritual-benchmark]] — US prenatal brand benchmark ($250M+)
  - [[trimacare]] — main Indian competitor
  - [[brukem-life-care]] — top-pick contract manufacturer
  - [[prenatal-fsdu-regulatory]] — FSSAI FSDU regulatory framework
  - [[prenatal-gynecologist-cofounder]] — co-founder search strategy
  - [[prenatal-dtc-lifestyle-strategy]] — lifestyle vs pharma decision (LOCKED)
  - [[prenatal-launch-roadmap]] — 6-step launch plan
  - [[prenatal-contract-manufacturers]] — manufacturer shortlist
  - [[prenatal-efficacy-phases]] — phased clinical proof
  - [[2026-04-13-prenatal-brand-strategy]] — source page
- **Updated: 3 existing pages:**
  - [[thambu]] — added Aishu link, prenatal brand connection
  - [[index]] — added prenatal domain + concepts section
  - [[hot]] — added prenatal bootstrap entry
- Domain: prenatal (NEW)
- **First ingest for a new domain.** Aishu's prenatal brand now fully linked into the Obsidian brain.

## [2026-04-12] ingest | Raw Mindwise Unique Files (Packaging Regulatory, NDAs, Marketing, Technical)
- Source: [[2026-raw-mindwise-unique-files]]
- **Created: 4 new pages:**
  - [[fssai-label-regulatory-text]] — complete FSSAI-compliant label text for bottle (critical for outer box decision)
  - [[chemiloids-life-sciences]] — Vijayawada manufacturer, NDA for Terminalia chebula BPH product (second CSIR-CDRI license!)
  - [[aavishkar-oral-strips]] — Hyderabad manufacturer, NDA for Oral Disintegrating Strips format
  - [[2026-raw-mindwise-unique-files]] — source page
- **Updated: 4 existing pages:**
  - [[adam-ritson]] — full story: Parramatta rugby player, June 23 1996 injury at age 20, 14 surgeries, 1998 India visit, recovery after weeks on Bacopa. Now rugby coach in Australia.
  - [[lumen-marketing-company]] — added legal structure (Partnership Act 1932), GST (33AABFL1450E1ZZ), full name (Thambusamy T D), TWO CSIR-CDRI licenses, manufacturing partners, pre-Sorted vendors
  - [[product-range-expansion]] — added oral strip format (Aavishkar) and Dr. Miltons as capsule manufacturer
  - [[outer-cardboard-box-decision]] — added full FSSAI regulatory text inventory that must fit on bottle if box is dropped
- Domain: mindwise
- **Key revelations:**
  - **Lumen holds TWO CSIR-CDRI licenses** — Bacopa (CDRI-08) + Terminalia chebula (BPH), the second licensed Feb 17, 2019
  - **Oral Disintegrating Strips** explored as delivery format (NDA April 2023)
  - **Dr. Miltons Laboratories** (Puducherry) = capsule contract manufacturer
  - **FSSAI label says "hard gelatin capsule"** but current product uses HPMC vegetarian — discrepancy needs resolution
  - **FSSAI label says 1 capsule/day** but current packaging says 2 capsules/day — dosage contradiction
  - **Previous India brand was "Memory Sure"** (not just a generic earlier attempt)
  - **LMC GST confirmed:** 33AABFL1450E1ZZ
  - Most of the pre-Sorted marketing materials (framework, plan, email template) are superseded by Sorted brand strategy

## [2026-04-12] ingest | OneDrive Mindwise Folder — Packaging, Dibiz, Epaphra
- Source: [[2026-onedrive-mindwise-folder]]
- **Created: 5 new pages:**
  - [[cdri-55-brand-name]] — trademarked extract brand name (replacing CDRI-08 in consumer materials)
  - [[packaging-content-layout]] — 4-side bottle label layout (LOCKED Apr 8)
  - [[epaphra]] — podcast/content collaboration partner (April 6 meeting)
  - [[snigdha-singh]] — Dibiz Co-founder & CMO
  - [[2026-onedrive-mindwise-folder]] — source page
- **Updated: 8 existing pages:**
  - [[dibiz-solution]] — completely rewritten with 3 meeting summaries, pricing, scope, timeline
  - [[patco-pharmaceuticals]] — added mold costs (Rs.30K bottle + Rs.1L cap), confirmed dimensions (50x50x75mm), 4 color trials
  - [[semi-transparent-bottle]] — updated dimensions from April 8 call
  - [[ankita]] — expanded role: led April 8 packaging content call, proposed "brain food supplement"
  - [[website-development]] — Dibiz now likely website vendor at Rs.1.75L (vs Sorted's Rs.6L)
  - [[55-percent-bacosides]] — CRITICAL update: CDRI themselves said do NOT advertise 55%, use "optimum" instead
  - [[cdri-08]] — added CDRI-55 consumer brand name section
  - [[sorted-meeting-transcripts]] — added Meeting 11 (Patco) and Meeting 13 (April 8 packaging content)
- Domain: mindwise
- **Key revelations:**
  - **CDRI-55** is the new consumer-facing extract brand name (trademark being checked by Bhaskar)
  - **Dibiz essentially hired** at ~Rs.2.75-2.8L/month for growth marketing + social + website
  - **Remove "cruelty free"** from all packaging (product tested on animals)
  - **Remove "vegan"** — use "vegetarian capsules" instead
  - **Bottle dimensions confirmed:** 50x50mm base, 75mm height including cap
  - **Sorted engagement ending** end of April → Dibiz takes over execution in May
  - **Epaphra** exploring as brand ambassador/podcast partner (profit-sharing model)

---

**Older entries (Apr 11–13, 2026):** See [[meta/log-archive-2026-04-11-to-2026-04-13|log archive]] — covers wiki bootstrap, first 12 ingests, first lint pass, full lint cleanup.
