import { cn } from '@/utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-5',
  lg: 'p-6',
};

export function Card({ children, className, padding = 'md' }: CardProps) {
  return (
    <div className={cn('bg-white rounded-xl border border-zinc-200 shadow-sm', paddingStyles[padding], className)}>
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, action, icon, className }: CardHeaderProps) {
  return (
    <div className={cn('flex items-start justify-between mb-5', className)}>
      <div className="flex items-center gap-3">
        {icon && (
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600">
            {icon}
          </div>
        )}
        <div>
          <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
          {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

export function CardDivider({ className }: { className?: string }) {
  return <hr className={cn('border-zinc-100 my-4', className)} />;
}
