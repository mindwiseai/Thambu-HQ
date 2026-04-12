---
title: Brand Name Consistency Issue ("Race Sims" vs "RaceSims")
type: concept
domain: racesims
status: BUG TO FIX
tags: [seo, geo, technical, branding]
---

# Brand Name Consistency Issue

**Critical entity-recognition bug** flagged in the [[2026-03-25-seo-geo-audit|SEO/GEO audit]]. Affects both Google Knowledge Graph and AI model entity recognition.

## The problem

The brand name appears in **multiple inconsistent forms** across racesims.in and its schemas:

- ❌ "Race Sims" (two words)
- ❌ "RaceSims" (one word)
- ❌ "RaceSims solutions Pvt Ltd" (legal entity, used as brand name in some schemas)

Every product page has **two Organization schemas with different names** — "Race Sims" and "RaceSims solutions Pvt Ltd".

## Why it matters

When Google crawls the site or an AI model parses it, the multiple variations look like **different entities**. This breaks:

1. **Google Knowledge Graph entity association** — Knowledge Graph may not link the variations as the same brand
2. **AI model entity recognition** — ChatGPT, Claude, Perplexity may treat them as different brands
3. **GEO citation accuracy** — when an AI cites the brand, it may use one variation while users search for another
4. **Backlink consolidation** — links to one variation may not pass authority to the others

## The fix

Per the audit:

> "Standardize to a single brand name across all schemas, title tags, and content. Suggested: **'RaceSims'** as the brand name, with 'RaceSims Solutions Pvt Ltd' only as the legal entity name in the Organization schema."

### Specific actions
1. Pick one canonical form: **"RaceSims"** (one word)
2. Remove the duplicate Organization schema
3. Update title tags to drop the long " – RaceSims solutions Pvt Ltd" suffix
4. Find/replace across templates and content
5. Update Google Business Profile, social profiles, directory listings (NAP consistency)

### Effort
**Medium** — touches templates and may need bulk content updates.

## Wiki rule

This is enshrined in [.claude/rules/racesims.md](../.claude/rules/racesims.md):

> Always "RaceSims" (one word), never "Race Sims" (two words).

If anything in the codebase or content is updated and the wrong form is used, the rule should kick in to flag it.

## Connections
- [[2026-03-25-seo-geo-audit]] — source
- [[geo-first-mover-advantage]]
- [[seo-technical-fixes]]
