// vector-store.js — adapter skeleton for vector DBs (PoC)

class VectorStoreAdapter {
  constructor(cfg = {}) {
    this.type = (process.env.VECTOR_DB || cfg.type || 'faiss-local').toLowerCase();
    this.cfg = cfg;
    // placeholder clients
    this.client = null;
  }

  async init() {
    if (this.type === 'pinecone') {
      // require user to set PINECONE_API_KEY and PINECONE_ENV
      // this.client = new PineconeClient(...)
      this.client = { name: 'pinecone-mock' };
    } else if (this.type === 'milvus') {
      // connect to milvus server specified by MILVUS_URL
      this.client = { name: 'milvus-mock' };
    } else {
      // faiss-local fallback (local on-disk index)
      this.client = { name: 'faiss-local-mock' };
    }
    console.log(`VectorStore initialized type=${this.type}`);
  }

  async upsert(id, vector, metadata) {
    // store vector + metadata in chosen backend; PoC: no-op
    console.log('vector upsert', id, vector && vector.length, metadata && Object.keys(metadata));
    return { ok: true };
  }

  async query(vector, topK = 10) {
    // return nearest neighbors
    return { ok: true, results: [] };
  }

  async compact() {
    // compaction procedure: cluster/merge old vectors — PoC stub
    console.log('compact called');
    return { ok: true };
  }
}

module.exports = VectorStoreAdapter;
