import { cn } from '@/utils/cn';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
}

const sizeStyles = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
};

export default function LoadingSpinner({ size = 'md', className, label }: LoadingSpinnerProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-3', className)}>
      <Loader2 className={cn('animate-spin text-indigo-600', sizeStyles[size])} />
      {label && <p className="text-sm text-slate-500 animate-pulse">{label}</p>}
    </div>
  );
}

export function PageLoader({ label = 'Loading...' }: { label?: string }) {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <LoadingSpinner size="lg" label={label} />
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 items-center p-4 bg-zinc-50 rounded-lg animate-pulse">
          <div className="w-8 h-8 bg-zinc-200 rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-zinc-200 rounded w-1/3" />
            <div className="h-3 bg-zinc-200 rounded w-1/5" />
          </div>
          <div className="h-5 w-20 bg-zinc-200 rounded-full" />
          <div className="h-5 w-16 bg-zinc-200 rounded-full" />
        </div>
      ))}
    </div>
  );
}
