"use client";

import React from 'react';
import Layout from '../components/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { TrendingUp, TrendingDown, Zap, FileText, Download } from 'lucide-react';
import { toast } from 'sonner';

const platformData = [
  { name: 'Instagram', value: 4500, color: '#E1306C' },
  { name: 'Facebook', value: 3200, color: '#1877F2' },
  { name: 'TikTok', value: 5800, color: '#000000' },
  { name: 'Google', value: 2100, color: '#4285F4' },
];

const cpaData = [
  { month: 'Jan', cpa: 12.5 },
  { month: 'Fev', cpa: 11.8 },
  { month: 'Mar', cpa: 14.2 },
  { month: 'Abr', cpa: 10.5 },
  { month: 'Mai', cpa: 9.8 },
  { month: 'Jun', cpa: 8.4 },
];

const conversionData = [
  { name: 'Jan', sales: 400, leads: 2400 },
  { name: 'Fev', sales: 300, leads: 1398 },
  { name: 'Mar', sales: 200, leads: 9800 },
  { name: 'Abr', sales: 278, leads: 3908 },
  { name: 'Mai', sales: 189, leads: 4800 },
  { name: 'Jun', sales: 239, leads: 3800 },
];

const topCampaigns = [
  { name: 'Verão 2024', platform: 'Meta', roi: '5.2x', status: 'up' },
  { name: 'Black Friday', platform: 'Google', roi: '4.8x', status: 'up' },
  { name: 'Lançamento App', platform: 'TikTok', roi: '3.1x', status: 'down' },
  { name: 'Retargeting Q1', platform: 'Meta', roi: '4.2x', status: 'up' },
];

const Analytics = () => {
  const handleGenerateReport = () => {
    toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
      loading: 'Analisando dados e gerando relatório...',
      success: 'Relatório de performance gerado com sucesso!',
      error: 'Erro ao gerar relatório.',
    });
  };

  const handleOptimizeBudget = () => {
    toast.success('IA: Sugestão de realocação de R$ 1.200 do Google Ads para TikTok Ads para reduzir CPA em 12%.');
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Analytics</h2>
          <p className="text-slate-500">Análise detalhada de performance e conversão.</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={handleOptimizeBudget}>
            <Zap className="mr-2 h-4 w-4 text-orange-500" /> Otimizar Orçamento
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleGenerateReport}>
            <FileText className="mr-2 h-4 w-4" /> Gerar Relatório
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Platform Distribution */}
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Distribuição por Plataforma</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={platformData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {platformData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-4 mt-4">
              {platformData.map((item) => (
                <div key={item.name} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-xs text-slate-600">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CPA Trend */}
        <Card className="lg:col-span-2 bg-white border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Tendência de CPA (R$)</CardTitle>
            <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
              <TrendingDown size={12} className="mr-1" /> -15% este mês
            </Badge>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cpaData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="cpa" 
                  stroke="#3b82f6" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#3b82f6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Leads vs Vendas</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={conversionData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="leads" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="sales" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Campanhas de Melhor Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="pb-4 text-xs font-semibold text-slate-500 uppercase">Campanha</th>
                    <th className="pb-4 text-xs font-semibold text-slate-500 uppercase">Plataforma</th>
                    <th className="pb-4 text-xs font-semibold text-slate-500 uppercase">ROI</th>
                    <th className="pb-4 text-xs font-semibold text-slate-500 uppercase">Tendência</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {topCampaigns.map((campaign, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 font-medium text-slate-900">{campaign.name}</td>
                      <td className="py-4 text-slate-600 text-sm">{campaign.platform}</td>
                      <td className="py-4 font-bold text-slate-900">{campaign.roi}</td>
                      <td className="py-4">
                        {campaign.status === 'up' ? (
                          <div className="flex items-center text-green-600 text-xs font-medium">
                            <TrendingUp size={14} className="mr-1" /> Crescente
                          </div>
                        ) : (
                          <div className="flex items-center text-red-600 text-xs font-medium">
                            <TrendingDown size={14} className="mr-1" /> Estável
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Analytics;