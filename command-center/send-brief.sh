#!/bin/bash
# Thambu's Command Center — Daily Brief Sender
# Usage: send-brief.sh [morning|evening]

BRIEF_TYPE="${1:-morning}"
BOT_TOKEN="${DISCORD_CC_BOT_TOKEN}"  # Set in environment
DM_CHANNEL="1486988284105326643"
SHEET_ID="1Tbdgnnuc7vbPcDkCGTeY7pJ-0rsF05TQez8p4Q_pxRI"

TODAY=$(TZ='Asia/Kolkata' date '+%Y-%m-%d')
DAY_DISPLAY=$(TZ='Asia/Kolkata' date '+%A, %B %d, %Y')

# Fetch tasks CSV from Google Sheets
TASKS=$(curl -sL "https://docs.google.com/spreadsheets/d/$SHEET_ID/gviz/tq?tqx=out:csv&sheet=Tasks")
EVENTS=$(curl -sL "https://docs.google.com/spreadsheets/d/$SHEET_ID/gviz/tq?tqx=out:csv&sheet=Events")
METRICS=$(curl -sL "https://docs.google.com/spreadsheets/d/$SHEET_ID/gviz/tq?tqx=out:csv&sheet=Metrics")

# Parse critical tasks (not done)
CRITICAL=$(echo "$TASKS" | grep -i '"critical"' | grep -iv '"done"' | head -6 | while IFS=, read -r id title desc proj cat pri status date today_flag; do
  title=$(echo "$title" | tr -d '"')
  proj=$(echo "$proj" | tr -d '"')
  [ "$proj" = "mindwise" ] && tag="MW" || tag="RS"
  echo "• [$tag] $title"
done)

HIGH=$(echo "$TASKS" | grep -i '"high"' | grep -iv '"done"' | head -6 | while IFS=, read -r id title desc proj cat pri status date today_flag; do
  title=$(echo "$title" | tr -d '"')
  proj=$(echo "$proj" | tr -d '"')
  [ "$proj" = "mindwise" ] && tag="MW" || tag="RS"
  echo "• [$tag] $title"
done)

# Parse events
UPCOMING_EV=$(echo "$EVENTS" | tail -n +2 | while IFS=, read -r id name proj desc date; do
  name=$(echo "$name" | tr -d '"')
  date=$(echo "$date" | tr -d '"')
  [ -n "$date" ] && echo "• $date — $name"
done)

# Parse metrics
IG=$(echo "$METRICS" | grep '"ig"' | head -1 | cut -d, -f2 | tr -d '"')
YT=$(echo "$METRICS" | grep '"yt"' | head -1 | cut -d, -f2 | tr -d '"')
MW_LAUNCH=$(echo "$METRICS" | grep '"mw_launch"' | head -1 | cut -d, -f2 | tr -d '"')

# Calculate MW days
if [ -n "$MW_LAUNCH" ]; then
  MW_SEC=$(date -jf '%Y-%m-%d' "$MW_LAUNCH" '+%s' 2>/dev/null || date -d "$MW_LAUNCH" '+%s' 2>/dev/null)
  NOW_SEC=$(date '+%s')
  MW_DAYS=$(( (MW_SEC - NOW_SEC) / 86400 ))
else
  MW_DAYS="?"
fi

# Build message
if [ "$BRIEF_TYPE" = "morning" ]; then
  EMOJI="☀️"
  GREETING="MORNING BRIEF"
  NEXT="Tonight 8:00 PM IST"
else
  EMOJI="🌙"
  GREETING="EVENING BRIEF"
  NEXT="Tomorrow 8:00 AM IST"
fi

MSG="${EMOJI} **${GREETING} — Thambu's Command Center**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📅 **${DAY_DISPLAY}**

🔴 **CRITICAL:**
${CRITICAL:-• No critical tasks}

🟡 **HIGH PRIORITY:**
${HIGH:-• No high priority tasks}

📅 **UPCOMING:**
${UPCOMING_EV:-• No upcoming events}

📊 **Snapshot:** IG ${IG:-?} | YT ${YT:-?} | MW Launch ${MW_DAYS} days

🔗 **Dashboard:** https://mindwiseai.github.io/Thambu-HQ/
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*Next brief: ${NEXT}*"

# Send via Discord API
PAYLOAD=$(printf '%s' "$MSG" | python3 -c "import sys,json;print(json.dumps({'content':sys.stdin.read()}))" 2>/dev/null || printf '{"content":"%s"}' "$(echo "$MSG" | sed 's/"/\\"/g' | tr '\n' ' ')")

curl -s -X POST "https://discord.com/api/v10/channels/$DM_CHANNEL/messages" \
  -H "Authorization: Bot $BOT_TOKEN" \
  -H "Content-Type: application/json" \
  -d "$PAYLOAD" > /dev/null 2>&1 && echo "Brief sent!" || echo "Failed to send"
