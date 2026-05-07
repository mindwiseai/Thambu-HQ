# GMC Product Feed Audit — RaceSims (2026-05-07)

**Audit method:** Shopify MCP `search_products` + `run-analytics-query`. 50 active products inspected.
**Account:** GMC `5496001964` (currently suspended — confirmed by user).
**Defence target:** Counterfeit Product policy + Misrepresentation policy.

## Vendor distribution (active SKUs)

| Vendor | Count | Authorization status | Counterfeit risk |
|---|---|---|---|
| Racesims (own brand) | 31 | Manufacturer | None |
| Conspit | 12 | IG post on hand; letter pending | **High until letter arrives** |
| Simagic | 4 | Distributor agreement on file (expires May 2026) | Medium |
| Moza | 2 | None pursued | **Critical** |
| Logitech | 1 | None | **Critical** |

## Immediate archive list (counterfeit risk + inventory issues)

### Block 1 — No authorization path → archive before appeal

| SKU | Vendor | Reason |
|---|---|---|
| Logitech G29 | Logitech | No authorization path; Logitech has no India authorized-reseller program |
| MOZA RACING R3 PC ONLY BUNDLE | MOZA | No authorization being pursued; **inventory shows -1** (data bug) — top-revenue but counterfeit-risk |
| MOZA RACING R5 BUNDLE | MOZA | No authorization being pursued; inventory 0 |

### Block 2 — Discontinued at manufacturer → archive

| SKU | Vendor | Reason |
|---|---|---|
| CONSPIT FP-Lite Formula Style cockpit | Conspit | Out of production at Conspit (per `wiki/hot.md` 2026-05-07) |
| CONSPIT FC Formula cockpit | Conspit | OOP, inventory 0 |

### Block 3 — Removed from active quotes → archive or unpublish

| SKU | Vendor | Reason |
|---|---|---|
| Simagic Alpha mini wheelbase | Simagic | Inventory 0; pulled from active quotes (on-request only) |
| Simagic Alpha Wheelbase | Simagic | Same |
| Simagic Alpha U Wheelbase | Simagic | Same |
| SIMAGIC GT NEO | Simagic | Same |

## Misrepresentation cleanup — "Race Sims India" tag (two-word) on 9 SKUs

The misrepresentation defence requires a single canonical brand. These 9 products still carry the legacy two-word tag in their tag list:

- CONSPIT ARES 12Nm CDR QR (NRG Style) Direct Drive Sim Racing Wheelbase
- CONSPIT MAX-01
- CONSPIT ARES Platinum 20Nm CDR QR
- CONSPIT 290GP
- CONSPIT H.OA Hub
- CONSPIT CPP Lite Pedals sim racing pedals
- CONSPIT CPP EVO V2 sim racing pedals
- CONSPIT H3 Hydraulic Hand Brake
- CONSPIT 300GT

**Action:** bulk-replace tag `Race Sims India` → `RaceSims India` (one word) across all 9. Also audit description bodies for the same string.

## Vendor field hygiene (counterfeit prevention)

Multiple bundles have `vendor="Racesims"` but are made of Conspit hardware (e.g., "CONSPIT Ares 12NM +QR+ 290GP Wheelrim"). For GMC feed integrity:

- A bundle's primary `Brand` attribute should match the actual manufacturer of the principal component, not the assembler. Consider:
  - Option A: keep `vendor="Racesims"` for assembly-IP credit, but populate the GMC `brand` attribute as `Conspit` for components that are unambiguously Conspit hardware in a Racesims bundle.
  - Option B: rename bundles to lead with "RaceSims Bundle:" prefix and clearly state "components: Conspit Ares 12Nm + ..." in title and description.
- Either way, GTIN/MPN where available should reference the actual component manufacturer.

## Top-revenue SKUs (lifetime, all-time)

From `run-analytics-query`:

| Rank | SKU | Lifetime gross sales | Orders | Vendor | Auth status |
|---|---|---|---|---|---|
| 1 | MOZA RACING R3 PC ONLY BUNDLE | ₹4,33,884 | 16 | MOZA | **None** → archive |
| 2 | CONSPIT ARES 12Nm wheelbase | ₹1,10,170 | 2 | Conspit | Pending letter |
| 3 | MOZA RACING R5 BUNDLE | ₹84,744 | 2 | MOZA | **None** → archive |
| 4 | Racesims GT Sim cockpit | ₹81,356 | 2 | Racesims | Own brand → safe |
| 5 | Racesims Fixed back Bucket Seats | ₹63,559 | 2 | Racesims | Own brand → safe |
| 6 | CONSPIT ARES APEX 8Nm | ₹42,372 | 1 | Conspit | Pending letter |
| 7 | CONSPIT CPP Apex Pedals | ₹27,966 | 1 | Conspit | Pending letter |
| 8 | Keyboard tray | ₹19,068 | 3 | Racesims | Own brand → safe |
| 9 | Handbrake & shifter mount | ₹10,170 | 4 | Racesims | Own brand → safe |
| 10 | CONSPIT CDR Quick release | ₹4,237 | 1 | Conspit | Pending letter |

**Strategic implication:** archiving Moza forfeits the historical ₹5.18L of past revenue but eliminates the counterfeit trigger. The own-brand + Conspit-with-letter SKUs cover the rest. Worth the trade.

## Subscription product check ✅

No products with `subscription` in title or tags. The earlier user-cited "subscription plugin issue" left no product residue. (App-level audit still pending — needs Shopify admin UI check.)

## Recommended Phase 1C action sequence

1. **Day 1** — User confirms archive intent for Block 1 + Block 2 + Block 3 (10 SKUs).
2. **Day 1** — Mass tag rename `Race Sims India` → `RaceSims India` on the 9 SKUs.
3. **Day 1** — Vendor/brand-attribute audit on Conspit bundles (decide Option A or B).
4. **Day 2** — GTIN/MPN populate where available (Conspit + Simagic + RaceSims own-brand).
5. **Day 2** — Promo banner: "upto 5% off" pulled from header until appeal cleared.
6. **Day 3** — Re-sync GMC feed (Sales channels → Google → push). Verify zero new product-level issues in Diagnostics.
