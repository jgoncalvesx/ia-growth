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

export const dbService = {
  async getCampaigns() {
    if (!N8N_URL || N8N_URL.includes('sua-instancia')) return MOCK_DATA.campaigns;
    try {
      const response = await fetch(N8N_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'get_campaigns' })
      });
      return response.ok ? await response.json() : MOCK_DATA.campaigns;
    } catch (error) {
      return MOCK_DATA.campaigns;
    }
  },

  async createCampaign(data: any) {
    if (!N8N_URL || N8N_URL.includes('sua-instancia')) return { success: true };
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
    if (!N8N_URL || N8N_URL.includes('sua-instancia')) return MOCK_DATA.leads;
    try {
      const response = await fetch(N8N_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'get_leads' })
      });
      return response.ok ? await response.json() : MOCK_DATA.leads;
    } catch (error) {
      return MOCK_DATA.leads;
    }
  },

  async createLead(data: any) {
    if (!N8N_URL || N8N_URL.includes('sua-instancia')) return { success: true };
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