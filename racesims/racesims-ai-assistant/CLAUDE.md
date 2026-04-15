# RaceSims AI Bot — Dedicated Workspace

This is the focused workspace for the RaceSims WhatsApp + Instagram AI assistant. Open a new Claude Code session from this folder (`cd racesims/racesims-ai-assistant && claude`) when you want to iterate on the bot without pulling in Mindwise / Prenatal / wiki context.

For the broader Thambu-HQ architecture, see `../../CLAUDE.md`.

## What lives here

```
racesims-ai-assistant/
├── src/
│   ├── index.js          Express + webhook + WebSocket dashboard
│   ├── ai.js             Claude integration — generateResponse(history, contact)
│   ├── whatsapp.js       Meta Cloud API send/parse
│   ├── instagram.js      Meta Instagram Graph send/parse
│   ├── database.js       better-sqlite3 — contacts, messages, escalations
│   └── escalation.js     Lead intelligence + iMessage alerts to Thambu
├── knowledge/            ← THE KB. Update these files to fix "old info" bugs.
│   ├── products.json       8 kits, 105 components, prices in INR
│   ├── faq.json            10 categories, 78 Q&As
│   ├── conspit-technical.json   Conspit deep specs
│   ├── vnm-technical.json       VNM motion platform specs
│   └── system-prompt.md         Tone, brand voice, length rules
├── dashboard/            Static dashboard at http://localhost:3000
├── data/                 SQLite DB + PM2 logs + tunnel log
├── ecosystem.config.cjs  PM2 config — manages racesims-ai AND racesims-tunnel
├── start.sh              One-shot: pm2 start + tunnel + webhook URL print
└── .env                  Meta tokens, Anthropic key (NEVER commit)
```

## Current live state (as of 2026-04-15)

- **WhatsApp number:** +91 7397 308 899 (RaceSims WABA, VERIFIED)
- **Founder escalation line:** +91 73582 29224 (stays Thambu's direct line, NOT the bot)
- **Access token:** System User token, `expires_at: 0` (never expires)
- **App ID:** 2547272275689761 (RaceSims Bot)
- **WABA ID:** 810989762085023
- **Phone Number ID:** 1091974950664804
- **Webhook URL:** `https://mindwise.tail301de7.ts.net/webhook` via Tailscale Funnel (stable forever per this machine). No DNS on racesims.in touched — Shopify and Google Workspace email remain on GoDaddy unchanged.
- **Meta mode:** Dev — only test-allowlist numbers can message the bot. Business Verification (not App Live) is what unlocks open-world messaging.
- **PM2 state saved.** Both apps auto-restart on crash.

## The three live concerns (as of today)

1. **Knowledge base is stale.** Bot quotes old prices / missing products. Fix in `knowledge/*.json`.
2. **Responses too long + broken markdown.** The bot sometimes replies with multi-paragraph dumps to one-word questions, and uses `**bold**` which WhatsApp doesn't render (WhatsApp uses `*bold*`). Fix in `knowledge/system-prompt.md` — add explicit length rule (1–3 sentences default) and WhatsApp markdown rule (`*bold*`, `_italic_`, `~strike~`, no tables/headers).
3. **Proper KB editor in `../../command-center/index.html`.** A dashboard panel for editing products / FAQ / system-prompt / technical KBs without touching JSON, with save → POST `/api/kb/reload` → bot restarts automatically.

## Operational state (stable — resolved 2026-04-15)

- **Webhook URL** is stable via Tailscale Funnel (no DNS changes to racesims.in — Shopify + Google Workspace email untouched on GoDaddy).
- **See `RUNBOOK.md` in this folder** for recovery procedures. It covers 9 scenarios (Mac reboot, bot crash, webhook failure, new Mac, etc.) with exact commands.
- If anything changes (reboot, machine swap, token rotation) — start at `RUNBOOK.md` before anything else.

## Standing rules for this workspace

- **NEVER commit `.env`** — it contains the never-expire Meta token and Anthropic key. Already in `.gitignore`.
- **Bot restarts:** `npx pm2 restart racesims-ai --update-env` (the `--update-env` is critical — PM2 caches env vars otherwise)
- **Tunnel restarts:** `npx pm2 restart racesims-tunnel`. This rotates the trycloudflare URL — you'll need to re-paste into Meta webhook config.
- **KB edits are live-reloaded?** Check `src/ai.js` — if it `JSON.parse(readFileSync(...))` at startup only, then yes restart is needed after editing `knowledge/*.json`. If it reads on each request, edits are instant.
- **Race-engineer voice is the moat.** See `../../.claude/rules/racesims.md` for the full brand rules. System prompt must always foreground the race-engineer / telemetry / sim-to-real angle.
- **Brand name:** always "RaceSims" (one word), never "Race Sims" (two words). Same hard rule as the main racesims rules file.
- **Don't trash VRH.** Competitive positioning is public on strengths, never by naming or attacking [[virtual-racing-hub]].

## What to do vs. NOT do here

**Do:**
- Edit `knowledge/*.json` to fix stale info
- Tweak `knowledge/system-prompt.md` for tone / length
- Add new knowledge files (e.g., `moza-technical.json`, `simagic-technical.json`) and wire them in `src/ai.js`
- Build a KB editor UI in `../../command-center/index.html` for non-JSON editing (the "proper KB" plan)
- Fix bot bugs in `src/*.js`
- Iterate on `src/escalation.js` rules (when to escalate vs. not)

**Don't:**
- Don't refactor `src/` without a reason — the code works end-to-end
- Don't add a second dashboard. All ops UI goes into `../../command-center/index.html`.
- Don't generate new brand/marketing content here — that belongs in the marketing RaceSims window
- Don't touch DNS / Cloudflare / Meta config without confirming with Thambu — tokens and webhook URLs are the things most likely to break production
- Don't silently swap Claude models or prompt structure — `generateResponse` in `src/ai.js` is the single chokepoint; changes there affect every customer reply

## Fast tasks you'll do often

- **"Update price for X"** → edit `knowledge/products.json` → `pm2 restart racesims-ai --update-env`
- **"Add FAQ"** → append to `knowledge/faq.json`, follow existing schema → restart
- **"Make replies shorter"** → edit `knowledge/system-prompt.md`, add explicit rule (e.g., "Default to 1–3 sentences. Only go longer if the user asked for detail.") → restart
- **"Restart bot"** → `npx pm2 restart racesims-ai --update-env && npx pm2 logs racesims-ai --lines 20 --nostream`
- **"Get tunnel URL"** → `grep -oE 'https://[a-z0-9-]+\.trycloudflare\.com' data/tunnel.log | tail -1`
- **"Test a reply locally"** → send yourself a WhatsApp from an allowlisted number; watch `pm2 logs racesims-ai`

## Deferred (waiting on external)

- [ ] Named Cloudflare tunnel at `bot.racesims.in` — pending Cloudflare account + GoDaddy NS delegation
- [ ] Business Verification — pending docs submission to Meta (not App Live mode — that's a different thing)
- [ ] Instagram DM bot path — needs App Live mode AND Instagram page token; lowest priority until WhatsApp is humming
- [ ] `pm2 startup` for auto-launch on Mac reboot — optional; requires sudo
