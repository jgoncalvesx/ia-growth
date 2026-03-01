"use client";

import React from 'react';
import Layout from '../components/Layout';
import StatCard from '../components/StatCard';
import PerformanceChart from '../components/PerformanceChart';
import { Users, MousePointer2, Target, TrendingUp, Plus, FileText, Share2, UserCheck, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';
import OnboardingModal from '../components/OnboardingModal';
import { dbService } from '../services/api.service';

const Index = () => {
  const navigate = useNavigate();
  const [data, setData] = React.useState<{ campaigns: any[], leads: any[] }>({ campaigns: [], leads: [] });
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchDashboardData = async () => {
      const [campaigns, leads] = await Promise.all([
        dbService.getCampaigns(),
        dbService.getLeads()
      ]);
      setData({ campaigns, leads });
      setLoading(false);
    };
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="h-full flex items-center justify-center">
          <Loader2 className="animate-spin text-blue-600" size={48} />
        </div>
      </Layout>
    );
  }

  const activeCampaigns = data.campaigns.filter(c => c.status === 'Ativa').length;
  const totalLeads = data.leads.length;

  return (
    <Layout>
      <OnboardingModal />
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Bem-vindo de volta! 👋</h2>
          <p className="text-slate-500">Aqui está o que está acontecendo com suas campanhas hoje.</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm" className="bg-white">
            <FileText className="mr-2 h-4 w-4" /> Relatório PDF
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Share2 className="mr-2 h-4 w-4" /> Compartilhar
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
          title="Engajamento" 
          value="45.2k" 
          change="+5.2%" 
          isPositive={true} 
          icon={MousePointer2} 
          iconColor="bg-purple-500"
        />
        <StatCard 
          title="Campanhas Ativas" 
          value={activeCampaigns.toString()} 
          change="Atualizado" 
          isPositive={true} 
          icon={Target} 
          iconColor="bg-orange-500"
        />
        <StatCard 
          title="ROI Médio" 
          value="4.2x" 
          change="+0.8" 
          isPositive={true} 
          icon={TrendingUp} 
          iconColor="bg-green-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <PerformanceChart />
        
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Ações Rápidas</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className="h-20 flex flex-col items-center justify-center space-y-1 border-slate-100 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all"
                onClick={() => navigate('/campaigns')}
              >
                <Plus size={20} />
                <span className="text-xs">Nova Campanha</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex flex-col items-center justify-center space-y-1 border-slate-100 hover:bg-purple-50 hover:border-purple-200 hover:text-purple-600 transition-all"
                onClick={() => navigate('/content')}
              >
                <Share2 size={20} />
                <span className="text-xs">Subir Criativo</span>
              </Button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Leads Recentes</h3>
              <Button variant="ghost" size="sm" className="text-xs text-blue-600" onClick={() => navigate('/leads')}>Ver todos</Button>
            </div>
            <div className="space-y-4">
              {data.leads.slice(0, 3).map((lead, i) => (
                <div key={i} className="flex items-center justify-between pb-3 border-b border-slate-50 last:border-0 last:pb-0">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                      <UserCheck size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{lead.name}</p>
                      <p className="text-xs text-slate-500">{lead.source}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium uppercase">Recent</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;