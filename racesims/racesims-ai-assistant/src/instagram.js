import fetch from 'node-fetch';

const GRAPH_API = 'https://graph.facebook.com/v21.0';

export async function sendInstagramMessage(recipientId, text) {
  const pageId = process.env.INSTAGRAM_PAGE_ID;
  const token = process.env.INSTAGRAM_ACCESS_TOKEN || process.env.WHATSAPP_ACCESS_TOKEN;

  const url = `${GRAPH_API}/${pageId}/messages`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      recipient: { id: recipientId },
      message: { text: text }
    })
  });

  const data = await response.json();

  if (data.error) {
    console.error('[Instagram] Send error:', data.error);
    throw new Error(data.error.message);
  }

  console.log(`[Instagram] Sent message to ${recipientId}: ${text.substring(0, 50)}...`);
  return data;
}

export function parseInstagramWebhook(body) {
  try {
    const entry = body.entry?.[0];

    // Instagram messaging webhook
    const messaging = entry?.messaging?.[0];
    if (!messaging) return null;

    // Skip echo messages (sent by us)
    if (messaging.message?.is_echo) return null;

    return {
      messageId: messaging.message?.mid,
      senderId: messaging.sender?.id,
      recipientId: messaging.recipient?.id,
      timestamp: messaging.timestamp,
      text: messaging.message?.text || '',
      type: 'text',
      channel: 'instagram'
    };
  } catch (e) {
    console.warn('[Instagram] Failed to parse webhook:', e.message);
    return null;
  }
}
