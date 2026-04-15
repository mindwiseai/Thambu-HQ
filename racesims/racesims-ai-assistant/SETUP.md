# RaceSims AI Assistant — Setup Guide

## Once Meta Business Verification is approved:

### 1. Create a new Meta Developer App
- Go to developers.facebook.com → My Apps → Create App
- Use case: select one that includes **WhatsApp**
- App type: **Business**
- Name: `RaceSims AI Assistant`
- Link to your verified Meta Business Account

### 2. Add WhatsApp product
- Dashboard → Add Product → WhatsApp → Set up
- Add your phone number: +91 7358229224
- Go to WhatsApp → API Setup → copy your **access token**

### 3. Update credentials
Edit the `.env` file in this directory:
```
META_APP_ID=<your new app ID>
META_APP_SECRET=<your new app secret>
WHATSAPP_PHONE_NUMBER_ID=<your phone number ID>
WHATSAPP_ACCESS_TOKEN=<your access token>
```

### 4. Start the bot
```bash
bash start.sh
```
This starts the bot + Cloudflare tunnel. Note the tunnel URL.

### 5. Set webhook in Meta dashboard
- WhatsApp → Configuration → Webhook
- Callback URL: `<tunnel URL>/webhook`
- Verify token: `racesims_webhook_2026`
- Subscribe to: `messages`

### 6. Switch app to Live mode
- Toggle "Development" → "Live" at the top of the dashboard

### 7. Test
Send a WhatsApp message to 7358229224 from any phone.

---

## Daily operations

| Action | Command |
|---|---|
| Start everything | `bash start.sh` |
| View dashboard | Open http://localhost:3000 |
| Check bot logs | `npx pm2 logs racesims-ai` |
| Stop bot | `npx pm2 stop racesims-ai && pkill -f cloudflared` |
| Restart bot | `npx pm2 restart racesims-ai` |

## Escalation flow
1. Bot detects buying signal / B2B inquiry / frustration
2. Bot tells customer "connecting you with our founder"
3. You get iMessage alert on your phone
4. Dashboard shows 🔴 escalation
5. Open WhatsApp/Instagram on your phone → type to take over
6. Bot auto-pauses for that conversation
7. Click "Resume Bot" in dashboard when done

## Costs
- Anthropic API: ~₹1,000-1,500/mo (500 conversations)
- WhatsApp: Free first 1,000 conversations/mo
- Instagram: Free
- Everything else: Free

## Files
- `knowledge/system-prompt.md` — Edit the bot's personality
- `knowledge/products.json` — Product catalog (105 components)
- `knowledge/faq.json` — FAQ answers
- `.env` — Credentials (never commit!)
- `data/racesims-ai.db` — SQLite database with all conversations
