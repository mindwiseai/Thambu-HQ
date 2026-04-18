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

  const bundleCount = productsKB.featured_bundles?.length || 0;
  const conspitSkus = (productsKB.conspit?.wheelbases?.length || 0) +
                      (productsKB.conspit?.steering_wheels?.length || 0) +
                      (productsKB.conspit?.pedals?.length || 0) +
                      (productsKB.conspit?.cockpits?.length || 0) +
                      (productsKB.conspit?.pre_built_combos?.length || 0);
  const vnmSkus = (productsKB.vnm?.wheelbases?.length || 0) +
                  (productsKB.vnm?.steering_wheels?.length || 0) +
                  (productsKB.vnm?.pedals?.length || 0) +
                  (productsKB.vnm?.motion?.length || 0);
  const faqCount = faqKB.categories?.reduce((sum, c) => sum + (c.faqs?.length || 0), 0) || 0;

  console.log('[AI] Claude engine initialized');
  console.log(`[AI] Knowledge base: ${bundleCount} featured bundles, ${conspitSkus} Conspit SKUs, ${vnmSkus} VNM SKUs`);
  console.log(`[AI] FAQ base: ${faqKB.categories?.length || 0} categories, ${faqCount} questions`);
  console.log(`[AI] Tech KBs: VNM=${vnmTechKB ? 'loaded' : 'none'}, Conspit=${conspitTechKB ? 'loaded' : 'none'}`);
}

function fmt(n) {
  return typeof n === 'number' ? n.toLocaleString('en-IN') : n;
}

