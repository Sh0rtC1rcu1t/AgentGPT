// stripe.js — Stripe Connect Express onboarding and webhook handler (PoC)
const express = require('express');
const router = express.Router();

// Note: Do NOT put Stripe secrets in source control. Use environment variables / GitHub Secrets.
// STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET should be set in the environment for webhook verification.

router.post('/create-account-link', async (req, res) => {
  // PoC: respond with a fake onboarding URL. In production, call Stripe API to create account link.
  const { account_id } = req.body;
  if (!account_id) return res.status(400).json({ error: 'account_id required' });
  // Example response: redirect the user to Stripe hosted onboarding
  return res.json({ ok: true, url: `https://dashboard.stripe.com/test/onboarding/${account_id}` });
});

router.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  // In production verify signature using STRIPE_WEBHOOK_SECRET
  // const sig = req.headers['stripe-signature'];
  // stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  console.log('Received stripe webhook (PoC)');
  res.json({ ok: true });
});

module.exports = router;
