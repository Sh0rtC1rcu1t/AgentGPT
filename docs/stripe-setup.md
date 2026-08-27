# Stripe Express setup (PoC)

This document describes how to set up Stripe Connect Express onboarding and webhooks for the platform.

Required GitHub Secrets (do NOT commit secrets to the repo):
- STRIPE_SECRET_KEY — your Stripe secret key (test mode OK for development)
- STRIPE_WEBHOOK_SECRET — webhook signing secret for verification
- STRIPE_CLIENT_ID — Connect client id for Express

PoC notes
- The PoC endpoint /stripe/create-account-link returns a fake onboarding URL. In production, call the Stripe API to create an account link and return the hosted onboarding URL to the frontend.
- The /stripe/webhook handler must verify the signature using the STRIPE_WEBHOOK_SECRET before processing events.
