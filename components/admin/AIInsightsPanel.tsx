import { Sparkles, TrendingUp, AlertTriangle, Clock, MessageSquareText, BarChart3 } from 'lucide-react';
import { BookingRequest } from '@/types';
import { Card, CardHeader } from '@/components/ui/Card';

interface AIInsightsPanelProps {
  requests: BookingRequest[];
}

export default function AIInsightsPanel({ requests }: AIInsightsPanelProps) {
  const total = requests.length;
  const highPriority = requests.filter((r) => r.priority === 'high').length;
  const bookings = requests.filter((r) => r.category === 'booking').length;
  const pending = requests.filter((r) => r.status === 'pending').length;

  // Find peak booking time
  const timeCounts: Record<string, number> = {};
  requests.forEach((r) => {
    if (r.preferredTime) {
      timeCounts[r.preferredTime] = (timeCounts[r.preferredTime] ?? 0) + 1;
    }
  });
  const peakTime = Object.entries(timeCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '—';

  const insights = [
    {
      icon: BarChart3,
      color: 'text-indigo-600 bg-indigo-50',
      text: `Most requests this week are <strong>bookings</strong> (${Math.round((bookings / total) * 100)}% of total).`,
    },
    {
      icon: AlertTriangle,
      color: 'text-red-600 bg-red-50',
      text: `<strong>${highPriority} high-priority</strong> ${highPriority === 1 ? 'request needs' : 'requests need'} immediate attention.`,
    },
    {
      icon: Clock,
      color: 'text-amber-600 bg-amber-50',
      text: `Peak booking time: <strong>${peakTime}</strong> — most customers prefer this slot.`,
    },
    {
      icon: MessageSquareText,
      color: 'text-violet-600 bg-violet-50',
      text: `<strong>${pending} request${pending !== 1 ? 's are' : ' is'} still pending</strong> — review and respond to keep customers informed.`,
    },
    {
      icon: TrendingUp,
      color: 'text-emerald-600 bg-emerald-50',
      text: `AI has pre-drafted <strong>professional replies</strong> for all ${total} requests — ready to send or customize.`,
    },
  ];

  return (
    <Card>
      <CardHeader
        title="AI Insights"
        subtitle="Automatically generated from your requests"
        icon={<Sparkles className="w-4 h-4" />}
      />

      <div className="space-y-3">
        {insights.map((insight, i) => {
          const Icon = insight.icon;
          return (
            <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-zinc-50 hover:bg-zinc-100/70 transition-colors">
              <div className={`flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0 ${insight.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <p
                className="text-xs text-slate-700 leading-relaxed pt-1"
                dangerouslySetInnerHTML={{ __html: insight.text }}
              />
            </div>
          );
        })}
      </div>

      {/* AI tag */}
      <div className="mt-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-100">
        <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
        <p className="text-[11px] text-indigo-700 font-medium">
          Insights refresh automatically as new requests arrive
        </p>
      </div>
    </Card>
  );
}
