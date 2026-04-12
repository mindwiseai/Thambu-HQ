---
title: Wiki Lint Verification — 2026-04-12 (post-cleanup)
type: meta
---

# Wiki Lint Verification — 2026-04-12 (post-cleanup)

Re-lint after the full cleanup operation (option C). Compared against [[meta/lint-2026-04-12|the original lint pass]] from earlier the same day.

## Summary

| Stat | Before cleanup | After cleanup | Delta |
|---|---|---|---|
| Total pages | 86 | **103** | +17 |
| Orphan pages | 0 | **0** ✅ | — |
| Pages without frontmatter | 0 | **0** ✅ | — |
| Pages over 200 lines | 0 | **0** ✅ | — |
| Dead links (real) | 82 | **0** ✅ | **−82 (−100%)** |
| Marketing claims missing CTD backing | 0 | **0** ✅ | — |
| Contradiction callouts | 1 | 1 | — |

**Result: 100% of real dead links resolved.** The wiki is now in a clean steady state, ready for daily use.

## What changed

### 17 new pages

**5 split meeting pages** (replacing the omnibus):
- [[2026-01-06-meeting-1-brief-discussion]]
- [[2026-01-06-23-meeting-2-written-brief]]
- [[2026-01-23-meeting-3-brand-strategy-workshop]]
- [[2026-01-late-meeting-4-brand-identity]]
- [[2026-02-12-meeting-5-content-strategy]]

(The original omnibus page [[2026-01-to-02-meetings-1-to-5]] was converted into a hub page that points at all 5.)

**11 Category B stub pages** (filling the graph stubs surfaced in the original lint):
- [[2026-03-23-mindwise-meetings-chat-analysis]] — comprehensive WhatsApp + meetings analysis (full source page, not a stub)
- [[monochrome-plus-green-pop]] — visual identity color scheme
- [[inracing]] — secondary RaceSims competitor entity
- [[2026-03-13-quick-meeting-logo-feedback]] — meeting stub
- [[2026-03-20-aceblend-packaging-reference]] — packaging reference photography session
- [[mindwise-packaging-brief-deck]] — live Google Slides deck entity
- [[blister-pack-specs]] — B2B SKU specifications
- [[ctd-module-2]] — regulatory dossier parent entity
- [[ctd-references]] — bibliography (meta page)
- [[calabrese-2008-elderly-trial]] — clinical trial concept
- [[morgan-stevens-2010-elderly]] — clinical trial concept

### Syntax fixes

