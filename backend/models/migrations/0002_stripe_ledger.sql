-- 0002_stripe_ledger.sql
-- Migration: add tables for stripe events and payouts

CREATE TABLE IF NOT EXISTS stripe_events (
  id TEXT PRIMARY KEY,
  event_type TEXT,
  raw JSONB,
  processed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS payouts (
  id TEXT PRIMARY KEY,
  account_id TEXT,
  amount_cents BIGINT,
  currency TEXT,
  stripe_payout_id TEXT,
  status TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
