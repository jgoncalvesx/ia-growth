"use client";

import React from 'react';
import Layout from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Switch } from '../components/ui/switch';
import { 
  Zap, 
  Mail, 
  MessageSquare, 
  Bell, 
  MoreVertical,
  PlayCircle,
  Clock
} from 'lucide-react';
import CreateWorkflowModal from '../components/CreateWorkflowModal';

const initialWorkflows = [
  { id: 1, name: 'Boas-vindas Instagram', trigger: 'Novo Lead', action: 'Enviar E-mail', status: true, runs: 145, lastRun: '10 min atrás', icon: Mail, color: 'text-blue-600', bg: 'bg-blue-50' },
  { id: 2, name: 'Alerta de Orçamento Crítico', trigger: 'Gasto > 90%', action: 'Notificar Admin', status: true, runs: 12, lastRun: '2 dias atrás', icon: Bell, color: 'text-orange-600', bg: 'bg-orange-50' },
  { id: 3, name: 'Qualificação Automática', trigger: 'Novo Lead TikTok', action: 'Mudar Status', status: false, runs: 0, lastRun: 'Nunca', icon: Zap, color: 'text-purple-600', bg: 'bg-purple-50' },
  { id: 4, name: 'Follow-up 24h', trigger: 'Lead Sem Contato', action: 'Enviar WhatsApp', status: true, runs: 89, lastRun: '1 hora atrás', icon: MessageSquare, color: 'text-green-600', bg: 'bg-green-50' },
];

const Workflows = () => {
  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Automações</h2>
          <p className="text-slate-500">Crie fluxos inteligentes para otimizar seu marketing.</p>
        </div>
        <CreateWorkflowModal />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {initialWorkflows.map((flow) => (
          <Card key={flow.id} className="bg-white border-slate-200 shadow-sm hover:border-purple-200 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl ${flow.bg} ${flow.color}`}>
                    <flow.icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{flow.name}</h3>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className="text-xs text-slate-500 flex items-center">
                        <PlayCircle size={12} className="mr-1" /> {flow.trigger}
                      </span>
                      <span className="text-xs text-slate-300">•</span>
                      <span className="text-xs text-slate-500 flex items-center">
                        <Zap size={12} className="mr-1" /> {flow.action}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-8">
                  <div className="text-right hidden md:block">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Execuções</p>
                    <p className="text-lg font-bold text-slate-900">{flow.runs}</p>
                  </div>
                  <div className="text-right hidden md:block">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Última vez</p>
                    <p className="text-sm font-medium text-slate-600 flex items-center justify-end">
                      <Clock size={12} className="mr-1" /> {flow.lastRun}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4 pl-8 border-l border-slate-100">
                    <Switch defaultChecked={flow.status} />
                    <button className="text-slate-400 hover:text-slate-600">
                      <MoreVertical size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Layout>
  );
};

export default Workflows;