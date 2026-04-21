'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ChevronLeft, ChevronRight, CalendarDays, Users,
  Clock, RefreshCw, AlertTriangle,
} from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card } from '@/components/ui/Card';
import { StatusBadge } from '@/components/ui/Badge';
import { useRequests } from '@/hooks/useRequests';
import { formatTime, getInitials } from '@/utils/helpers';
import { cn } from '@/utils/cn';
import { BookingRequest } from '@/types';

// ── Constants ─────────────────────────────────────────────────────────────────

const DAYS   = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const STATUS_COLORS: Record<BookingRequest['status'], string> = {
  confirmed: 'bg-emerald-100 border-emerald-300 text-emerald-800',
  pending:   'bg-amber-100 border-amber-300 text-amber-800',
  cancelled: 'bg-red-100 border-red-200 text-red-700 opacity-60',
  completed: 'bg-slate-100 border-slate-300 text-slate-600',
};

// ── Calendar skeleton ─────────────────────────────────────────────────────────

function CalendarSkeleton() {
  return (
    <div className="grid grid-cols-7 animate-pulse">
      {Array.from({ length: 35 }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'min-h-[90px] p-1.5 border-b border-r border-zinc-100',
            (i + 1) % 7 === 0 && 'border-r-0',
          )}
        >
          <div className="w-6 h-6 bg-zinc-200 rounded-full mb-1.5" />
          {i % 4 === 0 && <div className="h-4 bg-zinc-100 rounded mb-0.5" />}
          {i % 6 === 1 && <div className="h-4 bg-zinc-100 rounded" />}
        </div>
      ))}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function CalendarPage() {
  const realToday = new Date();
  const [currentDate, setCurrentDate] = useState(
    new Date(realToday.getFullYear(), realToday.getMonth(), 1)
  );

  const { requests, loading, error, refresh } = useRequests();

  const year  = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay    = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const isThisMonth =
    year === realToday.getFullYear() && month === realToday.getMonth();

  // ── Navigation ──────────────────────────────────────────────────────────────

  function prevMonth() { setCurrentDate(new Date(year, month - 1, 1)); }
  function nextMonth() { setCurrentDate(new Date(year, month + 1, 1)); }
  function goToday()   { setCurrentDate(new Date(realToday.getFullYear(), realToday.getMonth(), 1)); }

  // ── Grid ────────────────────────────────────────────────────────────────────

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  function getRequestsForDay(day: number | null): BookingRequest[] {
    if (!day) return [];
    const dateStr =
      `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return requests.filter((r) => r.preferredDate === dateStr);
  }

  function isToday(day: number | null) {
    return (
      day !== null &&
      day   === realToday.getDate() &&
      month === realToday.getMonth() &&
      year  === realToday.getFullYear()
    );
  }

  // ── Upcoming list ────────────────────────────────────────────────────────────

  const todayStr = realToday.toISOString().slice(0, 10);
  const upcoming = [...requests]
    .filter((r) => r.status !== 'cancelled' && r.preferredDate >= todayStr)
    .sort((a, b) =>
      (a.preferredDate + a.preferredTime).localeCompare(b.preferredDate + b.preferredTime)
    )
    .slice(0, 8);

  // ── Stats for header ─────────────────────────────────────────────────────────

  const monthStr  = `${year}-${String(month + 1).padStart(2, '0')}`;
  const thisMonth = requests.filter((r) => r.preferredDate.startsWith(monthStr));
  const confirmed = thisMonth.filter((r) => r.status === 'confirmed').length;
  const pending   = thisMonth.filter((r) => r.status === 'pending').length;

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <AdminLayout
      title="Calendar"
      subtitle={`${MONTHS[month]} ${year}`}
      action={
        <button
          onClick={refresh}
          disabled={loading}
          className="btn-ghost text-sm gap-1.5"
          title="Refresh"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">Refresh</span>
        </button>
      }
    >
      {/* ── Month summary pills ──────────────────────────────────────────────── */}
      {!loading && thisMonth.length > 0 && (
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="text-xs text-slate-500 mr-1">
            {MONTHS[month]}:
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700">
            {thisMonth.length} booking{thisMonth.length !== 1 ? 's' : ''}
          </span>
          {confirmed > 0 && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-700">
              {confirmed} confirmed
            </span>
          )}
          {pending > 0 && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-medium text-amber-700">
              {pending} pending
            </span>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* ── Calendar grid ────────────────────────────────────────────────── */}
        <div className="xl:col-span-2">
          <Card padding="none">

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100">
              <button
                onClick={prevMonth}
                className="p-2 rounded-lg hover:bg-zinc-100 transition-colors text-slate-600"
                aria-label="Previous month"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2.5">
                <h2 className="text-base font-semibold text-slate-900">
                  {MONTHS[month]} {year}
                </h2>
                {!isThisMonth && (
                  <button
                    onClick={goToday}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 px-2.5 py-1 rounded-full bg-indigo-50 hover:bg-indigo-100 transition-colors"
                  >
                    Today
                  </button>
                )}
              </div>

              <button
                onClick={nextMonth}
                className="p-2 rounded-lg hover:bg-zinc-100 transition-colors text-slate-600"
                aria-label="Next month"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Day-of-week headers */}
            <div className="grid grid-cols-7 border-b border-zinc-100">
              {DAYS.map((d) => (
                <div
                  key={d}
                  className="px-2 py-2.5 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider"
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Cells */}
            {loading ? (
              <CalendarSkeleton />
            ) : (
              <div className="grid grid-cols-7">
                {cells.map((day, i) => {
                  const dayRequests = getRequestsForDay(day);
                  const todayCell  = isToday(day);
                  return (
                    <div
                      key={i}
                      className={cn(
                        'min-h-[90px] p-1.5 border-b border-r border-zinc-100 hover:bg-zinc-50/70 transition-colors',
                        !day && 'bg-zinc-50/40',
                        (i + 1) % 7 === 0 && 'border-r-0',
                      )}
                    >
                      {day && (
                        <>
                          <div
                            className={cn(
                              'flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold mb-1 select-none',
                              todayCell
                                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/30'
                                : 'text-slate-600',
                            )}
                          >
                            {day}
                          </div>
                          <div className="space-y-0.5">
                            {dayRequests.slice(0, 3).map((r) => (
                              <Link
                                key={r.id}
                                href={`/admin/requests/${r.id}`}
                                className={cn(
                                  'block px-1.5 py-0.5 rounded text-[9px] font-medium border truncate transition-opacity hover:opacity-75',
                                  STATUS_COLORS[r.status],
                                )}
                                title={`${r.name} — ${r.serviceType} @ ${r.preferredTime}`}
                              >
                                {r.preferredTime} {r.name.split(' ')[0]}
                              </Link>
                            ))}
                            {dayRequests.length > 3 && (
                              <p className="text-[9px] text-slate-400 pl-1">
                                +{dayRequests.length - 3} more
                              </p>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Legend */}
            <div className="px-5 py-3.5 border-t border-zinc-100 flex items-center gap-5 flex-wrap">
              {[
                { label: 'Confirmed', cls: 'bg-emerald-200' },
                { label: 'Pending',   cls: 'bg-amber-200'   },
                { label: 'Cancelled', cls: 'bg-red-200'     },
                { label: 'Completed', cls: 'bg-slate-200'   },
              ].map(({ label, cls }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <div className={`w-3 h-3 rounded-sm ${cls}`} />
                  <span className="text-xs text-slate-500">{label}</span>
                </div>
              ))}
              {!loading && (
                <span className="ml-auto text-xs text-slate-400">
                  {requests.length} total request{requests.length !== 1 ? 's' : ''}
                </span>
              )}
            </div>
          </Card>
        </div>

        {/* ── Upcoming panel ───────────────────────────────────────────────── */}
        <div>
          <Card>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600">
                <CalendarDays className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Upcoming Schedule</h3>
                <p className="text-xs text-slate-500">
                  {loading ? 'Loading…' : `${upcoming.length} upcoming`}
                </p>
              </div>
            </div>

            {/* Loading skeleton */}
            {loading && (
              <div className="space-y-3 animate-pulse">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl border border-zinc-100">
                    <div className="w-8 h-8 rounded-full bg-zinc-200 flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3.5 bg-zinc-200 rounded w-3/4" />
                      <div className="h-3   bg-zinc-100 rounded w-1/2" />
                      <div className="h-3   bg-zinc-100 rounded w-2/3" />
                    </div>
                    <div className="w-16 h-5 bg-zinc-100 rounded-full flex-shrink-0" />
                  </div>
                ))}
              </div>
            )}

            {/* Error */}
            {!loading && error && (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <AlertTriangle className="w-8 h-8 text-red-300 mb-3" />
                <p className="text-sm text-red-500 mb-3">{error}</p>
                <button
                  onClick={refresh}
                  className="text-xs font-medium text-indigo-600 hover:text-indigo-700"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Empty */}
            {!loading && !error && upcoming.length === 0 && (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <CalendarDays className="w-8 h-8 text-zinc-300 mb-2" />
                <p className="text-sm font-medium text-slate-500">No upcoming bookings</p>
                <p className="text-xs text-slate-400 mt-1">
                  Future bookings will appear here automatically.
                </p>
              </div>
            )}

            {/* List */}
            {!loading && !error && upcoming.length > 0 && (
              <div className="space-y-2.5">
                {upcoming.map((req) => (
                  <Link
                    key={req.id}
                    href={`/admin/requests/${req.id}`}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-zinc-50 transition-colors group border border-zinc-100 hover:border-indigo-200"
                  >
                    {/* Avatar */}
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex-shrink-0">
                      {getInitials(req.name)}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors truncate">
                        {req.name}
                      </p>
                      <p className="text-xs text-slate-500 truncate">{req.serviceType}</p>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="flex items-center gap-1 text-[11px] text-slate-500">
                          <CalendarDays className="w-3 h-3" />
                          {new Date(req.preferredDate + 'T00:00:00').toLocaleDateString('en-US', {
                            month: 'short', day: 'numeric',
                          })}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] text-slate-500">
                          <Clock className="w-3 h-3" />
                          {formatTime(req.preferredTime)}
                        </span>
                        {req.guests > 1 && (
                          <span className="flex items-center gap-1 text-[11px] text-slate-500">
                            <Users className="w-3 h-3" />
                            {req.guests}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Status */}
                    <StatusBadge status={req.status} />
                  </Link>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
