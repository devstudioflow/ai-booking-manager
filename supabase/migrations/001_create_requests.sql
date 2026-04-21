-- AI Booking & Inquiry Manager — Supabase Migration
-- Run this in your Supabase SQL Editor or via the CLI

CREATE TABLE IF NOT EXISTS requests (
  id             UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name           TEXT NOT NULL,
  email          TEXT NOT NULL,
  phone          TEXT DEFAULT '',
  service_type   TEXT NOT NULL,
  preferred_date DATE NOT NULL,
  preferred_time TEXT NOT NULL,
  guests         INTEGER NOT NULL DEFAULT 1,
  message        TEXT NOT NULL,
  status         TEXT NOT NULL DEFAULT 'pending'
                   CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  category       TEXT NOT NULL DEFAULT 'general_inquiry'
                   CHECK (category IN ('booking', 'cancellation', 'reschedule', 'pricing_question', 'general_inquiry', 'urgent_request')),
  priority       TEXT NOT NULL DEFAULT 'medium'
                   CHECK (priority IN ('low', 'medium', 'high')),
  ai_summary          TEXT DEFAULT '',
  ai_suggested_reply  TEXT DEFAULT '',
  notes               TEXT DEFAULT '',
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- Index for common query patterns
CREATE INDEX IF NOT EXISTS idx_requests_status      ON requests (status);
CREATE INDEX IF NOT EXISTS idx_requests_created_at  ON requests (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_requests_priority    ON requests (priority);

-- Enable Row Level Security (RLS) — set up policies per your auth strategy
ALTER TABLE requests ENABLE ROW LEVEL SECURITY;

-- Allow anonymous reads (public booking confirmation, demo mode)
-- In production: lock this down to authenticated admins only
CREATE POLICY "Allow all reads"
  ON requests FOR SELECT
  USING (true);

-- Allow anonymous inserts (public booking form)
CREATE POLICY "Allow public inserts"
  ON requests FOR INSERT
  WITH CHECK (true);

-- Allow authenticated updates (admin dashboard)
CREATE POLICY "Allow all updates"
  ON requests FOR UPDATE
  USING (true);

-- Allow authenticated deletes (admin dashboard)
CREATE POLICY "Allow all deletes"
  ON requests FOR DELETE
  USING (true);
