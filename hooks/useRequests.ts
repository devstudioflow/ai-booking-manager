'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { BookingRequest, RequestStatus } from '@/types';
import { useToast } from '@/context/ToastContext';

interface UseRequestsReturn {
  requests:     BookingRequest[];
  loading:      boolean;
  error:        string | null;
  refresh:      () => void;
  updateStatus: (id: string, status: RequestStatus) => Promise<void>;
  updateNotes:  (id: string, notes: string) => Promise<void>;
  remove:       (id: string) => Promise<void>;
}

export function useRequests(): UseRequestsReturn {
  const { success, error: toastError } = useToast();
  const [requests, setRequests] = useState<BookingRequest[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const fetch_ = useCallback(async () => {
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/requests', { signal: ctrl.signal });
      if (!res.ok) throw new Error('Failed to load requests');
      const data = await res.json();
      setRequests(data.requests ?? []);
    } catch (err: unknown) {
      if ((err as Error).name === 'AbortError') return;
      const msg = err instanceof Error ? err.message : 'Unknown error';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch_();
    return () => abortRef.current?.abort();
  }, [fetch_]);

  // ── Optimistic update helper ───────────────────────────────────────────────

  async function patch(id: string, payload: Record<string, unknown>) {
    // Optimistic update
    setRequests(prev =>
      prev.map(r => r.id === id ? { ...r, ...payload } : r)
    );
    const res = await fetch(`/api/requests/${id}`, {
      method:  'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    });
    if (!res.ok) {
      // Roll back on failure
      await fetch_();
      const body = await res.json().catch(() => ({}));
      throw new Error(body.error ?? 'Update failed');
    }
    return res.json();
  }

  // ── Public API ─────────────────────────────────────────────────────────────

  const updateStatus = useCallback(async (id: string, status: RequestStatus) => {
    try {
      await patch(id, { status });
      const labels: Record<RequestStatus, string> = {
        confirmed: 'Booking confirmed',
        cancelled: 'Request cancelled',
        completed: 'Marked as completed',
        pending:   'Set back to pending',
      };
      success(labels[status]);
    } catch (err) {
      toastError('Update failed', err instanceof Error ? err.message : undefined);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateNotes = useCallback(async (id: string, notes: string) => {
    try {
      await patch(id, { notes });
      success('Notes saved');
    } catch (err) {
      toastError('Failed to save notes', err instanceof Error ? err.message : undefined);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const remove = useCallback(async (id: string) => {
    // Optimistic delete
    setRequests(prev => prev.filter(r => r.id !== id));
    try {
      const res = await fetch(`/api/requests/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      success('Request deleted');
    } catch (err) {
      await fetch_();
      toastError('Delete failed', err instanceof Error ? err.message : undefined);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    requests,
    loading,
    error,
    refresh: fetch_,
    updateStatus,
    updateNotes,
    remove,
  };
}
