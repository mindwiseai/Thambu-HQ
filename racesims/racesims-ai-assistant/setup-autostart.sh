#!/bin/bash
# Set up RaceSims AI Assistant to auto-start on Mac login
# Run this once: bash setup-autostart.sh

DIR="$(cd "$(dirname "$0")" && pwd)"
PLIST_NAME="com.racesims.ai-assistant"
PLIST_PATH="$HOME/Library/LaunchAgents/${PLIST_NAME}.plist"

echo "Setting up auto-start for RaceSims AI Assistant..."

cat > "$PLIST_PATH" << EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>${PLIST_NAME}</string>
    <key>ProgramArguments</key>
    <array>
        <string>/usr/local/bin/node</string>
        <string>${DIR}/src/index.js</string>
    </array>
    <key>WorkingDirectory</key>
    <string>${DIR}</string>
    <key>EnvironmentVariables</key>
    <dict>
        <key>PATH</key>
        <string>/usr/local/bin:/usr/bin:/bin</string>
        <key>NODE_ENV</key>
        <string>production</string>
    </dict>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
    <key>StandardOutPath</key>
    <string>${DIR}/data/launchd-out.log</string>
    <key>StandardErrorPath</key>
    <string>${DIR}/data/launchd-err.log</string>
    <key>ThrottleInterval</key>
    <integer>10</integer>
</dict>
</plist>
EOF

echo "  ✅ LaunchAgent created at: $PLIST_PATH"
echo ""
echo "To enable auto-start:"
echo "  launchctl load $PLIST_PATH"
echo ""
echo "To disable auto-start:"
echo "  launchctl unload $PLIST_PATH"
echo ""
echo "Note: You also need to run the Cloudflare tunnel separately."
echo "Consider adding the tunnel to a separate LaunchAgent or to start.sh"
