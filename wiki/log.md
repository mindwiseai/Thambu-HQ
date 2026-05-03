---
title: Wiki Log
type: meta
---

# Wiki Operation Log

Append-only chronological record of every ingest, lint, and major edit. **Newest entries at top.** Format: `## [YYYY-MM-DD] <operation> | <title>` so `grep "^## \[" log.md | head -20` shows recent activity.

---

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
