# Patch: sections/main-product.liquid — Product Schema Fix

## File to edit
`sections/main-product.liquid`

## What to find (Ctrl+F this exact string)
```
    <script type="application/ld+json">
      {{ product | structured_data }}
    </script>
```

## Replace with

```liquid
    {%- liquid
      assign current_variant = product.selected_or_first_available_variant
      assign product_url = shop.secure_url | append: product.url
      assign variant_url = shop.secure_url | append: current_variant.url
      if current_variant.available
        assign availability = 'https://schema.org/InStock'
      else
        assign availability = 'https://schema.org/OutOfStock'
      endif
    -%}
    <script type="application/ld+json">
    {
      "@context": "https://schema.org/",
      "@type": "Product",
      "@id": "{{ product_url }}#product",
      "name": {{ product.title | json }},
      "description": {{ product.description | strip_html | truncate: 500 | json }},
      "url": {{ product_url | json }},
      "image": "https:{{ product.featured_image | image_url: width: 1920 }}",
      "brand": {
        "@type": "Brand",
        "name": {{ product.vendor | json }}
      },
      "category": {{ product.type | json }},
      {%- if current_variant.barcode != blank -%}
      "gtin": {{ current_variant.barcode | json }},
      {%- endif -%}
      {%- if product.metafields.custom.mpn != blank -%}
      "mpn": {{ product.metafields.custom.mpn | json }},
      {%- endif -%}
      "offers": {
        "@type": "Offer",
        "@id": "{{ variant_url }}#offer",
        "url": {{ variant_url | json }},
        "priceCurrency": {{ shop.currency | json }},
        "price": {{ current_variant.price | divided_by: 100.0 | json }},
        "availability": {{ availability | json }},
        "itemCondition": "https://schema.org/NewCondition",
        "seller": {
          "@type": "Organization",
          "name": "RaceSims Solutions Pvt Ltd",
          "url": "https://www.racesims.in",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "No.9A, Second Floor, First Cross Street, Ashok Nagar",
            "addressLocality": "Chennai",
            "addressRegion": "Tamil Nadu",
            "postalCode": "600083",
            "addressCountry": "IN"
          }
        }
      }
    }
    </script>
```

## What changed and why

| Change | Reason |
|--------|--------|
| Replaced `{{ product | structured_data }}` with custom liquid | Shopify's built-in filter omits `condition`, `seller`, and uses `http://schema.org/` — all of which are either required by GMC or contribute to the counterfeit detection signal. |
| Added `itemCondition: NewCondition` | GMC requires `condition` for Shopping Ads. Without it, items may be disapproved or filtered out. |
| Added `seller` with `PostalAddress` | Tells Google exactly who is selling — critical for authorized reseller verification. Counterfeit detection checks seller identity. |
| `@id` now absolute URL | Relative `@id` (e.g. `/products/x#product`) breaks JSON-LD entity linking. Must be a full URL. |
| Fixed `https://schema.org/` | The built-in filter uses `http://schema.org/` — the trailing slash-less http version is deprecated in the structured data spec. |
| GTIN from `variant.barcode` | If you add EAN barcodes to products (from suppliers), they auto-populate into the schema — helps Google verify product authenticity. |
| MPN from `custom.mpn` metafield | Add via Shopify Admin → Products → Metafields once you have MPN codes from Conspit/VNM. |

## Next step: add GTINs and MPNs

Once you have barcode/GTIN codes from Conspit and VNM:

1. **Barcode field**: Shopify Admin → Products → [product] → Variants → Barcode. Paste the EAN/UPC.
   - The Product schema will automatically include `"gtin"` once this is populated.

2. **MPN metafield**: Shopify Admin → Settings → Custom data → Products → Add definition
   - Namespace: `custom`, Key: `mpn`, Type: Single line text
   - Then fill in MPNs per product (e.g. "310-APEX" for Conspit 310 Apex)
