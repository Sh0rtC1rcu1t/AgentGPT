const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 4000;
const PROVIDER = (process.env.PROVIDER || 'HUGGINGFACE').toUpperCase();

function listProviders() {
  return ['HUGGINGFACE','OPENAI','LOCAL'];
}

// Simple adapter dispatcher
async function runProvider(provider, model, prompt, options) {
  provider = (provider || PROVIDER || 'HUGGINGFACE').toUpperCase();
  if (provider === 'HUGGINGFACE') return runHuggingFace(model, prompt, options);
  if (provider === 'OPENAI') return runOpenAI(model, prompt, options);
  if (provider === 'LOCAL') return runLocal(model, prompt, options);
  throw new Error('Unknown provider '+provider);
}

async function runHuggingFace(model, prompt, options) {
  const token = process.env.HUGGINGFACE_API_TOKEN;
  if (!token) return {error:'No HUGGINGFACE_API_TOKEN configured'};
  const url = `https://api-inference.huggingface.co/models/${model}`;
  try {
    const res = await axios.post(url, { inputs: prompt }, { headers: { Authorization: `Bearer ${token}` }, timeout: 120000 });
    return { provider: 'HUGGINGFACE', raw: res.data };
  } catch (err) {
    return { error: err.message, details: err.response && err.response.data };
  }
}

async function runOpenAI(model, prompt, options) {
  const token = process.env.OPENAI_API_KEY;
  if (!token) return {error:'No OPENAI_API_KEY configured'};
  try {
    const res = await axios.post('https://api.openai.com/v1/chat/completions', { model, messages: [{ role: 'user', content: prompt }], max_tokens: 512 }, { headers: { Authorization: `Bearer ${token}`, 'Content-Type':'application/json' }, timeout: 120000 });
    return { provider: 'OPENAI', raw: res.data };
  } catch (err) {
    return { error: err.message, details: err.response && err.response.data };
  }
}

async function runLocal(model, prompt, options) {
  const server = process.env.LOCAL_LLAMA_SERVER;
  if (!server) return { error: 'No LOCAL_LLAMA_SERVER configured' };
  try {
    const res = await axios.post(`${server}/generate`, { model, prompt }, { timeout: 120000 });
    return { provider: 'LOCAL', raw: res.data };
  } catch (err) {
    return { error: err.message, details: err.response && err.response.data };
  }
}

app.get('/providers', (req, res) => {
  res.json({ providers: listProviders(), selected: PROVIDER });
});

// Run a single prompt against a provider (sync). For PoC only.
app.post('/run', async (req, res) => {
  const { provider, model, prompt, options } = req.body;
  if (!prompt) return res.status(400).json({ error: 'prompt required' });
  try {
    const out = await runProvider(provider, model || 'gpt2', prompt, options || {});
    res.json({ ok: true, result: out });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`AgentGPT MCP PoC backend running on port ${PORT} (provider=${PROVIDER})`);
});
