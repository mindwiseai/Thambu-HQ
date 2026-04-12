---
title: SEO Technical Fixes Backlog
type: concept
domain: racesims
tags: [seo, technical, backlog]
---

# SEO Technical Fixes Backlog

The technical SEO fixes flagged in the [[2026-03-25-seo-geo-audit|SEO/GEO audit]] for racesims.in. Some are already done; some are pending.

## ✅ Already done (per VRH battle plan)
- **AI crawler access (robots.txt)** — GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot allowed → see [[geo-first-mover-advantage]]
- Fixed duplicate H1 tags
- Fixed Organization schema duplication (partial — see [[brand-name-consistency-issue]] for the still-open naming bug)
- Added BreadcrumbList structured data
- Shortened title tags for better CTR
- Fixed 404 errors with proper redirects

## 🔴 Critical priority — open

### 1. Fix duplicate Organization schemas + brand naming (still partially open)
Every page had two Org schemas with different names: "Race Sims" and "RaceSims solutions Pvt Ltd". Picking ONE canonical name and standardizing across all schemas + content. See [[brand-name-consistency-issue]].

### 2. Fix 51 pages returning 404 errors
Review the 51 URLs in Google Search Console (Indexing → Pages → "Not found"). Set up 301 redirects for any that had traffic.

## 🟡 High priority — open

### 3. Fix duplicate H1 tags (theme edit, possibly still partial)
Audit confirms 2 H1 tags on every product page. Shopify theme outputs both a page-level H1 and a product title H1. Edit theme to ensure exactly **one H1 per page**. Change logo/header to `<div>` or `<span>`.

### 4. Add Product Review/Rating schema
Implement a product review system (Judge.me, Loox, or Shopify native). Add `AggregateRating` and `Review` schema to Product JSON-LD. AI models heavily favor products with visible social proof.

### 5. Fix missing alt text on images
Multiple product pages have images without alt text (4 on homepage, 5 on VNM Elite page). Bulk-add via Hextom app.

### 6. Shorten title tags
Currently 80-95 chars (Google truncates at ~60). Drop " – RaceSims solutions Pvt Ltd" suffix.

## 🟢 Medium priority — plan for next month

### 7. Create buying guide / comparison blog content
See [[blog-content-pipeline]] — 10-article plan from the VRH battle plan. AI models cite comparison articles 3-5× more than product pages.

### 8. Add LocalBusiness schema
Add `Store` schema with Chennai office address, phone, email, geo-coordinates. Helps "sim racing near me" and India-specific AI queries.

### 9. Strengthen About Us / Authority page
Build E-E-A-T signals: authorized [[conspit]] / [[vnm]] distributor status, service partner credentials, years in business, team expertise, customer base.

### 10. Review "Crawled - Currently Not Indexed" pages (63)
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
