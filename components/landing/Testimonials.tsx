import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    quote:
      "BookingAI completely transformed how we handle reservation requests. The AI summaries alone save my team 3 hours a day. Every message is already categorized and replied to before I even sit down.",
    name: 'Marie-Claire Fontaine',
    role: 'Owner, Le Jardin Restaurant',
    location: 'Paris, France',
    avatar: 'MC',
    avatarBg: 'bg-rose-100 text-rose-700',
    stars: 5,
  },
  {
    quote:
      "We run a boutique hotel with a small team. BookingAI handles the inbox so we can focus on the guest experience. The suggested replies are surprisingly natural and professional — guests think it's us.",
    name: 'James Worthington',
    role: 'General Manager, The Meridian Hotel',
    location: 'London, UK',
    avatarBg: 'bg-blue-100 text-blue-700',
    avatar: 'JW',
    stars: 5,
  },
  {
    quote:
      "As a solo life coach, I was drowning in DMs and emails. Now every inquiry is prioritized and I have a draft reply ready instantly. I've cut my admin time by 70% and clients are getting faster responses.",
    name: 'Elena Vasquez',
    role: 'Certified Life Coach',
    location: 'San Francisco, CA',
    avatarBg: 'bg-violet-100 text-violet-700',
    avatar: 'EV',
    stars: 5,
  },
  {
    quote:
      "Our dental practice manages 80+ patient inquiries per week. The AI flags urgent pain-related requests immediately. It's like having a smart front-desk assistant that never sleeps.",
    name: 'Dr. Sarah Okonkwo',
    role: 'Principal Dentist, Okonkwo Dental',
    location: 'Lagos, Nigeria',
    avatarBg: 'bg-emerald-100 text-emerald-700',
    avatar: 'SO',
    stars: 5,
  },
  {
    quote:
      "The calendar view and the AI insights are worth the subscription alone. I can see at a glance which time slots are in demand and plan staffing accordingly. Highly recommend for any salon.",
    name: 'Joëlle Mbeki',
    role: 'Director, Studio M Beauty Lounge',
    location: 'Brussels, Belgium',
    avatarBg: 'bg-amber-100 text-amber-700',
    avatar: 'JM',
    stars: 5,
  },
  {
    quote:
      "Legal consultation requests require careful handling. BookingAI identifies urgency, categorizes the type of matter, and drafts professional responses. It understands context better than I expected.",
    name: 'Adrien Leclerc',
    role: 'Senior Partner, Leclerc & Associés',
    location: 'Montreal, Canada',
    avatarBg: 'bg-indigo-100 text-indigo-700',
    avatar: 'AL',
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex justify-center gap-0.5 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
            ))}
          </div>
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Loved by businesses{' '}
            <span className="gradient-text">worldwide</span>
          </h2>
          <p className="text-lg text-slate-600">
            Join thousands of businesses that save time, respond faster, and serve customers better.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="relative p-6 rounded-2xl border border-zinc-200 bg-white hover:shadow-lg hover:shadow-slate-900/5 transition-all duration-300 hover:-translate-y-0.5 flex flex-col"
            >
              <Quote className="w-7 h-7 text-indigo-200 mb-4 flex-shrink-0" />

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                ))}
              </div>

              <p className="text-sm text-slate-700 leading-relaxed flex-1 italic mb-6">
                &quot;{t.quote}&quot;
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-zinc-100">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold flex-shrink-0 ${t.avatarBg}`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                  <p className="text-xs text-slate-400">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Logo band */}
        <div className="mt-16 py-8 border-t border-zinc-100">
          <p className="text-center text-xs font-semibold text-slate-400 uppercase tracking-widest mb-8">
            Trusted by leading businesses across industries
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
            {['Le Jardin', 'The Meridian', 'Studio M', 'Okonkwo Dental', 'Leclerc & Associés', 'CoachPro'].map((name) => (
              <span key={name} className="text-base font-bold text-zinc-300 hover:text-zinc-400 transition-colors cursor-default">
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
