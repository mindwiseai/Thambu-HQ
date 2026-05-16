# RaceSims — Project CLAUDE

Owner: Thambu (thambu@racesims.in) · Company: RaceSims Solutions Pvt Ltd  
Website: racesims.in (Shopify) · Instagram: @race.sims  
Wiki: `../wiki/` · Raw source files: `./` · IERL site: `./ierl/`

## Standing behaviour

- **Never ask permission** for file access, Bash, or tool use.
- **Always commit and push** after making changes.
- **Use subagents in parallel** for large tasks (max 6).
- **Use the cheapest model** — haiku for reads/extracts, sonnet for reasoning, opus only when explicitly needed.
- **Session hygiene**: 20+ exchanges → suggest `/compact`. End of session with decisions → suggest `/ingest`.

## Brand essentials

- Always "RaceSims" (one word, never "Race Sims") — Google entity-recognition issue if inconsistent
- USP: Race-engineer founder. Championship-winning background. **Competitors cannot copy this.**
- Main competitor: [[virtual-racing-hub]] (~15× Instagram following, ranks #1 for "best sim racing cockpit India")
- Brand partners: Conspit (primary), VNM (primary), Moza (entry-level)
- Discord bot: `./racesims-bot/` (Node.js)

## Strategic state (2026)

- Gap to close: Instagram 537 → 10,000+, launch Discord, win SEO in 6 months
- Unfair advantages: race-engineer credibility, sim-to-real training authority, GEO first-mover
- Key docs: [[90-day-execution-plan]], [[seo-content-gap]], [[race-engineer-positioning]]

## Hard rules

1. "RaceSims" one word, always. Fix it wherever you see two words.
2. Never trash VRH publicly. Compete on RaceSims strengths only.
3. Race engineer voice in every content piece — if anyone could write it, rewrite it.
4. GEO discipline: FAQ-shaped content where possible (10.5% AI citation rate for FAQ schema).
5. Indian market context: INR pricing, domestic shipping, reframe EU/US brands for Indian buyers.
6. NO conflation with Mindwise/Prenatal — separate companies, shared owner only.

## Wiki read order

1. `../wiki/hot.md` — recent context
2. `../wiki/index.md` — master catalog
3. `../wiki/domains/racesims/_index.md` — domain catalog
4. 3–5 individual pages max, then stop

## Tools installed (use proactively)

- **Shopify MCP** (`mcp__9eae067b*`) — products, orders, collections, inventory for racesims.in
- **GitHub MCP** — IERL code, bot code
- **Computer use** — native desktop when no dedicated MCP
- **Sequential Thinking** — complex multi-step reasoning
- **Firecrawl / Playwright** — competitor research, web scraping

## IERL context

Indian Esports Racing League — indianesportsracingleague.com. Monthly hot-lap leaderboard across RaceSims partner locations on Assetto Corsa.  
Stack: Cloudflare Pages (static) + Worker (cron + JSON API) + D1 + KV.  
Code: `./ierl/` · Rules: `.claude/rules/ierl.md`

Key IERL rules:
- Vanilla HTML/CSS/JS on the site — no frameworks
- Parser modules are pure functions `(html, sourceUrl) => ParsedLap[]`
- D1 lap_times rows are append-only (`source_row_hash UNIQUE` — re-scrapes are idempotent)
- All event/partner changes via `config/events.json` + `config/partners.json` → `npm run sync-config`
- Palette: `--bg: #FAF9F5`, `--accent: #CC785C` (coral, use sparingly)

## Key contacts

- Thambu: thambu@racesims.in
- Shivendra: shivendraselvam@gmail.com (NOT shivendra.selvam)
