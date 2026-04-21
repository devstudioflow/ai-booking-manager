'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@/utils/cn';

const faqs = [
  {
    q: 'How does the AI analysis work?',
    a: "When a customer submits a request, BookingAI's AI engine reads the message, identifies the intent (booking, cancellation, inquiry, etc.), assigns a priority level (low, medium, high), writes a one-sentence summary, and drafts a professional suggested reply — all in under 2 seconds. You can use the suggested reply as-is or customize it before sending.",
  },
  {
    q: 'Which industries can use BookingAI?',
    a: 'BookingAI is designed to be industry-agnostic. It works out-of-the-box for restaurants, hotels, salons & spas, dental and medical clinics, life coaches and consultants, and legal advisors. You can customize the service type dropdown on your booking form to match your specific offerings.',
  },
  {
    q: 'Can I connect BookingAI to my existing tools?',
    a: 'Yes. BookingAI integrates with major tools including Google Calendar, Outlook, Slack, Zapier, and email providers. API access is available on Pro and Enterprise plans, allowing you to build custom integrations with your CRM or practice management software.',
  },
  {
    q: 'Is customer data secure and GDPR compliant?',
    a: 'Absolutely. BookingAI is built on enterprise-grade infrastructure with end-to-end encryption at rest and in transit. We are SOC 2 Type II certified and GDPR compliant. Customer data is stored in the region of your choice, and you retain full ownership. Data retention policies are fully configurable.',
  },
  {
    q: 'How long does it take to set up?',
    a: "Most businesses are fully set up within 30 minutes. You configure your business info, customize the booking form fields, and share the public link with customers. No developer required. Our onboarding team provides a live walkthrough if you're on the Business or Enterprise plan.",
  },
  {
    q: 'What happens if AI misclassifies a request?',
    a: "AI classification is accurate for 95%+ of requests, but admins always have full control. You can manually update any category, priority, or status with a single click. Every override helps improve the AI model for your specific business over time through continuous learning.",
  },
  {
    q: 'Do you offer a free trial?',
    a: "Yes! Every new account starts with a 14-day free trial on our Business plan with no credit card required. You'll have full access to all features, unlimited requests, and priority onboarding support. After the trial, you can choose the plan that fits your business.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-zinc-50 border-t border-zinc-200">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Frequently asked questions
          </h2>
          <p className="text-lg text-slate-600">
            Everything you need to know about BookingAI. Can't find the answer?{' '}
            <a href="#" className="text-indigo-600 font-medium hover:underline">
              Chat with us.
            </a>
          </p>
        </div>

        {/* FAQ list */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={cn(
                'bg-white rounded-xl border transition-all duration-200',
                open === i ? 'border-indigo-200 shadow-md shadow-indigo-500/5' : 'border-zinc-200'
              )}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left"
              >
                <span className={cn('text-sm font-semibold', open === i ? 'text-indigo-700' : 'text-slate-900')}>
                  {faq.q}
                </span>
                <div className={cn('flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors', open === i ? 'bg-indigo-100 text-indigo-600' : 'bg-zinc-100 text-slate-500')}>
                  {open === i ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                </div>
              </button>
              {open === i && (
                <div className="px-5 pb-5">
                  <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
