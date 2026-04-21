'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, Check, X, Trash2, MoreHorizontal, ChevronUp, ChevronDown } from 'lucide-react';
import { BookingRequest, RequestStatus } from '@/types';
import { StatusBadge, PriorityBadge, CategoryBadge } from '@/components/ui/Badge';
import { formatDate, formatTime, getInitials, timeAgo } from '@/utils/helpers';
import { cn } from '@/utils/cn';

interface RequestsTableProps {
  requests: BookingRequest[];
  onStatusChange?: (id: string, status: RequestStatus) => void;
  onDelete?: (id: string) => void;
  compact?: boolean;
}

type SortKey = 'name' | 'createdAt' | 'priority' | 'preferredDate';
type SortDir = 'asc' | 'desc';

export default function RequestsTable({ requests, onStatusChange, onDelete, compact = false }: RequestsTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('createdAt');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  }

  const sorted = [...requests].sort((a, b) => {
    let aVal: string | number = a[sortKey] ?? '';
    let bVal: string | number = b[sortKey] ?? '';
    if (sortKey === 'priority') {
      const order = { high: 3, medium: 2, low: 1 };
      aVal = order[a.priority] ?? 0;
      bVal = order[b.priority] ?? 0;
    }
    if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  function SortIcon({ col }: { col: SortKey }) {
    if (sortKey !== col) return <ChevronUp className="w-3 h-3 opacity-25" />;
    return sortDir === 'asc' ? <ChevronUp className="w-3 h-3 text-indigo-600" /> : <ChevronDown className="w-3 h-3 text-indigo-600" />;
  }

  if (requests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-14 h-14 rounded-xl bg-zinc-100 flex items-center justify-center mb-4">
          <Eye className="w-6 h-6 text-zinc-400" />
        </div>
        <p className="text-sm font-medium text-slate-900 mb-1">No requests found</p>
        <p className="text-xs text-slate-500">Try adjusting your filters or search terms.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto -mx-1">
      <table className="w-full min-w-[900px]">
        <thead>
          <tr className="border-b border-zinc-100">
            {[
              { label: 'Customer', key: 'name' as SortKey },
              { label: 'Service', key: null },
              { label: 'Date / Time', key: 'preferredDate' as SortKey },
              { label: 'Category', key: null },
              { label: 'Status', key: null },
              { label: 'Priority', key: 'priority' as SortKey },
              ...(!compact ? [{ label: 'Received', key: 'createdAt' as SortKey }] : []),
              { label: 'Actions', key: null },
            ].map(({ label, key }) => (
              <th key={label} className="table-header text-left">
                {key ? (
                  <button
                    onClick={() => toggleSort(key)}
                    className="flex items-center gap-1 hover:text-slate-700 transition-colors"
                  >
                    {label}
                    <SortIcon col={key} />
                  </button>
                ) : (
                  label
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-50">
          {sorted.map((req) => (
            <tr key={req.id} className="hover:bg-zinc-50/60 transition-colors group">
              {/* Customer */}
              <td className="table-cell">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {getInitials(req.name)}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{req.name}</p>
                    <p className="text-xs text-slate-400">{req.email}</p>
                  </div>
                </div>
              </td>

              {/* Service */}
              <td className="table-cell">
                <span className="text-slate-700">{req.serviceType}</span>
              </td>

              {/* Date/Time */}
              <td className="table-cell">
                <p className="text-slate-700 font-medium">{formatDate(req.preferredDate)}</p>
                <p className="text-xs text-slate-400">{formatTime(req.preferredTime)}</p>
              </td>

              {/* Category */}
              <td className="table-cell">
                <CategoryBadge category={req.category} />
              </td>

              {/* Status */}
              <td className="table-cell">
                <StatusBadge status={req.status} />
              </td>

              {/* Priority */}
              <td className="table-cell">
                <PriorityBadge priority={req.priority} />
              </td>

              {/* Received (non-compact) */}
              {!compact && (
                <td className="table-cell">
                  <span className="text-slate-500 text-xs">{timeAgo(req.createdAt)}</span>
                </td>
              )}

              {/* Actions */}
              <td className="table-cell">
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link
                    href={`/admin/requests/${req.id}`}
                    className="p-1.5 rounded-md hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 transition-colors"
                    title="View"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </Link>
                  {onStatusChange && req.status === 'pending' && (
                    <button
                      onClick={() => onStatusChange(req.id, 'confirmed')}
                      className="p-1.5 rounded-md hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 transition-colors"
                      title="Confirm"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {onStatusChange && req.status !== 'cancelled' && (
                    <button
                      onClick={() => onStatusChange(req.id, 'cancelled')}
                      className="p-1.5 rounded-md hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
                      title="Cancel"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(req.id)}
                      className="p-1.5 rounded-md hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
