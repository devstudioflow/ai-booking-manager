'use client';

import { useState } from 'react';
import {
  Building2,
  Bell,
  Sparkles,
  Link2,
  UserCog,
  Save,
  Check,
  Mail,
  MessageSquare,
  Globe,
  Phone,
  MapPin,
  Clock,
  Zap,
  Shield,
} from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card } from '@/components/ui/Card';
import { cn } from '@/utils/cn';

const tabs = [
  { id: 'business', label: 'Business Info', icon: Building2 },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'ai', label: 'AI Settings', icon: Sparkles },
  { id: 'channels', label: 'Channels', icon: Link2 },
  { id: 'admin', label: 'Admin Preferences', icon: UserCog },
];

function SaveButton({ saved }: { saved: boolean }) {
  return (
    <button className={cn('flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all', saved ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'btn-primary')}>
      {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
      {saved ? 'Saved!' : 'Save Changes'}
    </button>
  );
}

function ToggleSwitch({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={cn('relative w-10 h-6 rounded-full transition-colors', enabled ? 'bg-indigo-600' : 'bg-zinc-300')}
    >
      <div className={cn('absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform', enabled ? 'translate-x-5' : 'translate-x-0.5')} />
    </button>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('business');
  const [saved, setSaved] = useState(false);

  const [notifications, setNotifications] = useState({
    emailNewRequest: true,
    emailUrgent: true,
    smsUrgent: false,
    slackIntegration: false,
    dailyDigest: true,
    weeklyReport: true,
  });

  const [aiSettings, setAiSettings] = useState({
    autoSummarize: true,
    autoPriority: true,
    autoReply: false,
    language: 'auto',
    tone: 'professional',
  });

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function toggleNotif(key: keyof typeof notifications) {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function toggleAI(key: keyof typeof aiSettings) {
    if (typeof aiSettings[key] === 'boolean') {
      setAiSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    }
  }

  return (
    <AdminLayout title="Settings" subtitle="Manage your account and application preferences">
      <div className="flex gap-6 flex-col lg:flex-row">
        {/* Sidebar tabs */}
        <div className="lg:w-52 flex-shrink-0">
          <nav className="space-y-0.5">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={cn(
                  'w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all text-left',
                  activeTab === id
                    ? 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100'
                    : 'text-slate-600 hover:bg-zinc-50 hover:text-slate-900'
                )}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-5">
          {/* Business Info */}
          {activeTab === 'business' && (
            <>
              <Card>
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">Business Information</h3>
                    <p className="text-xs text-slate-500 mt-0.5">This information appears on your public booking form.</p>
                  </div>
                  <SaveButton saved={saved} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Business Name</label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input type="text" defaultValue="BookingAI Demo" className="form-input pl-9" />
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Industry</label>
                    <select className="form-input appearance-none">
                      <option>Restaurant</option>
                      <option>Hotel</option>
                      <option>Salon & Beauty</option>
                      <option>Medical / Dental</option>
                      <option>Coaching</option>
                      <option>Legal Services</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input type="email" defaultValue="admin@bookingai.com" className="form-input pl-9" />
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input type="tel" placeholder="+1 555 000 0000" className="form-input pl-9" />
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Website</label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input type="url" placeholder="https://example.com" className="form-input pl-9" />
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Timezone</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <select className="form-input pl-9 appearance-none">
                        <option>UTC+0 — London</option>
                        <option>UTC+1 — Paris, Berlin</option>
                        <option>UTC-5 — New York</option>
                        <option>UTC-8 — Los Angeles</option>
                      </select>
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="form-label">Business Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                      <textarea rows={2} placeholder="123 Main Street, City, Country" className="form-input pl-9 resize-none" />
                    </div>
                  </div>
                </div>
              </Card>
              <div className="flex justify-end">
                <button onClick={handleSave} className="btn-primary">
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </>
          )}

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <Card>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Notification Preferences</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Choose how you want to be notified about new activity.</p>
                </div>
                <SaveButton saved={saved} />
              </div>
              <div className="space-y-1">
                {[
                  { key: 'emailNewRequest', label: 'Email on new request', desc: 'Receive an email every time a customer submits a request', icon: Mail },
                  { key: 'emailUrgent', label: 'Email on urgent requests', desc: 'Immediate email alert for high-priority or urgent requests', icon: Zap },
                  { key: 'smsUrgent', label: 'SMS for urgent requests', desc: 'Text message alerts for critical bookings (requires phone number)', icon: Phone },
                  { key: 'slackIntegration', label: 'Slack notifications', desc: 'Push new requests and summaries to your Slack channel', icon: MessageSquare },
                  { key: 'dailyDigest', label: 'Daily digest email', desc: 'A morning summary of all pending and recent requests', icon: Mail },
                  { key: 'weeklyReport', label: 'Weekly analytics report', desc: 'Every Monday, receive a summary of your weekly booking performance', icon: Mail },
                ].map(({ key, label, desc, icon: Icon }) => (
                  <div key={key} className="flex items-center justify-between p-4 rounded-xl hover:bg-zinc-50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0 mt-0.5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">{label}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
                      </div>
                    </div>
                    <ToggleSwitch
                      enabled={notifications[key as keyof typeof notifications] as boolean}
                      onToggle={() => toggleNotif(key as keyof typeof notifications)}
                    />
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* AI Settings */}
          {activeTab === 'ai' && (
            <>
              <Card>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">AI Configuration</h3>
                    <p className="text-xs text-slate-500">Control how AI analyzes and responds to requests.</p>
                  </div>
                </div>
                <div className="space-y-1">
                  {[
                    { key: 'autoSummarize', label: 'Auto-summarize messages', desc: 'AI will write a one-line summary for every incoming request' },
                    { key: 'autoPriority', label: 'Auto-assign priority', desc: 'AI will determine if requests are low, medium, or high priority' },
                    { key: 'autoReply', label: 'Auto-send suggested reply', desc: 'Automatically send the AI-generated reply (use with caution)' },
                  ].map(({ key, label, desc }) => (
                    <div key={key} className="flex items-center justify-between p-4 rounded-xl hover:bg-zinc-50 transition-colors">
                      <div>
                        <p className="text-sm font-medium text-slate-900">{label}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
                      </div>
                      <ToggleSwitch
                        enabled={aiSettings[key as keyof typeof aiSettings] as boolean}
                        onToggle={() => toggleAI(key as keyof typeof aiSettings)}
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-5 pt-5 border-t border-zinc-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Response Language</label>
                    <select className="form-input appearance-none" value={aiSettings.language} onChange={(e) => setAiSettings((p) => ({ ...p, language: e.target.value }))}>
                      <option value="auto">Auto-detect from message</option>
                      <option value="en">English</option>
                      <option value="fr">French</option>
                      <option value="es">Spanish</option>
                      <option value="de">German</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Reply Tone</label>
                    <select className="form-input appearance-none" value={aiSettings.tone} onChange={(e) => setAiSettings((p) => ({ ...p, tone: e.target.value }))}>
                      <option value="professional">Professional</option>
                      <option value="friendly">Friendly & warm</option>
                      <option value="formal">Formal</option>
                      <option value="casual">Casual</option>
                    </select>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-4 h-4 text-indigo-600" />
                  <h3 className="text-sm font-semibold text-slate-900">AI Model</h3>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-indigo-50 border border-indigo-100">
                  <div>
                    <p className="text-sm font-semibold text-indigo-900">GPT-4o (OpenAI)</p>
                    <p className="text-xs text-indigo-600 mt-0.5">Production-ready · Multilingual · 128k context</p>
                  </div>
                  <span className="badge bg-emerald-100 text-emerald-700 border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Connected
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-3">
                  API key is configured via environment variables. Contact your system administrator to update the AI provider.
                </p>
              </Card>
            </>
          )}

          {/* Channels */}
          {activeTab === 'channels' && (
            <Card>
              <h3 className="text-sm font-semibold text-slate-900 mb-5">Connected Channels</h3>
              <div className="space-y-3">
                {[
                  { name: 'Google Calendar', desc: 'Sync confirmed bookings to your Google Calendar', status: 'connected', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
                  { name: 'Slack', desc: 'Push new request alerts to a Slack channel', status: 'disconnected', color: 'text-slate-600 bg-zinc-50 border-zinc-200' },
                  { name: 'Zapier', desc: 'Automate workflows with 5,000+ apps via Zapier', status: 'disconnected', color: 'text-slate-600 bg-zinc-50 border-zinc-200' },
                  { name: 'Stripe', desc: 'Accept deposits or payments with bookings', status: 'disconnected', color: 'text-slate-600 bg-zinc-50 border-zinc-200' },
                  { name: 'Twilio (SMS)', desc: 'Send SMS confirmations to customers', status: 'disconnected', color: 'text-slate-600 bg-zinc-50 border-zinc-200' },
                  { name: 'Mailchimp', desc: 'Add customers to email marketing lists automatically', status: 'disconnected', color: 'text-slate-600 bg-zinc-50 border-zinc-200' },
                ].map((ch) => (
                  <div key={ch.name} className="flex items-center justify-between p-4 rounded-xl border border-zinc-200 hover:bg-zinc-50 transition-colors">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{ch.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{ch.desc}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`badge ${ch.color}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${ch.status === 'connected' ? 'bg-emerald-500' : 'bg-zinc-400'}`} />
                        {ch.status === 'connected' ? 'Connected' : 'Disconnected'}
                      </span>
                      <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
                        {ch.status === 'connected' ? 'Manage' : 'Connect'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Admin Preferences */}
          {activeTab === 'admin' && (
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-semibold text-slate-900">Admin Preferences</h3>
                <SaveButton saved={saved} />
              </div>
              <div className="space-y-4">
                <div>
                  <label className="form-label">Dashboard Default View</label>
                  <select className="form-input appearance-none">
                    <option>All requests</option>
                    <option>Pending only</option>
                    <option>Today&apos;s bookings</option>
                    <option>High priority only</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Default Sort Order</label>
                  <select className="form-input appearance-none">
                    <option>Newest first</option>
                    <option>Priority (High to Low)</option>
                    <option>Booking date (Earliest first)</option>
                    <option>Status</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Date Format</label>
                  <select className="form-input appearance-none">
                    <option>MMM DD, YYYY (Apr 25, 2026)</option>
                    <option>DD/MM/YYYY (25/04/2026)</option>
                    <option>YYYY-MM-DD (2026-04-25)</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Rows per Page</label>
                  <select className="form-input appearance-none">
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                    <option>100</option>
                  </select>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl hover:bg-zinc-50 transition-colors border border-zinc-100">
                  <div>
                    <p className="text-sm font-medium text-slate-900">Compact table view</p>
                    <p className="text-xs text-slate-500 mt-0.5">Reduces row height for higher information density</p>
                  </div>
                  <ToggleSwitch enabled={false} onToggle={() => {}} />
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
