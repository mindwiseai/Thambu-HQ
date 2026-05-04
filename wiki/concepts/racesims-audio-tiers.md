---
title: RaceSims Audio Tiers (Sales Reference)
type: concept
domain: racesims
updated: 2026-05-04
---

# RaceSims Audio Tiers — Sales Spec Reference

Locked May 2026 after a multi-session compatibility audit on a clean-slate sim PC build. This page is the **canonical reference for audio components recommended in customer PC specs**. Read this before writing any quote that includes audio.

Source: see "Decision history" at the bottom of this page for the iteration trail.

## Two tiers, plus haptics

RaceSims offers customers two audio tiers (mid / high-end) for **speakers + sound card + headphones**, plus a single haptics tier shared across both. Haptics is decided independently because its signal chain is fully self-contained.

## MID / STANDARD tier — locked

Target customer: budget-conscious sim racer; first sim rig; values working over premium-feeling.

| Component | Pick | India price [verify on retailer] | Why |
|---|---|---|---|
| Speakers | **Logitech Z906 5.1** | ~₹40,000–45,000 | Active 5.1 with built-in decoder/amp; satellites rig-clamp easily on customer's existing Amazon brackets |
| Sound card | **Creative Sound Blaster AE-5+** | ~₹15,000–18,000 | Drives Z906 via single optical cable (cleaner than 3× 3.5mm); SBX Pro Studio + ScoutMode for sim positional cues; required if customer's motherboard lacks optical out |
| Headphones | **Razer Black Shark V2 Hyperspeed Wireless** | ~₹14,000–16,000 | Wireless USB dongle; built-in DAC + amp + boom mic; doesn't need sound card |
| Haptics | See haptics tier below | ~₹17,000 | Standard for both tiers |
| **Total — mid tier with haptics** | | **~₹86,000–96,000** | |

### Mid-tier verification at sales time

| # | Check | What it determines |
|---|---|---|
| 1 | Does customer's motherboard have optical TOSLINK out on rear I/O? | If yes, AE-5+ is "save ₹15k" optional. If no, AE-5+ stays. |
| 2 | Does customer have existing Z906 mounting brackets, or do they need to source? | Amazon Vivo / generic clamp brackets [verify ASIN]; ~₹1k each |

## HIGH-END tier — locked

Target customer: premium sim builder; values true Atmos surround + reference audio quality + clean wireless install.

| Component | Pick | India price [verify on retailer] | Why |
|---|---|---|---|
| Speakers (default) | **Sonos Beam Gen 2 + Sonos Sub Mini + 2× Sonos Era 100** | ~₹1,45,000 | Active wireless 5.1.2 (virtualised Atmos); single HDMI eARC from PC GPU; reference build, strong India service network. **Trueplay calibration** is the differentiator. |
| Speakers (alternative) | **Samsung HW-Q990F** | ~₹1,40,000–1,70,000 | 11.1.4 channels in single SKU; physical Atmos heights in soundbar AND rears; spec-sensitive customer pick. |
| Speakers (multi-purpose room) | **Sonos Arc Ultra + Sub Gen 3 + 2× Era 100** (in place of Beam + Sub Mini) | +₹60,000 vs default | Real Atmos heights, deeper sub bass; for rooms doubling as movies / music space |
| Sound card | **None — motherboard audio** | ₹0 | All audio paths bypass motherboard codec (Sonos via HDMI, Maxwell via wireless dongle, Nobsound via USB DAC). AE-5+ optional add ₹15k for SBX features. |
| Headphones (default) | **Audeze Maxwell** | ~₹38,000–42,000 | Planar drivers, 2.4 GHz wireless, AI noise reduction mic, 80hr battery. Pro sim racing endorsement. |
| Headphones (alternative) | **SteelSeries Arctis Nova Pro Wireless** | ~₹35,000 | When customer wants ANC + dual-battery hot-swap. |
| HDMI 2.1 cable, 4m | Belkin / Anker | ~₹1,500 | PC GPU → soundbar |
| Network switch | 5-port gigabit (TP-Link, D-Link) | ~₹2,000 | PC Ethernet stays dedicated to gaming low-latency; switch shares the line with Sonos for stable streaming |
| Mounts | RaceSims custom 3D-printed (SKUs 12, 13 in [[racesims-accessory-catalogue]]) | ₹1,499 + ₹2,499 + ₹1,499 = ~₹5,500 | Era 100 rig mount × 2 + universal soundbar shelf × 1 |
| Haptics | See haptics tier below | ~₹17,000 | Standard for both tiers |
| **Total — high-end Sonos default + haptics** | | **~₹2,07,000** | |
| **Total — high-end Sonos multi-purpose + haptics** | | **~₹2,67,000** | |
| **Total — high-end Samsung alternative + haptics** | | **~₹1,97,000–2,27,000** | |

