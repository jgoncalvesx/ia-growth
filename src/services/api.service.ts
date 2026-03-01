"use client";

// Removidas as lógicas de n8n_url e MOCK_DATA, pois tudo agora vem do Backend via '/api'

async function callApi(path: string, method = 'GET', body?: object) {
  const res = await fetch(`/api${path}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status} from API`);
  }
  return res.json();
}

export const dbService = {
  async getCampaigns() {
    return callApi('/campaigns');
  },

  async createCampaign(data: any) {
    return callApi('/campaigns', 'POST', data);
  },

  async getLeads() {
    return callApi('/leads');
  },

  async createLead(data: any) {
    return callApi('/leads', 'POST', Object.keys(data).length > 0 ? data : { name: "Sample", email: "sample@email.com" });
  }
};

export async function fetchDashboardKpis() { return callApi('/dashboard-kpis'); }
export async function fetchContasStatus() { return callApi('/contas-status'); }
export async function fetchAlertasAtivos() { return callApi('/alertas-ativos'); }
export async function fetchAcoesPendentes() { return callApi('/acoes-pendentes'); }
export async function fetchAuditLog() { return callApi('/audit-log'); }

export async function enviarMensagemChat(pergunta: string, contaId: string | null = null, periodo: string = '30d') {
  return callApi('/chat', 'POST', { pergunta, conta_id: contaId, periodo });
}

export async function executarAcao(acaoId: string) {
  return callApi('/executar-acao', 'POST', { acao_id: acaoId });
}

export async function ignorarAcao(acaoId: string) {
  return callApi('/ignorar-acao', 'POST', { acao_id: acaoId });
}

export async function executarAnalise(tipo: string, contaId: string | null = null, periodo: string = '30d') {
  return callApi('/executar-analise', 'POST', { tipo, conta_id: contaId, periodo });
}

export async function fetchMetricasAnalytics(contaId: string | null = null) {
  return callApi(contaId ? `/analytics?conta_id=${contaId}` : '/analytics');
}

export async function fetchDadosBudget(contaId: string | null = null) {
  return callApi(contaId ? `/budget?conta_id=${contaId}` : '/budget');
}