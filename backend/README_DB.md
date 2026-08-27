# Backend DB README

This folder contains SQL migrations and notes for the Postgres schema used by the PoC.

How to run migrations (example, using psql):

1) Start Postgres (docker-compose includes a postgres service)
2) Run this migration file against the DB:
   psql $DATABASE_URL -f backend/migrations/001_create_tables.sql

Notes
- These are simple PoC migrations. For production use, integrate a migration framework (Knex, Flyway, Liquibase, or similar) and run migrations from CI.
- Do not store DB credentials in the repository; use environment variables or CI secrets.
