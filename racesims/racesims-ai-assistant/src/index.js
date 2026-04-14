import 'dotenv/config';
import express from 'express';
import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import { getDB, findOrCreateContact, addMessage, getConversationHistory, updateContact,
         getDashboardStats, getActiveConversations, getPendingEscalations,
         resolveEscalation } from './database.js';
import { initAI, generateResponse } from './ai.js';
import { sendWhatsAppMessage, parseWebhookMessage, markAsRead, isBusinessReply } from './whatsapp.js';
import { sendInstagramMessage, parseInstagramWebhook } from './instagram.js';
import { processLeadIntelligence, triggerEscalation, getEscalationMessage, setNotifyCallback, sendIMessageAlert } from './escalation.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

// Track connected dashboard clients
const dashboardClients = new Set();

// Middleware
app.use(express.json());
app.use(express.static(join(__dirname, '..', 'dashboard')));

// --- WebSocket for live dashboard updates ---
wss.on('connection', (ws) => {
  dashboardClients.add(ws);
  console.log('[Dashboard] Client connected');

  ws.on('close', () => {
    dashboardClients.delete(ws);
    console.log('[Dashboard] Client disconnected');
  });
});

function broadcastDashboard(event, data) {
  const payload = JSON.stringify({ event, data, timestamp: new Date().toISOString() });
  for (const client of dashboardClients) {
    if (client.readyState === 1) {
      client.send(payload);
    }
  }
}

// --- WhatsApp Webhook Verification ---
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    console.log('[Webhook] Verified successfully');
    return res.status(200).send(challenge);
  }

  console.warn('[Webhook] Verification failed');
  return res.sendStatus(403);
});

// --- WhatsApp + Instagram Webhook Handler ---
app.post('/webhook', async (req, res) => {
  // Always respond 200 quickly to Meta
  res.sendStatus(200);

  try {
    const body = req.body;

    // Determine channel
    if (body.object === 'whatsapp_business_account') {
      await handleWhatsAppMessage(body);
    } else if (body.object === 'instagram') {
      await handleInstagramMessage(body);
    } else if (body.object === 'page') {
      // Facebook page webhook (also used for Instagram)
      await handleInstagramMessage(body);
    }
  } catch (error) {
    console.error('[Webhook] Error processing message:', error);
  }
});

// --- WhatsApp Message Handler ---
async function handleWhatsAppMessage(body) {
  // Skip business replies (Thambu typing directly)
  if (isBusinessReply(body)) {
    // Detect takeover — pause the bot for this contact
    console.log('[WhatsApp] Business reply detected — checking for takeover');
    return;
  }

  const parsed = parseWebhookMessage(body);
  if (!parsed || !parsed.text) return;

  console.log(`\n[WhatsApp] Message from ${parsed.contactName || parsed.from}: ${parsed.text}`);

  // Mark as read
  await markAsRead(parsed.messageId);

  // Find or create contact
  const contact = findOrCreateContact(parsed.from, 'whatsapp');

  // Update name if we have it
  if (parsed.contactName && !contact.name) {
    updateContact(contact.id, { name: parsed.contactName });
    contact.name = parsed.contactName;
  }

  // Check if conversation is paused (human took over)
  if (contact.is_paused) {
    console.log(`[WhatsApp] Conversation paused for ${parsed.from} — skipping AI response`);
    // Still log the message
    addMessage(contact.id, 'customer', parsed.text, 'whatsapp', parsed.messageId);
    broadcastDashboard('new_message', { contactId: contact.id, role: 'customer', content: parsed.text });
    return;
  }

  // Save customer message
  addMessage(contact.id, 'customer', parsed.text, 'whatsapp', parsed.messageId);

  // Get conversation history
  const history = getConversationHistory(contact.id, 20);

  // Generate AI response
  const aiResult = await generateResponse(history, contact);

  // Process lead intelligence
  const { escalationNeeded, reason } = await processLeadIntelligence(contact, aiResult.intelligence);

  if (escalationNeeded) {
    // Send escalation message to customer
    const escMsg = getEscalationMessage(reason);
    const fullResponse = aiResult.response + '\n\n' + escMsg;
    await sendWhatsAppMessage(parsed.from, fullResponse);
    addMessage(contact.id, 'assistant', fullResponse, 'whatsapp');

    // Trigger escalation
    const updatedContact = findOrCreateContact(parsed.from, 'whatsapp');
    await triggerEscalation(updatedContact, reason, parsed.text);

    broadcastDashboard('escalation', { contactId: contact.id, reason });
  } else {
    // Send normal AI response
    await sendWhatsAppMessage(parsed.from, aiResult.response);
    addMessage(contact.id, 'assistant', aiResult.response, 'whatsapp');
  }

  // Broadcast to dashboard
  broadcastDashboard('new_message', {
    contactId: contact.id,
    role: 'assistant',
    content: aiResult.response,
    usage: aiResult.usage
  });

  console.log(`[AI] Tokens: ${aiResult.usage.input_tokens} in / ${aiResult.usage.output_tokens} out`);
}