### High-end-tier verification at sales time

| # | Check | What it determines |
|---|---|---|
| 1 | Customer monitor count (1 / 3 / 4) | Drives whether motherboard HDMI is needed for monitor 4. 4-monitor case requires CPU iGPU — verified for 9700X and 9800X3D. |
| 2 | CPU has integrated graphics | Required for 4-monitor case (motherboard HDMI for aux display, GPU HDMI for Sonos). Verified Yes for Ryzen 9000 series. |
| 3 | Motherboard has HDMI 2.1 from iGPU | Required for 4-monitor case. **Verify** specific board's rear I/O on manufacturer spec page. |
| 4 | GPU has HDMI 2.1 with eARC | Sonos Atmos requires this. RTX 5070 Ti has it. |
| 5 | Wi-Fi 6 router OR Ethernet path via switch | Sonos Atmos streaming. Switch is part of standard spec. |
| 6 | 4 power outlets within 2m of rig | Beam + Sub + 2× Era 100. PC + monitors are separate. |
| 7 | iPhone or iPad available for Trueplay | One-time setup; can borrow device. |

## HAPTICS tier — locked (standard, applies to both mid and high-end)

Target customer: anyone in mid or high-end speaker tier. Haptics is the body-felt component that complements audio.

| Component | Pick | India price [verify] | Why |
|---|---|---|---|
| Bass transducer × 2 | **Dayton Audio BTS-1** | ~₹5,000–7,000 each | "Bass Tactile Surface" — flat plate transducer; 35W RMS continuous; bolts to seat + pedal tray |
| Amplifier | **Nobsound 2-channel 100W mini USB DAC amp** | ~₹4,000–6,000 [verify exact model] | USB DAC input — own audio device in Windows; SimHub Shake-It targets it directly |
| Mounting hardware | M6 bolts + T-slot nuts (×8) + speaker wire (16 AWG, 1m × 2) | ~₹1,000 | Connects amp to transducers; mounts brackets to rig profile |
| Mount brackets | RaceSims [[racesims-accessory-catalogue|custom 3D-printed]] (SKU 11) | ₹999 (PETG) / ₹1,499 (PA-CF) | Under-seat + under-pedal-tray |
| **Total — haptics tier** | | **~₹15,000–20,000** | |

### Haptics signal chain — verified independent

```
PC USB ─► Nobsound USB DAC ─► speaker wire ─► BTS-1 (under seat)
              │                    │
              └─ 2nd channel ─────┴─► BTS-1 (under pedal tray)

Source: SimHub Shake-It module
   - Reads sim telemetry (RPM, gear shift, kerb strikes, traction loss)
   - Generates audio at 20-80 Hz tuned to events
   - Outputs to Nobsound USB DAC as separate Windows audio device
   - SimHub config: Settings → Shake-It → Output Device → "Nobsound USB Audio"
```

**Independent of sound tier.** No conflict with Sonos / motherboard / Maxwell paths.

