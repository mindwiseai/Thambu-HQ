# Wiki Ingest Procedure — Prenatal Brand

When the user asks you to "ingest" a source (a document, URL, transcript, voice brief, meeting notes, regulatory research, vendor analysis, competitive research), follow this exact procedure. This rule loads on every wiki ingest operation for the prenatal brand.

## Read order (mandatory, do not skip)

Before touching any wiki page, read in this order and STOP as soon as you have enough context:

1. `../wiki/hot.md` — recent context cache (~500 words). May already have what you need.
2. `../wiki/index.md` — master catalog. Tells you what pages already exist.
3. `../wiki/domains/prenatal/_index.md` — Prenatal domain catalog.
4. **3–5 individual wiki pages maximum** that the source most directly touches.

If you find yourself wanting to read 10+ existing pages, you are reading too broadly. Stop, narrow scope, then continue.

## Ingestion steps

1. **Classify the source.** Determine:
   - Source type: meeting | document | voice-brief | article | regulatory | vendor-research | competitive-analysis | strategy | manufacturing
   - Regulatory layer: Is this about FSSAI FSDU strategy, nutrient RDA compliance, or CDSCO drug classification risk?
   - Approximate scope: how many wiki pages it likely touches (typical range 5–15).

2. **Create the source page.** File path: `../wiki/sources/<YYYY-MM-DD>-<short-slug>.md`. Frontmatter:
   ```yaml
   ---
   title: <human title>
   type: source
   source_type: meeting | document | voice-brief | article | regulatory | vendor-research | competitive-analysis | strategy | manufacturing
   domain: prenatal
   regulatory_layer: fssai-fsdu | rda-compliance | cdsco-risk | positioning | pricing
   raw_path: <path to raw file under prenatal/ or voice-briefs/>
   ingested: <YYYY-MM-DD>
   ---
   ```
   Body sections: `## Summary` (3–5 sentences), `## Key facts` (bullets, each linkable), `## People mentioned` (with `[[wiki-links]]`), `## Decisions` (if any), `## Regulatory implications** (if applicable), `## Open questions`, `## Backlinks` (auto-emerges as other pages link back).

3. **Touch existing entity / concept pages.** For each entity (person, company, regulator, vendor, competitor) and concept (idea, framework, positioning, decision) the source mentions, either:
   - **Update an existing page** with new facts, prefixed with the source date and a `[[<source-page>]]` link.
   - **Create a new page** if it doesn't exist yet. Use the entity / concept template (see `../wiki/meta/wiki-schema.md`).

4. **Link densely.** Every mention of a known entity, concept, regulator, vendor, or source MUST be a `[[wiki-link]]`. If you mention "FSSAI" without `[[fssai]]` or "Ritual" without `[[ritual]]`, you have failed.

5. **Regulatory compliance check.** For every positioning claim or marketing language mentioned in the source:
   - Verify it complies with `[[prenatal-regulatory-red-lines]]`.
   - Check that "pregnancy safe" language is reworded to "specially formulated for pregnant women."
   - Verify nutrient levels are ≤1x ICMR RDA (Aishu has this constraint — exceeding triggers CDSCO drug classification).
   - Flag any positioning that violates these rules in `## Open questions` as "COMPLIANCE RISK — needs rewording."

6. **Update `../wiki/log.md`.** Append (NEW ENTRIES AT TOP):
   ```markdown
   ## [<YYYY-MM-DD>] ingest | <source title>
   - Source: [[<source-page>]]
   - Created: <count> new pages (list them with [[links]])
   - Updated: <count> existing pages (list them with [[links]])
   - Regulatory flags: <count> compliance risks | positioning gaps
   ```

7. **Update `../wiki/hot.md`** with a 1–2 sentence note about what was just ingested, especially if there are regulatory or competitive implications. Trim hot.md to ~500 words by dropping the oldest entry if needed.

8. **Update `../wiki/index.md`** ONLY if you created a new top-level entity (new regulator, new vendor, new competitor) that deserves catalog placement. Don't add every minor page.

## Hard rules — Prenatal-specific

- **Pages are 60–200 lines max.** If a page is growing past 200 lines, split it.
- **One concept / entity / source per page.** Atomicity.
- **Use `> [!contradiction]` callouts** when a new source disagrees with existing wiki content. Do NOT silently overwrite. Flag, then ask the user.
- **Regulatory red lines are immutable.** Every positioning claim must be audit-checked against `[[prenatal-regulatory-red-lines]]` before ingesting. If the source proposes language like "pregnancy safe" or nutrient levels > ICMR RDA, flag as COMPLIANCE RISK.
- **Never re-read a full page just to update one field.** Use Edit with targeted old_string/new_string.
- **Touch 8–15 pages per ingest.** Outliers in either direction (1–2 or 20+) usually mean you misclassified.
- **Names are stable.** Once a page is named `ritual.md`, do not rename it. Backlinks will break.

## Naming conventions

- All filenames `kebab-case.md`
- Entities: prefer the canonical name (`ritual.md`, `fssai.md`, `mama-earth.md`)
- Concepts: descriptive slug (`nutrient-rda-constraints.md`, `dtc-positioning-ritual-vs-prenatal.md`)
- Sources: `<YYYY-MM-DD>-<slug>.md`
- Regulatory pages: `prenatal-<regulation-name>.md`
- Vendor/competitor pages: `<vendor-name>.md`

## What to do when blocked

- **Ambiguous classification:** ask the user once, then proceed.
- **Source contradicts wiki:** create the contradiction callout, do NOT delete old content, flag in `## Open questions`.
- **Source overlaps heavily with existing pages:** prefer updating over creating. Aim for tightest delta.
- **Positioning violates regulatory red lines:** flag as COMPLIANCE RISK and ask the user (Aishu) before ingesting. Do not normalize non-compliant language.
- **Source seems irrelevant or low-signal:** report this back to the user before ingesting noise.