// --- Instagram Message Handler ---
async function handleInstagramMessage(body) {
  const parsed = parseInstagramWebhook(body);
  if (!parsed || !parsed.text) return;

  console.log(`\n[Instagram] Message from ${parsed.senderId}: ${parsed.text}`);

  // Find or create contact
  const contact = findOrCreateContact(null, 'instagram', parsed.senderId);

  // Check if paused
  if (contact.is_paused) {
    addMessage(contact.id, 'customer', parsed.text, 'instagram', parsed.messageId);
    broadcastDashboard('new_message', { contactId: contact.id, role: 'customer', content: parsed.text });
    return;
  }

  // Save customer message
  addMessage(contact.id, 'customer', parsed.text, 'instagram', parsed.messageId);

  // Get conversation history
  const history = getConversationHistory(contact.id, 20);

  // Generate AI response
  const aiResult = await generateResponse(history, { ...contact, channel: 'instagram' });

  // Process lead intelligence
  const { escalationNeeded, reason } = await processLeadIntelligence(contact, aiResult.intelligence);

  if (escalationNeeded) {
    const escMsg = getEscalationMessage(reason);
    const fullResponse = aiResult.response + '\n\n' + escMsg;
    await sendInstagramMessage(parsed.senderId, fullResponse);
    addMessage(contact.id, 'assistant', fullResponse, 'instagram');

    const updatedContact = findOrCreateContact(null, 'instagram', parsed.senderId);
    await triggerEscalation(updatedContact, reason, parsed.text);

    broadcastDashboard('escalation', { contactId: contact.id, reason });
  } else {
    await sendInstagramMessage(parsed.senderId, aiResult.response);
    addMessage(contact.id, 'assistant', aiResult.response, 'instagram');
  }

  broadcastDashboard('new_message', {
    contactId: contact.id,
    role: 'assistant',
    content: aiResult.response,
    usage: aiResult.usage
  });
}

// --- Dashboard API Routes ---

app.get('/api/stats', (req, res) => {
  res.json(getDashboardStats());
});

app.get('/api/conversations', (req, res) => {
  res.json(getActiveConversations(50));
});

app.get('/api/conversation/:contactId', (req, res) => {
  const history = getConversationHistory(parseInt(req.params.contactId), 100);
  const db = getDB();
  const contact = db.prepare('SELECT * FROM contacts WHERE id = ?').get(parseInt(req.params.contactId));
  res.json({ contact, messages: history });
});

app.get('/api/escalations', (req, res) => {
  res.json(getPendingEscalations());
});

app.post('/api/pause/:contactId', (req, res) => {
  updateContact(parseInt(req.params.contactId), { is_paused: 1 });
  broadcastDashboard('contact_paused', { contactId: parseInt(req.params.contactId) });
  res.json({ success: true, message: 'Bot paused — you can take over in WhatsApp/Instagram' });
});

app.post('/api/resume/:contactId', (req, res) => {
  updateContact(parseInt(req.params.contactId), { is_paused: 0 });
  broadcastDashboard('contact_resumed', { contactId: parseInt(req.params.contactId) });
  res.json({ success: true, message: 'Bot resumed for this conversation' });
});

app.post('/api/resolve-escalation/:id', (req, res) => {
  resolveEscalation(parseInt(req.params.id));
  res.json({ success: true });
});

// --- Health check ---
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// --- Initialize and start ---
async function start() {
  console.log('\n' + '='.repeat(60));
  console.log('  🏎️  RaceSims AI Assistant');
  console.log('  WhatsApp + Instagram + Dashboard');
  console.log('='.repeat(60) + '\n');

  // Init database
  getDB();
  console.log('[DB] SQLite initialized');

  // Init AI
  initAI();

  // Set up escalation notifications — iMessage + desktop notification + dashboard
  setNotifyCallback(async (message) => {
    console.log('[NOTIFY]', message);

    // Send iMessage to Thambu
    await sendIMessageAlert(message);

    // Broadcast to dashboard
    broadcastDashboard('escalation_alert', { message });
  });

  // Start server
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`\n[Server] Dashboard:  http://localhost:${PORT}`);
    console.log(`[Server] Webhook:    http://localhost:${PORT}/webhook`);
    console.log(`[Server] Health:     http://localhost:${PORT}/health`);
    console.log(`\n[Server] Waiting for messages... 🏁\n`);
  });
}

start().catch(console.error);
