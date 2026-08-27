# AgentGPT — MCP PoC (Model Control Panel) PoC

This branch contains a small proof-of-concept for the Model Control Panel (MCP), Dockerization, and a minimal marketplace/agent runner scaffold.

What's included:
- backend/: minimal Express API with pluggable provider adapters (OpenAI, Hugging Face, LOCAL)
- frontend/: tiny static UI to call the /run endpoint
- cli/: small `agentctl` script to call the backend from the terminal
- docker-compose.yml for local dev
- .env.example

Security / payments / bank info
- DO NOT commit real bank account numbers, routing numbers, Stripe secrets, or other secret credentials to this repo.
- For payouts and marketplace banking (SEAGLASS LABBS LLC), use Stripe Connect. Add banking information only via the Stripe dashboard during onboarding — never in source control.

How to run (local dev)
1) Clone this branch and copy .env.example -> .env and fill provider keys you want to test.
2) docker-compose up --build
3) Backend: http://localhost:4000
4) Frontend: http://localhost:3000

This PoC is intentionally small — after you review, I will extend it with worker queues, batched/parallel model calls, Docker image build/publish CI, marketplace endpoints, and the MCP UI.
