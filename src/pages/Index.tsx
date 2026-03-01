"use client";

import React from 'react';
import Layout from '../components/Layout';
import StatCard from '../components/StatCard';
import PerformanceChart from '../components/PerformanceChart';
import { 
  Users, 
  Target, 
  TrendingUp, 
  FileText, 
  Loader2, 
  Zap,
  AlertTriangle,
  AlertCircle,
  DollarSign,
  ArrowRight,
  CheckCircle2,
  Trash2
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { useNavigate } from 'react-router-dom';
import OnboardingModal from '../components/OnboardingModal';
import AIChatDrawer from '../components/AIChatDrawer';
import { 
  fetchDashboardKpis, 
  fetchContasStatus, 
  fetchAlertasAtivos,
  fetchAcoesPendentes,
  executarAcao,
  ignorarAcao,
  dbService 
} from '../services/api.service';
import { useClient } from '../context/ClientContext';
import { toast } from 'sonner';

const Index = () => {
  const navigate = useNavigate();
  const { selectedClient } = useClient();
  const [loading, setLoading] = React.useState(true);
  const [isChatOpen, setIsChatOpen] = React.useState(false);
  const [kpis, setKpis] = React.useState<any>(null);
  const [contas, setContas] = React.useState<any[]>([]);
  const [alertas, setAlertas] = React.useState<any[]>([]);
  const [acoes, setAcoes] = React.useState<any[]>([]);
  const [leads, setLeads] = React.useState<any[]>([]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [kpiData, contaData, alertaData, acaoData, leadData] = await Promise.all([
        fetchDashboardKpis(),
        fetchContasStatus(),
        fetchAlertasAtivos(),
        fetchAcoesPendentes(),
        dbService.getLeads()
      ]);
      setKpis(kpiData);
      setContas(contaData);
      setAlertas(alertaData);
      setAcoes(acaoData);
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

  const handleExecutarAcao = async (id: string, titulo: string) => {
    toast.promise(executarAcao(id), {
      loading: `Executando: ${titulo}...`,
      success: 'Ação executada com sucesso!',
      error: 'Erro ao executar ação.',
    });
    setAcoes(acoes.filter(a => a.id !== id));
  };

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
      <AIChatDrawer isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900">Dashboard de {selectedClient.name} 👋</h2>
          <p className="text-slate-500 mt-1">Sua operação de marketing em tempo real.</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm" className="bg-white border-slate-200" onClick={() => navigate('/analytics')}>
            <FileText className="mr-2 h-4 w-4" /> Relatório
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={loadData}>
            <Zap className="mr-2 h-4 w-4" /> Atualizar
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Leads" value={kpis?.leads} change={kpis?.leads_delta} isPositive={true} icon={Users} iconColor="bg-blue-500" />
        <StatCard title="Investimento" value={`R$ ${kpis?.investimento}`} change={kpis?.investimento_delta} isPositive={false} icon={DollarSign} iconColor="bg-green-500" />
        <StatCard title="CPL Médio" value={`R$ ${kpis?.cpl_medio}`} change={kpis?.cpl_delta} isPositive={kpis?.cpl_delta?.includes('-')} icon={Target} iconColor="bg-purple-500" />
        <StatCard title="ROAS" value={kpis?.roas} change={kpis?.roas_delta} isPositive={true} icon={TrendingUp} iconColor="bg-orange-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Ações Pendentes da IA */}
          <Card className="bg-white border-slate-200 shadow-sm overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50 bg-slate-50/30">
              <div className="flex items-center space-x-2">
                <Zap className="text-blue-600" size={18} />
                <CardTitle className="text-lg font-bold">Central de Execução IA</CardTitle>
              </div>
              <Badge className="bg-blue-600">{acoes.length} Ações Sugeridas</Badge>
            </CardHeader>
            <CardContent className="p-0">
              {acoes.length > 0 ? (
                <div className="divide-y divide-slate-50">
                  {acoes.map((acao) => (
                    <div key={acao.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-bold text-slate-900">{acao.titulo}</h4>
                          <Badge variant="outline" className={`text-[9px] ${acao.urgencia === 'alta' ? 'border-red-200 text-red-600 bg-red-50' : 'border-blue-200 text-blue-600 bg-blue-50'}`}>
                            {acao.urgencia.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-500 font-medium">Conta: {acao.conta_nome} • Economia: <span className="text-green-600 font-bold">{acao.economia_estimada}</span></p>
                        <p className="text-xs text-slate-400 leading-relaxed italic">"{acao.racional}"</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-red-500" onClick={() => setAcoes(acoes.filter(a => a.id !== acao.id))}>
                          <Trash2 size={16} />
                        </Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={() => handleExecutarAcao(acao.id, acao.titulo)}>
                          <CheckCircle2 size={16} className="mr-2" /> Executar Agora
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center">
                  <p className="text-slate-400 text-sm">Nenhuma ação pendente no momento. Sua operação está otimizada!</p>
                </div>
              )}
            </CardContent>
          </Card>

          <PerformanceChart />
        </div>
        
        <div className="space-y-6">
          <Card className="bg-slate-900 text-white border-none shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <TrendingUp size={80} />
            </div>
            <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center">
                <Target className="mr-2 text-blue-400" size={20} /> IA MidiaOS
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 relative z-10">
              <p className="text-sm text-slate-300">
                Olá! Sou sua IA de performance. Estou monitorando 24/7. Notei uma oportunidade de escala no TikTok Ads para {selectedClient.name}.
              </p>
              <div className="pt-4 space-y-2">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 border-none font-bold" onClick={() => setIsChatOpen(true)}>
                  <Brain size={16} className="mr-2" /> Falar com a IA
                </Button>
                <Button variant="ghost" className="w-full text-slate-400 hover:text-white hover:bg-white/5" onClick={() => navigate('/strategy')}>
                  Ver Estratégia Q3
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold">Status das Contas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contas.map((conta, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-slate-50 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${conta.status === 'green' ? 'bg-green-500' : conta.status === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'}`} />
                      <div>
                        <p className="text-xs font-bold text-slate-900">{conta.nome}</p>
                        <p className="text-[10px] text-slate-400 uppercase font-bold">{conta.canal}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-xs font-bold ${conta.cpl_real > conta.cpl_meta ? 'text-red-600' : 'text-green-600'}`}>R$ {conta.cpl_real.toFixed(2)}</p>
                      <p className="text-[9px] text-slate-400">Meta: {conta.cpl_meta.toFixed(0)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-4 text-xs text-blue-600 hover:bg-blue-50" onClick={() => navigate('/analytics')}>
                Analytics Completo <ArrowRight size={14} className="ml-1" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Index;