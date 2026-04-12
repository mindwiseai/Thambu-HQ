---
title: Mindwise Mission Control (Notion Workspace)
type: entity
domain: mindwise
tags: [workspace, notion, live-system, collaboration, not-yet-ingested]
---

# Mindwise Mission Control (Notion Workspace)

A **live Notion workspace** created by [[thambu]] on 2026-03-25 as a shared collaboration surface for the [[launch-plan-june-1-2026|June 1 Mindwise launch]] push. Revealed via [[2026-03-25-mission-control-notion-setup-draft|a never-sent Gmail draft]] found during the Gmail ingestion.

**URL:** https://www.notion.so/32ebf12780bf81949bbed5ea8ab558d9

## What it contains (per the draft)

| Section | Purpose |
|---|---|
| **Launch Timeline** | Visual milestone tracker from brand strategy → launch |
| **Task Tracker** | Full database — status, priority, category, owner, due dates. "All current action items pre-loaded" |
| **What's Locked vs Needs Decision** | Quick-reference split between confirmed decisions and open items |
| **Budget Overview** | Marketing allocation + operational costs + revenue targets |
| **Target Audiences** | 4 segments with campaign hooks (aligns with [[four-cohorts]]) |
| **Sales Channels** | Channel status + priorities |
| **Competitive Edge** | Mindwise vs. market comparison |
| **Team & Contacts** | Key people across the project |
| **Strategic Notes** | "Manik's key advice from Mar 24" |

## Related HTML dashboard

The draft email also mentions an **interactive HTML dashboard** version — "same data, but with a live countdown timer and more visual layout." This is almost certainly related to the existing [command-center/index.html](../../command-center/index.html) dashboard in the Thambu-HQ repo. Possibly:
- The HTML dashboard and the Notion workspace were generated from the same source data
- The HTML dashboard was the prototype and Notion is the collaboration layer
- They're kept in sync manually

⏳ **Needs verification on next ingest** — compare the current command-center/index.html content against what the Notion workspace claims.

## Relationship to the Thambu-HQ wiki

This Notion workspace and the Thambu-HQ wiki **occupy overlapping roles**. Both are positioned as "single source of truth" for the project. The likely complementary split:

| System | Best for |
|---|---|
| **Mindwise Mission Control (Notion)** | Live task tracking, status dashboards, real-time collaboration, timeline visualization, anything operational |
| **Thambu-HQ Wiki (this repo)** | Knowledge graph, entity / concept / source relationships, reference lookups, long-term institutional memory, compounding context for future conversations with Claude |
| **command-center/index.html** | Visual dashboard (front-end view of both systems' data) |

They should **stay in sync** on:
- What's locked vs. what's pending (state must match)
- Pricing ([[pricing-strategy|₹850-900]])
- Launch date (June 1, 2026)
- Key personnel roles
- Critical path status

They should **NOT duplicate**:
- The wiki has the deep background, meeting context, source citations, and graph relationships
- Notion has the operational state, kanban boards, due dates

## Status as of 2026-04-12

- ⏳ **Content unknown** — the Notion workspace has not been directly ingested into the wiki yet. We only know what the March 25 setup email draft claims.
- ⏳ **Freshness unknown** — unclear whether Thambu has been actively updating it since March 25 or whether it became stale
- ⏳ **Actual sharing** — unclear whether [[shivendra-selvam|Shivendra]] was actually given access (the email was never sent; maybe he was shared directly via Notion)

## Next ingest opportunity

The Notion MCP is configured for this Claude instance (see `mcp__claude_ai_Notion__*` tools visible in the deferred-tools list — specifically `notion-fetch`, `notion-search`, `notion-get-comments`, etc.). Next time the wiki is refreshed, worth considering a direct pull from the Notion workspace to:
1. Verify what's actually in there vs. the March 25 snapshot
2. Cross-check the Task Tracker state against the wiki's pending items
3. Reconcile any contradictions
4. Potentially auto-generate wiki updates from Notion task status changes

For now this is a reference entity — not a source of live data in the wiki yet.

## Connections
- [[2026-03-25-mission-control-notion-setup-draft]] — the draft email where this was documented
- [[2026-03-24-launch-plan-june-1-2026]] — the plan it tracks
- [[launch-plan-june-1-2026]] — the concept page
- [[thambu]], [[shivendra-selvam]]
- [[domains/mindwise/_index]]
