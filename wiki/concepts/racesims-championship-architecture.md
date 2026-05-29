---
title: RaceSims Championship Architecture
type: concept
domain: racesims
status: LOCKED
tags: [championship, competition, events, season-structure, marketing-asset]
---

# RaceSims Championship Architecture

The 4-layer competitive ecosystem run from [[racesims-chennai-flagship|Chennai flagship]] (and scalable to all [[racesims-india-saturation-plan|network centres]]). Two parallel championships — Circuit and Rally — running on a real motorsport-shaped season with quarterly milestones and an annual Grand Final. Final structure locked May 17 in [[2026-05-17-racesims-chennai-flagship-planning|the flagship planning session]] after multiple iterations.

## The 4 layers

```
══════════════════════════════════════════════════════════════
LAYER 4  ANNUAL      Grand Final  →  Real-Drive Prize
                     December. The peak. Press event.
                     ───────────────────────────────────
LAYER 3  QUARTERLY   Shootouts    →  Live, top 16 of quarter
                     March · June · September.
                     ───────────────────────────────────
LAYER 2  WEEKLY      Hot Lap Week →  Continuous competition
                     Mon–Sun, every week.
                     ───────────────────────────────────
LAYER 1  ALWAYS-ON   Drive & Race →  Walk in, drive, leaderboard
                     Casual racing, friends, no structure.
══════════════════════════════════════════════════════════════
```

**Insight:** Engagement should be continuous. Events should be rare. Daily engagement = leaderboards. Rare events = live shootouts.

## Two parallel championships

| | Circuit | Rally |
|---|---|---|
| Platforms | Le Mans Ultimate + iRacing | AC Rally + Richard Burns Rally |
| Championship Pass | ₹4,500/year (single) · ₹7,500/year (dual) | ₹4,500/year (single) · ₹7,500/year (dual) |
| Annual Champion prize | Polo Cup Follow Car Programme (₹1.5L value) | [[arka-motorsports|ARKA Rally Drive]] (₹1L value) |

**Championship Pass covers:** competition entry + VMS points tracking + event priority booking. **Rig time is always billed separately** — Time Trial rounds at Pass holder rates (Pass 8/16), Live Race rounds as normal rig bookings. Pass holders are expected to carry Pass 8 or Pass 16 to cover their weekly TT practice.

Drivers can hold a Pass in one or both. Separate points, separate champions, separate Grand Finals.

## Each quarter — 5 race rounds

The middle layer that determines quarterly and annual standings. Quarterly format:

| Round | Format | When |
|-------|--------|------|
| Round 1 | Time Trial | 7-day window |
| Round 2 | **Live Race** | Sunday afternoon |
| Round 3 | Time Trial | 7-day window |
| Round 4 | **Live Race** | Sunday afternoon |
| Round 5 | Time Trial | Quarter Finale, 7-day window |

**3 Time Trials + 2 Live Races per quarter.** Time Trials run during normal sessions (no separate event needed). Live Races are Sunday afternoon events with spectators, livestream, café open.

### Time Trial round
A 7-day window. Specific car + track combo published. Drive any session during the week; fastest lap counts. Driver Card (VMS) attributes the time automatically. Top 10 earn points.

### Live Race round (4-hour Sunday afternoon event)

- 12 drivers max per round, 14-day advance booking
- **3:00pm Qualifying** (15 min open)
- **3:30pm Sprint Race 1** (15 laps)
- **4:30pm Sprint Race 2** (15 laps, reverse grid)
- **5:30pm Feature Race** (25 laps, grid by combined points)
- **7:00pm Podium and presentation**

Rally equivalent: 4 special stages over 4 hours, combined time wins.

## Points distribution

| Position | Time Trial | Live Race |
|----------|------------|-----------|
| 1st | 25 | 40 |
| 2nd | 18 | 32 |
| 3rd | 15 | 28 |
| 4th | 12 | 25 |
| 5th | 10 | 22 |
| 6th | 8 | 20 |
| 7th | 6 | 18 |
| 8th | 4 | 15 |
| 9th | 2 | 12 |
| 10th | 1 | 10 |

Live Race bonuses: Pole +3, Fastest Lap +2.

**Max per quarter: 165 points.** Max annual (Q1+Q2+Q3+Grand Final): ~575 points.

## Quarterly Champion (crowned 3× per year per discipline)

End of each quarter, highest points = Quarterly Champion. Prize:

- ₹15,000 cash
- 12-month iRacing subscription
- Quarterly Trophy
- Featured content + press release
- **Automatic Grand Final qualification**

Six Quarterly Champions per year (3 quarters × Circuit + Rally).

## Grand Final qualification (Top 5 in 2 of 3 quarters, etc.)

