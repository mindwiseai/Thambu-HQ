---
title: RaceSims VMS — Custom Venue Management System
type: concept
domain: racesims
status: PLANNED
tags: [software, platform, vms, custom-build, saas-potential]
---

# RaceSims VMS — Custom Venue Management System

The custom venue management software platform that will run [[racesims-chennai-flagship|Chennai flagship]] and every subsequent [[racesims-india-saturation-plan|network centre]]. **Built in-house instead of paying simracing.co.uk's ₹30K/month-per-rig SaaS.** Decision locked May 17 in [[2026-05-17-racesims-chennai-flagship-planning|the flagship planning session]] — pays back in 7 months at Chennai alone, dramatically better at network scale.

## The decision context

Initial plan was to subscribe to simracing.co.uk's VMS at **₹5,000 per rig per month** = ₹30K/month for 6 rigs = ₹3.6L/year per centre. At 5-centre network: ₹18L/year. At 43-centre saturation: ₹1.5+ cr/year.

User decision: **build in-house.** [[thambu]]'s Hyderabad dealer Uday is already building one; collaboration/coordination to be decided.

## Cost comparison

| Scale | VMS SaaS Annual | Custom System Annual |
|-------|----------------|---------------------|
| 1 venue (Chennai only) | ₹3.6L/year | ₹2L build + ₹0.3L/year ops |
| 3 venues | ₹10.8L/year | ₹0.5L/year ops |
| 5 venues | ₹18L/year | ₹0.6L/year ops |
| 43 venues (saturation) | ₹1.55 cr/year | ₹1.5L/year ops |
| **3-year savings at saturation** | | **₹4+ crore** |

## What it must do (minimum scope)

1. **User profile and progress tracking** — every customer has a Driver Card / profile with lap history, championship standings, member status, billing
2. **Common leaderboard for all venues** — national leaderboard with venue-filtering; works for 1 centre and works for 50
3. **Launch multiplayer sessions** — programmatic creation of iRacing hosted sessions + LMU dedicated server spawning + F1 25 telemetry capture
4. **Works with locked software stack** — [[racesims-software-stack|Le Mans Ultimate, iRacing, F1 25]] (and AC Rally, Richard Burns Rally per championship structure)

## System architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     CLOUD BACKEND                           │
│                                                             │
│   ┌─────────────┐    ┌──────────────┐    ┌──────────────┐  │
│   │  REST API   │    │  PostgreSQL  │    │   Web App    │  │
│   │  (Node.js)  │◄──►│   Database   │◄──►│  (Next.js)   │  │
│   └─────────────┘    └──────────────┘    └──────────────┘  │
│         ▲                                       ▲           │
└─────────┼───────────────────────────────────────┼───────────┘
          │                                       │
   HTTPS  │                                       │ Browser
          │                                       │
