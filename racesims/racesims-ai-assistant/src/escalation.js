import { createEscalation, updateContact, addLeadEvent } from './database.js';
import { execFile } from 'child_process';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);

let notifyCallback = null;

export function setNotifyCallback(cb) {
  notifyCallback = cb;
}

// Send iMessage to Thambu's phone via osascript
export async function sendIMessageAlert(message) {
  const phone = process.env.THAMBU_PHONE || '9741788226';
  const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`;

  try {
    const script = `
      tell application "Messages"
        set targetService to 1st account whose service type = iMessage
        set targetBuddy to participant "${formattedPhone}" of targetService
        send "${message.replace(/"/g, '\\"').replace(/\n/g, '\\n')}" to targetBuddy
      end tell
    `;

    await execFileAsync('osascript', ['-e', script]);
    console.log(`[iMessage] Alert sent to ${formattedPhone}`);
    return true;
  } catch (e) {
    console.warn(`[iMessage] Failed to send (${e.message}). Trying notification center...`);

    // Fallback: macOS notification
    try {
      const notifScript = `display notification "${message.replace(/"/g, '\\"').substring(0, 200)}" with title "🔴 RaceSims Lead Alert" sound name "Glass"`;
      await execFileAsync('osascript', ['-e', notifScript]);
      console.log('[Notification] Desktop alert sent');
    } catch (e2) {
      console.error('[Notification] Both iMessage and notification failed:', e2.message);
    }
    return false;
  }
}

export async function processLeadIntelligence(contact, intelligence) {
  if (!intelligence) return { escalationNeeded: false };

  const updates = {};

  // Update contact fields with new info
  if (intelligence.name && !contact.name) updates.name = intelligence.name;
  if (intelligence.budget_range) updates.budget_range = intelligence.budget_range;
  if (intelligence.product_interest) updates.product_interest = intelligence.product_interest;
  if (intelligence.experience_level) updates.experience_level = intelligence.experience_level;
  if (intelligence.city) updates.city = intelligence.city;

  if (Object.keys(updates).length > 0) {
    updateContact(contact.id, updates);
  }

  // Process score adjustments
  if (intelligence.score_adjustments?.length) {
    for (const adj of intelligence.score_adjustments) {
      if (adj.delta !== 0) {
        addLeadEvent(contact.id, adj.event, adj.delta, JSON.stringify(adj));
      }
    }
  }

  // Check escalation
  if (intelligence.escalation_needed) {
    return {
      escalationNeeded: true,
      reason: intelligence.escalation_reason || 'AI detected escalation trigger'
    };
  }

  return { escalationNeeded: false };
}

export async function triggerEscalation(contact, reason, triggerMessage) {
  // Save to database
  createEscalation(contact.id, reason, triggerMessage);

  // Update contact
  updateContact(contact.id, { is_paused: 1 });

  const alertMessage = formatEscalationAlert(contact, reason);

  // Log it
  console.log('\n' + '='.repeat(60));
  console.log('🔴 ESCALATION TRIGGERED');
  console.log(alertMessage);
  console.log('='.repeat(60) + '\n');

  // Notify via callback (iMessage, etc.)
  if (notifyCallback) {
    try {
      await notifyCallback(alertMessage);
    } catch (e) {
      console.error('[Escalation] Notification failed:', e.message);
    }
  }

  return alertMessage;
}

function formatEscalationAlert(contact, reason) {
  const name = contact.name || 'Unknown';
  const phone = contact.phone || 'N/A';
  const channel = contact.channel || 'whatsapp';
  const score = contact.lead_score || 0;
  const product = contact.product_interest || 'Not specified';
  const budget = contact.budget_range || 'Not specified';
  const city = contact.city || '';
  const experience = contact.experience_level || '';

  let alert = `🔴 RaceSims Lead Escalation\n\n`;
  alert += `Customer: ${name}`;
  if (city) alert += ` (${city})`;
  alert += `\n`;

  if (channel === 'whatsapp' && phone !== 'N/A') {
    // Include tappable WhatsApp link so Thambu can message from his personal number
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    alert += `📱 WhatsApp them: https://wa.me/${cleanPhone}\n`;
  } else if (channel === 'instagram') {
    const igId = contact.instagram_id || contact.sender_id || '';
    alert += `📸 Instagram DM (reply from dashboard)\n`;
  }

  alert += `\nLead Score: ${score}/10\n`;
  alert += `Product: ${product}\n`;
  alert += `Budget: ${budget}\n`;
  if (experience) alert += `Experience: ${experience}\n`;
  alert += `\nReason: ${reason}\n`;
  alert += `\n💡 Bot told them you'll message personally from your number.`;

  return alert;
}

export function getEscalationMessage(reason) {
  const messages = {
    'budget_confirmed': "Great choice! I'm connecting you with Thambu, our founder and race engineer. He'll message you personally from his direct number to help you lock in the perfect setup. 🏁",
    'b2b_inquiry': "That sounds like an exciting project! I'm handing this over to Thambu, our founder — he personally handles all B2B simulator installations (airports, corporate venues, racing academies). He'll message you from his direct number shortly!",
    'wants_to_visit': "Absolutely! I'll have Thambu, our founder, reach out to you personally from his direct number to set up a time. He loves showing people the rigs in person! 🏎️",
    'discount_negotiation': "I appreciate you asking! Let me connect you with Thambu directly — he handles pricing personally and can work something out. He'll message you from his number shortly.",
    'ready_to_buy': "Awesome, exciting times ahead! 🏁 Thambu, our founder and race engineer, will message you personally from his direct number to finalize everything and make sure you get exactly the right setup.",
    'frustrated': "I completely understand your concern. I'm escalating this to Thambu, our founder, right now. He'll message you personally from his direct number to sort this out.",
    'unknown_answer': "That's a great question — I want to make sure you get the right answer. Thambu, our race engineer and founder, will message you personally from his direct number with the details.",
    'default': "Let me connect you with Thambu, our founder. He'll reach out to you personally from his direct number shortly!"
  };

  return messages[reason] || messages['default'];
}
