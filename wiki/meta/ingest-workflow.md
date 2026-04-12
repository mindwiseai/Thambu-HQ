---
title: Ingest Workflow — How to Get Content Into the Wiki
type: meta
---

# Ingest Workflow

This is the operational guide for **how to get new content into the wiki**. There are several paths depending on where the content originates. Read this whenever you need to add new material.

## The mental model

```
RAW content arrives from many places
        ↓
Lands in a raw folder (voice-briefs/, mindwise/, racesims/, or arrives via an MCP)
        ↓
You tell Claude: "ingest this" / "check and ingest"
        ↓
Claude reads the raw content, extracts entities/concepts, writes wiki pages,
updates index/log/hot, and asks follow-up questions if anything is ambiguous
```

The user never writes wiki pages directly. Claude owns the wiki layer. Humans own the raw layer.

---

## Path 1: Voice briefs (the simplest daily workflow)

**When to use:** your daily stream-of-consciousness thoughts, meeting recaps, decisions, travel plans, to-dos.

**How:**
1. Open Gmail on your phone
2. Compose → To: `mindwise.ai@gmail.com` (yourself) → Subject: "Voice brief" → Body: dictate whatever's on your mind
3. Send
4. Next time you're at your computer, tell Claude: **"check my latest voice briefs and ingest"**

Claude will:
- Search Gmail for recent messages from `thambu@racesims.in` → `mindwise.ai1@gmail.com` with subject matching voice-brief patterns
- Save the raw email body to `voice-briefs/YYYY-MM-DD-thambu-voice-brief.md`
- Create a wiki source page under `wiki/sources/YYYY-MM-DD-thambu-voice-brief.md`
- Extract new entities, concepts, decisions, action items
- Update existing wiki pages with new facts
- Log the ingest in `wiki/log.md`

**The first example** that proved this pipeline: [[2026-03-26-thambu-voice-brief]] — ingested on 2026-04-12, which created 14 new entity pages and 3 new concept pages including the critical [[arka-motorsports|ARKA Motorsports]] finding.

---

## Path 2: Documents (meeting notes, PDFs, Word docs, HTML files)

**When to use:** meeting minutes, strategy decks, regulatory documents, competitive intel reports, blog drafts, partner docs.

**How:**
1. Drop the file into the appropriate raw folder:
   - **Mindwise-related:** `mindwise/Meeting Notes/`, `mindwise/CTD Module 2 - Mindwise/`, `mindwise/Launch Planning/`, `mindwise/Assets/`, or just `mindwise/` if uncategorized
   - **RaceSims-related:** `racesims/content/`, `racesims/strategy/`, `racesims/kits/`, `racesims/assets/`, or just `racesims/`
   - **Cross-cutting or unclassified:** drop it anywhere, tell Claude the path
2. Tell Claude: **"ingest [path-to-file]"** or just **"I dropped a new doc in mindwise/, please ingest it"**

Supported formats Claude can read directly:
- `.md`, `.txt`, `.html` — read directly
- `.docx`, `.doc`, `.pdf` — read via `textutil` (macOS) or system conversion
- `.pptx`, `.xlsx` — can be read, but less reliable; prefer exporting to PDF first
- Images (`.png`, `.jpg`, screenshots) — Claude can view them directly
- `.json`, `.csv` — read directly

**File-naming convention:** if you want the file name to help Claude classify, use `YYYY-MM-DD-short-description.ext`. E.g. `mindwise/Meeting Notes/2026-04-15-sorted-followup.docx`.

---

## Path 3: Gmail (emails from partners, suppliers, customers)

**When to use:** important emails from Sorted Agency, customers, vendors, regulators, press.

**How:**
- Tell Claude: **"check my latest emails and ingest the relevant ones"**
- Or be specific: **"check emails from manik@sortedagency.com and ingest"**
- Or narrow the search: **"search Gmail for 'CTD' and ingest anything new"**

Claude will:
- Use the Gmail MCP to search your `mindwise.ai1@gmail.com` inbox
- Filter for relevance (ignore promotional / newsletter / security-alert spam)
- Read the key messages in full
- Ingest the content the same way as any other source

**Current findings worth noting:**
- **Sorted Agency (Aarti, Manik, Binita, Tanya, Avantika) communicate via WhatsApp, not email.** Don't expect to find strategy emails from them. If you want chat content from them, see Path 4.
- **Thambu's voice briefs are sent as self-emails to `mindwise.ai@gmail.com`** with the subject "Voice brief" and are picked up by Path 1.
- **CTD regulatory documents** arrive by email (the March 31 conversion thread). These are high-value ingestion targets.

---

## Path 4: WhatsApp chats

⚠️ **Limitation:** there is currently **no WhatsApp MCP connected** to this Claude instance. Claude cannot directly read your WhatsApp messages.

**How to get WhatsApp content into the wiki:**

