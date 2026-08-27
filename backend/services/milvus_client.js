// milvus_client.js — simple Milvus client adapter (PoC stub)
// Replace with the official Milvus JS client when available and configure MILVUS_URL in .env

class MilvusClientMock {
  constructor(cfg = {}) {
    this.url = cfg.url || process.env.MILVUS_URL || 'http://localhost:19121';
    this.name = 'milvus-mock';
  }

  async init() {
    console.log('[milvus] init', this.url);
    // Connect and ensure collection/index exists
    return true;
  }

  async upsert(collection, id, vector, metadata) {
    console.log('[milvus] upsert', collection, id, vector && vector.length);
    return { ok: true };
  }

  async query(collection, vector, topK=10) {
    console.log('[milvus] query', collection, vector && vector.length, topK);
    return { ok: true, results: [] };
  }
}

module.exports = MilvusClientMock;
