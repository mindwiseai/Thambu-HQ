import Anthropic from '@anthropic-ai/sdk';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

let client;
let systemPrompt;
let productsKB;
let faqKB;
let vnmTechKB;
let conspitTechKB;

export function initAI() {
  client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  // Load system prompt
  systemPrompt = readFileSync(join(__dirname, '..', 'knowledge', 'system-prompt.md'), 'utf-8');

  // Load product knowledge base
  try {
    productsKB = JSON.parse(readFileSync(join(__dirname, '..', 'knowledge', 'products.json'), 'utf-8'));
  } catch (e) {
    console.warn('[AI] products.json not found, running without product KB');
    productsKB = { kits: [], individual_components: [], brand_partners: [], services: [] };
  }

  // Load FAQ knowledge base
  try {
    faqKB = JSON.parse(readFileSync(join(__dirname, '..', 'knowledge', 'faq.json'), 'utf-8'));
  } catch (e) {
    console.warn('[AI] faq.json not found, running without FAQ KB');
    faqKB = { categories: [] };
  }

  // Load VNM technical knowledge base
  try {
    vnmTechKB = JSON.parse(readFileSync(join(__dirname, '..', 'knowledge', 'vnm-technical.json'), 'utf-8'));
  } catch (e) {
    console.warn('[AI] vnm-technical.json not found, running without VNM tech KB');
    vnmTechKB = null;
  }

  // Load Conspit technical knowledge base
  try {
    conspitTechKB = JSON.parse(readFileSync(join(__dirname, '..', 'knowledge', 'conspit-technical.json'), 'utf-8'));
  } catch (e) {
    console.warn('[AI] conspit-technical.json not found, running without Conspit tech KB');
    conspitTechKB = null;
  }

  console.log('[AI] Claude engine initialized');
  console.log(`[AI] Knowledge base: ${productsKB.kits?.length || 0} kits, ${productsKB.individual_components?.length || 0} components`);
  console.log(`[AI] FAQ base: ${faqKB.categories?.length || 0} categories, ${faqKB.categories?.reduce((sum, c) => sum + (c.questions?.length || 0), 0) || 0} questions`);
  console.log(`[AI] Tech KBs: VNM=${vnmTechKB ? 'loaded' : 'none'}, Conspit=${conspitTechKB ? 'loaded' : 'none'}`);
}

function buildKnowledgeContext() {
  let kb = '\n\n## PRODUCT KNOWLEDGE BASE\n\n';

  if (productsKB.kits?.length) {
    kb += '### Simulator Kits\n';
    for (const kit of productsKB.kits) {
      kb += `\n**${kit.name}** (${kit.tier} tier) — ₹${kit.price_inr?.toLocaleString('en-IN') || 'Price on request'}\n`;
      kb += `${kit.description || ''}\n`;
      if (kit.components?.length) {
        kb += 'Components:\n';
        for (const comp of kit.components) {
          kb += `  - ${comp.brand} ${comp.name}: ${comp.specs || ''}\n`;
        }
      }
      if (kit.ideal_for) kb += `Ideal for: ${kit.ideal_for}\n`;
      if (kit.space_required) kb += `Space needed: ${kit.space_required}\n`;
    }
  }

  if (productsKB.individual_components?.length) {
    kb += '\n### Individual Components\n';
    for (const comp of productsKB.individual_components) {
      kb += `- **${comp.brand} ${comp.name}** (${comp.category}) — ₹${comp.price_inr?.toLocaleString('en-IN') || 'Price on request'}: ${comp.specs || ''}\n`;
    }
  }

  if (productsKB.services?.length) {
    kb += '\n### Services\n';
    for (const svc of productsKB.services) {
      kb += `- ${typeof svc === 'string' ? svc : svc.name || JSON.stringify(svc)}\n`;
    }
  }

  // Add FAQ knowledge
  if (faqKB?.categories?.length) {
    kb += '\n\n## FREQUENTLY ASKED QUESTIONS\n';
    kb += 'Use these pre-written answers when relevant. Adapt the tone to match the conversation.\n\n';
    for (const cat of faqKB.categories) {
      kb += `### ${cat.name}\n`;
      for (const faq of (cat.questions || [])) {
        kb += `**Q: ${faq.q}**\nA: ${faq.a}\n\n`;
      }
    }
  }

  // Add VNM technical troubleshooting knowledge
  if (vnmTechKB) {
    kb += '\n\n## VNM TECHNICAL SUPPORT KNOWLEDGE\n';
    kb += 'Use this for VNM product troubleshooting. RaceSims handles all VNM support for Indian customers.\n\n';

    if (vnmTechKB.troubleshooting?.length) {
      kb += '### Common VNM Issues & Solutions\n';
      for (const issue of vnmTechKB.troubleshooting) {
        kb += `\n**Issue: ${issue.issue}**\n`;
        kb += `Symptoms: ${issue.symptoms?.join(', ')}\n`;
        kb += 'Solutions:\n';
        for (const sol of (issue.solutions || [])) {
          kb += `  - ${sol}\n`;
        }
        if (issue.escalation) kb += `⚠️ Escalate: ${issue.escalation}\n`;
      }
    }

    if (vnmTechKB.software) {
      kb += '\n### VNM Software\n';
      kb += `- VNM UI v${vnmTechKB.software.vnm_ui?.current_version}: ${vnmTechKB.software.vnm_ui?.download_url}\n`;
      kb += `- VNM Flash v${vnmTechKB.software.vnm_flash?.current_version}: ${vnmTechKB.software.vnm_flash?.download_url}\n`;
      for (const note of (vnmTechKB.software.vnm_ui?.notes || [])) {
        kb += `  - ${note}\n`;
      }
    }

    if (vnmTechKB.supported_games) {
      kb += '\n### VNM Game Compatibility\n';
      kb += `Native support: ${vnmTechKB.supported_games.native_support?.join(', ')}\n`;
      kb += 'Require setup:\n';
      for (const [game, note] of Object.entries(vnmTechKB.supported_games.requires_configuration || {})) {
        kb += `  - ${game}: ${note}\n`;
      }
    }

    if (vnmTechKB.warranty) {
      kb += '\n### VNM Warranty (via RaceSims)\n';
      kb += `Duration: ${vnmTechKB.warranty.duration}\n`;
      kb += `Process: ${vnmTechKB.warranty.process_racesims}\n`;
    }
  }

  // Add Conspit technical troubleshooting knowledge
  if (conspitTechKB) {
    kb += '\n\n## CONSPIT TECHNICAL SUPPORT KNOWLEDGE\n';
    kb += 'Use this for Conspit product troubleshooting. RaceSims handles all Conspit support for Indian customers.\n\n';

    if (conspitTechKB.troubleshooting?.length) {
      kb += '### Common Conspit Issues & Solutions\n';
      for (const issue of conspitTechKB.troubleshooting) {
        kb += `\n**Issue: ${issue.issue}**\n`;
        kb += `Symptoms: ${issue.symptoms?.join(', ')}\n`;
        kb += 'Solutions:\n';
        for (const sol of (issue.solutions || [])) {
          kb += `  - ${sol}\n`;
        }
        if (issue.escalation) kb += `⚠️ Escalate: ${issue.escalation}\n`;
      }
    }

    if (conspitTechKB.software) {
      kb += '\n### Conspit Software\n';
      for (const [key, sw] of Object.entries(conspitTechKB.software)) {
        kb += `- ${sw.name || key}: ${sw.download_url || 'check conspit.com'}\n`;
      }
    }

    if (conspitTechKB.warranty) {
      kb += '\n### Conspit Warranty (via RaceSims)\n';
      kb += `Duration: ${conspitTechKB.warranty?.duration || 'Contact RaceSims'}\n`;
    }
  }

  return kb;
}

