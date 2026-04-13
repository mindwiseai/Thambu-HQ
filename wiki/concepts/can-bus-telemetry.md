---
title: CAN Bus Telemetry — Sim-to-Real R&D
type: concept
domain: racesims
status: ACTIVE
tags: [r-and-d, telemetry, can-bus, moat-proof]
---

# CAN Bus Telemetry — Sim-to-Real R&D

Active R&D work connecting real rally cars to sim racing platforms via CAN bus data. This is the **most concrete technical proof** of the [[race-engineer-positioning|race-engineer moat]] — it demonstrates that [[thambu]] doesn't just sell sim hardware, he engineers the bridge between simulation and real motorsport.

## What it is

CAN bus (Controller Area Network) is the communication protocol used in modern race cars for telemetry data — throttle position, brake pressure, steering angle, suspension travel, engine RPM, wheel speed, etc. The R&D work involves:

1. **Reading CAN bus data** from [[arka-motorsports]]' real rally cars
2. **Mapping that data** to sim physics models
3. **Comparing real-world telemetry** with sim telemetry to validate setup accuracy
4. **Closing the loop** — using sim data to improve real-world car setup and vice versa

## Why this is the moat proof

Per the [[2026-03-26-thambu-voice-brief|March 26 voice brief]], [[thambu]] is actively working on this integration. This is:

- **Technically deep** — requires race engineering expertise, not just hardware retail knowledge
- **Unique in India** — no other Indian sim-racing company has access to real race car telemetry data
- **Content-rich** — every step of this R&D generates content that [[virtual-racing-hub|VRH]] cannot replicate (telemetry comparison videos, setup guides, data analysis posts)
- **Commercially valuable** — racing academies and professional drivers would pay for validated sim-to-real correlation data

## Content unlocked

- Telemetry comparison content: sim vs real overlay videos
- "How a Race Engineer Validates Sim Physics" — flagship blog post for [[blog-content-pipeline]]
- Setup transfer guides: "This is the real brake bias from the ARKA rally car, and here's how we set the sim to match"
- [[discord-server-setup-kit|Discord #race-engineer-tips]] exclusive data drops

## Connections

- [[race-engineer-positioning]] — this IS the moat in action
- [[arka-motorsports]] — source of real-world telemetry data
- [[thambu]] — the engineer doing this work
- [[mr-leela-krishnan]] — facilitates ARKA access
- [[next-gen-racesims-rigs]] — hardware designed to complement this telemetry work
- [[blog-content-pipeline]] — content pipeline that leverages this R&D
- [[2026-04-13-racesims-raw-dump]] — source
