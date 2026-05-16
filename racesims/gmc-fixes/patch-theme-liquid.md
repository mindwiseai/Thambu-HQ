# Patch: layout/theme.liquid — Organization Schema Fix

## File to edit
`layout/theme.liquid`

## What to find (Ctrl+F this exact string)
```
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "RaceSims solutions Pvt Ltd",
```

## Replace the ENTIRE Organization script block with this

Find this block (from `<script type="application/ld+json">` to the closing `</script>` before the BreadcrumbList section):

```
    <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "RaceSims solutions Pvt Ltd",
  "url": "https://www.racesims.in",
  "logo": "https://www.racesims.in/cdn/shop/files/racesims-logo.png",
  "description": "Race Sims is India's professional destination for sim racing hardware, offering competition-grade equipment, authorized brand support, and simulator integration services for home and commercial installations.",
  "areaServed": {
    "@type": "Country",
    "name": "India"
  },
  "knowsAbout": [
    "Sim racing hardware",
    "Direct drive wheelbases",
    "Sim racing pedals",
    "Motion simulator systems",
    "Commercial racing simulators",
    "Driver training simulators"
  ],
  "makesOffer": {
    "@type": "OfferCatalog",
    "name": "Sim Racing Hardware & Simulator Solutions",
    "itemListElement": [
      {
        "@type": "Brand",
        "name": "Conspit",
        "url": "https://www.racesims.in/pages/conspit"
      },
      {
        "@type": "Brand",
        "name": "VNM Simulation",
        "url": "https://www.racesims.in/pages/vnm"
      }
    ]
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Sales & Technical Support",
    "email": "thambu@racesims.in",
    "telephone": "+91-7358229224",
    "areaServed": "IN",
    "availableLanguage": "English"
  }
}
</script>
```

Replace it with:

```
    <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "RaceSims Solutions Pvt Ltd",
  "legalName": "Racesims Solutions Private Limited",
  "url": "https://www.racesims.in",
  "logo": "https://www.racesims.in/cdn/shop/files/racesims-logo.png",
  "description": "RaceSims is India's professional destination for sim racing hardware, offering competition-grade equipment, authorized brand support, and simulator integration services for home and commercial installations.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "No.9A, Second Floor, First Cross Street, Ashok Nagar",
    "addressLocality": "Chennai",
    "addressRegion": "Tamil Nadu",
    "postalCode": "600083",
    "addressCountry": "IN"
  },
  "areaServed": {
    "@type": "Country",
    "name": "India"
  },
  "knowsAbout": [
    "Sim racing hardware",
    "Direct drive wheelbases",
    "Sim racing pedals",
    "Motion simulator systems",
    "Commercial racing simulators",
    "Driver training simulators"
  ],
  "makesOffer": {
    "@type": "OfferCatalog",
    "name": "Sim Racing Hardware & Simulator Solutions",
    "itemListElement": [
      {
        "@type": "Brand",
        "name": "Conspit",
        "url": "https://www.racesims.in/pages/conspit"
      },
      {
        "@type": "Brand",
        "name": "VNM Simulation",
        "url": "https://www.racesims.in/pages/vnm"
      },
      {
        "@type": "Brand",
        "name": "Simagic",
        "url": "https://www.racesims.in/collections/simagic"
      }
    ]
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Sales & Technical Support",
    "email": "thambu@racesims.in",
    "telephone": "+91-7358229224",
    "areaServed": "IN",
    "availableLanguage": "English"
  }
}
</script>
```

## What changed and why

| Change | Reason |
|--------|--------|
| Added `address` (PostalAddress) | GMC requires a verifiable business address to confirm the seller is a real registered entity. Without it, Google cannot verify legitimacy → counterfeit flag risk. |
| Added `legalName` | Distinguishes the trading name ("RaceSims Solutions Pvt Ltd") from the legal entity name — helps Google's entity resolution. |
| Fixed description "Race Sims" → "RaceSims" | Brand name inconsistency confuses Google's entity recognition across pages. |
| Added Simagic to `makesOffer` | Simagic products are live on the site; schema should reflect all brands sold. |
