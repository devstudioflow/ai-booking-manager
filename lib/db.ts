/**
 * Database layer — Supabase CRUD with automatic mock fallback.
 * When NEXT_PUBLIC_DEMO_MODE=true or Supabase is not configured,
 * all operations use the in-memory mock store so the app works
 * out-of-the-box without any database setup.
 */

import { BookingRequest, RequestStatus } from '@/types';
import { getSupabaseAdmin, isSupabaseConfigured } from './supabase';
import { mockRequests } from '@/data/mockRequests';

const isDemoMode =
  process.env.NEXT_PUBLIC_DEMO_MODE === 'true' || !isSupabaseConfigured;

// ── In-memory store for demo mode ─────────────────────────────────────────────
let _store: BookingRequest[] = [...mockRequests];
function resetStore() { _store = [...mockRequests]; }

// ── Row ↔ domain mappers ───────────────────────────────────────────────────────

function rowToRequest(row: Record<string, unknown>): BookingRequest {
  return {
    id:               String(row.id ?? ''),
    name:             String(row.name ?? ''),
    email:            String(row.email ?? ''),
    phone:            String(row.phone ?? ''),
    serviceType:      String(row.service_type ?? ''),
    preferredDate:    String(row.preferred_date ?? ''),
    preferredTime:    String(row.preferred_time ?? ''),
    guests:           Number(row.guests ?? 1),
    message:          String(row.message ?? ''),
    status:           (row.status as RequestStatus) ?? 'pending',
    category:         (row.category as BookingRequest['category']) ?? 'general_inquiry',
    priority:         (row.priority as BookingRequest['priority']) ?? 'medium',
    aiSummary:        String(row.ai_summary ?? ''),
    aiSuggestedReply: String(row.ai_suggested_reply ?? ''),
    notes:            String(row.notes ?? ''),
    createdAt:        String(row.created_at ?? new Date().toISOString()),
  };
}

function requestToRow(req: Partial<BookingRequest>): Record<string, unknown> {
  const row: Record<string, unknown> = {};
  if (req.name             !== undefined) row.name               = req.name;
  if (req.email            !== undefined) row.email              = req.email;
  if (req.phone            !== undefined) row.phone              = req.phone;
  if (req.serviceType      !== undefined) row.service_type       = req.serviceType;
  if (req.preferredDate    !== undefined) row.preferred_date     = req.preferredDate;
  if (req.preferredTime    !== undefined) row.preferred_time     = req.preferredTime;
  if (req.guests           !== undefined) row.guests             = req.guests;
  if (req.message          !== undefined) row.message            = req.message;
  if (req.status           !== undefined) row.status             = req.status;
  if (req.category         !== undefined) row.category           = req.category;
  if (req.priority         !== undefined) row.priority           = req.priority;
  if (req.aiSummary        !== undefined) row.ai_summary         = req.aiSummary;
  if (req.aiSuggestedReply !== undefined) row.ai_suggested_reply = req.aiSuggestedReply;
  if (req.notes            !== undefined) row.notes              = req.notes;
  return row;
}

// ── READ ──────────────────────────────────────────────────────────────────────

export async function getAllRequests(): Promise<BookingRequest[]> {
  if (isDemoMode) {
    return [..._store].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
  const sb = getSupabaseAdmin();
  const { data, error } = await sb
    .from('requests')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []).map(rowToRequest);
}

export async function getRequestById(id: string): Promise<BookingRequest | null> {
  if (isDemoMode) {
    return _store.find((r) => r.id === id) ?? null;
  }
  const sb = getSupabaseAdmin();
  const { data, error } = await sb
    .from('requests')
    .select('*')
    .eq('id', id)
    .single();
  if (error) return null;
  return rowToRequest(data);
}

// ── CREATE ────────────────────────────────────────────────────────────────────

export async function createRequest(
  payload: Omit<BookingRequest, 'id' | 'createdAt'>
): Promise<BookingRequest> {
  if (isDemoMode) {
    const newRequest: BookingRequest = {
      ...payload,
      id: `req-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    _store = [newRequest, ..._store];
    return newRequest;
  }

  const sb = getSupabaseAdmin();
  const { data, error } = await sb
    .from('requests')
    .insert([requestToRow(payload)])
    .select()
    .single();
  if (error) throw new Error(error.message);
  return rowToRequest(data);
}

// ── UPDATE ────────────────────────────────────────────────────────────────────

export async function updateRequest(
  id: string,
  patch: Partial<Omit<BookingRequest, 'id' | 'createdAt'>>
): Promise<BookingRequest> {
  if (isDemoMode) {
    const idx = _store.findIndex((r) => r.id === id);
    if (idx === -1) throw new Error('Request not found');
    _store[idx] = { ..._store[idx], ...patch };
    return _store[idx];
  }

  const sb = getSupabaseAdmin();
  const { data, error } = await sb
    .from('requests')
    .update(requestToRow(patch))
    .eq('id', id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return rowToRequest(data);
}

// ── DELETE ────────────────────────────────────────────────────────────────────

export async function deleteRequest(id: string): Promise<void> {
  if (isDemoMode) {
    _store = _store.filter((r) => r.id !== id);
    return;
  }
  const sb = getSupabaseAdmin();
  const { error } = await sb.from('requests').delete().eq('id', id);
  if (error) throw new Error(error.message);
}
