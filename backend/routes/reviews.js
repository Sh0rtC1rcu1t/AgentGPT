// reviews.js — peer-review endpoints for ingested content
const express = require('express');
const router = express.Router();

// In-memory store for PoC. Move to DB in production.
const reviews = {};

// POST /reviews — attach a review to an item
router.post('/', (req, res) => {
  const { item_id, reviewer, verdict, notes } = req.body;
  if (!item_id || !reviewer || !verdict) return res.status(400).json({ error: 'item_id, reviewer, verdict required' });
  const rev = { id: `rev_${Date.now()}_${Math.floor(Math.random()*10000)}`, item_id, reviewer, verdict, notes: notes||'', created_at: new Date().toISOString() };
  reviews[rev.id] = rev;
  return res.json({ ok: true, review: rev });
});

// GET /reviews?item_id=...
router.get('/', (req, res) => {
  const { item_id } = req.query;
  const out = Object.values(reviews).filter(r => !item_id || r.item_id === item_id);
  res.json({ reviews: out });
});

module.exports = router;
