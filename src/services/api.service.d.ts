export declare const dbService: {
    getCampaigns(): Promise<any>;
    createCampaign(data: any): Promise<any>;
    getLeads(): Promise<any>;
    createLead(data: any): Promise<any>;
};
export declare function fetchDashboardKpis(): Promise<any>;
export declare function fetchContasStatus(): Promise<any>;
export declare function fetchAlertasAtivos(): Promise<any>;
export declare function fetchAcoesPendentes(): Promise<any>;
export declare function fetchAuditLog(): Promise<any>;
export declare function enviarMensagemChat(pergunta: string, contaId?: string | null, periodo?: string): Promise<any>;
export declare function executarAcao(acaoId: string): Promise<any>;
export declare function ignorarAcao(acaoId: string): Promise<any>;
export declare function executarAnalise(tipo: string, contaId?: string | null, periodo?: string): Promise<any>;
export declare function fetchMetricasAnalytics(contaId?: string | null): Promise<any>;
export declare function fetchDadosBudget(contaId?: string | null): Promise<any>;
//# sourceMappingURL=api.service.d.ts.map