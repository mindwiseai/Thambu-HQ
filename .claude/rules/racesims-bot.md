---
description: RaceSims AI Bot rules — load when working in racesims-ai-assistant/ or command-center/ KB-editor code
paths:
  - "racesims/racesims-ai-assistant/**"
  - "command-center/**/kb-editor*"
---

# RaceSims AI Bot — Project Rules

These rules apply when working on the RaceSims WhatsApp + Instagram AI bot, OR on the KB-editor UI that lives in `command-center/`.

## Context

The bot is a Node.js + Express app using Claude (Anthropic SDK) as the brain, with a structured knowledge base loaded from `knowledge/*.json` at startup. It runs under PM2 alongside a Cloudflare tunnel. See `racesims/racesims-ai-assistant/CLAUDE.md` for the full architecture.

## Hard rules

1. **Never commit `.env`.** It holds the never-expire Meta System User token and the Anthropic API key. Both are production credentials.

2. **`dotenv.config({ override: true })` is load-bearing.** Do NOT change it back to `import 'dotenv/config'` — parent processes (Claude Code, PM2) can inherit empty/stale env vars that silently shadow the `.env` file. The override is the fix.

3. **Every change to `knowledge/*.json` or `system-prompt.md` requires `pm2 restart racesims-ai --update-env`.** The files are loaded at startup only. The `--update-env` flag is critical — PM2 caches env vars otherwise.

4. **Race-engineer voice is the moat.** Any edit to `system-prompt.md` must keep the race-engineer / telemetry / sim-to-real framing. Strip that out and we sound like every other sim-racing reseller.

5. **"RaceSims" is one word.** Never "Race Sims". Hard rule from the main RaceSims project rules.

6. **No public attacks on VRH.** Competitive positioning in bot replies should lean into RaceSims strengths (race-engineer founder, pro focus), never by naming or attacking competitors.

7. **Pricing in INR, inclusive of 18% GST unless noted.** All KB prices must follow this convention. If an item is estimated (converted from USD), mark `"price_note": "est."` in products.json.

## KB editor (command-center/ UI)

When building or editing the KB editor in `command-center/`:

- **ONE dashboard rule still applies.** All ops UI goes into `command-center/index.html`. The KB editor is a panel / tab / modal within it, NOT a separate page.
- **RaceSims red vs. Mindwise teal.** The KB editor for RaceSims uses the red palette consistent with the rest of the RaceSims section of the dashboard.
- **Live-reload discipline.** If the editor writes to `knowledge/*.json`, it MUST also trigger a bot restart (via a dashboard POST endpoint on the bot, e.g. `POST /api/kb/reload`) — otherwise the user saves and is confused why nothing changed.
- **Schema safety.** Never let the editor write malformed JSON. Validate before save.
- **Preserve `last_updated`.** On every save, stamp `last_updated` to today's date. This is how we track KB freshness.

## Common mistakes to avoid

- **Editing KB and forgetting to restart.** The #1 "why isn't the bot using my new info" trap. Restart is mandatory.
- **Model drift.** `generateResponse` in `src/ai.js` is the single choke. Don't scatter Claude calls across multiple files.
- **Token over-injection.** Last measured: 26K input tokens per reply because the full KB is injected. This is fine for now but if it grows, move to retrieval (embed KB chunks, fetch top-k per query). Don't pre-optimize — measure first.
- **Escalation rule creep.** `src/escalation.js` decides when to ping Thambu's iMessage. Be conservative — a bot that escalates everything is as bad as one that escalates nothing.

## What to read before answering bot questions

1. `racesims/racesims-ai-assistant/CLAUDE.md` — workspace readme
2. `racesims/racesims-ai-assistant/src/ai.js` — the generateResponse function
3. `racesims/racesims-ai-assistant/knowledge/system-prompt.md` — the prompt
4. `racesims/racesims-ai-assistant/knowledge/products.json` + `faq.json` — the KB content
5. `.claude/rules/racesims.md` — overall RaceSims brand rules (parent context)

## Don't

- Don't rewrite the bot from scratch — it's production. Surgical edits only.
- Don't create parallel KB files (e.g. `products-v2.json`). Edit the canonical file in place.
- Don't touch Meta webhook config without explicit go-ahead from Thambu. Breaking the webhook = bot offline = customer DMs lost.
- Don't change the PM2 app names (`racesims-ai`, `racesims-tunnel`). Scripts, dumps, and this file all reference them.
