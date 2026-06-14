---
title: RaceSims Financials & Books Status — FY25-26
type: concept
domain: racesims
tags: [finance, accounting, zoho-books, tax, gst, valuation]
---

# RaceSims Financials & Books Status — FY25-26

Living record of [[racesims-company]]'s financial state and Zoho Books cleanup, as reviewed 2026-06-14 (source: [[2026-06-14-zoho-books-health-review]]). **FY25-26 = ~10-month first year** (ops started June 2025). Org in Zoho: 60042251146.

## P&L — FY25-26 (accrual, 01 Apr 2025 – 31 Mar 2026)

| Line | ₹ |
|------|---|
| Gross sales | 2,19,87,234 |
| less Discounts | (24,68,518) — 11.2% of gross |
| **Net operating income** | **1,96,27,430** |
| COGS (incl. labour 1.27L, materials 1.96L) | 1,29,00,404 |
| **Gross profit** | **67,27,026 (34.3%)** |
| Operating expense | 11,02,367 |
| **Operating profit** | **56,24,659** |
| Forex loss (non-op) | (1,88,136) |
| **Net profit** | **54,36,523 (27.7%)** |

Notable opex: Transportation ₹4,22,103 · Bank charges ₹2,59,313 · Travel ₹91,026 · Consultant ₹83,450 · Salaries ₹1,39,295 (implausibly low). **Duty = −₹1,49,551 (negative = posting error).**

## Balance Sheet — as of 31 Mar 2026 (ties out ₹1,35,27,237)

**Assets:** Bank ₹15,15,532 (ICICI 7,022 · SBI OD 14,08,378 · SBI Current 1,00,133) · AR ₹25,70,742 · Inventory ₹53,33,939 · ITC ₹30,14,483 · Prepaid ₹5,61,320 · Razorpay clearing ₹2,11,274 · Zoho Payments clearing ₹1,42,845 · Furniture & equipment ₹1,98,406 · **Finished Goods −₹24,470 (error)**.

**Liabilities:** AP ₹21,40,778 · GST output payable ₹34,87,775 · Loan liability ₹13,60,000 · Unearned revenue ₹7,51,952 · Employee reimb ₹1,38,570 · Import shipping ₹86,833 · **Opening Balance Adjustments ₹24,453 (unreconciled suspense)** · TDS payable ₹644 · **Tax payable −₹292 (error)**.

**Equity:** Owner's equity ₹1,00,000 + current-year earnings ₹54,36,523 = **₹55,36,523**. No prior-year retained earnings (first year).

## AR / AP aging (as of 14 Jun 2026)

- **Receivables ₹13,49,237**, of which **₹7,80,898 is >45 days** — dominated by [[arka-motorsports]] **₹6,24,551** (related party). Others >45d: Deepak Madhu 68,742 · N1 Racing 52,825 · Nishikant 17,700 · Corsa 10,600 · Ashish Joshi 6,480.
- **Payables ₹7,55,812**, of which **₹4,24,577 >45 days** — Aptronix 1,72,599 · Navkar 1,20,390 · Clicktech 48,083 · Klamp 42,250 the largest. Current ₹2,76,577 = Transsafe freight.

## GST & TDS

- **GST paid/filed on the portal, up to date** ([[thambu]] confirmed). Zoho not marked filed since Jun 2025 = cosmetic. **Auditor flagged 4 of 11 months mismatching** Zoho vs portal → reconcile + fix deltas. BS net GST ~₹4.72L is a Zoho artifact, not real unpaid tax.
- **TDS:** ₹644.01 booked (Jul+Aug 2025 only), ₹0 deposited, nothing after Aug. Largely not applied — needs CA review, deposit + interest, and going-forward setup.
- Tax angle: [[startup-tax-exemption]] being used (FY26) — clean books matter for the exemption claim.

## Studio advance — to be booked

~₹9.31L transferred Apr–Jun 2026 to "vaithamaniti" = **rental/capital advance for the [[racesims-studio]] space**. Currently uncategorized in the ICICI bank feed. Book as **asset: Rental Deposit / Capital Advance (Studio)**, not expense. (Note: dated current FY, so affects FY26-27, not the FY25-26 close.)

## Cleanup punch-list (priority order)

1. **GST** — reconcile the 4 mismatching months (Zoho vs portal), fix deltas, mark filed.
2. **TDS** — CA to confirm deductions due, deposit ₹644 + interest, set up TDS going forward.
3. **Book studio advance** as Rental Deposit / Capital Advance asset (~₹9.31L).
4. **Fix negative Finished Goods** −₹24,470 (inventory/COGS posting).
5. **Clear Opening Balance Adjustments** suspense ₹24,453 (migration leftover).
6. **Fix negative Duty** −₹1,49,551 — trace to source, reclassify.
7. **Fix Tax Payable** −₹292 reclassification.
8. **Book real payroll / founder salary** to normalize earnings.
9. **ARKA ₹6.24L receivable** — decide: collect or provide/write off.
10. **Categorize remaining uncategorized bank txns** (Razorpay escrow, UPI refund, sukraasventure, SBI OD item).

## Rating & indicative valuation

- **Business rating: 6.5/10** — strong launch-year traction (₹1.96cr in ~10 months), messy books. Reported 27.7% net margin is overstated (unnormalized payroll, no founder salary, studio rent pending).
- **Indicative valuation: ₹1.2–2.2cr, central ~₹1.5cr** (provisional). Revenue 0.5–1.0× run-rate ₹2.35cr; SDE 2.5–3.5×; EBITDA 4–5×; adjusted NAV floor ~₹45–50L. NOT a formal valuation — a Registered Valuer / merchant banker is required for any transaction, fundraise, or filing. Cleaning the books removes the diligence discount.

## Connections

- [[racesims-company]] · [[arka-motorsports]] · [[racesims-studio]] · [[startup-tax-exemption]] · [[import-operations]] · [[2026-06-14-zoho-books-health-review]]
