import { cn } from '@/utils/cn';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-zinc-200/80',
        className
      )}
    />
  );
}

export function StatsCardSkeleton() {
  return (
    <div className="stat-card space-y-3">
      <div className="flex items-center justify-between">
        <Skeleton className="w-10 h-10 rounded-xl" />
        <Skeleton className="w-12 h-4 rounded-full" />
      </div>
      <div className="space-y-1.5">
        <Skeleton className="w-16 h-7 rounded-md" />
        <Skeleton className="w-24 h-3.5 rounded-full" />
      </div>
    </div>
  );
}

export function TableRowSkeleton({ cols = 7 }: { cols?: number }) {
  return (
    <tr className="border-b border-zinc-50">
      <td className="table-cell">
        <div className="flex items-center gap-3">
          <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />
          <div className="space-y-1.5">
            <Skeleton className="w-28 h-3.5 rounded-full" />
            <Skeleton className="w-20 h-3 rounded-full" />
          </div>
        </div>
      </td>
      {Array.from({ length: cols - 1 }).map((_, i) => (
        <td key={i} className="table-cell">
          <Skeleton className="w-20 h-4 rounded-full" />
        </td>
      ))}
    </tr>
  );
}

export function RequestsTableSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <table className="w-full min-w-[900px]">
      <thead>
        <tr className="border-b border-zinc-100">
          {['Customer', 'Service', 'Date', 'Category', 'Status', 'Priority', 'Received', 'Actions'].map(h => (
            <th key={h} className="table-header text-left">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: rows }).map((_, i) => (
          <TableRowSkeleton key={i} cols={8} />
        ))}
      </tbody>
    </table>
  );
}

export function CardSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-5 space-y-3">
      <Skeleton className="w-1/3 h-4 rounded-full" />
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className="w-full h-3.5 rounded-full" style={{ width: `${70 + i * 10}%` } as React.CSSProperties} />
      ))}
    </div>
  );
}
