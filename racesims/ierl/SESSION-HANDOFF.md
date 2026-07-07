# IERL July 2026 — Session Handoff

_Last updated: 2026-07-07_

## Context
Working on the **Indian Esports Racing League (IERL)** — a monthly sim-racing hot-lap league across the RaceSims partner network, launching July 2026. Prize pool funded by per-pod fees from partner centres; sim-to-reality vision (winners eventually drive a real race car via ARKA Motorsports).

- Repo: `mindwiseai/Thambu-HQ`
- Deck: `racesims/marketing/decks/ierl-july-2026.html`
- Wiki: `wiki/` (see `wiki/concepts/ierl-prize-pool-formula.md`)

## Confirmed data (source of truth)

### July 2026 — live roster (6 centres, 24 pods)
| Centre | City | Pods |
|---|---|---|
| Racing Point Esports (Uday) | Hyderabad | 10* |
| Sim Racing Adda | Delhi | 4 |
| Niyusuki Sim Racers | Cochin | 3 |
| Lights Out Racing | Delhi | 3 |
| BBS Adrenaline Apex | Mangalore | 2 |
| Virtual Adda | Mumbai | 2 |

### Upcoming pipeline (Aug/Sep, month TBD, +21 pods)
| Centre | Pods |
|---|---|
| RaceSims Studio | 8 |
| Garvish | 7 |
| Drivextreme (Raghav, Coimbatore) | 3 |
| Davlish | 3 |

If all onboard → **10 centres / 45 pods**.

## Prize pool formula
₹1,00,000 ÷ total pods = per-pod fee (pool fixed at ₹1L; per-pod cost drops as network grows). Split: **Amateur 40% / Pro 60%**. Settlement is Splitwise-style — league never holds money; each centre makes 1–2 direct UPI transfers to winners.

## ⚠️ TWO UNRESOLVED DECISIONS (blocking deck regeneration)
1. **RPE pod count** — wiki/deck say **10**; earlier in chat Uday was stated as **8**. Not resolved.
2. **Pool size** — wiki says **₹1,00,000**; a **₹50,000** variant (22 pods, no local prizes, 2-transfer settlement) was explored but never confirmed.

_The `10*` above and the ₹1L formula are what is currently written in the wiki — pending confirmation._

## Done this session
- Wiki updated + pushed to `main`: added Upcoming centres to `ierl-prize-pool-formula.md`; created entity pages `drivextreme.md`, `garvish.md`, `davlish.md`; logged the ingest.
- Compressed `wiki/hot.md` from ~4,700 → 440 words (dropped Command Center polling noise).
- Generated two PDFs (local `/tmp`, not committed): prize/settlement one-pager and logo design brief.
- IERL logo design brief drafted (minimal, modern, Ashoka Chakra wheel direction + Indian flag accents).

## Open follow-ups (parked)
- Deck still shows old numbers (₹4,200/pod, ₹1L, 24 pods) — regenerate once the two decisions above are locked.
- IERL logo: send brief to designer (preferred direction = minimal Chakra wheel).
- Kiosk: Cloudflare Pages deploy (Wrangler login), D1 migration 0003, real server IPs in `kiosk.ts`.
- IERL social media management — owner still unassigned.
