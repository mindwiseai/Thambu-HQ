# Wiki Lint Procedure — RaceSims Domain

Run when the user says "lint the wiki" or "audit the wiki". Recommended cadence: every 10–15 ingests, or quarterly minimum. Lint catches the slow degradation that kills knowledge bases.

## What to check (in priority order)

### 1. Schema drift (highest priority)
- Are page frontmatter blocks consistent (`title`, `type`, `domain`, etc.)?
- Are pages roughly the same shape (headings, structure)?
- Has any page grown past 200 lines? Flag for split.
- Are there any pages with no frontmatter at all?

### 2. Orphan pages
- List every page in `../wiki/` that has zero inbound `[[wiki-links]]` from other pages.
- Orphans aren't always bad (recently added entities might not be linked yet), but they're suspicious.

### 3. Dead links
- For every `[[wiki-link]]`, check that the target page exists.
- Report broken links with the source page that contains them.

### 4. Contradictions
- Find every `> [!contradiction]` callout in the wiki and surface them.
- Find statements that look factually inconsistent across pages (best-effort, not exhaustive).

### 5. Missing pages
- Find entity / concept names mentioned 3+ times across the wiki that don't have their own page yet. These are missing pages waiting to be created.

### 6. Unlinked mentions
- Find places where a known entity name appears in plain text instead of a `[[link]]`.
- Common offenders: "Thambu" instead of `[[thambu]]`, "VRH" instead of `[[virtual-racing-hub]]`, "Shivendra" instead of `[[shivendra-selvam]]`.

### 7. Stale index
- Are all the major entities and concepts listed in `../wiki/index.md`?
- Are all the major RaceSims entities and concepts listed in `../wiki/domains/racesims/_index.md`?
- Are deprecated / merged pages still in the indexes?
- Is the `../wiki/log.md` chronological order intact (newest at top)?

### 8. Hot cache drift
- Is `../wiki/hot.md` actually reflecting recent RaceSims activity, or is it stuck on something from weeks ago?
- Trim if over ~500 words.

### 9. RaceSims compliance cross-check
- Is "RaceSims" consistently one word throughout all RaceSims domain pages? Check for "Race Sims" (two words).
- For every competitive claim about RaceSims (e.g., "race-engineer positioning", "championship-winning teams"), verify it's backed by a [[racesims]], [[thambu]], or [[race-engineer-positioning]] source page.
- Flag any competitive claim with no backing source. RaceSims positioning is a moat — unsourced claims weaken it.
- Verify that race-engineer voice and USP-aligned content is consistently present in strategy and content pages.

### 10. IERL specificity check (if IERL pages exist)
- Terminology: Do all IERL pages use "Partners" (not "dealers"), "Rounds" (not "events" in public-facing text), "Hot laps" (not "fastest lap time")?
- Are IERL partner pages properly linked to [[racesims]] as the parent brand?
- Are data structure pages (D1, config, parsers) properly cross-referenced?

## Output format

Produce a single markdown report:

```markdown
# Wiki Lint Report — RaceSims Domain — <YYYY-MM-DD>

## Summary
- Total pages: <n>
- Healthy: <n>
- Issues: <n>

## 🔴 Critical (must fix)
- ...

## 🟡 Warnings (should fix)
- ...

## 🟢 Suggestions (nice-to-have)
- ...

## Stats
- Orphan pages: <n>
- Dead links: <n>
- Contradictions: <n>
- Pages > 200 lines: <n>
- "Race Sims" (two-word) instances: <n>
- Unsourced competitive claims: <n>
- IERL terminology violations: <n> (if applicable)
```

Save the report to `../wiki/meta/lint-<YYYY-MM-DD>.md`. Update `../wiki/log.md` with a `lint` entry.

## What NOT to do during lint

- **Never auto-fix.** Lint reports problems; the user decides which to fix. Especially never auto-delete pages, auto-rename, or auto-merge.
- **Never silently update content.** All changes go through normal ingest/edit flow with explicit user direction.
- **Don't re-read every page.** Use Grep aggressively. The point of lint is to be cheap and fast so you can run it often.
