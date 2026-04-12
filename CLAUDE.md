# Thambu's HQ — Unified Project Hub

Workspace for Thambu's two businesses, organized as a [Karpathy LLM Wiki](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) on top of an existing project monorepo.

## The two businesses
- **RaceSims** — India's pro-grade sim racing hardware company. racesims.in. Public.
- **Mindwise** — Cognitive wellness supplement (CDRI-08 Bacopa monnieri) by Lumen Marketing Company. Launching 2026-06-01.

## Three-layer architecture

```
Thambu-HQ/
├── wiki/              ← LLM-OWNED knowledge layer. Humans read in Obsidian, never write.
├── racesims/          ← RAW source: sim racing kits, content, strategy, bot
├── mindwise/          ← RAW source: brand strategy, CTD regulatory, meeting notes, launch plan
├── voice-briefs/      ← RAW source: Discord-bot voice transcripts (drop here, then ingest)
├── command-center/    ← unified dashboard (operational, not part of the wiki)
├── .claude/rules/     ← schema layer (loads on demand via paths: scoping)
└── CLAUDE.md          ← this file (the spine)
```

## How to use the wiki

Read order — **always** in this sequence, stop as soon as you have what you need:

1. `wiki/hot.md` — recent context cache (~500 words)
2. `wiki/index.md` — master catalog
3. `wiki/domains/<domain>/_index.md` — domain catalog (mindwise or racesims)
4. 3–5 individual wiki pages

If you find yourself reading 8+ pages, stop. Either narrow the question or update the wiki indexes.

## Three operations
- **`/ingest <source>`** — read a raw file, write/update wiki pages, log it. See `.claude/rules/wiki-ingest.md`.
- **`/query <question>`** — answer from the wiki with citations. See `.claude/rules/wiki-query.md`.
- **`/lint`** — audit the wiki for orphans, dead links, contradictions, schema drift. See `.claude/rules/wiki-lint.md`.

## Standing rules
- All new dashboard features go into `command-center/index.html` — ONE dashboard, never create separate ones.
- Always push after committing.
- Never commit `.env`, credentials, or API keys.
- Keep RaceSims (red) and Mindwise (teal) visually differentiated in the dashboard.
- **Wiki pages are atomic.** 60–200 lines max. One concept/entity/source per page.
- **Link density is the wiki's value.** Every entity/concept/source mention must be `[[wiki-link]]`.
- **Never silently overwrite.** Use `> [!contradiction]` callouts when sources disagree.
- **Lint every 10–15 ingests.** Schema drift kills knowledge bases.

## Domain-scoped rules

Path-scoped rules in `.claude/rules/*.md` load automatically when you touch matching files:
- `mindwise.md` — loads in `mindwise/**` and `wiki/domains/mindwise/**`
- `racesims.md` — loads in `racesims/**` and `wiki/domains/racesims/**`

This keeps the root CLAUDE.md small and only loads domain context when needed.

## Key Info
- Owner: Thambu (thambu@racesims.in)
- RaceSims website: racesims.in
- Mindwise launch: June 1, 2026
- Voice updates come via Discord bot or email voice briefs → drop into `voice-briefs/` → run `/ingest`
