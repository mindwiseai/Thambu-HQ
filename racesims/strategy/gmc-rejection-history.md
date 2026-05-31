# Google Merchant Center — Rejection History (RaceSims)

**Compiled:** 2026-05-07
**Source:** Forwarded emails from `info@racesims.in` to `mindwise.ai1@gmail.com`, May 7 2026 (originals from Apr–May 2025)
**GMC account name:** "race sims"
**GMC Merchant Center ID:** `5496001964`

## Summary

Two prior policy violations on the GMC account, both raised April 2025, both cleared after corrective action. Current "one shot left" status reflects the third strike threshold rather than an active fresh suspension visible in this mailbox.

## Violation 1 — Misrepresentation (active 6–8 Apr 2025)

- **Ticket ID:** `1-4103000038542`
- **Source:** `shopping-support@google.com` (Shiela, gTech Customer Experience), 6 Apr 2025
- **Policy cited:** Misrepresentation — Shopping ads + Free listings
  - Policy URLs: `support.google.com/merchants/answer/6150127`, `support.google.com/merchants/answer/12079606`
- **Verbatim issue statement (paraphrased to fit copyright):** Google's misrepresentation policy requires merchants to be upfront, honest, and to give shoppers the information they need to make informed decisions; the account was disapproved for non-compliance.
- **Specific factor:** Google support explicitly stated they cannot pinpoint the trigger ("complexity and confidentiality of our machine learning classifier").
- **Remediation prescribed by Google:**
  - Review account + online store against the policy
  - Provide additional info to verify business
  - For non-EU merchants: complete identity verification if prompted before requesting re-review
- **Status:** Cleared after corrective action (no follow-up rejection in the mailbox).

## Violation 2 — Counterfeit product (active 7 Apr – 7 May 2025)

- **Source:** `shopping-noreply@google.com` (initial suspension, 7 Apr 2025) + `googlebase-noreply@google.com` (review-completed notice, 7 May 2025)
- **Policy cited:** Suspended account due to policy violation — counterfeit product
  - Policy URL: `support.google.com/merchants/answer/6149993`
- **Verbatim issue statement (paraphrased to fit copyright):** GMC review concluded the account was in violation of the Counterfeit Product policy.
- **Status (7 May 2025):** Clearance email confirmed the issue no longer appears in the Merchant Center account.

## What this means for the third / final attempt

**Both policies that triggered the prior rejections must be hard-defended in the upcoming appeal:**

### Misrepresentation defence checklist
- One canonical brand name everywhere: `RaceSims` (one word). Legal entity: `RaceSims Solutions Pvt Ltd`.
- Single Organization JSON-LD per page. No conflicting alt names.
- Visible legal identifiers: GSTIN `33AAOCR6378K1ZO`, CIN (lookup), PAN `AAOCR6378K`.
- DPDP-compliant privacy policy with Grievance Officer named.
- Footer / contact / About / policies all reference identical company info.
- Google Business Profile claimed and matching website NAP.
- All "Authorized" / "Official" claims softened unless backed by written proof (see counterfeit defence below — same evidence serves both).
- Identity verification in GMC complete (non-EU merchants).

### Counterfeit defence checklist
- **This is the harder bar.** Counterfeit suspensions hit when GMC's classifier flags branded items being sold without proof of authorization or in suspicious price/condition patterns.
- **Required evidence:**
  - Conspit Instagram acknowledgement (post + screenshot + permalink) — already on hand per user.
  - Conspit formal authorization letter — user pursuing.
  - VNM formal authorization letter — user pursuing.
  - Simagic distributor agreement — on file (contract expiring May 2026; reference it before expiry).
  - For Moza, Asetek, any other branded SKUs: only sell where we hold proof; otherwise archive or relabel as "Indian sourcing on request" without using brand-claim language in product titles or descriptions.
- **Public surface:** `/pages/authorizations` listing each partner with the proof reference (don't post letters publicly — summarise + IG post link is sufficient).
- **Per-product:** any "Authorized" / "Official" badge or copy on a SKU must trace to a partner with documented proof. Otherwise remove.
- **GMC feed hygiene:**
  - Brand attribute matches actual brand (don't put "RaceSims" as Brand on a Conspit-manufactured wheel).
  - GTIN/MPN populated for branded items (helps GMC verify against the brand's catalog).
  - Condition = `new` only.
  - Availability accurate.

## Action items derived from this history

1. **Phase 1A:** brand-name lockdown + single Organization JSON-LD with identifiers (kills misrepresentation factor).
2. **Phase 1D:** authorization proofs (kills counterfeit factor).
3. **Phase 1C:** GMC feed brand/GTIN/MPN audit (counterfeit hygiene).
4. **Phase 1E:** DPDP privacy + GBP claim + identity verification in GMC (misrepresentation trust signals).
5. **Phase 2.5 appeal narrative:** explicitly reference ticket `1-4103000038542` (misrepresentation) and the counterfeit suspension policy URL, pair each with the evidence we now have. Treat the appeal as a structured response to both prior rejections, not a generic re-submission.

## Open questions (need user / live admin check)

- Is there a current active suspension on the GMC account today, or are we proactively hardening before re-submission? (Diagnostics page will tell us — check before Phase 2.5.)
- Has identity verification been completed in Merchant Center? (If not, do it as part of Phase 1E.)
- Conspit IG post URL + screenshot — file path TBD.
- VNM written acknowledgement status — TBD (Track B).

## Connections (wiki)

- `wiki/sources/2026-05-07-gmc-rejection-history.md` (to be created)
- `wiki/concepts/seo-technical-fixes.md`
- `wiki/concepts/brand-name-consistency-issue.md`
- `wiki/entities/racesims-company.md` (legal identifiers source of truth)
