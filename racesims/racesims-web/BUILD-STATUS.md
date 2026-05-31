# RaceSims Website — Build Status & Handoff

**Last updated:** 2026-05-31 · Worktree branch `claude/admiring-spence-4b6c7d`
**App location:** `racesims/racesims-web` (Next.js 16 · React 19 · Tailwind v4 · TypeScript · App Router)

## TL;DR for the next session
The full site source is **built and committed**. What's left: run the build, fix any
type errors it surfaces, generate the 4 hero images (needs a GEMINI_API_KEY), and
push. Do this in a **fresh terminal** — the previous session's shell wedged (a hung
concurrent `git push` from parallel agents held a lock).

```bash
cd racesims/racesims-web
npm install          # node_modules already present, but re-run to be safe
npm run build        # fix any TS/ESLint errors it reports
npm run dev          # http://localhost:3000 — eyeball every route
```

## What's done (all committed)
| Route | File | Notes |
|---|---|---|
| `/` Home | `src/app/page.tsx` + `src/components/home/*` | Hero (FEEL EVERY APEX), 3 pillars, preset teaser, sim-centre + league teasers, "why RaceSims" inverted section, CTA |
| `/configurator` | `src/app/configurator/page.tsx` + `src/components/configurator/Configurator.tsx` | Interactive tool: 3 presets, 9 component groups w/ live price deltas, 7 add-on packs, sticky live total, inline order form (front-end only) |
| `/sim-centre` | `src/app/sim-centre/page.tsx` + `src/components/simcentre/Booking.tsx` | Chennai/Nungambakkam, rate card, 8-rig fleet, booking widget (date/rig/duration/motion/slot + lead form) |
| `/league` | `src/app/league/page.tsx` | IERL 2026: race-night format, 8-round schedule, R1 Monza standings, partner network |
| `/products` | `src/app/products/page.tsx` | 3 systems, 9-group "the stack" bento, race-engineer moat, brand partners |

**Design system:** `src/app/globals.css` ("Pit-Wall Telemetry" — carbon black, hairline
grid, flame #FF3B1D accent, Archivo/Sora/JetBrains Mono). Shared: `Nav.tsx`, `Footer.tsx`,
`Reveal.tsx`. **Data (source of truth):** `src/lib/catalogue.ts` (configurator, math-verified:
Starter ₹5.8L / The Sim ₹6,50,998 / Pro ₹17,03,999), `src/lib/league.ts`, `src/lib/simcentre.ts`.

## ⚠️ Verify in the fresh session
1. **globals.css + layout.tsx fonts** — the home-page agent may have altered the font setup.
   Confirm `layout.tsx` still loads `Archivo` (with `axes: ["wdth"]`), `Sora`, `JetBrains_Mono`
   and that `globals.css` keeps `.font-display`/`.headline` using `--font-archivo`. If the
   build complains about the Archivo `wdth` axis, drop `axes` and use static weights.
2. **Run `npm run build`** and clear any unused-import / `any` ESLint errors (Next build fails on lint).

## Hero images (pending — needs GEMINI_API_KEY)
nano-banana MCP needs a key. Once set (`GEMINI_API_KEY` env or `configure_gemini_token`),
generate 4 cinematic 1024² shots → `public/hero/`: `hero-cockpit.png`, `hero-centre.png`,
`hero-league.png`, `hero-motion.png` (prompts: dark carbon studio, single warm rim light,
subtle red accent, no text). Then wire into hero sections via `next/image`.
**Real assets already available** under `racesims/marketing/assets/` (logos in
`Brand Assets/`, product photos in `Website images/` & `Product Images/`) — good for the
configurator/products/fleet cards.

## Lesson logged (why recovery was needed)
6 agents ran in parallel each auto-committing+pushing to the SAME worktree branch →
git ref-lock races clobbered the working tree and one push hung the shell. Files were
recovered from commits `04ac40d` (sim-centre/league/Booking) and `2e8aed8` (products).
**Next time:** have parallel agents write files only; do ONE commit from the orchestrator
at the end. Don't let each agent push concurrently.
