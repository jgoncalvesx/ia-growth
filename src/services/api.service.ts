"use client";

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

function qs(clienteId?: string | null): string {
  return clienteId ? `?cliente_id=${clienteId}` : '';
}

export const dbService = {
  async getCampaigns(clienteId?: string | null) {
    return callApi(`/campaigns${qs(clienteId)}`);
  },

  async createCampaign(data: any) {
    return callApi('/campaigns', 'POST', data);
  },

  async getLeads(clienteId?: string | null) {
    return callApi(`/leads${qs(clienteId)}`);
  },

  async createLead(data: any) {
    return callApi('/leads', 'POST', Object.keys(data).length > 0 ? data : { name: "Sample", email: "sample@email.com" });
  }
};

export async function fetchClientes() { return callApi('/clientes'); }
export async function fetchDashboardKpis(clienteId?: string | null) { return callApi(`/dashboard-kpis${qs(clienteId)}`); }
export async function fetchContasStatus(clienteId?: string | null) { return callApi(`/contas-status${qs(clienteId)}`); }
export async function fetchAlertasAtivos(clienteId?: string | null) { return callApi(`/alertas-ativos${qs(clienteId)}`); }
export async function fetchAcoesPendentes(clienteId?: string | null) { return callApi(`/acoes-pendentes${qs(clienteId)}`); }
export async function fetchAuditLog(clienteId?: string | null) { return callApi(`/audit-log${qs(clienteId)}`); }

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

export async function fetchMetricasAnalytics(clienteId?: string | null) {
  return callApi(`/analytics${qs(clienteId)}`);
}

export async function fetchDadosBudget(clienteId?: string | null) {
  return callApi(`/budget${qs(clienteId)}`);
}
