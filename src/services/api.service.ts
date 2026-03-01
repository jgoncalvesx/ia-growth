"use client";

// URL do n8n (opcional por enquanto)
const N8N_URL = import.meta.env.VITE_N8N_WEBHOOK_URL;

// Dados de simulação para você conferir o projeto sem erros
const MOCK_DATA = {
  campaigns: [
    { id: 1, name: 'Campanha Verão 2024 (Simulada)', status: 'Ativa', budget: 'R$ 5.000', spent: 'R$ 1.200', platform: 'Meta' },
    { id: 2, name: 'Black Friday (Simulada)', status: 'Pausada', budget: 'R$ 15.000', spent: 'R$ 14.800', platform: 'Google' }
  ],
  leads: [
    { id: 1, name: 'João Mock Silva', email: 'joao@mock.com', source: 'Instagram' },
    { id: 2, name: 'Maria Mock Oliveira', email: 'maria@mock.com', source: 'Google' }
  ]
};

export const dbService = {
  async getCampaigns() {
    // Se não houver URL configurada, retorna os dados de simulação imediatamente
    if (!N8N_URL || N8N_URL.includes('sua-instancia')) {
      return MOCK_DATA.campaigns;
    }

    try {
      const response = await fetch(N8N_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'get_campaigns' })
      });
      
      if (!response.ok) return MOCK_DATA.campaigns; // Fallback em caso de erro
      return await response.json();
    } catch (error) {
      console.warn('Usando dados simulados (SQL/n8n não disponível)');
      return MOCK_DATA.campaigns;
    }
  },

  async createLead(leadData: any) {
    if (!N8N_URL || N8N_URL.includes('sua-instancia')) {
      console.log('Simulação: Lead criado localmente', leadData);
      return { success: true };
    }

    try {
      const response = await fetch(N8N_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'create_lead', data: leadData })
      });
      return await response.json();
    } catch (error) {
      return { success: true, mocked: true };
    }
  }
};