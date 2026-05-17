# IERL Deployment Guide — Hostinger domain → Cloudflare Pages + Worker

Complete checklist for taking `indianesportsracingleague.com` from a freshly-bought Hostinger domain to a live, leaderboard-serving production site. Total active time: ~30 minutes. DNS propagation can add a few hours of waiting.

---

## What you'll set up

1. A free Cloudflare account
2. Move DNS control from Hostinger to Cloudflare (you keep the domain at Hostinger; only the nameservers change)
3. A Cloudflare D1 database (the lap-time store)
4. A Cloudflare KV namespace (the homepage cache)
5. A Cloudflare Worker (the cron scraper + JSON API)
6. A Cloudflare Pages project (the static site)
7. A Worker Route that maps `indianesportsracingleague.com/api/*` to the Worker

Cost: zero. Everything fits inside Cloudflare's free tier at this scale.

---

## Step 1 — Create a Cloudflare account

1. Go to https://dash.cloudflare.com/sign-up
2. Sign up with `thambu@racesims.in` (or whichever email you want owning this).
3. Verify the email. Land on the dashboard.

---

## Step 2 — Add the domain to Cloudflare

1. From the Cloudflare dashboard, click **+ Add site**.
2. Enter `indianesportsracingleague.com`. Click Continue.
3. Pick the **Free plan**. Continue.
4. Cloudflare scans existing DNS records (none yet, since Hostinger is parked). Click Continue.
5. **Cloudflare shows you two nameservers** that look like `xxxx.ns.cloudflare.com` and `yyyy.ns.cloudflare.com`. **Copy both.** You'll need them in step 3.

---

## Step 3 — Point Hostinger at Cloudflare's nameservers

1. Log into https://hpanel.hostinger.com.
2. Sidebar: **Domains** → click `indianesportsracingleague.com` → **DNS / Nameservers**.
3. Switch from "Hostinger nameservers" to **Custom nameservers**.
4. Paste the two Cloudflare nameservers from step 2.
5. Save.

DNS propagates in 5 minutes to a few hours. Cloudflare emails you when it's verified your domain.

While you wait, do steps 4 onward — they don't depend on DNS.

---

## Step 4 — Install Wrangler and log in

In a terminal, from the `ierl/` folder:

```bash
cd /Users/mindwise.ai/Documents/Claude/Projects/Thambu-HQ/ierl
npm install                # already done; safe to re-run
npx wrangler login         # opens a browser, click "Allow"
```

The login binds your terminal to the Cloudflare account.

---

## Step 5 — Create the D1 database

```bash
npx wrangler d1 create ierl
```

Output looks like:

```
✅ Successfully created DB 'ierl'

[[d1_databases]]
binding = "DB"
database_name = "ierl"
database_id = "abcd1234-...."
```

**Copy the `database_id` value.** Open [`wrangler.toml`](wrangler.toml) and replace the placeholder:

```diff
- database_id = "REPLACE_WITH_D1_ID_AFTER_wrangler_d1_create"
+ database_id = "abcd1234-...."
```

---

## Step 6 — Create the KV namespace

```bash
npx wrangler kv namespace create CACHE
```

Output:

```
🌀 Creating namespace with title "ierl-CACHE"
✨ Success!
[[kv_namespaces]]
binding = "CACHE"
id = "ef567890-...."
```

**Copy the `id`.** Open `wrangler.toml` and replace:

```diff
- id = "REPLACE_WITH_KV_ID_AFTER_wrangler_kv_namespace_create"
+ id = "ef567890-...."
```

---

## Step 7 — Apply schema and seed to the remote database

```bash
npx wrangler d1 execute ierl --remote --file=worker/migrations/0001_init.sql
npx wrangler d1 execute ierl --remote --file=worker/migrations/0002_seed_seasons.sql
```

You should see `🚣 N commands executed successfully` for each. Verify:

```bash
npx wrangler d1 execute ierl --remote --command "SELECT slug, name FROM partners;"
```

Should list six partners including Sim Racing Adda.

---

## Step 8 — Set Worker secrets

The local `.dev.vars` file isn't deployed. Production secrets are set via wrangler:

