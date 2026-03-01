"use client";

import React from 'react';
import Layout from '../components/Layout';
import StatCard from '../components/StatCard';
import PerformanceChart from '../components/PerformanceChart';
import { Users, MousePointer2, Target, TrendingUp, Plus, FileText, UserCheck, Loader2, Zap } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';
import OnboardingModal from '../components/OnboardingModal';
import { dbService } from '../services/api.service';
import { useClient } from '../context/ClientContext';
import { toast } from 'sonner';

const Index = () => {
  const navigate = useNavigate();
  const { selectedClient } = useClient();
  const [data, setData] = React.useState<{ leads: any[] }>({ leads: [] });
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      // Aqui passaríamos o selectedClient.id para o serviço em uma API real
      const leads = await dbService.getLeads();
      setData({ leads });
      setLoading(false);
    };
    fetchDashboardData();
  }, [selectedClient.id]);

  if (loading) {
    return (
      <Layout>
        <div className="h-[60vh] flex flex-col items-center justify-center space-y-4">
          <Loader2 className="animate-spin text-blue-600" size={48} />
          <p className="text-slate-500 font-medium animate-pulse">Carregando dados de {selectedClient.name}...</p>
        </div>
      </Layout>
    );
  }

  const totalLeads = data.leads.length;

  return (
    <Layout>
      <OnboardingModal />
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900">Dashboard de {selectedClient.name} 👋</h2>
          <p className="text-slate-500 mt-1">Visão geral de performance para sua operação de marketing.</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm" className="bg-white border-slate-200">
            <FileText className="mr-2 h-4 w-4" /> Relatório Completo
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => toast.success('Dados sincronizados!')}>
            <Zap className="mr-2 h-4 w-4" /> Sincronizar
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Leads Totais" 
          value={totalLeads.toString()} 
          change="+12.5%" 
          isPositive={true} 
          icon={Users} 
          iconColor="bg-blue-500"
        />
        <StatCard 
          title="Taxa de Conversão" 
          value="4.2%" 
          change="+0.5%" 
          isPositive={true} 
          icon={Target} 
          iconColor="bg-purple-500"
        />
        <StatCard 
          title="Engajamento" 
          value="18.5k" 
          change="+5.2%" 
          isPositive={true} 
          icon={MousePointer2} 
          iconColor="bg-orange-500"
        />
        <StatCard 
          title="ROI Médio" 
          value="3.8x" 
          change="+0.2" 
          isPositive={true} 
          icon={TrendingUp} 
          iconColor="bg-green-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <PerformanceChart />
        </div>
        
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Ações Estratégicas</h3>
            <div className="grid grid-cols-1 gap-3">
              <Button 
                variant="outline" 
                className="h-14 justify-start px-4 border-slate-100 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all"
                onClick={() => navigate('/strategy')}
              >
                <TrendingUp size={18} className="mr-3 text-blue-500" />
                <div className="text-left">
                  <p className="text-sm font-bold leading-none">Ver Roadmap IA</p>
                  <p className="text-[10px] text-slate-400 mt-1">Próximos passos sugeridos</p>
                </div>
              </Button>
              <Button 
                variant="outline" 
                className="h-14 justify-start px-4 border-slate-100 hover:bg-purple-50 hover:border-purple-200 hover:text-purple-600 transition-all"
                onClick={() => navigate('/brand-kit')}
              >
                <Zap size={18} className="mr-3 text-purple-500" />
                <div className="text-left">
                  <p className="text-sm font-bold leading-none">Ajustar Brand Kit</p>
                  <p className="text-[10px] text-slate-400 mt-1">Identidade do cliente</p>
                </div>
              </Button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-slate-900">Leads de {selectedClient.name}</h3>
              <Button variant="ghost" size="sm" className="text-xs text-blue-600 hover:bg-blue-50" onClick={() => navigate('/leads')}>Ver todos</Button>
            </div>
            <div className="space-y-4">
              {data.leads.length > 0 ? data.leads.slice(0, 3).map((lead, i) => (
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
                  <Badge variant="secondary" className="text-[9px] px-1.5 py-0">NOVO</Badge>
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