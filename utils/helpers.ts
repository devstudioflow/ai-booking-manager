import { RequestStatus, RequestPriority, RequestCategory } from '@/types';

export function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  try {
    // Date-only strings (YYYY-MM-DD) are parsed as UTC by the JS engine,
    // which causes off-by-one day errors in western timezones.
    // Appending T00:00:00 forces local-time parsing.
    const normalized = /^\d{4}-\d{2}-\d{2}$/.test(dateStr)
      ? dateStr + 'T00:00:00'
      : dateStr;
    return new Date(normalized).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

export function formatTime(timeStr: string): string {
  if (!timeStr) return '';
  try {
    const [hourStr, minuteStr] = timeStr.split(':');
    const hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    const displayMinute = minute.toString().padStart(2, '0');
    return `${displayHour}:${displayMinute} ${ampm}`;
  } catch {
    return timeStr;
  }
}

export function getStatusColor(status: RequestStatus): string {
  switch (status) {
    case 'confirmed':
      return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    case 'pending':
      return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'cancelled':
      return 'bg-red-100 text-red-700 border-red-200';
    case 'completed':
      return 'bg-slate-100 text-slate-600 border-slate-200';
    default:
      return 'bg-slate-100 text-slate-600 border-slate-200';
  }
}

export function getPriorityColor(priority: RequestPriority): string {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-700 border-red-200';
    case 'medium':
      return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'low':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    default:
      return 'bg-slate-100 text-slate-600 border-slate-200';
  }
}

export function getCategoryLabel(category: RequestCategory): string {
  switch (category) {
    case 'booking':
      return 'Booking';
    case 'cancellation':
      return 'Cancellation';
    case 'reschedule':
      return 'Reschedule';
    case 'pricing_question':
      return 'Pricing';
    case 'general_inquiry':
      return 'General Inquiry';
    case 'urgent_request':
      return 'Urgent';
    default:
      return 'Unknown';
  }
}

export function getInitials(name: string): string {
  if (!name) return '??';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function timeAgo(dateStr: string): string {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSeconds < 60) return 'just now';
    if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    return formatDate(dateStr);
  } catch {
    return dateStr;
  }
}
