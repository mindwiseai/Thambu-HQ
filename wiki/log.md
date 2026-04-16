---
title: Wiki Log
type: meta
---

# Wiki Operation Log

Append-only chronological record of every ingest, lint, and major edit. **Newest entries at top.** Format: `## [YYYY-MM-DD] <operation> | <title>` so `grep "^## \[" log.md | head -20` shows recent activity.

---

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
  - [[aishwarya-chandrasekhar]] — Aishu, founder, Thambu's wife
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

## [2026-04-13] ingest | Gmail check (Apr 7-13) + Avantika split
- Created: [[dibiz-solution]] — Mumbai growth marketing agency, submitted content production + paid media proposal (Apr 7)
- Created: [[avantika-bajoria]] — separate person from [[avantika|Avantika Bhandari]], Adani/ITC background
- Updated: [[avantika]] — removed contradiction callout, added disambiguation note
- Updated: [[hot]] — latest state
- Domain: mindwise

## [2026-04-12] ingest | OneNote Notebook — External Meetings & Research (Nov 2025 – Mar 2026)
- Source: [[2025-11-to-2026-03-onenote-notebook]]
- **Created: 15 new pages:**
  - [[andrea-zangara]] — Bacopa science advisor, monograph author
  - [[pier-campanini]] — KeenMind ownership/Ginsana factory contact
  - [[indus-life-sciences]] — Bacopa formulation partnership (Vikash/Mani)
  - [[manu-bennur]] — early positioning meeting participant
  - [[sarathkumar-srinath]] — early positioning advisor
  - [[himani]] — project manager/freelancer
  - [[praveen]] — content/awareness contact
  - [[sagar-sali]] — Sorted team member
  - [[sfi-health]] — previous CDRI-08 global distributor
  - [[wellbeing-nutrition]] — aspirational brand reference
  - [[keenmind-agreement-expiry]] — 10-year SFI agreement expired Dec 2024
  - [[cdri-08-global-brands]] — 5+ brand names across global markets
  - [[southeast-asia-exclusion]] — 7 SE Asian countries excluded for Indus (LMC territorial protection)
  - [[bacopa-combination-formulations]] — Bacopa + DHA/Chlorella/Curcumin
  - [[brand-genesis-sorted]] — Dec 2 origin story of Sorted engagement
- **Updated: 12 existing pages:**
  - [[sorted-agency]] — added origin story, [[sagar-sali]], Blackstone background
  - [[manik]] — added Dec 2, Jan 6, Jan 30 meeting details
  - [[avantika]] — added Adani/ITC background, Bajoria surname contradiction
  - [[jaiman]] — added surname Khatri, Dec 2 meeting attendance
  - [[tanya-leeds]] — confirmed Strategy role from Jan 6 OneNote
  - [[cdri-08]] — added global brands, SFI, Andrea, Pier, Indus connections
  - [[positioning-shift]] — added Jan 30 collective feedback quotes
  - [[scary-drug-problem]] — added Jan 30 detailed perception quotes
  - [[semi-transparent-bottle]] — added Jan 30 visual direction details, Two Brothers reference
  - [[product-range-expansion]] — added Indus Dec 13 meeting, Himani Mar 16 sizing
  - [[shivendra-selvam]] — added Indus partnership management role
  - [[solusta-puducherry]] — added Indus/Solista Dec 13 connection (note: correct name is Solista)
- Domain: mindwise
- Covers 9 source sections from OneNote notebook (Nov 2025 – Mar 2026): Sorted meetings, KeenMind research, Indus partnership, Bacopa global map, Andrea Zangara, Pier Campanini, Sarathkumar positioning, Himani projects, Mindwise India ops

