"use client";

import React from 'react';
import Layout from '../components/Layout';
import StatCard from '../components/StatCard';
import PerformanceChart from '../components/PerformanceChart';
import { 
  Users, 
  MousePointer2, 
  Target, 
  TrendingUp, 
  FileText, 
  Loader2, 
  Zap,
  AlertTriangle,
  AlertCircle,
  TrendingDown,
  DollarSign
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { useNavigate } from 'react-router-dom';
import OnboardingModal from '../components/OnboardingModal';
import { 
  fetchDashboardKpis, 
  fetchContasStatus, 
  fetchAlertasAtivos,
  dbService 
} from '../services/api.service';
import { useClient } from '../context/ClientContext';
import { toast } from 'sonner';

const Index = () => {
  const navigate = useNavigate();
  const { selectedClient } = useClient();
  const [loading, setLoading] = React.useState(true);
  const [kpis, setKpis] = React.useState<any>(null);
  const [contas, setContas] = React.useState<any[]>([]);
  const [alertas, setAlertas] = React.useState<any[]>([]);
  const [leads, setLeads] = React.useState<any[]>([]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [kpiData, contaData, alertaData, leadData] = await Promise.all([
        fetchDashboardKpis(),
        fetchContasStatus(),
        fetchAlertasAtivos(),
        dbService.getLeads()
      ]);
      setKpis(kpiData);
      setContas(contaData);
      setAlertas(alertaData);
      setLeads(leadData);
    } catch (error) {
      console.error("Erro ao carregar dados do dashboard", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadData();
  }, [selectedClient.id]);

  if (loading) {
    return (
      <Layout>
        <div className="h-[60vh] flex flex-col items-center justify-center space-y-4">
          <Loader2 className="animate-spin text-blue-600" size={48} />
          <p className="text-slate-500 font-medium animate-pulse">Sincronizando dados de {selectedClient.name}...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <OnboardingModal />
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900">Dashboard de {selectedClient.name} 👋</h2>
          <p className="text-slate-500 mt-1">Sua operação de marketing em tempo real.</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm" className="bg-white border-slate-200">
            <FileText className="mr-2 h-4 w-4" /> Relatório
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={loadData}>
            <Zap className="mr-2 h-4 w-4" /> Atualizar
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Leads" 
          value={kpis?.leads || "0"} 
          change={kpis?.leads_delta || "0%"} 
          isPositive={true} 
          icon={Users} 
          iconColor="bg-blue-500"
        />
        <StatCard 
          title="Investimento" 
          value={`R$ ${kpis?.investimento || "0"}`} 
          change={kpis?.investimento_delta || "0%"} 
          isPositive={false} 
          icon={DollarSign} 
          iconColor="bg-green-500"
        />
        <StatCard 
          title="CPL Médio" 
          value={`R$ ${kpis?.cpl_medio || "0"}`} 
          change={kpis?.cpl_delta || "0%"} 
          isPositive={kpis?.cpl_delta?.includes('-')} 
          icon={Target} 
          iconColor="bg-purple-500"
        />
        <StatCard 
          title="ROAS" 
          value={kpis?.roas || "0"} 
          change={kpis?.roas_delta || "0"} 
          isPositive={true} 
          icon={TrendingUp} 
          iconColor="bg-orange-500"
        />
      </div>

      {/* Alertas Críticos */}
      {alertas.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {alertas.map((alerta, idx) => (
            <div key={idx} className={`flex items-start p-4 rounded-xl border ${
              alerta.tipo === 'danger' ? 'bg-red-50 border-red-100 text-red-900' : 'bg-orange-50 border-orange-100 text-orange-900'
            }`}>
              <div className={`p-2 rounded-lg mr-4 ${alerta.tipo === 'danger' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}`}>
                {alerta.tipo === 'danger' ? <AlertTriangle size={20} /> : <AlertCircle size={20} />}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm">{alerta.titulo}</h4>
                <p className="text-xs mt-1 opacity-80">{alerta.descricao}</p>
              </div>
              <Button size="sm" variant="outline" className="ml-4 bg-white border-current/20 hover:bg-white/50 h-8 text-[10px] font-bold uppercase">
                {alerta.acao}
              </Button>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <PerformanceChart />
          
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-bold">Status das Contas</CardTitle>
              <Badge variant="outline" className="text-slate-400 font-medium">Últimas 24h</Badge>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-50">
                      <th className="pb-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Conta</th>
                      <th className="pb-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">CPL Real</th>
                      <th className="pb-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Meta</th>
                      <th className="pb-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Gasto Hoje</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {contas.map((conta, i) => (
                      <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                        <td className="py-4">
                          <div className="flex items-center space-x-3">
                            <div className={`w-2 h-2 rounded-full ${
                              conta.status === 'green' ? 'bg-green-500' : 
                              conta.status === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'
                            }`}></div>
                            <div>
                              <p className="text-sm font-bold text-slate-900">{conta.nome}</p>
                              <p className="text-[10px] text-slate-400 uppercase font-medium">{conta.canal}</p>
                            </div>
                          </div>
                        </td>
                        <td className={`py-4 text-center text-sm font-bold ${
                          conta.cpl_real > conta.cpl_meta ? 'text-red-600' : 'text-green-600'
                        }`}>
                          R$ {conta.cpl_real.toFixed(2)}
                        </td>
                        <td className="py-4 text-center text-sm text-slate-500">
                          R$ {conta.cpl_meta.toFixed(2)}
                        </td>
                        <td className="py-4 text-right text-sm font-medium text-slate-900">
                          R$ {conta.investimento_hoje}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card className="bg-slate-900 text-white border-none shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Zap size={80} />
            </div>
            <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center">
                <Zap className="mr-2 text-blue-400" size={20} /> IA MidiaOS
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 relative z-10">
              <p className="text-sm text-slate-300">
                Olá! Analisei seus dados e notei que o CPL do Meta Ads está 15% abaixo da meta. 
                Recomendo aumentar o orçamento em R$ 200/dia para escalar.
              </p>
              <div className="pt-4 space-y-2">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 border-none font-bold" onClick={() => navigate('/strategy')}>
                  Ver Análise Completa
                </Button>
                <Button variant="ghost" className="w-full text-slate-400 hover:text-white hover:bg-white/5" onClick={() => navigate('/help')}>
                  Perguntar à IA
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-slate-900">Leads Recentes</h3>
              <Button variant="ghost" size="sm" className="text-xs text-blue-600 hover:bg-blue-50" onClick={() => navigate('/leads')}>Ver todos</Button>
            </div>
            <div className="space-y-4">
              {leads.length > 0 ? leads.slice(0, 4).map((lead, i) => (
                <div key={i} className="flex items-center justify-between pb-3 border-b border-slate-50 last:border-0 last:pb-0">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-[10px]">
                      {lead.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{lead.name}</p>
                      <p className="text-[10px] text-slate-500 uppercase font-medium">{lead.source}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-[9px] px-1.5 py-0 font-bold">NOVO</Badge>
                </div>
              )) : (
                <p className="text-center text-sm text-slate-400 py-4">Nenhum lead recente.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;