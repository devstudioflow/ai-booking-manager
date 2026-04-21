'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import { Sparkles } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

function SessionLoader() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center animate-pulse">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <p className="text-xs text-slate-500 font-medium">Verifying session…</p>
      </div>
    </div>
  );
}

export default function AdminLayout({ children, title, subtitle, action }: AdminLayoutProps) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const isAuth =
      typeof window !== 'undefined' && localStorage.getItem('admin_authenticated');
    if (!isAuth) {
      router.replace('/admin/login');
    } else {
      setChecking(false);
    }
  }, [router]);

  if (checking) return <SessionLoader />;

  return (
    <div className="min-h-screen bg-zinc-50">
      <AdminSidebar />
      <div className="ml-64">
        <AdminHeader title={title} subtitle={subtitle} action={action} />
        <main className="pt-16 min-h-screen">
          <div className="p-6 max-w-[1400px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
