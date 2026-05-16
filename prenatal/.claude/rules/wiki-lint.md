# Wiki Lint Procedure — Prenatal Brand

Run when the user says "lint the wiki" or "audit the wiki". Recommended cadence: every 10–15 ingests, or quarterly minimum. Lint catches the slow degradation that kills knowledge bases.

## What to check (in priority order)

### 1. Schema drift (highest priority)
- Are page frontmatter blocks consistent (`title`, `type`, `domain`, etc.)?
- Are pages roughly the same shape (headings, structure)?
- Has any page grown past 200 lines? Flag for split.
- Are there any pages with no frontmatter at all?
- For regulatory pages, is the `regulatory_layer` field present and consistent?

### 2. Orphan pages
- List every page in `../wiki/` under Prenatal domain that has zero inbound `[[wiki-links]]` from other pages.
- Orphans aren't always bad (recently added vendors might not be linked yet), but they're suspicious.

### 3. Dead links
- For every `[[wiki-link]]`, check that the target page exists.
- Report broken links with the source page that contains them.

### 4. Contradictions
- Find every `> [!contradiction]` callout in the wiki and surface them.
- Find statements that look factually inconsistent across pages (best-effort, not exhaustive).
- **Regulatory contradictions are critical:** e.g., if one page says "nutrients within ICMR RDA" and another says "added extra zinc," flag immediately.

### 5. Missing pages
- Find entity / concept names mentioned 3+ times across the wiki that don't have their own page yet. These are missing pages waiting to be created.
- Examples: "DTC positioning" mentioned 5 times but no dedicated page → create one.

### 6. Unlinked mentions
- Find places where a known entity name appears in plain text instead of a `[[link]]`.
- Common offenders: "FSSAI" instead of `[[fssai]]`, "Ritual" instead of `[[ritual]]`, "pregnancy safe" instead of linking to `[[prenatal-regulatory-red-lines]]`.

### 7. Stale index
- Are all the major entities and concepts listed in `../wiki/index.md`?
- Are deprecated / merged pages still in the index?
- Is the `../wiki/log.md` chronological order intact (newest at top)?

### 8. Hot cache drift
- Is `../wiki/hot.md` actually reflecting recent activity, or is it stuck on something from weeks ago?
- Trim if over ~500 words.

### 9. Regulatory compliance cross-check (CRITICAL for prenatal)
- **Verify all positioning and marketing language** against `[[prenatal-regulatory-red-lines]]`:
  - "Pregnancy safe" should be reworded to "specially formulated for pregnant women" — flag all instances.
  - No therapeutic claims (e.g., "prevents miscarriage," "treats gestational diabetes") — flag any found.
  - All nutrient levels must be ≤1x ICMR RDA to avoid CDSCO drug classification — flag exceedances.
  - FSSAI Advertising and Claims Regulations (2018) compliance — verify all claims are truthful and substantiated.

### 10. Regulatory layer consistency
- Check that all regulatory strategy pages have the `regulatory_layer` field properly set.
- Verify that positioning pages reference the regulatory constraints that govern them.

## Output format

Produce a single markdown report:

```markdown
# Wiki Lint Report — Prenatal Brand — <YYYY-MM-DD>

## Summary
- Total pages: <n>
- Healthy: <n>
- Issues: <n>
- Compliance flags: <n> (CRITICAL)

## 🔴 Critical (must fix)
- Positioning statements violating regulatory red lines: <list>
- Dead links: <list>
- Regulatory contradictions: <list>
- Nutrient levels exceeding ICMR RDA: <list>
- ...

## 🟡 Warnings (should fix)
- Orphan pages: <list>
- Unlinked entity mentions: <list>
- Pages > 200 lines: <list>
- "Pregnancy safe" language (should be "specially formulated"): <list>
- ...

## 🟢 Suggestions (nice-to-have)
- Missing entity pages: <list>
- Stale hot.md entries: <list>
- ...

## Stats
- Total pages: <n>
- Orphan pages: <n>
- Dead links: <n>
- Contradictions: <n>
- Pages > 200 lines: <n>

## Regulatory Compliance Summary
- Regulatory red lines audited: <n> sections
- Positioning statements checked: <n>
- RDA exceedances found: <n> (requires reformulation)
- "Pregnancy safe" language found: <n> (requires rewording)
- FSSAI compliance risks: <n> (requires remediation)
```

Save the report to `../wiki/meta/lint-<YYYY-MM-DD>.md`. Update `../wiki/log.md` with a `lint` entry.

## What NOT to do during lint

- **Never auto-fix.** Lint reports problems; the user (Aishu) decides which to fix. Especially never auto-delete pages, auto-rename, or auto-merge.
- **Never silently update content.** All changes go through normal ingest/edit flow with explicit user direction.
- **Don't re-read every page.** Use Grep aggressively. The point of lint is to be cheap and fast so you can run it often.
- **Don't ignore regulatory flags.** If you find positioning that violates red lines, surface it prominently. Aishu can decide whether to amend or reformulate.

## Regulatory escalation

If the lint report finds **3+ regulatory red line violations**, add this section at the top:

```markdown
## ⚠️ COMPLIANCE ALERT

This wiki contains <n> positioning statements or nutrient claims 
that violate prenatal regulatory red lines:
- <n> instances of "pregnancy safe" language (should be "specially formulated for pregnant women")
- <n> nutrient levels exceeding ICMR RDA (triggers CDSCO drug classification)
- <n> therapeutic or prohibited claims

Before any prenatal marketing materials are published, these must be 
remediated. See "Regulatory Compliance Summary" section below for details.
```
