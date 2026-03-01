"use client";

import React from 'react';
import Layout from '../components/Layout';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { 
  Search, 
  Filter, 
  User, 
  Megaphone, 
  FileVideo, 
  Settings, 
  Zap,
  Clock,
  Download
} from 'lucide-react';

const activities = [
  { id: 1, user: 'Admin User', action: 'criou uma nova campanha', target: 'Verão 2024', time: 'Há 10 minutos', icon: Megaphone, color: 'text-blue-600', bg: 'bg-blue-50' },
  { id: 2, user: 'Beatriz Silva', action: 'atualizou o criativo', target: 'Banner Principal V2', time: 'Há 45 minutos', icon: FileVideo, color: 'text-purple-600', bg: 'bg-purple-50' },
  { id: 3, user: 'Sistema', action: 'executou automação', target: 'Boas-vindas Instagram', time: 'Há 2 horas', icon: Zap, color: 'text-orange-600', bg: 'bg-orange-50' },
  { id: 4, user: 'Carlos Mendes', action: 'alterou permissões de', target: 'Daniela Costa', time: 'Há 5 horas', icon: Settings, color: 'text-slate-600', bg: 'bg-slate-50' },
  { id: 5, user: 'Admin User', action: 'exportou relatório de', target: 'Analytics Mensal', time: 'Ontem às 18:30', icon: User, color: 'text-green-600', bg: 'bg-green-50' },
  { id: 6, user: 'Beatriz Silva', action: 'pausou a campanha', target: 'Black Friday Retargeting', time: 'Ontem às 14:20', icon: Megaphone, color: 'text-red-600', bg: 'bg-red-50' },
];

const ActivityLog = () => {
  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Log de Atividades</h2>
          <p className="text-slate-500">Histórico completo de todas as ações realizadas na plataforma.</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" /> Exportar Log
        </Button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-8 flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input placeholder="Filtrar por usuário, ação ou alvo..." className="pl-10 bg-slate-50 border-none" />
        </div>
        <Button variant="ghost" size="sm" className="text-slate-600">
          <Filter className="mr-2 h-4 w-4" /> Filtros Avançados
        </Button>
      </div>

      <Card className="bg-white border-slate-200 shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100">
            {activities.map((activity) => (
              <div key={activity.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl ${activity.bg} ${activity.color}`}>
                    <activity.icon size={20} />
                  </div>
                  <div>
                    <p className="text-sm">
                      <span className="font-bold text-slate-900">{activity.user}</span>
                      <span className="text-slate-500 mx-1">{activity.action}</span>
                      <span className="font-bold text-blue-600">{activity.target}</span>
                    </p>
                    <div className="flex items-center mt-1 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      <Clock size={10} className="mr-1" /> {activity.time}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity text-xs">
                  Ver Detalhes
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default ActivityLog;