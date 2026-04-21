'use client';

import { cn } from '@/utils/cn';
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const variantStyles = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
  danger: 'btn-danger',
  outline:
    'inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border-2 border-indigo-600 text-indigo-600 text-sm font-semibold hover:bg-indigo-50 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500',
};

const sizeStyles = {
  sm: 'text-xs px-3 py-1.5 gap-1.5',
  md: '',
  lg: 'text-base px-6 py-3',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, icon, iconPosition = 'left', className, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(variantStyles[variant], sizeStyles[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {!loading && icon && iconPosition === 'left' && icon}
        {children}
        {!loading && icon && iconPosition === 'right' && icon}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
