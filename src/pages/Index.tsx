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
  MoreHorizontal,
  ChevronRight,
  TrendingUp,
  Target,
  DollarSign,
  Users
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { useClient } from '../context/ClientContext';

const Index = () => {
  const { selectedClient } = useClient();

  return (
    <Layout>
      <div className="space-y-8 bg-slate-950 min-h-screen -m-4 lg:-m-8 p-4 lg:p-8 text-slate-50">
        
        {/* HEADER DA PÁGINA */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight">Dashboard</h1>
            <p className="text-slate-400 text-sm mt-1">Visão geral · Atualizado há 12 min</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-blue-600/20 text-blue-400 border-blue-500/30 px-3 py-1">Meta Ads</Badge>
            <Badge className="bg-red-600/20 text-red-400 border-red-500/30 px-3 py-1">Google Ads</Badge>
            <Badge className="bg-orange-600/20 text-orange-400 border-orange-500/30 px-3 py-1">CRM</Badge>
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white ml-2">
              <RefreshCw size={16} className="mr-2" /> Atualizar
            </Button>
          </div>
        </div>

        {/* SEÇÃO 1: ALERTAS */}
        <div className="space-y-3">
          {/* Alerta Danger */}
          <div className="bg-red-950/40 border border-red-900/50 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-red-500/20 rounded-lg text-red-500">
                <AlertTriangle size={20} />
              </div>
              <div>
                <p className="font-bold text-red-200">3 anúncios ultrapassaram o CPL máximo de R$ 22 hoje</p>
                <p className="text-xs text-red-400/80">Meta Ads · Conjunto: Leads Fundo — CPL médio: R$ 31,40</p>
              </div>
            </div>
            <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white border-none">Ver ações</Button>
          </div>

          {/* Alerta Warning */}
          <div className="bg-yellow-950/40 border border-yellow-900/50 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-yellow-500/20 rounded-lg text-yellow-500">
                <Bell size={20} />
              </div>
              <div>
                <p className="font-bold text-yellow-200">Anúncio #4872 com queda de 28% no CTR nos últimos 3 dias</p>
                <p className="text-xs text-yellow-400/80">Possível fadiga criativa · Frequência: 4.1</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="border-yellow-700 text-yellow-500 hover:bg-yellow-900/30">Analisar</Button>
          </div>
        </div>

        {/* SEÇÃO 2: 4 KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-slate-900 border-slate-800 shadow-xl">
            <CardContent className="pt-6">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">INVESTIMENTO TOTAL</p>
              <h3 className="text-3xl font-bold font-mono">R$ 84.320</h3>
              <div className="flex items-center gap-1 mt-2 text-green-500 text-xs font-bold">
                <ArrowUpRight size={14} /> +12% <span className="text-slate-500 font-medium">vs. mês anterior</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800 shadow-xl">
            <CardContent className="pt-6">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">CPL (CRM)</p>
              <h3 className="text-3xl font-bold font-mono text-red-400">R$ 18,40</h3>
              <div className="flex items-center gap-1 mt-2 text-red-500 text-xs font-bold">
                <ArrowDownRight size={14} /> -8%
              </div>
              <p className="text-[10px] text-slate-500 mt-2 font-medium">Meta: R$ 15 · Max: R$ 22</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800 shadow-xl">
            <CardContent className="pt-6">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">LEADS QUALIFICADOS</p>
              <h3 className="text-3xl font-bold font-mono">1.284</h3>
              <div className="flex items-center gap-1 mt-2 text-green-500 text-xs font-bold">
                <ArrowUpRight size={14} /> +21%
              </div>
              <p className="text-[10px] text-slate-500 mt-2 font-medium">Taxa qualif.: 34%</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800 shadow-xl">
            <CardContent className="pt-6">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">ROAS CONSOLIDADO</p>
              <h3 className="text-3xl font-bold font-mono text-blue-400">4.2x</h3>
              <div className="flex items-center gap-1 mt-2 text-red-500 text-xs font-bold">
                <ArrowDownRight size={14} /> -0.3x
              </div>
              <p className="text-[10px] text-slate-500 mt-2 font-medium">Meta: 4.5x</p>
            </CardContent>
          </Card>
        </div>

        {/* SEÇÃO 3: SEMÁFORO DE CONTAS */}
        <Card className="bg-slate-900 border-slate-800 shadow-xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between border-b border-slate-800 py-4">
            <CardTitle className="text-lg font-bold">Semáforo de Contas</CardTitle>
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">Ver todas</Button>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-800/50 text-slate-400 uppercase text-[10px] font-bold tracking-widest">
                <tr>
                  <th className="px-6 py-4">Cliente</th>
                  <th className="px-6 py-4">Canal</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">CPL Real</th>
                  <th className="px-6 py-4">Meta</th>
                  <th className="px-6 py-4">Invest. Hoje</th>
                  <th className="px-6 py-4">Ação Pendente</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {[
                  { cliente: "Clínica Saúde+", canal: "Meta+Google", status: "ok", cpl: "14,20", meta: "18", invest: "2.840", acao: null },
                  { cliente: "EduTech Pro", canal: "Google", status: "ok", cpl: "16,80", meta: "20", invest: "1.520", acao: null },
                  { cliente: "Imóveis SP", canal: "Meta", status: "atencao", cpl: "24,10", meta: "22", invest: "3.200", acao: "Revisar conjunto", color: "yellow" },
                  { cliente: "SaaS Financeiro", canal: "Meta+Google", status: "urgente", cpl: "38,40", meta: "25", invest: "4.100", acao: "Ação urgente", color: "red" },
                  { cliente: "E-commerce Moda", canal: "Meta", status: "ok", cpl: "9,80", meta: "12", invest: "5.600", acao: null },
                  { cliente: "Consultor RH", canal: "LinkedIn+Google", status: "atencao", cpl: "42,00", meta: "40", invest: "980", acao: "Revisar budget", color: "yellow" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-bold">{row.cliente}</td>
                    <td className="px-6 py-4">
                      <Badge variant="secondary" className="bg-slate-800 text-slate-400 border-slate-700 text-[10px]">{row.canal}</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Circle size={8} className={`fill-current ${row.status === 'ok' ? 'text-green-500' : row.status === 'atencao' ? 'text-yellow-500' : 'text-red-500'}`} />
                        <span className="capitalize font-medium">{row.status === 'ok' ? 'OK' : row.status === 'atencao' ? 'Atenção' : 'Urgente'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono font-bold">R$ {row.cpl}</td>
                    <td className="px-6 py-4 text-slate-500 font-mono">R$ {row.meta}</td>
                    <td className="px-6 py-4 font-mono">R$ {row.invest}</td>
                    <td className="px-6 py-4">
                      {row.acao ? (
                        <Badge className={`${row.color === 'red' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'} text-[9px] uppercase font-black`}>
                          {row.acao}
                        </Badge>
                      ) : <span className="text-slate-700">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* SEÇÃO 4: DUAS COLUNAS */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
          
          {/* COLUNA ESQUERDA - PERFORMANCE POR CANAL */}
          <Card className="lg:col-span-6 bg-slate-900 border-slate-800 shadow-xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">PERFORMANCE POR CANAL</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 pt-2">
              {[
                { name: "Meta Ads", spend: "52.100", cpl: "17,20", leads: "478", progress: 75 },
                { name: "Google Ads", spend: "24.800", cpl: "20,40", leads: "312", progress: 45 },
                { name: "Google P.Max", spend: "7.420", cpl: "30,10", leads: "98", progress: 15 },
              ].map((canal, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex justify-between items-end">
                    <div>
                      <h4 className="text-lg font-bold">{canal.name}</h4>
                      <div className="flex gap-4 mt-1">
                        <p className="text-xs text-slate-400">CPL: <span className="text-slate-200 font-mono font-bold">R$ {canal.cpl}</span></p>
                        <p className="text-xs text-slate-400">Leads CRM: <span className="text-slate-200 font-mono font-bold">{canal.leads}</span></p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-500 font-mono">R$ {canal.spend}</p>
                  </div>
                  <Progress value={canal.progress} className="h-2 bg-slate-800" />
                  {i < 2 && <div className="border-b border-slate-800 pt-2"></div>}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* COLUNA DIREITA - ATIVIDADE RECENTE */}
          <Card className="lg:col-span-4 bg-slate-900 border-slate-800 shadow-xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">ATIVIDADE RECENTE DO SISTEMA</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="space-y-6">
                {[
                  { time: "09:02", color: "blue", text: "Relatório diário gerado e enviado no Slack" },
                  { time: "09:15", color: "yellow", text: "Alert: Conjunto 'Fundo LP' CPL +45% acima da meta" },
                  { time: "11:30", color: "green", text: "Você pausou 2 anúncios via one-click" },
                  { time: "14:00", color: "blue", text: "Snapshot diário calculado e armazenado" },
                  { time: "15:22", color: "blue", text: "Novo upload de CSV Meta processado (3.421 linhas)" },
                  { time: "16:45", color: "yellow", text: "Alert: Anomalia de gasto em campanha Google Search" },
                ].map((log, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <span className="text-[10px] font-mono text-slate-500 mt-0.5">{log.time}</span>
                    <Circle size={8} className={`mt-1.5 fill-current ${log.color === 'blue' ? 'text-blue-500' : log.color === 'yellow' ? 'text-yellow-500' : 'text-green-500'}`} />
                    <p className="text-xs text-slate-300 leading-relaxed">{log.text}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </Layout>
  );
};

export default Index;