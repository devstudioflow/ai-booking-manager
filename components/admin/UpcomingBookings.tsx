import Link from 'next/link';
import { CalendarDays, Users, Clock, ArrowRight } from 'lucide-react';
import { BookingRequest } from '@/types';
import { Card, CardHeader } from '@/components/ui/Card';
import { StatusBadge } from '@/components/ui/Badge';
import { formatDate, formatTime, getInitials } from '@/utils/helpers';

interface UpcomingBookingsProps {
  requests: BookingRequest[];
}

export default function UpcomingBookings({ requests }: UpcomingBookingsProps) {
  const upcoming = [...requests]
    .filter((r) => r.status !== 'cancelled' && r.preferredDate >= new Date().toISOString().slice(0, 10))
    .sort((a, b) => (a.preferredDate + a.preferredTime).localeCompare(b.preferredDate + b.preferredTime))
    .slice(0, 6);

  return (
    <Card>
      <CardHeader
        title="Upcoming Bookings"
        subtitle={`${upcoming.length} scheduled ahead`}
        icon={<CalendarDays className="w-4 h-4" />}
        action={
          <Link href="/admin/calendar" className="text-xs font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
            View calendar
            <ArrowRight className="w-3 h-3" />
          </Link>
        }
      />

      {upcoming.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <CalendarDays className="w-8 h-8 text-zinc-300 mb-2" />
          <p className="text-sm text-slate-500">No upcoming bookings</p>
        </div>
      ) : (
        <div className="space-y-2">
          {upcoming.map((req) => (
            <Link
              key={req.id}
              href={`/admin/requests/${req.id}`}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-50 transition-colors group"
            >
              {/* Avatar */}
              <div className="flex items-center justify-center w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex-shrink-0">
                {getInitials(req.name)}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate group-hover:text-indigo-700 transition-colors">
                  {req.name}
                </p>
                <p className="text-xs text-slate-500 truncate">{req.serviceType}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="flex items-center gap-1 text-[11px] text-slate-500">
                    <CalendarDays className="w-3 h-3" />
                    {formatDate(req.preferredDate)}
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
  );
}