## [2026-04-13] ingest | Mindwise Full Raw Dump (WhatsApp + Meetings Catalog + Technical Catalog)
- Source: [[2026-04-13-mindwise-raw-dump]] (umbrella), [[2026-04-13-whatsapp-full-export]] (WhatsApp)
- **Created: 14 new pages:**
  - [[jaiman]] — original Sorted account manager (departed Jan 29)
  - [[shipra]] — co-presented content strategy Feb 12
  - [[mindcaps-proposal]] — Shivendra's trademark-able term proposal
  - [[marketing-budget-25l]] — ₹25 lakh annual marketing budget
  - [[elicura-bottle-reference]] — frosted bottle reference brand
  - [[product-range-expansion]] — kids Bacopa, Bacopa+, syrup confirmed
  - [[hero-hub-hygiene-framework]] — content strategy framework from Meeting 07
  - [[brand-brief-jan-2026]] — the foundational brief document
  - [[sorted-meeting-transcripts]] — catalog of all 11 meetings
  - [[scientific-document-library]] — 93+ research papers, COAs, clinical trials
  - [[life-essence-history]] — previous brand name before Mindwise
  - [[lumen-fssai-license]] — FSSAI license found in old creatives
  - [[2026-04-13-whatsapp-full-export]] — source page for WhatsApp chat
  - [[2026-04-13-mindwise-raw-dump]] — source page for entire ingest
- **Updated: 17 existing pages:**
  - [[sorted-agency]] — added [[jaiman]], [[shipra]], office address
  - [[aarti-samant]] — added discovery call details, content strategy context
  - [[manik]] — added execution roadmap, brand manager advice
  - [[binita]] — added packaging deep-dive strategic feedback
  - [[ankita]] — confirmed identity details from WhatsApp
  - [[avantika]] — full name Avantika Bhandari, Brand Manager JD sharing
  - [[tanya-leeds]] — confirmed Tanya Varma name, scheduling duties
  - [[pricing-strategy]] — added three pricing approaches from Mar 17
  - [[patco-pharmaceuticals]] — added discovery story, AceBlend reference
  - [[semi-transparent-bottle]] — added Elicura reference
  - [[website-development]] — added Mar 24 meeting details, Ahmedabad vendor
  - [[brand-manager-decision]] — added Manik's advice against Thambu
  - [[content-strategy-three-piece]] — added Hero/Hub/Hygiene framework link
  - [[your-unfair-advantage]] — added Meeting 05 context, competitive mapping
  - [[positioning-shift]] — added Aarti's blunt feedback from Meeting 01
  - [[four-cohorts]] — confirmed audiences from the brief
  - [[cdri-08]] — added brand brief's 55% bacosides description
- Domain: mindwise
- **Largest Mindwise ingest in wiki history.** Fills the entire Dec 2025 – Mar 2026 gap.

## [2026-04-13] ingest | RaceSims Raw File Dump — Sales, Marketing, Finance, Partners
- Source: [[2026-04-13-racesims-raw-dump]]
- Created: 11 new pages
  - [[racesims-company]] — legal entity, GSTIN, MSME, banking, trademark
  - [[import-operations]] — HS code, duty structure, supplier chain, landed costs
  - [[gt-pro-rig]] — flagship product, BOM, variants
  - [[kit-pricing]] — 4 kit tiers from Rs.2.5L to Rs.11L+
  - [[simagic-distributor]] — South India distributor contract, 128 SKUs
  - [[asetek]] — reseller relationship, 3 product lines, tiered pricing
  - [[techxhub]] — Fanatec/Playseat retail partner, March 2026 pricing
  - [[araya-airport]] — B2B airport simulator project, Rs.6.86-6.96L/unit
  - [[can-bus-telemetry]] — sim-to-real R&D, CAN bus data bridge
  - [[customer-pipeline]] — 5 confirmed customers, 5+ active prospects, B2B pipeline
  - [[2026-04-13-racesims-raw-dump]] — source page
