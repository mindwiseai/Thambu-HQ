# Wiki Lint Procedure — Mindwise

Run when the user says "lint the wiki" or "audit the wiki". Recommended cadence: every 10–15 ingests, or quarterly minimum. Lint catches the slow degradation that kills knowledge bases.

## What to check (in priority order)

### 1. Schema drift (highest priority)
- Are page frontmatter blocks consistent (`title`, `type`, `domain`, etc.)?
- Are pages roughly the same shape (headings, structure)?
- Has any page grown past 200 lines? Flag for split.
- Are there any pages with no frontmatter at all?
- For CTD and clinical pages, is the `regulatory_layer` field present and consistent?

### 2. Orphan pages
- List every page in `../wiki/` under Mindwise domain that has zero inbound `[[wiki-links]]` from other pages.
- Orphans aren't always bad (recently added entities might not be linked yet), but they're suspicious.

### 3. Dead links
- For every `[[wiki-link]]`, check that the target page exists.
- Report broken links with the source page that contains them.

### 4. Contradictions
- Find every `> [!contradiction]` callout in the wiki and surface them.
- Find statements that look factually inconsistent across pages (best-effort, not exhaustive).
- **Regulatory contradictions are critical:** e.g., if one page says "Bacopa is FSSAI-approved for pregnancy" and another says "no pregnancy claims allowed," flag immediately.

### 5. Missing pages
- Find entity / concept names mentioned 3+ times across the wiki that don't have their own page yet. These are missing pages waiting to be created.
- Examples: "CTD Module 2.3" mentioned 5 times but no dedicated page → create one.

### 6. Unlinked mentions
- Find places where a known entity name appears in plain text instead of a `[[link]]`.
- Common offenders: "FSSAI" instead of `[[fssai]]`, "CDRI-08" instead of `[[cdri-08]]`, "Lumen" instead of `[[lumen-marketing-company]]`.

### 7. Stale index
- Are all the major entities and concepts listed in `../wiki/index.md`?
- Are deprecated / merged pages still in the index?
- Is the `../wiki/log.md` chronological order intact (newest at top)?

### 8. Hot cache drift
- Is `../wiki/hot.md` actually reflecting recent activity, or is it stuck on something from weeks ago?
- Trim if over ~500 words.

### 9. Compliance cross-check (CRITICAL for Mindwise)
- **For every marketing claim referenced in Mindwise wiki pages**, verify the claim is backed by:
  - A CTD source page (e.g., `[[ctd-2-clinical-summary]]`)
  - OR a clinical-trial source page (e.g., `[[clinical-trial-singh-2012-cognition]]`)
  - OR an FSSAI filing / regulatory approval reference.
- Flag any marketing claim with no backing source. This is the killer use case for Mindwise — the FSSAI / regulatory liability is REAL.
- Examples of phrases to audit: "improves memory," "supports cognition," "pregnancy-safe," "no side effects," "clinically proven."

### 10. Regulatory layer consistency
- Check that all CTD and clinical-trial pages have the `regulatory_layer` field properly set.
- Verify that claims in "compliance" pages are sourced to actual regulatory filings.

## Output format

Produce a single markdown report:

```markdown
# Wiki Lint Report — Mindwise — <YYYY-MM-DD>

## Summary
- Total pages: <n>
- Healthy: <n>
- Issues: <n>
- Compliance flags: <n> (CRITICAL)

## 🔴 Critical (must fix)
- Marketing claims without CTD/clinical backing: <list>
- Dead links: <list>
- Regulatory contradictions: <list>
- ...

## 🟡 Warnings (should fix)
- Orphan pages: <list>
- Unlinked entity mentions: <list>
- Pages > 200 lines: <list>
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
- Marketing claims missing CTD/clinical backing: <n> ⚠️

## Regulatory Compliance Summary
- CTD pages audited: <n>
- Clinical trial pages audited: <n>
- FSSAI references checked: <n>
- Unsupported claims found: <n> (requires remediation)
```

Save the report to `../wiki/meta/lint-<YYYY-MM-DD>.md`. Update `../wiki/log.md` with a `lint` entry.

## What NOT to do during lint

- **Never auto-fix.** Lint reports problems; the user decides which to fix. Especially never auto-delete pages, auto-rename, or auto-merge.
- **Never silently update content.** All changes go through normal ingest/edit flow with explicit user direction.
- **Don't re-read every page.** Use Grep aggressively. The point of lint is to be cheap and fast so you can run it often.
- **Don't ignore compliance flags.** If you find unsupported claims, surface them prominently. The user can decide whether to amend the claim or find the backing source.

## Compliance escalation

If the lint report finds **5+ unsupported marketing claims**, add this section at the top:

```markdown
## ⚠️ COMPLIANCE ALERT

This wiki contains <n> marketing claims without regulatory backing. 
Before any Mindwise marketing materials are published, these claims 
must either be:
1. Removed, OR
2. Backed by CTD sections or clinical trial data, OR
3. Reworded to comply with FSSAI Advertising and Claims Regulations (2018).

See "Marketing claims missing CTD/clinical backing" section below for details.
```
