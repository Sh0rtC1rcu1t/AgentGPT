-- 001_create_tables.sql
-- Create tables for feeds, reviews, provenance, jobs and ledger

CREATE TABLE IF NOT EXISTS feeds (
  id TEXT PRIMARY KEY,
  source TEXT NOT NULL,
  type TEXT,
  payload JSONB,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS reviews (
  id TEXT PRIMARY KEY,
  item_id TEXT,
  reviewer TEXT,
  verdict TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS provenance (
  id TEXT PRIMARY KEY,
  source TEXT,
  source_id TEXT,
  title TEXT,
  url TEXT,
  license TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS jobs (
  id TEXT PRIMARY KEY,
  type TEXT,
  payload JSONB,
  status TEXT,
  assigned_to TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS ledger_transactions (
  id TEXT PRIMARY KEY,
  job_id TEXT,
  account_id TEXT,
  amount_cents BIGINT,
  currency TEXT,
  stripe_charge_id TEXT,
  status TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
