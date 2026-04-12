---
title: Wiki Schema & Page Conventions
type: meta
---

# Wiki Schema & Page Conventions

The conventions every wiki page follows. Read this when:
- Creating a new page (via `/ingest`)
- Linting the wiki (via `/lint`)
- Auditing schema drift

## File location by type

| Type | Folder | Filename pattern |
|---|---|---|
| `entity` | `wiki/entities/` | `<canonical-name>.md` (kebab-case) |
| `concept` | `wiki/concepts/` | `<descriptive-slug>.md` |
| `source` | `wiki/sources/` | `<YYYY-MM-DD>-<slug>.md` |
| `question` | `wiki/questions/` | `<YYYY-MM-DD>-<slug>.md` |
| `meta` | `wiki/meta/` | `<descriptive-slug>.md` |
| Domain index | `wiki/domains/<domain>/` | `_index.md` |

Plus four top-level files:
- `wiki/hot.md` — recent context cache
- `wiki/index.md` — master catalog
- `wiki/log.md` — operation log (newest at top)
- `wiki/overview.md` — wiki architecture overview

## Frontmatter (every page must have it)

### Entity page
```yaml
---
title: Aarti Samant
type: entity
domain: mindwise | racesims | cross
tags: [person, sorted-agency, strategy-director]
---
```

### Concept page
```yaml
---
title: Your Unfair Advantage — Mindwise Tagline
type: concept
domain: mindwise | racesims
status: LOCKED | PENDING | ACTIVE | EXPLORATION (optional)
tags: [tagline, positioning, brand-anchor]
---
```

### Source page
```yaml
---
title: Sorted Strategy Meetings 1–5 (Jan 6 → Feb 12, 2026)
type: source
source_type: meeting | document | voice-brief | article | regulatory | strategy
domain: mindwise | racesims | cross
raw_path: mindwise/Meeting Notes/MEETING_TRANSCRIPTS_COMPREHENSIVE_SUMMARY.md
also: <other source paths if any>
ingested: 2026-04-11
---
```

### Question page
```yaml
---
title: When does the brand book lock?
type: question
domain: mindwise
asked: 2026-04-15
---
```

### Meta page
```yaml
---
title: Wiki Schema & Page Conventions
type: meta
---
```

## Page anatomy

Every page should have (in this order, where applicable):

1. **Frontmatter** (mandatory)
2. **# Title** (matches frontmatter `title`)
3. **Lead paragraph** — 1-3 sentences. The most important context. Reading just this should be enough to understand what the page is about.
4. **Body sections** — `##` headings, organized logically
5. **Connections section** at the bottom — `&#91;&#91;wiki-link&#93;&#93;` to all related pages

## Length discipline

- **Target:** 60–200 lines per page
- **Hard cap:** 300 lines (split before exceeding)
- **Reasoning:** atomic pages link better than monolithic pages. The wiki's value is in the *graph*, not in any individual page.

## Linking discipline

- **Every entity, concept, or source mention MUST be a `&#91;&#91;wiki-link&#93;&#93;`.**
- Use `&#91;&#91;page-name|display text&#93;&#93;` when the display text differs from the page name (e.g., `&#91;&#91;domains/mindwise/_index|Mindwise&#93;&#93;`).
- Cross-domain links are fine — Thambu / Shivendra / Lumen Marketing Company can be linked from RaceSims pages and vice versa.
- Don't over-link the same word in the same page — first occurrence is enough.

## Naming conventions

- **All filenames `kebab-case.md`**
- **Entities:** prefer the canonical name (`aarti-samant.md`, `virtual-racing-hub.md`, `cdri-08.md`)
- **Concepts:** descriptive slug (`your-unfair-advantage.md`, `discord-community-gap.md`)
- **Sources:** `<YYYY-MM-DD>-<slug>.md` so they sort chronologically
- **Domain prefix only when ambiguous** — `mindwise-pricing-strategy.md` only if there's also a `racesims-pricing-strategy.md`. Otherwise just `pricing-strategy.md`.

## Special markdown patterns

### Contradictions
When two sources disagree, do NOT silently overwrite. Use:
```markdown
> [!contradiction]
> Source A says X. Source B says Y. Likely resolution: Z. User confirmation needed.
```

### Notes
For non-critical clarifications:
```markdown
> [!note]
> Same person referred to as "Tanya Leeds" in some notes and "Tanya Varma" in chats.
```

### Status badges
Use `status:` in frontmatter for concept pages with a clear lifecycle:
- `LOCKED` — decided and not changing
- `ACTIVE` — currently in progress
- `PENDING` — open decision
- `EXPLORATION` — being explored
- `BUG TO FIX` — known issue
- `READY TO DEPLOY` — built but not yet executed
- `CRITICAL GAP` / `CRITICAL RISK` — needs immediate attention
- `PAST` — completed / historical

## Hard rules (NEVER violate)

1. **Never silently overwrite content.** Use contradiction callouts.
2. **Never delete a page on your own initiative.** Always confirm with user.
3. **Never re-read a full page just to update one field.** Use Edit with old_string/new_string.
4. **Never break existing wikilinks.** Do not rename pages without updating all incoming links.
5. **Never put auto-memory content here.** Auto-memory belongs in `~/.claude/projects/.../memory/`. The wiki is for project knowledge.
6. **Never put speculation in a page without marking it.** Use `(speculation, not in source)` or `(inference, not directly stated)`.

## How to grow the wiki

When you ingest a new source:
1. Read [[hot]] + [[index]] first to understand current state
2. Create the source page in `wiki/sources/`
3. Create or update the entity / concept pages it touches (8–15 typical)
4. Update [[log]] with the ingest entry (NEW ENTRIES AT TOP)
5. Update [[hot]] with a 1-2 sentence summary
6. Update [[index]] only if you added a top-level entity / concept
7. Done

When you lint:
- Run the [wiki-lint procedure](../.claude/rules/wiki-lint.md)
- Save report to `wiki/meta/lint-<YYYY-MM-DD>.md`
- Update [[log]] with a `lint` entry

## Connections
- [[overview]] — broader architecture
- [[obsidian-setup]] — how Obsidian fits
- [Ingest rules](../.claude/rules/wiki-ingest.md)
- [Query rules](../.claude/rules/wiki-query.md)
- [Lint rules](../.claude/rules/wiki-lint.md)
