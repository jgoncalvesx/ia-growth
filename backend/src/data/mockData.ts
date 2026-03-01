export const MOCK_DATA = {
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
        { id: 1, executado_por: 'IA MidiaOS', mensagem: 'ajustou orçamento de Meta Ads', alvo: 'Loja Principal', hora: 'Há 10 min', tipo: 'automation' },
        { id: 2, executado_por: 'Admin User', mensagem: 'criou nova campanha', alvo: 'Verão 2024', hora: 'Há 45 min', tipo: 'manual' },
        { id: 3, executado_por: 'Beatriz Silva', mensagem: 'atualizou criativo', alvo: 'Banner Principal V2', hora: 'Há 2h', tipo: 'manual' },
        { id: 4, executado_por: 'IA MidiaOS', mensagem: 'pausou campanha por baixo ROAS', alvo: 'Google Search Test', hora: 'Há 5h', tipo: 'automation' }
    ],
    analytics: {
        plataformas: [
            { name: 'Instagram', value: 4500, color: '#E1306C' },
            { name: 'Facebook', value: 3200, color: '#1877F2' },
            { name: 'TikTok', value: 5800, color: '#000000' },
            { name: 'Google', value: 2100, color: '#4285F4' },
        ],
        cpaTrend: [
            { month: 'Jan', cpa: 12.5 }, { month: 'Fev', cpa: 11.8 }, { month: 'Mar', cpa: 14.2 },
            { month: 'Abr', cpa: 10.5 }, { month: 'Mai', cpa: 9.8 }, { month: 'Jun', cpa: 8.4 },
        ]
    },
    budget: [
        { platform: 'Meta Ads', planned: 5000, actual: 4200, color: '#3b82f6' },
        { platform: 'Google Ads', planned: 3500, actual: 3800, color: '#ef4444' },
        { platform: 'TikTok Ads', planned: 2000, actual: 1200, color: '#000000' },
        { platform: 'LinkedIn Ads', planned: 1500, actual: 450, color: '#0a66c2' },
    ]
};