export async function generateResponse(conversationHistory, contactInfo) {
  if (!client) throw new Error('AI not initialized');

  // Build context about the customer
  let customerContext = '\n\n## CURRENT CUSTOMER CONTEXT\n';
  if (contactInfo.name) customerContext += `Name: ${contactInfo.name}\n`;
  if (contactInfo.lead_score) customerContext += `Lead score: ${contactInfo.lead_score}/10\n`;
  if (contactInfo.budget_range) customerContext += `Budget: ${contactInfo.budget_range}\n`;
  if (contactInfo.product_interest) customerContext += `Interested in: ${contactInfo.product_interest}\n`;
  if (contactInfo.experience_level) customerContext += `Experience: ${contactInfo.experience_level}\n`;
  if (contactInfo.city) customerContext += `City: ${contactInfo.city}\n`;
  customerContext += `Channel: ${contactInfo.channel || 'whatsapp'}\n`;

  const fullSystemPrompt = systemPrompt + buildKnowledgeContext() + customerContext;

  // Convert history to Claude message format
  const messages = conversationHistory.map(msg => ({
    role: msg.role === 'customer' ? 'user' : 'assistant',
    content: msg.content
  }));

  // Also ask Claude to extract lead intelligence in a structured way
  const intelligenceInstruction = `

IMPORTANT: After your response to the customer, add a line break and then output a JSON block wrapped in <lead_intel> tags with any new information you learned from this conversation turn. Only include fields that have NEW information from the latest message:
<lead_intel>
{
  "name": "customer name if mentioned",
  "budget_range": "budget if mentioned (e.g., '3-5L', '10L+')",
  "product_interest": "specific product/kit if mentioned",
  "experience_level": "beginner/intermediate/advanced/professional",
  "city": "city if mentioned",
  "intent_signals": ["list of buying signals detected"],
  "escalation_needed": false,
  "escalation_reason": "",
  "score_adjustments": [
    {"event": "description", "delta": 0}
  ]
}
</lead_intel>

Score adjustment guide:
- Mentions specific product: +2
- Shares budget: +2
- Asks about EMI/payment: +2
- Wants to visit/call: +2
- B2B/corporate inquiry: +3
- Says "ready to buy" / "want to order": +3
- Asks about delivery/shipping: +1
- Just browsing / general question: +0
- Asks about competitor: +1
- Shares space/room dimensions: +1`;

  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 800,
      system: fullSystemPrompt + intelligenceInstruction,
      messages: messages
    });

    const fullResponse = response.content[0].text;

    // Parse out lead intelligence
    const intelMatch = fullResponse.match(/<lead_intel>([\s\S]*?)<\/lead_intel>/);
    let intelligence = null;
    let customerResponse = fullResponse;

    if (intelMatch) {
      customerResponse = fullResponse.replace(/<lead_intel>[\s\S]*?<\/lead_intel>/, '').trim();
      try {
        intelligence = JSON.parse(intelMatch[1]);
      } catch (e) {
        console.warn('[AI] Failed to parse lead intelligence:', e.message);
      }
    }

    return {
      response: customerResponse,
      intelligence,
      usage: {
        input_tokens: response.usage.input_tokens,
        output_tokens: response.usage.output_tokens
      }
    };
  } catch (error) {
    console.error('[AI] Claude API error:', error.message);
    throw error;
  }
}
