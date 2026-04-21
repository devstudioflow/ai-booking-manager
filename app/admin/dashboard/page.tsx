'use client';

import Link from 'next/link';
import {
  Inbox, CalendarDays, CheckCircle2, Clock, XCircle,
  ArrowRight, RefreshCw, AlertTriangle,
} from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';
import StatsCard from '@/components/ui/StatsCard';
import { StatsCardSkeleton, RequestsTableSkeleton } from '@/components/ui/Skeleton';
import RequestsTable from '@/components/admin/RequestsTable';
import AIInsightsPanel from '@/components/admin/AIInsightsPanel';
import UpcomingBookings from '@/components/admin/UpcomingBookings';
import { Card } from '@/components/ui/Card';
import { useRequests } from '@/hooks/useRequests';

// ── Empty state ───────────────────────────────────────────────────────────────

function EmptyDashboard() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mb-4">
        <Inbox className="w-8 h-8 text-indigo-400" />
      </div>
      <h3 className="text-base font-semibold text-slate-900 mb-2">No requests yet</h3>
      <p className="text-sm text-slate-500 mb-6 max-w-xs">
        Once customers submit booking requests they&apos;ll appear here with AI-generated summaries.
      </p>
      <Link href="/book" className="btn-primary text-sm px-5 py-2.5">
        Submit a test booking
      </Link>
    </div>
  );
}

// ── Error state ───────────────────────────────────────────────────────────────

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
        <AlertTriangle className="w-7 h-7 text-red-400" />
      </div>
      <p className="text-sm font-medium text-slate-900 mb-1">Failed to load requests</p>
      <p className="text-xs text-slate-500 mb-5">{message}</p>
      <button onClick={onRetry} className="btn-secondary text-sm px-5 py-2.5 gap-2">
        <RefreshCw className="w-3.5 h-3.5" />
        Retry
      </button>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { requests, loading, error, refresh, updateStatus, remove } = useRequests();

  const today     = new Date().toISOString().slice(0, 10);
  const total     = requests.length;
  const todayCount = requests.filter(r => r.preferredDate === today).length;
  const confirmed = requests.filter(r => r.status === 'confirmed').length;
  const pending   = requests.filter(r => r.status === 'pending').length;
  const cancelled = requests.filter(r => r.status === 'cancelled').length;

  const recent = [...requests]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6);

  const subtitle = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric',
  });

  return (
    <AdminLayout
      title="Dashboard"
      subtitle={subtitle}
      action={
        <button
          onClick={refresh}
          disabled={loading}
          className="btn-ghost text-sm gap-1.5"
          title="Refresh data"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">Refresh</span>
        </button>
      }
    >
      {/* ── Stats row ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => <StatsCardSkeleton key={i} />)
        ) : (
          <>
            <StatsCard
              label="Total Requests"
              value={total}
              change="+12%"
              trend="up"
              icon={<Inbox className="w-5 h-5" />}
              iconBg="bg-indigo-50"
              iconColor="text-indigo-600"
            />
            <StatsCard
              label="Today's Bookings"
              value={todayCount}
              icon={<CalendarDays className="w-5 h-5" />}
              iconBg="bg-blue-50"
              iconColor="text-blue-600"
            />
            <StatsCard
              label="Confirmed"
              value={confirmed}
              change="+5%"
              trend="up"
              icon={<CheckCircle2 className="w-5 h-5" />}
              iconBg="bg-emerald-50"
              iconColor="text-emerald-600"
            />
            <StatsCard
              label="Pending"
              value={pending}
              icon={<Clock className="w-5 h-5" />}
              iconBg="bg-amber-50"
              iconColor="text-amber-600"
            />
            <StatsCard
              label="Cancelled"
              value={cancelled}
              icon={<XCircle className="w-5 h-5" />}
              iconBg="bg-red-50"
              iconColor="text-red-500"
            />
          </>
        )}
      </div>

      {/* ── Error ────────────────────────────────────────────────────────── */}
      {error && !loading && (
        <ErrorState message={error} onRetry={refresh} />
      )}

      {/* ── Empty ────────────────────────────────────────────────────────── */}
      {!loading && !error && total === 0 && <EmptyDashboard />}

      {/* ── Main content ──────────────────────────────────────────────────── */}
      {(loading || total > 0) && !error && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Recent requests — 2/3 */}
          <div className="xl:col-span-2">
            <Card padding="none">
              <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-zinc-100">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Recent Requests</h3>
                  {!loading && (
                    <p className="text-xs text-slate-500 mt-0.5">
                      Latest {recent.length} of {total}
                    </p>
                  )}
                </div>
                <Link
                  href="/admin/requests"
                  className="flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-700"
                >
                  View all <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="px-5 pb-4 pt-1 overflow-x-auto">
                {loading ? (
                  <RequestsTableSkeleton rows={5} />
                ) : (
                  <RequestsTable
                    requests={recent}
                    onStatusChange={updateStatus}
                    onDelete={remove}
                    compact
                  />
                )}
              </div>
            </Card>
          </div>

          {/* Side panels — 1/3 */}
          <div className="space-y-6">
            {loading ? (
              <>
                <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-5 space-y-3 animate-pulse">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-zinc-200" />
                    <div className="space-y-1.5">
                      <div className="w-24 h-3.5 bg-zinc-200 rounded-full" />
                      <div className="w-16 h-3 bg-zinc-200 rounded-full" />
                    </div>
                  </div>
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-12 bg-zinc-100 rounded-xl" />
                  ))}
                </div>
                <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-5 space-y-3 animate-pulse">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-16 bg-zinc-100 rounded-xl" />
                  ))}
                </div>
              </>
            ) : (
              <>
                <AIInsightsPanel requests={requests} />
                <UpcomingBookings requests={requests} />
              </>
            )}
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
