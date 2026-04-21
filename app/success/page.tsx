'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2, Sparkles, CalendarDays, Clock, Users, ArrowRight, Home, Copy,
} from 'lucide-react';
import { BookingRequest } from '@/types';
import { CategoryBadge, PriorityBadge } from '@/components/ui/Badge';
import { formatDate, formatTime } from '@/utils/helpers';
import { useToast } from '@/context/ToastContext';

export default function SuccessPage() {
  const { info } = useToast();
  const [submission, setSubmission] = useState<BookingRequest | null>(null);
  const [copied,     setCopied]     = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('last_submission');
      if (raw) setSubmission(JSON.parse(raw));
    } catch {}
  }, []);

  function copyId() {
    if (!submission?.id) return;
    navigator.clipboard.writeText(submission.id).then(() => {
      setCopied(true);
      info('Reference ID copied');
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-indigo-50/30 flex items-center justify-center px-4 py-16">
      <div className="max-w-xl w-full">

        {/* Hero icon */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="relative mb-6">
            <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center shadow-lg shadow-emerald-500/10">
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </div>
            <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-3">Request Received!</h1>
          <p className="text-slate-600 leading-relaxed max-w-md">
            Your request has been submitted and analyzed by our AI. We'll review
            it and respond within 24 hours.
          </p>
        </div>

        {/* Submission card */}
        {submission && (
          <div className="bg-white rounded-2xl border border-zinc-200 shadow-lg shadow-slate-900/5 overflow-hidden mb-6">

            {/* Header */}
            <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-900">Your Request</h2>
              <button
                onClick={copyId}
                className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-mono transition-colors"
                title="Copy reference ID"
              >
                {submission.id.slice(0, 12)}…
                {copied
                  ? <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                  : <Copy className="w-3 h-3" />}
              </button>
            </div>

            <div className="p-5 space-y-5">
              {/* Basic details */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Service',  value: submission.serviceType },
                  { label: 'Name',     value: submission.name        },
                  {
                    label: 'Date',
                    value: (
                      <span className="flex items-center gap-1.5">
                        <CalendarDays className="w-3.5 h-3.5 text-slate-400" />
                        {formatDate(submission.preferredDate)}
                      </span>
                    ),
                  },
                  {
                    label: 'Time',
                    value: (
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {formatTime(submission.preferredTime)}
                      </span>
                    ),
                  },
                  {
                    label: 'Guests',
                    value: (
                      <span className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        {submission.guests} {submission.guests === 1 ? 'person' : 'people'}
                      </span>
                    ),
                  },
                  {
                    label: 'Status',
                    value: (
                      <span className="inline-flex items-center gap-1.5 badge bg-amber-50 text-amber-700 border-amber-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        Pending Review
                      </span>
                    ),
                  },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      {label}
                    </p>
                    <div className="text-sm font-medium text-slate-800">{value as React.ReactNode}</div>
                  </div>
                ))}
              </div>

              {/* AI Analysis */}
              <div className="pt-4 border-t border-zinc-100">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                  <p className="text-xs font-semibold text-slate-800">AI Analysis</p>
                </div>

                <div className="flex gap-2 mb-3 flex-wrap">
                  <CategoryBadge category={submission.category} />
                  <PriorityBadge priority={submission.priority} />
                </div>

                <div className="p-3.5 rounded-xl bg-indigo-50 border border-indigo-100">
                  <p className="text-xs font-semibold text-indigo-700 mb-1">AI Summary</p>
                  <p className="text-xs text-indigo-800 leading-relaxed">{submission.aiSummary}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Next steps */}
        <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-5 mb-6">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">What happens next?</h3>
          <div className="space-y-3">
            {[
              { n: '1', text: 'Our team receives your request with AI context and summary', bg: 'bg-indigo-100 text-indigo-700' },
              { n: '2', text: 'We verify availability and prepare a personalised response', bg: 'bg-violet-100 text-violet-700' },
              { n: '3', text: 'You receive a confirmation by email within 2–24 hours',      bg: 'bg-emerald-100 text-emerald-700' },
            ].map(({ n, text, bg }) => (
              <div key={n} className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center flex-shrink-0 ${bg}`}>{n}</div>
                <p className="text-sm text-slate-600 leading-relaxed pt-0.5">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/" className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white border border-zinc-300 text-slate-700 text-sm font-semibold hover:bg-zinc-50 transition-colors shadow-sm">
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <Link href="/book" className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm">
            Submit Another
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {submission?.email && (
          <p className="text-center text-xs text-slate-400 mt-5">
            Confirmation will be sent to{' '}
            <span className="font-medium text-slate-600">{submission.email}</span>
          </p>
        )}
      </div>
    </div>
  );
}
