import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './db';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Serializa BigInt (vindo de colunas bigint do PostgreSQL) para Number no JSON
app.set('json replacer', (_key: string, value: unknown) =>
  typeof value === 'bigint' ? Number(value) : value
);

// ==========================================
// CLIENTES
// ==========================================

app.get('/api/clientes', async (_req: Request, res: Response) => {
  try {
    const clientes = await db.clientes.findMany({
      where: { ativo: true },
      select: { id: true, nome: true, slug: true, cor_primaria: true, logo_url: true },
      orderBy: { nome: 'asc' },
    });
    res.json(clientes);
  } catch (err) {
    console.error('[clientes]', err);
    res.status(500).json({ error: 'Erro ao buscar clientes' });
  }
});

// ==========================================
// DASHBOARD
// ==========================================

app.get('/api/dashboard-kpis', async (req: Request, res: Response) => {
  try {
    const { cliente_id } = req.query;

    const rows: any[] = cliente_id
      ? await db.$queryRaw`SELECT * FROM v_dashboard_hoje WHERE cliente_id = ${cliente_id}::uuid`
      : await db.$queryRaw`SELECT * FROM v_dashboard_hoje`;

    if (rows.length === 0) {
      return res.json({ investimento: '0.00', cpl_medio: '0.00', leads: '0', roas: '0.0' });
    }

    const totalInvestimento = rows.reduce((s: number, r: any) => s + Number(r.investimento_hoje ?? 0), 0);
    const totalLeads = rows.reduce((s: number, r: any) => s + Number(r.leads_hoje ?? 0), 0);
    const avgCpl = totalLeads > 0 ? totalInvestimento / totalLeads : 0;
    const avgRoas = rows.reduce((s: number, r: any) => s + Number(r.roas_hoje ?? 0), 0) / rows.length;

    res.json({
      investimento: totalInvestimento.toFixed(2),
      cpl_medio: avgCpl.toFixed(2),
      leads: String(totalLeads),
      roas: avgRoas.toFixed(1),
    });
  } catch (err) {
    console.error('[dashboard-kpis]', err);
    res.status(500).json({ error: 'Erro ao buscar KPIs do dashboard' });
  }
});

// ==========================================
// CONTAS / STATUS
// ==========================================

app.get('/api/contas-status', async (req: Request, res: Response) => {
  try {
    const { cliente_id } = req.query;

    const rows: any[] = cliente_id
      ? await db.$queryRaw`SELECT * FROM v_kpis_30d WHERE cliente_id = ${cliente_id}::uuid`
      : await db.$queryRaw`SELECT * FROM v_kpis_30d`;

    const result = rows.map((r: any) => ({
      nome: r.conta_nome,
      canal: r.plataforma,
      cpl_real: Number(r.cpl_medio ?? 0),
      cpl_meta: Number(r.cpl_meta ?? 0),
      cpl_max: Number(r.cpl_max ?? 0),
      investimento: Number(r.investimento ?? 0),
      leads_qualificados: Number(r.leads_qualificados ?? 0),
      vendas: Number(r.vendas ?? 0),
      roas_medio: Number(r.roas_medio ?? 0),
      status: r.status_semaforo,
    }));

    res.json(result);
  } catch (err) {
    console.error('[contas-status]', err);
    res.status(500).json({ error: 'Erro ao buscar status das contas' });
  }
});

// ==========================================
// ALERTAS
// ==========================================

app.get('/api/alertas-ativos', async (req: Request, res: Response) => {
  try {
    const { cliente_id } = req.query;

    const rows: any[] = cliente_id
      ? await db.$queryRaw`SELECT * FROM v_alertas_cpl WHERE cliente_id = ${cliente_id}::uuid`
      : await db.$queryRaw`SELECT * FROM v_alertas_cpl`;

    const alertas = rows.map((r: any) => ({
      conta_id: r.conta_id,
      tipo: 'danger',
      titulo: `CPL Alto: ${r.conta_nome}`,
      descricao: `Anúncio ${r.ad_id} com CPL de R$ ${Number(r.cpl_real).toFixed(2)} (máx permitido: R$ ${Number(r.cpl_max).toFixed(2)})`,
      acao: 'Analisar',
    }));

    res.json(alertas);
  } catch (err) {
    console.error('[alertas-ativos]', err);
    res.status(500).json({ error: 'Erro ao buscar alertas' });
  }
});

// ==========================================
// AÇÕES PENDENTES DA IA
// ==========================================

