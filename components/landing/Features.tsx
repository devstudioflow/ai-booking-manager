import {
  Sparkles,
  Inbox,
  CalendarDays,
  MessageSquareText,
  BarChart3,
  Zap,
  Shield,
  Globe,
  Clock,
} from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered Analysis',
    description:
      'Every request is automatically summarized, categorized, and prioritized by AI — so you always know what needs attention first.',
    color: 'bg-violet-50 text-violet-600',
  },
  {
    icon: MessageSquareText,
    title: 'Smart Reply Suggestions',
    description:
      'AI drafts professional, context-aware replies for each request. Edit or send with one click — save hours every day.',
    color: 'bg-indigo-50 text-indigo-600',
  },
  {
    icon: Inbox,
    title: 'Unified Request Inbox',
    description:
      'All bookings, inquiries, cancellations, and follow-ups in one clean, searchable dashboard. No more scattered emails.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: CalendarDays,
    title: 'Visual Schedule Calendar',
    description:
      "See all upcoming bookings in a color-coded calendar view. Plan your team's capacity at a glance with zero friction.",
    color: 'bg-cyan-50 text-cyan-600',
  },
  {
    icon: BarChart3,
    title: 'Business Insights',
    description:
      'Track peak hours, most requested services, response times, and customer trends — all automatically surfaced.',
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: Zap,
    title: 'Instant Notifications',
    description:
      'Real-time alerts for urgent requests, cancellations, and high-priority inquiries — across email, SMS, or Slack.',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: Globe,
    title: 'Multi-Industry Ready',
    description:
      'Pre-configured for restaurants, hotels, salons, clinics, coaches, and legal firms. Adapt the form in minutes.',
    color: 'bg-pink-50 text-pink-600',
  },
  {
    icon: Shield,
    title: 'Enterprise-Grade Security',
    description:
      'SOC 2 compliant, end-to-end encrypted, GDPR-ready. Your customer data is protected at every layer.',
    color: 'bg-slate-100 text-slate-600',
  },
  {
    icon: Clock,
    title: '24/7 Availability',
    description:
      'Your public booking form is always on. Capture requests while you sleep and review them with AI context in the morning.',
    color: 'bg-rose-50 text-rose-600',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Everything you need
          </div>
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Powerful features for{' '}
            <span className="gradient-text">every business</span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            From solo practitioners to multi-location enterprises — BookingAI gives you the tools to
            manage customer requests like a world-class operation.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative p-6 rounded-2xl border border-zinc-200 bg-white hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl mb-4 ${feature.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{feature.description}</p>

                {/* Hover line */}
                <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
