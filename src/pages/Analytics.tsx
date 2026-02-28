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
    </Layout>
  );
};

export default Analytics;