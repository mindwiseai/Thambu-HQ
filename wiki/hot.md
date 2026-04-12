---
title: Hot Cache
type: meta
updated: 2026-04-12
---

# Hot Cache

Most recently touched context. Read this first for any query — it often answers the question alone. Trim to ~500 words; drop oldest entries first.

## 2026-04-12 — Wiki bootstrap complete

The Thambu-HQ Karpathy-style wiki was built between 2026-04-11 and 2026-04-12 in a single bootstrap pass. Initial state:

- **9 source documents ingested**
- **22 entity pages**
- **35+ concept pages**
- **Both domains covered:** [[domains/mindwise/_index|Mindwise]] (cognitive supplement, June 1 launch) and [[domains/racesims/_index|RaceSims]] (sim racing hardware)
- **3 schema rule files:** [wiki-ingest](../.claude/rules/wiki-ingest.md), [wiki-query](../.claude/rules/wiki-query.md), [wiki-lint](../.claude/rules/wiki-lint.md)
- **2 path-scoped domain rules:** [mindwise.md](../.claude/rules/mindwise.md), [racesims.md](../.claude/rules/racesims.md)
- **CLAUDE.md refactored** to a thin spine that points at the wiki

## Current state of the businesses (as of 2026-04-12)

### Mindwise — final stretch before [[launch-plan-june-1-2026|June 1 launch]] (~50 days)

Brand identity LOCKED:
- [[your-unfair-advantage|"Your Unfair Advantage" tagline]]
- [[route-3-architecture-of-intelligence|Route 3 logo direction]]
- [[semi-transparent-bottle|Semi-transparent bottle]] visual hero
- [[60-capsule-bottle-decision|60-capsule D2C SKU]]
- [[pricing-strategy|₹850–900 MRP]]
- [[patco-pharmaceuticals|Patco Pharmaceuticals]] confirmed as customization vendor

**The critical path:** [[critical-path-bottleneck|visual identity → website → development → launch]]. The [[april-2-mumbai-meeting|April 2 in-person meeting]] was the gate that should have unlocked everything downstream — its outcome has not yet been ingested into the wiki and is the **#1 next ingestion priority**.

Open decisions awaiting April 2 outcome:
- [[website-development|Website ₹6L vs alternatives]]
- [[brand-manager-decision|Brand Manager hire vs freelancer]]
- Whether [[2026-03-23-binita-packaging-feedback|Thambu's 11-point packaging feedback]] was incorporated

### RaceSims — executing [[90-day-execution-plan|90-day plan]] (~2.5 weeks in)

Biggest gaps:
- [[discord-community-gap|No Discord community]] — but the [[discord-server-setup-kit|setup kit]] is ready and the [[racesims-bot|bot is built]]. ~30 minutes of execution unlocks weeks of community building. **The single highest-leverage unblock.**
- [[seo-content-gap|Almost no SEO blog content]] — [[blog-content-pipeline|10-article plan]] sourced from VRH battle plan
- Zero press coverage — see [[backlink-strategy]]

Biggest moat:
- [[race-engineer-positioning|Race-engineer founder credibility]]. Cannot be copied. Use it in every piece of content.

[[geo-first-mover-advantage|GEO]] head start: AI crawlers already enabled in robots.txt — VRH likely hasn't done this.

**Status check needed:** the [[90-day-execution-plan]] was drafted March 25. We're now ~2.5 weeks in. What's been executed vs what's still pending? Highest-priority RaceSims next ingestion.

## Blind spots (the next ingestion priorities, in order)

1. **April 2 Mumbai meeting outcome** ([[april-2-mumbai-meeting]]) — Mindwise critical path gate, 9-10 days old, no data yet
2. **RaceSims 90-day execution status** — what got done in weeks 1-3?
3. **Bot capabilities** ([[racesims-bot]]) — `bot.js` not yet read in detail
4. **Voice briefs** — `voice-briefs/` folder exists and is empty. The Discord-bot voice integration is the loop the wiki was designed for.

## Things to flag on next interaction

- Mindwise mid-April deliverables are DUE NOW. If a question touches Mindwise, check launch-plan dates against today's date.
- The Discord server unblock is 30 minutes of execution. If a RaceSims question touches community / Discord / VRH gap, mention this.
- The pricing strategy is ₹850-900 (locked March 24). Earlier docs may say ₹1,200 — that is stale.
- ⚠️ Singh 2009 / Patel 2016 male fertility contradiction in [[cdri-08-safety-profile]] — disclose both if asked about safety.