- Updated: 5 existing pages
  - [[conspit]] — full pricing, 7+ imports, VRH reseller control contract, compliance certs
  - [[vnm]] — full product catalog with USD pricing, volume discounts, active order
  - [[virtual-racing-hub]] — legal entity (U Tashtri OPC Pvt Ltd), Moza purchase, Conspit reseller contract
  - [[race-engineer-positioning]] — CAN bus telemetry as concrete moat proof
  - [[thambu]] — company registration details, co-director, banking, trademark
- Domain: racesims
- Scope: deepest operational ingest for RaceSims to date — covers full supplier chain, pricing architecture, import operations, customer pipeline, partner contracts, and company legal structure

## [2026-04-12] ingest | Arka Motorsports website (Browser MCP)
- **Source:** https://www.arkamotorsports.com (via Browser MCP — WebFetch only got Wix scaffolding because the site is JavaScript-rendered)
- **Major updates (no new pages, substantial rewrites):**
  - [[arka-motorsports]] — completely rewritten. **123+ championship titles since 1987**, "the only team in the country to have this prestigious record." Full address, phone, email, 4 social handles.
  - [[mr-leela-krishnan]] — completely rewritten. Name corrected from "Leela Krishnan" (transcription artifact) to "N. Leelakrishnan" (official one-word spelling). **7-time National Rally Champion + multiple National Racing Champion + 35 years in Indian motorsports.** Filename preserved to avoid breaking backlinks.
  - [[race-engineer-positioning]] — substantially upgraded with verified ARKA credentials. Moat is now structurally uncopyable.
  - [[thambu]] — updated with the real ARKA credential stack
  - [[next-gen-racesims-rigs]] — updated with verified ARKA credentials for the design mentor context
- **Strategic impact:** RaceSims now has specific, verifiable numbers (123 championships, 7 national rally titles, 35 years) instead of vague credibility claims. Founder-story pitch framing massively upgraded.
- **Method:** `browser_navigate` + `browser_snapshot`. WebFetch failed because the site is Wix-JS-rendered; Browser MCP renders the actual DOM.

## [2026-04-12] ingest | Gmail Drafts — CSK Pitch + March 24 Meeting Summary + Mission Control Notion
- User asked me to ingest the Instagram DM (for CSK). While fetching it, discovered 2 other extremely high-value drafts in Gmail
- **3 new source pages created:**
  - [[2026-04-08-csk-pitch-draft]] — Instagram DM + detailed email draft to Mr. Radhakrishnan at CSK. **Still unsent as of 2026-04-12.** Zero-cost sim-racing content partnership proposal with 4 content format ideas (Player vs Player, Lap Time Challenge, Guess the Driver, Fan Challenge)
  - [[2026-03-24-meeting-summary-draft]] — Thambu's own draft summary of the March 24 Manik meeting, with action items for both sides + explicit April 2 agenda. NEVER SENT but confirms everything already in the wiki with cleaner structure
  - [[2026-03-25-mission-control-notion-setup-draft]] — reveals a **Mindwise Mission Control Notion workspace** built on March 25. NEVER SENT email
- **4 new entity pages:** [[chennai-super-kings]], [[radhakrishnan-csk]], [[mindwise-mission-control-notion]]
- **1 new concept page:** [[csk-partnership-pitch]]
- **Strategic findings:**
  1. ⏳ The CSK pitch has been sitting in draft since April 8-9 — IPL 2026 window is March-May
  2. A Notion workspace exists as a parallel "single source of truth" to this wiki
  3. The March 24 meeting summary confirms everything in [[2026-03-24-meeting-manik-pricing-website]]
- **Method:** `gmail_list_drafts` + `gmail_read_thread` (drafts fail on `read_message` but succeed on `read_thread`)

