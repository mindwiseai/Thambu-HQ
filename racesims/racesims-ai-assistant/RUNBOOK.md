# RaceSims Bot — Operations Runbook

**When something changes or breaks, come here first.** This is the playbook for every scenario that can put the bot offline, plus the exact commands to get it back up.

Last verified operational: **2026-04-15 12:45 IST**

---

## The stable stack (what you have right now)

| Layer | What | State survives |
|---|---|---|
| **Bot process** | Node.js under PM2 (`racesims-ai`) | PM2 restart, crashes |
| **Public URL** | Tailscale Funnel → `https://mindwise.tail301de7.ts.net` | Mac reboots (Tailscale daemon persists serve config) |
| **Meta token** | System User token, `expires_at: 0` | Never expires |
| **Meta webhook** | Points at the Tailscale URL | Stable as long as Tailscale URL doesn't change |

**The bot's stable URL ONLY changes if:** (a) you rename the Mac's hostname in Tailscale, (b) you switch to a new Mac, (c) you leave the `racesims.in` tailnet and create a new one. None of that happens accidentally.

---

## Quick status check

Run this any time to see everything at a glance:

```bash
cd /Users/mindwise.ai/Documents/Claude/Projects/Thambu-HQ/racesims/racesims-ai-assistant
npx pm2 list                                    # bot running?
curl -s http://localhost:3000/health            # bot responding locally?
/Applications/Tailscale.app/Contents/MacOS/Tailscale funnel status    # funnel up?
curl -s https://mindwise.tail301de7.ts.net/health    # publicly reachable?
```

All four should return green / status:ok. If any one is red, use the matching section below.

---

## Scenario 1 — Mac rebooted

**What should happen automatically:**
- Tailscale daemon restarts on login → Funnel config auto-loads → public URL works
- PM2 (if you ran `pm2 startup`) restarts the bot → bot comes back online

**What to check after reboot:**
1. Open Tailscale menu bar app — should show "Connected" with your machine name "Mindwise"
2. `npx pm2 list` — `racesims-ai` should be `online`. If not: `cd` into the bot folder and run `bash start.sh`
3. `curl -s https://mindwise.tail301de7.ts.net/health` — should return `{"status":"ok",...}`
4. Send a test WhatsApp from +91 97417 88226 to +91 7397 308 899 — bot should reply

**If PM2 did NOT auto-start on reboot** (you never ran `pm2 startup`): run `bash start.sh` from the bot folder. Consider running `pm2 startup` once if you want it automatic next time.

---

## Scenario 2 — Bot crashed (process not responding)

**Symptoms:** WhatsApp messages send but no bot reply. `curl localhost:3000/health` fails.

```bash
cd /Users/mindwise.ai/Documents/Claude/Projects/Thambu-HQ/racesims/racesims-ai-assistant
npx pm2 logs racesims-ai --lines 50 --nostream    # read last 50 lines
npx pm2 restart racesims-ai --update-env          # restart with fresh env
```

The `--update-env` flag is critical. PM2 caches env vars; without it, `.env` edits won't load.

**If it restart-loops:** check `data/error.log` for the repeating error. Common causes: malformed `knowledge/*.json` (JSON parse error), missing `.env`, Anthropic API key revoked.

---

## Scenario 3 — Meta says webhook verification failed

**Symptoms:** Meta dashboard shows red "Verification failed" on the webhook, or messages stop arriving.

**Check in order:**
1. `curl -s "https://mindwise.tail301de7.ts.net/webhook?hub.mode=subscribe&hub.verify_token=racesims_webhook_2026&hub.challenge=test123"` — should return `test123`
   - Empty/error → the funnel or bot is down (see Scenarios 2 or 4)
   - Returns `test123` → Meta-side config is stale; re-paste the URL in Meta → Webhooks → Edit → Verify and save
2. Verify the token in Meta matches `WHATSAPP_VERIFY_TOKEN` in `.env` (`racesims_webhook_2026`)
3. Re-subscribe the WABA to the `messages` field in Meta → Webhooks (this sometimes silently unsubscribes)

---

## Scenario 4 — Tailscale Funnel down

**Symptoms:** `curl https://mindwise.tail301de7.ts.net/health` fails but `curl localhost:3000/health` works.

```bash
TS=/Applications/Tailscale.app/Contents/MacOS/Tailscale
$TS status                   # is Tailscale connected?
$TS funnel status            # is funnel rule still there?
```

