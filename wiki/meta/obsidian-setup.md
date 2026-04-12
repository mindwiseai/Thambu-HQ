---
title: Obsidian Setup Guide
type: meta
---

# Obsidian Setup Guide

How to use [Obsidian](https://obsidian.md) as a read-only viewer for the Thambu-HQ wiki.

## Mental model

**The wiki is owned by Claude. You read it in Obsidian, you do not type into it.**

Why: every wiki page follows a schema (see [[wiki-schema]]). Manual edits drift the schema, which kills the LLM's ability to maintain it. The whole point of the [Karpathy LLM wiki pattern](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) is removing the bookkeeping burden from the human.

If you want to add or change something in the wiki, do it through Claude:
- "Ingest the meeting notes from yesterday" → Claude updates the wiki
- "There's a contradiction in [[aarti-samant]] — check it" → Claude resolves it
- "Lint the wiki" → Claude reports drift

## Initial setup (one-time)

1. **Open Obsidian** → "Open folder as vault"
2. **Pick:** `/Users/mindwise.ai/Documents/Claude/Projects/Thambu-HQ`
3. The vault loads. You'll see `wiki/`, `racesims/`, `mindwise/`, `command-center/`, `voice-briefs/`, `.claude/`, `.github/`.

## Required configuration

Settings → **Files & Links**:

- **Default location for new notes:** `wiki/sources/` *(in case you do create a note manually, it lands in the right place)*
- **New link format:** `Shortest path when possible`
- **Use Wikilinks:** ON
- **Detect all file extensions:** OFF (so you don't see `.html`, `.docx` etc. cluttering)

Settings → **Files & Links → Excluded Files** (this is the critical bit — hides the raw layer from the graph view):
- `racesims/`
- `mindwise/`
- `command-center/`
- `voice-briefs/`
- `.claude/`
- `.github/`

After this, the graph view will show **only the wiki layer** — exactly what you want.

Settings → **Appearance**:
- **Show inline title:** ON

Settings → **Editor**:
- **Strict line breaks:** OFF
- **Show line number:** ON (helps when debugging)

Settings → **Hotkeys** (optional but recommended):
- `Cmd+G` → Open graph view
- `Cmd+Shift+F` → Search in all files
- `Cmd+P` → Quick switcher

## How to navigate the wiki

### Start here
1. Open `wiki/index.md` → master catalog
2. Open `wiki/hot.md` → recent context
3. Click any `&#91;&#91;wiki-link&#93;&#93;` to follow the graph

### Graph view (the killer feature)
- Open `wiki/index.md`
- Click the graph icon (top-left of pane)
- You'll see entities (blue), concepts (purple), sources (green) connected by lines
- **Hubs** (densely-connected nodes) are the most important pages — usually [[your-unfair-advantage]], [[cdri-08]], [[virtual-racing-hub]], [[race-engineer-positioning]], etc.
- **Orphans** (disconnected nodes) need attention — they're either new pages awaiting links or stale pages to clean up

### Local graph (focus on one page)
- Open any wiki page (e.g., [[manik]])
- Open the local graph in the right sidebar
- Shows just the pages directly linked to/from this one
- Powerful for "show me everything around this entity"

### Backlinks panel
- Right sidebar → Backlinks
- Shows every page that links TO the current page
- Critical for understanding context: when you open [[aarti-samant]], the backlinks panel shows every meeting / decision / concept she touches

## Plugins to install (optional)

These are NOT required but useful:

| Plugin | What it does |
|---|---|
| **Dataview** | Query frontmatter as a database (e.g., "show me all sources with `domain: mindwise` ingested in March") |
| **Outliner** | Better outline editing |
| **Better Search Views** | Better search UX |

> **Note:** "Hot Reload" was previously recommended but has been removed from the community plugin store. Modern Obsidian (1.12+) auto-detects external file changes when you switch back to the app, so it's no longer needed.

DO NOT install:
- Obsidian Sync (you don't need it — git is your sync)
- Excalidraw (the wiki is text, not drawings)
- Any plugin that auto-modifies files (will break the schema)
- Daily Notes (the [[log]] is your daily note)

## Mobile

Obsidian Mobile **does not work well with this setup** because:
- It can't follow symlinks
- It doesn't have access to Claude Code
- The whole point is that Claude maintains the wiki on your laptop

If you need to read the wiki on mobile:
- Use git push → read the wiki on GitHub
- Or use a separate mobile-friendly notes app and sync via export

## External file changes

Claude edits wiki files in the background. Obsidian 1.12+ auto-detects these changes when you Cmd+Tab back to it. If a page ever looks stale, just close and reopen the tab, or restart Obsidian.

## What to do in Obsidian

✅ **Read** the wiki
✅ **Browse** the graph view to find connections
✅ **Search** across pages (Cmd+Shift+F)
✅ **Spot orphans** in the graph view (disconnected nodes)
✅ **Notice when something is missing** and ask Claude to ingest the source

## What NOT to do in Obsidian

❌ Don't type into wiki pages (use Claude to update them)
❌ Don't rename pages manually (breaks all incoming wikilinks)
❌ Don't delete pages manually (use `/lint` first to surface dead links)
❌ Don't move pages between folders (the schema depends on folder location)
❌ Don't create new pages manually (use `/ingest` instead)
❌ Don't install Templater and start scaffolding pages by hand

## Connections
- [[overview]]
- [[wiki-schema]]
- [[hot]]
- [[index]]