## [2026-04-12] ingest | Sorted x Mindwise WhatsApp (April 10-11) via Browser MCP
- **Captured via Browser MCP** driving WhatsApp Web in Chrome (Browser MCP Chrome extension connected by user)
- Source page: [[2026-04-10-to-11-sorted-whatsapp-packaging-push]]
- **Coverage:** April 10-11, 2026 only (~2 days). Browser MCP click/hover timed out when attempting to scroll older history — April 2-9 gap still requires chat export (Path 4)
- **New page:** [[outer-cardboard-box-decision]] — ship bottle-only vs. with outer box, due week of April 13-17
- **Updated pages:**
  - [[ankita|Ankita Duseja]] — full name revealed, UK-based (+44 7724 171784), leading content review (not junior support)
  - [[binita]] — WhatsApp number captured (+91 99304 02027)
  - [[website-development]] — ⭐ content + UX APPROVED by Ankita on April 11, designer cleared to build mockup
  - [[patco-pharmaceuticals]] — bottle prototype being printed, cap height still pending
  - [[semi-transparent-bottle]] — bottle proportions are now SHORTER than original design, all mockups need re-layout
  - [[critical-path-bottleneck]] — partial unblock (website content approved) + new blocks (cap height, outer box decision)
  - [[mindwise-packaging-brief-deck]] — current working state, blister PDFs integrated, slide 18+ comments from Ankita
- **Strategic impact:** 3 major launch decisions surfaced in one 2-day window: (1) website content approved → design unblocked, (2) bottle proportion change forces mockup redo, (3) outer cardboard box may be dropped entirely for cost reasons
- **Known gap:** the April 2 Mumbai meeting outcome is STILL not in the wiki — only April 10+ is captured. Recommend chat export for full history.

## [2026-04-12] ingest | Thambu Voice Brief (March 26) + Mumbai travel confirmation
- **Source fetched via Gmail MCP** (`mindwise.ai1@gmail.com`)
- Raw saved to `voice-briefs/2026-03-26-thambu-voice-brief.md`
- Source page: [[2026-03-26-thambu-voice-brief]]
- **14 new entity pages:** [[arka-motorsports]] ⭐, [[mr-leela-krishnan]], [[raghav-coimbatore-dealer]], [[sim-racing-hq]], [[trayas]], [[racing-rigs]], [[lakshay]], [[jeeva-rathnam]], [[jay-kularia]], [[abdul]], [[shahid-moto-mind]], [[imcd]], [[solusta-puducherry]]
- **3 new concept pages:** [[next-gen-racesims-rigs]], [[beta-free-bacopa-extract]], [[startup-tax-exemption]]
- **Updated pages:** [[thambu]] (ARKA relationship + Mindwise ingredient sourcing), [[race-engineer-positioning]] (ARKA as concrete proof of the moat), [[patco-pharmaceuticals]] (aka Patco Packing Solutions name variant), [[ctd-module-2]] (KeenMind/SFI lineage note), [[april-2-mumbai-meeting]] (travel confirmed Mar 31 → Apr 2, 3-reason trip bundle)
- **Also ingested:** Mumbai travel confirmation from Gmail message `19d2de3109738662` ([[thambu]] March 27 email: "I've decided to travel to Mumbai from the 31st to the second") → enriched [[april-2-mumbai-meeting]]
- **New meta:** [[meta/ingest-workflow]] — canonical guide for all 6 ingestion paths (voice briefs, documents, Gmail, WhatsApp, Discord bot, screenshots)
- Domain: cross (both mindwise + racesims)
- Strategic impact: the [[race-engineer-positioning|race-engineer moat]] is now concrete (ARKA), the [[beta-free-bacopa-extract|Mindwise gummy/syrup path]] is a new roadmap item, and the [[startup-tax-exemption|year-end tax push]] explains the urgency Thambu has been operating with

