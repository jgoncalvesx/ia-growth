"use client";

import React from 'react';
import Layout from '../components/Layout';
import StatCard from '../components/StatCard';
import PerformanceChart from '../components/PerformanceChart';
import { Users, MousePointer2, Target, TrendingUp, Plus, FileText, Share2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <Layout>
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
          title="Alcance Total" 
          value="1.2M" 
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
          value="12" 
          change="-2" 
          isPositive={false} 
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

      {/* Charts & Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <PerformanceChart />
        
        <div className="space-y-8">
          {/* Quick Actions */}
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

          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Atividade Recente</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start space-x-3 pb-4 border-b border-slate-100 last:border-0">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                    <Target size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">Nova campanha criada</p>
                    <p className="text-xs text-slate-500">Campanha "Verão 2024" foi iniciada.</p>
                    <p className="text-[10px] text-slate-400 mt-1">Há 2 horas</p>
                  </div>
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