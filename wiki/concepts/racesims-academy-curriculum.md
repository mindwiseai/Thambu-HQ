---
title: The Motorsport Academy — Curriculum System
type: concept
domain: racesims
status: LOCKED
tags: [curriculum, pedagogy, training, academy, session-model, glossary]
updated: 2026-05-30
---

# The Motorsport Academy — Curriculum System

The teaching architecture behind every [[racesims-motorsport-academy|Motorsport Academy]] programme. This page defines the *how* — the session model, progression logic, and concept glossary that every programme inherits. Per-programme session plans link from the bottom.

> The Academy is not "track time with a coach nearby." Every session is a structured lesson with a concept, a drill, an application, and a data-backed debrief. This is what separates a *programme* from a *sim café*.

---

## The session model — the B·D·A·D loop

Every Academy session, in every programme, follows the same four-beat shape. Coaches are trained to run it identically so the experience is consistent across the network.

```
┌──────────┬──────────┬──────────┬──────────┐
│  BRIEF   │  DRILL   │  APPLY   │ DEBRIEF  │
│ ~10 min  │ ~20 min  │ ~25 min  │  ~5 min  │
├──────────┼──────────┼──────────┼──────────┤
│ Teach    │ Isolate  │ Put it   │ Review   │
│ the one  │ the      │ in a     │ telemetry│
│ concept  │ skill in │ full-lap │ vs the   │
│ of the   │ a closed │ / stage  │ target.  │
│ session  │ exercise │ context  │ Set next │
│          │          │          │ goal.    │
└──────────┴──────────┴──────────┴──────────┘
```

- **Brief** — one concept per session. Never more. Whiteboard + telemetry example.
- **Drill** — the skill isolated from everything else (e.g. braking with no steering). Repetition builds the motor pattern.
- **Apply** — the skill returned to a full lap or stage, under realistic conditions.
- **Debrief** — coach + driver read the telemetry trace together against the session target. The next session's goal is set here.

## Progression logic — earned, never given

Mirrors [[racesims-the-ladder|The Ladder]] philosophy: every step is earned against a measurable benchmark, logged on the driver's [[racesims-vms-build|VMS]] Driver Card.

| Gate | Standard |
|------|----------|
| **Pass** | Beat the published benchmark lap / stage time for the tier |
| **Distinction** | Beat the Gold Standard time (≈ instructor pace) |
| **Win** | Top the cohort in the assessment session |

No timed assessment is passed by attendance. A driver who doesn't hit the benchmark repeats — and that integrity is exactly what makes the certificate worth something to parents and sponsors.

## Telemetry-led — the data is the teacher

Every session generates a trace. Coaches teach from four core channels:

- **Speed trace** — where time is won and lost, corner by corner
- **Brake trace** — pressure, release shape, lock-ups
- **Throttle trace** — application point, modulation, wheelspin
- **Steering + line overlay** — the path taken vs the ideal

The driver leaves every session able to *see* their improvement, not just feel it.

## Discipline-specific platforms

| Discipline | Platforms | Why |
|------------|-----------|-----|
| Circuit | Le Mans Ultimate + iRacing | Best physics + ranked competition ecosystem |
| Rally | Assetto Corsa Rally + Richard Burns Rally | Gold-standard stage + surface modelling |
| Real-car prep | Venue replicated in sim (MMRT etc.) | Learn the real circuit cold before driving it |

## The concept glossary (taught across tiers)

These are the named concepts illustrated in the curriculum deck. Each is introduced once, then deepened tier by tier.

| Concept | First taught | One-line |
|---------|--------------|----------|
| Racing line (out–in–out) | Initiation S2 | The fastest path: wide entry, clip apex, wide exit |
| Apex (geometric vs late) | Initiation S2 | The point you kiss the inside; late apex serves the exit |
| Slow in, fast out | Initiation S2 | Sacrifice entry speed to maximise exit onto a straight |
| Braking point & markers | Initiation S3 | Fixed reference for where you hit the brake |
| Threshold braking | Initiation S3 | Maximum deceleration just short of locking |
| Trail braking | Advanced S1 | Bleeding off brake as you turn in, to rotate the car |
| Throttle modulation | Advanced S2 | Feeding power to the traction limit on exit |
| Weight transfer | Initiation S1 → Tuner | Load shifting between tyres under accel/brake/turn |
| Understeer / oversteer | Advanced S4 | Front washes wide / rear steps out |
| Compromise line | Advanced S3 | Sacrificing one corner to be fast through the next |
| Overtaking lines | Advanced S5 | Late-brake, switchback, undercut |
| Defensive line | Advanced S6 | Covering the inside without over-defending |
| Tyre management | Advanced S7 | Pacing to preserve grip over a stint |
| Scandinavian flick | Rally S2 | Pendulum weight transfer to rotate on loose surface |
| Left-foot braking | Rally S3 | Braking without lifting, to set attitude + keep boost |
| Pace notes | Rally S4 | The co-driver's coded description of the road ahead |

## Programme curricula (session-by-session)

- [[racesims-curriculum-initiation]] — Tier 1 · 4 sessions
- [[racesims-curriculum-advanced-circuit]] — Tier 2 Circuit · 8 sessions
- [[racesims-curriculum-advanced-rally]] — Tier 2 Rally · 10 sessions
- [[racesims-curriculum-sim-reality]] — Tier 3 · 4 prep + real-car day
- [[racesims-curriculum-track-day]] — Track Day Prep + Advanced Performance (separate)
- [[racesims-curriculum-tuner-lab]] — Corporate engineering programme (separate)

## Output artefacts

- **Illustrated deck:** `racesims/marketing/decks/motorsport-academy-curriculum.html` + `.pdf` (21 slides — aspirational open, 9 custom-SVG concept diagrams, per-programme session detail). RaceSims editorial system (cream + RS Red + Montserrat + JetBrains Mono).

## Connections

- [[racesims-motorsport-academy]] — the 3-tier programme this curriculum delivers
- [[racesims-master-rate-card]] — pricing for each programme
- [[racesims-the-ladder]] — the earned-progression philosophy
- [[racesims-championship-architecture]] — where graduates compete
- [[racesims-vms-build]] — Driver Card + telemetry infrastructure
- [[arka-motorsports]] — endorses the rally syllabus + real-drive faculty
- [[domains/racesims/_index]]
