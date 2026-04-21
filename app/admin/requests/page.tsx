'use client';

import { useMemo, useState } from 'react';
import {
  Search, X, Download, RefreshCw, AlertTriangle,
} from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';
import RequestsTable from '@/components/admin/RequestsTable';
import { Card } from '@/components/ui/Card';
import { RequestsTableSkeleton } from '@/components/ui/Skeleton';
import { useRequests } from '@/hooks/useRequests';
import { BookingRequest, RequestCategory, RequestPriority, RequestStatus } from '@/types';
import { cn } from '@/utils/cn';

// ── Filter config ─────────────────────────────────────────────────────────────

const STATUS_OPTS: { label: string; value: RequestStatus | 'all' }[] = [
  { label: 'All',       value: 'all'       },
  { label: 'Pending',   value: 'pending'   },
  { label: 'Confirmed', value: 'confirmed' },
  { label: 'Cancelled', value: 'cancelled' },
  { label: 'Completed', value: 'completed' },
];

const CATEGORY_OPTS: { label: string; value: RequestCategory | 'all' }[] = [
  { label: 'All Categories',  value: 'all'              },
  { label: 'Booking',         value: 'booking'          },
  { label: 'Cancellation',    value: 'cancellation'     },
  { label: 'Reschedule',      value: 'reschedule'       },
  { label: 'Pricing',         value: 'pricing_question' },
  { label: 'General Inquiry', value: 'general_inquiry'  },
  { label: 'Urgent',          value: 'urgent_request'   },
];

const PRIORITY_OPTS: { label: string; value: RequestPriority | 'all' }[] = [
  { label: 'All Priorities', value: 'all'    },
  { label: 'High',           value: 'high'   },
  { label: 'Medium',         value: 'medium' },
  { label: 'Low',            value: 'low'    },
];

// ── Filter helper ─────────────────────────────────────────────────────────────

function applyFilters(
  requests: BookingRequest[],
  {
    search, status, category, priority,
  }: {
    search: string;
    status:   RequestStatus  | 'all';
    category: RequestCategory | 'all';
    priority: RequestPriority | 'all';
  }
): BookingRequest[] {
  const q = search.toLowerCase().trim();
  return requests.filter(r => {
    if (q && ![r.name, r.email, r.serviceType, r.message].some(v => v.toLowerCase().includes(q))) return false;
    if (status   !== 'all' && r.status   !== status)   return false;
    if (category !== 'all' && r.category !== category) return false;
    if (priority !== 'all' && r.priority !== priority) return false;
    return true;
  });
}

// ── Export CSV ────────────────────────────────────────────────────────────────

function exportCSV(requests: BookingRequest[]) {
  const headers = ['ID','Name','Email','Phone','Service','Date','Time','Guests','Status','Category','Priority','Created'];
  const rows = requests.map(r => [
    r.id, r.name, r.email, r.phone,
    r.serviceType, r.preferredDate, r.preferredTime, r.guests,
    r.status, r.category, r.priority,
    new Date(r.createdAt).toLocaleString(),
  ].map(v => `"${String(v).replace(/"/g, '""')}"`).join(','));

  const csv  = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `requests-${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function RequestsPage() {
  const { requests, loading, error, refresh, updateStatus, remove } = useRequests();

  const [search,   setSearch]   = useState('');
  const [status,   setStatus]   = useState<RequestStatus | 'all'>('all');
  const [category, setCategory] = useState<RequestCategory | 'all'>('all');
  const [priority, setPriority] = useState<RequestPriority | 'all'>('all');

  const filtered = useMemo(
    () => applyFilters(requests, { search, status, category, priority }),
    [requests, search, status, category, priority]
  );

  const hasFilters = search || status !== 'all' || category !== 'all' || priority !== 'all';

  function clearFilters() {
    setSearch(''); setStatus('all'); setCategory('all'); setPriority('all');
  }

  return (
    <AdminLayout
      title="Requests"
      subtitle={loading ? 'Loading…' : `${filtered.length} of ${requests.length} requests`}
      action={
        <button onClick={refresh} disabled={loading} className="btn-ghost text-sm gap-1.5">
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">Refresh</span>
        </button>
      }
    >
      {/* ── Search + filters ─────────────────────────────────────────────── */}
      <div className="mb-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by name, email, service…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-8 py-2.5 rounded-lg border border-zinc-300 text-sm text-slate-700 placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <select
          value={category}
          onChange={e => setCategory(e.target.value as RequestCategory | 'all')}
          className="px-3 py-2.5 rounded-lg border border-zinc-300 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
        >
          {CATEGORY_OPTS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>

        <select
          value={priority}
          onChange={e => setPriority(e.target.value as RequestPriority | 'all')}
          className="px-3 py-2.5 rounded-lg border border-zinc-300 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
        >
          {PRIORITY_OPTS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>

        {hasFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-lg border border-red-200 text-red-600 text-sm font-medium hover:bg-red-50 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            Clear
          </button>
        )}
      </div>

      {/* ── Status tabs ──────────────────────────────────────────────────── */}
      <div className="mb-5 flex gap-2 flex-wrap">
        {STATUS_OPTS.map(opt => {
          const count = opt.value === 'all'
            ? requests.length
            : requests.filter(r => r.status === opt.value).length;
          return (
            <button
              key={opt.value}
              onClick={() => setStatus(opt.value)}
              className={cn(
                'flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all',
                status === opt.value
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-white text-slate-600 border-zinc-300 hover:border-indigo-300 hover:text-indigo-600'
              )}
            >
              {opt.label}
              <span className={cn(
                'px-1.5 py-0.5 rounded-full text-[10px] font-bold',
                status === opt.value ? 'bg-indigo-500 text-white' : 'bg-zinc-100 text-slate-500'
              )}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Error ────────────────────────────────────────────────────────── */}
      {error && !loading && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-200 mb-4">
          <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-700">{error}</p>
          <button onClick={refresh} className="ml-auto text-xs font-medium text-red-600 hover:text-red-800">Retry</button>
        </div>
      )}

      {/* ── Table card ───────────────────────────────────────────────────── */}
      <Card padding="none">
        <div className="px-5 pt-4 pb-1 overflow-x-auto">
          {loading ? (
            <RequestsTableSkeleton rows={8} />
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-12 h-12 rounded-xl bg-zinc-100 flex items-center justify-center mb-3">
                <Search className="w-5 h-5 text-zinc-400" />
              </div>
              <p className="text-sm font-medium text-slate-900 mb-1">
                {hasFilters ? 'No matching requests' : 'No requests yet'}
              </p>
              <p className="text-xs text-slate-500">
                {hasFilters ? 'Try adjusting your search or filters.' : 'Requests will appear here once customers submit the booking form.'}
              </p>
              {hasFilters && (
                <button onClick={clearFilters} className="mt-4 text-xs font-medium text-indigo-600 hover:text-indigo-700">
                  Clear all filters
                </button>
              )}
            </div>
          ) : (
            <RequestsTable
              requests={filtered}
              onStatusChange={updateStatus}
              onDelete={remove}
            />
          )}
        </div>

        {!loading && filtered.length > 0 && (
          <div className="px-5 py-3.5 border-t border-zinc-100 flex items-center justify-between">
            <p className="text-xs text-slate-500">
              <span className="font-semibold text-slate-700">{filtered.length}</span> request{filtered.length !== 1 ? 's' : ''}
              {hasFilters && <span> (filtered from {requests.length})</span>}
            </p>
            <button
              onClick={() => exportCSV(filtered)}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-medium transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Export CSV
            </button>
          </div>
        )}
      </Card>
    </AdminLayout>
  );
}
