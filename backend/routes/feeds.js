// feeds.js — ingestion and SSE stream for live feeds
const express = require('express');
const router = express.Router();

// Simple in-memory store + subscribers for PoC. Replace with Redis/pubsub in prod.
const feeds = [];
const subscribers = new Set();

// helper to broadcast to SSE subscribers
function broadcastEvent(event) {
  const data = `data: ${JSON.stringify(event)}\n\n`;
  for (const res of subscribers) {
    try { res.write(data); } catch (e) { /* ignore broken */ }
  }
}

// POST /feeds — ingest new feed item
router.post('/', (req, res) => {
  const { source, type, payload, metadata } = req.body;
  if (!source || !payload) return res.status(400).json({ error: 'source and payload required' });
  const item = {
    id: `feed_${Date.now()}_${Math.floor(Math.random()*10000)}`,
    source,
    type: type || 'generic',
    payload,
    metadata: metadata || {},
    created_at: new Date().toISOString(),
  };
  feeds.push(item);
  // broadcast to SSE subscribers
  broadcastEvent({ topic: 'feed:new', item });
  res.json({ ok: true, item });
});

// GET /feeds — list last N
router.get('/', (req, res) => {
  const limit = parseInt(req.query.limit || '20', 10);
  res.json({ items: feeds.slice(-limit) });
});

// GET /feeds/stream — server-sent events stream of live feed updates
router.get('/stream', (req, res) => {
  res.set({ 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' });
  res.flushHeaders && res.flushHeaders();
  // send a ping
  res.write(`data: ${JSON.stringify({ topic: 'open', ts: new Date().toISOString() })}\n\n`);
  subscribers.add(res);
  req.on('close', () => {
    subscribers.delete(res);
  });
});

module.exports = router;
