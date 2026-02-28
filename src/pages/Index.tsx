"use client";

import React from 'react';
import Layout from '../components/Layout';
import StatCard from '../components/StatCard';
import PerformanceChart from '../components/PerformanceChart';
import { Users, MousePointer2, Target, TrendingUp } from 'lucide-react';

const Index = () => {
  return (
    <Layout>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Bem-vindo de volta! 👋</h2>
        <p className="text-slate-500">Aqui está o que está acontecendo com suas campanhas hoje.</p>
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
        
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Atividade Recente</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-start space-x-3 pb-4 border-b border-slate-100 last:border-0">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                  <Target size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">Nova campanha criada</p>
                  <p className="text-xs text-slate-500">Campanha "Verão 2024" foi iniciada com sucesso.</p>
                  <p className="text-[10px] text-slate-400 mt-1">Há 2 horas</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;