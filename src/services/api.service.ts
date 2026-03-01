"use client";

// Este serviço agora dispara chamadas para o seu n8n
// O n8n deve receber o JSON, processar no PostgreSQL e retornar o resultado.

const N8N_URL = import.meta.env.VITE_N8N_WEBHOOK_URL;

export const dbService = {
  // Busca campanhas via n8n
  async getCampaigns() {
    try {
      const response = await fetch(N8N_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'get_campaigns' })
      });
      
      if (!response.ok) throw new Error('Erro na resposta do n8n');
      return await response.json();
    } catch (error) {
      console.error('Erro ao conectar com n8n:', error);
      // Retornamos um array vazio para não quebrar a UI enquanto você configura o n8n
      return []; 
    }
  },

  // Cria um lead via n8n
  async createLead(leadData: any) {
    try {
      const response = await fetch(N8N_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'create_lead',
          data: leadData 
        })
      });
      return await response.json();
    } catch (error) {
      console.error('Erro ao enviar lead para o n8n:', error);
      throw error;
    }
  }
};