---
title: RaceSims SEO + GEO Audit Report
type: source
source_type: strategy
domain: racesims
raw_path: racesims/strategy/SEO_GEO_Audit_Report_RaceSims.html
ingested: 2026-04-11
---

# RaceSims SEO + GEO Audit Report (March 25, 2026)

**Format:** HTML audit report
**Sources of data:** Google Search Console, Chrome UX Report, on-page analysis, robots.txt review

## Summary

A two-part audit of racesims.in: **(Part 1)** traditional SEO health and **(Part 2)** Generative Engine Optimization (GEO) — visibility to AI search engines. The audit produced 12 prioritized recommendations and a status scorecard. The headline finding: technical fundamentals are strong (Core Web Vitals, sitemaps, HTTPS, rich product descriptions), but several structural issues hurt entity recognition (brand naming, duplicate schemas, H1 tags) and content depth (no blog / buying guides) lags VRH heavily.

## Part 1: SEO Audit

### What's strong
- ✅ **Core Web Vitals**: 86/86 good URLs on mobile + desktop (no perf work needed)
- ✅ Rich product descriptions (968-1,337 words per product)
- ✅ FAQ sections with FAQPage schema on products
- ✅ Product JSON-LD with name, price, brand
- ✅ Good meta descriptions
- ✅ Open Graph tags
- ✅ Sitemap healthy (122 pages, last read 2026-03-21)
- ✅ HTTPS enabled site-wide
- ✅ Canonical URLs properly set

### What's broken
- ❌ Duplicate H1 tags on every product page (Shopify theme outputs page-level H1 + product title H1)
- ❌ Duplicate Organization schemas with inconsistent names ("Race Sims" vs "RaceSims solutions Pvt Ltd") → see [[brand-name-consistency-issue]]
- ❌ 51 pages returning 404 errors
- ❌ No BreadcrumbList schema
- ❌ No product review/rating schema
- ❌ No blog/buying guide content (major gap)
- ❌ No LocalBusiness schema
- ⚠️ Title tags too long (80-95 chars, Google truncates at ~60)
- ⚠️ Multiple images missing alt text
- ⚠️ 63 pages crawled but not indexed

### Indexing status
- 127 indexed
- 282 not indexed
  - 115 alternate canonical
  - 63 crawled-not-indexed
  - 51 not found (404)
  - 41 redirects
  - 10 blocked by robots.txt
  - 2 discovered-not-indexed

## Part 2: GEO Audit

### Why GEO matters now
- AI-driven traffic to Shopify grew **8× year-over-year in 2025**
- AI-driven orders grew **15×**
- FAQ schema content has **~10.5% AI citation rate** (one of the highest)
- Comparison/buying-guide content is cited **3-5× more** than product pages

### AI crawler access (status as of audit date)

**Then-status:** No rules in robots.txt for any AI crawler. Now FIXED per the [[2026-03-25-vrh-battle-plan|VRH battle plan]] — explicit Allow rules added for:
- GPTBot
- OAI-SearchBot (CRITICAL for ChatGPT Shopping)
- ChatGPT-User
- Google-Extended (Gemini)
- ClaudeBot / anthropic-ai
- PerplexityBot
- CCBot

This is the [[geo-first-mover-advantage]].

### GEO content readiness (good and bad)
- ✅ Product JSON-LD with price + brand
- ✅ FAQ schema on product pages (high citation rate)
- ✅ Rich product descriptions
- ❌ Brand entity inconsistency ("Race Sims" vs "RaceSims") — entity recognition problem
- ❌ No BreadcrumbList schema
- ❌ No Review/Rating schema
- ❌ Weak About/Authority page (E-E-A-T)
- ❌ No comparison/buying guide content (highest GEO opportunity)
- ❌ No LocalBusiness schema

## Part 3: 12 Prioritized Recommendations

### 🔴 Critical (do first)
1. Add AI crawler rules to robots.txt — **DONE** per VRH battle plan
2. Fix duplicate H1 tags on all pages
3. Fix duplicate Organization schemas + brand naming inconsistency
4. Fix 51 pages returning 404 errors

### 🟡 High priority (do soon)
5. Add BreadcrumbList schema
6. Add product review/rating schema (Judge.me / Loox / Shopify)
7. Shorten and optimize title tags
8. Fix missing alt text on images

### 🟢 Medium priority (next month)
9. Create buying guide / comparison blog content (10-article plan in [[blog-content-pipeline]])
10. Add LocalBusiness schema
11. Strengthen About Us / Authority page (E-E-A-T)
12. Review "crawled but not indexed" pages (63)

## Concepts created from this source
- [[seo-technical-fixes]]
- [[geo-first-mover-advantage]]
- [[geo-content-readiness]]
- [[brand-name-consistency-issue]]

## Recommended action timeline (per the audit)

| Timeframe | Actions |
|---|---|
| This week | AI crawler rules (DONE), fix duplicate Organization schema, start fixing 404s |
| Next week | Fix H1 tags, shorten title tags, fix alt text |
| Within 2 weeks | BreadcrumbList schema, LocalBusiness schema, set up product reviews |
| Within 1 month | Create 2-3 buying guide blog posts, strengthen About page, review crawled-not-indexed |

## Connections
- [[domains/racesims/_index]]
- [[2026-03-25-vrh-battle-plan]] (sister document, same date)
- [[seo-technical-fixes]]
- [[geo-first-mover-advantage]]
- [[geo-content-readiness]]
- [[brand-name-consistency-issue]]
- [[blog-content-pipeline]]
