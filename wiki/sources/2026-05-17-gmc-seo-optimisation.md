---
title: GMC & SEO Optimisation — Full Site Audit
type: source
source_type: strategy
domain: racesims
raw_path: racesims/gmc-fixes/
ingested: 2026-05-17
---

# GMC & SEO Optimisation — Full Site Audit

Session date: 2026-05-16/17. Full website audit and remediation targeting Google Merchant Centre approval and organic/AI search visibility.

## Summary

Google Merchant Centre was flagging racesims.in for a "counterfeit product" policy violation. Root cause: missing seller identity signals — no `PostalAddress` in Organization schema, Shopify's built-in `{{ product | structured_data }}` filter omitting `condition`, `seller`, and using deprecated `http://schema.org/`. Fixed by replacing all structured data with custom Liquid blocks plus adding LocalBusiness schema and enabling Judge.me AggregateRating JSON-LD.

## Key facts

- **Shopify store handle**: `hhck1u-zz.myshopify.com` (previously only `racesims-solutions-pvt-ltd` was known)
- **Live theme ID**: `gid://shopify/OnlineStoreTheme/145052794958` — "Updated copy of Race Sims v2"
- **GMC root cause**: `{{ product | structured_data }}` filter uses `http://schema.org/`, no `condition`, no `seller` — all counterfeit-detection signals Google checks
- **9 of 10 collections** had zero SEO title or description before this session

## Fixes applied (all live)

### Structured data (layout/theme.liquid + sections/main-product.liquid)
- Organization schema: added `address` (PostalAddress, Ashok Nagar Chennai 600083), `legalName: "Racesims Solutions Private Limited"`, fixed "Race Sims" → "RaceSims"
- Product schema: replaced `{{ product | structured_data }}` with custom Liquid — adds `seller` with `PostalAddress`, `itemCondition: NewCondition`, absolute `@id` URLs, `https://schema.org/`
- LocalBusiness schema: added to `</body>` in theme.liquid — includes `geo` (lat 13.0468, lon 80.2186), `openingHoursSpecification` (Mon–Sat 10–18), `priceRange: ₹₹₹`
- Schema stack on every product page: Organization + LocalBusiness + BreadcrumbList + Product (with seller) + AggregateRating (Judge.me)

### Collection SEO metadata (via Shopify GraphQL API)
Updated 9 collections with SEO titles and descriptions:
- Brands (Conspit, VNM Simulation)
- Wheelbase & Direct Drive
- Pedals, Shifter & Handbrake
- Cockpits - Pro-Grade Sim Racing Rigs
- Seats & Comfort
- Accessories
- Monitors & Display
- Motion Simulators 3DOF & 6DOF
- All Products

### Page content fixes (via Shopify GraphQL API)
- Commercial page: `<h1>` demoted to `<h2>`, "Race Sims" → "RaceSims" throughout
- Home page: removed Moza + Simagic brand references, fixed brand name, updated motion to "3DOF & 6DOF"

### Image alt text (via productUpdateMedia GraphQL)
40 images across 13 products updated with descriptive alt text. Previously all empty.

### Judge.me
- Enabled **Product JSON-LD** (`enable_json_ld_products: true`) — AggregateRating confirmed live on GT Sim Cockpit (5.00★, 1 review)
- Enabled Microdata snippets
- 5 product reviews total, 5.0★ avg (GT Sim Cockpit, Simagic Alpha Mini, MOZA R5, Pro Sim Racing Bucket Seats)
- 0 shop reviews (separate from product reviews)

## Decisions

- **Simagic removed from schema/content** — user confirmed not an authorised reseller; Simagic products listed for price comparison only, drafted as separate collection
- **Belt drive removed** — RaceSims sells direct drive only; belt drive was erroneously in wheelbase collection description
- **VNM 6DOF added** — user confirmed 6DOF motion system available alongside 3DOF

## Open questions

- GTINs/MPNs from Conspit and VNM — needed to unlock GTIN field in Product schema and GMC feed
- GMC resubmission — wait 3–5 days for Google to re-crawl schema changes, then resubmit
- GBP photos — showroom/product photos not yet added to business.google.com

## Google Business Profile state (as of 2026-05-16)
- **5.0★, 8 Google reviews**, 761 customer interactions
- Category: Motorsports store
- Address, phone, hours all correct
- "Fix product details" GMC card visible — expected to clear after schema re-index
