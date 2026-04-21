'use client';

import { useCallback, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, Sparkles, Mail, Phone, CalendarDays, Clock,
  Users, MessageSquare, Copy, CheckCircle2, XCircle, Trash2,
  Tag, StickyNote, Send, AlertTriangle, RefreshCw, Loader2,
} from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';
import { StatusBadge, PriorityBadge, CategoryBadge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { useToast } from '@/context/ToastContext';
import { BookingRequest, RequestStatus } from '@/types';
import { formatDate, formatTime, timeAgo } from '@/utils/helpers';

// ── Loading skeleton ──────────────────────────────────────────────────────────

function DetailSkeleton() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 animate-pulse">
      <div className="xl:col-span-2 space-y-5">
        <div className="bg-white rounded-xl border border-zinc-200 p-6 space-y-4">
          <div className="flex gap-4">
            <Skeleton className="w-14 h-14 rounded-xl flex-shrink-0" />
            <div className="space-y-2 flex-1">
              <Skeleton className="w-1/3 h-5" />
              <Skeleton className="w-1/4 h-3.5" />
              <div className="flex gap-2 mt-2">
                <Skeleton className="w-20 h-5 rounded-full" />
                <Skeleton className="w-16 h-5 rounded-full" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {Array.from({length: 6}).map((_,i) => <Skeleton key={i} className="h-14 rounded-xl" />)}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-zinc-200 p-6">
          <Skeleton className="w-1/4 h-4 mb-4" />
          <Skeleton className="w-full h-24 rounded-xl" />
        </div>
        <div className="bg-white rounded-xl border border-zinc-200 p-6 space-y-3">
          <Skeleton className="w-1/3 h-4" />
          <Skeleton className="w-full h-20 rounded-xl" />
          <Skeleton className="w-full h-20 rounded-xl" />
        </div>
      </div>
      <div className="space-y-5">
        {Array.from({length: 3}).map((_,i) => <Skeleton key={i} className="h-36 rounded-xl" />)}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function RequestDetailPage() {
  const { id }   = useParams<{ id: string }>();
  const router   = useRouter();
  const { success, error: toastError, info } = useToast();

  const [request,         setRequest]         = useState<BookingRequest | null>(null);
  const [loading,         setLoading]         = useState(true);
  const [fetchError,      setFetchError]      = useState<string | null>(null);
  const [notes,           setNotes]           = useState('');
  const [savingNotes,     setSavingNotes]      = useState(false);
  const [updatingStatus,  setUpdatingStatus]  = useState<RequestStatus | null>(null);
  const [copied,          setCopied]          = useState(false);
  const [showDelete,      setShowDelete]      = useState(false);
  const [deleting,        setDeleting]        = useState(false);

  // ── Fetch ──────────────────────────────────────────────────────────────────

  const loadRequest = useCallback(async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const res = await fetch(`/api/requests/${id}`);
      if (res.status === 404) { setFetchError('not_found'); return; }
      if (!res.ok) throw new Error('Failed to load request');
      const { request: r } = await res.json();
      setRequest(r);
      setNotes(r.notes ?? '');
    } catch (err) {
      setFetchError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { loadRequest(); }, [loadRequest]);

  // ── Mutations ──────────────────────────────────────────────────────────────

  async function changeStatus(status: RequestStatus) {
    if (!request || updatingStatus) return;
    setUpdatingStatus(status);
    setRequest(prev => prev ? { ...prev, status } : prev);
    try {
      const res = await fetch(`/api/requests/${id}`, {
        method:  'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error('Update failed');
      const labels: Record<RequestStatus, string> = {
        confirmed: 'Booking confirmed ✓',
        cancelled: 'Request cancelled',
        completed: 'Marked as completed',
        pending:   'Reset to pending',
      };
      success(labels[status]);
    } catch (err) {
      setRequest(prev => prev ? { ...prev, status: request.status } : prev);
      toastError('Status update failed', err instanceof Error ? err.message : undefined);
    } finally {
      setUpdatingStatus(null);
    }
  }

  async function saveNotes() {
    setSavingNotes(true);
    try {
      const res = await fetch(`/api/requests/${id}`, {
        method:  'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ notes }),
      });
      if (!res.ok) throw new Error('Failed to save');
      success('Notes saved');
    } catch (err) {
      toastError('Failed to save notes', err instanceof Error ? err.message : undefined);
    } finally {
      setSavingNotes(false);
    }
  }

  async function handleDelete() {
    setDeleting(true);
    try {
      const res = await fetch(`/api/requests/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      success('Request deleted');
      router.push('/admin/requests');
    } catch (err) {
      setDeleting(false);
      setShowDelete(false);
      toastError('Delete failed', err instanceof Error ? err.message : undefined);
    }
  }

  function copyReply() {
    if (!request?.aiSuggestedReply) return;
    navigator.clipboard.writeText(request.aiSuggestedReply).then(() => {
      setCopied(true);
      info('Reply copied to clipboard');
      setTimeout(() => setCopied(false), 2500);
    });
  }

  // ── States ─────────────────────────────────────────────────────────────────

  if (loading) return <AdminLayout title="Loading…"><DetailSkeleton /></AdminLayout>;

  if (fetchError === 'not_found' || (!loading && !request)) {
    return (
      <AdminLayout title="Not Found">
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center mb-4">
            <AlertTriangle className="w-7 h-7 text-amber-500" />
          </div>
          <h2 className="text-base font-semibold text-slate-900 mb-2">Request not found</h2>
          <p className="text-sm text-slate-500 mb-6">It may have been deleted or the ID is incorrect.</p>
          <Link href="/admin/requests" className="btn-primary text-sm">Back to Requests</Link>
        </div>
      </AdminLayout>
    );
  }

  if (fetchError) {
    return (
      <AdminLayout title="Error">
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <AlertTriangle className="w-10 h-10 text-red-400 mb-4" />
          <p className="text-sm text-red-600 mb-4">{fetchError}</p>
          <button onClick={loadRequest} className="btn-secondary text-sm gap-2">
            <RefreshCw className="w-3.5 h-3.5" /> Retry
          </button>
        </div>
      </AdminLayout>
    );
  }

  const r = request!;

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <AdminLayout
      title={r.name}
      subtitle={`${r.serviceType} · received ${timeAgo(r.createdAt)}`}
      action={
        <Link href="/admin/requests" className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          All requests
        </Link>
      }
    >
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* ── Left column ─────────────────────────────────────────────── */}
        <div className="xl:col-span-2 space-y-5">

          {/* Customer card */}
          <Card>
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-100 to-violet-100 text-indigo-700 text-lg font-extrabold flex items-center justify-center flex-shrink-0">
                  {r.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 leading-tight">{r.name}</h2>
                  <p className="text-sm text-slate-500">{r.serviceType}</p>
                  <div className="flex gap-2 mt-2">
                    <StatusBadge status={r.status} />
                    <PriorityBadge priority={r.priority} />
                  </div>
                </div>
              </div>
              <span className="text-xs text-slate-400 font-mono bg-zinc-50 border border-zinc-200 rounded-lg px-2.5 py-1.5 hidden sm:block">
                {r.id}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { icon: Mail,        label: 'Email',          value: r.email,    href: `mailto:${r.email}` },
                { icon: Phone,       label: 'Phone',          value: r.phone || '—', href: r.phone ? `tel:${r.phone}` : undefined },
                { icon: CalendarDays,label: 'Preferred Date', value: formatDate(r.preferredDate) },
                { icon: Clock,       label: 'Preferred Time', value: formatTime(r.preferredTime) },
                { icon: Users,       label: 'Guests',         value: `${r.guests} ${r.guests === 1 ? 'person' : 'people'}` },
                { icon: Tag,         label: 'Category',       value: null, badge: <CategoryBadge category={r.category} /> },
              ].map(({ icon: Icon, label, value, href, badge }) => (
                <div key={label} className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 border border-zinc-100">
                  <div className="w-8 h-8 rounded-lg bg-white border border-zinc-200 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{label}</p>
                    {badge ?? (
                      href
                        ? <a href={href} className="text-sm text-indigo-600 hover:underline truncate block">{value}</a>
                        : <p className="text-sm font-medium text-slate-700 truncate">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Original message */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-4 h-4 text-slate-500" />
              <h3 className="text-sm font-semibold text-slate-900">Customer Message</h3>
            </div>
            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{r.message}</p>
            </div>
          </Card>

          {/* AI Analysis */}
          <Card>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-white" aria-hidden />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">AI Analysis</h3>
                <p className="text-xs text-slate-500">Generated automatically by BookingAI</p>
              </div>
            </div>

            {/* Summary */}
            <div className="mb-5">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Summary</p>
              <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100">
                <p className="text-sm text-indigo-900 leading-relaxed">{r.aiSummary || 'No summary generated.'}</p>
              </div>
            </div>

            {/* Category + Priority row */}
            <div className="flex gap-6 mb-5">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Category</p>
                <CategoryBadge category={r.category} />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Priority</p>
                <PriorityBadge priority={r.priority} />
              </div>
            </div>

            {/* Suggested reply */}
            {r.aiSuggestedReply && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Suggested Reply</p>
                  <button
                    onClick={copyReply}
                    className="flex items-center gap-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
                  >
                    {copied
                      ? <><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Copied!</>
                      : <><Copy className="w-3.5 h-3.5" /> Copy reply</>
                    }
                  </button>
                </div>
                <div className="p-4 rounded-xl bg-violet-50 border border-violet-100">
                  <p className="text-sm text-violet-900 leading-relaxed italic">&quot;{r.aiSuggestedReply}&quot;</p>
                </div>
                <a
                  href={`mailto:${r.email}?subject=Re: ${encodeURIComponent(r.serviceType)} Request&body=${encodeURIComponent(r.aiSuggestedReply)}`}
                  className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border-2 border-dashed border-indigo-200 text-indigo-600 text-sm font-medium hover:bg-indigo-50 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Send via email client
                </a>
              </div>
            )}
          </Card>

          {/* Internal notes */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <StickyNote className="w-4 h-4 text-slate-500" />
              <h3 className="text-sm font-semibold text-slate-900">Internal Notes</h3>
              <span className="text-xs text-slate-400 ml-1">(not visible to customer)</span>
            </div>
            <textarea
              rows={4}
              placeholder="Add internal notes, follow-up actions, or team reminders…"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="form-input resize-none"
            />
            <div className="flex justify-end mt-3">
              <button
                onClick={saveNotes}
                disabled={savingNotes || notes === r.notes}
                className="btn-secondary text-sm gap-2 disabled:opacity-50"
              >
                {savingNotes ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                {savingNotes ? 'Saving…' : 'Save Notes'}
              </button>
            </div>
          </Card>
        </div>

        {/* ── Right column ─────────────────────────────────────────────── */}
        <div className="space-y-5">

          {/* Status controls */}
          <Card>
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Update Status</h3>
            <div className="space-y-2">
              {(
                [
                  { status: 'confirmed' as RequestStatus, label: 'Confirm Booking',   icon: CheckCircle2, color: 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100' },
                  { status: 'completed' as RequestStatus, label: 'Mark as Completed', icon: CheckCircle2, color: 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100' },
                  { status: 'pending'   as RequestStatus, label: 'Set to Pending',    icon: Clock,        color: 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100' },
                  { status: 'cancelled' as RequestStatus, label: 'Cancel Request',    icon: XCircle,      color: 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100' },
                ] as const
              )
                .filter(btn => btn.status !== r.status)
                .map(({ status: s, label, icon: Icon, color }) => (
                  <button
                    key={s}
                    onClick={() => changeStatus(s)}
                    disabled={updatingStatus !== null}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-semibold transition-colors disabled:opacity-60 ${color}`}
                  >
                    {updatingStatus === s
                      ? <Loader2 className="w-4 h-4 animate-spin" />
                      : <Icon className="w-4 h-4" />
                    }
                    {label}
                  </button>
                ))}
            </div>
          </Card>

          {/* Metadata */}
          <Card>
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Request Details</h3>
            <div className="space-y-3">
              {[
                { label: 'Request ID',  value: r.id.slice(0, 8) + '…' },
                { label: 'Received',    value: timeAgo(r.createdAt) },
                { label: 'Timestamp',   value: new Date(r.createdAt).toLocaleString() },
                { label: 'Source',      value: 'Public booking form' },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between gap-3">
                  <span className="text-xs text-slate-500">{label}</span>
                  <span className="text-xs font-medium text-slate-900 text-right">{value}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Danger zone */}
          <Card>
            <h3 className="text-sm font-semibold text-red-600 mb-3">Danger Zone</h3>
            {!showDelete ? (
              <button
                onClick={() => setShowDelete(true)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-red-200 text-red-600 text-sm font-medium hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete Request
              </button>
            ) : (
              <div className="space-y-2.5">
                <p className="text-xs text-slate-600 text-center">
                  This will permanently delete the request. This cannot be undone.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => setShowDelete(false)} className="btn-secondary text-xs py-2">Cancel</button>
                  <button onClick={handleDelete} disabled={deleting} className="btn-danger text-xs py-2 gap-1.5">
                    {deleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                    Delete
                  </button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