## [2026-04-12] cleanup | Full lint cleanup (option C)
- Re-lint result: **103 pages, 0 real dead links, 0 orphans** (down from 86 pages / 82 dead links)
- **Phase 1:** Split [[2026-01-to-02-meetings-1-to-5]] into 5 dated source pages — created [[2026-01-06-meeting-1-brief-discussion]], [[2026-01-06-23-meeting-2-written-brief]], [[2026-01-23-meeting-3-brand-strategy-workshop]], [[2026-01-late-meeting-4-brand-identity]], [[2026-02-12-meeting-5-content-strategy]]. Converted the omnibus into a hub page.
- **Phase 2:** Created 11 Category B stub pages — [[2026-03-23-mindwise-meetings-chat-analysis]], [[monochrome-plus-green-pop]], [[inracing]], [[2026-03-13-quick-meeting-logo-feedback]], [[2026-03-20-aceblend-packaging-reference]], [[mindwise-packaging-brief-deck]], [[blister-pack-specs]], [[ctd-module-2]], [[ctd-references]], [[calabrese-2008-elderly-trial]], [[morgan-stevens-2010-elderly]]
- **Phase 3:** Converted all `&#91;&#91;../.claude/rules/...&#93;&#93;` cross-tree wikilinks to standard markdown links in [[hot]], [[meta/wiki-schema]], [[meta/obsidian-setup]], [[brand-name-consistency-issue]]
- **Phase 4:** Escaped schema doc code examples with HTML entities to silence false-positive linter matches
- **Phase 5:** Two real bugs caught by re-lint and fixed: a `\|` escape that broke wikilinks in [[monochrome-plus-green-pop]] table cells, and one missed code example in [[meta/wiki-schema]]
- New top hubs (after the new pages): [[cdri-08]] (60), [[your-unfair-advantage]] (56), [[domains/mindwise/_index]] (45), [[thambu]] (43), [[virtual-racing-hub]] (42), [[race-engineer-positioning]] (42), [[manik]] (42)
- Verification report: [[meta/lint-2026-04-12-cleanup-verification]]

## [2026-04-12] lint | First lint pass after bootstrap
- Report: [[meta/lint-2026-04-12]]
- 86 pages, 0 orphans, 0 frontmatter issues, all pages under 200 lines
- 82 dead links surfaced — predominantly from the omnibus meeting page (recommend splitting) and cross-tree `.claude/rules/` links (recommend converting to markdown links)
- 1 contradiction correctly callout-flagged ([[cdri-08-safety-profile]] Singh 2009 vs Patel 2016)
- Hub structure healthy: top hubs are [[cdri-08]] (40), [[race-engineer-positioning]] (39), [[domains/mindwise/_index]] (38), [[your-unfair-advantage]] (37), [[virtual-racing-hub]] (36)
- Compliance check ✅ — all Mindwise marketing claims trace to CTD or trial pages
- No critical issues. Recommended fixes are additive (split omnibus + ~10 stub pages + fix link syntax in 4 files)

## [2026-04-12] bootstrap | Wiki bootstrap complete
- Total pages: 70+ (22 entities, 35+ concepts, 9 sources, 4 meta, 2 domain indexes, 4 top-level files, 5 .claude/rules)
- Master index, hot cache, log, overview, schema, and Obsidian-setup all populated
- Karpathy LLM wiki pattern fully instantiated
- Wiki is now ready for daily use via /ingest, /query, /lint operations

## [2026-04-11] ingest | RaceSims SEO + GEO Audit
- Source: [[2026-03-25-seo-geo-audit]]
- Created: [[seo-technical-fixes]], [[geo-first-mover-advantage]], [[geo-content-readiness]], [[brand-name-consistency-issue]]
- Updated: [[virtual-racing-hub]], [[domains/racesims/_index]], [[index]]
- Domain: racesims

## [2026-04-11] ingest | RaceSims VRH Battle Plan
- Source: [[2026-03-25-vrh-battle-plan]]
- Created: [[virtual-racing-hub]], [[discord-community-gap]], [[race-engineer-positioning]], [[90-day-execution-plan]], [[blog-content-pipeline]], [[indian-racing-community]], [[jamie-shaw-racing]], [[conspit]], [[vnm]], [[moza]], [[simgrid]], [[yourstory]], [[seo-content-gap]], [[instagram-growth-tactics]], [[reddit-strategy]], [[backlink-strategy]], [[discord-server-setup-kit]], [[racesims-bot]]
- Domain: racesims

