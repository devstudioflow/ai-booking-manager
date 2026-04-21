import { ClipboardList, Sparkles, LayoutDashboard, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: ClipboardList,
    title: 'Customer submits request',
    description:
      'Customers fill your branded public booking form — service type, date, time, and their specific message. Works 24/7 on any device.',
    color: 'bg-indigo-50 text-indigo-600 border-indigo-200',
    accentLine: 'from-indigo-500 to-indigo-300',
  },
  {
    number: '02',
    icon: Sparkles,
    title: 'AI instantly analyzes it',
    description:
      'Our AI reads the customer message, extracts intent, assigns a priority level, categorizes the request, and drafts a professional reply — in under 2 seconds.',
    color: 'bg-violet-50 text-violet-600 border-violet-200',
    accentLine: 'from-violet-500 to-violet-300',
  },
  {
    number: '03',
    icon: LayoutDashboard,
    title: 'Admin reviews the dashboard',
    description:
      'You open your dashboard and see every request organized with AI summaries, priority flags, and suggested replies. Filter, search, and act instantly.',
    color: 'bg-blue-50 text-blue-600 border-blue-200',
    accentLine: 'from-blue-500 to-blue-300',
  },
  {
    number: '04',
    icon: CheckCircle2,
    title: 'Confirm, reply & close',
    description:
      'Approve or deny the booking, use the AI-drafted reply with one click, add internal notes, and move on. Full workflow — done in minutes.',
    color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    accentLine: 'from-emerald-500 to-emerald-300',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-zinc-50 border-y border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-zinc-300 text-slate-700 text-xs font-semibold mb-6 shadow-sm">
            Simple 4-step workflow
          </div>
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            How it works
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            From customer request to confirmed booking — streamlined, automated, and intelligently managed.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector lines for desktop */}
          <div className="hidden lg:block absolute top-10 left-[12%] right-[12%] h-px bg-gradient-to-r from-indigo-300 via-violet-300 via-blue-300 to-emerald-300 z-0" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="relative flex flex-col">
                {/* Step card */}
                <div className="relative z-10 bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-200 flex-1 flex flex-col">
                  {/* Number + icon */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className={`flex items-center justify-center w-11 h-11 rounded-xl border ${step.color} flex-shrink-0 relative z-10`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-3xl font-black text-zinc-100 leading-none mt-1">{step.number}</span>
                  </div>

                  <h3 className="text-base font-semibold text-slate-900 mb-2 leading-snug">{step.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed flex-1">{step.description}</p>

                  {/* Bottom accent */}
                  <div className={`mt-4 h-1 rounded-full bg-gradient-to-r ${step.accentLine}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <p className="text-slate-500 text-sm mb-4">Ready to see it in action?</p>
          <a
            href="/book"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20"
          >
            Try the demo form
            <CheckCircle2 className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
