import Link from 'next/link';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

const perks = [
  '14-day free trial, no card required',
  'Setup in under 30 minutes',
  'Cancel anytime',
  'Dedicated onboarding support',
];

export default function CTA() {
  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/20 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-violet-600/15 blur-3xl rounded-full pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold mb-8">
          <Sparkles className="w-3.5 h-3.5" />
          Start for free today
        </div>

        <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-6 text-balance">
          Ready to run a smarter{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
            booking operation?
          </span>
        </h2>

        <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-2xl mx-auto">
          Join 10,000+ businesses that have modernized how they manage customer requests —
          with AI clarity, a unified dashboard, and faster response times.
        </p>

        {/* Perks */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-10">
          {perks.map((perk) => (
            <div key={perk} className="flex items-center gap-2 text-sm text-slate-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              {perk}
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/book"
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-indigo-600 text-white font-semibold text-base hover:bg-indigo-500 transition-all duration-150 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-0.5"
          >
            Start free trial
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/admin/login"
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/5 text-white font-semibold text-base border border-white/10 hover:bg-white/10 transition-all duration-150 hover:-translate-y-0.5"
          >
            View live demo
          </Link>
        </div>

        <p className="mt-8 text-xs text-slate-600">
          No credit card required. No commitment. Just a smarter way to manage bookings.
        </p>
      </div>
    </section>
  );
}
