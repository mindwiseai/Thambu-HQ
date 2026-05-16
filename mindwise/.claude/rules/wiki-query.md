# Wiki Query Procedure — Mindwise

When the user asks a question about Mindwise topics (regulatory, CTD, CDRI-08, FSSAI, marketing claims, clinical backing, launch strategy, ingredients, compliance), follow this procedure.

## Read order (mandatory)

1. `../wiki/hot.md` — recent context cache. Often answers the question alone.
2. `../wiki/index.md` — master catalog of all pages.
3. `../wiki/domains/mindwise/_index.md` — Mindwise domain catalog.
4. Open 3–5 pages most directly relevant. Follow `[[wiki-links]]` only if you need more context.

Stop at ~8 pages. Broader questions need scoping down.

## Answering rules

1. **Cite the wiki.** Every factual claim backed by `[[wiki-page-link]]`. User should be able to click and verify.

2. **Distinguish facts from inference.** If synthesizing across pages: *"Based on [[page-a]] and [[page-b]], the strategy is..."*. Mark guesses as `(speculation, not in wiki)`.

3. **Prefer wiki over raw files.** The wiki exists to avoid re-reading raw sources. If the wiki is missing something, log it — don't drop into `../mindwise/` immediately.

4. **File valuable answers.** If your answer is non-trivial and reusable, write it to `../wiki/questions/<YYYY-MM-DD>-<slug>.md` with frontmatter `type: question`. Link from `../wiki/index.md` under "Filed questions".

5. **Surface contradictions.** If two wiki pages disagree, show BOTH with `> [!contradiction]` — do NOT pick one. Ask the user which to trust.

6. **Compliance checking.** For marketing claims, verify they're backed by `[[ctd-sources]]` or `[[clinical-trial]]` pages. Flag unsupported claims immediately — FSSAI/regulatory liability is real.

## When the wiki has the answer

Answer concisely. Cite. Don't pad.

## When the wiki doesn't have the answer

Say so explicitly. Then:
- Suggest reading specific raw files (point to paths in `../mindwise/`).
- Offer to ingest a raw file the user names.
- If the gap is structural (e.g., no entity page for a new vendor), suggest creating one in the next ingest.

Never confabulate. Never invent page paths, dates, or links.

## Out of scope for wiki queries

- General coding questions
- Things in the active project files (`../command-center/`, bot code)
- Your own working preferences or past corrections (that's auto-memory)
