# Wiki Ingest Procedure — Mindwise

When the user asks you to "ingest" a source (a document, URL, transcript, voice brief, meeting notes, regulatory filing, clinical trial summary), follow this exact procedure. This rule loads on every wiki ingest operation for Mindwise.

## Read order (mandatory, do not skip)

Before touching any wiki page, read in this order and STOP as soon as you have enough context:

1. `../wiki/hot.md` — recent context cache (~500 words). May already have what you need.
2. `../wiki/index.md` — master catalog. Tells you what pages already exist.
3. `../wiki/domains/mindwise/_index.md` — Mindwise domain catalog.
4. **3–5 individual wiki pages maximum** that the source most directly touches.

If you find yourself wanting to read 10+ existing pages, you are reading too broadly. Stop, narrow scope, then continue.

## Ingestion steps

1. **Classify the source.** Determine:
   - Source type: meeting | document | voice-brief | article | regulatory | clinical-trial | strategy | ctd-document
   - Regulatory layer: Is this about CTD, FSSAI licensing, compliance, clinical backing, or marketing claims?
   - Approximate scope: how many wiki pages it likely touches (typical range 5–15).

2. **Create the source page.** File path: `../wiki/sources/<YYYY-MM-DD>-<short-slug>.md`. Frontmatter:
   ```yaml
   ---
   title: <human title>
   type: source
   source_type: meeting | document | voice-brief | article | regulatory | clinical-trial | strategy | ctd-document
   domain: mindwise
   regulatory_layer: ctd | fssai | clinical | compliance | claims | product
   raw_path: <path to raw file under mindwise/ or voice-briefs/>
   ingested: <YYYY-MM-DD>
   ---
   ```
   Body sections: `## Summary` (3–5 sentences), `## Key facts` (bullets, each linkable), `## People mentioned` (with `[[wiki-links]]`), `## Decisions` (if any), `## Regulatory implications** (if applicable), `## Open questions`, `## Backlinks` (auto-emerges as other pages link back).

3. **Touch existing entity / concept pages.** For each entity (person, company, regulator, vendor) and concept (idea, framework, claim, decision) the source mentions, either:
   - **Update an existing page** with new facts, prefixed with the source date and a `[[<source-page>]]` link.
   - **Create a new page** if it doesn't exist yet. Use the entity / concept template (see `../wiki/meta/wiki-schema.md`).

4. **Link densely, especially for regulatory claims.** Every mention of a known entity, concept, regulatory body, or source MUST be a `[[wiki-link]]`. If you mention "FSSAI" without `[[fssai]]`, you have failed. For clinical/compliance claims, ensure they're linked to their source: e.g., "Bacopa improves cognition `[[cdri-08]]`" not just "Bacopa improves cognition."

5. **Compliance cross-check.** For every marketing claim mentioned in the source:
   - Verify it's backed by a `[[ctd-sources]]` or `[[clinical-trial]]` page.
   - If a claim has no backing, flag it in `## Open questions` as "UNSUPPORTED CLAIM — needs CTD/clinical backing."
   - If the source proposes a claim without evidence, mark this as a regulatory risk.

6. **Update `../wiki/log.md`.** Append (NEW ENTRIES AT TOP):
   ```markdown
   ## [<YYYY-MM-DD>] ingest | <source title>
   - Source: [[<source-page>]]
   - Created: <count> new pages (list them with [[links]])
   - Updated: <count> existing pages (list them with [[links]])
   - Regulatory flags: <count> unsupported claims | compliance gaps
   ```

7. **Update `../wiki/hot.md`** with a 1–2 sentence note about what was just ingested, especially if there are regulatory implications. Trim hot.md to ~500 words by dropping the oldest entry if needed.

8. **Update `../wiki/index.md`** ONLY if you created a new top-level entity (new regulator, new CTD source, new clinical vendor) that deserves catalog placement. Don't add every minor page.

## Hard rules — Mindwise-specific

- **Pages are 60–200 lines max.** If a page is growing past 200 lines, split it.
- **One concept / entity / source per page.** Atomicity.
- **Use `> [!contradiction]` callouts** when a new source disagrees with existing wiki content. Do NOT silently overwrite. Flag, then ask the user.
- **Regulatory claims MUST be sourced.** Every marketing claim, dosage statement, or "pregnancy-safe" assertion must trace back to a CTD page, clinical trial page, or FSSAI filing. Unsupported claims are a compliance liability.
- **Never re-read a full page just to update one field.** Use Edit with targeted old_string/new_string.
- **Touch 8–15 pages per ingest.** Outliers in either direction (1–2 or 20+) usually mean you misclassified.
- **Names are stable.** Once a page is named `cdri-08.md`, do not rename it. Backlinks will break.

## Naming conventions

- All filenames `kebab-case.md`
- Entities: prefer the canonical name (`cdri-08.md`, `fssai.md`, `lumen-marketing-company.md`)
- Concepts: descriptive slug (`unfair-advantage-bacopa.md`, `pregnancy-category-safety.md`)
- Sources: `<YYYY-MM-DD>-<slug>.md`
- CTD pages: `ctd-<section-number>-<short-title>.md`
- Clinical trials: `clinical-trial-<author-year>-<slug>.md`

## What to do when blocked

- **Ambiguous classification:** ask the user once, then proceed.
- **Source contradicts wiki:** create the contradiction callout, do NOT delete old content, flag in `## Open questions`.
- **Source overlaps heavily with existing pages:** prefer updating over creating. Aim for tightest delta.
- **Claim has no regulatory backing:** flag as UNSUPPORTED and ask the user before ingesting. This is the killer compliance check.
- **Source seems irrelevant or low-signal:** report this back to the user before ingesting noise.
