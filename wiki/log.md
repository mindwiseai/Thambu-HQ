---
title: Wiki Log
type: meta
---

# Wiki Operation Log

Append-only chronological record of every ingest, lint, and major edit. **Newest entries at top.** Format: `## [YYYY-MM-DD] <operation> | <title>` so `grep "^## \[" log.md | head -20` shows recent activity.

---

## [2026-04-12] cleanup | Full lint cleanup (option C)
- Re-lint result: **103 pages, 0 real dead links, 0 orphans** (down from 86 pages / 82 dead links)
- **Phase 1:** Split [[2026-01-to-02-meetings-1-to-5]] into 5 dated source pages — created [[2026-01-06-meeting-1-brief-discussion]], [[2026-01-06-23-meeting-2-written-brief]], [[2026-01-23-meeting-3-brand-strategy-workshop]], [[2026-01-late-meeting-4-brand-identity]], [[2026-02-12-meeting-5-content-strategy]]. Converted the omnibus into a hub page.
- **Phase 2:** Created 11 Category B stub pages — [[2026-03-23-mindwise-meetings-chat-analysis]], [[monochrome-plus-green-pop]], [[inracing]], [[2026-03-13-quick-meeting-logo-feedback]], [[2026-03-20-aceblend-packaging-reference]], [[mindwise-packaging-brief-deck]], [[blister-pack-specs]], [[ctd-module-2]], [[ctd-references]], [[calabrese-2008-elderly-trial]], [[morgan-stevens-2010-elderly]]
- **Phase 3:** Converted all `[[../.claude/rules/...]]` cross-tree wikilinks to standard markdown links in [[hot]], [[meta/wiki-schema]], [[meta/obsidian-setup]], [[brand-name-consistency-issue]]
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
