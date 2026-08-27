#!/usr/bin/env node
// Simple CLI to call backend /run
const fetch = require('node-fetch');
const argv = require('minimist')(process.argv.slice(2));

const BACKEND = process.env.BACKEND_URL || 'http://localhost:4000';

async function run() {
  const prompt = argv._.join(' ') || argv.prompt || 'Hello from agentctl';
  const provider = argv.provider || process.env.PROVIDER || 'HUGGINGFACE';
  const model = argv.model || 'gpt2';
  const res = await fetch(`${BACKEND}/run`, { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({ provider, model, prompt }) });
  const j = await res.json();
  console.log(JSON.stringify(j, null, 2));
}

run().catch(err => { console.error(err); process.exit(1); });
