-- 0001_add_provenance_and_ledger.sql
-- Migration: add basic provenance, reviews, and ledger tables for PoC

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

CREATE TABLE IF NOT EXISTS reviews (
  id TEXT PRIMARY KEY,
  item_id TEXT REFERENCES provenance(id),
  reviewer TEXT,
  verdict TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS ledger_transactions (
  id TEXT PRIMARY KEY,
  job_id TEXT,
  seller_account_id TEXT,
  amount_cents BIGINT,
  currency TEXT,
  stripe_charge_id TEXT,
  status TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
