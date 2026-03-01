"use client";

import React from 'react';
import Layout from '../components/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { 
  DollarSign, 
  TrendingUp, 
  AlertCircle, 
  Zap, 
  ArrowUpRight, 
  PieChart as PieChartIcon,
  Calendar,
  Save
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { toast } from 'sonner';

const budgetData = [
  { platform: 'Meta Ads', planned: 5000, actual: 4200, color: '#3b82f6' },
  { platform: 'Google Ads', planned: 3500, actual: 3800, color: '#ef4444' },
  { platform: 'TikTok Ads', planned: 2000, actual: 1200, color: '#000000' },
  { platform: 'LinkedIn Ads', planned: 1500, actual: 450, color: '#0a66c2' },
];

const Budget = () => {
  const totalPlanned = budgetData.reduce((acc, item) => acc + item.planned, 0);
  const totalActual = budgetData.reduce((acc, item) => acc + item.actual, 0);
  const percentageUsed = (totalActual / totalPlanned) * 100;

  const handleOptimize = () => {
    toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
      loading: 'IA analisando ROAS por plataforma...',
      success: 'Sugestão: Mover R$ 800 do Google Ads para Meta Ads para aumentar conversões em 15%.',
      error: 'Erro ao processar otimização.',
    });
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Planejamento de Orçamento</h2>
          <p className="text-slate-500">Gerencie seus investimentos e otimize seu ROI.</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" /> Junho 2024
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Save className="mr-2 h-4 w-4" /> Salvar Plano
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-slate-500">Orçamento Total</p>
              <DollarSign className="text-blue-600" size={20} />
            </div>
            <p className="text-2xl font-bold text-slate-900">R$ {totalPlanned.toLocaleString()}</p>
            <p className="text-xs text-slate-400 mt-1">Definido para o mês atual</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-slate-500">Gasto Atual</p>
              <TrendingUp className="text-green-600" size={20} />
            </div>
            <p className="text-2xl font-bold text-slate-900">R$ {totalActual.toLocaleString()}</p>
            <div className="flex items-center mt-1">
              <Progress value={percentageUsed} className="h-1.5 flex-1 mr-2" />
              <span className="text-xs font-bold text-slate-600">{percentageUsed.toFixed(0)}%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-slate-500">Saldo Disponível</p>
              <AlertCircle className="text-orange-600" size={20} />
            </div>
            <p className="text-2xl font-bold text-slate-900">R$ {(totalPlanned - totalActual).toLocaleString()}</p>
            <p className="text-xs text-orange-600 font-medium mt-1 flex items-center">
              <ArrowUpRight size={12} className="mr-1" /> R$ 450/dia recomendado
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Platform Breakdown */}
        <Card className="lg:col-span-2 bg-white border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Investimento por Plataforma</CardTitle>
            <Button variant="ghost" size="sm" className="text-blue-600" onClick={handleOptimize}>
              <Zap size={14} className="mr-2" /> Otimizar com IA
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={budgetData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="platform" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="planned" name="Planejado" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="actual" name="Realizado" radius={[4, 4, 0, 0]}>
                    {budgetData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* AI Recommendations */}
        <div className="space-y-6">
          <Card className="bg-slate-900 text-white border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <Zap className="mr-2 text-yellow-400" size={20} /> Insights de IA
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-white/10 rounded-lg border border-white/10">
                <p className="text-xs font-bold text-yellow-400 uppercase mb-1">Alerta de Gasto</p>
                <p className="text-sm text-slate-300">
                  Google Ads está 15% acima do planejado para este período. Considere reduzir o lance em palavras-chave de topo de funil.
                </p>
              </div>
              <div className="p-3 bg-white/10 rounded-lg border border-white/10">
                <p className="text-xs font-bold text-green-400 uppercase mb-1">Oportunidade</p>
                <p className="text-sm text-slate-300">
                  TikTok Ads apresenta o menor CPA (R$ 4,20). Aumentar o orçamento em R$ 500 pode gerar +120 leads.
                </p>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 border-none" onClick={handleOptimize}>
                Aplicar Otimizações
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <PieChartIcon className="mr-2 text-slate-400" size={20} /> Distribuição
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {budgetData.map((item) => (
                <div key={item.platform} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-600">{item.platform}</span>
                    <span className="text-slate-900">R$ {item.actual.toLocaleString()}</span>
                  </div>
                  <Progress 
                    value={(item.actual / totalActual) * 100} 
                    className="h-1.5" 
                    style={{ '--progress-foreground': item.color } as any}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Detailed Table */}
      <Card className="bg-white border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Detalhamento por Canal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-4 text-xs font-semibold text-slate-500 uppercase">Canal</th>
                  <th className="pb-4 text-xs font-semibold text-slate-500 uppercase">Orçamento Planejado</th>
                  <th className="pb-4 text-xs font-semibold text-slate-500 uppercase">Gasto Realizado</th>
                  <th className="pb-4 text-xs font-semibold text-slate-500 uppercase">Diferença</th>
                  <th className="pb-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {budgetData.map((item, i) => {
                  const diff = item.planned - item.actual;
                  const isOver = diff < 0;
                  return (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 font-bold text-slate-900">{item.platform}</td>
                      <td className="py-4 text-slate-600 text-sm">R$ {item.planned.toLocaleString()}</td>
                      <td className="py-4 text-slate-600 text-sm">R$ {item.actual.toLocaleString()}</td>
                      <td className={`py-4 text-sm font-medium ${isOver ? 'text-red-600' : 'text-green-600'}`}>
                        {isOver ? '-' : '+'} R$ {Math.abs(diff).toLocaleString()}
                      </td>
                      <td className="py-4">
                        <Badge variant={isOver ? 'destructive' : 'secondary'} className={!isOver ? 'bg-green-100 text-green-700 border-none' : ''}>
                          {isOver ? 'Acima do Limite' : 'Dentro do Plano'}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Budget;