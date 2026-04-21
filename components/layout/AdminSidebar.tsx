'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  LayoutDashboard,
  Inbox,
  CalendarDays,
  Settings,
  LogOut,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { BookingRequest } from '@/types';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [pendingCount, setPendingCount] = useState<number | null>(null);
  const [totalCount,   setTotalCount]   = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/requests')
      .then(r => r.ok ? r.json() : null)
      .then((data: { requests: BookingRequest[] } | null) => {
        if (!data?.requests) return;
        setPendingCount(data.requests.filter(r => r.status === 'pending').length);
        setTotalCount(data.requests.length);
      })
      .catch(() => {});
  }, [pathname]); // re-fetch when navigating within admin

  function handleLogout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_authenticated');
    }
    router.push('/admin/login');
  }

  const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/requests',  label: 'Requests',  icon: Inbox, badge: pendingCount },
    { href: '/admin/calendar',  label: 'Calendar',  icon: CalendarDays },
    { href: '/admin/settings',  label: 'Settings',  icon: Settings },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-zinc-200 flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 h-16 border-b border-zinc-100">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="text-sm font-bold text-slate-900 leading-tight">BookingAI</p>
          <p className="text-[10px] text-slate-400 leading-tight">Admin Dashboard</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <div className="mb-4">
          <p className="px-3 mb-2 text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
            Main
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'sidebar-link group relative',
                  isActive ? 'sidebar-link-active' : 'sidebar-link-inactive'
                )}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="flex-1">{item.label}</span>
                {item.badge != null && item.badge > 0 && (
                  <span className="flex items-center justify-center h-5 min-w-[20px] px-1.5 text-[10px] font-bold rounded-full bg-indigo-100 text-indigo-700">
                    {item.badge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-indigo-600 rounded-r-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* AI Status */}
        <div className="mx-1 mt-4 p-3 rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center justify-center w-6 h-6 rounded-md bg-indigo-600">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <p className="text-xs font-semibold text-indigo-900">AI Assistant</p>
            <span className="ml-auto flex items-center gap-1 text-[10px] font-medium text-emerald-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Active
            </span>
          </div>
          <p className="text-[11px] text-indigo-700 leading-relaxed">
            {totalCount != null
              ? <>AI has analyzed <span className="font-semibold">{totalCount} request{totalCount !== 1 ? 's' : ''}</span>.</>
              : 'AI analysis ready.'
            }
          </p>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-zinc-100">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all duration-150 group"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
        <div className="mt-2 px-3 py-2.5 rounded-lg bg-zinc-50">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-bold">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-900 truncate">Admin User</p>
              <p className="text-[10px] text-slate-400 truncate">admin@bookingai.com</p>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>
      </div>
    </aside>
  );
}
