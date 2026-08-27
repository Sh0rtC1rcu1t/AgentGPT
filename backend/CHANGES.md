# Incremental PR changes — feeds, orchestrator, vector-store, reviews

This commit adds a small proof-of-concept incremental set of features to feature/mcp-docker-marketplace:

- backend/routes/feeds.js: ingestion endpoint POST /feeds and SSE stream GET /feeds/stream
- backend/routes/reviews.js: simple peer-review endpoints POST /reviews and GET /reviews
- backend/services/orchestrator.js: rotation pool scheduler and a scheduleTask(task) helper that dispatches tasks to an agent (PoC uses backend /run)
- backend/services/vector-store.js: adapter skeleton that supports pinecone, milvus, and faiss-local modes (stubs for now)
- backend/models/migrations/0001_add_provenance_and_ledger.sql: SQL migration stubs for provenance, reviews, and ledger_transactions

Local testing notes
- Start the existing backend (node index.js) and then POST to /feeds to see SSE updates at /feeds/stream
- The orchestrator scheduleTask() function invokes your /run endpoint — it reads BACKEND_URL from env or defaults to http://localhost:4000
- Vector store is a PoC stub until you choose a real backend (pinecone/milvus/faiss)

Next steps after review
- Replace in-memory stores with Postgres-backed models and Redis/pubsub for SSE scaling
- Implement real vector-store clients (Milvus or Pinecone) and add a compaction worker
- Add authentication, RBAC, and audit middleware
- Wire native apps to subscribe to /feeds/stream and render animated live cards
