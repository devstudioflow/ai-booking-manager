'use client';

import Link from 'next/link';
import { ArrowRight, Play, Sparkles, CheckCircle2, Zap, Shield } from 'lucide-react';

const stats = [
  { value: '10,000+', label: 'Businesses served' },
  { value: '2.4M', label: 'Requests managed' },
  { value: '98%', label: 'Customer satisfaction' },
  { value: '<2s', label: 'AI response time' },
];

const badges = [
  { icon: Zap, text: 'AI-Powered' },
  { icon: Shield, text: 'SOC 2 Compliant' },
  { icon: CheckCircle2, text: '99.9% Uptime' },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-indigo-100/60 blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-[500px] h-[500px] rounded-full bg-violet-100/50 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 w-[400px] h-[400px] rounded-full bg-blue-50/80 blur-3xl" />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(to right, #6366f1 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left column — copy */}
          <div>
            {/* Announcement badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-8">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI-Powered Booking Management</span>
              <ArrowRight className="w-3 h-3 ml-0.5" />
            </div>

            <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-6">
              Manage bookings{' '}
              <span className="gradient-text">with AI-powered</span>{' '}
              clarity.
            </h1>

            <p className="text-xl text-slate-600 leading-relaxed mb-8 max-w-xl">
              Centralize customer requests, automate intelligent summaries, classify inquiries instantly,
              and respond faster — all from one sleek admin dashboard.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3 mb-8">
              {badges.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-zinc-50 border border-zinc-200 rounded-full px-3 py-1.5">
                  <Icon className="w-3.5 h-3.5 text-indigo-600" />
                  {text}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/book"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-all duration-150 shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5"
              >
                Start Demo
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/admin/login"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-slate-700 font-semibold text-sm border border-zinc-300 hover:bg-zinc-50 transition-all duration-150 shadow-sm hover:-translate-y-0.5"
              >
                <Play className="w-4 h-4 text-indigo-600" />
                View Dashboard
              </Link>
            </div>

            {/* Social proof */}
            <p className="mt-6 text-sm text-slate-500">
              Trusted by{' '}
              <span className="font-semibold text-slate-700">10,000+ businesses</span>{' '}
              — restaurants, hotels, salons, clinics & more.
            </p>
          </div>

          {/* Right column — dashboard preview */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-zinc-200 bg-white">
              {/* Mock dashboard header */}
              <div className="bg-zinc-900 px-5 py-3.5 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex-1 mx-3 h-5 rounded bg-zinc-700/50 flex items-center justify-center">
                  <span className="text-[10px] text-zinc-400">admin.bookingai.com/dashboard</span>
                </div>
              </div>

              {/* Dashboard preview */}
              <div className="bg-zinc-50 p-4">
                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { label: 'Total Requests', val: '247', color: 'text-slate-900' },
                    { label: 'Pending', val: '18', color: 'text-amber-600' },
                    { label: 'Confirmed', val: '203', color: 'text-emerald-600' },
                  ].map((s) => (
                    <div key={s.label} className="bg-white rounded-xl p-3 border border-zinc-200 shadow-sm">
                      <p className={`text-xl font-bold ${s.color}`}>{s.val}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* Mock request list */}
                <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
                  <div className="px-4 py-3 border-b border-zinc-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-700">Recent Requests</span>
                    <span className="text-[10px] text-indigo-600 font-medium">View all →</span>
                  </div>
                  {[
                    { name: 'Sophie M.', type: 'Restaurant', status: 'confirmed', ai: 'Birthday dinner for 4' },
                    { name: 'James W.', type: 'Hotel', status: 'pending', ai: 'Anniversary couple stay' },
                    { name: 'Elena V.', type: 'Coaching', status: 'confirmed', ai: 'Career transition session' },
                    { name: 'Lucas F.', type: 'Restaurant', status: 'pending', ai: 'Urgent 8-person dinner' },
                  ].map((r, i) => (
                    <div key={i} className="flex items-center gap-3 px-4 py-2.5 hover:bg-zinc-50 transition-colors border-b border-zinc-50 last:border-0">
                      <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                        {r.name.slice(0, 2)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="text-[11px] font-semibold text-slate-900 truncate">{r.name}</p>
                          <span className="text-[10px] text-slate-400">{r.type}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-0.5">
                          <Sparkles className="w-2.5 h-2.5 text-indigo-500" />
                          <p className="text-[10px] text-slate-500 truncate">{r.ai}</p>
                        </div>
                      </div>
                      <span
                        className={`text-[9px] font-semibold px-2 py-0.5 rounded-full border ${
                          r.status === 'confirmed'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        {r.status}
                      </span>
                    </div>
                  ))}
                </div>

                {/* AI Insight pill */}
                <div className="mt-3 flex items-center gap-2 px-3.5 py-2.5 bg-indigo-50 border border-indigo-200 rounded-xl">
                  <Sparkles className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                  <p className="text-[11px] text-indigo-800 font-medium">
                    AI Insight: Peak booking time is <strong>8:00 PM</strong> · 2 urgent requests need attention
                  </p>
                </div>
              </div>
            </div>

            {/* Floating cards */}
            <div className="absolute -left-8 top-1/3 bg-white rounded-xl shadow-xl border border-zinc-200 p-3 max-w-[160px] hidden lg:block">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-5 h-5 rounded-full bg-violet-100 flex items-center justify-center">
                  <Sparkles className="w-2.5 h-2.5 text-violet-600" />
                </div>
                <span className="text-[10px] font-semibold text-slate-700">AI Summary</span>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed">Birthday dinner for 4, requests a surprise cake.</p>
            </div>

            <div className="absolute -right-6 bottom-1/4 bg-white rounded-xl shadow-xl border border-zinc-200 p-3 hidden lg:block">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                  <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-slate-700">Confirmed</p>
                  <p className="text-[10px] text-slate-400">Auto-reply sent</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-t border-zinc-100">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-extrabold text-slate-900 tabular-nums">{s.value}</p>
              <p className="text-sm text-slate-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
