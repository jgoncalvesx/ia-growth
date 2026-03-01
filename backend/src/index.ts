import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { MOCK_DATA } from './data/mockData';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// ==========================================
// MÓDULO DE EXIBIÇÃO DE DADOS (GETs)
// ==========================================

app.get('/api/dashboard-kpis', (req: Request, res: Response) => {
    res.json(MOCK_DATA.dashboardKpis);
});

app.get('/api/contas-status', (req: Request, res: Response) => {
    res.json(MOCK_DATA.contasStatus);
});

app.get('/api/alertas-ativos', (req: Request, res: Response) => {
    res.json(MOCK_DATA.alertas);
});

app.get('/api/acoes-pendentes', (req: Request, res: Response) => {
    res.json(MOCK_DATA.acoesPendentes);
});

app.get('/api/audit-log', (req: Request, res: Response) => {
    res.json(MOCK_DATA.auditLog);
});

app.get('/api/analytics', (req: Request, res: Response) => {
    res.json(MOCK_DATA.analytics);
});

app.get('/api/budget', (req: Request, res: Response) => {
    res.json(MOCK_DATA.budget);
});

// ==========================================
// MÓDULO DE GESTÃO DE ENTIDADES
// ==========================================

app.get('/api/campaigns', (req: Request, res: Response) => {
    res.json(MOCK_DATA.campaigns);
});

app.get('/api/leads', (req: Request, res: Response) => {
    res.json(MOCK_DATA.leads);
});

app.post('/api/leads', (req: Request, res: Response) => {
    const newLead = req.body;
    console.log("Mock create lead recebido:", newLead);
    res.status(201).json({ success: true, message: "Lead criado (Mock)", lead: newLead });
});

// ==========================================
// MÓDULO DE IA E ORQUESTRAÇÃO (POSTs)
// ==========================================

app.post('/api/chat', (req: Request, res: Response) => {
    const { pergunta } = req.body;
    console.log(`Nova mensagem de Chat: ${pergunta}`);
    res.json({
        analise: "Mock do Backend: Estou processando sua requisição localmente pelo Express.",
        confianca: 0.99
    });
});

app.post('/api/executar-acao', (req: Request, res: Response) => {
    const { acao_id } = req.body;
    res.json({ success: true, message: `Ação ${acao_id} executada (Mock)` });
});

app.post('/api/ignorar-acao', (req: Request, res: Response) => {
    const { acao_id } = req.body;
    res.json({ success: true, message: `Ação ${acao_id} ignorada (Mock)` });
});

app.post('/api/executar-analise', (req: Request, res: Response) => {
    const { tipo, conta_id } = req.body;
    res.json({ success: true, message: `Análise '${tipo}' startada para a conta ${conta_id} (Mock)` });
});

// ==========================================
// SERVER START
// ==========================================

app.listen(PORT, () => {
    console.log(`🚀 Backend Express rodando em http://localhost:${PORT}/api`);
});
