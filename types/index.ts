export type RequestStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';
export type RequestCategory = 'booking' | 'cancellation' | 'reschedule' | 'pricing_question' | 'general_inquiry' | 'urgent_request';
export type RequestPriority = 'low' | 'medium' | 'high';

export interface BookingRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  preferredDate: string;
  preferredTime: string;
  guests: number;
  message: string;
  status: RequestStatus;
  category: RequestCategory;
  priority: RequestPriority;
  aiSummary: string;
  aiSuggestedReply: string;
  notes: string;
  createdAt: string;
}

export interface AIAnalysisResult {
  summary: string;
  category: RequestCategory;
  priority: RequestPriority;
  suggestedReply: string;
}

export interface StatCard {
  label: string;
  value: number | string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: string;
}
