#!/bin/bash
# RaceSims AI Assistant — Start Script
# PM2 manages BOTH the bot and the Cloudflare tunnel now.

DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$DIR"

echo "============================================"
echo "  🏎️  RaceSims AI Assistant — Starting..."
echo "============================================"

# Kill any stray cloudflared/node processes that aren't under PM2
pkill -f "node src/index.js" 2>/dev/null
pkill -f "cloudflared tunnel --url http://localhost:3000" 2>/dev/null
sleep 1

# Start (or reload) everything via PM2
echo "[1/3] Starting bot + tunnel with PM2..."
npx pm2 start ecosystem.config.cjs --update-env 2>/dev/null || npx pm2 restart ecosystem.config.cjs --update-env
sleep 3

# Check bot health
if curl -s http://localhost:3000/health > /dev/null 2>&1; then
  echo "  ✅ Bot is healthy at http://localhost:3000"
else
  echo "  ⚠️  Bot may still be starting..."
fi

# Wait for tunnel URL to appear in the tunnel log
echo "[2/3] Waiting for Cloudflare tunnel URL..."
TUNNEL_LOG="$DIR/data/tunnel.log"
TUNNEL_URL=""
for i in 1 2 3 4 5 6 7 8 9 10; do
  sleep 1
  TUNNEL_URL=$(grep -oE 'https://[a-z0-9-]+\.trycloudflare\.com' "$TUNNEL_LOG" 2>/dev/null | tail -1)
  if [ -n "$TUNNEL_URL" ]; then break; fi
done

if [ -n "$TUNNEL_URL" ]; then
  echo "  ✅ Tunnel active: $TUNNEL_URL"
  echo ""
  echo "============================================"
  echo "  🟢 ALL SYSTEMS GO"
  echo ""
  echo "  Dashboard:  http://localhost:3000"
  echo "  Webhook:    $TUNNEL_URL/webhook"
  echo "  Health:     $TUNNEL_URL/health"
  echo ""
  echo "  Set this as your Meta webhook URL:"
  echo "  $TUNNEL_URL/webhook"
  echo "  Verify token: racesims_webhook_2026"
  echo "============================================"
else
  echo "  ⚠️  Tunnel may still be connecting..."
  echo "  Check: tail -f $TUNNEL_LOG"
fi

echo ""
echo "[3/3] Saving PM2 state for reboot..."
npx pm2 save 2>/dev/null
echo "  ✅ PM2 state saved"
echo ""
echo "To check logs:   npx pm2 logs racesims-ai    (or racesims-tunnel)"
echo "To stop:         npx pm2 stop ecosystem.config.cjs"
echo "To restart:      bash start.sh"
