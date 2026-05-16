---
title: SEO Technical Fixes Backlog
type: concept
domain: racesims
tags: [seo, technical, backlog]
---

# SEO Technical Fixes Backlog

The technical SEO fixes flagged in the [[2026-03-25-seo-geo-audit|SEO/GEO audit]] for racesims.in. Some are already done; some are pending.

## ✅ Already done (per VRH battle plan + 2026-05-17 full audit)
- **AI crawler access (robots.txt)** — GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot allowed → see [[geo-first-mover-advantage]]
- Fixed duplicate H1 tags
- **Organization schema** — fixed brand naming, added `address` (PostalAddress), `legalName`, `Simagic` removed (not authorised reseller) — [[2026-05-17-gmc-seo-optimisation]]
- **Product schema** — replaced `{{ product | structured_data }}` with custom Liquid: adds `seller` with `PostalAddress`, `itemCondition: NewCondition`, absolute `@id` URLs, `https://schema.org/` — fixes GMC counterfeit flag
- **LocalBusiness schema** — added to `</body>`: Chennai address, geo (13.0468, 80.2186), Mon–Sat 10–18 hours
- **AggregateRating (Judge.me)** — Product JSON-LD enabled; confirmed live on GT Sim Cockpit (5.00★, 1 review)
- **Image alt text** — 40 images across 13 products updated via GraphQL
- **Collection SEO** — 9/10 collections now have title + description
- **Brand name standardised** — "RaceSims Solutions Pvt Ltd" everywhere; home page + commercial page fixed
- Added BreadcrumbList structured data
- Fixed 404 errors with proper redirects

## 🔴 Critical priority — open

### 1. Fix 51 pages returning 404 errors
Review the 51 URLs in Google Search Console (Indexing → Pages → "Not found"). Set up 301 redirects for any that had traffic.

### 2. GMC resubmission
Schema changes live as of 2026-05-17. Wait 3–5 days for Google to re-crawl, then resubmit in Google Merchant Centre. GBP shows "Fix product details" card — expected to clear.

## 🟡 High priority — open

### 3. GTINs / MPNs from suppliers
Add EAN barcodes from Conspit and VNM to Shopify product variant → Barcode field. Schema will auto-populate `gtin`. Add MPN metafield (`custom.mpn`) per product. Both are strong GMC anti-counterfeit signals.

### 4. Shorten title tags
Currently 80-95 chars (Google truncates at ~60). Drop " – RaceSims solutions Pvt Ltd" suffix.

## 🟢 Medium priority — plan for next month

### 5. Create buying guide / comparison blog content
See [[blog-content-pipeline]] — 10-article plan from the VRH battle plan. AI models cite comparison articles 3-5× more than product pages.

### 6. Strengthen About Us / Authority page
Build E-E-A-T signals: authorized [[conspit]] / [[vnm]] distributor status, service partner credentials, years in business, team expertise, customer base.

### 7. GBP photos
Add 5–10 product/showroom photos to business.google.com → Photos. Already have 5.0★/8 reviews + 761 interactions.

### 8. Review "Crawled - Currently Not Indexed" pages (63)
63 pages were crawled by Google but not indexed. Either improve content, consolidate, or noindex them.

## Stats baseline (from the audit)

- Sitemap: 122 pages, healthy, last read 2026-03-21
- Indexed: 127
- Not indexed: 282
  - 115 alternate canonical
  - 63 crawled-not-indexed
  - 51 not found (404)
  - 41 redirects
  - 10 blocked by robots.txt
  - 2 discovered-not-indexed
- Core Web Vitals: **86/86 good URLs** on mobile + desktop (no perf work needed)
- HTTPS: enabled site-wide
- Canonicals: properly set

## What's already strong (don't break it)

✅ Core Web Vitals — all 86 URLs "Good" on mobile & desktop
✅ Rich product descriptions (968-1,337 words per product)
✅ FAQ sections with FAQPage schema on products
✅ Product JSON-LD with price + brand
✅ Good meta descriptions
✅ Open Graph tags configured

## Connections
- [[2026-03-25-seo-geo-audit]] — source
- [[brand-name-consistency-issue]]
- [[geo-first-mover-advantage]]
- [[geo-content-readiness]]
- [[blog-content-pipeline]]