## [2026-04-11] ingest | CTD Module 2.4 (Non-clinical Overview)
- Source: [[2026-ctd-module-2.4-nonclinical-overview]]
- Created: [[cdri-08-pharmacology]] (cross), [[cdri-08-safety-profile]] (cross with 2.5)
- Updated: [[cdri-08]]
- Domain: mindwise
- Notable: contradiction documented between Singh 2009 (male fertility negative) and Patel 2016 (positive)

## [2026-04-11] ingest | CTD Module 2.5 (Clinical Overview)
- Source: [[2026-ctd-module-2.5-clinical-overview]]
- Created: [[stough-2008-90-day-trial]], [[stough-2001-12-week-trial]], [[roodenrys-2002-retention-trial]], [[barbhaiya-2008-elderly-trial]], [[55-percent-bacosides]], [[8-12-week-onset-claim]]
- Updated: [[cdri-08]]
- Domain: mindwise

## [2026-04-11] ingest | Mindwise Launch Plan (Work-Backwards from June 1)
- Source: [[2026-03-24-launch-plan-june-1-2026]]
- Created: [[launch-plan-june-1-2026]], [[critical-path-bottleneck]], [[april-2-mumbai-meeting]]
- Domain: mindwise

## [2026-04-11] ingest | Manik Meeting (Pricing, Website, Brand Manager)
- Source: [[2026-03-24-meeting-manik-pricing-website]]
- Created: [[pricing-strategy]], [[website-development]], [[brand-manager-decision]], [[freelance-pr-strategy]]
- Updated: [[manik]]
- Domain: mindwise

## [2026-04-11] ingest | Binita Strategic Decisions Meeting
- Source: [[2026-03-17-meeting-binita-strategic-decisions]]
- Created: [[two-track-bottle-strategy]], [[60-capsule-bottle-decision]], [[patco-pharmaceuticals]]
- Updated: [[binita]], [[route-3-architecture-of-intelligence]]
- Domain: mindwise

## [2026-04-11] ingest | Packaging Feedback Message to Binita
- Source: [[2026-03-23-binita-packaging-feedback]]
- Created: [[csir-cdri-logo-requirement]], [[tic-tac-seal-concept]]
- Updated: [[binita]], [[55-percent-bacosides]], [[60-capsule-bottle-decision]]
- Domain: mindwise

## [2026-04-11] ingest | Mindwise Sorted Meetings 1–5
- Source: [[2026-01-to-02-meetings-1-to-5]]
- Created: [[your-unfair-advantage]], [[positioning-shift]], [[scary-drug-problem]], [[age-paradox]], [[placebo-wellness-enemy]], [[four-cohorts]], [[semi-transparent-bottle]], [[learning-is-childs-play-campaign]], [[lead-the-room-campaign]], [[content-strategy-three-piece]], [[brain-health-community-vision]], [[route-3-architecture-of-intelligence]], [[aarti-samant]], [[manik]], [[tanya-leeds]], [[binita]], [[avantika]], [[ankita]], [[sorted-agency]], [[cdri-08]], [[csir-cdri]], [[lumen-marketing-company]], [[adam-ritson]], [[dr-hemant-singh]], [[dr-dilip-ghosh]], [[shivendra-selvam]], [[thambu]], [[domains/mindwise/_index]]
- Domain: mindwise

## [2026-04-11] bootstrap | Wiki created
- Initial scaffold of `wiki/` directory
- `.claude/rules/` schema rules created (wiki-ingest, wiki-query, wiki-lint, mindwise, racesims)
- Root `CLAUDE.md` refactored into thin spine pointing at wiki + rules
- Karpathy LLM Wiki pattern adopted (https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)
- Inspired by AgriciDaniel/claude-obsidian schema