app.get('/api/acoes-pendentes', async (req: Request, res: Response) => {
  try {
    const { cliente_id } = req.query;

    const acoes = await db.acoes_ia.findMany({
      where: {
        status: 'pendente',
        ...(cliente_id ? { cliente_id: String(cliente_id) } : {}),
      },
      include: { contas_anuncio: { select: { nome: true } } },
      orderBy: { criado_em: 'desc' },
    });

    const result = acoes.map(a => ({
      id: a.id,
      titulo: a.titulo,
      conta_nome: a.contas_anuncio?.nome ?? 'N/A',
      urgencia: a.urgencia,
      racional: a.racional,
      comando_api: a.comando_api,
      economia_estimada: a.economia_estimada,
    }));

    res.json(result);
  } catch (err) {
    console.error('[acoes-pendentes]', err);
    res.status(500).json({ error: 'Erro ao buscar ações pendentes' });
  }
});

// ==========================================
// AUDIT LOG
// ==========================================

app.get('/api/audit-log', async (req: Request, res: Response) => {
  try {
    const { cliente_id } = req.query;

    const logs = await db.audit_log.findMany({
      where: {
        ...(cliente_id ? { cliente_id: String(cliente_id) } : {}),
      },
      orderBy: { criado_em: 'desc' },
      take: 50,
    });

    res.json(logs);
  } catch (err) {
    console.error('[audit-log]', err);
    res.status(500).json({ error: 'Erro ao buscar audit log' });
  }
});

// ==========================================
// ANALYTICS
// ==========================================

app.get('/api/analytics', async (req: Request, res: Response) => {
  try {
    const { cliente_id } = req.query;

    const porPlataforma: any[] = cliente_id
      ? await db.$queryRaw`
          SELECT ca.plataforma, SUM(m.investimento) AS total_investimento
          FROM metricas_diarias m
          JOIN contas_anuncio ca ON ca.id = m.conta_id
          WHERE ca.cliente_id = ${cliente_id}::uuid
          GROUP BY ca.plataforma ORDER BY total_investimento DESC`
      : await db.$queryRaw`
          SELECT ca.plataforma, SUM(m.investimento) AS total_investimento
          FROM metricas_diarias m
          JOIN contas_anuncio ca ON ca.id = m.conta_id
          GROUP BY ca.plataforma ORDER BY total_investimento DESC`;

    const tendenciaCpl: any[] = cliente_id
      ? await db.$queryRaw`
          SELECT TO_CHAR(DATE_TRUNC('month', m.data), 'Mon') AS mes,
            ROUND(SUM(m.investimento) / NULLIF(SUM(m.leads_plataforma), 0), 2) AS cpl
          FROM metricas_diarias m
          JOIN contas_anuncio ca ON ca.id = m.conta_id
          WHERE m.data >= NOW() - INTERVAL '6 months'
            AND ca.cliente_id = ${cliente_id}::uuid
          GROUP BY DATE_TRUNC('month', m.data) ORDER BY DATE_TRUNC('month', m.data)`
      : await db.$queryRaw`
          SELECT TO_CHAR(DATE_TRUNC('month', data), 'Mon') AS mes,
            ROUND(SUM(investimento) / NULLIF(SUM(leads_plataforma), 0), 2) AS cpl
          FROM metricas_diarias
          WHERE data >= NOW() - INTERVAL '6 months'
          GROUP BY DATE_TRUNC('month', data) ORDER BY DATE_TRUNC('month', data)`;

    res.json({
      plataformas: porPlataforma.map((r: any) => ({
        name: r.plataforma,
        value: Number(r.total_investimento ?? 0),
      })),
      cpaTrend: tendenciaCpl.map((r: any) => ({
        month: r.mes,
        cpa: Number(r.cpl ?? 0),
      })),
    });
  } catch (err) {
    console.error('[analytics]', err);
    res.status(500).json({ error: 'Erro ao buscar analytics' });
  }
});

// ==========================================
// ORÇAMENTO
// ==========================================

app.get('/api/budget', async (req: Request, res: Response) => {
  try {
    const { cliente_id } = req.query;

    const orcamentos = await db.orcamentos.findMany({
      where: {
        ...(cliente_id ? { cliente_id: String(cliente_id) } : {}),
      },
      include: { contas_anuncio: { select: { plataforma: true } } },
      orderBy: { periodo_inicio: 'desc' },
    });

    const result = orcamentos.map(o => ({
      id: o.id,
      platform: o.contas_anuncio?.plataforma ?? 'Geral',
      planned: Number(o.valor_planejado ?? 0),
      actual: Number(o.valor_gasto ?? 0),
      periodo_inicio: o.periodo_inicio,
      periodo_fim: o.periodo_fim,
    }));

    res.json(result);
  } catch (err) {
    console.error('[budget]', err);
    res.status(500).json({ error: 'Erro ao buscar orçamentos' });
  }
});

