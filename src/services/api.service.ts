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
  ],
  dashboardKpis: {
    investimento: "12.450",
    cpl_medio: "5,18",
    leads: "2.403",
    roas: "4,2",
    investimento_delta: "+12%",
    cpl_delta: "-8%",
    leads_delta: "+15%",
    roas_delta: "+0.3"
  },
  contasStatus: [
    { nome: 'Loja Principal', canal: 'Meta Ads', cpl_real: 4.50, cpl_meta: 5.00, cpl_max: 7.00, investimento_hoje: 450, status: 'green' },
    { nome: 'E-commerce Google', canal: 'Google Ads', cpl_real: 8.20, cpl_meta: 6.00, cpl_max: 9.00, investimento_hoje: 890, status: 'yellow' },
    { nome: 'TikTok Branding', canal: 'TikTok Ads', cpl_real: 2.10, cpl_meta: 3.50, cpl_max: 4.50, investimento_hoje: 120, status: 'green' }
  ],
  alertas: [
    { tipo: 'danger', titulo: 'CPA Crítico no Google', descricao: 'O custo por aquisição na campanha de Search subiu 40% nas últimas 2h.', acao: 'Pausar Campanha' },
    { tipo: 'warn', titulo: 'Orçamento Meta no Limite', descricao: 'Você atingiu 90% do orçamento diário planejado para hoje.', acao: 'Ajustar Limite' }
  ],
  acoesPendentes: [
    { id: '1', titulo: 'Reduzir Lances Google Search', conta_nome: 'E-commerce Google', urgencia: 'alta', racional: 'O CPL está 30% acima da meta máxima permitida.', comando_api: 'reduce_bids', economia_estimada: 'R$ 150/dia' },
    { id: '2', titulo: 'Escalar Campanha Reels', conta_nome: 'Loja Principal', urgencia: 'media', racional: 'Performance excepcional com ROAS de 8.5x nas últimas 48h.', comando_api: 'increase_budget', economia_estimada: 'Vendas Adicionais' }
  ],
  auditLog: [
    { hora: '10:45', mensagem: 'Orçamento Meta Ads ajustado para R$ 500/dia', executado_por: 'IA MidiaOS', tipo: 'automation' },
    { hora: '09:30', mensagem: 'Nova campanha "Inverno 2024" criada', executado_por: 'Admin', tipo: 'manual' }
  ]
};

const isConfigured = () => {
  return N8N_URL && N8N_URL !== "" && !N8N_URL.includes('sua-instancia');
};

const isWebhookConfigured = () => {
  const base = import.meta.env.VITE_N8N_URL;
  return base && base !== "" && !base.includes('sua-instancia');
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

async function callWebhook(path: string, method = 'GET', body?: object) {
  if (!isWebhookConfigured()) {
    if (path === '/dashboard-kpis') return MOCK_DATA.dashboardKpis;
    if (path === '/contas-status') return MOCK_DATA.contasStatus;
    if (path === '/alertas-ativos') return MOCK_DATA.alertas;
    if (path === '/acoes-pendentes') return MOCK_DATA.acoesPendentes;
    if (path === '/audit-log') return MOCK_DATA.auditLog;
    return {};
  }
  const base = import.meta.env.VITE_N8N_URL || '';
  const res = await fetch(`${base}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function fetchDashboardKpis() { return callWebhook('/dashboard-kpis'); }
export async function fetchContasStatus() { return callWebhook('/contas-status'); }
export async function fetchAlertasAtivos() { return callWebhook('/alertas-ativos'); }
export async function enviarMensagemChat(pergunta: string, contaId: string | null = null, periodo: string = '30d') {
  if (!isWebhookConfigured()) return { analise: "Simulação: Para ter respostas reais da IA, configure seu Webhook no n8n.", confianca: 0.95 };
  return callWebhook('/chat', 'POST', { pergunta, conta_id: contaId, periodo });
}
export async function fetchAcoesPendentes() { return callWebhook('/acoes-pendentes'); }
export async function executarAcao(acaoId: string) { return callWebhook('/executar-acao', 'POST', { acao_id: acaoId }); }
export async function ignorarAcao(acaoId: string) { return callWebhook('/ignorar-acao', 'POST', { acao_id: acaoId }); }
export async function fetchAuditLog() { return callWebhook('/audit-log'); }
export async function executarAnalise(tipo: string, contaId: string | null = null, periodo: string = '30d') {
  return callWebhook('/executar-analise', 'POST', { tipo, conta_id: contaId, periodo });
}
export async function fetchMetricasAnalytics(contaId: string | null = null) { return callWebhook(`/analytics${contaId ? `?conta_id=${contaId}` : ''}`); }
export async function fetchDadosBudget(contaId: string | null = null) { return callWebhook(`/budget${contaId ? `?conta_id=${contaId}` : ''}`); }