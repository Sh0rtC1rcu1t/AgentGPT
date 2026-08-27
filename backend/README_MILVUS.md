# Milvus adapter & compaction worker (PoC)

This folder contains a Milvus client stub and a compaction worker skeleton. For production:

- Replace the MilvusClientMock with the official Milvus client and proper connection/auth config.
- Ensure the Milvus server is provisioned (helm, docker-compose or cloud hosted) and MILVUS_URL is set.
- Add tests that validate upsert/query and compaction behavior.
