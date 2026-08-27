I will proceed with the incremental PR and chosen defaults as requested.

Selected non-secret choices (defaults set for the PR)
- vectorDB: milvus (recommended for open-source scalability; PoC defaults to faiss-local in .env for local testing)
- modelProviders: huggingface,openai,local
- registry: ghcr (GitHub Container Registry) — I'll include CI examples for GHCR; if you prefer Docker Hub tell me your username and I'll switch CI
- stripeChoice: now,express (I'll scaffold Stripe Connect Express onboarding + webhook handlers in a follow-up PR)
- license policy: MIT for code; content/assets policy: allow MIT and CC-BY assets for marketplace listings by default (we'll add license enforcement metadata and review gating)

Security confirmation
- I confirm I will NOT paste or request sensitive credentials in chat. You will add all API keys, Stripe keys, Apple signing keys, and registry tokens to GitHub Secrets or your vault when prompted.

Next actions
- I committed the incremental PoC files to feature/mcp-docker-marketplace. Review the branch and I will open a Pull Request on your behalf or, if you prefer, you can open the PR so you control the title/assignees.
- After you review, I will continue with implementing the vector-store clients, replace in-memory stores with Postgres, and add CI for GHCR and Stripe Connect Express scaffolding.
