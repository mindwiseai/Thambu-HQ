---
title: RaceSims — Website (racesims-web)
type: concept
domain: racesims
tags: [website, nextjs, digital, product]
---

# RaceSims Website (racesims-web)

Next.js web application at `racesims/racesims-web/` (104 files, landed on `main` 2026-06-01). Built during a prior session on branch `claude/admiring-spence-4b6c7d`; squash-landed preserving history at tag `archive/racesims-web-history`. Source: [[2026-05-31-chennai-cleanup-compass-builders]].

## What's built

| Section | Description |
|---|---|
| Homepage | Pit-Wall Telemetry design system — flagship hero, Drive·Train·Compete framing |
| Sim Configurator | Interactive rig configurator with saved builds |
| Chennai Sim-Centre | Venue page + booking widget |
| League | Hotlap league / race calendar |
| Products | Hardware product listing |
| Driver Account | Supabase magic-link auth + training-journey dashboard |
| Academy enrolment | Enrolment flow wired to Driver Account |

## Tech stack
- **Next.js** (App Router)
- **Supabase** — auth (magic-link) + database; schema at `racesims-web/supabase/schema.sql`
- Key lib files: `account.ts` · `catalogue.ts` · `centres.ts` · `enrol.ts` · `league.ts` · `saveBuild.ts` · `simcentre.ts` · `optionImages.ts`

## Status (2026-06-01)
Code is in-repo and functional in local dev. Not yet deployed. The 3 source worktrees that built it (`admiring-spence`) still exist with uncommitted changes — needs review before those worktrees are retired.

## Open questions
- Deployment target (Vercel / self-hosted)?
- Supabase project provisioned?
- Domain / subdomain confirmed?

## Backlinks
- [[racesims-company]] · [[racesims-chennai-flagship]] · [[racesims-vms-build]] · [[2026-05-31-chennai-cleanup-compass-builders]]