## Reference PC build context

These tiers are specced against this reference clean-slate PC:

| Part | Spec |
|---|---|
| Motherboard | Gigabyte B850 Gaming X *or* MSI Pro X870-P [MSI verified HDMI-only by Thambu, no DP on rear] |
| CPU | AMD Ryzen 7 9800X3D *or* Ryzen 7 9700X [both have RDNA 2 iGPU, 2 CUs, 2200 MHz — verified from AMD product spec pages] |
| GPU | Zotac RTX 5070 Ti (3× DP + 1× HDMI 2.1) |
| RAM | 32 GB DDR5-6000 |
| PSU | Corsair RM850X 850 W |
| SSD | 1 TB M.2 Gen 4 |
| Cooler | 360mm AIO |
| Case | NZXT H6 Flow (front USB-C + USB-A — useful for Maxwell dongle and Nobsound USB DAC) |
| OS | Windows 11 |

## Signal chain — full audio system on reference PC

```
PC GPU (RTX 5070 Ti) HDMI 2.1 ───► Sonos Beam Gen 2 (HDMI eARC)
                                         │
                                         ├─wireless─► Sonos Sub Mini
                                         ├─wireless─► Sonos Era 100 (L surround)
                                         └─wireless─► Sonos Era 100 (R surround)

PC Ethernet ──► gigabit switch ──┬─► Home router (gaming low-latency)
                                  └─► Sonos Beam Gen 2 (Sonos network)

PC USB (front) ──► Audeze Maxwell wireless dongle (own DAC + amp)

PC USB (front) ──► Nobsound USB DAC ──► speaker wire ──► 2× Dayton BTS-1 (haptics)

For 4-monitor customer:
PC motherboard HDMI 2.1 (9700X/9800X3D iGPU) ──► Monitor 4 (telemetry, 60-75 Hz)
   - Frees GPU HDMI for Sonos
   - iGPU is on the I/O die — does NOT load gaming CPU cores
   - Better for racing performance than putting monitor 4 on dGPU HDMI
```

## Common sales questions

### Q: Why no sound card in the high-end tier?
Every audio role bypasses the motherboard audio in the locked architecture:
- Sonos uses HDMI from GPU
- Maxwell uses its own wireless dongle DAC + amp
- Nobsound is its own USB DAC device

A sound card adds value only if customer plans wired audiophile headphones (HD 800 S, Audeze LCD-GX) or wants Sound Blaster Command software. Otherwise it's spend without function. AE-5+ is available as an optional ₹15k add when customer asks.

### Q: Why is the AE-5+ in the mid tier but not high-end?
Mid tier uses Z906 — connects via optical OR 3× 3.5mm analog. Many current motherboards lack optical out. AE-5+ provides optical → cleaner single-cable install + SBX features. That role doesn't exist in the high-end stack (Sonos is HDMI).

### Q: Why is the haptics tier the same for mid and high-end?
Haptics is body-felt impact driven by telemetry, not audio quality. The Dayton BTS-1 + Nobsound combo at ~₹17k is the right price-point — cheap enough to include for mid-tier customers who want immersion, capable enough that high-end customers don't outgrow it. Premium haptics expansion (Buttkicker LFE Kit, ~₹1.5L) is available if specifically asked.

### Q: Sonos vs Samsung HW-Q990F — which to lead with?
Default to **Sonos**. Reasons:
- Best app and Trueplay calibration in the category
- Modular upgrade path (start with Beam, add Sub, add Eras)
- Strong India service network
- Multi-room expansion potential

Switch to **Samsung HW-Q990F** when customer is spec-sensitive or specifically wants 11.1.4 channels.

### Q: What if customer already has Sonos / Samsung speakers from before?
Use what they have. The spec recommendation is for clean-slate purchase decisions. If existing equipment fits their use case, no upgrade pitch needed.