// ==========================================
// CAMPANHAS
// ==========================================

app.get('/api/campaigns', async (req: Request, res: Response) => {
  try {
    const { cliente_id } = req.query;

    const campanhas = await db.campanhas.findMany({
      where: cliente_id
        ? { contas_anuncio: { cliente_id: String(cliente_id) } }
        : {},
      include: { contas_anuncio: { select: { nome: true, plataforma: true } } },
      orderBy: { atualizado_em: 'desc' },
    });

    const result = campanhas.map(c => ({
      id: c.id,
      name: c.nome,
      status: c.status,
      budget_diario: Number(c.budget_diario ?? 0),
      budget_total: Number(c.budget_total ?? 0),
      platform: c.contas_anuncio.plataforma,
      conta_nome: c.contas_anuncio.nome,
      data_inicio: c.data_inicio,
      data_fim: c.data_fim,
    }));

    res.json(result);
  } catch (err) {
    console.error('[campaigns]', err);
    res.status(500).json({ error: 'Erro ao buscar campanhas' });
  }
});

// ==========================================
// LEADS
// ==========================================

app.get('/api/leads', async (req: Request, res: Response) => {
  try {
    const { cliente_id } = req.query;

    const leads = await db.leads.findMany({
      where: {
        ...(cliente_id ? { cliente_id: String(cliente_id) } : {}),
      },
      orderBy: { criado_em: 'desc' },
    });
    res.json(leads);
  } catch (err) {
    console.error('[leads GET]', err);
    res.status(500).json({ error: 'Erro ao buscar leads' });
  }
});

app.post('/api/leads', async (req: Request, res: Response) => {
  try {
    const { cliente_id, nome, email, telefone, utm_source, utm_medium, utm_campaign, utm_ad, status } = req.body;

    const lead = await db.leads.create({
      data: {
        cliente_id,
        nome,
        email,
        telefone,
        utm_source,
        utm_medium,
        utm_campaign,
        utm_ad,
        status: status ?? 'novo',
        data_criacao: new Date(),
      },
    });

    res.status(201).json({ success: true, lead });
  } catch (err) {
    console.error('[leads POST]', err);
    res.status(500).json({ error: 'Erro ao criar lead' });
  }
});

// ==========================================
// IA E ORQUESTRAÇÃO
// ==========================================

app.post('/api/chat', (req: Request, res: Response) => {
  const { pergunta } = req.body;
  console.log(`[chat] pergunta: ${pergunta}`);
  res.json({
    analise: 'Integração com Claude API pendente. Adicione ANTHROPIC_API_KEY no backend/.env.',
    confianca: 0,
  });
});

app.post('/api/executar-acao', async (req: Request, res: Response) => {
  try {
    const { acao_id } = req.body;

    const acao = await db.acoes_ia.update({
      where: { id: acao_id },
      data: {
        status: 'executada',
        executada_em: new Date(),
        rollback_ate: new Date(Date.now() + 2 * 60 * 60 * 1000),
      },
    });

    await db.audit_log.create({
      data: {
        cliente_id: acao.cliente_id,
        acao_id: acao.id,
        tipo: 'automation',
        descricao: `Ação executada: ${acao.titulo}`,
        entidade_tipo: acao.entidade_tipo ?? undefined,
        entidade_id: acao.entidade_id ?? undefined,
        executado_por: 'gestor',
      },
    });

    res.json({ success: true, acao });
  } catch (err) {
    console.error('[executar-acao]', err);
    res.status(500).json({ error: 'Erro ao executar ação' });
  }
});

app.post('/api/ignorar-acao', async (req: Request, res: Response) => {
  try {
    const { acao_id } = req.body;
    await db.acoes_ia.update({
      where: { id: acao_id },
      data: { status: 'ignorada' },
    });
    res.json({ success: true });
  } catch (err) {
    console.error('[ignorar-acao]', err);
    res.status(500).json({ error: 'Erro ao ignorar ação' });
  }
});

app.post('/api/executar-analise', (req: Request, res: Response) => {
  const { tipo, conta_id } = req.body;
  console.log(`[executar-analise] tipo: ${tipo}, conta: ${conta_id}`);
  res.json({ success: true, message: `Análise '${tipo}' pendente de integração com Claude API` });
});

// ==========================================
// SERVER
// ==========================================

app.listen(PORT, () => {
  console.log(`🚀 Backend rodando em http://localhost:${PORT}`);
});
