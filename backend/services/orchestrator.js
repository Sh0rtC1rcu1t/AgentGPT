// orchestrator.js — simple agent rotation scheduler and dispatcher (PoC)
const axios = require('axios');

// rotation policy: rotate agents every N seconds or after M uses
class RotationPool {
  constructor(opts = {}) {
    this.agents = opts.agents || ['agent-a','agent-b','agent-c'];
    this.index = 0;
    this.uses = {};
    this.maxUses = opts.maxUses || 5; // rotate after this many uses
  }

  next() {
    const agent = this.agents[this.index % this.agents.length];
    this.uses[agent] = (this.uses[agent]||0) + 1;
    if (this.uses[agent] >= this.maxUses) {
      this.index = (this.index + 1) % this.agents.length;
      this.uses[agent] = 0;
    }
    return agent;
  }
}

const pools = {
  default: new RotationPool({ agents: ['agent_alpha','agent_beta','agent_gamma'], maxUses: 3 })
};

async function dispatchToAgent(agentId, task) {
  // PoC: call local /run endpoint to execute the task using configured provider
  try {
    const res = await axios.post(process.env.BACKEND_URL ? `${process.env.BACKEND_URL}/run` : 'http://localhost:4000/run', { provider: task.provider, model: task.model, prompt: task.prompt }, { timeout: 120000 });
    return { ok: true, agent: agentId, result: res.data };
  } catch (err) {
    return { ok: false, agent: agentId, error: err.message };
  }
}

async function scheduleTask(task, poolName='default') {
  const pool = pools[poolName] || pools.default;
  const agent = pool.next();
  const out = await dispatchToAgent(agent, task);
  return out;
}

module.exports = { scheduleTask, pools, RotationPool };