┌─────────┼─────────────────────────┐    ┌───────┴──────────┐
│   VENUE: CHENNAI                  │    │   END USERS      │
│  ┌──────────┐ ┌──────────┐        │    │                  │
│  │  RIG 1   │ │  RIG 2   │ ...    │    │  Customers       │
│  │ ┌──────┐ │ │ ┌──────┐ │        │    │  view stats,     │
│  │ │ VMS  │ │ │ │ VMS  │ │        │    │  standings,      │
│  │ │Agent │ │ │ │Agent │ │        │    │  championships   │
│  │ └──────┘ │ │ └──────┘ │        │    │                  │
│  │  iRacing │ │  LMU     │        │    │  Staff manage    │
│  │  LMU     │ │  iRacing │        │    │  sessions,       │
│  │  F1 25   │ │  F1 25   │        │    │  events,         │
│  └──────────┘ └──────────┘        │    │  members         │
└───────────────────────────────────┘    └──────────────────┘
```

## Three components

### 1. VMS Agent (every rig PC)
- Windows background app (~10 MB)
- Detects which game is running
- Reads live telemetry from each game (official APIs)
- Identifies driver via Driver Card QR scan or 6-digit code
- Posts lap data to cloud backend in real time

### 2. Cloud Backend
- Hetzner/DigitalOcean server (~₹2K/month)
- PostgreSQL: profiles, sessions, laps, standings, venues
- Multi-tenant ready (venue_id on every record) — Day 1 SaaS-ready
- REST API for agents and frontend

### 3. Web Frontend (Next.js)
- Customer side: drivers log in, see stats, lap times, championship standings, upcoming events
- Admin side: staff manage members, configure events, view venue analytics
- Mobile responsive

## Game integration details

| Game | Telemetry Source | Multiplayer Launch Method |
|------|------------------|---------------------------|
| **iRacing** | iRacing SDK (pyirsdk, free) | Hosted Session API — programmatic session creation, rigs auto-join |
| **Le Mans Ultimate** | rFactor 2 shared memory plugin (LMU built on rF2) | Spawn LMU dedicated server with chosen car/track, rigs auto-join via IP |
| **F1 25 / F1 24** | UDP telemetry packets (documented format) | Manual lobby (no public API); VMS captures results via telemetry |
| **AC Rally** | Steam-based, same model as LMU | Private lobby, Driver Card attribution |
| **Richard Burns Rally** | RSF plugin (handles online time trials natively) | RSF event hosting |

**Key insight:** The VMS is the single source of truth. Whatever game is running, the Driver Card identifies who is at the rig. Lap times get attributed correctly regardless of game.

## Cost to build

| Path | Time | Cost |
|------|------|------|
| Hire senior fullstack dev (India) | 8-10 weeks | ₹4-6L total |
| **AI-assisted (Claude codes, junior dev tests/deploys)** | 6-8 weeks | **₹1.5-2.5L** |
| Pure freelance dev shop | 10-12 weeks | ₹8-12L |

**Locked path: AI-assisted.** Claude writes the code in dedicated sessions. Junior developer (₹50K/month × 2 months) handles real-rig testing, deployment, integration with actual iRacing accounts.

**Total build budget: ₹2 lakhs.**

## Ongoing costs

| Item | ₹/month |
|------|---------|
| Cloud server (Hetzner/DigitalOcean) | 3,000 |
| Managed PostgreSQL | 2,500 |
| Domain + SSL + CDN | 500 |
| Part-time dev (10 hrs/month fixes/features) | 15,000 |
| **Total** | **₹21,000/month** |

vs simracing.co.uk at ₹30K/month → **₹9K/month savings for 1 venue, ₹1.2L/month at 5 venues.**

## 10-week build timeline

| Week | Milestone |
|------|-----------|
| 1 | Architecture finalised, repo scaffolded, cloud infra set up |
| 2 | Database schema + REST API foundation + admin auth |
| 3 | VMS Agent v1: Driver Card login + iRacing telemetry reading |
| 4 | Customer web frontend: profiles, lap times, leaderboards |
| 5 | LMU integration in Agent |
| 6 | F1 25 integration |
| 7 | iRacing Hosted Session launching (multiplayer automation) |
| 8 | LMU dedicated server spawning |
| 9 | Real-rig testing, bug fixes, polish |
| 10 | Pre-launch deployment, staff training docs, customer onboarding |

Aligns with centre fit-out (10-14 weeks) — VMS ready when venue opens.

## Strategic positioning — SaaS potential

Built multi-tenant from Day 1, meaning by Year 2-3 it can be licensed as a SaaS product to non-RaceSims sim centres globally:

| Customer Segment | Pricing | Y5 Revenue Potential |
|------------------|---------|----------------------|
| Independent Indian sim centres | ₹3K/rig/month | ₹1.5-2 cr/year |
| International sim centres (UK, US, EU) | $50/rig/month | ₹5-10 cr/year |
| Custom enterprise (esports orgs, OEM sim labs) | ₹5-25L annual | ₹2-4 cr/year |

**Y5 SaaS potential: ₹8-15 cr/year** at 75-85% margins. This single line item could match the entire core centre business at scale.

## Decisions pending

- Uday (Hyderabad dealer) is building a parallel VMS. Options:
  - **Collaborate**: combine forces on a shared codebase
  - **Run parallel**: two products, eventual market validation
  - **Acquire Uday's IP**: bring it under RaceSims if his is further along
- Junior dev hire (target: by Week 3 of build kick-off)
- Project repo location (suggested: new dedicated root `Projects/RaceSims-VMS/`)

## Connections

- [[racesims-chennai-flagship]] — first centre to use VMS in production
- [[racesims-championship-architecture]] — VMS is the timing + leaderboard infrastructure
- [[racesims-india-saturation-plan]] — VMS scales transparently across all centres
- [[racesims-revenue-stack]] — SaaS becomes a major Tier 1 revenue stream
- [[2026-05-17-racesims-chennai-flagship-planning]] — source
- [[domains/racesims/_index]]
