import { cn } from '@/utils/cn';
import { RequestStatus, RequestPriority, RequestCategory } from '@/types';

type BadgeVariant = 'status' | 'priority' | 'category' | 'default';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  status?: RequestStatus;
  priority?: RequestPriority;
  category?: RequestCategory;
  className?: string;
}

const statusStyles: Record<RequestStatus, string> = {
  confirmed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  cancelled: 'bg-red-50 text-red-700 border-red-200',
  completed: 'bg-slate-100 text-slate-600 border-slate-200',
};

const statusDots: Record<RequestStatus, string> = {
  confirmed: 'bg-emerald-500',
  pending: 'bg-amber-500',
  cancelled: 'bg-red-500',
  completed: 'bg-slate-400',
};

const priorityStyles: Record<RequestPriority, string> = {
  high: 'bg-red-50 text-red-700 border-red-200',
  medium: 'bg-amber-50 text-amber-700 border-amber-200',
  low: 'bg-blue-50 text-blue-700 border-blue-200',
};

const categoryStyles: Record<RequestCategory, string> = {
  booking: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  cancellation: 'bg-red-50 text-red-700 border-red-200',
  reschedule: 'bg-violet-50 text-violet-700 border-violet-200',
  pricing_question: 'bg-cyan-50 text-cyan-700 border-cyan-200',
  general_inquiry: 'bg-slate-100 text-slate-600 border-slate-200',
  urgent_request: 'bg-orange-50 text-orange-700 border-orange-200',
};

const categoryLabels: Record<RequestCategory, string> = {
  booking: 'Booking',
  cancellation: 'Cancellation',
  reschedule: 'Reschedule',
  pricing_question: 'Pricing',
  general_inquiry: 'General',
  urgent_request: 'Urgent',
};

export function StatusBadge({ status }: { status: RequestStatus }) {
  return (
    <span className={cn('badge', statusStyles[status])}>
      <span className={cn('w-1.5 h-1.5 rounded-full', statusDots[status])} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export function PriorityBadge({ priority }: { priority: RequestPriority }) {
  const arrows: Record<RequestPriority, string> = {
    high: '↑',
    medium: '→',
    low: '↓',
  };
  return (
    <span className={cn('badge', priorityStyles[priority])}>
      <span>{arrows[priority]}</span>
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </span>
  );
}

export function CategoryBadge({ category }: { category: RequestCategory }) {
  return (
    <span className={cn('badge', categoryStyles[category])}>
      {categoryLabels[category]}
    </span>
  );
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span className={cn('badge bg-slate-100 text-slate-600 border-slate-200', className)}>
      {children}
    </span>
  );
}
