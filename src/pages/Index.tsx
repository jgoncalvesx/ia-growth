"use client";

import React from 'react';
import Sidebar from '../components/Sidebar';
import StatCard from '../components/StatCard';
import PerformanceChart from '../components/PerformanceChart';
import { Users, MousePointer2, Target, TrendingUp, Bell, Search } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';

const Index = () => {
  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input 
              placeholder="Buscar campanhas, métricas..." 
              className="pl-10 bg-slate-50 border-slate-200 focus:bg-white transition-all"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 text-slate-400 hover:text-slate-600 relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center space-x-3 pl-4 border-l border-slate-200">
              <div className="text-right">
                <p className="text-sm font-semibold text-slate-900">Admin User</p>
                <p className="text-xs text-slate-500">Marketing Manager</p>
              </div>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-8 max-w-7xl mx-auto">
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
        </div>
      </main>
    </div>
  );
};

export default Index;