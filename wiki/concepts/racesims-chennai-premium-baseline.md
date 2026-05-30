---
title: RaceSims · Chennai — Premium Baseline Forecast
type: concept
domain: racesims
tags: [forecast, chennai, financial-model, conservative, premium-pricing]
---

# RaceSims · Chennai — Premium Baseline Forecast

A **conservative, ground-truth forecast** for the [[racesims-chennai-flagship|Chennai flagship]], built 2026-05-29 with [[thambu]]. Deliberately stripped to the lights-on business: **6 rigs, drop-in sessions only — no [[racesims-motorsport-academy|academy]], no café, no [[racesims-the-ladder|Ladder]] revenue, no startup tax exemption.** Those all stack on top later as upside. Anchored to **real dealer data from [[uday-hyderabad|Uday]]**, not industry benchmarks. Source: [[2026-05-29-chennai-premium-baseline-forecast]]. Live model: `racesims-chennai-premium-forecast.xlsx` (not in git — repo ignores `*.xlsx`).

> [!contradiction]
> This forecast's occupancy assumptions are **far more conservative** than the locked [[racesims-chennai-flagship]] v3.1 / investor deck.
> - **v3.1 deck:** 30% → 68% utilisation ramp ("industry benchmark 50-65%"), ~25-26 month payback.
> - **This baseline:** 18% average Year-1 occupancy (brand-lands case), **anchored to Uday's actual ~20% at month 6** on 8 rigs at ₹800/hr.
> The deck assumes 1.5-3× the occupancy the one real network operator achieved. **Treat this page as the conservative floor; treat the deck as the upside-funded-by-academy/café case.** Do not present the deck's occupancy to investors without flagging Uday's real number.

