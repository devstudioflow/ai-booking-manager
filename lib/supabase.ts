// Real Supabase client — requires @supabase/supabase-js
// Run: npm install @supabase/supabase-js

import { createClient } from '@supabase/supabase-js';

const url  = process.env.NEXT_PUBLIC_SUPABASE_URL  ?? '';
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';
const svc  = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';

export const isSupabaseConfigured =
  url.startsWith('https://') && anon.length > 20;

// Browser-safe singleton — anon key, respects RLS
let _browser: ReturnType<typeof createClient> | null = null;
export function getSupabaseBrowser() {
  if (!_browser) _browser = createClient(url, anon);
  return _browser;
}

// Server-side admin client — service role, bypasses RLS
// Use ONLY in API routes / server actions — never in client components
export function getSupabaseAdmin() {
  return createClient(url, svc || anon);
}