### Q: Can customer skip the haptics tier entirely?
Yes. Audio tiers stand alone. Customer who tries the rig later and wants more immersion can add the haptics retrofit (BTS-1 + Nobsound + custom mounts) any time — total ~₹17k retrofit, ~30 min install with the brackets in stock.

## Hard rules

- Brand names always written correctly: **RaceSims** (one word), **Sonos**, **Audeze Maxwell**, **Dayton BTS-1**.
- Price ranges shown are estimates — **always verify exact India retail price at the retailer (ProHiFi, Reliance Digital, Bajaao, Headphone Zone, Amazon)** before quoting a customer.
- For clean-slate spec, customer doesn't already own AE-5+ or any other component — every line is a fresh purchase decision.
- Mid tier and high-end tier should not be sold to the same customer simultaneously — the customer chooses one.
- Haptics is offered to both mid and high-end customers as a single option — no tiered haptics for now.

## Decision history (iteration trail)

The iteration that landed at this locked spec:

| Date | Decision | Note |
|---|---|---|
| 2026-05-03 | Initial Sonos-vs-Genelec exploration | Genelec 8030C ruled out: stand-mount only, doesn't fit Z906-style rig-clamp install ethos |
| 2026-05-03 | Klipsch Reference Theater Pack 5.0 considered as alternative | Sub stocking issue (Flexus Sub 100 doesn't pair with RTP); R-120SW available but adds AVR complexity |
| 2026-05-03 | Sonos vs Beam vs Arc Ultra | Beam Gen 2 default for sim-primary; Arc Ultra +₹35k for multi-use rooms |
| 2026-05-03 | Active alternatives surveyed (Sony BRAVIA Theater Quad, JBL Bar 1300X, LG S95TR, Bose Smart Soundbar Ultra) | Samsung HW-Q990F surfaced as legit alternative; others not strong enough to make the spec sheet |
| 2026-05-03 | Edifier S760D out of stock — checked further alternatives | Found via ProHiFi: Klipsch RTP 5.0 in stock if needed for AVR-architecture customer |
| 2026-05-03 | Sound card decision | None / motherboard audio for high-end (clean-slate). AE-5+ retained in mid tier (drives Z906). |
| 2026-05-03 | Haptics confirmed as Dayton BTS-1 + Nobsound USB DAC | Independent signal chain; doesn't depend on sound card |
| 2026-05-04 | 4-monitor customer routing | Solution 1 (motherboard HDMI for monitor 4) verified for 9700X / 9800X3D iGPU. AVR fallback (Klipsch RTP + Denon) and Sonos-via-optical fallback documented. |
| 2026-05-04 | Mid tier audit on clean-slate | Z906 + AE-5+ + Razer stack confirmed; AE-5+ rationale shifted from "old motherboard had no optical" to "many current motherboards lack optical + SBX value-add" |
| 2026-05-04 | Custom mounts decision | RaceSims will design + 3D print Sonos / BTS-1 mounts in-house. Added as Sprint 4 SKUs in [[racesims-accessory-catalogue]]: SKU 11 (BTS-1 mount kit), SKU 12 (Era 100 rig mount), SKU 13 (universal soundbar shelf) |
| 2026-05-04 | Network switch added to spec | Customer's PC Ethernet is dedicated to gaming. Sonos shares the line via 5-port gigabit switch (~₹2k) |
| **2026-05-04** | **All audio tiers locked** | This document |

## Related wiki pages

- [[racesims-accessory-catalogue]] — 3D-printed accessories including audio mount SKUs 11, 12, 13
- [[in-house-3d-printing]] — printer + materials capability backing the custom mounts
- [[2026-04-23-3d-printing-capex-decision]] — original capex source for the printing capability
- [[online-instruments]] — first B2B customer with audio install relevance
- [[customer-pipeline]] — sales pipeline this spec feeds into
- [[race-engineer-positioning]] — voice/positioning rules for audio listings
