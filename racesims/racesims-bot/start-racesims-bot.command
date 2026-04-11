#!/bin/bash
# RaceSims Discord Bot — Auto-launcher
# Runs automatically on login

cd /Users/mindwise.ai/Documents/Claude/Projects/Racesims/racesims-bot
export PATH="/usr/local/bin:$PATH"

echo "Starting RaceSims Discord Bot..."
echo "Keep this window open. Minimize it if needed."
echo ""

node bot.js
