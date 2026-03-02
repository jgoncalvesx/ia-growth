/**
 * Seed script — dados realistas para desenvolvimento local
 * Rodar: cd backend && npx ts-node --transpile-only prisma/seed.ts
 */

import dotenv from 'dotenv';
dotenv.config();

import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// IDs fixos dos clientes (já existem no banco)
const CLIENTE_ALPHA = 'd89c88e5-155f-41f8-9464-8ffcaa5a5535';
const LOJA_PRINCIPAL = '18ec424e-d3e6-4493-a6cc-b4db665552db';

function rand(min: number, max: number) {
  return +(Math.random() * (max - min) + min).toFixed(2);
}

function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().split('T')[0];
}

async function run() {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // ──────────────────────────────────────────────
    // 1. LIMPAR dados anteriores de seed (mantém clientes)
    // ──────────────────────────────────────────────
    await client.query(`DELETE FROM audit_log`);
    await client.query(`DELETE FROM acoes_ia`);
    await client.query(`DELETE FROM metricas_diarias`);
    await client.query(`DELETE FROM snapshots`);
    await client.query(`DELETE FROM leads`);
    await client.query(`DELETE FROM orcamentos`);
    await client.query(`DELETE FROM notificacoes`);
    await client.query(`DELETE FROM workflows`);
    await client.query(`DELETE FROM configuracoes`);
    await client.query(`DELETE FROM anuncios`);
    await client.query(`DELETE FROM conjuntos_anuncios`);
    await client.query(`DELETE FROM campanhas`);
    await client.query(`DELETE FROM contas_anuncio`);
    console.log('✓ Tabelas limpas');

    // ──────────────────────────────────────────────
    // 2. CONTAS DE ANÚNCIO
    // ──────────────────────────────────────────────
    const contasResult = await client.query(`
      INSERT INTO contas_anuncio
        (cliente_id, nome, plataforma, account_id_externo, cpl_meta, cpl_max, roas_meta, ctr_minimo, frequencia_max, ativa)
      VALUES
        ($1, 'Meta Ads — Alpha',    'Meta Ads',    'act_111111111', 45.00,  70.00, 3.50, 1.50, 3.0, true),
        ($1, 'Google Ads — Alpha',  'Google Ads',  'cid_222222222', 60.00,  90.00, 2.80, 2.00, null, true),
        ($2, 'Meta Ads — Loja',     'Meta Ads',    'act_333333333', 30.00,  50.00, 4.00, 1.20, 3.5, true),
        ($2, 'TikTok Ads — Loja',   'TikTok Ads',  'tik_444444444', 25.00,  40.00, 3.00, 0.80, 4.0, true)
      RETURNING id, nome, cliente_id, cpl_meta, cpl_max
    `, [CLIENTE_ALPHA, LOJA_PRINCIPAL]);

    const contas = contasResult.rows;
    const [metaAlpha, googleAlpha, metaLoja, tiktokLoja] = contas;
    console.log(`✓ ${contas.length} contas de anúncio criadas`);

    // ──────────────────────────────────────────────
    // 3. CAMPANHAS
    // ──────────────────────────────────────────────
    const campanhasResult = await client.query(`
      INSERT INTO campanhas
        (conta_id, campanha_id_externo, nome, objetivo, status, budget_diario, data_inicio)
      VALUES
        ($1, 'camp_001', 'Geração de Leads — Verão 2025',  'LEAD_GENERATION', 'active',  800.00, '2025-01-01'),
        ($1, 'camp_002', 'Remarketing — Visitantes Site',   'CONVERSIONS',     'active',  350.00, '2025-01-15'),
        ($2, 'camp_003', 'Search — Marca + Concorrentes',   'CONVERSIONS',     'active',  600.00, '2025-01-01'),
        ($3, 'camp_004', 'Captação Leads — Loja Verão',     'LEAD_GENERATION', 'active',  500.00, '2025-02-01'),
        ($3, 'camp_005', 'Tráfego — Catálogo de Produtos',  'TRAFFIC',         'paused',  200.00, '2025-01-10'),
        ($4, 'camp_006', 'Brand Awareness — TikTok',        'REACH',           'active',  300.00, '2025-02-15')
      RETURNING id, nome, conta_id
    `, [metaAlpha.id, googleAlpha.id, metaLoja.id, tiktokLoja.id]);

    const campanhas = campanhasResult.rows;
    console.log(`✓ ${campanhas.length} campanhas criadas`);

    // ──────────────────────────────────────────────
    // 4. SNAPSHOTS — 35 dias por conta (alimenta v_dashboard_hoje e v_kpis_30d)
    // ──────────────────────────────────────────────
    const snapshotConfig: Record<string, { inv: [number,number], leads: [number,number], cpl: [number,number], roas: [number,number] }> = {
      [metaAlpha.id]:   { inv: [700, 1100],  leads: [12, 28], cpl: [38, 75],  roas: [3.2, 5.8] },
      [googleAlpha.id]: { inv: [500,  900],  leads: [6,  16], cpl: [52, 95],  roas: [2.5, 4.2] },
      [metaLoja.id]:    { inv: [400,  700],  leads: [10, 25], cpl: [22, 55],  roas: [3.5, 6.5] },
      [tiktokLoja.id]:  { inv: [200,  400],  leads: [8,  20], cpl: [18, 42],  roas: [2.8, 4.8] },
    };

    let snapshotsInseridos = 0;
    for (const conta of contas) {
      const cfg = snapshotConfig[conta.id];
      for (let i = 35; i >= 0; i--) {
        const investimento = rand(...cfg.inv);
        const leads_q = Math.floor(rand(cfg.leads[0], cfg.leads[1]));
        const vendas = Math.floor(leads_q * rand(0.10, 0.25));
        const cpl = +rand(...cfg.cpl).toFixed(2);
        const roas = +rand(...cfg.roas).toFixed(2);
        const receita = +(investimento * roas).toFixed(2);
        const taxa_q = +(leads_q > 0 ? rand(0.15, 0.38) : 0).toFixed(4);

        await client.query(`
          INSERT INTO snapshots
            (conta_id, data, investimento_total, leads_qualificados, vendas,
             cpl_crm, roas, receita, taxa_qualificacao, ctr_medio, cpm_medio, frequencia_media)
          VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
          ON CONFLICT (conta_id, data) DO NOTHING
        `, [
          conta.id, daysAgo(i), investimento, leads_q, vendas,
          cpl, roas, receita, taxa_q,
          rand(1.2, 3.8), rand(18, 55), rand(1.1, 2.9)
        ]);
        snapshotsInseridos++;
      }
    }
    console.log(`✓ ${snapshotsInseridos} snapshots criados (35 dias × 4 contas)`);

    // ──────────────────────────────────────────────
    // 5. MÉTRICAS DIÁRIAS — 10 dias, com alguns ad_ids com CPL alto (dispara v_alertas_cpl)
    // ──────────────────────────────────────────────
    const adIds = [
      'ad_A1', 'ad_A2', 'ad_A3',  // Meta Alpha
      'ad_G1', 'ad_G2',            // Google Alpha
      'ad_L1', 'ad_L2', 'ad_L3',  // Meta Loja
      'ad_T1', 'ad_T2',            // TikTok Loja
    ];

    // Mapeamento ad_id → campanha_id_externo (deve bater com campanhas inseridas acima)
    const adCampanha: Record<string, string> = {
      'ad_A1': 'camp_001', 'ad_A2': 'camp_001',  // Meta Alpha → Geração de Leads
      'ad_A3': 'camp_002',                         // Meta Alpha → Remarketing
      'ad_G1': 'camp_003', 'ad_G2': 'camp_003',  // Google Alpha → Search
      'ad_L1': 'camp_004', 'ad_L2': 'camp_004',  // Meta Loja → Captação Leads
      'ad_L3': 'camp_005',                         // Meta Loja → Tráfego Catálogo
      'ad_T1': 'camp_006', 'ad_T2': 'camp_006',  // TikTok Loja → Brand Awareness
    };

    const metricasConfig: Array<{ conta: typeof metaAlpha, ads: string[], altoCPL?: boolean }> = [
      { conta: metaAlpha,   ads: ['ad_A1','ad_A2','ad_A3'], altoCPL: false },
      { conta: googleAlpha, ads: ['ad_G1','ad_G2'],          altoCPL: true  }, // G2 terá CPL alto → alerta
      { conta: metaLoja,    ads: ['ad_L1','ad_L2','ad_L3'], altoCPL: false },
      { conta: tiktokLoja,  ads: ['ad_T1','ad_T2'],          altoCPL: true  }, // T2 terá CPL alto → alerta
    ];

    let metricasInseridas = 0;
    for (const { conta, ads, altoCPL } of metricasConfig) {
      for (let i = 9; i >= 0; i--) {
        for (let ai = 0; ai < ads.length; ai++) {
          const adId = ads[ai];
          const isProblematico = altoCPL && ai === ads.length - 1; // último ad da conta problemática

          const investimento = rand(80, 280);
          const impressoes = Math.floor(rand(3000, 15000));
          const cliques = Math.floor(impressoes * rand(0.012, 0.04));
          // CPL alto forçado para disparar alertas
          const leads = isProblematico
            ? Math.floor(rand(1, 3))      // poucos leads → CPL explode
            : Math.floor(rand(4, 18));

          await client.query(`
            INSERT INTO metricas_diarias
              (conta_id, campanha_id, ad_id, data, investimento, impressoes, cliques, leads_plataforma,
               cpm, ctr, cpl_plataforma, frequencia, alcance)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
            ON CONFLICT (conta_id, ad_id, data) DO NOTHING
          `, [
            conta.id, adCampanha[adId], adId, daysAgo(i),
            investimento, impressoes, cliques, leads,
            +((investimento / impressoes) * 1000).toFixed(2),
            +((cliques / impressoes) * 100).toFixed(4),
            leads > 0 ? +(investimento / leads).toFixed(2) : null,
            rand(1.1, 3.2),
            Math.floor(impressoes * rand(0.6, 0.9)),
          ]);
          metricasInseridas++;
        }
      }
    }
    console.log(`✓ ${metricasInseridas} registros de métricas diárias inseridos (com campanha_id)`);

    // ──────────────────────────────────────────────
    // 6. LEADS
    // ──────────────────────────────────────────────
    const nomesLeads = [
      ['Ana Souza', 'ana.souza@email.com', '(11) 99101-2030'],
      ['Bruno Lima', 'bruno.lima@empresa.com.br', '(21) 98202-3141'],
      ['Carla Mendes', 'carla.mendes@gmail.com', '(31) 97303-4252'],
      ['Daniel Rocha', 'daniel.rocha@outlook.com', '(41) 96404-5363'],
      ['Elisa Ferreira', 'elisa.f@email.com', '(51) 95505-6474'],
      ['Felipe Costa', 'felipe.costa@empresa.com', '(62) 94606-7585'],
      ['Gabriela Nunes', 'gabi.nunes@gmail.com', '(71) 93707-8696'],
      ['Henrique Alves', 'h.alves@email.com', '(81) 92808-9707'],
      ['Isabela Martins', 'isa.martins@email.com', '(85) 91909-0818'],
      ['João Ribeiro', 'joao.ribeiro@empresa.com', '(11) 90010-1929'],
      ['Karina Dias', 'karina.dias@gmail.com', '(21) 99111-2030'],
      ['Lucas Pereira', 'lucas.p@email.com', '(31) 98212-3141'],
      ['Marina Castro', 'marina.castro@email.com', '(41) 97313-4252'],
      ['Nicolas Oliveira', 'nicolas.o@empresa.com', '(51) 96414-5363'],
      ['Olivia Santos', 'olivia.santos@gmail.com', '(62) 95515-6474'],
    ];

    const statusLeads = ['novo', 'em_contato', 'qualificado', 'perdido', 'convertido'];
    const campanhasIds = campanhas.map(c => c.id);
    const clienteIds = [CLIENTE_ALPHA, CLIENTE_ALPHA, CLIENTE_ALPHA, LOJA_PRINCIPAL, LOJA_PRINCIPAL,
                        CLIENTE_ALPHA, LOJA_PRINCIPAL, LOJA_PRINCIPAL, CLIENTE_ALPHA, LOJA_PRINCIPAL,
                        CLIENTE_ALPHA, LOJA_PRINCIPAL, CLIENTE_ALPHA, LOJA_PRINCIPAL, CLIENTE_ALPHA];
    const utmSources = ['instagram', 'facebook', 'google', 'tiktok', 'instagram', 'facebook', 'google'];
    const utmMediums = ['cpc', 'cpm', 'cpc', 'video', 'stories'];

    for (let i = 0; i < nomesLeads.length; i++) {
      const [nome, email, telefone] = nomesLeads[i];
      const status = statusLeads[i % statusLeads.length];
      const qualificado = ['qualificado', 'convertido'].includes(status);
      const vendido = status === 'convertido';
      const diasAtras = Math.floor(rand(1, 25));

      await client.query(`
        INSERT INTO leads
          (cliente_id, nome, email, telefone, utm_source, utm_medium, utm_campaign,
           status, qualificado, vendido, valor_venda, data_criacao)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
      `, [
        clienteIds[i], nome, email, telefone,
        utmSources[i % utmSources.length],
        utmMediums[i % utmMediums.length],
        campanhasIds[i % campanhasIds.length],
        status, qualificado, vendido,
        vendido ? rand(800, 5000) : null,
        daysAgo(diasAtras),
      ]);
    }
    console.log(`✓ ${nomesLeads.length} leads inseridos`);

    // ──────────────────────────────────────────────
    // 7. AÇÕES DA IA (pendentes)
    // ──────────────────────────────────────────────
    await client.query(`
      INSERT INTO acoes_ia
        (cliente_id, conta_id, titulo, racional, tipo, urgencia, comando_api,
         entidade_tipo, economia_estimada, status)
      VALUES
        ($1, $3,
         'Reduzir orçamento — Google Ads Alpha',
         'CPL médio nos últimos 7 dias está 38% acima do máximo permitido (R$95 vs R$90). Reduzir budget diário em 20% para estabilizar.',
         'budget_adjustment', 'alta', 'reduce_budget',
         'conta_anuncio', 'R$ 280/semana', 'pendente'),

        ($1, $2,
         'Escalar campanha Remarketing',
         'ROAS de 5.4x nas últimas 48h, acima da meta de 3.5x. Aumentar budget em 30% para capturar mais conversões enquanto a performance está positiva.',
         'budget_adjustment', 'media', 'increase_budget',
         'campanha', 'R$ 420/semana adicional', 'pendente'),

        ($4, $5,
         'Pausar ad_T2 — TikTok',
         'Anúncio ad_T2 com CPL de R$187 (máx: R$40) nos últimos 5 dias. Sem sinais de melhora. Pausar imediatamente.',
         'pause_entity', 'urgente', 'pause_ad',
         'anuncio', 'R$ 150/dia', 'pendente'),

        ($4, $6,
         'Aumentar frequência máxima — Meta Loja',
         'Frequência atual de 1.8 abaixo do limite configurado. Audiência ainda não saturada. Ampliar alcance com mesmo criativo.',
         'audience_adjustment', 'baixa', 'adjust_targeting',
         'conta_anuncio', 'Leads adicionais estimados', 'pendente')
    `, [CLIENTE_ALPHA, metaAlpha.id, googleAlpha.id, LOJA_PRINCIPAL, tiktokLoja.id, metaLoja.id]);
    console.log(`✓ 4 ações da IA inseridas (pendentes)`);

    // ──────────────────────────────────────────────
    // 8. AUDIT LOG
    // ──────────────────────────────────────────────
    await client.query(`
      INSERT INTO audit_log
        (cliente_id, tipo, descricao, entidade_tipo, entidade_id, executado_por, criado_em)
      VALUES
        ($1, 'manual',     'Campanha "Geração de Leads — Verão 2025" criada',          'campanha',       'camp_001', 'Admin',        NOW() - INTERVAL '3 days'),
        ($1, 'automation', 'IA ajustou budget Meta Ads Alpha em -15% (CPL elevado)',   'conta_anuncio',  $3,         'IA MidiaOS',   NOW() - INTERVAL '2 days'),
        ($1, 'manual',     'Novo criativo aprovado: Banner Verão V3',                   'anuncio',        'ad_A2',    'Admin',        NOW() - INTERVAL '1 day 6 hours'),
        ($1, 'automation', 'Alerta CPL disparado: Google Ads Alpha acima do máximo',   'conta_anuncio',  $4,         'IA MidiaOS',   NOW() - INTERVAL '1 day'),
        ($2, 'manual',     'Configuração de metas atualizada para Meta Loja',           'conta_anuncio',  $5,         'Admin',        NOW() - INTERVAL '12 hours'),
        ($2, 'automation', 'IA identificou oportunidade de escala no TikTok',          'conta_anuncio',  $6,         'IA MidiaOS',   NOW() - INTERVAL '6 hours'),
        ($1, 'manual',     'Lead Isabela Martins qualificado pelo time comercial',      'lead',           'lead_009', 'Comercial',    NOW() - INTERVAL '2 hours'),
        ($2, 'automation', 'Snapshot diário gerado para todas as contas',              'sistema',        null,       'IA MidiaOS',   NOW() - INTERVAL '30 minutes')
    `, [CLIENTE_ALPHA, LOJA_PRINCIPAL, metaAlpha.id, googleAlpha.id, metaLoja.id, tiktokLoja.id]);
    console.log(`✓ 8 registros de audit log inseridos`);

    // ──────────────────────────────────────────────
    // 9. ORÇAMENTOS
    // ──────────────────────────────────────────────
    await client.query(`
      INSERT INTO orcamentos
        (cliente_id, conta_id, periodo_inicio, periodo_fim, tipo, valor_planejado, valor_gasto, observacao)
      VALUES
        ($1, $3, DATE_TRUNC('month', CURRENT_DATE), DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month - 1 day',
         'mensal', 24000.00, 18400.00, 'Budget Meta Ads março'),

        ($1, $4, DATE_TRUNC('month', CURRENT_DATE), DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month - 1 day',
         'mensal', 18000.00, 11200.00, 'Budget Google Ads março'),

        ($2, $5, DATE_TRUNC('month', CURRENT_DATE), DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month - 1 day',
         'mensal', 15000.00, 9800.00, 'Budget Meta Loja março'),

        ($2, $6, DATE_TRUNC('month', CURRENT_DATE), DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month - 1 day',
         'mensal', 9000.00, 5400.00, 'Budget TikTok Loja março')
    `, [CLIENTE_ALPHA, LOJA_PRINCIPAL, metaAlpha.id, googleAlpha.id, metaLoja.id, tiktokLoja.id]);
    console.log(`✓ 4 orçamentos mensais inseridos`);

    // ──────────────────────────────────────────────
    // 10. NOTIFICAÇÕES
    // ──────────────────────────────────────────────
    await client.query(`
      INSERT INTO notificacoes (cliente_id, tipo, titulo, mensagem, lida, criado_em)
      VALUES
        ($1, 'danger', 'CPL crítico — Google Ads Alpha', 'CPL chegou a R$95, acima do máximo de R$90. Ação recomendada disponível.', false, NOW() - INTERVAL '1 day'),
        ($1, 'warning', 'Orçamento Meta Ads a 77%', 'Budget mensal do Meta Ads Alpha consumido em 77%. Faltam 8 dias no mês.', false, NOW() - INTERVAL '6 hours'),
        ($2, 'danger', 'Anúncio ad_T2 com CPL R$187', 'TikTok ad_T2 está com CPL 4.7x acima do máximo. Pausar imediatamente.', false, NOW() - INTERVAL '3 hours'),
        ($2, 'success', 'Meta Loja bateu meta de ROAS', 'ROAS de 4.2x nos últimos 7 dias, acima da meta de 4.0x. Parabéns!', true, NOW() - INTERVAL '2 days')
    `, [CLIENTE_ALPHA, LOJA_PRINCIPAL]);
    console.log(`✓ 4 notificações inseridas`);

    // ──────────────────────────────────────────────
    // 11. CONFIGURAÇÕES (por cliente)
    // ──────────────────────────────────────────────
    await client.query(`
      INSERT INTO configuracoes
        (cliente_id, ajuste_max_budget_pct, janela_rollback_horas, fonte_investimento, fonte_leads)
      VALUES
        ($1, 25.00, 2, 'plataforma', 'plataforma'),
        ($2, 30.00, 2, 'plataforma', 'crm')
      ON CONFLICT (cliente_id) DO NOTHING
    `, [CLIENTE_ALPHA, LOJA_PRINCIPAL]);
    console.log(`✓ Configurações inseridas para os 2 clientes`);

    await client.query('COMMIT');
    console.log('\n✅ Seed concluído com sucesso!');

    // ──────────────────────────────────────────────
    // VERIFICAÇÃO RÁPIDA DAS VIEWS
    // ──────────────────────────────────────────────
    console.log('\n📊 Verificando views:');

    const dash = await pool.query('SELECT cliente_nome, investimento_hoje, leads_hoje, cpl_hoje, roas_hoje FROM v_dashboard_hoje');
    console.log('v_dashboard_hoje:', JSON.stringify(dash.rows, null, 2));

    const kpis = await pool.query('SELECT conta_nome, plataforma, cpl_medio, status_semaforo FROM v_kpis_30d');
    console.log('v_kpis_30d:', JSON.stringify(kpis.rows, null, 2));

    const alertas = await pool.query('SELECT conta_nome, ad_id, cpl_real, cpl_max FROM v_alertas_cpl');
    console.log('v_alertas_cpl:', JSON.stringify(alertas.rows, null, 2));

  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Erro no seed — ROLLBACK executado:', err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

run();
