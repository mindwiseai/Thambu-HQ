---
title: RaceSims Website Build (Next.js)
type: source
source_type: spec
domain: racesims
raw_path: racesims/racesims-web/
ingested: 2026-05-31
---

# RaceSims Website Build (Next.js)

## Summary

A full marketing + commerce website for [[racesims]] was built on **2026-05-31**, located at `racesims/racesims-web/` (Next.js 16 · React 19 · Tailwind v4 · TypeScript, App Router). It implements the long-pending **configurator** that [[website-development]] and [[racesims-catalogue]] flagged as the missing piece, plus dedicated pages for the [[racesims-chennai-flagship|Chennai Sim Centre]] (with a booking widget) and the [[ielr-league|Indian Esports Racing League]]. The production build passes clean (TypeScript ✓, all 5 routes prerender static). It is committed and pushed on branch `claude/admiring-spence-4b6c7d` (HEAD `5cbdd46`). This is a **separate Next.js build from the live [[shopify]] store at racesims.in** — a candidate replacement/expansion, not yet deployed.

## Key facts

- Stack: Next.js 16, React 19, Tailwind v4, TypeScript — five static routes: `/`, `/configurator`, `/sim-centre`, `/league`, `/products`.
- Design system "Pit-Wall Telemetry" (carbon black, hairline data grid, flame-red `#FF3B1D` accent, Archivo / Sora / JetBrains Mono) — deliberately built to avoid generic AI aesthetics.
- **Configurator** implements the Tesla-style flow from [[racesims-catalogue]]: 3 presets, 9 component groups with live ± price deltas, 7 add-on packs, sticky running total, front-end order form. Math verified against catalogue: Starter ₹5,65,498 / The Sim ₹6,50,998 / Pro ₹17,03,999.
- **Sim Centre page** uses [[racesims-master-rate-card]] (₹750 / 30 min · ₹1,250 / hr · +₹500 motion), the 8-rig fleet (7 static + 1 motion), Nungambakkam, opening July 2026 — sourced from [[racesims-chennai-premium-baseline]].
- **League page** uses real [[ielr-league|IERL]] config: Season 2026, 8 rounds, Round 1 Monza live, partner network (Chennai, Bengaluru, Mumbai, Delhi, Hyderabad, Sim Racing Adda).
- Data is centralised in `src/lib/` (`catalogue.ts`, `league.ts`, `simcentre.ts`) as the single source of truth for the UI.
- Real brand logos copied into `public/brand/`. Hero photography still pending (needs a Gemini API key for AI generation; real product photos exist under `racesims/marketing/assets/`).
- Forms (configurator order, centre booking) are **front-end only** — no payment/backend yet; Razorpay + a real booking backend are future scope.

## People mentioned

- [[thambu]] — owner, commissioned the build; configurator/centre/league all reflect his specs.

## Decisions

- Build the new site in **Next.js** (not extend Shopify) for the configurator + booking + league experience.
- Configurator anchors on the **"The Sim" default** (₹6,50,998) per [[racesims-catalogue]] Tesla-style positioning.
- Site treats Configurator / Sim Centre / League as the three pillars of the RaceSims ecosystem.

## Open questions

- **Deployment path:** does this Next.js site replace the [[shopify]] store at racesims.in, run alongside it, or stay a staging prototype? Not yet decided.
- **Payments/backend:** configurator order + centre booking need Razorpay + a booking backend to transact.
- **Hero imagery:** needs Gemini API key (AI generation) or wiring of existing product photos.
- League round data R2–R8 is scheduled/illustrative; only R1 Monza is live config. Standings beyond R1 are sample data.

## Backlinks

- [[website-development]]
- [[racesims-catalogue]]
- [[racesims-chennai-flagship]]
- [[ielr-league]]
