"use client";

const N8N_URL = import.meta.env.VITE_N8N_WEBHOOK_URL;

const MOCK_DATA = {
  campaigns: [
    { id: 1, name: 'Verão 2024 (Simulado)', status: 'Ativa', budget: 'R$ 5.000', spent: 'R$ 1.200', platform: 'Meta' },
    { id: 2, name: 'Black Friday (Simulado)', status: 'Pausada', budget: 'R$ 15.000', spent: 'R$ 14.800', platform: 'Google' },
    { id: 3, name: 'Lançamento App (Simulado)', status: 'Ativa', budget: 'R$ 2.500', spent: 'R$ 450', platform: 'TikTok' }
  ],
  leads: [
    { id: 1, name: 'João Silva', email: 'joao@exemplo.com', phone: '(11) 99999-9999', source: 'Instagram', status: 'Novo', date: '2024-05-20' },
    { id: 2, name: 'Maria Oliveira', email: 'maria@exemplo.com', phone: '(21) 98888-8888', source: 'Google Ads', status: 'Em Contato', date: '2024-05-19' },
    { id: 3, name: 'Pedro Santos', email: 'pedro@exemplo.com', phone: '(31) 97777-7777', source: 'TikTok', status: 'Qualificado', date: '2024-05-18' }
  ]
};

const isConfigured = () => {
  return N8N_URL && N8N_URL !== "" && !N8N_URL.includes('sua-instancia');
};

export const dbService = {
  async getCampaigns() {
    if (!isConfigured()) return MOCK_DATA.campaigns;
    try {
      const response = await fetch(N8N_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'get_campaigns' })
      });
      if (!response.ok) return MOCK_DATA.campaigns;
      const data = await response.json();
      return Array.isArray(data) ? data : MOCK_DATA.campaigns;
    } catch (error) {
      console.warn("N8N fetch failed, using mock data", error);
      return MOCK_DATA.campaigns;
    }
  },

  async createCampaign(data: any) {
    if (!isConfigured()) {
      console.log("Mock create campaign:", data);
      return { success: true };
    }
    try {
      const response = await fetch(N8N_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'create_campaign', data })
      });
      return await response.json();
    } catch (error) {
      return { success: true };
    }
  },

  async getLeads() {
    if (!isConfigured()) return MOCK_DATA.leads;
    try {
      const response = await fetch(N8N_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'get_leads' })
      });
      if (!response.ok) return MOCK_DATA.leads;
      const data = await response.json();
      return Array.isArray(data) ? data : MOCK_DATA.leads;
    } catch (error) {
      console.warn("N8N fetch failed, using mock data", error);
      return MOCK_DATA.leads;
    }
  },

  async createLead(data: any) {
    if (!isConfigured()) {
      console.log("Mock create lead:", data);
      return { success: true };
    }
    try {
      const response = await fetch(N8N_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'create_lead', data })
      });
      return await response.json();
    } catch (error) {
      return { success: true };
    }
  }
};

// --- NOVA FUNÇÃO AUXILIAR DE WEBHOOK ---
async function callWebhook(path: string, method = 'GET', body?: object) {
  const base = import.meta.env.VITE_N8N_URL || '';
  const res = await fetch(`${base}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

// ─── DASHBOARD Growth Midia IA ───────────────────────────────────────────
export async function fetchDashboardKpis() {
  return callWebhook('/dashboard-kpis');
}

export async function fetchContasStatus() {
  return callWebhook('/contas-status');
}

export async function fetchAlertasAtivos() {
  return callWebhook('/alertas-ativos');
}

// ─── CHAT COM CLAUDE ─────────────────────────────────────────────
export async function enviarMensagemChat(
  pergunta: string,
  contaId: string | null = null,
  periodo: string = '30d'
) {
  return callWebhook('/chat', 'POST', { pergunta, conta_id: contaId, periodo });
}

// ─── EXECUÇÃO ────────────────────────────────────────────────────
export async function fetchAcoesPendentes() {
  return callWebhook('/acoes-pendentes');
}

export async function executarAcao(acaoId: string) {
  return callWebhook('/executar-acao', 'POST', { acao_id: acaoId });
}

export async function ignorarAcao(acaoId: string) {
  return callWebhook('/ignorar-acao', 'POST', { acao_id: acaoId });
}

export async function fetchAuditLog() {
  return callWebhook('/audit-log');
}

// ─── BIBLIOTECA ──────────────────────────────────────────────────
export async function executarAnalise(
  tipo: string,
  contaId: string | null = null,
  periodo: string = '30d'
) {
  return callWebhook('/executar-analise', 'POST', { tipo, conta_id: contaId, periodo });
}

// ─── ANALYTICS (substituir mocks) ────────────────────────────────
export async function fetchMetricasAnalytics(contaId: string | null = null) {
  return callWebhook(`/analytics${contaId ? `?conta_id=${contaId}` : ''}`);
}

export async function fetchDadosBudget(contaId: string | null = null) {
  return callWebhook(`/budget${contaId ? `?conta_id=${contaId}` : ''}`);
}