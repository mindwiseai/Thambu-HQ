---
title: Wiki Overview
type: meta
---

# Thambu-HQ Wiki — Overview

This wiki is the LLM-maintained knowledge layer for three businesses operating out of the Thambu-HQ monorepo:

- **[[domains/mindwise/_index|Mindwise]]** — cognitive wellness supplement (CDRI-08 / Bacopa monnieri), launching 2026-06-01 under [[lumen-marketing-company|Lumen Marketing Company]]. Currently in the final stretch before launch with [[sorted-agency]] driving brand and packaging. Owned by [[thambu]].
- **[[domains/racesims/_index|RaceSims]]** — India's pro-grade sim-racing hardware company (racesims.in). Currently executing a [[90-day-execution-plan]] to close the gap with main competitor [[virtual-racing-hub]]. Owned by [[thambu]].
- **[[domains/prenatal/_index|Prenatal]]** — India's first transparency-led DTC prenatal & postnatal supplement brand, modeled on [[ritual-benchmark|Ritual]] (US). Pre-launch research phase. Founded by [[aishwarya-chandrasekaran|Aishu]] (Thambu's wife).

## Architecture

This wiki follows the [Karpathy LLM Wiki](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) pattern:

- **Raw layer** — `racesims/`, `mindwise/`, `prenatal/`, `voice-briefs/` — immutable source material. Claude reads but never writes.
- **Wiki layer** — `wiki/` (this folder) — LLM-owned markdown. Humans read in Obsidian, never write.
- **Schema layer** — `CLAUDE.md` + `.claude/rules/*.md` — defines ingest, query, lint procedures.

Three operations: **ingest** (add a raw source → update wiki), **query** (answer a question from the wiki), **lint** (audit the wiki for drift).

## Read order discipline (the cache hierarchy)

When answering anything, read in this order and STOP as soon as you have what you need:

1. `wiki/hot.md` — recent context cache (~500 words)
2. `wiki/index.md` — master catalog
3. `wiki/domains/<domain>/_index.md` — domain catalog
4. 3–5 individual pages relevant to the question

Touching more than ~8 pages per operation is a smell. Either the question is too broad or the wiki is poorly indexed.

## Page anatomy

Every page has frontmatter (`title`, `type`, `domain`) and falls into one of five types:

| Type | Folder | What it is |
|---|---|---|
| `entity` | `wiki/entities/` | A person, company, product, place, or named thing |
| `concept` | `wiki/concepts/` | An idea, framework, decision, or named pattern |
| `source` | `wiki/sources/` | A single ingested raw document, dated |
| `question` | `wiki/questions/` | A filed Q&A from a previous query session |
| `meta` | `wiki/meta/` | Schema docs, lint reports, system pages |

Domain index pages live at `wiki/domains/<domain>/_index.md` and route into the flat folders above.

## Status

Current page count: bootstrapped on 2026-04-11. See `wiki/log.md` for the running history.
