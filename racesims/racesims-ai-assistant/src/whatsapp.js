import fetch from 'node-fetch';

const GRAPH_API = 'https://graph.facebook.com/v21.0';

export async function sendWhatsAppMessage(to, text) {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const token = process.env.WHATSAPP_ACCESS_TOKEN;

  const url = `${GRAPH_API}/${phoneNumberId}/messages`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: to,
      type: 'text',
      text: { body: text }
    })
  });

  const data = await response.json();

  if (data.error) {
    console.error('[WhatsApp] Send error:', data.error);
    throw new Error(data.error.message);
  }

  console.log(`[WhatsApp] Sent message to ${to}: ${text.substring(0, 50)}...`);
  return data;
}

export async function markAsRead(messageId) {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const token = process.env.WHATSAPP_ACCESS_TOKEN;

  try {
    await fetch(`${GRAPH_API}/${phoneNumberId}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        status: 'read',
        message_id: messageId
      })
    });
  } catch (e) {
    console.warn('[WhatsApp] Failed to mark as read:', e.message);
  }
}

export function parseWebhookMessage(body) {
  try {
    const entry = body.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;

    if (!value?.messages?.[0]) return null;

    const message = value.messages[0];
    const contact = value.contacts?.[0];

    return {
      messageId: message.id,
      from: message.from,
      timestamp: message.timestamp,
      type: message.type,
      text: message.text?.body || '',
      contactName: contact?.profile?.name || '',
      phoneNumberId: value.metadata?.phone_number_id
    };
  } catch (e) {
    console.warn('[WhatsApp] Failed to parse webhook:', e.message);
    return null;
  }
}

// Detect if a message was sent by the business (Thambu taking over)
export function isBusinessReply(body) {
  try {
    const entry = body.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;

    // Check for status updates (sent by business)
    if (value?.statuses) return true;

    // Messages from the business number itself
    const message = value?.messages?.[0];
    if (message && message.from === process.env.WHATSAPP_PHONE_NUMBER_ID) return true;

    return false;
  } catch (e) {
    return false;
  }
}
