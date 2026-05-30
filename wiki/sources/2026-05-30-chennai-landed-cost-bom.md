---
title: Chennai — Landed-Cost Equipment BOM & Capital
type: source
source_type: strategy
domain: racesims
raw_path: racesims/racesims-chennai-project-report-landed-cost.pdf
ingested: 2026-05-30
---

# Chennai — Landed-Cost Equipment BOM & Capital

## Summary
[[thambu]] supplied **actual landed-cost figures (all incl. tax)** for the Chennai sim-rig hardware, replacing the earlier ₹5,84,900/rig distributor estimate. The 8-rig fleet is now costed bottom-up: **4 Formula/GT rigs** (Apex 2 pedals, no clutch/shifter/handbrake) + **4 Rally/GT rigs** (VNM 3-pedal + shifter + handbrake), with one rally rig carrying the 3-DOF motion platform (**7 static + 1 motion**). A second, separate report — `racesims-chennai-project-report-landed-cost.pdf` (11 pp) — was built on this basis; the original premium report is left untouched. Fleet equipment lands at **₹44.64L** (vs ₹50.79L estimate) and **net capital at ₹70.2L**.

## Key facts — per-rig bill of materials (landed, incl. tax)
Common to all 8 rigs: Conspit Ares 12 Nm wheelbase ₹41,500 · 300GT steering wheel ₹32,750 · quick release ₹4,500 · seat ₹20,000 · rig frame ₹22,000 · triple monitor stand ₹15,000 = **₹1,35,750**.
- **Formula / GT rig (×4):** common + **Apex 2 pedals ₹25,000** (no clutch — no shifter/handbrake) = **₹1,60,750** sim hardware.
- **Rally / GT rig (×4):** common + **VNM 3-pedal ₹35,500 + shifter ₹22,000 + handbrake ₹21,500** = **₹2,14,750** sim hardware.
- **Every station then adds** the compute + display at the prior MD Computers quote: PC (Ryzen 7 9700X + Zotac RTX 5070 Ti) **₹2,51,995** + **3 × Samsung Odyssey G5 32″ ₹72,000** = **₹3,23,995** (monitors are *inside* this quote — no double-count).
- **All-in per rig:** Formula **₹4,84,745** · Rally **₹5,38,745**.
- **Motion platform (3-DOF) = ₹3,70,000** (supplier-quoted, [[thambu]]) → motion rig = rally build + platform = **₹9,08,745**.

## Fleet & capital
| Build | Qty | Per rig | Subtotal |
|---|---|---|---|
| Formula / GT | 4 | ₹4,84,745 | ₹19,38,980 |
| Rally / GT (static) | 3 | ₹5,38,745 | ₹16,16,235 |
| Rally / GT · 3-DOF motion | 1 | ₹9,08,745 | ₹9,08,745 |
| **Fleet equipment · landed** | **8** | | **₹44,63,960** |

- Capital stack: equipment ₹44.64L + deposit ₹9.32L (refundable) + fit-out ₹16.10L + working capital ₹6.11L + contingency ₹3.04L (5% of equip+fit-out) = **gross ₹79.20L**, less GST ITC ₹9.01L = **net cash deployed ₹70.19L**; **capital truly at risk ₹60.88L**. *(Superseded 2026-05-30: fit-out later optimised ₹16.10L → ₹14.20L, reflowing the stack to gross ₹77.21L · net ₹68.46L · at-risk ₹59.14L · CoC ₹5.48L/yr · break-even 11.5% · multiple ~3.1× — see [[racesims-chennai-fitout]] and [[2026-05-30-chennai-fitout-optimisation]].)*
- **Cost of capital:** 8% p.a. on ₹70.2L = **₹5.62L/yr**.
- **5-year base case (occ 18→35%, opex/pricing unchanged):** cumulative **EBITDA ₹3.57 cr · PAT ₹2.11 cr · payback ~2.0 yrs · ~3.0× multiple**. Break-even unchanged (10.0% operating / 11.6% incl. cost of capital). Depreciation blended WDV on the ₹60.7L equipment + fit-out base.

## Decisions
- Build **4 Formula/GT (Apex 2-pedal, no clutch)** + **4 Rally/GT (VNM 3-pedal + shifter + handbrake)**; the formula cars need no clutch.
- PC + 3 monitors costed at the prior ₹3,23,995/rig quote (no fresh landed figure supplied).
- Motion platform confirmed at **₹3,70,000** — no longer a placeholder.
- Keep this as a **separate** report; the premium/distributor report stays as-is.

## Open questions
> [!contradiction]
> This landed build is **Conspit + VNM only** (Conspit wheelbase/wheel on every rig; Apex vs VNM pedals). The [[racesims-chennai-partnerships]] plan instead shows a **2 Conspit / 2 VNM / 2 Fanatec / 2 reserved** multi-brand showcase funded by sponsorship. Reconcile: **landed cost = the "buy it ourselves" baseline; the partnership split would substitute sponsor gear and cut this ₹44.6L further.** Confirm which is the build of record.

- Will the PC + monitors also get landed figures (currently prior-quote estimates)?
- Does the motion rig sit on a rally or formula base? (Assumed **rally** in the report.)

## Backlinks
- [[racesims-chennai-premium-baseline]] · [[racesims-chennai-partnerships]] · [[racesims-chennai-execution-plan]] · [[conspit]] · [[vnm]] · [[thambu]]
