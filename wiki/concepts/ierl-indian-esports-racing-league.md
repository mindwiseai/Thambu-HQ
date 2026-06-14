---
title: IERL — Indian Esports Racing League
type: concept
domain: racesims
status: LAUNCHING (July 1, 2026)
tags: [ierl, league, partner-network, hot-lap, assetto-corsa, competition]
---

# IERL — Indian Esports Racing League

A monthly **hot-lap league across the [[racesims-company|RaceSims]] partner network**, launching **July 1, 2026** on [[assetto-corsa|Assetto Corsa]]. Branded as a **shared, community-owned league** — every centre contributes to one prize pool and competes on one national leaderboard. Public site: `indianesportsracingleague.com` (owned by RaceSims, kept in-house for now). Locked structure in [[2026-06-14-ierl-july-launch]].

> **Brand rule:** lead with **IERL**, not "by RaceSims". Partners pay into the pool together; RaceSims-only branding made them feel only RaceSims got promoted. RaceSims Studio Chennai participates as **one centre among equals**.

## Format

- **Hot lap / time trial** — best single valid lap in the calendar month wins. Not wheel-to-wheel racing.
- **Two classes, run simultaneously** (two dedicated servers, same track, same month):
  - **Amateur** — Mazda MX-5 ND. ABS + traction control allowed. Open to all.
  - **Pro** — Ferrari 488 GT3. Traction control disabled. [[ierl-promotion-ladder|Promoted drivers]].
  - Fixed / common setups in both classes. Track limits zero-tolerance via [[real-penalty|Real Penalty]].
- **Track (Season 1):** [[mugello]] — a driver's track that rewards the MX-5. Rotates from Season 2.

## Prize pool (July)

- ₹2,500 / rig contribution. 17 confirmed rigs → **₹42,500 gross** − ₹2,500 tech = **₹40,000 net**, split **50/50** Amateur / Pro.
- **Per class:** 🥇 ₹12,000 (60%) · 🥈 ₹5,000 (25%) · 🥉 ₹3,000 (15%). 100% back to players.
- **Local centre champion:** **₹500 × rig count, centre-funded**, paid to the fastest driver at each centre — **separate from the network pool** (2 rigs → ₹1,000 … 8 rigs → ₹4,000).
- Payouts via [[ierl-direct-settlement|direct peer-to-peer settlement]] (no central pot).

## Partner network

| Centre | City | Rigs | Fee | Local prize | Status |
|---|---|---|---|---|---|
| [[sim-racing-adda]] | Delhi | 4 | ₹10,000 | ₹2,000 | July ✓ |
| [[niyusuki-sim-racers]] | Cochin | 3 | ₹7,500 | ₹1,500 | July ✓ |
| [[lights-out-racing]] | Delhi | 3 | ₹7,500 | ₹1,500 | July ✓ |
| [[drivextreme]] | Coimbatore | 3 | ₹7,500 | ₹1,500 | July ✓ |
| [[bbs-adrenaline-apex]] | Mangalore | 2 | ₹5,000 | ₹1,000 | July ✓ |
| [[virtual-adda]] | Mumbai | 2 | ₹5,000 | ₹1,000 | July ✓ |
| [[racing-point-esports]] | Hyderabad | 8 | TBC | — | TBC ([[uday-hyderabad|Uday]]) |
| [[racesims-chennai-flagship\|RaceSims Studio]] | Chennai | 8 | ₹20,000 | ₹4,000 | Aug 2 |

- **July confirmed:** 6 centres · 17 rigs · ₹42,500.
- **From August 2:** + Chennai → 8 centres · 33 rigs · ₹82,500/month · ₹80,000 pool.

## Manual interim → automation

July runs **manually**: the league hosts the 24/7 server (managed via [[content-manager|Content Manager]]) and updates the leaderboard from submitted times. Full automation — live auto-logging — ships once [[uday-hyderabad|Uday]]'s [[racesims-vms-build|VMS]] is ready. [[racing-point-esports|Racing Point Esports]] joins when that software lands.

**Shared-rig driver identity** is solved now by the [[ierl-driver-identification|kiosk]] (`racesims/ierl/kiosk/`): the customer signs in with name + phone, gets a unique handle, and Content Manager launches into their class server — see [[ierl-driver-identification]].

**Platform path:** start on [[assetto-corsa|Assetto Corsa]], migrate to [[le-mans-ultimate|Le Mans Ultimate]] once the software is ready.

## Why centre-only (anti-cheat)

Every rig runs **identical hardware** + the **[[real-penalty|Real Penalty]]** enforcement software (strict track limits, automatic penalties, no modified files). A fully controlled environment with **zero scope for cheating** — the explicit reason IERL runs in-centre, never from home.

## Monthly rhythm

1st leaderboard live · all month racing · last day 11:59 PM lock · 1st results + [[ierl-direct-settlement|settlement sheet]] posted · by 5th dealers transfer directly to winners · 6th month closed.

## Relationship to the Chennai championship

> [!contradiction] IERL (network, Assetto Corsa) vs [[racesims-championship-architecture]] (LOCKED, LMU + iRacing). The locked Chennai architecture names different platforms. IERL appears to be the **network-wide partner league** — distinct from the in-centre Chennai championship — but the platform choice needs reconciling with [[thambu]]. See [[2026-06-14-ierl-july-launch]] open questions.

## Backlinks
- [[2026-06-14-ierl-july-launch]] — source
- [[racesims-company]] · [[uday-hyderabad]] · [[racesims-championship-architecture]]