function buildKnowledgeContext() {
  const p = productsKB || {};
  let kb = '\n\n=== PRODUCT KNOWLEDGE (plain text — do NOT mirror this formatting in customer replies) ===\n\n';

  if (p.brand_strategy) {
    const bs = p.brand_strategy;
    kb += 'BRAND STRATEGY\n';
    if (bs.push?.length) kb += `Push (actively sell): ${bs.push.join(', ')}\n`;
    if (bs.comparison_only?.length) kb += `Comparison only (do NOT sell): ${bs.comparison_only.join(', ')}\n`;
    if (bs.opportunistic_stock?.length) kb += `Opportunistic (only if Shopify shows stock): ${bs.opportunistic_stock.join(', ')}\n`;
    if (bs.coming_soon_do_not_quote?.length) kb += `Coming soon — do not quote: ${bs.coming_soon_do_not_quote.join(', ')}\n`;
    if (bs.not_carried?.length) kb += `Not carried — redirect: ${bs.not_carried.join(', ')}\n`;
    if (bs.note_to_bot) kb += `Note: ${bs.note_to_bot}\n`;
    kb += '\n';
  }

  if (p.featured_bundles?.length) {
    kb += 'FEATURED BUNDLES (gear only, no rig/PC)\n';
    for (const b of p.featured_bundles) {
      kb += `- ${b.name} — Rs ${fmt(b.price_inr)}. ${b.focus}. ${b.includes}.`;
      if (b.note) kb += ` ${b.note}.`;
      kb += '\n';
    }
    kb += '\n';
  }

  if (p.conspit) {
    kb += `CONSPIT (push, warranty ${p.conspit.warranty_years}yr)\n`;
    for (const x of (p.conspit.wheelbases || [])) kb += `- Wheelbase: ${x.model} — Rs ${fmt(x.price_inr)}\n`;
    for (const x of (p.conspit.steering_wheels || [])) kb += `- Wheel: ${x.model} — Rs ${fmt(x.price_inr)} (${x.type || ''})\n`;
    for (const x of (p.conspit.quick_release || [])) kb += `- QR: ${x.model} — Rs ${fmt(x.price_inr)}\n`;
    for (const x of (p.conspit.pedals || [])) kb += `- Pedals: ${x.model} — Rs ${fmt(x.price_inr)} (${x.tier || ''})\n`;
    for (const x of (p.conspit.handbrake || [])) kb += `- Handbrake: ${x.model} — Rs ${fmt(x.price_inr)}\n`;
    for (const x of (p.conspit.cockpits || [])) kb += `- Cockpit: ${x.model} — Rs ${fmt(x.price_inr)}\n`;
    for (const x of (p.conspit.pre_built_combos || [])) kb += `- Combo: ${x.name} — Rs ${fmt(x.price_inr)}\n`;
    kb += '\n';
  }

  if (p.vnm) {
    kb += `VNM (push, warranty ${p.vnm.warranty_years}yr)\n`;
    for (const x of (p.vnm.wheelbases || [])) kb += `- Wheelbase: ${x.model} — Rs ${fmt(x.price_inr)}\n`;
    for (const x of (p.vnm.steering_wheels || [])) kb += `- Wheel: ${x.model} — Rs ${fmt(x.price_inr)}\n`;
    for (const x of (p.vnm.pedals || [])) kb += `- Pedals: ${x.model} — Rs ${fmt(x.price_inr)}\n`;
    for (const x of (p.vnm.shifter || [])) kb += `- Shifter: ${x.model} — Rs ${fmt(x.price_inr)}\n`;
    for (const x of (p.vnm.handbrake || [])) kb += `- Handbrake: ${x.model} — Rs ${fmt(x.price_inr)}\n`;
    for (const x of (p.vnm.motion || [])) kb += `- Motion: ${x.model} — Rs ${fmt(x.price_inr)}\n`;
    kb += '\n';
  }

  if (p.racesims_in_house) {
    kb += 'RACESIMS IN-HOUSE (warranty 1yr)\n';
    for (const x of (p.racesims_in_house.cockpits_and_rigs || [])) kb += `- Rig: ${x.model} — Rs ${fmt(x.price_inr)}${x.note ? ` (${x.note})` : ''}\n`;
    for (const x of (p.racesims_in_house.monitor_stands_and_mounts || [])) kb += `- Stand/Mount: ${x.model} — Rs ${fmt(x.price_inr)}\n`;
    for (const x of (p.racesims_in_house.accessories || [])) kb += `- Accessory: ${x.model} — Rs ${fmt(x.price_inr)}\n`;
    for (const x of (p.racesims_in_house.seats || [])) kb += `- Seat: ${x.model} — Rs ${fmt(x.price_inr)} (${x.tier || ''})\n`;
    kb += '\n';
  }

  if (p.monitors_gigabyte?.length) {
    kb += 'MONITORS (Gigabyte)\n';
    for (const m of p.monitors_gigabyte) kb += `- ${m.model} — Rs ${fmt(m.price_inr)} (${m.use_case || ''})\n`;
    kb += '\n';
  }

  if (p.pc_builds) {
    kb += `PC BUILDS — ${p.pc_builds.note_to_bot}\n\n`;
  }

  if (p.simagic_comparison_only) {
    kb += 'SIMAGIC (comparison reference only — do NOT actively sell)\n';
    kb += `${p.simagic_comparison_only.note_to_bot || ''}\n`;
    for (const x of (p.simagic_comparison_only.items || [])) {
      kb += `- ${x.model} — Rs ${fmt(x.price_inr)} (redirect to: ${x.redirect_to})\n`;
    }
    kb += '\n';
  }

  if (p.moza_opportunistic) {
    kb += 'MOZA (opportunistic stock only)\n';
    kb += `${p.moza_opportunistic.note_to_bot || ''}\n`;
    for (const x of (p.moza_opportunistic.items || [])) {
      kb += `- ${x.model} — Rs ${fmt(x.price_inr)}${x.was_inr ? ` (was Rs ${fmt(x.was_inr)})` : ''}\n`;
    }
    kb += '\n';
  }

  if (p.coming_soon_do_not_quote?.length) {
    kb += 'COMING SOON — DO NOT QUOTE PRICES OR DATES\n';
    for (const b of p.coming_soon_do_not_quote) kb += `- ${b.brand}: ${b.action}\n`;
    kb += '\n';
  }

  if (p.not_carried?.length) {
    kb += 'NOT CARRIED — polite redirect if customer names these\n';
    for (const b of p.not_carried) kb += `- ${b.brand}: ${b.action}\n`;
    kb += '\n';
  }

  if (p.policies) {
    const po = p.policies;
    kb += 'POLICIES\n';
    if (po.payment) {
      kb += `Payment: ${po.payment.terms}. Methods: ${po.payment.methods?.join(', ')}. EMI: ${po.payment.emi}. ${po.payment.note_to_bot || ''}\n`;
    }
    if (po.warranty) {
      kb += `Warranty: Conspit ${po.warranty.conspit_years}yr, VNM ${po.warranty.vnm_years}yr, RaceSims in-house ${po.warranty.racesims_in_house_years}yr, Simagic ${po.warranty.simagic_years}yr, Moza ${po.warranty.moza_years}yr. Coverage: ${po.warranty.coverage}. Excludes: ${po.warranty.excludes?.join(', ')}\n`;
    }
    if (po.installation) {
      kb += `Installation: ${po.installation.quote_line} (${po.installation.coverage}). ${po.installation.note_to_bot || ''}\n`;
    }
    if (po.shipping) {
      kb += `Shipping: ${po.shipping.courier}, ${po.shipping.coverage}, transit ${po.shipping.typical_transit_days} days. ${po.shipping.insurance}. Packaging: ${po.shipping.packaging}\n`;
    }
    if (po.turnaround) {
      kb += `Turnaround: gear ${po.turnaround.in_stock_gear}; custom rig/PC ${po.turnaround.custom_rig_or_pc}; VNM motion ${po.turnaround.motion_kit_vnm}\n`;
    }
    if (po.returns) {
      kb += `Returns: ${po.returns.policy}\n`;
    }
    kb += '\n';
  }

  if (p.services) {
    kb += 'SERVICES\n';
    if (p.services.motec_coaching) {
      const m = p.services.motec_coaching;
      kb += `- MoTeC coaching: Rs ${fmt(m.price_inr_per_session)}/session. ${m.description} Booking: ${m.booking}\n`;
    }
    if (p.services.driver_development) {
      kb += `- Driver development: ${p.services.driver_development.status}. ${p.services.driver_development.note_to_bot}\n`;
    }
    if (p.services.b2b_commercial_simulators) {
      const b = p.services.b2b_commercial_simulators;
      kb += `- B2B simulators: ${b.description} Quote rule: ${b.quote_rule}. Ask first: ${b.ask_first?.join(', ')}\n`;
    }
    kb += '\n';
  }

  if (p.dealers?.length) {
    kb += 'DEALERS (public, share if customer asks for local options)\n';
    for (const d of p.dealers) kb += `- ${d.name} (${d.contact}) — ${d.city}\n`;
    if (p.dealer_note_to_bot) kb += `Note: ${p.dealer_note_to_bot}\n`;
    kb += '\n';
  }

  if (p.founder_authority) {
    const f = p.founder_authority;
    kb += 'FOUNDER AUTHORITY\n';
    kb += `${f.name} — ${f.role}. ${f.arka_credential}\n`;
    if (f.public_proof_points?.length) kb += `Proof points: ${f.public_proof_points.join(' | ')}\n`;
    if (f.bot_use) kb += `When to lead with this: ${f.bot_use}\n`;
    kb += '\n';
  }

  if (faqKB?.categories?.length) {
    kb += '\n=== FAQ CONTEXT (extract ONE relevant point per reply, do NOT paste verbatim) ===\n\n';
    if (faqKB.note_to_bot) kb += `${faqKB.note_to_bot}\n\n`;
    for (const cat of faqKB.categories) {
      kb += `-- ${cat.category} --\n`;
      for (const f of (cat.faqs || [])) {
        kb += `Q: ${f.q}\nA: ${f.a}\n\n`;
      }
    }
  }

  if (vnmTechKB) {
    kb += '\n=== VNM TECHNICAL SUPPORT ===\n';
    if (vnmTechKB.troubleshooting?.length) {
      kb += 'Common VNM Issues:\n';
      for (const issue of vnmTechKB.troubleshooting) {
        kb += `\nIssue: ${issue.issue}\nSymptoms: ${issue.symptoms?.join(', ')}\nSolutions:\n`;
        for (const sol of (issue.solutions || [])) kb += `  - ${sol}\n`;
        if (issue.escalation) kb += `Escalate: ${issue.escalation}\n`;
      }
    }
    if (vnmTechKB.software) {
      kb += '\nVNM Software:\n';
      kb += `- VNM UI v${vnmTechKB.software.vnm_ui?.current_version}: ${vnmTechKB.software.vnm_ui?.download_url}\n`;
      kb += `- VNM Flash v${vnmTechKB.software.vnm_flash?.current_version}: ${vnmTechKB.software.vnm_flash?.download_url}\n`;
      for (const note of (vnmTechKB.software.vnm_ui?.notes || [])) kb += `  - ${note}\n`;
    }
    if (vnmTechKB.supported_games) {
      kb += '\nVNM Game Compatibility:\n';
      kb += `Native: ${vnmTechKB.supported_games.native_support?.join(', ')}\n`;
      for (const [game, note] of Object.entries(vnmTechKB.supported_games.requires_configuration || {})) {
        kb += `  - ${game}: ${note}\n`;
      }
    }
    if (vnmTechKB.warranty) {
      kb += `\nVNM Warranty: ${vnmTechKB.warranty.duration}. Process: ${vnmTechKB.warranty.process_racesims}\n`;
    }
  }

  if (conspitTechKB) {
    kb += '\n\n=== CONSPIT TECHNICAL SUPPORT ===\n';
    if (conspitTechKB.troubleshooting?.length) {
      kb += 'Common Conspit Issues:\n';
      for (const issue of conspitTechKB.troubleshooting) {
        kb += `\nIssue: ${issue.issue}\nSymptoms: ${issue.symptoms?.join(', ')}\nSolutions:\n`;
        for (const sol of (issue.solutions || [])) kb += `  - ${sol}\n`;
        if (issue.escalation) kb += `Escalate: ${issue.escalation}\n`;
      }
    }
    if (conspitTechKB.software) {
      kb += '\nConspit Software:\n';
      for (const [key, sw] of Object.entries(conspitTechKB.software)) {
        kb += `- ${sw.name || key}: ${sw.download_url || 'conspit.com'}\n`;
      }
    }
    if (conspitTechKB.warranty) {
      kb += `\nConspit Warranty: ${conspitTechKB.warranty?.duration || '1 year via RaceSims'}\n`;
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
