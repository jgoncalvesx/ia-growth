"use client";

import React from 'react';
import Layout from '../components/Layout';
import {
  RefreshCw,
  AlertTriangle,
  Bell,
  ArrowUpRight,
  ArrowDownRight,
  Circle,
  ChevronRight,
  DollarSign,
  Users
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import {
  fetchDashboardKpis,
  fetchContasStatus,
  fetchAlertasAtivos,
  fetchAuditLog,
} from '../services/api.service';
import { useClient } from '../context/ClientContext';

const semaforo = (status: string) => {
  if (status === 'red')    return { cor: 'text-red-500',    label: 'Urgente' };
  if (status === 'yellow') return { cor: 'text-yellow-500', label: 'Atenção' };
  return                          { cor: 'text-green-500',  label: 'OK' };
};

const fmt = (val: string | number | null, prefix = '') =>
  val != null ? `${prefix}${Number(val).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '—';

const Index = () => {
  const { selectedClient } = useClient();
  const [kpis, setKpis]       = React.useState<any>(null);
  const [contas, setContas]   = React.useState<any[]>([]);
  const [alertas, setAlertas] = React.useState<any[]>([]);
  const [auditLog, setAudit]  = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  const carregar = React.useCallback(async () => {
    setLoading(true);
    const cid = selectedClient.id || null;
    try {
      const [k, c, a, l] = await Promise.all([
        fetchDashboardKpis(cid),
        fetchContasStatus(cid),
        fetchAlertasAtivos(cid),
        fetchAuditLog(cid),
      ]);
      setKpis(k);
      setContas(c);
      setAlertas(a);
      setAudit(l);
    } catch (err) {
      console.error('Erro ao carregar dashboard:', err);
    } finally {
      setLoading(false);
    }
  }, [selectedClient.id]);

  React.useEffect(() => { carregar(); }, [carregar]);

  const investimentoTotal = contas.reduce((s, c) => s + (c.investimento ?? 0), 0);
  const maxInvest = Math.max(...contas.map(c => c.investimento ?? 0), 1);

  return (
    <Layout>
      <div className="space-y-8 bg-slate-950 min-h-screen -m-4 lg:-m-8 p-4 lg:p-8 text-white">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-white">Dashboard</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Visão geral · {loading ? 'Carregando...' : `${contas.length} contas ativas`}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-blue-600/20 text-blue-400 border-blue-500/30 px-3 py-1">Meta Ads</Badge>
            <Badge className="bg-red-600/20 text-red-400 border-red-500/30 px-3 py-1">Google Ads</Badge>
            <Badge className="bg-orange-600/20 text-orange-400 border-orange-500/30 px-3 py-1">TikTok</Badge>
            <Button onClick={carregar} variant="ghost" size="sm" className="text-muted-foreground hover:text-white ml-2">
              <RefreshCw size={16} className={`mr-2 ${loading ? 'animate-spin' : ''}`} /> Atualizar
            </Button>
          </div>
        </div>

        {/* ALERTAS DE CPL */}
        {alertas.length > 0 && (
          <div className="space-y-3">
            {alertas.map((alerta, i) => (
              <div key={i} className="bg-red-950/40 border border-red-900/50 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-red-500/20 rounded-lg text-red-500">
                    <AlertTriangle size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-red-200">{alerta.titulo}</p>
                    <p className="text-xs text-red-400/80">{alerta.descricao}</p>
                  </div>
                </div>
                <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white border-none">
                  {alerta.acao}
                </Button>
              </div>
            ))}
          </div>
        )}

        {alertas.length === 0 && !loading && (
          <div className="bg-green-950/30 border border-green-900/40 rounded-xl p-4 flex items-center gap-4">
            <div className="p-2 bg-green-500/20 rounded-lg text-green-500">
              <Bell size={20} />
            </div>
            <p className="font-bold text-green-200">Todas as contas dentro das metas de CPL</p>
          </div>
        )}

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-slate-900 border-slate-800 shadow-xl">
            <CardContent className="pt-6">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">INVESTIMENTO TOTAL (30d)</p>
              <h3 className="text-3xl font-bold font-mono text-white">
                {loading ? '—' : `R$ ${Number(investimentoTotal).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
              </h3>
              <div className="flex items-center gap-1 mt-2 text-slate-400 text-xs font-bold">
                <DollarSign size={14} /> Soma de todas as contas
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800 shadow-xl">
            <CardContent className="pt-6">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">CPL MÉDIO (ontem)</p>
              <h3 className={`text-3xl font-bold font-mono ${
                kpis?.cpl_medio > 60 ? 'text-red-400' : kpis?.cpl_medio > 40 ? 'text-yellow-400' : 'text-green-400'
              }`}>
                {loading ? '—' : `R$ ${fmt(kpis?.cpl_medio)}`}
              </h3>
              <p className="text-[10px] text-muted-foreground mt-2 font-medium">
                {kpis?.leads ? `${kpis.leads} leads ontem` : ''}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800 shadow-xl">
            <CardContent className="pt-6">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">LEADS QUALIFICADOS (30d)</p>
              <h3 className="text-3xl font-bold font-mono text-white">
                {loading ? '—' : contas.reduce((s, c) => s + (c.leads_qualificados ?? 0), 0).toLocaleString('pt-BR')}
              </h3>
              <div className="flex items-center gap-1 mt-2 text-green-500 text-xs font-bold">
                <ArrowUpRight size={14} />
                <span className="text-muted-foreground font-medium">
                  {contas.length > 0 ? `${contas.reduce((s, c) => s + (c.vendas ?? 0), 0)} vendas` : ''}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800 shadow-xl">
            <CardContent className="pt-6">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">ROAS MÉDIO (ontem)</p>
              <h3 className="text-3xl font-bold font-mono text-blue-400">
                {loading ? '—' : `${fmt(kpis?.roas)}x`}
              </h3>
              <div className="flex items-center gap-1 mt-2 text-slate-400 text-xs">
                <Users size={14} />
                <span>{contas.length} contas ativas</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* SEMÁFORO DE CONTAS */}
        <Card className="bg-slate-900 border-slate-800 shadow-xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between border-b border-slate-800 py-4">
            <CardTitle className="text-lg font-bold text-white">Semáforo de Contas</CardTitle>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-white">
              Ver todas <ChevronRight size={14} className="ml-1" />
            </Button>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-800/50 text-muted-foreground uppercase text-[10px] font-bold tracking-widest">
                <tr>
                  <th className="px-6 py-4">Conta</th>
                  <th className="px-6 py-4">Canal</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">CPL Real</th>
                  <th className="px-6 py-4">Meta</th>
                  <th className="px-6 py-4">Máx</th>
                  <th className="px-6 py-4">Invest. 30d</th>
                  <th className="px-6 py-4">Leads Qual.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {loading ? (
                  <tr><td colSpan={8} className="px-6 py-8 text-center text-muted-foreground">Carregando...</td></tr>
                ) : contas.length === 0 ? (
                  <tr><td colSpan={8} className="px-6 py-8 text-center text-muted-foreground">Nenhuma conta encontrada</td></tr>
                ) : contas.map((row, i) => {
                  const s = semaforo(row.status);
                  return (
                    <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4 font-bold text-white">{row.nome}</td>
                      <td className="px-6 py-4">
                        <Badge variant="secondary" className="bg-slate-800 text-muted-foreground border-slate-700 text-[10px]">
                          {row.canal}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Circle size={8} className={`fill-current ${s.cor}`} />
                          <span className={`font-medium ${s.cor}`}>{s.label}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono font-bold text-white">
                        R$ {fmt(row.cpl_real)}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground font-mono">R$ {fmt(row.cpl_meta)}</td>
                      <td className="px-6 py-4 text-muted-foreground font-mono">R$ {fmt(row.cpl_max)}</td>
                      <td className="px-6 py-4 font-mono text-white">
                        R$ {Number(row.investimento ?? 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-6 py-4 font-mono text-white">{row.leads_qualificados ?? 0}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        {/* PERFORMANCE POR CANAL + ATIVIDADE RECENTE */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">

          {/* PERFORMANCE POR CANAL */}
          <Card className="lg:col-span-6 bg-slate-900 border-slate-800 shadow-xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                PERFORMANCE POR CANAL (30d)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 pt-2">
              {loading ? (
                <p className="text-muted-foreground text-sm">Carregando...</p>
              ) : contas.map((canal, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex justify-between items-end">
                    <div>
                      <h4 className="text-lg font-bold text-white">{canal.nome}</h4>
                      <div className="flex gap-4 mt-1">
                        <p className="text-xs text-muted-foreground">
                          CPL: <span className={`font-mono font-bold ${
                            canal.cpl_real > canal.cpl_max ? 'text-red-400' :
                            canal.cpl_real > canal.cpl_meta ? 'text-yellow-400' : 'text-green-400'
                          }`}>R$ {fmt(canal.cpl_real)}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Leads: <span className="text-white font-mono font-bold">{canal.leads_qualificados}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">
                          ROAS: <span className="text-white font-mono font-bold">{fmt(canal.roas_medio)}x</span>
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground font-mono">
                      R$ {Number(canal.investimento ?? 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                  <Progress
                    value={maxInvest > 0 ? (canal.investimento / maxInvest) * 100 : 0}
                    className="h-2 bg-slate-800"
                  />
                  {i < contas.length - 1 && <div className="border-b border-slate-800 pt-2" />}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* ATIVIDADE RECENTE */}
          <Card className="lg:col-span-4 bg-slate-900 border-slate-800 shadow-xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                ATIVIDADE RECENTE DO SISTEMA
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="space-y-6">
                {loading ? (
                  <p className="text-muted-foreground text-sm">Carregando...</p>
                ) : auditLog.length === 0 ? (
                  <p className="text-muted-foreground text-sm">Nenhuma atividade registrada</p>
                ) : auditLog.slice(0, 6).map((log, i) => {
                  const hora = log.criado_em
                    ? new Date(log.criado_em).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
                    : '—';
                  const cor = log.tipo === 'automation' ? 'text-blue-500' : 'text-green-500';
                  return (
                    <div key={i} className="flex gap-4 items-start">
                      <span className="text-[10px] font-mono text-muted-foreground mt-0.5">{hora}</span>
                      <Circle size={8} className={`mt-1.5 fill-current ${cor}`} />
                      <div>
                        <p className="text-xs text-slate-300 leading-relaxed">{log.descricao}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{log.executado_por}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </Layout>
  );
};

export default Index;
