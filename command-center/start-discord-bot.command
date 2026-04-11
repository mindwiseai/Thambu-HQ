#!/bin/bash
# Thambu's Command Center — Discord Bot Launcher
# This runs automatically on login

cd /Users/mindwise.ai/Documents/Claude/Projects/Thambu-HQ
export PATH="$HOME/.local/bin:$HOME/.bun/bin:$PATH"

echo "Starting Command Center Discord Bot..."
echo "Keep this window open. Minimize it if needed."
echo ""

claude --channels plugin:discord@claude-plugins-official
