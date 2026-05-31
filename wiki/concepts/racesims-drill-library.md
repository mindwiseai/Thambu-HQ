---
title: The Academy Drill Library
type: concept
domain: racesims
status: DRAFT
tags: [drills, exercises, practice-trainers, telemetry, assessment, coaching]
updated: 2026-05-31
---

# The Academy Drill Library

The catalogue of named, scored exercises the [[racesims-academy-delivery-system|Academy]] is built from. Every [[racesims-academy-curriculum|concept]] maps to a drill; every drill is repeatable, telemetry-scored, and has bronze/silver/gold marks. The coached drills *are* the self-serve [[racesims-academy-challenges|Practice Trainers]] — same name, same score, so coaching and homework reinforce the same skill.

> Why named drills matter: "work on your braking" is a vibe. "Get gold on the Braking Box" is a deliberate-practice task with a setup, a metric, and a target. The second one improves drivers; the first one fills time.

---

## The drill card (every drill has this shape)

| Field | What it is |
|-------|-----------|
| **Setup** | The scenario — corner, rig config, starting condition |
| **Good looks like** | The one thing the driver is trying to produce |
| **Metric** | The telemetry channel that scores it (objective, auto-read by [[racesims-vms-build|VMS]]) |
| **Marks** | Bronze / Silver / Gold thresholds — gold ≈ instructor pace |
| **Coach cue** | What the coach *says* + what to *read in the trace* |
| **Common error** | The mistake to catch first (the BAD in BAD-vs-GOOD) |

---

## Level 1 — Consistency & Confidence

| Drill | Concept | Metric | Common error |
|-------|---------|--------|--------------|
| **The Braking Box** | Braking points + threshold braking | Brake-point consistency (±m) + zero lockups | Braking too early "to be safe", or stabbing into a lock |
| **The Apex Clip** | Racing line, apex, out–in–out | Apex deviation (cm) over N laps | Turning in early → early apex → running wide on exit |
| **Eyes Up** | Vision / looking ahead | Earlier correction / smoother inputs when markers appear late | Staring at the nose of the car; reacting late |
| **The Metronome** | Consistency | Lap-time standard deviation across 5 laps | Chasing one fast lap instead of five repeatable ones |

## Level 2 — Balance & Speed

| Drill | Concept | Metric | Common error |
|-------|---------|--------|--------------|
| **The Release Ramp** | Trail braking | Brake-pressure release smoothness + entry speed | Dumping the brake at turn-in (car won't rotate) |
| **Slow Hands** | Weight transfer | Steering/throttle input rate; car stays settled | Snapping inputs and upsetting the platform |
| **The Slip Window** | Slip angle / neutral steer / the limit | % of corner held at optimal slip | Driving below the limit, or past it into a slide |
| **The Throttle Ramp** | Throttle modulation | Traction-limited exit speed; no wheelspin spike | Flooring it at apex → wheelspin → slow exit |

## Level 3 — Precision

| Drill | Concept | Metric | Common error |
|-------|---------|--------|--------------|
| **Rotation Point** | Maximum rotation point | Min-speed location + exit speed | Rotating too early or too late for the exit |
| **The Compound** | Double / compound corner | Exit speed onto the following straight | Optimising corner 1 and wrecking corner 2 |
| **Bias Tuning** | Brake bias + engine braking | Entry stability + rotation under braking | Blaming the driver for a balance the bias controls |

## Level 4 — Mastery

| Drill | Concept | Metric | Common error |
|-------|---------|--------|--------------|
| **The Tyre Stint** | Tyre management | *Average* lap over a stint + degradation curve | Burning the tyres in 3 laps chasing one hot lap |
| **The Limit Lap** | Active driving at the limit | Delta to the Gold Standard lap | Driving the line, not the car — no live adjustment |
| **Conditions** | Wet / setup adaptation | Delta to dry baseline; adaptation speed | Driving a wet track like a dry one |

## Rally drills

| Drill | Concept | Metric | Common error |
|-------|---------|--------|--------------|
| **The Flick** | Scandinavian flick | Rotation achieved + exit speed on loose surface | No pendulum set-up → understeer off the road |
| **Left-Foot** | Left-foot braking | Attitude set without lifting; boost held | Lifting to brake and killing momentum |
| **Pace-Note Run** | Pace notes | Clean run committing to co-driver calls blind | Driving on sight instead of trusting the notes |

## Racecraft drills (racing other people)

Taught in [[racesims-curriculum-racecraft|Racecraft]] / used in workshop Race blocks.

| Drill | Concept | Metric | Common error |
|-------|---------|--------|--------------|
| **Race Start** | Launch + run to Turn 1 | Reaction time + clean first corner vs AI | Optimistic Turn 1 lunge → contact → lost places |
| **The Switchback** | Switchback / cutback | Pass completed on the exit, not the entry | Diving the entry and getting re-passed on exit |
| **The Defensive Line** | Defensive line | Position held without wrecking own exit | Over-defending the inside, killing the exit |
| **Wheel-to-Wheel** | Multi-car awareness | Clean racing score across a contested stint | Target-fixating on one car, missing the pack |

---

## How drills become the programme

- A **session** = one concept → its drill (Layer 2 of the [[racesims-academy-delivery-system|delivery system]]).
- A **gate** = the drill, scored pass/fail, that ends a [[racesims-academy-curriculum|Level]] (see [[racesims-academy-challenges|Challenge Gates]]).
- **Homework** = the same drill, self-serve, between sessions.
- A **workshop station** = a drill rig drivers rotate through.

One vocabulary, four delivery modes. That's what keeps the experience coherent.

## Connections

- [[racesims-academy-delivery-system]] — how these are run in a session
- [[racesims-academy-curriculum]] — the concepts each drill teaches
- [[racesims-academy-challenges]] — the self-serve trainers & gates (same drills)
- [[racesims-vms-build]] — auto-scoring + the Driver Record
- [[domains/racesims/_index]]
