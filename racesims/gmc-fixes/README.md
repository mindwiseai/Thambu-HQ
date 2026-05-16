# GMC Schema Fixes — racesims.in

Two patches to apply in Shopify Admin → Online Store → Themes → Current theme → Edit code.

**Root cause of the 2025 counterfeit suspension:** No verified seller identity or product authenticity signals in structured data.

## Files to edit

| File | Change |
|------|--------|
| `layout/theme.liquid` | Fix Organization schema: add address, fix brand name |
| `sections/main-product.liquid` | Replace built-in `structured_data` with custom Product schema |

## How to apply

1. Shopify Admin → Online Store → Themes → "Updated copy of Race Sims v2" → Edit code
2. Open the file, Ctrl+F for the search string, paste the replacement
3. Save. Repeat for file 2.

See `patch-theme-liquid.md` and `patch-main-product-liquid.md` for the exact replacements.
