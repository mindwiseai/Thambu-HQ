---
title: RaceSims Discord Bot
type: concept
domain: racesims
status: BUILT (not yet deployed)
tags: [bot, discord, ops]
---

# RaceSims Discord Bot

Node.js Discord bot at [racesims/racesims-bot/](../../racesims/racesims-bot/). Already built. Waiting on a Discord server to run on (see [[discord-community-gap]] and [[discord-server-setup-kit]]).

## What it does
(needs ingestion of bot.js + package.json on next pass to be more specific)

Likely capabilities:
- Slash commands for community races / events
- Member onboarding
- Possibly product / inventory queries
- Possibly voice brief integration (this is how [[thambu]] sends voice updates per the project's standing pattern)

## Status
- ✅ Code written (bot.js, package.json, package-lock.json)
- ✅ Launch script (start-racesims-bot.command)
- ❌ Not yet running on a live server
- ⏳ Waiting on: [[discord-server-setup-kit|server creation]]

## Open
- Ingest `racesims/racesims-bot/bot.js` to capture exact capabilities
- Confirm if voice-brief ingestion is one of the existing features (this would be a nice loop with the wiki's `voice-briefs/` folder)

## Connections
- [[discord-server-setup-kit]]
- [[discord-community-gap]]
