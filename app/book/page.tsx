'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  User, Mail, Phone, Briefcase, Calendar, Clock, Users,
  MessageSquare, Sparkles, ArrowLeft, CheckCircle2, Loader2,
  AlertCircle,
} from 'lucide-react';
import { useToast } from '@/context/ToastContext';

// ── Constants ─────────────────────────────────────────────────────────────────

const SERVICE_TYPES = [
  'Restaurant Reservation', 'Hotel Booking', 'Coaching Session',
  'Hair & Beauty Appointment', 'Dental Appointment', 'Legal Consultation',
  'Medical Consultation', 'Spa & Wellness', 'Personal Training', 'Other',
];

const TIME_SLOTS = [
  '08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30',
  '12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30',
  '16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30',
  '20:00','20:30','21:00',
];

// ── Form types ────────────────────────────────────────────────────────────────

interface FormData {
  name: string; email: string; phone: string;
  serviceType: string; preferredDate: string;
  preferredTime: string; guests: string; message: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

const INITIAL: FormData = {
  name: '', email: '', phone: '', serviceType: '',
  preferredDate: '', preferredTime: '', guests: '1', message: '',
};

// ── Validation ────────────────────────────────────────────────────────────────

function validate(form: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim())         errors.name        = 'Full name is required.';
  if (!form.email.trim())        errors.email       = 'Email address is required.';
  else if (!/\S+@\S+\.\S+/.test(form.email))
                                 errors.email       = 'Please enter a valid email.';
  if (!form.serviceType)         errors.serviceType = 'Please select a service type.';
  if (!form.preferredDate)       errors.preferredDate = 'Please choose a date.';
  if (!form.preferredTime)       errors.preferredTime = 'Please choose a time.';
  if (!form.message.trim())      errors.message     = 'Please describe your request.';
  else if (form.message.trim().length < 10)
                                 errors.message     = 'Message is too short (min 10 characters).';
  return errors;
}

// ── Field component ───────────────────────────────────────────────────────────

