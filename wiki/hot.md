---
title: Hot Cache
type: meta
updated: 2026-05-04
---

# Hot Cache

Most recently touched context. Read this first for any query — it often answers the question alone. Trim to ~500 words; drop oldest entries first.

## 2026-05-04 (latest) — Catalogue refreshed with verified racesims.in pricing — Moza out, Simagic + VNM expanded

- **Pulled live data from [racesims.in](https://www.racesims.in) homepage + cockpits + monitors + all-products collections** to verify and refresh [[racesims-catalogue]] + [[kit-pricing]]
- **Removed all Moza products** (per Thambu — RaceSims not carrying Moza for now). Removed from wheelbase lineup, supplier list, brand list, connections
- **Added VNM pedals, shifter, handbrake** (per Thambu): VNM Lite Pedal (₹42,000+), VNM Sequential/H-Pattern Shifter (₹35,000), VNM 1.5 Rally Handbrake (₹35,000)
- **Added Simagic ecosystem** (was missing): Alpha Mini ₹64,999, Alpha ₹80,000, Alpha U ₹99,000 wheelbases + Simagic GT NEO ₹40,000 wheel
- **Added VNM Direct Drive Supreme 25Nm** (₹1,15,000) — was missing from the lineup
- **Added full Conspit cockpit lineup**: FP-Lite Formula Style ₹1,15,000, FC Formula ₹8,55,000, FC PRO ₹10,50,000, **FC PRO MOTION ₹24,95,000** (flagship)
- **Added monitor stands lineup** (4 RaceSims-built variants) and **seats lineup** (4 RaceSims-built variants) with verified prices
- **Added Gigabyte monitor lineup** with verified prices (GS32QC, G34WQC, GS27F, CO49DQ OLED)
- **Added Conspit pre-priced bundles** — Apex Bundle ₹1,27,500 + 8 wheelbase+QR+wheel combos
- **Added VNM 3DOF Motion Kit** explicit pricing (₹6,00,000)
- **Updated existing prices** to match racesims.in (Ares Apex 8Nm now ₹49,999, 290GP ₹69,500, MAX-01 ₹76,500, etc.)
- **New Tier 4b** added — Conspit FC PRO MOTION turnkey path at ~₹35L+ alongside existing VNM Motion path at ~₹14-15L

## 2026-05-04 — RaceSims full catalogue created with preconfigured bundles

- **Full catalogue page**: [[racesims-catalogue]] — covers every RaceSims product in race-engineer build-flow order
- **Structure:** controls → cockpit & seat → display & compute → audio + haptics → 3D-printed accessories → preconfigured bundles
- **4 preconfigured tiers:** Rally (~₹2.5L) → Formula (~₹4-5L) → Formula Cockpit (~₹5-6L) → Formula Cockpit Motion (~₹11L+)
- **Add-ons section** works across all tiers (audio upgrades, haptics upgrades, wind sim, Hue lighting, branded accessories)
- **Sample customer journeys** (newcomer, regional racer, F1-shifter, esports) illustrate how catalogue applies in practice
- All prices marked `[verify]` where not directly verified against pricelist — every quote requires fresh verification
- Pulls from [[kit-pricing]] (source spreadsheet) + [[gt-pro-rig]] (BOM detail) + [[racesims-audio-tiers]] + [[racesims-accessory-catalogue]]

## 2026-05-04 — RaceSims audio tiers locked (sales reference)

- **Full sales-spec reference page**: [[racesims-audio-tiers]] — covers mid + high-end + haptics
- **Mid tier**: Logitech Z906 5.1 + Creative AE-5+ + Razer Black Shark V2 Hyperspeed Wireless = ~₹70-80k speakers/HP/sound-card. Audited on clean-slate PC; AE-5+ retained because (a) many AM5 motherboards lack optical out, (b) SBX Pro Studio adds sim-racing surround value
- **High-end tier**: Sonos Beam Gen 2 + Sub Mini + 2× Era 100 (default ~₹1,45k) OR Samsung HW-Q990F (alternative ~₹1,40-1,70k) + Audeze Maxwell (~₹40k) + **no sound card** (motherboard audio handles edge cases) + 5-port gigabit switch (₹2k for shared Ethernet to PC + Sonos). Arc Ultra + Sub Gen 3 path +₹60k for multi-purpose rooms
- **Haptics tier (standard, applies to both)**: 2× Dayton BTS-1 + Nobsound 2-ch USB DAC + custom mounts = ~₹17k. Independent USB signal chain — SimHub Shake-It targets it directly, no conflict with sound tier
- **Custom mount SKUs added to [[racesims-accessory-catalogue]]** (Sprint 4): SKU 11 (BTS-1 mount kit ₹999/₹1,499), SKU 12 (Sonos Era 100 rig mount ₹1,499), SKU 13 (universal soundbar shelf ₹2,499). Each high-end sale → ~₹5,500 in mount-SKU revenue
- **PC build verified compatible**: Gigabyte B850 Gaming X / MSI Pro X870-P + 9800X3D or 9700X (both have RDNA 2 iGPU) + RTX 5070 Ti (3× DP + 1× HDMI 2.1 with eARC for Atmos to Sonos). 4-monitor case handled by motherboard HDMI from iGPU
- **Decision history captured** in [[racesims-audio-tiers]] iteration trail for future reference

## 2026-04-23 — RaceSims: 3D-printing capex decision + Online Instruments pivot

- **Capex recommendation locked:** Bambu Lab X1 Carbon Combo + ancillaries, **~₹1,55,000**. Enclosed chamber + CoreXY + AMS. Rationale + ROI in [[2026-04-23-3d-printing-capex-decision]].
- **Payback:** ~3 mo steady state, ~6 mo with realistic ramp. Year 1 ROI ~320% on 70 units/mo mixed portfolio.
- **10-SKU catalogue plan** across three two-week sprints — see [[racesims-accessory-catalogue]]. Sprint 1: phone holder, cup holder, profile caps, logo badge. Sprint 2: LED channel, Hue holder, [[conspit]] 310 Apex side plates, bass-shaker enclosure. Sprint 3: wind-sim fan housing, custom shift knob.
- **Race-engineer voice applied to hardware:** every SKU listing answers "why would a race engineer build this?" — measured (not guessed), functional (phone holder for telemetry apps), durability-tested (100 hr vibration + 48 hr heat soak), subtle branding.
- **[[online-instruments]] pivot:** client rejected the custom-enclosure design in [[2026-04-23-3d-printing-capex-decision|the original deck]]. Wants a Mahindra Thar Roxx cut in half as the simulator shell, delivered assembled, no on-site reassembly. [[thambu]] raised building-access concern.
- **Transport spec PDF shipped:** `racesims/technical/partners/Online Instruments/Online_Instruments_Transport_Spec.pdf` — unit dims (2.9 × 1.9 × 2.2 m, ~1,200 kg), full clearances, mandatory service lift spec, install room requirements. Client to confirm their building measurements before dispatch.

## 2026-04-19 — Prenatal: launch budget locked at Rs.70-90L (Tier 2)

- Build Rs.25-38L + Marketing Rs.25-40L + Runway Rs.13-20L = **Rs.70-90L**. Math Comparison table updated. Proposal aligned with pitch deck.

## 2026-04-17 — Prenatal: manifesto lock + entity reversal + fundraising next

- **Brand manifesto LOCKED:** [[prenatal-brand-manifesto|"The wellness brand India was missing."]] (supersedes the "TTC is a team job" version; "Together from the Start" rejected).
- **Entity reversal:** The Edit will NOT use [[lumen-marketing-company|LMC]] umbrella — incorporates as its own Pvt Ltd to protect LMC from cross-liability.
- **Cost + timeline:** Rs.25-30L launch capital, 18-20 month build.
- **Next topic:** fundraising strategy (F&F vs angel vs seed, valuation, cap table with eventual gyno co-founder, Indian wellness investor list, timing). Captured for next session.

## 2026-04-14 — Major prenatal pivot + lint pass

- Edit is India's first couples reproductive wellness brand (not prenatal-only). [[prenatal-launch-architecture-scenario-d|Scenario D]] launch: Couples Bundle + Prenatal Day 1, Postnatal Month 9–12.
- Manufacturer: [[tanishq-lifecare|Tanishq]] over [[brukem-life-care|Brukem]] (organic-cert fit). Flags: therapeutic claim on Boranutri, no DHA in current formulation.
- Lint pass: 197 pages, strong health. FSSAI dosage = "two capsules a day, after breakfast"; LMC pincode 600083.

## Current state of the businesses

**Prenatal** — pre-launch research. Strategy locked; gynecologist co-founder is #1 blocker. [[brukem-life-care]] top pick.

**Mindwise** — ~48 days to [[launch-plan-june-1-2026|June 1]]. Brand identity LOCKED, website content APPROVED by [[ankita]], [[outer-cardboard-box-decision]] pending, Dibiz starts May.

**RaceSims** — operational picture complete. Full supplier chain, pricing, legal entity, customer pipeline documented. Simagic contract expires May 2026.

## Blind spots (next ingestion priorities)

1. April 2 Mumbai meeting outcome — still not in wiki
2. Sorted brand book / visual identity final presentation — expected end of April
3. CDRI-55 trademark status — Bhaskar checking
4. Epaphra response — did they come back with collaboration options?
5. IMCD / Solista meeting outcomes — bitter-free Bacopa path viable?
6. Capsule type discrepancy — FSSAI filing may need updating (gelatin → HPMC)
7. Terminalia chebula / BPH product status — second CSIR-CDRI license still active?

## Things to flag on next interaction

- Mindwise: mid-April brand book + packaging deliverables DUE
- Capsule dosage on packaging drafts: **verify they all say "two capsules a day"** after today's resolution
- RaceSims content: always reference [[arka-motorsports|ARKA]] + [[can-bus-telemetry]]
- CTD claims: Singh 2009 / Patel 2016 fertility contradiction ([[cdri-08-safety-profile]])
- Mindwise pricing: Rs.850-900 LOCKED. Rs.1,200 is STALE.
- Simagic contract expires May 2026 — renewal decision approaching
