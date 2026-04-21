/**
 * AI Analysis — calls OpenAI when OPENAI_API_KEY is set,
 * falls back to an enriched keyword engine otherwise.
 *
 * This module is safe to import in API routes (server-side only).
 * Never import it directly in client components.
 */

import { AIAnalysisResult, RequestCategory, RequestPriority } from '@/types';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY ?? '';
const MODEL = 'gpt-4o-mini'; // fast, cheap, excellent for classification

// ── OpenAI path ───────────────────────────────────────────────────────────────

async function analyzeWithOpenAI(
  message: string,
  serviceType: string
): Promise<AIAnalysisResult> {
  const systemPrompt = `You are an AI assistant for a business booking management system.
Analyze the customer message below and return a JSON object with exactly these keys:
- "summary": one concise sentence (max 20 words) summarizing the customer's request
- "category": exactly one of: booking | cancellation | reschedule | pricing_question | general_inquiry | urgent_request
- "priority": exactly one of: low | medium | high
- "suggestedReply": a professional, warm reply (2-3 sentences) to send to this customer

Scoring guide:
- urgent_request / cancellation → priority high
- booking / reschedule → priority medium
- pricing_question / general_inquiry → priority low
- Override to high if the message contains urgency words (urgent, emergency, ASAP, tonight, today)

Return ONLY valid JSON. No markdown, no explanation, no code blocks.`;

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      temperature: 0.25,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: systemPrompt },
        {
          role: 'user',
          content: `Service type: ${serviceType}\n\nCustomer message:\n${message}`,
        },
      ],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenAI error ${res.status}: ${err}`);
  }

  const json = await res.json();
  const raw = JSON.parse(json.choices[0].message.content) as Record<string, string>;

  const allowedCategories: RequestCategory[] = [
    'booking', 'cancellation', 'reschedule',
    'pricing_question', 'general_inquiry', 'urgent_request',
  ];
  const allowedPriorities: RequestPriority[] = ['low', 'medium', 'high'];

  return {
    summary:        raw.summary        || 'Customer request received.',
    category:       allowedCategories.includes(raw.category as RequestCategory)
                      ? (raw.category as RequestCategory)
                      : 'general_inquiry',
    priority:       allowedPriorities.includes(raw.priority as RequestPriority)
                      ? (raw.priority as RequestPriority)
                      : 'medium',
    suggestedReply: raw.suggestedReply || raw.suggested_reply || '',
  };
}

// ── Keyword fallback (used when OPENAI_API_KEY is not set) ────────────────────

function analyzeWithKeywords(
  message: string,
  serviceType: string
): AIAnalysisResult {
  const m = message.toLowerCase();

  let category: RequestCategory = 'general_inquiry';
  let priority: RequestPriority = 'low';

  // Category rules (order matters — more specific first)
  if (m.includes('urgent') || m.includes('emergency') || m.includes('asap') ||
      m.includes('tonight') || m.includes('right now') || m.includes('immédiat')) {
    category = 'urgent_request';
    priority = 'high';
  } else if (m.includes('cancel') || m.includes('annul') || m.includes('refund') ||
             m.includes('rembours')) {
    category = 'cancellation';
    priority = 'high';
  } else if (m.includes('reschedul') || m.includes('postpone') || m.includes('move') ||
             m.includes('report') || m.includes('déplacer') || m.includes('changer')) {
    category = 'reschedule';
    priority = 'medium';
  } else if (m.includes('price') || m.includes('cost') || m.includes('how much') ||
             m.includes('tarif') || m.includes('prix') || m.includes('combien')) {
    category = 'pricing_question';
    priority = 'low';
  } else if (m.includes('book') || m.includes('reserv') || m.includes('appoint') ||
             m.includes('rendez-vous') || m.includes('réserver') || m.includes('slot')) {
    category = 'booking';
    priority = 'medium';
  }

  // Build realistic summary
  const categoryLabels: Record<RequestCategory, string> = {
    booking:          'booking request',
    cancellation:     'cancellation request',
    reschedule:       'reschedule request',
    pricing_question: 'pricing inquiry',
    general_inquiry:  'general inquiry',
    urgent_request:   'urgent request',
  };
  const summary = `Customer ${categoryLabels[category]} for ${serviceType} service — awaiting confirmation.`;

  const replyTemplates: Record<RequestCategory, string> = {
    booking:
      `Thank you for your booking request! We have received your message and will confirm your appointment within 24 hours. Please don't hesitate to contact us if you need anything in the meantime.`,
    cancellation:
      `We have received your cancellation request and are processing it now. We understand circumstances change and appreciate you letting us know. Our team will confirm the cancellation and any applicable refund shortly.`,
    reschedule:
      `Thank you for reaching out about rescheduling. We are checking our availability and will propose alternative time slots for you shortly. We appreciate your flexibility.`,
    pricing_question:
      `Thank you for your inquiry about our pricing. We will send you a detailed breakdown of our rates and packages shortly. Please let us know if you have any specific requirements so we can tailor our proposal.`,
    general_inquiry:
      `Thank you for contacting us. We have received your message and a member of our team will get back to you within 24 hours with all the information you need.`,
    urgent_request:
      `We have received your urgent request and it has been flagged for immediate attention. A member of our team will contact you as soon as possible — typically within the next few hours.`,
  };

  return {
    summary,
    category,
    priority,
    suggestedReply: replyTemplates[category],
  };
}

// ── Public API ────────────────────────────────────────────────────────────────

export async function generateAIAnalysis(
  message: string,
  serviceType: string
): Promise<AIAnalysisResult> {
  if (OPENAI_API_KEY && OPENAI_API_KEY.startsWith('sk-')) {
    try {
      return await analyzeWithOpenAI(message, serviceType);
    } catch (err) {
      console.error('[AI] OpenAI failed, falling back to keyword engine:', err);
    }
  }
  // Keyword fallback — always works
  return analyzeWithKeywords(message, serviceType);
}
