---
title: Security Flags — Sensitive Data in Raw Sources
type: meta
domain: mindwise
ingested: 2026-05-11
---

# Security Flags — Sensitive Data Documented

Raw source layer contains credentials and secrets that are already in `.gitignore` but require attention and verification. All flagged items are committed to `.gitignore` and will NOT appear in git history.

## HIGH PRIORITY — API Credentials

**Razorpay API Keys**
- Location: `raw/mindwise/Sales channels/Website/rzp-2.csv`
- Type: Live API credentials (secret key, key ID)
- Status: In `.gitignore` (verified)
- Action required: Rotate credentials if this file was ever staged or if developer access was changed since creation
- Context: Used for payment processing on website integration. Exported CSV may have been handled by multiple team members.

## MEDIUM PRIORITY — 2FA Backup Codes

**RaceSims 2FA Backup Codes**
- Location: `raw/racesims/01_Company/Security/` directory (exact filename redacted)
- Type: Backup authentication codes (account recovery)
- Status: In `.gitignore` (verified)
- Action required: Verify that 2FA seeds on accounts (Gmail, GitHub, Razorpay, Linear, Stripe, AWS if used) are not compromised. If any developer has left the team, rotate secrets immediately.

**Mindwise 2FA Backup Codes**
- Location: Similar structure under mindwise raw folder
- Type: Backup authentication codes
- Status: In `.gitignore` (verified)
- Action required: Same as RaceSims — verify account security post-ingest

## Verification Checklist

- [ ] Razorpay credentials rotated (if ever exposed)
- [ ] 2FA seeds verified on all accounts
- [ ] No credentials in any committed wiki pages
- [ ] `.gitignore` is current and comprehensive
- [ ] Audit git log for any accidental commits of raw/Security/ files

## Policy

- Credentials are NEVER ingested into wiki pages or comments
- Raw source files with secrets must be moved to `.gitignore` immediately upon discovery
- All team members must use 1Password / LastPass / similar for shared secrets, never CSV files
- New ingest operations must scan for `*.key`, `*secret*`, `*credentials*`, `*2fa*`, `*backup*` before committing

Source: [[2026-04-13-mindwise-raw-dump]]