## Configuration — CHOSEN: Variant C (8 rigs)
**Decision (2026-05-29): go with 8 rigs — 7 race/rally + 1 three-DOF motion**, 2 staff (lean). The live Excel base case (Summary + P&L) is now set to this; the 6-rig builds remain in the `Variants` tab for reference.
- **Equipment:** 7 × ₹5,84,900 + 1 × ₹9,84,900 = **₹50,79,200** at [[conspit]]/[[vnm]] distributor cost (~₹85-95L retail → big day-one equity).
- **Net cash deployed ₹68.3L · sunk ₹59.0L · break-even 10.0% occupancy** (below [[uday-hyderabad|Uday]]'s proven ~20%).
- **Year 1: ₹29.3L EBITDA (brand-lands) / ₹8.6L (brand-lags — profitable even in the bad case)**, profitable from month 3, payback ~13 months sunk. *(Reconciled to [[racesims-master-rate-card]]: motion +₹500/hr → fleet blended ₹1,218/hr net. Source of truth: `racesims-chennai-economics.pdf` + `racesims-chennai-premium-forecast.xlsx`.)*

## LOCKED — property confirmed (2026-05-30)
Property **locked** in **Nungambakkam** (central Chennai); opens **July 2026**. Full detail: `racesims-chennai-project-report.pdf` + `racesims-chennai-5yr-business-plan.pdf` (in `marketing/decks/`). Component costing refined to sourced 2025-26 prices and a **brand-partnership/sponsorship plan** — see [[racesims-chennai-partnerships]] (PC = RTX 5070 Ti build ₹3.24L/rig · AC = energy-efficient 5-star inverter splits ₹2.4L · 2× fibre Jio+Airtel · list capital ~₹73.5L, target ~₹55-58L after sponsorships).

> **Landed-cost variant (2026-05-30):** a second report on **actual landed prices** — `racesims-chennai-project-report-landed-cost.pdf` (11 pp), source [[2026-05-30-chennai-landed-cost-bom]]. Real Conspit/VNM rig BOM (incl. tax) replaces the ₹5.85L/rig distributor estimate: **4 Formula/GT** (Apex 2-pedal) + **4 Rally/GT** (VNM 3-pedal + shifter + handbrake), motion platform **₹3.70L**. **Fleet equipment ₹44.64L · net capital ₹70.2L · cost of capital ₹5.62L/yr · payback ~2.0 yr · ~3.0× multiple.** Premium/distributor report stays as-is.

- **Capital (full room-only fit-out):** equipment ₹50.79L + deposit ₹9.32L + **fit-out ₹16.1L** (itemised) + WC ₹6.11L + contingency ₹3.81L → gross ₹86.1L, less GST ITC ₹9.84L = **net ₹76.3L** (sunk ₹67.0L; deposit refundable).
- **Cost of capital:** 8% p.a. blended (part loan / part own) = **₹6.10L/yr**.
- **5-year forecast (base case, occ 18→35%):** cumulative **EBITDA ₹3.57 cr · PAT ~₹2.11 cr · payback ~2.1 yrs · ~2.8× capital multiple.** Café & academy excluded (upside).
- **Fit-out ₹16.1L (room-only — brand-new building has power + fire in place):** AC 8T + in-room electrical/UPS + solar film/blinds + flooring + black ceiling/wall paint (exposed look) + acoustic + lighting + glass office partition + reception/coffee + furniture + branding (name boards at cost) + value TVs + simple networking + audio + CCTV + biometric access + mobile billing. Full breakdown in `racesims-chennai-project-report.pdf`.
- **AC:** calculated ~6 T peak; install **8 T**. **Exposed black ceiling (no false ceiling) → NO cassettes** — use **ceiling-suspended (slab-mount) or heavy-duty high-wall inverter units**. Glazing solar gain is the swing factor (solar film + blinds). See [[racesims-chennai-execution-plan]] HVAC note.

### Floor fit (v7 — North-up · Vastu-oriented · LOCKED)
North-up with compass. **Entrance EAST · office/training NORTH-EAST corner · motion rig faces NORTH.** 7 static rigs along the **west wall** + **south wall**, **all screens against the walls** (drivers face out, backs to the room for spectating); motion hero at the north wall by the office. Reception + small coffee counter on the **east wall** by the entrance; two washroom doors east-south (kept clear); lounge centre; leaderboard north wall; perimeter windows west/south. Room **8.73 m E–W × 12.15 m N–S**. SuperLap look (pendant lamps, cream + carpet, steel reception). See `racesims-chennai-floorplan.png` / `racesims-chennai-3d.html`.

### (earlier note — superseded by v4 above)
Venue = typical floor (1st–4th), clear office hall **8.73 m × 12.15 m = 28.6 × 39.9 ft ≈ 1,142 sq ft** (service core separate). Final layout (`racesims-chennai-floorplan.png`, `racesims-chennai-3d.html`): **L-shape — 4 rigs back wall + 3 right wall + motion hero island**; **entrance on the lift-lobby wall** with a **reception + coffee counter** beside it; **two washroom doors kept clear** on the front-left wall; **glass training/academy room (~11.5 m², 6–8 seats)** back-left for Phase-2 [[racesims-motorsport-academy|Academy]]; lounge centre; leaderboard right wall. Feature footprint ~55% of floor — comfortable, and the hall could take 12–16 rigs, so **floor is not the constraint**; a 2nd floor is available later. Coffee + training room add ~₹2–2.5L one-time fit-out (folded into capex).
- Run under [[racesims-company|Racesims Solutions Pvt Ltd]] — existing GSTIN, full ITC, shared CA/books, [[abdul]] services rigs in-house, director cost stays at HQ.

## Pricing — tiered premium (GST-inclusive)
| Rig | 30 min | 60 min | Net /hr (ex-GST) |
|---|---|---|---|
| Race/rally (×5) | ₹750 | ₹1,250 | ₹1,165 |
| Motion 3-DOF (×1) | ₹1,000 | ₹1,750 | ₹1,589 |

**Fleet blended net ₹1,225/hr.** ~2× Uday's ₹800/hr — justified by motion + triple-screen DD kit + [[arka-motorsports|ARKA]] + the Ladder. Protect the headline rate via memberships / [[racesims-championship-architecture|Hot Lap]] / off-peak hours, never visible discounts.

## Monthly OpEx — ₹3,17,000
Rent ₹1,55,250 · building maint ₹17,250 · rig maint + replacement reserve ₹18,000 · staff 3×₹25,000 · electricity ₹37,500 · internet ₹4,000 · supplies ₹10,000. **Lean option: 2 staff = ₹2,92,000** (Uday runs 8 rigs on 2) — recommended at launch; cuts worst-case drawdown ~₹2L.

## Capital
| | ₹ |
|---|---|
| Gross capital (incl 6-mo deposit, 2-mo WC, 5% contingency) | 64,62,445 |
| less GST ITC reclaimable | (7,04,654) |
| **Net cash deployed** | **57,57,791** |
| Sunk capital (ex-refundable deposit) | 48,26,291 |

## Year 1 outcome
| | Brand Lands | Brand Lags |
|---|---|---|
| Avg occupancy | 18% | 12% |
| Net revenue | ₹49.8L | ₹34.2L |
| **EBITDA** | **₹11.7L** | **(₹3.9L)** |
| Max cash drawdown | ₹3.5L (month 4) | ₹7.6L (month 6) |
| Profitable from | Month 5 | Month 7 |

- **Break-even: 13.8% occupancy** (259 rig-hrs/mo) — a soft floor.
- **Year-1 income tax ≈ ₹4,000** even *without* the [[startup-tax-exemption|80-IAC exemption]]: ₹11.6L depreciation nearly cancels ₹11.7L EBITDA. Exemption matters more in Y2-3.
- **Payback (corrected): ~19 months sunk / ~22 months net at a realistic 25% steady state** — consistent with the v3.1 deck's 25-26 months. The earlier "~8-10 month" figure assumed an unrealistic 40% and was wrong.

## Steady-state sensitivity (monthly EBITDA)
| Occupancy | 15% | 20% | 25% | 30% | 40% |
|---|---|---|---|---|---|
| EBITDA | ₹0.27L | ₹1.42L | ₹2.56L | ₹3.71L | ₹6.00L |
| Margin | 8% | 31% | 45% | 54% | 65% |

## Variants (in the Excel `Variants` tab)

All on the brand-lands ramp, lean staffing except Base:

| | A · Base (6 rig, 3 staff) | B · Lean (6 rig, 2 staff) | C · 8-rig 7+1 (2 staff) | D · 8-rig 6+2 (2 staff) |
|---|---|---|---|---|
| Capacity (hrs/mo) | 1,872 | 1,872 | 2,496 | 2,496 |
| Blended net rate | ₹1,225 | ₹1,225 | ₹1,210 | ₹1,255 |
| Monthly OpEx | ₹3,17,000 | ₹2,92,000 | ₹3,05,500 | ₹3,05,500 |
| Break-even occ | 13.8% | 12.7% | 10.1% | 9.8% |
| Net cash deployed | ₹57.6L | ₹57.1L | ₹68.3L | ₹71.9L |
| **Y1 EBITDA — Lands** | ₹11.7L | ₹14.7L | ₹28.9L | ₹31.3L |
| Y1 EBITDA — Lags | (₹3.9L) | (₹0.9L) | ₹8.4L | ₹10.0L |
| Payback (sunk, @25%) | 18.8 mo | 17.0 mo | 13.1 mo | 13.1 mo |

**Findings:**
- **Lean (B) is a free win** — open on 2 staff; +₹3L Y1 EBITDA, lower drawdown, same capital. Add 3rd staff when weekends force it.
- **8-rig is the real lever** if the space holds 8: break-even drops below Uday's proven 20%, Y1 EBITDA roughly **doubles**, and even the bad case (Lags) is *profitable*.
- **D (6+2 motion) edges C** (+₹2.4L/yr for ₹4L more capital) **but only if motion demand fills two seats** — equal-occupancy assumption is generous for a second premium novelty rig. C is safer; confirm motion utilisation (ask [[uday-hyderabad|Uday]]) before doubling motion.

## Execution levers (decide which Year-1 column you get)
1. **Get [[uday-hyderabad|Uday]]'s 6-month playbook** — he's the Hyderabad dealer, not competition. Marketing, customer mix, peak hours, Hot Lap impact. Free, biggest de-risker.
2. Lead with the **motion rig + ARKA story**, not hardware specs.
3. Sell **experiences + corporate first** — absorb premium pricing, fill weekday dead hours.
4. **Protect the headline rate.**
5. **Hot Lap** as network-funded funnel (~₹20k cost share).
6. **Guardrail:** watch month 4 — occupancy should be past ~10% and climbing, with ₹15L+ runway untouched.

## Open questions
- Can the space physically hold **8 rigs** instead of 6? At realistic rates, 8 rigs materially widens the floor (per-rig fixed cost drops, like Uday).
- Uday's exact pricing mix and quiet-month revenue (only peak ₹4.5L / month-6 / ₹800-hr known).
- Confirm 80-IAC exemption window (FY2027 eligibility) with CA — not yet claimed this year.

## Backlinks
- [[racesims-chennai-flagship]] — the fuller v3.1 model this is the conservative counterpart to
- [[2026-05-29-chennai-premium-baseline-forecast]] — source session
- [[uday-hyderabad]] — dealer whose real numbers anchor the ramp
