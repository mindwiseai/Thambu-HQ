---
title: IERL Direct Settlement (Splitwise-style payouts)
type: concept
domain: racesims
tags: [ierl, payments, settlement, trust, splitwise]
---

# IERL Direct Settlement

How [[ierl-indian-esports-racing-league|IERL]] pays winners **without ever pooling money centrally**. Modelled on Splitwise debt-settlement: at month-end the league computes who pays whom and matches each dealer's contribution directly to specific winners, so each dealer makes just **1–2 UPI transfers** straight to the people who won. Decided 2026-06-14 ([[2026-06-14-ierl-july-launch]]).

## Why it exists

Removes the single biggest trust objection in a [[ierl-indian-esports-racing-league|shared league]]: *"everyone contributes but only one party handles the money."* The league **never holds a rupee** — every payout is dealer → winner, peer-to-peer. The full settlement sheet is shared with all partners. Total transparency, no middleman float.

## How it works

1. **Leaderboard locks** (last day). Top 3 per class + prize amounts known.
2. **League runs the settlement** — matches each dealer's monthly contribution against the prize obligations, minimising the number of transfers (Splitwise-style).
3. **Each dealer gets one instruction:** "Pay ₹X to [winner's UPI]." Usually one transfer, occasionally two.
4. **Dealers pay directly by the 5th**, screenshot in the group; league verifies; month closed.

A single prize can be **funded by two dealers**; the winner then receives two transfers while each dealer still sends only one.

## Worked example — July (₹40,000 net pool)

| Dealer (contribution) | Pays | To |
|---|---|---|
| [[sim-racing-adda]] (₹10,000) | ₹10,000 | 🥇 Amateur 1st |
| [[niyusuki-sim-racers]] (₹7,500) | ₹7,500 | 🥇 Pro 1st |
| [[drivextreme]] (₹7,500) | ₹4,500 + ₹3,000 | 🥇 Pro 1st · 🥉 Pro 3rd |
| [[bbs-adrenaline-apex]] (₹5,000) | ₹2,000 + ₹3,000 | 🥇 Amateur 1st · 🥉 Amateur 3rd |
| [[lights-out-racing]] (₹7,500) | ₹5,000 + ₹2,500 | 🥈 Pro 2nd · server cost |
| [[virtual-adda]] (₹5,000) | ₹5,000 | 🥈 Amateur 2nd |

- 🥇 Amateur 1st (₹12,000) = Sim Racing Adda ₹10,000 + BBS ₹2,000 → two dealers fund one prize.
- The ₹2,500 server/tech cost is settled the same way (here, via Lights Out).

## Local prizes are separate

Each centre's **local champion** (₹500 × rigs) is paid by that centre directly to its own fastest driver — one more quick transfer, outside this network settlement.

## Backlinks
- [[ierl-indian-esports-racing-league]]
- [[2026-06-14-ierl-july-launch]]
