import { cn } from '@/utils/cn';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatsCardProps {
  label: string;
  value: number | string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
  iconBg?: string;
  iconColor?: string;
  className?: string;
}

export default function StatsCard({
  label,
  value,
  change,
  trend,
  icon,
  iconBg = 'bg-indigo-50',
  iconColor = 'text-indigo-600',
  className,
}: StatsCardProps) {
  const trendColor = {
    up: 'text-emerald-600',
    down: 'text-red-500',
    neutral: 'text-slate-500',
  }[trend ?? 'neutral'];

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;

  return (
    <div className={cn('stat-card hover:shadow-md transition-shadow duration-200', className)}>
      <div className="flex items-center justify-between mb-3">
        <div className={cn('flex items-center justify-center w-10 h-10 rounded-xl', iconBg, iconColor)}>
          {icon}
        </div>
        {change && trend && (
          <div className={cn('flex items-center gap-1 text-xs font-medium', trendColor)}>
            <TrendIcon className="w-3.5 h-3.5" />
            <span>{change}</span>
          </div>
        )}
      </div>
      <div>
        <p className="text-2xl font-bold text-slate-900 tabular-nums">{value}</p>
        <p className="text-sm text-slate-500 mt-0.5">{label}</p>
      </div>
    </div>
  );
}
