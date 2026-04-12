---
description: How to answer a question using the wiki
---

# Wiki Query Procedure

When the user asks a question that the wiki might know about (anything regarding RaceSims, Mindwise, Sorted Agency, VRH, CDRI-08, meetings, decisions, vendors, content strategy, etc.), follow this procedure.

## Read order (mandatory)

1. **`wiki/hot.md`** first — it caches the most recently touched context. Often answers the question alone.
2. **`wiki/index.md`** — find which pages are relevant.
3. **`wiki/domains/<domain>/_index.md`** if the question is domain-specific.
4. **Open the 3–5 pages most directly relevant.** Follow `[[wiki-links]]` only if you genuinely need more context.

If you find yourself opening more than ~8 pages, stop. The query is too broad — ask the user to narrow it.

## Answering rules

1. **Cite the wiki.** Every factual claim must be backed by a `[[wiki-page-link]]`. The user should be able to click through and verify.

2. **Distinguish wiki facts from inference.** If you're synthesizing across pages, say so: *"Based on [[meeting-3]] and [[meeting-5]], the campaign hook predates the visual identity lock by..."*. If you're guessing, mark it `(speculation, not in wiki)`.

3. **Prefer wiki content over re-reading raw sources.** The wiki exists so you don't have to. If the wiki is missing something, that's a gap to log — not a reason to drop into the raw layer immediately.

4. **File valuable answers back into the wiki.** If your answer is non-trivial AND the user is likely to ask something similar again, write it to `wiki/questions/<YYYY-MM-DD>-<slug>.md` with frontmatter `type: question`. Link from `wiki/index.md` under "Filed questions". This is how exploration compounds.

5. **Surface contradictions.** If two wiki pages disagree, do NOT pick one. Show the user both with `> [!contradiction]` and ask which to trust.

## When the wiki has the answer

Answer concisely. Cite the page. Don't pad.

## When the wiki doesn't have the answer

Say so explicitly. Then options in this order:
- Suggest reading specific raw files (point to paths in `racesims/`, `mindwise/`, or `voice-briefs/`).
- Offer to ingest a raw file the user names.
- If the gap is structural (e.g., "we have no entity page for X"), suggest creating one as part of the next ingest.

Never confabulate. Never invent meeting dates, page paths, or links.

## What NOT to query the wiki for

- General coding questions
- Things already in the active project files (`racesims/racesims-bot/`, `command-center/index.html`)
- Questions about Claude Code itself
- Things from your auto-memory (`~/.claude/projects/.../memory/`) — that's your personal cross-project memory, not the project wiki

If the user asks about your *own* working preferences or past corrections, that's auto-memory territory, not wiki territory.