function Field({
  label, error, required, children,
}: {
  label: string; error?: string; required?: boolean; children: React.ReactNode;
}) {
  return (
    <div>
      <label className="form-label">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
          <AlertCircle className="w-3 h-3 flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

// ── AI Steps ──────────────────────────────────────────────────────────────────

const AI_STEPS = [
  'Reading your message…',
  'Classifying request type…',
  'Determining priority…',
  'Drafting suggested reply…',
  'Saving your request…',
];

// ── Page component ────────────────────────────────────────────────────────────

export default function BookPage() {
  const router  = useRouter();
  const { error: toastError } = useToast();

  const [form,       setForm]       = useState<FormData>(INITIAL);
  const [errors,     setErrors]     = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [aiStep,     setAiStep]     = useState(0);

  const today = new Date().toISOString().split('T')[0];

  function change(field: keyof FormData, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  }

  function inputClass(field: keyof FormData) {
    return `form-input${errors[field] ? ' border-red-400 focus:ring-red-400 bg-red-50/30' : ''}`;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      // Scroll to first error
      const first = document.querySelector('[data-error]');
      first?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setSubmitting(true);
    setAiStep(0);

    // Animate through AI processing steps
    const stepInterval = setInterval(() => {
      setAiStep(s => (s < AI_STEPS.length - 1 ? s + 1 : s));
    }, 700);

    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, guests: parseInt(form.guests, 10) || 1 }),
      });

      clearInterval(stepInterval);

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? 'Submission failed');
      }

      const { request } = await res.json();
      sessionStorage.setItem('last_submission', JSON.stringify(request));
      router.push('/success');
    } catch (err: unknown) {
      clearInterval(stepInterval);
      setSubmitting(false);
      setAiStep(0);
      toastError(
        'Submission failed',
        err instanceof Error ? err.message : 'Please try again in a moment.'
      );
    }
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-indigo-50/30">
      {/* Top bar */}
      <div className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-bold text-slate-900">BookingAI</span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Page header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-3">
            Submit a Booking or Inquiry
          </h1>
          <p className="text-slate-600 leading-relaxed max-w-xl mx-auto">
            Fill in the form below and our team — assisted by AI — will review
            your request and respond within 24 hours.
          </p>
        </div>

        {/* AI badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            Your request will be analyzed by AI for faster handling
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="bg-white rounded-2xl border border-zinc-200 shadow-lg shadow-slate-900/5 overflow-hidden">

          {/* ── Section: Contact ───────────────────────────────────────── */}
          <div className="px-6 py-5 border-b border-zinc-100">
            <h2 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-indigo-600" />
              Contact Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Full Name" required error={errors.name}>
                <div className="relative" data-error={errors.name ? true : undefined}>
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Sophie Martin"
                    value={form.name}
                    onChange={e => change('name', e.target.value)}
                    className={`${inputClass('name')} pl-9`}
                    autoComplete="name"
                  />
                </div>
              </Field>

              <Field label="Email Address" required error={errors.email}>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    type="email"
                    placeholder="sophie@example.com"
                    value={form.email}
                    onChange={e => change('email', e.target.value)}
                    className={`${inputClass('email')} pl-9`}
                    autoComplete="email"
                  />
                </div>
              </Field>

              <div className="sm:col-span-2">
                <Field label="Phone Number">
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <input
                      type="tel"
                      placeholder="+33 6 12 34 56 78"
                      value={form.phone}
                      onChange={e => change('phone', e.target.value)}
                      className="form-input pl-9"
                      autoComplete="tel"
                    />
                  </div>
                </Field>
              </div>
            </div>
          </div>

          {/* ── Section: Booking details ───────────────────────────────── */}
          <div className="px-6 py-5 border-b border-zinc-100">
            <h2 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-indigo-600" />
              Booking Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Field label="Service Type" required error={errors.serviceType}>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <select
                      value={form.serviceType}
                      onChange={e => change('serviceType', e.target.value)}
                      className={`${inputClass('serviceType')} pl-9 appearance-none`}
                    >
                      <option value="">Select a service…</option>
                      {SERVICE_TYPES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </Field>
              </div>

              <Field label="Preferred Date" required error={errors.preferredDate}>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    type="date"
                    min={today}
                    value={form.preferredDate}
                    onChange={e => change('preferredDate', e.target.value)}
                    className={`${inputClass('preferredDate')} pl-9`}
                  />
                </div>
              </Field>

              <Field label="Preferred Time" required error={errors.preferredTime}>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <select
                    value={form.preferredTime}
                    onChange={e => change('preferredTime', e.target.value)}
                    className={`${inputClass('preferredTime')} pl-9 appearance-none`}
                  >
                    <option value="">Select a time…</option>
                    {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </Field>

              <div className="sm:col-span-2">
                <Field label="Number of Guests / People">
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <select
                      value={form.guests}
                      onChange={e => change('guests', e.target.value)}
                      className="form-input pl-9 appearance-none"
                    >
                      {Array.from({ length: 20 }, (_, i) => i + 1).map(n => (
                        <option key={n} value={n}>{n} {n === 1 ? 'person' : 'people'}</option>
                      ))}
                    </select>
                  </div>
                </Field>
              </div>
            </div>
          </div>

          {/* ── Section: Message ───────────────────────────────────────── */}
          <div className="px-6 py-5 border-b border-zinc-100">
            <h2 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-indigo-600" />
              Your Message
            </h2>
            <Field
              label="Special requests or additional information"
              required
              error={errors.message}
            >
              <textarea
                rows={5}
                placeholder="Describe your request in detail — any special requirements, preferences, or specific questions…"
                value={form.message}
                onChange={e => change('message', e.target.value)}
                className={`${inputClass('message')} resize-none`}
              />
              <div className="flex justify-between mt-1">
                <span className="text-xs text-slate-400">
                  {form.message.length < 10 && form.message.length > 0
                    ? `${10 - form.message.length} more characters needed`
                    : 'The more detail, the better we can assist you.'}
                </span>
                <span className="text-xs text-slate-400">{form.message.length} chars</span>
              </div>
            </Field>
          </div>

          {/* ── AI notice ─────────────────────────────────────────────── */}
          <div className="px-6 py-4 bg-indigo-50/50 border-b border-zinc-100">
            <div className="flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-indigo-700 leading-relaxed">
                <span className="font-semibold">AI-enhanced handling:</span>{' '}
                Your message is automatically analyzed to summarize intent, classify the request,
                determine urgency, and prepare a suggested reply — so we respond faster.
              </p>
            </div>
          </div>

          {/* ── Submit ────────────────────────────────────────────────── */}
          <div className="px-6 py-5 bg-zinc-50/50 flex flex-col sm:flex-row gap-3 items-center justify-between">
            <p className="text-xs text-slate-500 order-2 sm:order-1">
              By submitting you agree to our{' '}
              <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a>.
            </p>

            <button
              type="submit"
              disabled={submitting}
              className="order-1 sm:order-2 btn-primary w-full sm:w-auto px-8 py-3 text-sm relative overflow-hidden"
            >
              {submitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="truncate max-w-[220px]">{AI_STEPS[aiStep]}</span>
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Submit Request
                </span>
              )}
            </button>
          </div>
        </form>

        <p className="text-center text-xs text-slate-500 mt-6">
          We typically respond within 2–24 hours. For urgent matters, please call us directly.
        </p>
      </div>
    </div>
  );
}