**If Tailscale is disconnected:** open the Tailscale menu bar app → sign in again. (Shouldn't happen unless you signed out.)

**If funnel rule is missing:** re-add it:
```bash
/Applications/Tailscale.app/Contents/MacOS/Tailscale funnel --bg 3000
```

**If the URL itself has changed** (e.g. you renamed the machine in Tailscale, or created a new tailnet): grab the new one and update Meta webhook:
```bash
/Applications/Tailscale.app/Contents/MacOS/Tailscale status --json | python3 -c "import sys,json; print('https://'+json.load(sys.stdin)['Self']['DNSName'].rstrip('.'))"
```

---

## Scenario 5 — You replaced the Mac / moved to a new machine

This is the big one. The URL *will* change — you're on a new machine, new hostname.

**Checklist on the new Mac:**
1. Install Tailscale, sign in with the same Google account (`info@racesims.in` or whichever owns the `racesims.in` tailnet)
2. Approve Funnel for the new node: https://login.tailscale.com/admin/machines → click the machine → three-dot menu → "Enable Funnel" (or it may prompt automatically when you run the command)
3. Clone the bot repo, copy the `.env` file over (contains the never-expire Meta token), `npm install`, `bash start.sh`
4. Run `tailscale funnel --bg 3000`
5. Grab the new URL (`tailscale funnel status`) — it will be `https://<new-hostname>.<tailnet>.ts.net`
6. Update Meta webhook Callback URL with the new URL. Verify token stays `racesims_webhook_2026`.
7. Re-subscribe the WABA to the `messages` field in Meta webhooks
8. Update the stable-URL reference in `CLAUDE.md` and this `RUNBOOK.md` so future you doesn't check an old URL

**Don't forget:** `pm2 startup` + `pm2 save` on the new Mac if you want PM2 to auto-run on reboot.

---

## Scenario 6 — Meta token compromised / needs rotation

The current token is a System User token, never-expires. But if it leaks or you need to rotate:

1. Go to Business Suite → Business Settings → Users → System Users → "RaceSims Bot System User"
2. Click "Generate New Token" — overrides the old one (invalidates it)
3. Same scopes: `whatsapp_business_messaging` + `whatsapp_business_management`, expiry "Never"
4. Update `.env` → `WHATSAPP_ACCESS_TOKEN=...`
5. `npx pm2 restart racesims-ai --update-env`

---

## Scenario 7 — Anthropic API key revoked / out of credits

**Symptoms:** bot receives messages but AI replies fail. `data/error.log` shows 401 or 429 from Anthropic.

1. Generate new key at https://console.anthropic.com
2. Update `.env` → `ANTHROPIC_API_KEY=sk-ant-...`
3. `npx pm2 restart racesims-ai --update-env`

---

## Scenario 8 — Power outage / Mac was closed overnight

Same as Scenario 1 (Mac reboot), unless the power loss damaged state. In practice: just unlock the Mac, wait ~30 seconds for Tailscale + PM2 to come back, run the Quick Status Check. Everything should be green.

---

## Scenario 9 — You want to fall back to Cloudflare (Tailscale fails)

The cloudflared binary and config are still in the folder as a fallback:
1. Uncomment the `racesims-tunnel` entry in `ecosystem.config.cjs`
2. `npx pm2 start ecosystem.config.cjs --update-env`
3. Grab the new (random) URL from `data/tunnel.log`
4. Update Meta webhook to that URL
5. Note: this URL rotates whenever cloudflared restarts. Only use as emergency fallback.

---

## Things NOT to do

- **Don't run `pm2 kill`** — nukes all PM2 processes and the saved state. Use `pm2 restart` or `pm2 stop` instead.
- **Don't commit `.env`.** Already in `.gitignore`. Contains both the never-expire Meta token and Anthropic key.
- **Don't edit `knowledge/*.json` in production without backup.** Malformed JSON = bot can't start. Test in a branch first.
- **Don't change `WHATSAPP_VERIFY_TOKEN` in `.env` without also updating Meta.** They must match exactly.
- **Don't rename the PM2 app `racesims-ai`.** Scripts, dumps, and other docs all reference it.
- **Don't disable Tailscale on the Mac** — it's load-bearing for the bot now. If you need to stop it temporarily, plan a bot downtime window.

---

## Known reference values (don't memorise — look up here)

- **WhatsApp bot number:** +91 7397 308 899
- **Founder escalation line (not the bot):** +91 73582 29224
- **Meta App ID:** 2547272275689761 (RaceSims Bot)
- **WABA ID:** 810989762085023
- **Phone Number ID:** 1091974950664804
- **Webhook URL:** https://mindwise.tail301de7.ts.net/webhook
- **Verify token:** racesims_webhook_2026
- **Tailnet name:** racesims.in
- **Machine name (Tailscale):** Mindwise
- **PM2 app name:** racesims-ai
- **Bot local port:** 3000