After Q3 ends late September:

1. Q1, Q2, Q3 Champions — auto-qualified
2. Top 5 in at least 2 of 3 quarters — qualified
3. Top 10 in annual cumulative points — qualified

Typical field: **8–12 drivers per championship.**

## Grand Final (first Saturday of December)

The single biggest event of the year. ARKA + Polo Cup representatives invited.

| Time | Activity |
|------|----------|
| 11am | Arrivals, briefing, media |
| 12pm | Circuit Grand Final qualifying + race (35 laps) |
| 3pm | Rally Grand Final (4 stages, 30km combined) |
| 6pm | **Awards Ceremony** — Annual Trophies + Real-Drive Prizes announced |
| 7:30pm | Cocktail reception |

### Double points

Grand Final awards **double points** vs. a normal Live Race — winner takes 80 points. This guarantees championship can swing in the final round. Drama by design.

| Position | Grand Final Points |
|----------|--------------------|
| 1st | 80 |
| 2nd | 64 |
| 3rd | 56 |
| 4th | 50 |
| 5th | 44 |

Plus Pole +6, Fastest Lap +4.

## Annual Champion = total accumulated points

> Annual Points = Q1 + Q2 + Q3 + Grand Final

Highest total = Annual Champion (crowned per discipline). Prize:

- ₹50,000 cash + Annual Trophy
- **Real-Drive Prize** (see [[racesims-the-ladder|the Ladder]] for eligibility):
  - Circuit Champion → Polo Cup Follow Car Programme
  - Rally Champion → [[arka-motorsports|ARKA Rally Drive]]
- Hero video piece + press coverage of the actual real drive

## The Always-On layer

Not an event. How the centre works.

- Lounge screen permanently shows current "House Combo" leaderboard
- Anyone driving the House Combo posts a time automatically (via [[racesims-vms-build|VMS]])
- Friends book 2-6 seats together → coach sets up private multiplayer lobby → social racing happens
- Monthly House Combo Top 3 wins sim-time credits (₹500/300/200 marginal cost)
- Open to all customers — Pass holders earn championship points too, non-Pass holders just earn bragging rights

## Annual calendar

```
JAN-MAR (Q1)
  R1 TT  Jan window
  R2 LR  Sunday late January
  R3 TT  Feb window
  R4 LR  Sunday mid-February
  R5 TT  Quarter Finale
  → Q1 Champion crowned end of March

APR-JUN (Q2) — same shape, → Q2 Champion end of June
JUL-SEP (Q3) — same shape, → Q3 Champion end of September

OCT-NOV  Practice period (no championship races)
FIRST SAT DEC  Grand Final + Awards Night
  → Annual Champion crowned
  → Real-Drive Prizes presented
```

**32 official competition rounds per year** (15 per discipline + 2 Grand Finals). Roughly one race every 11 days. Always something coming up.

## Annual prize and event budget

| Item | ₹ |
|------|---|
| Live Race round winner cash (12 × ₹3K) | 36,000 |
| Quarterly Champion cash + iRacing (6 × ₹24,300) | 1,45,800 |
| Grand Final race winner cash (2 × ₹25K) | 50,000 |
| Annual Champion cash (2 × ₹50K) | 1,00,000 |
| Real-Drive prizes (ARKA + Polo Cup) | 2,50,000 |
| Live Race event ops (12 × ₹15K) | 1,80,000 |
| Quarterly ceremonies (6 × ₹15K) | 90,000 |
| Grand Final event ops | 1,00,000 |
| Monthly casual Hot Lap credits | 8,400 |
| **Total annual** | **~₹9.6 L** |

With lean Year 1 event production: ~₹7.8L.

## Why this structure is locked

1. **Mirrors real motorsport** — F1, WRC, IndyCar all use multi-round seasons with quarterly milestones
2. **Consistent performance is rewarded** — Top-5-in-2-of-3 qualification means no fluke championships
3. **3 content peaks per year** — Quarterly Champions create marketing material every 3 months, not just December
4. **Scales transparently to network** — when [[racesims-india-saturation-plan|other centres open]], they plug into the same championship; national leaderboard scales automatically
5. **VMS handles all data** — see [[racesims-vms-build]]

## Connections

- [[racesims-the-ladder]] — the sim-to-reality pathway built on top of this
- [[racesims-drive-train-compete]] — the COMPETE tier housed here
- [[racesims-chennai-flagship]] — first venue
- [[racesims-vms-build]] — timing infrastructure
- [[arka-motorsports]] — Rally Annual Champion prize partner
- [[2026-05-17-racesims-chennai-flagship-planning]] — source
- [[domains/racesims/_index]]
