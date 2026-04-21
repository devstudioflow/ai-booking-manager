import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { generateAIAnalysis } from '@/lib/ai';
import { BookingRequest } from '@/types';

// ── Supabase client ───────────────────────────────────────────────────────────

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    '';

  if (!url.startsWith('https://') || !key) return null;
  return createClient(url, key);
}

// ── Row mapper (snake_case DB → camelCase frontend) ───────────────────────────

function rowToRequest(row: Record<string, unknown>): BookingRequest {
  return {
    id:               String(row.id               ?? ''),
    name:             String(row.name             ?? ''),
    email:            String(row.email            ?? ''),
    phone:            String(row.phone            ?? ''),
    serviceType:      String(row.service_type     ?? ''),
    preferredDate:    String(row.preferred_date   ?? ''),
    preferredTime:    String(row.preferred_time   ?? ''),
    guests:           Number(row.guests           ?? 1),
    message:          String(row.message          ?? ''),
    status:           (row.status as BookingRequest['status']) ?? 'pending',
    category:         'general_inquiry' as BookingRequest['category'],
    priority:         'medium'          as BookingRequest['priority'],
    aiSummary:        String(row.ai_summary         ?? ''),
    aiSuggestedReply: String(row.ai_suggested_reply ?? ''),
    notes:            String(row.notes             ?? ''),
    createdAt:        String(row.created_at        ?? new Date().toISOString()),
  };
}

// ── GET /api/requests ─────────────────────────────────────────────────────────

export async function GET() {
  const sb = getSupabase();

  if (!sb) {
    console.warn('[GET /api/requests] Supabase non configuré — retourne []');
    return NextResponse.json({ requests: [] });
  }

  try {
    const { data, error } = await sb
      .from('requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[GET /api/requests] Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const requests = (data ?? []).map(rowToRequest);
    return NextResponse.json({ requests });
  } catch (err) {
    console.error('[GET /api/requests] Unexpected error:', err);
    return NextResponse.json({ error: 'Failed to fetch requests' }, { status: 500 });
  }
}

// ── POST /api/requests ────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // ── Validation ────────────────────────────────────────────────────────────
    const required = ['name', 'email', 'serviceType', 'preferredDate', 'preferredTime', 'message'];
    for (const field of required) {
      if (!body[field]?.toString().trim()) {
        return NextResponse.json(
          { error: `Champ obligatoire manquant : ${field}` },
          { status: 400 },
        );
      }
    }

    if (!/\S+@\S+\.\S+/.test(body.email)) {
      return NextResponse.json({ error: 'Adresse email invalide' }, { status: 400 });
    }

    // ── Analyse IA (fallback keywords si pas de clé OpenAI) ──────────────────
    const ai = await generateAIAnalysis(body.message, body.serviceType);

    // ── Ligne à insérer — colonnes existantes uniquement (sans category/priority) ──
    const row = {
      name:               body.name.trim(),
      email:              body.email.trim().toLowerCase(),
      phone:              (body.phone ?? '').trim(),
      service_type:       body.serviceType,
      preferred_date:     body.preferredDate,
      preferred_time:     body.preferredTime,
      guests:             Number(body.guests) || 1,
      message:            body.message.trim(),
      status:             'pending',
      ai_summary:         ai.summary,
      ai_suggested_reply: ai.suggestedReply,
      notes:              '',
    };

    // 🔍 Log visible dans le terminal Next.js
    console.log('[POST /api/requests] Données envoyées à Supabase :', row);

    // ── Insert Supabase ───────────────────────────────────────────────────────
    const sb = getSupabase();

    if (!sb) {
      console.warn('[POST /api/requests] Supabase non configuré — mode fallback');
      const fallback: BookingRequest = {
        ...row,
        id:               `req-${Date.now()}`,
        serviceType:      row.service_type,
        preferredDate:    row.preferred_date,
        preferredTime:    row.preferred_time,
        aiSummary:        row.ai_summary,
        aiSuggestedReply: row.ai_suggested_reply,
        status:           'pending',
        category:         ai.category,
        priority:         ai.priority,
        createdAt:        new Date().toISOString(),
      };
      return NextResponse.json({ request: fallback }, { status: 201 });
    }

    const { data, error } = await sb
      .from('requests')
      .insert([row])
      .select()
      .single();

    if (error) {
      console.error('[POST /api/requests] Supabase insert error:', {
        message: error.message,
        details: error.details,
        hint:    error.hint,
        code:    error.code,
      });
      return NextResponse.json(
        { error: `Erreur Supabase : ${error.message}` },
        { status: 500 },
      );
    }

    const request = rowToRequest(data);
    console.log('[POST /api/requests] ✅ Requête créée :', request.id);
    return NextResponse.json({ request }, { status: 201 });

  } catch (err) {
    console.error('[POST /api/requests] Erreur inattendue :', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Erreur serveur inattendue' },
      { status: 500 },
    );
  }
}