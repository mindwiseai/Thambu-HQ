---
description: How to ingest a new raw source into the wiki
---

# Wiki Ingest Procedure

When the user asks you to "ingest" a source (a document, URL, transcript, voice brief, meeting notes), follow this exact procedure. This rule loads on every wiki ingest operation.

## Read order (mandatory, do not skip)

Before touching any wiki page, read in this order and STOP as soon as you have enough context:

1. `wiki/hot.md` — recent context cache (~500 words). May already have what you need.
2. `wiki/index.md` — master catalog. Tells you what pages already exist.
3. `wiki/domains/<domain>/_index.md` — only if the source belongs to a specific domain.
4. **3–5 individual wiki pages maximum** that the source most directly touches.

If you find yourself wanting to read 10+ existing pages, you are reading too broadly. Stop, narrow scope, then continue.

## Ingestion steps

1. **Classify the source.** Determine domain (`mindwise`, `racesims`, or `cross`), source type (meeting | document | voice-brief | article | regulatory | strategy), and approximate scope (how many wiki pages it likely touches — typical range 5–15).

2. **Create the source page.** File path: `wiki/sources/<YYYY-MM-DD>-<short-slug>.md`. Frontmatter:
   ```yaml
   ---
   title: <human title>
   type: source
   source_type: meeting | document | voice-brief | article | regulatory | strategy
   domain: mindwise | racesims | cross
   raw_path: <path to raw file under racesims/, mindwise/, or voice-briefs/>
   ingested: <YYYY-MM-DD>
   ---
   ```
   Body sections: `## Summary` (3–5 sentences), `## Key facts` (bullets, each linkable), `## People mentioned` (with `[[wiki-links]]`), `## Decisions` (if any), `## Open questions`, `## Backlinks` (auto-emerges as other pages link back).

3. **Touch existing entity / concept pages.** For each entity (person, company, product, place) and concept (idea, framework, decision) the source mentions, either:
   - **Update an existing page** with new facts, prefixed with the source date and a `[[<source-page>]]` link.
   - **Create a new page** if it doesn't exist yet. Use the entity / concept template (see `wiki/meta/wiki-schema.md`).

4. **Link densely.** Every mention of a known entity, concept, or source MUST be a `[[wiki-link]]`. Link density is the wiki's value, not page count. If you mention "Aarti" without `[[aarti-samant]]`, you have failed.

5. **Update `wiki/log.md`.** Append (NEW ENTRIES AT TOP):
   ```markdown
   ## [<YYYY-MM-DD>] ingest | <source title>
   - Source: [[<source-page>]]
   - Created: <count> new pages (list them with [[links]])
   - Updated: <count> existing pages (list them with [[links]])
   - Domain: <domain>
   ```

6. **Update `wiki/hot.md`** with a 1–2 sentence note about what was just ingested. Trim hot.md to ~500 words by dropping the oldest entry if needed.

7. **Update `wiki/index.md`** ONLY if you created a new top-level entity or concept that deserves catalog placement. Don't add every minor page.

## Hard rules

- **Pages are 60–200 lines max.** If a page is growing past 200 lines, split it.
- **One concept / entity / source per page.** Atomicity.
- **Use `> [!contradiction]` callouts** when a new source disagrees with existing wiki content. Do NOT silently overwrite. Flag, then ask the user.
- **Never re-read a full page just to update one field.** Use Edit with targeted old_string/new_string.
- **Touch 8–15 pages per ingest.** Outliers in either direction (1–2 or 20+) usually mean you misclassified.
- **Names are stable.** Once a page is named `aarti-samant.md`, do not rename it. Backlinks will break.

## Naming conventions

- All filenames `kebab-case.md`
- Entities: prefer the canonical name (`aarti-samant.md`, `virtual-racing-hub.md`, `cdri-08.md`)
- Concepts: descriptive slug (`your-unfair-advantage.md`, `discord-community-gap.md`)
- Sources: `<YYYY-MM-DD>-<slug>.md`
- Where collisions are possible across domains, prefix with domain (`mindwise-pricing-strategy.md` vs `racesims-pricing-strategy.md`)

## What to do when blocked

- **Ambiguous classification:** ask the user once, then proceed.
- **Source contradicts wiki:** create the contradiction callout, do NOT delete old content, flag in `## Open questions`.
- **Source overlaps heavily with existing pages:** prefer updating over creating. Aim for tightest delta.
- **Source seems irrelevant or low-signal:** report this back to the user before ingesting noise.