```bash
# Admin token — gates POST /api/admin/scrape. Pick a long random string.
npx wrangler secret put ADMIN_TOKEN
# (paste a value when prompted, e.g. a 32-char random string)

# SRA / Sim Racing Adda VMS API token (the public key from their env-config.js).
npx wrangler secret put SRA_VMS_TOKEN
# Paste: 221d28a8-07b9-498a-80a2-4d40287749fe
```

Save the ADMIN_TOKEN value somewhere safe — you'll need it to force-refresh the leaderboard during a live event.

---

## Step 9 — Sync events.json to remote and trigger first scrape

```bash
# Generate the SQL from config/events.json + config/partners.json
node worker/src/admin/sync-config.mjs > /tmp/ierl-sync.sql
npx wrangler d1 execute ierl --remote --file=/tmp/ierl-sync.sql
```

---

## Step 10 — Deploy the Worker

```bash
npx wrangler deploy
```

Output ends with:

```
Uploaded ierl-worker (1.23 sec)
Deployed ierl-worker triggers (...)
  https://ierl-worker.<your-subdomain>.workers.dev
```

**Note that `workers.dev` URL** — handy for testing the API directly. Open it in a browser; it should say "IERL Worker — public traffic goes to Pages".

Test the API:

```bash
curl https://ierl-worker.<your-subdomain>.workers.dev/api/home
```

Should return JSON with the season + (if scrape has run) the current event.

---

## Step 11 — Run the first scrape

```bash
curl -X POST "https://ierl-worker.<your-subdomain>.workers.dev/api/admin/scrape?token=<your-ADMIN_TOKEN>"
```

Expect output like `{"attempted":1,"ok":1,"inserted":62,"deduped":0,"errors":0}`.

The hourly cron will keep this fresh from now on — you don't need to re-trigger manually unless you've just added a new source.

---

## Step 12 — Deploy the Pages site

```bash
npx wrangler pages deploy site --project-name=ierl
```

First run prompts to "Create project?" — say yes. Subsequent deploys are instant.

Output ends with:

```
✨ Deployment complete! Take a peek over at https://<random-id>.ierl.pages.dev
```

Open that preview URL — you should see the homepage with the live SRA leaderboard rendering through the Worker.

---

## Step 13 — Wait for DNS, then bind the custom domain

By now Cloudflare has emailed you that DNS is active. If not, check status under **Websites → indianesportsracingleague.com → Overview** — should say "Active" with a green check.

### Bind the domain to Pages

1. Cloudflare dashboard → **Workers & Pages → ierl** (the Pages project).
2. **Custom domains** tab → **Set up a custom domain**.
3. Enter `indianesportsracingleague.com`. Activate. Cloudflare auto-creates the CNAME.
4. Repeat with `www.indianesportsracingleague.com` if you want both.

In a minute or two the apex domain serves your site over HTTPS (Cloudflare provisions the cert automatically).

### Bind /api/* to the Worker

The site fetches `/api/home` etc. from the same origin in production. So the Worker needs to handle `indianesportsracingleague.com/api/*` requests.

1. Cloudflare dashboard → **Workers & Pages → ierl-worker**.
2. **Settings → Triggers → Routes** → **Add route**.
3. Route: `indianesportsracingleague.com/api/*`
4. Zone: `indianesportsracingleague.com`
5. Save.

Now `https://indianesportsracingleague.com/api/home` returns JSON, and `https://indianesportsracingleague.com/` serves the Pages site.

---

## Step 14 — Smoke test production

```bash
curl https://indianesportsracingleague.com/api/home | jq .
curl -I https://indianesportsracingleague.com/
```

In the browser:
1. https://indianesportsracingleague.com — home page renders, hero shows "LIVE NOW · Round 1 · IERL 2026 Season", top-5 leaderboard populated with real Sim Racing Adda drivers and lap times.
2. https://indianesportsracingleague.com/championship — F1 points awarded across all drivers.
3. https://indianesportsracingleague.com/partners — six partner cards.
4. https://indianesportsracingleague.com/status — last cron run < 1 hour ago, no errors.

---

## Adding a new round each month