**4 files updated** to convert `[[../.claude/rules/...]]` cross-tree wikilinks (which Obsidian can't resolve) into standard markdown links (which work):
- [[hot]]
- [[meta/wiki-schema]]
- [[meta/obsidian-setup]]
- [[brand-name-consistency-issue]]

**Code example escapes** in [[meta/wiki-schema]] and [[meta/obsidian-setup]] — used HTML entity escapes (`&#91;` for `[`, `&#93;` for `]`) inside inline code so the linter regex no longer matches them as wikilinks. The rendered output still shows `[[wiki-link]]` in code blocks for human readers.

### Bugs caught by the re-lint pass

Two real bugs surfaced after the initial cleanup that weren't visible before:

1. **`\|` escape broke wikilinks** in [[monochrome-plus-green-pop]] table cells. I had used `[[2026-01-late-meeting-4-brand-identity\|Whoop]]` to escape the pipe character (so it wouldn't break the table column), but this also broke the wikilink syntax. The fix: write the table cells in plain text and add a parenthetical reference to the meeting page.

2. **One missed code example** in [[meta/wiki-schema]] (line 92) — caught and escaped.

## Hub structure (post-cleanup)

The new pages added to several hubs. Notable: [[cdri-08]] gained 20 inbound links (from 40 → 60) because the new clinical trial pages and the [[ctd-module-2]] entity all link back to it.

| Page | Inbound (post-cleanup) | Inbound (pre) | Δ |
|---|---|---|---|
| [[cdri-08]] | **60** | 40 | +20 |
| [[your-unfair-advantage]] | **56** | 37 | +19 |
| [[domains/mindwise/_index]] | **45** | 38 | +7 |
| [[thambu]] | **43** | 30 | +13 |
| [[virtual-racing-hub]] | **42** | 36 | +6 |
| [[race-engineer-positioning]] | **42** | 39 | +3 |
| [[manik]] | **42** | 26 | +16 |
| [[sorted-agency]] | **38** | 28 | +10 |
| [[semi-transparent-bottle]] | **38** | 24 | +14 |
| [[binita]] | **35** | 23 | +12 |
| [[four-cohorts]] | **35** | 23 | +12 |
| [[2026-03-25-vrh-battle-plan]] | **34** | 31 | +3 |
| [[2026-03-23-binita-packaging-feedback]] | **33** | 24 | +9 |
| [[launch-plan-june-1-2026]] | **32** | 27 | +5 |
| [[patco-pharmaceuticals]] | **31** | 22 | +9 |

**The graph got significantly denser.** This is what a healthy lint cycle looks like: more pages + more links + more density, with 0 orphans and 0 dead links throughout.

## Schema check

- ✅ All 103 pages have frontmatter
- ✅ All 103 pages are under 200 lines (longest is still [[meta/wiki-schema]] at 172)
- ✅ All link syntax is consistent
- ✅ No contradictions silently overwritten
- ✅ One contradiction correctly flagged with callout ([[cdri-08-safety-profile]] Singh 2009 vs Patel 2016)

## What's still notable

### Contradiction (correctly flagged, no action needed)
- **Singh 2009 vs Patel 2016** on male fertility — both studies disclosed, contextualized as dose- and species-dependent, Mindwise dosing well below either study's range.

### Stale references (still valid as flagged in [[hot]])
- Pricing was locked at ₹850-900 in [[2026-03-24-meeting-manik-pricing-website]] but earlier docs may reference ₹1,200. Wiki itself is consistent — only [[pricing-strategy]] mentions ₹1,200 and explicitly marks it stale.

### Missing data — next ingestion priorities
None of these are dead links (they're acknowledged in [[hot]] as next ingest priorities):
1. **April 2 Mumbai meeting outcome** ([[april-2-mumbai-meeting]]) — happened 10+ days ago, no data yet
2. **RaceSims 90-day plan execution status** — what's been done in weeks 1-3?
3. **Bot capabilities** ([[racesims-bot]]) — `bot.js` capabilities not yet ingested in detail
4. **Voice briefs** — folder is empty; awaiting first Discord-bot voice transcript

## Lint procedure observations

This was the first cleanup cycle on the wiki. Lessons for future lints:

1. **Splitting an omnibus is high-leverage.** ~30 dead links resolved by splitting one page.
2. **Graph stubs surface in waves.** The first lint surfaced 11 Category B stubs; creating them surfaced 0 new ones (good — the graph is converging).
3. **Re-lint after cleanup is essential.** Two bugs (the `\|` escape and the missed code example) only became visible after the bigger fixes — without re-linting we'd have shipped them.
4. **HTML entities are the right escape for code examples.** Inline backticks alone aren't enough because the lint regex doesn't parse markdown code spans.
5. **Cross-tree links should always be markdown links, not wikilinks.** Obsidian can't resolve wikilinks outside the vault.

## What this lint did NOT do (per the lint procedure)

- ❌ Auto-fix anything without user direction (per the wiki-lint rule)
- ❌ Delete pages
- ❌ Rename pages
- ❌ Resolve contradictions silently

## Connections
- [[meta/lint-2026-04-12]] (the original lint that found 82 dead links)
- [[log]] (operation history)
- [Lint procedure](../.claude/rules/wiki-lint.md)
- [[meta/wiki-schema]]
- [[hot]]
