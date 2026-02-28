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
  Cell
} from 'recharts';
import { Badge } from '../components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';

const platformData = [
  { name: 'Instagram', value: 4500, color: '#E1306C' },
  { name: 'Facebook', value: 3200, color: '#1877F2' },
  { name: 'TikTok', value: 5800, color: '#000000' },
  { name: 'Google', value: 2100, color: '#4285F4' },
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
  return (
    <Layout>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Analytics</h2>
        <p className="text-slate-500">Análise detalhada de performance e conversão.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
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
      </div>

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
    </Layout>
  );
};

export default Analytics;