### Option A: Export a chat (recommended for periodic bulk ingests)
1. Open WhatsApp on your phone
2. Open the chat (e.g., the Sorted Agency group)
3. Tap the chat name → **Export Chat** → **Without Media** (faster) or With Media (slower)
4. Choose "Email" or "Save to Files"
5. Save to your Mac and drop the resulting `.txt` file into `mindwise/Meeting Notes/` (or `racesims/` depending on context)
6. Tell Claude: **"I exported the WhatsApp chat, please ingest from [path]"**

Claude will parse the WhatsApp export format (each message is on its own line with timestamp + sender + text), build a chronological timeline, extract decisions, and update the relevant entity / concept pages.

**The precedent for this:** [[2026-03-23-mindwise-meetings-chat-analysis]] is exactly this — a WhatsApp chat export that was processed into a comprehensive timeline before being ingested into the wiki.

### Option B: Paste the content directly
1. Copy relevant messages from WhatsApp (tap and hold a message, "Copy")
2. Paste into a chat with Claude: **"ingest this chat snippet:"** + the pasted text
3. Claude will ingest it directly — no file needed for small snippets

### Option C: Manually compile a summary doc
For small amounts of content, just write a short summary doc yourself in Markdown and drop it into the right folder. Claude will ingest it like any other document.

### Why no WhatsApp MCP
WhatsApp doesn't offer a public API for reading personal chats (privacy + encryption). The only way to automate this would be an unofficial scraper, which breaks ToS and is fragile. The export-based workflow is the official, stable path.

---

## Path 5: Discord bot voice briefs (advanced, partially built)

The [[racesims-bot|RaceSims Discord bot]] in `racesims/racesims-bot/` is configured to (eventually) drop voice-brief transcripts into `voice-briefs/` automatically. Once the Discord server is live (see [[discord-server-setup-kit]]), voice briefs sent via Discord will land as files in that folder with no manual export step.

**Current status:** bot built, Discord server not yet created, voice brief path not yet tested end-to-end.

---

## Path 6: Screenshots and images

**When to use:** you see something on screen — a WhatsApp message, a design mockup, a Google Sheets row, a webpage — and want to capture it.

**How:**
1. Take a screenshot (`Cmd+Shift+4` on Mac)
2. Drop the screenshot into any folder in the repo
3. Tell Claude: **"ingest that screenshot I just dropped in [folder]"**

Claude will view the image, read any text (OCR), identify entities, and create the appropriate wiki pages. Particularly useful for:
- WhatsApp screenshots (when you don't want to do a full export)
- Packaging mockups
- Design references
- Google Sheets / Notion / dashboard screenshots

---

## What happens after ingest

Every successful ingest operation does 5 things:

1. **Creates a source page** in `wiki/sources/YYYY-MM-DD-<slug>.md` that represents the raw document
2. **Creates or updates entity / concept pages** with new facts from the source (typically 8–15 pages touched per ingest)
3. **Logs the operation** in `wiki/log.md` with the date, source, and list of changed pages
4. **Updates `wiki/hot.md`** with a 1–2 sentence note about what was just ingested
5. **Flags open questions** in the source page's "Open" section for things Claude couldn't resolve

You should **not need to do anything** after ingest except sometimes answer Claude's follow-up questions (e.g., "Is 'Patco Packing Solutions' the same vendor as 'Patco Pharmaceuticals Pvt Ltd'?").

---

## When to run lint

After 10–15 ingests, run: **"lint the wiki"**

Lint surfaces:
- Orphan pages (zero inbound links)
- Dead links
- Contradictions between sources
- Marketing claims not backed by CTD (Mindwise-specific)
- Pages that have grown past 200 lines (need splitting)
- Schema drift

See [[meta/lint-2026-04-12|the first lint report]] and [[meta/lint-2026-04-12-cleanup-verification|the cleanup verification]] for examples.

---

## What NOT to do

❌ **Don't write wiki pages by hand.** Claude owns the wiki layer. Manual edits create schema drift that eventually kills the wiki.
❌ **Don't delete wiki pages manually.** Run `lint` first to see what links to them.
❌ **Don't rename wiki pages manually.** Breaks all incoming `&#91;&#91;wikilinks&#93;&#93;`.
❌ **Don't commit raw files containing secrets.** `.env`, API keys, passwords — these should never go into the repo. The `.gitignore` already blocks `.env` files.
❌ **Don't bypass the source pages.** Every fact in the wiki should trace back to a source. If something is just "in your head," say so and Claude will mark it as (inference).

## What TO do

✅ **Dump things liberally.** A rough dump is better than no dump.
✅ **Tell Claude what's important** when there's ambiguity ("the Sorted slides from last week" is clearer than "check the mindwise folder").
✅ **Give context for unfamiliar names.** "Ingest the Raghav email — he's the new Coimbatore dealer" helps Claude not create a duplicate entity.
✅ **Ask for a re-lint after a big ingest.** Catches drift early.

## Connections
- [[overview]] — wiki architecture
- [[wiki-schema]] — page conventions
- [[obsidian-setup]] — how to view the wiki
- [Wiki ingest rule](../.claude/rules/wiki-ingest.md) — the procedure Claude follows
- [Wiki query rule](../.claude/rules/wiki-query.md)
- [Wiki lint rule](../.claude/rules/wiki-lint.md)