1. Get the SRA hot-lap event ID from your venue dashboard (the URL on `sra.racecenters.com/hotlapping/<id>`).
2. Edit [`config/events.json`](config/events.json), append a new event:
   ```json
   {
     "slug": "2026-r02-spa-formula-hybrid-x",
     "round_number": 2,
     "name": "Round 2 — Spa-Francorchamps",
     "track": "Spa-Francorchamps",
     "car": "RSS Formula Hybrid X 2026",
     "starts_at": "2026-05-01T00:00:00Z",
     "ends_at": "2026-05-31T23:55:00Z",
     "status": "live",
     "sources": [
       { "kind": "sra-vms", "url": "https://api.simracing.co.uk/v0.1/hotlap_events/142", "partner": "sim-racing-adda" }
     ]
   }
   ```
3. Mark the previous round `"status": "finished"`.
4. Push the change:
   ```bash
   node worker/src/admin/sync-config.mjs > /tmp/ierl-sync.sql
   npx wrangler d1 execute ierl --remote --file=/tmp/ierl-sync.sql
   curl -X POST "https://indianesportsracingleague.com/api/admin/scrape?token=<ADMIN_TOKEN>"
   ```

That's it. The cron picks up the new source automatically on the next hour, and the homepage hero rotates to the new round.

---

## Adding a new partner

1. Edit [`config/partners.json`](config/partners.json), append the new partner with a stable slug (`name-of-place`).
2. `node worker/src/admin/sync-config.mjs > /tmp/ierl-sync.sql && npx wrangler d1 execute ierl --remote --file=/tmp/ierl-sync.sql`.
3. If the new partner runs SRA / Race Centres VMS, get their venue's event ID and add it as a source on the current round (you can have multiple sources on one event — every venue's results merge into one national board).

---

## Updating the site

Code changes are deployed with two commands from `ierl/`:

```bash
# Worker (cron + API)
npx wrangler deploy

# Site (HTML/CSS/JS)
npx wrangler pages deploy site --project-name=ierl
```

CI/CD via GitHub is also possible (Cloudflare Pages can auto-deploy from a repo), but the manual flow above is the simplest until you outgrow it.

---

## What to watch

- **`/status` page** — visit `https://indianesportsracingleague.com/status` once a week. If `last_run` is older than an hour or `sources_ok < sources_attempted`, something broke.
- **Cron logs** — `npx wrangler tail ierl-worker` streams real-time logs from production. Watch this during a live round if the leaderboard isn't updating.
- **D1 size** — the free tier caps at 5 GB and 5M reads/day. At ~5,000 laps/month you'll hit the cap in ~85 years. Don't worry about it.

---

## Open questions to think about before launch

1. **What's the exact SRA event ID for Round 1?** Currently the site is wired to `141` (RSS Formula Hybrid X 2026 at Monza, Apr 2026) which is what your sample URL pointed at. If that's an old event, replace the URL in `config/events.json`.
2. **Other partner sources?** Today we have one source (Sim Racing Adda). If RaceSims Chennai / Bengaluru / Mumbai also run Race Centres VMS, get their event IDs and add them as additional sources to the current round.
3. **Branding** — the favicon is a placeholder coral diamond. Want a proper IERL wordmark designed?
4. **Hero photography** — the dark hero panel is currently a flat warm gradient. Adding a track or car photo at golden hour would lift it from "good" to "magazine-quality." We can add a photo upload step into `site/assets/img/events/<slug>/hero.webp` whenever you have imagery.

---

## Troubleshooting

| Problem | Likely cause | Fix |
|---|---|---|
| `/api/home` returns 404 | Worker route not bound | Step 13 — add the Worker Route for `/api/*` |
| Leaderboard empty | First scrape hasn't run | Step 11 — POST to `/api/admin/scrape` |
| `parser returned 0 laps` in `/status` | Source URL changed shape | Open the source URL, capture HTML/JSON, save as a fixture, tune the parser |
| HTTPS warning on the domain | Cert provisioning still in progress | Wait 5 minutes after adding the custom domain |
| Domain resolves to Hostinger parking page | Nameservers haven't propagated | Wait, then re-check at https://www.whatsmydns.net/ |
