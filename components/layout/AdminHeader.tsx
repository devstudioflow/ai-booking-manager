'use client';

import { useState } from 'react';
import { Search, Bell, Plus, Command } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export default function AdminHeader({ title, subtitle, action }: AdminHeaderProps) {
  const [search, setSearch] = useState('');
  const router = useRouter();

  return (
    <header className="fixed top-0 left-64 right-0 z-40 h-16 bg-white/90 backdrop-blur-sm border-b border-zinc-200 flex items-center px-6 gap-4">
      {/* Title area */}
      <div className="flex-1 min-w-0">
        <h1 className="text-lg font-semibold text-slate-900 leading-tight truncate">{title}</h1>
        {subtitle && <p className="text-xs text-slate-500 leading-tight">{subtitle}</p>}
      </div>

      {/* Search */}
      <div className="relative hidden md:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search requests..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-56 lg:w-72 pl-9 pr-10 py-2 rounded-lg border border-zinc-200 text-sm text-slate-700 placeholder:text-slate-400 bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
        />
        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-[10px] text-slate-400 border border-zinc-200 rounded px-1 py-0.5 bg-white">
          <Command className="w-2.5 h-2.5" />
          <span>K</span>
        </div>
      </div>

      {/* Notifications */}
      <button className="relative flex items-center justify-center w-9 h-9 rounded-lg hover:bg-zinc-100 transition-colors">
        <Bell className="w-5 h-5 text-slate-600" />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border-2 border-white" />
      </button>

      {/* New request */}
      <button
        onClick={() => router.push('/book')}
        className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-colors shadow-sm"
      >
        <Plus className="w-3.5 h-3.5" />
        New Request
      </button>

      {action && <div>{action}</div>}
    </header>
  );
}
